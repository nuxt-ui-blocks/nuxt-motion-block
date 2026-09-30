<template>
  <span
    :aria-label="label"
    aria-live="polite"
    role="status"
    class="relative inline-flex shrink-0 items-center justify-center"
    :style="{ color: color || 'currentColor', height: `${size}px`, width: `${size}px` }"
  >
    <!-- orbit -->
    <template v-if="variant === 'orbit'">
      <span
        class="absolute inset-0 rounded-full border border-current"
        :style="{ opacity: TRACK_OPACITY }"
      />
      <motion.span
        :animate="prefersReducedMotion ? undefined : { rotate: FULL_TURN }"
        class="absolute inset-0"
        :transition="prefersReducedMotion ? undefined : loop(CYCLE / safeSpeed, LINEAR)"
      >
        <span
          class="absolute top-0 left-1/2 rounded-full bg-current"
          :style="{
            height: `${size * DOT_RATIO}px`,
            width: `${size * DOT_RATIO}px`,
            marginLeft: `${-(size * DOT_RATIO) * 0.5}px`,
            marginTop: `${-(size * DOT_RATIO) * 0.5}px`,
          }"
        />
      </motion.span>
    </template>

    <!-- newton-cradle -->
    <template v-else-if="variant === 'newton-cradle'">
      <span class="absolute inset-0 flex items-start justify-center">
        <motion.span
          v-for="(_, index) in cradleArray"
          :key="`cradle-${index}`"
          class="relative block"
          :style="{
            height: `${size}px`,
            transformOrigin: 'top center',
            width: `${size / CRADLE_BALLS}px`,
          }"
          :animate="prefersReducedMotion || !cradleKeyframes(index) ? undefined : { rotate: cradleKeyframes(index) }"
          :transition="prefersReducedMotion || !cradleKeyframes(index) ? undefined : { ...loop(SLOW_CYCLE / safeSpeed, EASE_IN_OUT), times: CRADLE_TIMES }"
        >
          <span
            class="absolute top-0 bottom-0 left-1/2 w-px bg-current"
            :style="{ opacity: TRACK_OPACITY }"
          />
          <span
            class="absolute bottom-0 left-1/2 rounded-full bg-current"
            :style="{
              height: `${size / CRADLE_BALLS}px`,
              width: `${size / CRADLE_BALLS}px`,
              marginLeft: `${-(size / CRADLE_BALLS) * 0.5}px`,
            }"
          />
        </motion.span>
      </span>
    </template>

    <!-- pendulum -->
    <template v-else-if="variant === 'pendulum'">
      <motion.span
        :animate="prefersReducedMotion ? undefined : { rotate: [-PENDULUM_SWING_DEG, PENDULUM_SWING_DEG, -PENDULUM_SWING_DEG] }"
        class="absolute inset-0"
        :style="{ transformOrigin: 'top center' }"
        :transition="prefersReducedMotion ? undefined : loop(SLOW_CYCLE / safeSpeed, EASE_IN_OUT)"
      >
        <span
          class="absolute top-0 bottom-2 left-1/2 w-px bg-current"
          :style="{ opacity: TRACK_OPACITY }"
        />
        <span
          class="absolute bottom-0 left-1/2 rounded-full bg-current"
          :style="{
            height: `${size * DOT_RATIO * 1.5}px`,
            width: `${size * DOT_RATIO * 1.5}px`,
            marginLeft: `${-(size * DOT_RATIO * 1.5) * 0.5}px`,
          }"
        />
      </motion.span>
    </template>

    <!-- hourglass -->
    <template v-else-if="variant === 'hourglass'">
      <motion.svg
        :animate="prefersReducedMotion ? undefined : { rotate: [0, 0, HALF_TURN, HALF_TURN, FULL_TURN] }"
        class="absolute inset-0 fill-current"
        :height="size"
        :width="size"
        viewBox="0 0 24 24"
        :transition="prefersReducedMotion ? undefined : { ...loop(SLOW_CYCLE / safeSpeed, EASE_IN_OUT), times: [0, 0.3, 0.5, 0.8, 1] }"
      >
        <path
          d="M5 2h14v2l-6 8 6 8v2H5v-2l6-8-6-8V2z"
          :opacity="TRACK_OPACITY"
        />
        <path d="M7 4h10l-5 6.5L7 4zm0 16h10l-5-6.5L7 20z" />
      </motion.svg>
    </template>

    <!-- morph-ring -->
    <template v-else-if="variant === 'morph-ring'">
      <motion.svg
        :animate="prefersReducedMotion ? undefined : { scale: [1, 0.88, 1] }"
        class="absolute inset-0 stroke-current"
        fill="none"
        :height="size"
        :width="size"
        viewBox="0 0 48 48"
        :transition="prefersReducedMotion ? undefined : loop(CYCLE / safeSpeed, EASE_IN_OUT)"
      >
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          stroke-dasharray="62 64"
          stroke-linecap="round"
          stroke-width="4"
          :style="{ transformOrigin: 'center' }"
          :animate="prefersReducedMotion ? undefined : { rotate: FULL_TURN }"
          :transition="prefersReducedMotion ? undefined : loop(CYCLE / safeSpeed, LINEAR)"
        />
        <motion.circle
          cx="24"
          cy="24"
          :opacity="0.45"
          r="11"
          stroke-dasharray="24 45"
          stroke-linecap="round"
          stroke-width="4"
          :style="{ transformOrigin: 'center' }"
          :animate="prefersReducedMotion ? undefined : { rotate: -FULL_TURN }"
          :transition="prefersReducedMotion ? undefined : loop((CYCLE * 1.5) / safeSpeed, LINEAR)"
        />
      </motion.svg>
    </template>

    <!-- square-snake -->
    <template v-else-if="variant === 'square-snake'">
      <span
        v-for="(_, index) in snakeArray"
        :key="`snake-${index}`"
        class="absolute rounded-sm bg-current"
        :style="{
          ...snakePositions[index],
          height: `${size * SNAKE_CELL_RATIO}px`,
          width: `${size * SNAKE_CELL_RATIO}px`,
          opacity: TRACK_OPACITY,
        }"
      />
      <motion.span
        :animate="prefersReducedMotion ? undefined : { x: [0, snakeTravel, snakeTravel, 0, 0], y: [0, 0, snakeTravel, snakeTravel, 0] }"
        class="absolute top-0 left-0 rounded-sm bg-current"
        :style="{ height: `${size * SNAKE_CELL_RATIO}px`, width: `${size * SNAKE_CELL_RATIO}px` }"
        :transition="prefersReducedMotion ? undefined : { ...loop(SLOW_CYCLE / safeSpeed, EASE_IN_OUT), times: [0, 0.25, 0.5, 0.75, 1] }"
      />
    </template>

    <!-- comet -->
    <template v-else-if="variant === 'comet'">
      <motion.span
        :animate="prefersReducedMotion ? undefined : { rotate: FULL_TURN }"
        class="absolute inset-0"
        :transition="prefersReducedMotion ? undefined : loop(CYCLE / safeSpeed, LINEAR)"
      >
        <span
          v-for="(_, index) in trailArray"
          :key="`comet-${index}`"
          class="absolute inset-0"
          :style="{ transform: `rotate(${-index * TRAIL_STEP_DEG}deg)` }"
        >
          <span
            class="absolute top-0 left-1/2 rounded-full bg-current"
            :style="{
              height: `${size * SMALL_DOT_RATIO * (1 - index / (TRAIL_LENGTH * 2))}px`,
              width: `${size * SMALL_DOT_RATIO * (1 - index / (TRAIL_LENGTH * 2))}px`,
              marginLeft: `${-(size * SMALL_DOT_RATIO) * 0.5}px`,
              opacity: 1 - index / TRAIL_LENGTH,
            }"
          />
        </span>
      </motion.span>
    </template>

    <!-- radar -->
    <template v-else-if="variant === 'radar'">
      <span
        class="absolute inset-0 rounded-full border border-current"
        :style="{ opacity: TRACK_OPACITY }"
      />
      <span class="absolute inset-0 overflow-hidden rounded-full">
        <motion.span
          :animate="prefersReducedMotion ? undefined : { rotate: FULL_TURN }"
          class="absolute inset-0"
          :style="{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 260deg, currentColor 360deg)' }"
          :transition="prefersReducedMotion ? undefined : loop(CYCLE / safeSpeed, LINEAR)"
        />
      </span>
      <span
        class="absolute top-1/2 left-1/2 rounded-full bg-current"
        :style="{
          height: `${size * SMALL_DOT_RATIO}px`,
          width: `${size * SMALL_DOT_RATIO}px`,
          marginLeft: `${-(size * SMALL_DOT_RATIO) * 0.5}px`,
          marginTop: `${-(size * SMALL_DOT_RATIO) * 0.5}px`,
        }"
      />
    </template>

    <!-- cube-flip -->
    <template v-else-if="variant === 'cube-flip'">
      <span
        class="absolute inset-0"
        :style="{ perspective: `${size * 3}px` }"
      >
        <motion.span
          :animate="prefersReducedMotion ? undefined : { rotateX: [0, HALF_TURN, HALF_TURN, FULL_TURN], rotateY: [0, 0, HALF_TURN, HALF_TURN] }"
          class="absolute inset-0 rounded-md bg-current"
          :transition="prefersReducedMotion ? undefined : { ...loop((SLOW_CYCLE * 1.5) / safeSpeed, EASE_IN_OUT), times: [0, 0.33, 0.66, 1] }"
        />
      </span>
    </template>

    <!-- wave-bars -->
    <template v-else-if="variant === 'wave-bars'">
      <span
        class="absolute inset-0 flex items-center justify-between"
        :style="{ gap: `${(size / (WAVE_BARS * 2)) * 0.5}px` }"
      >
        <motion.span
          v-for="(_, index) in waveArray"
          :key="`wave-${index}`"
          class="flex-1 rounded-full bg-current"
          :style="{ height: `${size}px` }"
          :animate="prefersReducedMotion ? undefined : { scaleY: [WAVE_MIN_SCALE, 1, WAVE_MIN_SCALE] }"
          :transition="prefersReducedMotion ? undefined : delayedLoop(CYCLE / safeSpeed, EASE_IN_OUT, index * WAVE_STAGGER)"
        />
      </span>
    </template>

    <!-- breathing-glow -->
    <template v-else-if="variant === 'breathing-glow'">
      <motion.span
        :animate="prefersReducedMotion ? undefined : { opacity: [GLOW_MIN_OPACITY, 0, GLOW_MIN_OPACITY], scale: [1, GLOW_SCALE, 1] }"
        class="absolute inset-0 rounded-full bg-current blur-md"
        :style="{ opacity: GLOW_MIN_OPACITY }"
        :transition="prefersReducedMotion ? undefined : loop(SLOW_CYCLE / safeSpeed, EASE_IN_OUT)"
      />
      <motion.span
        :animate="prefersReducedMotion ? undefined : { scale: [1, GLOW_SCALE, 1] }"
        class="rounded-full bg-current"
        :style="{ height: `${size * 0.5}px`, width: `${size * 0.5}px` }"
        :transition="prefersReducedMotion ? undefined : loop(SLOW_CYCLE / safeSpeed, EASE_OUT)"
      />
    </template>

    <!-- dot-ring -->
    <template v-else-if="variant === 'dot-ring'">
      <motion.span
        v-for="(_, index) in ringArray"
        :key="`ring-${index}`"
        class="absolute top-1/2 left-1/2 rounded-full bg-current"
        :style="{
          height: `${size * SMALL_DOT_RATIO}px`,
          width: `${size * SMALL_DOT_RATIO}px`,
          marginLeft: `${-(size * SMALL_DOT_RATIO) * 0.5}px`,
          marginTop: `${-(size * SMALL_DOT_RATIO) * 0.5}px`,
          opacity: prefersReducedMotion ? 1 - index * RING_DOT_FADE * 0.5 : undefined,
          transform: `rotate(${(index * FULL_TURN) / RING_DOTS}deg) translateY(${-radius}px)`,
        }"
        :animate="prefersReducedMotion ? undefined : { opacity: [1, RING_DOT_FADE] }"
        :transition="prefersReducedMotion ? undefined : delayedLoop(CYCLE / safeSpeed, LINEAR, index * RING_STAGGER)"
      />
    </template>

    <span class="sr-only">{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { motion } from 'motion-v'

export type MotionLoaderVariant
  = | 'orbit'
    | 'newton-cradle'
    | 'pendulum'
    | 'hourglass'
    | 'morph-ring'
    | 'square-snake'
    | 'comet'
    | 'radar'
    | 'cube-flip'
    | 'wave-bars'
    | 'breathing-glow'
    | 'dot-ring'

interface Props {
  className?: string
  color?: string
  label?: string
  size?: number
  speed?: number
  variant?: MotionLoaderVariant
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  color: '',
  label: 'Loading',
  size: 40,
  speed: 1,
  variant: 'orbit',
})

