<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { AnimatePresence, Motion, useReducedMotion } from 'motion-v'

export interface FadeThroughProps {
  /** Extra classes for the root element. */
  class?: string
  /** Milliseconds each phrase stays on screen before the next one. */
  interval?: number
  /** Phrases to cycle through. */
  phrases: string[]
}

const props = withDefaults(defineProps<FadeThroughProps>(), {
  interval: 2500,
})

const ENTER_DURATION_S = 0.42
const EXIT_DURATION_S = 0.26
const ENTER_EASE = [0.2, 0, 0, 1] as const
const EXIT_EASE = [0.4, 0, 1, 1] as const

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const index = ref(0)
const current = computed(() => props.phrases[index.value] ?? '')

/**
 * The hidden start state stays in place under reduced motion. Motion-v skips
 * writing when `initial` and `animate` are the same object identity, so
 * flattening `initial` to `{ opacity: 1 }` would leave the SSR'd hidden style
 * on the element. The zero-duration transition is what removes the motion.
 */
const initial = { filter: 'blur(2px)', opacity: 0, scale: 0.99, y: 6 }

const animate = { filter: 'blur(0px)', opacity: 1, scale: 1, y: 0 }

/**
 * Exit keeps `scale` at rest and only lifts the copy a few pixels. Moving both
 * axes on exit makes the hand-off look like a swap of two different objects
 * rather than one line being replaced by another.
 */
const exit = computed(() => isReduced.value
  ? { opacity: 0, transition: { duration: 0 } }
  : {
      filter: 'blur(0px)',
      opacity: 0,
      scale: 1,
      transition: { duration: EXIT_DURATION_S, ease: EXIT_EASE },
      y: -4,
    })

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

  // A visitor who asked for reduced motion still gets the new copy, but
  // cycling on a timer would keep re-announcing text with no visual cue that
  // it changed, so the phrase is left alone.
  if (isReduced.value || props.phrases.length <= 1) {
    return
  }

  timer = setInterval(() => {
    index.value = (index.value + 1) % props.phrases.length
  }, Math.max(props.interval, 300))
}

onMounted(start)
onBeforeUnmount(stop)

watch(() => [props.interval, props.phrases.length, isReduced.value], () => {
  const count = props.phrases.length

  if (count > 0) {
    index.value = index.value % count
  }

  start()
})
</script>

<template>
  <span
    :class="props.class"
    aria-atomic="true"
    aria-live="polite"
    style="display: inline-block; position: relative"
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
