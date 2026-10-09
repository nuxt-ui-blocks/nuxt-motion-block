<template>
  <span
    ref="containerRef"
    :class="props.class"
    :aria-label="props.text"
    style="display: inline-block"
  >
    <Motion
      as="span"
      :initial="initialState"
      :animate="animateState"
      :transition="transition"
      style="display: inline-block"
    >
      {{ props.text }}
    </Motion>
  </span>
</template>

<script setup lang="ts">
import { Motion, useInView, useReducedMotion } from 'motion-v'
import { computed, ref } from 'vue'
import {
  MICRO_SCALE_FADE_DEFAULT_DELAY,
  MICRO_SCALE_FADE_DURATION_S,
  MICRO_SCALE_FADE_EASE,
  MICRO_SCALE_FADE_MS,
  MICRO_SCALE_FADE_START_SCALE,
} from './constants'

/**
 * Props for MicroScaleFade.
 *
 * Unlike the per-character effects in this catalog, this one animates the whole
 * string as a single element, so there is nothing to split and no per-child
 * `aria-hidden` to apply. The wrapper keeps an `aria-label` so the animated
 * inner element can be swapped for a different tag without changing the
 * component's accessible name.
 */
export interface MicroScaleFadeProps {
  /** Class applied to the wrapper element. */
  class?: string
  /** Milliseconds to wait before the reveal starts. */
  delay?: number
  /** The text to reveal. */
  text: string
  /** Wait until the element scrolls into view before revealing. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<MicroScaleFadeProps>(), {
  delay: MICRO_SCALE_FADE_DEFAULT_DELAY,
  triggerOnView: false,
})

const shouldReduceMotion = useReducedMotion()

const containerRef = ref<HTMLElement | null>(null)

const inView = useInView(containerRef, { once: true })

// Stable object identity matters here. motion-v compares `initial` against
// `animate` by reference to decide whether there is anything to animate, so
// freshly-built literals each render would defeat the "still waiting" case.
const hiddenState = { opacity: 0, scale: MICRO_SCALE_FADE_START_SCALE }
const shownState = { opacity: 1, scale: 1 }

// `initial` is the hidden state on the server and the client alike. Deriving it
// from the motion preference would strand hidden styles: the server cannot know
// the preference, and `initial` is only read when the visual element is created,
// so a client that changed its mind could never clear the SSR attributes.
// Suppressing the *transition* instead keeps one identical server/client tree.
const initialState = hiddenState

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
const transition = computed(() => {
  if (shouldReduceMotion.value || waitingForView.value) {
    return { duration: 0 }
  }

  return {
    delay: props.delay / MICRO_SCALE_FADE_MS,
    duration: MICRO_SCALE_FADE_DURATION_S,
    ease: MICRO_SCALE_FADE_EASE,
  }
})
</script>
