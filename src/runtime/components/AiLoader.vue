<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { motion, useReducedMotion } from 'motion-v'

export type AILoaderVariant = 'dots' | 'bar' | 'grid'

export interface AILoaderProps {
  /** Extra classes for the wrapper. */
  class?: string
  /** Optional text before the indicator, e.g. "Thinking". */
  label?: string
  /** Append a live elapsed counter for long waits. */
  showElapsed?: boolean
  /** Shape of the indicator. */
  variant?: AILoaderVariant
}

const props = withDefaults(defineProps<AILoaderProps>(), {
  class: undefined,
  label: undefined,
  showElapsed: false,
  variant: 'dots',
})

/**
 * One cycle length for every variant. Two loaders on the same screen running
 * at different tempos read as unrelated things loading; sharing the cycle
 * makes them feel like one system.
 */
const AI_LOADER_CYCLE_SECONDS = 1.2
const DOT_COUNT = 3
const GRID_SIZE = 3
const GRID_CELLS = GRID_SIZE * GRID_SIZE
/** Diagonal wave order, so the grid fills like a sweep rather than at random. */
const GRID_DELAYS = [0, 1, 2, 1, 2, 3, 2, 3, 4]
const EASE_IN_OUT = [0.645, 0.045, 0.355, 1] as const
const MS_PER_SECOND = 1000
const ELAPSED_DECIMALS = 1

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const dotAnimate = computed(() => (isReduced.value ? { opacity: 0.5 } : { opacity: [0.25, 1, 0.25] }))
const gridAnimate = computed(() => (isReduced.value ? { opacity: 0.45 } : { opacity: [0.2, 1, 0.2] }))
const barAnimate = computed(() => (isReduced.value ? { x: '0%' } : { x: ['-100%', '200%'] }))

function dotTransition(index: number) {
  if (isReduced.value) {
    return { duration: 0 }
  }

  return {
    delay: (index * AI_LOADER_CYCLE_SECONDS) / (DOT_COUNT * 2),
    duration: AI_LOADER_CYCLE_SECONDS,
    ease: EASE_IN_OUT,
    repeat: Number.POSITIVE_INFINITY,
  }
}

function gridTransition(index: number) {
  if (isReduced.value) {
    return { duration: 0 }
  }

  return {
    delay: ((GRID_DELAYS[index] ?? 0) * AI_LOADER_CYCLE_SECONDS) / 8,
    duration: AI_LOADER_CYCLE_SECONDS,
    ease: EASE_IN_OUT,
    repeat: Number.POSITIVE_INFINITY,
  }
}

const barTransition = computed(() =>
  isReduced.value
    ? { duration: 0 }
    : {
        duration: AI_LOADER_CYCLE_SECONDS * 1.4,
        ease: EASE_IN_OUT,
        repeat: Number.POSITIVE_INFINITY,
      },
)

const elapsed = ref(0)
const formattedElapsed = computed(() => `${elapsed.value.toFixed(ELAPSED_DECIMALS)}s`)

let startTime: number | null = null
let frame = 0

function tick(time: number) {
  if (startTime === null) {
    startTime = time
  }

  const next = (time - startTime) / MS_PER_SECOND

  // Only re-render when a tenth changes: a 60fps counter is unreadable and
  // re-renders the whole label for nothing.
  if (next.toFixed(ELAPSED_DECIMALS) !== elapsed.value.toFixed(ELAPSED_DECIMALS)) {
    elapsed.value = next
  }

  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (!props.showElapsed) {
    return
  }

  frame = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (frame) {
    cancelAnimationFrame(frame)
  }
})
</script>

<template>
  <span
    aria-live="polite"
    :class="['inline-flex items-center gap-2 text-sm text-muted', props.class]"
    role="status"
  >
    <span v-if="props.label">{{ props.label }}</span>

    <span
      v-if="props.variant === 'dots'"
      class="flex items-center gap-1"
    >
      <motion.span
        v-for="index in DOT_COUNT"
        :key="index"
        :animate="dotAnimate"
        class="size-1.5 rounded-full bg-current"
        :transition="dotTransition(index - 1)"
      />
    </span>

    <span
      v-else-if="props.variant === 'bar'"
      class="relative block h-1 w-24 overflow-hidden rounded-full bg-current/15"
    >
      <!-- A sweep, not a percentage. Faking determinate progress for an
           unknown wait is the one thing a loader must never do. -->
      <motion.span
        :animate="barAnimate"
        class="absolute inset-y-0 w-1/3 rounded-full bg-current"
        :transition="barTransition"
      />
    </span>

    <span
      v-else
      class="grid grid-cols-3 gap-0.5"
    >
      <motion.span
        v-for="index in GRID_CELLS"
        :key="index"
        :animate="gridAnimate"
        class="size-1.5 rounded-[2px] bg-current"
        :transition="gridTransition(index - 1)"
      />
    </span>

    <span
      v-if="props.showElapsed"
      class="tabular-nums opacity-60"
    >{{ formattedElapsed }}</span>

    <span
      v-if="!props.label"
      class="sr-only"
    >Loading</span>
  </span>
</template>
