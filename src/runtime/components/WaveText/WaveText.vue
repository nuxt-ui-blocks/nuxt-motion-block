<template>
  <span
    :class="props.class"
    :aria-label="props.text"
    style="display: inline-block"
  >
    <Motion
      v-for="(char, i) in characters"
      :key="`${i}-${char}`"
      as="span"
      aria-hidden="true"
      :animate="waveAnimation"
      :style="{ display: 'inline-block' }"
      :transition="charTransition(i)"
    >
      {{ char === ' ' ? '\u00A0' : char }}
    </Motion>
  </span>
</template>

<script setup lang="ts">
import { Motion, useReducedMotion } from 'motion-v'
import { computed, onMounted, ref } from 'vue'
import {
  DEFAULT_WAVE_AMPLITUDE,
  DEFAULT_WAVE_DURATION,
  DEFAULT_WAVE_STAGGER_DELAY,
  WAVE_EASE,
  WAVE_TIMES,
} from './constants'

/**
 * Props for WaveText.
 *
 * `text` is a string rather than a slot because the component splits it into
 * one animated span per character. A slot would hand back opaque VNodes that
 * cannot be split, which is the whole effect.
 */
export interface WaveTextProps {
  /** Peak vertical travel, in px, in each direction. */
  amplitude?: number
  /** Extra classes merged onto the root span. */
  class?: string
  /** Seconds for one full rise-and-fall cycle. */
  duration?: number
  /** Seconds of delay added per character, which is what turns a jump into a wave. */
  staggerDelay?: number
  /** The text to animate. */
  text: string
}

const props = withDefaults(defineProps<WaveTextProps>(), {
  amplitude: DEFAULT_WAVE_AMPLITUDE,
  duration: DEFAULT_WAVE_DURATION,
  staggerDelay: DEFAULT_WAVE_STAGGER_DELAY,
})

const shouldReduceMotion = useReducedMotion()
const mounted = ref(false)

/**
 * Held true through SSR *and* the first client render, then flipped in
 * `onMounted`.
 *
 * `useReducedMotion()` is always `false` on the server, so a reduced-motion
 * client would otherwise render a different `animate` target than the one baked
 * into the SSR output. Keeping the first client pass identical to the server,
 * then settling one tick later, removes the mismatch without branching the
 * template.
 */
const canAnimate = computed(() => !mounted.value || !shouldReduceMotion.value)

onMounted(() => {
  mounted.value = true
})

/** One span per character: the unicode non-breaking space keeps word gaps. */
const characters = computed(() => props.text.split(''))

/**
 * A five-stop keyframe loop: rest, full rise, middle, half dip, rest. The
 * reduced-motion branch holds every character at `y: 0` so the text is simply
 * static rather than frozen at some mid-wave offset.
 */
const waveAnimation = computed(() =>
  canAnimate.value
    ? { y: [0, -props.amplitude, 0, props.amplitude * 0.5, 0] }
    : { y: 0 },
)

/**
 * Each character runs the same loop with a delay proportional to its position,
 * which is what produces the travelling wave. Reduced motion zeroes the
 * duration so the loop still commits instantly instead of never running.
 */
function charTransition(index: number) {
  if (!canAnimate.value) {
    return { duration: 0 }
  }

  return {
    delay: index * props.staggerDelay,
    duration: props.duration,
    ease: WAVE_EASE,
    repeat: Number.POSITIVE_INFINITY,
    times: WAVE_TIMES,
  }
}
</script>
