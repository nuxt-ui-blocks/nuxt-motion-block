<template>
  <Motion
    as="span"
    :animate="shineAnimation"
    :class="props.class"
    :style="shineStyle"
    :transition="shineTransition"
  >
    {{ props.text }}
  </Motion>
</template>

<script setup lang="ts">
import { Motion, useReducedMotion } from 'motion-v'
import { computed, onMounted, ref } from 'vue'
import { useResolvedColor } from '../../composables/useThemeColor'
import {
  DEFAULT_SHINE_BASE_COLOR,
  DEFAULT_SHINE_COLOR,
  DEFAULT_SHINE_DURATION,
  DEFAULT_SHINE_REPEAT_DELAY,
  SHINE_BACKGROUND_SIZE,
  SHINE_BASE_STOP,
  SHINE_END_POSITION,
  SHINE_GRADIENT_ANGLE,
  SHINE_PEAK_STOP,
  SHINE_RETURN_STOP,
  SHINE_START_POSITION,
} from './constants'

/**
 * A highlight that sweeps across text, the way light passes over brushed metal.
 *
 * The text is filled with a wide gradient and the gradient is slid behind the
 * glyphs via `background-clip: text`, so the "shine" is the gradient itself
 * rather than an overlay that would sit on top of the letterforms and mute
 * them.
 *
 * The `defineProps` interface is inline on purpose. The dev server resolves a
 * component's props through the browser-side `compileScript` path, which cannot
 * follow a filesystem import — an imported prop type silently breaks the
 * browser build.
 */
export interface ShineTextProps {
  /** Colour the text sits at rest. Any CSS colour. */
  baseColor?: string
  /** Extra classes merged onto the root span. */
  class?: string
  /** Seconds for one complete sweep. */
  duration?: number
  /** Pause between sweeps, in seconds. */
  repeatDelay?: number
  /** Colour of the travelling highlight band. */
  shineColor?: string
  /** The text to sweep. */
  text: string
}

const props = withDefaults(defineProps<ShineTextProps>(), {
  baseColor: DEFAULT_SHINE_BASE_COLOR,
  duration: DEFAULT_SHINE_DURATION,
  repeatDelay: DEFAULT_SHINE_REPEAT_DELAY,
  shineColor: DEFAULT_SHINE_COLOR,
})

const shouldReduceMotion = useReducedMotion()
const mounted = ref(false)

/**
 * Held true through SSR *and* the first client render, then flipped in
 * `onMounted`.
 */
const canAnimate = computed(() => !mounted.value || !shouldReduceMotion.value)

onMounted(() => {
  mounted.value = true
})

const resolvedBaseColor = useResolvedColor(() => props.baseColor)
const resolvedShineColor = useResolvedColor(() => props.shineColor)

/**
 * The reduced-motion branch drops the gradient entirely instead of just
 * freezing it. Painting with a real `color` is the only variant
 * that is legible in every case.
 */
const shineStyle = computed(() => {
  if (!canAnimate.value) {
    return { color: resolvedBaseColor.value || props.baseColor }
  }

  return {
    backgroundClip: 'text',
    backgroundImage: `linear-gradient(${SHINE_GRADIENT_ANGLE}, ${resolvedBaseColor.value || props.baseColor} ${SHINE_BASE_STOP}, ${resolvedShineColor.value || props.shineColor} ${SHINE_PEAK_STOP}, ${resolvedBaseColor.value || props.baseColor} ${SHINE_RETURN_STOP})`,
    backgroundSize: SHINE_BACKGROUND_SIZE,
    color: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }
})

const shineAnimation = computed(() =>
  canAnimate.value
    ? { backgroundPositionX: [SHINE_START_POSITION, SHINE_END_POSITION] }
    : undefined,
)

/**
 * Linear, infinite, with a pause. The pause matters more than it looks: a
 * continuous sweep reads as a loading state, whereas sweep → rest → sweep reads
 * as light passing over a surface.
 */
const shineTransition = computed(() =>
  canAnimate.value
    ? {
        duration: props.duration,
        ease: 'linear',
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: props.repeatDelay,
      }
    : { duration: 0 },
)
</script>
