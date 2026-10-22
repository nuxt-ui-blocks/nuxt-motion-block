<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { AnimatePresence, Motion, useReducedMotion } from 'motion-v'

export interface KineticCenterBuildProps {
  /** Extra classes for the root element. */
  class?: string
  /** How long the finished phrase holds before it exits, in milliseconds. */
  interval?: number
  /** Phrases to build and cycle through. */
  phrases: string[]
}

const props = withDefaults(defineProps<KineticCenterBuildProps>(), {
  interval: 2500,
})

const BUILD_STEP_MS = 430
const BUILD_SETTLE_MS = 340
const EXIT_HOLD_MS = 480
const BUILD_EASE = [0.2, 0.8, 0.2, 1] as const
const EXIT_EASE = [0.4, 0, 0.2, 1] as const

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const phraseIndex = ref(0)
const wordCount = ref(1)
const exiting = ref(false)

const words = computed(() => (props.phrases[phraseIndex.value] ?? '').split(' '))

/**
 * With reduced motion every word is present from the first frame: the build is
 * the effect, so playing it word by word would be exactly what the visitor
 * asked not to see.
 */
const visibleWords = computed(() => isReduced.value ? words.value : words.value.slice(0, wordCount.value))

const restingAnimate = { filter: 'blur(0px)', opacity: 1, scale: 1, x: 0, y: 0 }
const exitAnimate = {
  filter: 'blur(2.5px)',
  opacity: 0,
  transition: { duration: 0.26, ease: EXIT_EASE },
  y: -6,
}

function initialFor() {
  if (isReduced.value) {
    return { opacity: 1 }
  }

  return {
    filter: 'blur(3.5px)',
    opacity: 0,
    scale: 0.992,
    x: 88,
    y: 6,
  }
}

function transitionFor(index: number) {
  if (isReduced.value) {
    return { duration: 0 }
  }

  return {
    duration: index === 0 ? 0.34 : 0.43,
    ease: BUILD_EASE,
    layout: { duration: 0.43, ease: BUILD_EASE },
  }
}

let timers: ReturnType<typeof setTimeout>[] = []

function clearTimers() {
  for (const timer of timers) {
    clearTimeout(timer)
  }

  timers = []
}

/**
 * Every phrase gets its own schedule: one timer per additional word, then a
 * hold, then the exit, then the next phrase. Collapsing them into one
 * `setInterval` would make the last word appear on the clock rather than when
 * the build says it should.
 */
function schedule() {
  clearTimers()

  const count = props.phrases.length

  if (count === 0) {
    return
  }

  const currentWords = words.value

  if (isReduced.value) {
    wordCount.value = currentWords.length
    timers.push(setTimeout(() => {
      phraseIndex.value = (phraseIndex.value + 1) % count
    }, props.interval))
    return
  }

  wordCount.value = 1
  exiting.value = false

  for (let index = 1; index < currentWords.length; index++) {
    timers.push(setTimeout(() => {
      wordCount.value = index + 1
    }, index * BUILD_STEP_MS))
  }

  const totalBuild = (currentWords.length - 1) * BUILD_STEP_MS + BUILD_SETTLE_MS

  timers.push(setTimeout(() => {
    exiting.value = true
    timers.push(setTimeout(() => {
      phraseIndex.value = (phraseIndex.value + 1) % count
      wordCount.value = 1
      exiting.value = false
    }, EXIT_HOLD_MS))
  }, totalBuild + props.interval))
}

onMounted(schedule)
onBeforeUnmount(clearTimers)

watch(phraseIndex, schedule)

watch(() => [props.interval, props.phrases.length, isReduced.value], () => {
  const count = props.phrases.length

  if (count > 0) {
    phraseIndex.value = phraseIndex.value % count
  }

  schedule()
})
</script>

<template>
  <span
    :class="props.class"
    aria-atomic="true"
    aria-live="polite"
    style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px"
  >
    <AnimatePresence mode="popLayout">
      <Motion
        v-for="(word, index) in visibleWords"
        :key="`${phraseIndex}-${index}`"
        as="span"
        layout
        :animate="exiting ? exitAnimate : restingAnimate"
        :initial="initialFor()"
        :transition="transitionFor(index)"
        style="display: inline-block; will-change: transform, opacity, filter"
      >
        {{ word }}
      </Motion>
    </AnimatePresence>
  </span>
</template>
