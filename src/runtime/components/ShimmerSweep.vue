<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from 'motion-v'
import { useStaggeredReveal } from '../composables/useStaggeredReveal'

export interface ShimmerSweepProps {
  /** Extra classes for the root element. */
  class?: string
  /** Delay before the sweep starts, in milliseconds. */
  delay?: number
  /** The text to reveal. Animated as one element. */
  text: string
  /** Wait for the element to scroll into view before playing. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<ShimmerSweepProps>(), {
  delay: 0,
  triggerOnView: false,
})

const DURATION_S = 0.85
const MS = 1000
const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The sweep is a slide *plus* blur, not a gradient moving across the glyphs.
 * A masked gradient would need the text to be a background-clipped plane, which
 * breaks inline wrapping and forced colours; the blur dissolve reads the same
 * at a headline size and stays a plain text node.
 */
const hiddenState = { filter: 'blur(8px)', opacity: 0, x: -22 }
const shownState = { filter: 'blur(0px)', opacity: 1, x: 0 }

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
  >
    <!-- The readable copy lives here; the swept text is hidden from the tree. -->
    <span class="sr-only">{{ props.text }}</span>
    <Motion
      as="span"
      aria-hidden="true"
      :animate="animateState"
      :initial="initialState"
      :transition="transition"
      style="display: inline-block; will-change: transform, opacity, filter"
    >{{ props.text }}</Motion>
  </span>
</template>
