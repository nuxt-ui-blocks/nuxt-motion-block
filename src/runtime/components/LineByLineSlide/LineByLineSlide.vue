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
import { Motion, useInView, useReducedMotion } from 'motion-v'
import { computed, ref } from 'vue'
import {
  LINE_BY_LINE_SLIDE_DEFAULT_DELAY,
  LINE_BY_LINE_SLIDE_DEFAULT_STAGGER,
  LINE_BY_LINE_SLIDE_DURATION_S,
  LINE_BY_LINE_SLIDE_EASE,
  LINE_BY_LINE_SLIDE_MS,
  LINE_BY_LINE_SLIDE_SEPARATOR,
  LINE_BY_LINE_SLIDE_START_X,
} from './constants'

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

const shouldReduceMotion = useReducedMotion()

const containerRef = ref<HTMLElement | null>(null)

const inView = useInView(containerRef, { once: true })

// Stable object identity matters here. motion-v compares `initial` against
// `animate` by reference to decide whether there is anything to animate, so
// freshly-built literals each render would defeat the "still waiting" case.
const hiddenState = { opacity: 0, x: LINE_BY_LINE_SLIDE_START_X }
const shownState = { opacity: 1, x: 0 }

// `initial` is the hidden state on the server and the client alike. Deriving it
// from the motion preference would strand hidden styles: the server cannot know
// the preference, and `initial` is only read when the visual element is created,
// so a client that changed its mind could never clear the SSR attributes.
// Suppressing the *transition* instead keeps one identical server/client tree.
const initialState = hiddenState

const resolvedLines = computed(() =>
  props.lines ?? props.text.split(LINE_BY_LINE_SLIDE_SEPARATOR),
)

// The separator becomes a space in the accessible name: a newline would be read
// as a pause, and a hyphen would be read as punctuation that is not on screen.
const label = computed(() => resolvedLines.value.join(' '))

// Reduced motion skips the wait too: with a zero-length transition the resolved
// state commits immediately, so there is nothing to defer.
const waitingForView = computed(() =>
  !shouldReduceMotion.value && props.triggerOnView && !inView.value,
)

// Referencing the same object as `initial` is intentional: motion-v skips the
// animation entirely when the two match, which is exactly the waiting case.
const animateState = computed(() => waitingForView.value ? hiddenState : shownState)

// Zero duration rather than no animation at all. motion-v treats "nothing to
// animate" as "write nothing" and would leave the hidden styles stranded; a
// zero-length transition still commits the resolved values within one frame.
function lineTransition(index: number) {
  if (shouldReduceMotion.value || waitingForView.value) {
    return { duration: 0 }
  }

  return {
    delay: props.delay / LINE_BY_LINE_SLIDE_MS + (index * props.stagger) / LINE_BY_LINE_SLIDE_MS,
    duration: LINE_BY_LINE_SLIDE_DURATION_S,
    ease: LINE_BY_LINE_SLIDE_EASE,
  }
}
</script>
