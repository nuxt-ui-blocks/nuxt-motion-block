<template>
  <div
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="rootStyle"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <!--
      Two layers of the same gradient: the ring layer is masked to the border so
      the glow reads as a lit edge, and the fill layer sits under the content at
      low opacity so the card interior picks up a tint of the same colour.
    -->
    <div
      aria-hidden="true"
      :class="ui.gradient({ class: uiProps.ui?.gradient })"
      :style="ringStyle"
    />
    <div
      aria-hidden="true"
      :class="ui.glow({ class: uiProps.ui?.glow })"
      :style="glowStyle"
    />

    <div :class="ui.content({ class: uiProps.ui?.content })">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import magicCard from '../theme/magic-card'

export interface MagicCardProps {
  /** Extra classes for the card. */
  class?: string
  /** Colour the highlight fades in from. */
  gradientFrom?: string
  /** Colour the highlight fades out to. */
  gradientTo?: string
  /** Opacity of the highlight at its centre. */
  gradientOpacity?: number
  /** Diameter of the highlight, in pixels. */
  gradientSize?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<MagicCardProps>(), {
  class: undefined,
  gradientFrom: 'var(--ui-primary)',
  gradientTo: 'var(--ui-secondary)',
  gradientOpacity: 1,
  gradientSize: 200,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'magicCard', props, theme: magicCard })

const RING = 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)'

const rootRef = ref<HTMLElement | null>(null)
const position = ref({ x: 0, y: 0 })
const isHovered = ref(false)

const rootStyle = computed(() => ({
  '--gradient-size': `${props.gradientSize}px`,
  '--gradient-from': props.gradientFrom,
  '--gradient-to': props.gradientTo,
  '--gradient-opacity': `${props.gradientOpacity}`,
}))

const radial = computed(
  () => `radial-gradient(var(--gradient-size) circle at ${position.value.x}px ${position.value.y}px, var(--gradient-from), var(--gradient-to), transparent 100%)`,
)

const ringStyle = computed(() => ({
  'background-image': radial.value,
  'mask': RING,
  '-webkit-mask': RING,
  'mask-composite': 'exclude',
  '-webkit-mask-composite': 'xor',
  'padding': '1px',
}))

/**
 * The tint is a fraction of the edge's opacity, so it has to be multiplied in
 * rather than authored as a class. Keeping it inline means the `group-hover`
 * fade on the wrapper can stay a plain opacity transition.
 */
const glowStyle = computed(() => ({
  'background-image': radial.value,
  'opacity': isHovered.value ? 'calc(var(--gradient-opacity) * 0.16)' : '0',
}))

/**
 * The highlight is positioned in the card's own coordinate space, so the same
 * numbers work whatever the card's offset on the page is.
 */
const onPointerMove = (event: PointerEvent) => {
  const root = rootRef.value
  if (!root) {
    return
  }
  isHovered.value = true
  const rect = root.getBoundingClientRect()
  position.value = { x: event.clientX - rect.left, y: event.clientY - rect.top }
}

const onPointerLeave = () => {
  const root = rootRef.value
  if (!root) {
    return
  }
  isHovered.value = false
  position.value = { x: root.clientWidth / 2, y: root.clientHeight / 2 }
}

onBeforeUnmount(() => {
  position.value = { x: 0, y: 0 }
})
</script>

<style scoped>
.magic-gradient,
.magic-glow {
  background-repeat: no-repeat;
  will-change: background-image;
}

@media (prefers-reduced-motion: reduce) {
  .magic-gradient,
  .magic-glow {
    transition: none;
  }
}
</style>