const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

const safeSpeed = computed(() => (props.speed > 0 ? props.speed : 1))

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const LINEAR: [number, number, number, number] = [0, 0, 1, 1]
const EASE_IN_OUT: [number, number, number, number] = [0.645, 0.045, 0.355, 1]
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

const CYCLE = 1.1
const SLOW_CYCLE = 1.4
const FULL_TURN = 360
const HALF_TURN = 180

const DOT_RATIO = 0.2
const SMALL_DOT_RATIO = 0.14
const TRACK_OPACITY = 0.2
const TRAIL_LENGTH = 4
const TRAIL_STEP_DEG = 16
const CRADLE_BALLS = 5
const CRADLE_SWING_DEG = 34
const PENDULUM_SWING_DEG = 32
const WAVE_BARS = 5
const WAVE_MIN_SCALE = 0.3
const WAVE_STAGGER = 0.1
const RING_DOTS = 8
const RING_DOT_FADE = 0.15
const RING_STAGGER = 0.09
const SNAKE_CELL_RATIO = 0.38
const SNAKE_CORNERS = 4
const GLOW_SCALE = 1.25
const GLOW_MIN_OPACITY = 0.45

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const loop = (duration: number, ease: [number, number, number, number]) => ({
  duration,
  ease,
  repeat: Number.POSITIVE_INFINITY,
  repeatType: 'loop' as const,
})

