<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion-v'

export interface CursorFollowProps {
  /** Extra classes for the tracking surface. */
  class?: string
}

const props = withDefaults(defineProps<CursorFollowProps>(), {
  class: undefined,
})

const CIRCLE_SIZE = 16
const MIN_BUBBLE_WIDTH = 40
const BUBBLE_HEIGHT = 40
const TEXT_PADDING = 32

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const cursorText = ref<string | null>(null)
const pendingText = ref<string | null>(null)
const textWidth = ref(0)
const measureRef = ref<HTMLSpanElement | null>(null)
const rootRef = ref<HTMLElement | null>(null)

const x = useMotionValue(0)
const y = useMotionValue(0)
const springX = useSpring(x, { damping: 40, stiffness: 350 })
const springY = useSpring(y, { damping: 40, stiffness: 350 })

const bubbleWidth = computed(() =>
  cursorText.value
    ? Math.max(textWidth.value + TEXT_PADDING, MIN_BUBBLE_WIDTH)
    : CIRCLE_SIZE,
)
const bubbleHeight = computed(() => (cursorText.value ? BUBBLE_HEIGHT : CIRCLE_SIZE))

const lastClient = { x: 0, y: 0 }

function centerOn(clientX: number, clientY: number) {
  lastClient.x = clientX
  lastClient.y = clientY
  x.set(clientX - bubbleWidth.value / 2)
  y.set(clientY - bubbleHeight.value / 2)
}

function onWindowMouseMove(event: MouseEvent) {
  centerOn(event.clientX, event.clientY)
}

// Re-centre when the bubble grows into a label, otherwise the text would hang
// off to the right of the pointer until the next mouse move.
watch([bubbleWidth, bubbleHeight], () => {
  centerOn(lastClient.x, lastClient.y)
})

watch(pendingText, async (text) => {
  if (!text) {
    return
  }

  await nextTick()
  const element = measureRef.value
  if (!element) {
    return
  }

  textWidth.value = element.offsetWidth
  cursorText.value = text
  pendingText.value = null
})

watch(cursorText, (text) => {
  if (!text) {
    textWidth.value = 0
  }
})

function cursorTextFor(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) {
    return null
  }

  return target.closest<HTMLElement>('[data-cursor-text]')?.dataset.cursorText ?? null
}

function onMouseOver(event: MouseEvent) {
  const text = cursorTextFor(event.target)
  if (text) {
    pendingText.value = text
  }
}

function onMouseOut(event: MouseEvent) {
  if (!cursorTextFor(event.relatedTarget)) {
    cursorText.value = null
    pendingText.value = null
  }
}

function onFocusIn(event: FocusEvent) {
  const text = cursorTextFor(event.target)
  if (text) {
    pendingText.value = text
  }
}

function onFocusOut(event: FocusEvent) {
  if (!cursorTextFor(event.relatedTarget)) {
    cursorText.value = null
    pendingText.value = null
  }
}

const positionStyle = computed(() => ({
  left: '0px',
  top: '0px',
  x: isReduced.value ? x : springX,
  y: isReduced.value ? y : springY,
}))

const easeOutQuint = [0.645, 0.045, 0.355, 1] as const

const bubbleTransition = computed(() =>
  isReduced.value ? { duration: 0 } : { duration: 0.25, ease: easeOutQuint },
)

onMounted(() => {
  window.addEventListener('mousemove', onWindowMouseMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onWindowMouseMove)
})
</script>

<template>
  <div
    ref="rootRef"
    :class="['relative h-full w-full cursor-none', props.class]"
    role="application"
    tabindex="0"
    style="min-height: 300px"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @mouseout="onMouseOut"
    @mouseover="onMouseOver"
  >
    <slot />

    <motion.div
      aria-hidden="true"
      :animate="
        isReduced
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, transition: { duration: 0.25, ease: easeOutQuint } }
      "
      class="pointer-events-none fixed z-50"
      :initial="isReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }"
      :style="positionStyle"
    >
      <motion.div
        :animate="
          cursorText
            ? {
              borderRadius: 20,
              height: BUBBLE_HEIGHT,
              minHeight: 32,
              minWidth: 40,
              paddingLeft: 16,
              paddingRight: 16,
              scale: 1.1,
              width: bubbleWidth,
            }
            : {
              borderRadius: 999,
              height: CIRCLE_SIZE,
              minHeight: CIRCLE_SIZE,
              minWidth: CIRCLE_SIZE,
              paddingLeft: 0,
              paddingRight: 0,
              scale: 1,
              width: CIRCLE_SIZE,
            }
        "
        class="relative z-10 flex items-center justify-center bg-primary text-xs font-medium text-inverted shadow-lg"
        layout
        :style="{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }"
        :transition="bubbleTransition"
      >
        <motion.span
          v-if="cursorText"
          :animate="{ filter: 'blur(0px)', opacity: 1 }"
          :exit="{ filter: 'blur(8px)', opacity: 0 }"
          :initial="{ filter: 'blur(8px)', opacity: 0 }"
          :transition="
            isReduced
              ? { duration: 0 }
              : { delay: 0.05, duration: 0.2, ease: easeOutQuint }
          "
          class="w-full text-center whitespace-nowrap"
        >
          {{ cursorText }}
        </motion.span>
      </motion.div>

      <span
        v-if="pendingText || cursorText"
        ref="measureRef"
        class="pointer-events-none absolute text-xs font-medium whitespace-nowrap"
        :style="{ paddingLeft: '16px', paddingRight: '16px', visibility: 'hidden' }"
      >
        {{ pendingText || cursorText }}
      </span>
    </motion.div>
  </div>
</template>
