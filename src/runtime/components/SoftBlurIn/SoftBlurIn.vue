<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'
import {
  SOFT_BLUR_IN_DEFAULT_DELAY,
  SOFT_BLUR_IN_DEFAULT_STAGGER,
  SOFT_BLUR_IN_DURATION_S,
  SOFT_BLUR_IN_EASE,
  SOFT_BLUR_IN_MS,
  SOFT_BLUR_IN_START_BLUR,
  SOFT_BLUR_IN_START_Y,
} from './constants'

import { useStaggeredReveal } from '../../composables/useStaggeredReveal'

export interface SoftBlurInProps {
  /** Extra classes for the root element. */
  class?: string
  /** Delay before the first character starts, in milliseconds. */
  delay?: number
  /** Per-character stagger, in milliseconds. */
  stagger?: number
  /** The text to reveal. Split into one animated element per character. */
  text: string
  /** Wait for the element to scroll into view before playing. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<SoftBlurInProps>(), {
  delay: SOFT_BLUR_IN_DEFAULT_DELAY,
  stagger: SOFT_BLUR_IN_DEFAULT_STAGGER,
  triggerOnView: false,
})

const characters = computed(() => Array.from(props.text))

// Module level so the object identity is stable. motion-v compares `initial`
// against `animate` by reference, so a fresh literal per render would make it
// think every element re-animates on each update.
const hiddenState = {
  filter: `blur(${SOFT_BLUR_IN_START_BLUR}px)`,
  opacity: 0,
  y: SOFT_BLUR_IN_START_Y,
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

function characterTransition(index: number) {
  if (transitionCollapsed.value) {
    return { duration: 0 }
  }

  return {
    delay:
      (props.delay + index * props.stagger) / SOFT_BLUR_IN_MS,
    duration: SOFT_BLUR_IN_DURATION_S,
    ease: SOFT_BLUR_IN_EASE,
  }
}
</script>

<template>
  <span
    ref="containerRef"
    :class="props.class"
    :aria-label="props.text"
  >
    <Motion
      v-for="(character, index) in characters"
      :key="index"
      as="span"
      aria-hidden="true"
      :initial="initialState"
      :animate="animateState"
      :transition="characterTransition(index)"
      style="display: inline-block; white-space: pre;"
    >{{ character }}</Motion>
  </span>
</template>
