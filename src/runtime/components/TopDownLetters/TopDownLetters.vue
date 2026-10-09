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
      {{ char }}
    </Motion>
  </span>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'
import {
  TOP_DOWN_LETTERS_DEFAULT_DELAY,
  TOP_DOWN_LETTERS_DEFAULT_STAGGER,
  TOP_DOWN_LETTERS_DURATION_S,
  TOP_DOWN_LETTERS_EASE,
  TOP_DOWN_LETTERS_MS,
  TOP_DOWN_LETTERS_START_Y,
} from './constants'

import { useStaggeredReveal } from '../../composables/useStaggeredReveal'

/**
 * Props for TopDownLetters.
 *
 * `text` is a string rather than a slot so the component can put a single
 * `aria-label` on the wrapper while marking each animated letter
 * `aria-hidden` — otherwise screen readers announce the letters one by one
 * instead of the word.
 */
export interface TopDownLettersProps {
  /** Class applied to the wrapper element. */
  class?: string
  /** Milliseconds to wait before the first letter falls. */
  delay?: number
  /** Per-step stagger between letters, in milliseconds. */
  stagger?: number
  /** The text to reveal. */
  text: string
  /** Wait until the element scrolls into view before revealing. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<TopDownLettersProps>(), {
  delay: TOP_DOWN_LETTERS_DEFAULT_DELAY,
  stagger: TOP_DOWN_LETTERS_DEFAULT_STAGGER,
  triggerOnView: false,
})

// Stable object identity matters here. motion-v compares `initial` against
// `animate` by reference to decide whether there is anything to animate, so
// freshly-built literals each render would defeat the "still waiting" case.
const hiddenState = { opacity: 0, y: TOP_DOWN_LETTERS_START_Y }
const shownState = { opacity: 1, y: 0 }

const { containerRef, animateState, initialState, transitionCollapsed } = useStaggeredReveal({
  triggerOnView: () => props.triggerOnView,
  hiddenState,
  shownState,
})

const characters = computed(() => Array.from(props.text))

// Zero duration rather than no animation at all. motion-v treats "nothing to
// animate" as "write nothing" and would leave the hidden styles stranded; a
// zero-length transition still commits the resolved values within one frame.
function charTransition(index: number) {
  if (transitionCollapsed.value) {
    return { duration: 0 }
  }

  return {
    delay: props.delay / TOP_DOWN_LETTERS_MS + (index * props.stagger) / TOP_DOWN_LETTERS_MS,
    duration: TOP_DOWN_LETTERS_DURATION_S,
    ease: TOP_DOWN_LETTERS_EASE,
  }
}
</script>
