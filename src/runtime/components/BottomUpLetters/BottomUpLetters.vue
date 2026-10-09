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
import { Motion, useInView, useReducedMotion } from 'motion-v'
import { computed, ref } from 'vue'
import {
  BOTTOM_UP_LETTERS_DEFAULT_DELAY,
  BOTTOM_UP_LETTERS_DEFAULT_STAGGER,
  BOTTOM_UP_LETTERS_DURATION_S,
  BOTTOM_UP_LETTERS_EASE,
  BOTTOM_UP_LETTERS_MS,
  BOTTOM_UP_LETTERS_START_Y,
} from './constants'

/**
 * Props for BottomUpLetters.
 *
 * `text` is a string rather than a slot so the component can put a single
 * `aria-label` on the wrapper while marking each animated letter
 * `aria-hidden` — otherwise screen readers announce the letters one by one
 * instead of the word.
 */
export interface BottomUpLettersProps {
  /** Class applied to the wrapper element. */
  class?: string
  /** Milliseconds to wait before the first letter rises. */
  delay?: number
  /** Per-step stagger between letters, in milliseconds. */
  stagger?: number
  /** The text to reveal. */
  text: string
  /** Wait until the element scrolls into view before revealing. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<BottomUpLettersProps>(), {
  delay: BOTTOM_UP_LETTERS_DEFAULT_DELAY,
  stagger: BOTTOM_UP_LETTERS_DEFAULT_STAGGER,
  triggerOnView: false,
})

const shouldReduceMotion = useReducedMotion()

const containerRef = ref<HTMLElement | null>(null)

const inView = useInView(containerRef, { once: true })

// Stable object identity matters here. motion-v compares `initial` against
// `animate` by reference to decide whether there is anything to animate, so
// freshly-built literals each render would defeat the "still waiting" case.
const hiddenState = { opacity: 0, y: BOTTOM_UP_LETTERS_START_Y }
const shownState = { opacity: 1, y: 0 }

// `initial` is the hidden state on the server and the client alike. Deriving it
// from the motion preference would strand hidden styles: the server cannot know
// the preference, and `initial` is only read when the visual element is created,
// so a client that changed its mind could never clear the SSR attributes.
// Suppressing the *transition* instead keeps one identical server/client tree.
const initialState = hiddenState

const characters = computed(() => Array.from(props.text))

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
function charTransition(index: number) {
  if (shouldReduceMotion.value || waitingForView.value) {
    return { duration: 0 }
  }

  return {
    delay: props.delay / BOTTOM_UP_LETTERS_MS + (index * props.stagger) / BOTTOM_UP_LETTERS_MS,
    duration: BOTTOM_UP_LETTERS_DURATION_S,
    ease: BOTTOM_UP_LETTERS_EASE,
  }
}
</script>
