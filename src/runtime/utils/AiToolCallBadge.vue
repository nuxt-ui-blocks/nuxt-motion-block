<script setup lang="ts">
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { computed } from 'vue'
import type { AIToolCallStatus } from '../types/ai'

/**
 * The status ring.
 *
 * **One ring that changes behaviour**, not four icons that swap places.
 * `pending` breathes, `running` spins as a gap in the same ring, `success` keeps
 * the ring and draws a check inside it, `error` keeps the ring and draws a cross.
 * Because the ring never unmounts, the eye tracks a single object through the
 * whole lifecycle instead of watching icons pop in and out.
 *
 * Lives in `utils/` rather than `components/` on purpose: `module.ts` scans
 * `components/` with the module's prefix, and the kit should not publish an
 * `MAiToolCallBadge` nobody asked for. `AiToolCall` imports it directly.
 */
const props = defineProps<{
  status: AIToolCallStatus
}>()

const BADGE_VIEWBOX = 24
const BADGE_CENTER = BADGE_VIEWBOX / 2
const RING_RADIUS = 8
const CHECK_PATH = 'M 8.5 12.2 L 11 14.8 L 15.8 9.6'
const crossPaths = ['M 9 9 L 15 15', 'M 15 9 L 9 15'] as const
const SPIN_SECONDS = 0.9
const PENDING_PULSE_SECONDS = 1.6

const EASE_OUT = [0.23, 1, 0.32, 1] as const
const instant = { duration: 0 }

const shouldReduceMotion = useReducedMotion()
const isRunning = computed(() => props.status === 'running')
const isPending = computed(() => props.status === 'pending')

const ringColor = computed(() => {
  if (props.status === 'success') {
    return 'oklch(72% 0.17 150)'
  }
  if (props.status === 'error') {
    return 'oklch(63% 0.21 25)'
  }
  return 'currentColor'
})

// The two strokes of the cross as a single value, so the template can `v-for`
// without a `v-if` on the same element, which eslint rightly rejects.
const markPaths = computed(() => (props.status === 'error' ? crossPaths : []))
</script>

<template>
  <svg
    aria-hidden="true"
    class="size-5 overflow-visible text-muted"
    :viewBox="`0 0 ${BADGE_VIEWBOX} ${BADGE_VIEWBOX}`"
  >
    <motion.g
      :animate="shouldReduceMotion || !isRunning ? undefined : { rotate: 360 }"
      :style="{ transformBox: 'view-box', transformOrigin: 'center' }"
      :transition="{
        duration: SPIN_SECONDS,
        ease: 'linear',
        repeat: Number.POSITIVE_INFINITY,
      }"
    >
      <motion.circle
        :animate="{
          stroke: ringColor,
          // Running opens a gap in the ring; everything else closes it.
          strokeDasharray: isRunning ? '0.68 0.32' : '1 0',
          strokeOpacity: isPending && !shouldReduceMotion ? [0.35, 1, 0.35] : 1,
        }"
        :cx="BADGE_CENTER"
        :cy="BADGE_CENTER"
        fill="none"
        :pathLength="1"
        :r="RING_RADIUS"
        stroke-linecap="round"
        stroke-width="2"
        :transition="{
          stroke: shouldReduceMotion
            ? instant
            : { duration: 0.25, ease: EASE_OUT },
          strokeDasharray: shouldReduceMotion
            ? instant
            : { duration: 0.25, ease: EASE_OUT },
          strokeOpacity: shouldReduceMotion
            ? instant
            : { duration: PENDING_PULSE_SECONDS, repeat: Number.POSITIVE_INFINITY },
        }"
      />
    </motion.g>

    <AnimatePresence :initial="false">
      <motion.path
        v-if="props.status === 'success'"
        :animate="{ opacity: 1, pathLength: 1 }"
        :d="CHECK_PATH"
        :exit="{ opacity: 0, transition: { duration: 0.1 } }"
        fill="none"
        :initial="shouldReduceMotion
          ? { opacity: 1, pathLength: 1 }
          : { opacity: 1, pathLength: 0 }"
        :stroke="ringColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.2"
        :transition="shouldReduceMotion
          ? instant
          : { duration: 0.22, ease: EASE_OUT }"
      />
      <motion.path
        v-for="(path, index) in markPaths"
        :key="path"
        :animate="{ opacity: 1, pathLength: 1 }"
        :d="path"
        :exit="{ opacity: 0, transition: { duration: 0.1 } }"
        fill="none"
        :initial="shouldReduceMotion
          ? { opacity: 1, pathLength: 1 }
          : { opacity: 1, pathLength: 0 }"
        :stroke="ringColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.2"
        :transition="shouldReduceMotion
          ? instant
          : { delay: index * 0.06, duration: 0.16, ease: EASE_OUT }"
      />
    </AnimatePresence>
  </svg>
</template>
