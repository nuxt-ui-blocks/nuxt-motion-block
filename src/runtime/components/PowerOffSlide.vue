<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <div :class="ui.track({ class: uiProps.ui?.track })">
      <AnimatePresence
        :initial="false"
        mode="wait"
      >
        <motion.span
          :key="poweredOff ? 'off' : 'on'"
          :class="ui.label({ class: uiProps.ui?.label })"
          :initial="labelFrom"
          :animate="labelTo"
          :exit="labelExit"
          :transition="labelTransition"
        >
          {{ poweredOff ? offLabel : label }}
        </motion.span>
      </AnimatePresence>

      <motion.button
        type="button"
        :aria-label="label"
        :aria-disabled="disabled || poweredOff"
        :class="ui.handle({ class: uiProps.ui?.handle })"
        :disabled="disabled"
        :drag="draggable ? 'x' : false"
        :drag-constraints="{ left: 0, right: MAX_DISTANCE }"
        :drag-elastic="0"
        :drag-momentum="false"
        :style="{ x }"
        @click="onClick"
        @drag-end="onDragEnd"
        @drag-start="suppressClick = false"
        @drag="suppressClick = true"
        @keydown.enter.prevent="complete"
        @keydown.space.prevent="complete"
      >
        <UIcon
          :class="ui.icon({ class: uiProps.ui?.icon })"
          name="i-lucide-power"
        />
      </motion.button>
    </div>

    <!--
      The icon and the label both change, and neither is announced. This is the
      one line a screen reader hears when the machine goes down.
    -->
    <span
      class="sr-only"
      role="status"
    >{{ poweredOff ? offLabel : '' }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import powerOffSlide from '../theme/power-off-slide'
import { EASE_OUT, SPRING_DEFAULT } from '../utils/motion-tokens'

export interface PowerOffSlideProps {
  /** Text printed on the track, and the handle's accessible name. */
  label?: string
  /** How long the shutting-down state is held before the control returns. */
  duration?: number
  disabled?: boolean
  class?: string
  ui?: Record<string, any>
}

/**
 * Slide to power off - a destructive action behind a deliberate gesture.
 *
 * The gesture is the confirmation. A button that shuts something down on click
 * asks for a dialog; a thumb that has to travel the width of the track asks for
 * nothing, because the distance itself is the intent.
 *
 * Dragging is a pointer gesture, so the same button answers Enter and Space.
 * Without that, a keyboard user would have a control they can focus and not
 * use.
 */
const props = withDefaults(defineProps<PowerOffSlideProps>(), {
  label: 'Slide to power off',
  duration: 2000,
  disabled: false,
  class: undefined,
  ui: undefined,
})

const emit = defineEmits<{
  powerOff: []
}>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'powerOffSlide', props, theme: powerOffSlide })

const reducedMotion = useReducedMotion()

/** Track width (224) minus the handle (48) and its two 4px insets. */
const MAX_DISTANCE = 168
/** Four fifths of the way: close enough to the end to mean it. */
const THRESHOLD = 134
const ARRIVAL_MS = 220

const x = useMotionValue(0)
const poweredOff = ref(false)
const suppressClick = ref(false)
const offLabel = 'Shutting down…'

const draggable = computed(() => !props.disabled && reducedMotion.value !== true)

let resetTimer: ReturnType<typeof setTimeout> | undefined
let clickTimer: ReturnType<typeof setTimeout> | undefined

const snapTo = (target: number, instant: boolean): void => {
  if (instant) {
    x.set(target)
    return
  }
  animate(x, target, SPRING_DEFAULT)
}

const down = (instant: boolean): void => {
  poweredOff.value = true
  emit('powerOff')
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    poweredOff.value = false
    snapTo(0, instant)
  }, props.duration)
}

const complete = (): void => {
  if (props.disabled || poweredOff.value) return
  const instant = reducedMotion.value === true
  if (instant) {
    x.set(MAX_DISTANCE)
    down(true)
    return
  }
  snapTo(MAX_DISTANCE, false)
  // Let the thumb arrive before the label changes; firing both at once makes
  // the track look like it failed mid-gesture.
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => down(false), ARRIVAL_MS)
}

const onDragEnd = (): void => {
  const travelled = suppressClick.value
  if (travelled && x.get() > THRESHOLD) {
    complete()
  }
  else {
    snapTo(0, reducedMotion.value === true)
  }
  // A drag that ends on the thumb still fires a click. Hold the guard until
  // that click has been dispatched, then let the button behave normally again.
  clearTimeout(clickTimer)
  clickTimer = setTimeout(() => {
    suppressClick.value = false
  }, 0)
}

const onClick = (): void => {
  if (suppressClick.value) return
  complete()
}

onBeforeUnmount(() => {
  clearTimeout(resetTimer)
  clearTimeout(clickTimer)
})

const labelFrom = computed(() =>
  reducedMotion.value === true ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 },
)

const labelTo = { opacity: 1, y: 0 }

const labelExit = computed(() =>
  reducedMotion.value === true
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, transition: { duration: 0.12, ease: EASE_OUT }, y: -6 },
)

const labelTransition = computed(() =>
  reducedMotion.value === true
    ? { duration: 0 }
    : { ...SPRING_DEFAULT, opacity: { duration: 0.12 } },
)
</script>

<style scoped>
/**
 * A sheen that crosses the label, not a pulse: power is draining. The colours
 * come from the theme tokens so the sweep reads on both light and dark.
 */
.track-sheen {
  background-image: linear-gradient(
    90deg,
    var(--ui-text-muted, #71717a) 0%,
    var(--ui-text-muted, #71717a) 38%,
    var(--ui-text-highlighted, #18181b) 50%,
    var(--ui-text-muted, #71717a) 62%,
    var(--ui-text-muted, #71717a) 100%
  );
  background-size: 220% 100%;
  background-clip: text;
  color: transparent;
  animation: power-off-sweep 2.4s linear infinite;
}

@keyframes power-off-sweep {
  from {
    background-position: 120% 0;
  }
  to {
    background-position: -120% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .track-sheen {
    background: none;
    color: inherit;
    animation: none;
  }
}
</style>
