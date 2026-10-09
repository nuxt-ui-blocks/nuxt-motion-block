<template>
  <span
    :class="props.class"
    aria-live="polite"
    :style="{ display: 'inline-block', position: 'relative', overflow: 'hidden' }"
  >
    <AnimatePresence mode="wait">
      <Motion
        :key="phraseIndex"
        as="span"
        :initial="initialState"
        :animate="shownState"
        :exit="exitState"
        :style="{ display: 'inline-flex', flexWrap: 'nowrap', gap: `${SHORT_SLIDE_RIGHT_WORD_GAP_EM}em` }"
        :transition="phraseTransition"
      >
        <Motion
          v-for="(word, index) in words"
          :key="index"
          as="span"
          :initial="wordHiddenState"
          :animate="wordShownState"
          style="display: inline-block"
          :transition="wordTransition(index)"
        >
          {{ word }}
        </Motion>
      </Motion>
    </AnimatePresence>
  </span>
</template>

<script setup lang="ts">
import { AnimatePresence, Motion, useReducedMotion } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  SHORT_SLIDE_RIGHT_DEFAULT_INTERVAL,
  SHORT_SLIDE_RIGHT_DURATION_S,
  SHORT_SLIDE_RIGHT_ENTER_EASE,
  SHORT_SLIDE_RIGHT_EXIT_BLUR,
  SHORT_SLIDE_RIGHT_EXIT_DURATION_S,
  SHORT_SLIDE_RIGHT_EXIT_EASE,
  SHORT_SLIDE_RIGHT_EXIT_X,
  SHORT_SLIDE_RIGHT_START_BLUR,
  SHORT_SLIDE_RIGHT_START_X,
  SHORT_SLIDE_RIGHT_WORD_DURATION_S,
  SHORT_SLIDE_RIGHT_WORD_GAP_EM,
  SHORT_SLIDE_RIGHT_WORD_STAGGER_S,
} from './constants'

/**
 * Props for ShortSlideRight.
 *
 * `aria-live="polite"` is set on the wrapper rather than a label on it: this
 * component swaps phrases on a timer, so a label would be re-announced on every
 * swap. A live region announces the new phrase once, at the polite priority,
 * and interrupts nothing.
 */
export interface ShortSlideRightProps {
  /** Class applied to the wrapper element. */
  class?: string
  /** Milliseconds between phrase swaps. */
  interval?: number
  /** The phrases to cycle through. */
  phrases: string[]
}

const props = withDefaults(defineProps<ShortSlideRightProps>(), {
  interval: SHORT_SLIDE_RIGHT_DEFAULT_INTERVAL,
})

const shouldReduceMotion = useReducedMotion()

const phraseIndex = ref(0)

const words = computed(() => props.phrases[phraseIndex.value]?.split(' ') ?? [])

// Stable object identity matters here. motion-v compares `initial` against
// `animate` by reference to decide whether there is anything to animate, so
// freshly-built literals each render would defeat the reduced-motion case.
// `initial` is the hidden state on the server and the client alike: the server
// cannot know the motion preference, and `initial` is only read when the visual
// element is created, so a client that changed its mind could never clear the
// SSR attributes. Suppressing the *transition* instead keeps one identical
// server/client tree.
const hiddenState = {
  filter: `blur(${SHORT_SLIDE_RIGHT_START_BLUR}px)`,
  x: SHORT_SLIDE_RIGHT_START_X,
}

const shownState = { filter: 'blur(0px)', x: 0 }

/**
 * The exit carries its own transition rather than reusing the enter one. The
 * element-level `transition` prop applies to every animation on the phrase,
 * including the exit, so leaving it to fall through would glide the phrase out
 * at the same weight it came in — and would also animate the exit out from
 * under reduced motion. Keying it here keeps both correct.
 */
const exitState = computed(() => {
  const target = {
    filter: `blur(${SHORT_SLIDE_RIGHT_EXIT_BLUR}px)`,
    opacity: 0,
    x: SHORT_SLIDE_RIGHT_EXIT_X,
  }

  if (shouldReduceMotion.value) {
    return target
  }

  return {
    ...target,
    transition: {
      duration: SHORT_SLIDE_RIGHT_EXIT_DURATION_S,
      ease: SHORT_SLIDE_RIGHT_EXIT_EASE,
    },
  }
})

const initialState = hiddenState

const wordHiddenState = { opacity: 0 }
const wordShownState = { opacity: 1 }

const phraseTransition = computed(() =>
  // Zero duration rather than no animation at all. motion-v treats "nothing to
  // animate" as "write nothing" and would leave the hidden styles stranded; a
  // zero-length transition still commits the resolved values within one frame.
  shouldReduceMotion.value
    ? { duration: 0 }
    : { duration: SHORT_SLIDE_RIGHT_DURATION_S, ease: SHORT_SLIDE_RIGHT_ENTER_EASE },
)

/**
 * The words fade in slightly after the phrase starts gliding, so the phrase
 * arrives as one object first and resolves into words second.
 */
function wordTransition(index: number) {
  if (shouldReduceMotion.value) {
    return { duration: 0 }
  }

  return {
    delay: index * SHORT_SLIDE_RIGHT_WORD_STAGGER_S,
    duration: SHORT_SLIDE_RIGHT_WORD_DURATION_S,
    ease: SHORT_SLIDE_RIGHT_ENTER_EASE,
  }
}

// The interval runs even under reduced motion. The swap itself is instant
// there, but a rotating slot that freezes leaves a hole in the layout, so it
// still cycles — only without the travel.
let timer: ReturnType<typeof setInterval> | undefined

function arm() {
  if (timer) {
    clearInterval(timer)
  }

  timer = setInterval(() => {
    phraseIndex.value = (phraseIndex.value + 1) % props.phrases.length
  }, props.interval)
}

onMounted(arm)

// Re-arm when the period or the phrase count changes. Reading `interval` once
// at mount would silently ignore a later change to it, and the countdown would
// keep running at the original pace.
watch(
  [() => props.interval, () => props.phrases.length],
  arm,
)

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
