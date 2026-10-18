<template>
  <span
    ref="containerRef"
    :class="props.class"
    :aria-label="props.text"
    style="display: inline-block"
  >
    <Motion
      v-for="(char, index) in characters"
      :key="index"
      as="span"
      aria-hidden="true"
      :initial="initialState"
      :animate="animateState"
      :style="{ display: 'inline-block', whiteSpace: 'pre' }"
      :transition="charTransition(index)"
    >
      {{ char === ' ' ? ' ' : char }}
    </Motion>
  </span>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'
import {
  STAGGER_EDGES_DEFAULT_DELAY,
  STAGGER_EDGES_DEFAULT_STAGGER,
  STAGGER_EDGES_DURATION_S,
  STAGGER_EDGES_EASE,
  STAGGER_EDGES_MS,
  STAGGER_EDGES_START_BLUR,
  STAGGER_EDGES_START_Y,
} from './constants'

import { useStaggeredReveal } from '../../composables/useStaggeredReveal'

/**
 * Props for StaggerFromEdges.
 *
 * `text` is a string rather than a slot so the component can put a single
 * `aria-label` on the wrapper while marking each animated character
 * `aria-hidden` — otherwise screen readers announce the letters one by one
 * instead of the word.
 */
export interface StaggerFromEdgesProps {
  /** Class applied to the wrapper element. */
  class?: string
  /** Milliseconds to wait before the reveal begins. */
  delay?: number
  /** Per-step stagger between characters, in milliseconds. */
  stagger?: number
  /** The text to reveal. */
  text: string
  /** Wait until the element scrolls into view before revealing. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<StaggerFromEdgesProps>(), {
  delay: STAGGER_EDGES_DEFAULT_DELAY,
  stagger: STAGGER_EDGES_DEFAULT_STAGGER,
  triggerOnView: false,
})

// Stable object identity matters here. motion-v compares `initial` against
// `animate` by reference (`state/animation-state.mjs`) to decide whether there
// is anything to animate, so freshly-built literals each render would defeat
// the "still waiting" case below.
const hiddenState = {
  filter: `blur(${STAGGER_EDGES_START_BLUR}px)`,
  opacity: 0,
  y: STAGGER_EDGES_START_Y,
}

const shownState = {
  filter: 'blur(0px)',
  opacity: 1,
  y: 0,
}

const { containerRef, animateState, initialState, transitionCollapsed } = useStaggeredReveal({
  triggerOnView: () => props.triggerOnView,
  hiddenState,
  shownState,
})

const characters = computed(() => Array.from(props.text))

const lastIndex = computed(() => characters.value.length - 1)

// Distance to the *nearest* edge, not the linear index: the first and last
// characters leave together and the cascade converges inward to the centre.
// This is the mirror of StaggerFromCenter, which fans outward instead.
function distanceFromEdge(index: number) {
  return Math.min(index, lastIndex.value - index)
}

// Zero duration rather than no animation at all. motion-v treats "nothing to
// animate" as "write nothing" and would leave the hidden styles stranded; a
// zero-length transition still commits the resolved values within one frame.
function charTransition(index: number) {
  if (transitionCollapsed.value) {
    return { duration: 0 }
  }

  return {
    delay: props.delay / STAGGER_EDGES_MS + (distanceFromEdge(index) * props.stagger) / STAGGER_EDGES_MS,
    duration: STAGGER_EDGES_DURATION_S,
    ease: STAGGER_EDGES_EASE,
  }
}
</script>
