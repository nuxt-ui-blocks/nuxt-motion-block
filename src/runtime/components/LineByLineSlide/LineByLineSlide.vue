<template>
  <span
    ref="containerRef"
    :class="props.class"
    :aria-label="label"
    style="display: block"
  >
    <Motion
      v-for="(line, index) in resolvedLines"
      :key="index"
      as="span"
      aria-hidden="true"
      :initial="initialState"
      :animate="animateState"
      style="display: block"
      :transition="lineTransition(index)"
    >
      {{ line }}
    </Motion>
  </span>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'
import {
  LINE_BY_LINE_SLIDE_DEFAULT_DELAY,
  LINE_BY_LINE_SLIDE_DEFAULT_STAGGER,
  LINE_BY_LINE_SLIDE_DURATION_S,
  LINE_BY_LINE_SLIDE_EASE,
  LINE_BY_LINE_SLIDE_MS,
  LINE_BY_LINE_SLIDE_SEPARATOR,
  LINE_BY_LINE_SLIDE_START_X,
} from './constants'

import { useStaggeredReveal } from '../../composables/useStaggeredReveal'

/**
 * Props for LineByLineSlide.
 *
 * `text` is required even though `lines` takes precedence over it. The wrapper's
 * `aria-label` is always derived from the resolved lines, so making one of the
 * two required guarantees that label can never be empty — which is the same
 * invariant the per-character effects in this catalog keep.
 */
export interface LineByLineSlideProps {
  /** Class applied to the wrapper element. */
  class?: string
  /** Milliseconds to wait before the first line slides in. */
  delay?: number
  /**
   * Explicit line array. Takes precedence over `text`, which exists so the
   * component has a single required source of truth for its accessible name.
   */
  lines?: string[]
  /** Per-line stagger, in milliseconds. */
  stagger?: number
  /** The text to reveal. Use `"\n"` to separate lines. */
  text: string
  /** Wait until the element scrolls into view before revealing. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<LineByLineSlideProps>(), {
  delay: LINE_BY_LINE_SLIDE_DEFAULT_DELAY,
  lines: undefined,
  stagger: LINE_BY_LINE_SLIDE_DEFAULT_STAGGER,
  triggerOnView: false,
})

// Stable object identity matters here. motion-v compares `initial` against
// `animate` by reference to decide whether there is anything to animate, so
// freshly-built literals each render would defeat the "still waiting" case.
const hiddenState = { opacity: 0, x: LINE_BY_LINE_SLIDE_START_X }
const shownState = { opacity: 1, x: 0 }

const { containerRef, animateState, initialState, transitionCollapsed } = useStaggeredReveal({
  triggerOnView: () => props.triggerOnView,
  hiddenState,
  shownState,
})

const resolvedLines = computed(() =>
  props.lines ?? props.text.split(LINE_BY_LINE_SLIDE_SEPARATOR),
)

// The separator becomes a space in the accessible name: a newline would be read
// as a pause, and a hyphen would be read as punctuation that is not on screen.
const label = computed(() => resolvedLines.value.join(' '))

// Zero duration rather than no animation at all. motion-v treats "nothing to
// animate" as "write nothing" and would leave the hidden styles stranded; a
// zero-length transition still commits the resolved values within one frame.
function lineTransition(index: number) {
  if (transitionCollapsed.value) {
    return { duration: 0 }
  }

  return {
    delay: props.delay / LINE_BY_LINE_SLIDE_MS + (index * props.stagger) / LINE_BY_LINE_SLIDE_MS,
    duration: LINE_BY_LINE_SLIDE_DURATION_S,
    ease: LINE_BY_LINE_SLIDE_EASE,
  }
}
</script>
