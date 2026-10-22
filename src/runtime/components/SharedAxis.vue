<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { AnimatePresence, Motion, useReducedMotion } from 'motion-v'

export type SharedAxisDirection = 'x' | 'y' | 'z'

export interface SharedAxisProps {
  /** Which shared axis the phrases travel along. */
  axis?: SharedAxisDirection
  /** Extra classes for the root element. */
  class?: string
  /** Milliseconds each phrase stays on screen before the next one. */
  interval?: number
  /** Phrases to cycle through. A single phrase disables the rotation. */
  phrases: string[]
}

const props = withDefaults(defineProps<SharedAxisProps>(), {
  axis: 'x',
  interval: 2500,
})

const ENTER_EASE = [0.2, 0, 0, 1] as const
const EXIT_EASE = [0.4, 0, 1, 1] as const
const ENTER_DURATION_S = 0.5
const EXIT_DURATION_S = 0.36

const index = ref(0)
const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

/**
 * One phrase at a time, so `mode="wait"` is what keeps the container from
 * growing to two phrases wide while the swap is in flight.
 */
const current = computed(() => props.phrases[index.value] ?? '')

function initialFor(axis: SharedAxisDirection) {
  if (axis === 'z') {
    return { filter: 'blur(2px)', opacity: 0, scale: 0.9 }
  }

  return axis === 'y'
    ? { opacity: 0, y: 24 }
    : { opacity: 0, scale: 0.98, x: 24 }
}

function animateFor(axis: SharedAxisDirection) {
  if (axis === 'z') {
    return { filter: 'blur(0px)', opacity: 1, scale: 1 }
  }

  return axis === 'y'
    ? { opacity: 1, y: 0 }
    : { opacity: 1, scale: 1, x: 0 }
}

function exitFor(axis: SharedAxisDirection) {
  if (isReduced.value) {
    return { opacity: 0, transition: { duration: 0 } }
  }

  if (axis === 'z') {
    return {
      filter: 'blur(1px)',
      opacity: 0,
      scale: 1.06,
      transition: { duration: EXIT_DURATION_S, ease: EXIT_EASE },
    }
  }

  return axis === 'y'
    ? { opacity: 0, transition: { duration: EXIT_DURATION_S, ease: EXIT_EASE }, y: -20 }
    : { opacity: 0, scale: 0.98, transition: { duration: EXIT_DURATION_S, ease: EXIT_EASE }, x: -20 }
}

/**
 * `initial` keeps the axis offset under reduced motion on purpose. Swapping it
 * for `{ opacity: 1 }` would make it identical to `animate`, and motion-v treats
 * "initial equals animate" as "nothing to write" - which strands the SSR'd
 * hidden style on the element until the first phrase swap. The zero-duration
 * transition below is what removes the travel, not a different start state.
 */
const initial = computed(() => initialFor(props.axis))
const animate = computed(() => animateFor(props.axis))
const exit = computed(() => exitFor(props.axis))
const transition = computed(() => isReduced.value
  ? { duration: 0 }
  : { duration: ENTER_DURATION_S, ease: ENTER_EASE })

let timer: ReturnType<typeof setInterval> | undefined

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
}

function start() {
  stop()

  // A single phrase has nowhere to rotate to, and the server never runs the
  // clock, so both bail before anything is scheduled.
  if (props.phrases.length <= 1) {
    return
  }

  timer = setInterval(() => {
    index.value = (index.value + 1) % props.phrases.length
  }, Math.max(props.interval, 300))
}

onMounted(start)
onBeforeUnmount(stop)

watch(() => [props.interval, props.phrases.length], () => {
  index.value = 0
  start()
})

/**
 * The axis travels somewhere, so the container has to clip: without
 * `overflow-hidden` the incoming phrase is visible outside the line for the
 * first frames and reads as two overlapping strings.
 */
const axisClip = computed(() => props.axis !== 'y')
</script>

<template>
  <span
    :class="[props.class, 'relative inline-block', axisClip ? 'overflow-hidden' : '']"
    aria-atomic="true"
    aria-live="polite"
  >
    <AnimatePresence mode="wait">
      <Motion
        :key="index"
        as="span"
        :animate="animate"
        :exit="exit"
        :initial="initial"
        :transition="transition"
        style="display: inline-block"
      >
        {{ current }}
      </Motion>
    </AnimatePresence>
  </span>
</template>
