<script setup lang="ts">
import { Motion, useInView, useReducedMotion } from 'motion-v'
import { computed, ref } from 'vue'
import {
  SOFT_BLUR_IN_DEFAULT_DELAY,
  SOFT_BLUR_IN_DEFAULT_STAGGER,
  SOFT_BLUR_IN_DURATION_S,
  SOFT_BLUR_IN_EASE,
  SOFT_BLUR_IN_MS,
  SOFT_BLUR_IN_START_BLUR,
  SOFT_BLUR_IN_START_Y,
} from './constants'

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

const shouldReduceMotion = useReducedMotion()
const containerRef = ref<HTMLElement | null>(null)
const inView = useInView(containerRef, { once: true })

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

// The hidden state is the initial state on the server too. The server has no way
// to know the visitor's motion preference, and `initial` is only read when the
// visual element is created - so a client that wanted the reduced-motion
// starting state could never clear the attributes the server already wrote, and
// the tree would disagree. Reduced motion is handled by collapsing the
// transition instead, which keeps one identical server/client tree.
const initialState = hiddenState

const waitingForView = computed(() => {
  return !shouldReduceMotion.value && props.triggerOnView && !inView.value
})

const animateState = computed(() => {
  if (waitingForView.value) {
    return hiddenState
  }

  return shownState
})

function characterTransition(index: number) {
  if (shouldReduceMotion.value || waitingForView.value) {
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
