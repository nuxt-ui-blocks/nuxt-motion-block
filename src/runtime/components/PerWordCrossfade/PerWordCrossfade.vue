<template>
  <span
    ref="containerRef"
    :class="props.class"
    :aria-label="props.text"
  >
    <span
      v-for="(word, index) in words"
      :key="index"
      style="display: inline-block"
    >
      <Motion
        as="span"
        aria-hidden="true"
        :initial="initialState"
        :animate="animateState"
        :style="{ display: 'inline-block', whiteSpace: 'pre' }"
        :transition="wordTransition(index)"
      >
        {{ word }}
      </Motion>
      <!--
        The gap between words is its own element. `white-space: pre` keeps it
        from being collapsed away at the end of a line, and the explicit
        interpolation keeps the space itself from being stripped - an empty
        span here renders `Everywordfindsitsplace`.
      -->
      <span
        v-if="index < words.length - 1"
        aria-hidden="true"
        :style="{ display: 'inline-block', whiteSpace: 'pre' }"
      >{{ ' ' }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'
import {
  PER_WORD_CROSSFADE_DEFAULT_DELAY,
  PER_WORD_CROSSFADE_DEFAULT_STAGGER,
  PER_WORD_CROSSFADE_DURATION_S,
  PER_WORD_CROSSFADE_EASE,
  PER_WORD_CROSSFADE_MS,
  PER_WORD_CROSSFADE_START_Y,
} from './constants'

import { useStaggeredReveal } from '../../composables/useStaggeredReveal'

/**
 * Props for PerWordCrossfade.
 *
 * `text` is a string rather than a slot so the component can put a single
 * `aria-label` on the wrapper while marking each animated word
 * `aria-hidden` — otherwise screen readers announce the words one at a time
 * instead of reading the sentence.
 */
export interface PerWordCrossfadeProps {
  /** Class applied to the wrapper element. */
  class?: string
  /** Milliseconds to wait before the first word fades in. */
  delay?: number
  /** Per-step stagger between words, in milliseconds. */
  stagger?: number
  /** The text to reveal. Use spaces to separate words. */
  text: string
  /** Wait until the element scrolls into view before revealing. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<PerWordCrossfadeProps>(), {
  delay: PER_WORD_CROSSFADE_DEFAULT_DELAY,
  stagger: PER_WORD_CROSSFADE_DEFAULT_STAGGER,
  triggerOnView: false,
})

// Stable object identity matters here. motion-v compares `initial` against
// `animate` by reference to decide whether there is anything to animate, so
// freshly-built literals each render would defeat the "still waiting" case.
const hiddenState = { opacity: 0, y: PER_WORD_CROSSFADE_START_Y }
const shownState = { opacity: 1, y: 0 }

const { containerRef, animateState, initialState, transitionCollapsed } = useStaggeredReveal({
  triggerOnView: () => props.triggerOnView,
  hiddenState,
  shownState,
})

// Splits on a single space, matching the reference. Runs of spaces therefore
// yield empty words, which render nothing but still consume a stagger step —
// harmless for prose, and the reason the separator below is emitted
// unconditionally rather than derived from the original spacing.
const words = computed(() => props.text.split(' '))

// Zero duration rather than no animation at all. motion-v treats "nothing to
// animate" as "write nothing" and would leave the hidden styles stranded; a
// zero-length transition still commits the resolved values within one frame.
function wordTransition(index: number) {
  if (transitionCollapsed.value) {
    return { duration: 0 }
  }

  return {
    delay: props.delay / PER_WORD_CROSSFADE_MS + (index * props.stagger) / PER_WORD_CROSSFADE_MS,
    duration: PER_WORD_CROSSFADE_DURATION_S,
    ease: PER_WORD_CROSSFADE_EASE,
  }
}
</script>