const delayedLoop = (duration: number, ease: [number, number, number, number], delay: number) => ({
  ...loop(duration, ease),
  delay,
})

/* -------------------------------------------------------------------------- */
/* Newton cradle keyframes                                                    */
/* -------------------------------------------------------------------------- */

const CRADLE_TIMES = [0, 0.25, 0.5, 0.75, 1]

const cradleArray = Array.from({ length: CRADLE_BALLS })
const snakeArray = Array.from({ length: SNAKE_CORNERS })
const trailArray = Array.from({ length: TRAIL_LENGTH })
const waveArray = Array.from({ length: WAVE_BARS })
const ringArray = Array.from({ length: RING_DOTS })

const cradleKeyframes = (index: number): number[] | undefined => {
  if (index === 0) return [0, -CRADLE_SWING_DEG, 0, 0, 0]
  if (index === CRADLE_BALLS - 1) return [0, 0, 0, CRADLE_SWING_DEG, 0]
  return undefined
}

/* -------------------------------------------------------------------------- */
/* Square snake positions                                                     */
/* -------------------------------------------------------------------------- */

const snakeTravel = computed(() => props.size - props.size * SNAKE_CELL_RATIO)

const snakePositions = computed(() => [
  { left: '0px', top: '0px' },
  { left: `${snakeTravel.value}px`, top: '0px' },
  { left: `${snakeTravel.value}px`, top: `${snakeTravel.value}px` },
  { left: '0px', top: `${snakeTravel.value}px` },
])

/* -------------------------------------------------------------------------- */
/* Dot ring radius                                                            */
/* -------------------------------------------------------------------------- */

const radius = computed(() => props.size * 0.5 - (props.size * SMALL_DOT_RATIO) * 0.5)
</script>
