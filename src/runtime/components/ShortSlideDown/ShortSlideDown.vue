<template>
  <span
    :class="props.class"
    aria-live="polite"
    :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${SHORT_SLIDE_DOWN_GAP}px` }"
  >
    <AnimatePresence mode="popLayout">
      <Motion
        v-for="(word, index) in visibleWords"
        :key="`${phraseIndex}-${index}`"
        as="span"
        :initial="initialState"
        :animate="exiting ? exitState : restingState"
        :exit="exitState"
        layout
        style="display: block"
        :transition="wordTransition(index)"
      >
        {{ word }}
      </Motion>
    </AnimatePresence>
  </span>
</template>

<script setup lang="ts">
import { AnimatePresence, Motion, useReducedMotion } from 'motion-v'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import {
  SHORT_SLIDE_DOWN_BUILD_EASE,
  SHORT_SLIDE_DOWN_DEFAULT_INTERVAL,
  SHORT_SLIDE_DOWN_EXIT_BLUR,
  SHORT_SLIDE_DOWN_EXIT_DURATION_S,
  SHORT_SLIDE_DOWN_EXIT_EASE,
  SHORT_SLIDE_DOWN_EXIT_LEAD_MS,
  SHORT_SLIDE_DOWN_EXIT_TAIL_MS,
  SHORT_SLIDE_DOWN_EXIT_Y,
  SHORT_SLIDE_DOWN_FIRST_WORD_DURATION_S,
  SHORT_SLIDE_DOWN_GAP,
  SHORT_SLIDE_DOWN_LAYOUT_DURATION_S,
  SHORT_SLIDE_DOWN_START_BLUR,
  SHORT_SLIDE_DOWN_START_SCALE,
  SHORT_SLIDE_DOWN_START_Y,
  SHORT_SLIDE_DOWN_WORD_DURATION_S,
  SHORT_SLIDE_DOWN_WORD_STEP_MS,
} from './constants'

/**
 * Props for ShortSlideDown.
 *
 * `aria-live="polite"` is set on the wrapper rather than a label on it: this
 * component rotates through phrases on a timer, so a label would be re-announced
 * on every swap. A live region announces the new phrase once, at the polite
 * priority, and interrupts nothing.
 */
export interface ShortSlideDownProps {
  /** Class applied to the wrapper element. */
  class?: string
  /** Milliseconds to hold a completed phrase before the next one begins. */
  interval?: number
  /** The phrases to cycle through, one per line. */
  phrases: string[]
}

const props = withDefaults(defineProps<ShortSlideDownProps>(), {
  interval: SHORT_SLIDE_DOWN_DEFAULT_INTERVAL,
})

const shouldReduceMotion = useReducedMotion()

const phraseIndex = ref(0)
const wordCount = ref(1)
const exiting = ref(false)

const currentPhrase = computed(() => props.phrases[phraseIndex.value] ?? '')
const words = computed(() => currentPhrase.value.split(' '))

// Reduced motion drops the build entirely and shows the finished phrase, then
// still cycles. Skipping the mount animation would be the obvious thing to do,
// but a multi-line composition that changes height between phrases needs the
// stack to be complete before it is announced.
const visibleWords = computed(() =>
  shouldReduceMotion.value ? words.value : words.value.slice(0, wordCount.value),
)

const hiddenState = {
  filter: `blur(${SHORT_SLIDE_DOWN_START_BLUR}px)`,
  opacity: 0,
  scale: SHORT_SLIDE_DOWN_START_SCALE,
  y: SHORT_SLIDE_DOWN_START_Y,
}

const restingState = { filter: 'blur(0px)', opacity: 1, scale: 1, y: 0 }

/**
 * The exit carries its own transition rather than reusing the build one. The
 * element-level `transition` prop applies to every animation on the word,
 * including the exit, so leaving it to fall through would collapse the stack
 * with the build ease — and would also animate the exit out from under reduced
 * motion. Keying it here keeps both correct.
 */
const exitState = computed(() => {
  const target = {
    filter: `blur(${SHORT_SLIDE_DOWN_EXIT_BLUR}px)`,
    opacity: 0,
    y: SHORT_SLIDE_DOWN_EXIT_Y,
  }

  if (shouldReduceMotion.value) {
    return target
  }

  return {
    ...target,
    transition: {
      duration: SHORT_SLIDE_DOWN_EXIT_DURATION_S,
      ease: SHORT_SLIDE_DOWN_EXIT_EASE,
    },
  }
})

// Stable object identity matters here. motion-v compares `initial` against
// `animate` by reference to decide whether there is anything to animate, so
// freshly-built literals each render would defeat the waiting and reduced-motion
// cases. `initial` is the hidden state on the server and the client alike: the
// server cannot know the motion preference, and `initial` is only read when the
// visual element is created, so a client that changed its mind could never clear
// the SSR attributes. Suppressing the *transition* instead keeps one identical
// server/client tree.
const initialState = hiddenState

const timers: ReturnType<typeof setTimeout>[] = []

/**
 * Drives the whole cycle: reveal one word at a time, hold, collapse, advance.
 * Keyed on the phrase index so a new phrase always rebuilds from the first word.
 */
function schedule() {
  for (const timer of timers) {
    clearTimeout(timer)
  }
  timers.length = 0

  if (shouldReduceMotion.value) {
    timers.push(setTimeout(advance, props.interval))
    return
  }

  wordCount.value = 1
  exiting.value = false

  for (let i = 1; i < words.value.length; i++) {
    timers.push(setTimeout(() => {
      wordCount.value = i + 1
    }, i * SHORT_SLIDE_DOWN_WORD_STEP_MS))
  }

  const totalBuild = (words.value.length - 1) * SHORT_SLIDE_DOWN_WORD_STEP_MS
    + SHORT_SLIDE_DOWN_FIRST_WORD_DURATION_S * 1000

  timers.push(setTimeout(() => {
    exiting.value = true
    timers.push(setTimeout(advance, SHORT_SLIDE_DOWN_EXIT_LEAD_MS + SHORT_SLIDE_DOWN_EXIT_TAIL_MS))
  }, totalBuild + props.interval))
}

function advance() {
  const next = (phraseIndex.value + 1) % props.phrases.length

  phraseIndex.value = next

  // Re-arm here rather than waiting on the watcher. The watcher deliberately does
  // not depend on `phraseIndex` — a phrase change is an internal tick, not new
  // props — so leaving the next cycle to it would strand `exiting` at true after
  // the first phrase and the timer chain would simply run out. Scheduling from
  // `advance` also means every new phrase rebuilds from its first word, which is
  // what makes the effect read as a cycle rather than a loop.
  schedule()
}

function wordTransition(index: number) {
  if (shouldReduceMotion.value) {
    return { duration: 0 }
  }

  return {
    duration: index === 0 ? SHORT_SLIDE_DOWN_FIRST_WORD_DURATION_S : SHORT_SLIDE_DOWN_WORD_DURATION_S,
    ease: SHORT_SLIDE_DOWN_BUILD_EASE,
    layout: { duration: SHORT_SLIDE_DOWN_LAYOUT_DURATION_S, ease: SHORT_SLIDE_DOWN_BUILD_EASE },
  }
}

watch(
  () => [props.phrases.length, props.interval, shouldReduceMotion.value] as const,
  schedule,
  { immediate: true },
)

onBeforeUnmount(() => {
  for (const timer of timers) {
    clearTimeout(timer)
  }
  timers.length = 0
})
</script>
