<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from 'motion-v'
import { useStaggeredReveal } from '../composables/useStaggeredReveal'

export interface ScaleDownFadeProps {
  /** Extra classes for the root element. */
  class?: string
  /** Delay before the settle-in starts, in milliseconds. */
  delay?: number
  /** The text to reveal. Animated as one element. */
  text: string
  /** Wait for the element to scroll into view before playing. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<ScaleDownFadeProps>(), {
  delay: 0,
  triggerOnView: false,
})

const DURATION_S = 0.52
const MS = 1000
const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Starting slightly *larger* than rest and settling down is what reads as
 * premium rather than as an object flying in: the text is already where it
 * belongs, it just loses a little energy.
 */
const hiddenState = { opacity: 0, scale: 1.04, y: 8 }
const shownState = { opacity: 1, scale: 1, y: 0 }

const { containerRef, animateState, initialState, transitionCollapsed } = useStaggeredReveal({
  triggerOnView: () => props.triggerOnView,
  hiddenState,
  shownState,
})

const transition = computed(() => {
  if (transitionCollapsed.value) {
    return { duration: 0 }
  }

  return {
    delay: props.delay / MS,
    duration: DURATION_S,
    ease: EASE,
  }
})
</script>

<template>
  <span
    ref="containerRef"
    :class="props.class"
    style="display: inline-block"
  >
    <!-- The readable copy lives here; the animated text is hidden. -->
    <span class="sr-only">{{ props.text }}</span>
    <Motion
      as="span"
      aria-hidden="true"
      :animate="animateState"
      :initial="initialState"
      :transition="transition"
      style="display: inline-block; will-change: transform, opacity"
    >{{ props.text }}</Motion>
  </span>
</template>
