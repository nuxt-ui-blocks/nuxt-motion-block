<template>
  <Motion
    aria-hidden="true"
    class="siri-orb-root"
    :class="props.class"
    :style="rootStyle"
    :animate="rootAnimate"
    :transition="rootTransition"
  >
    <!--
      The bloom is a sibling *outside* the disc. It is the same colour as the
      orb's own `c2` on purpose: the glow has to read as light escaping the
      orb, so it borrows the orb's palette rather than the surrounding theme.
    -->
    <Motion
      class="siri-orb-bloom"
      :style="bloomStyle"
      :animate="bloomAnimate"
      :transition="bloomTransition"
    />

    <!--
      `saturate()` and `hue-rotate()` are scoped to the disc rather than the
      root on purpose. Applied to the whole component they would drain the
      semantic accent colour, and `error` would lose the red that is the only
      thing telling a user the request failed.
    -->
    <Motion
      class="siri-orb"
      :class="discClass"
      :style="discStyle"
    >
      <span class="siri-orb-layer siri-orb-sheen" />
      <span class="siri-orb-layer siri-orb-rim" />
    </Motion>
  </Motion>
</template>

<script setup lang="ts">
import { Motion, useMotionValue, useReducedMotion, useTransform } from 'motion-v'
import { computed, watch } from 'vue'
import type { AIAmplitude, AIState } from '../../composables/useAiState'
import { getAIStateMotion, useAmplitudeValue } from '../../composables/useAiState'
import {
  AMPLITUDE_BLUR_FALLOFF,
  AMPLITUDE_SCALE_GAIN,
  BREATHE_SCALE,
  BREATHE_SECONDS,
  DEFAULT_SIRI_ORB_COLORS,
  DEFAULT_SIRI_ORB_SIZE,
  DRIFT_BASE_SECONDS,
  ERROR_SHAKE_DURATION,
  ERROR_SHAKE_OFFSETS,
  GLOW_MAX_OPACITY,
  INSTANT,
  resolveOrbMetrics,
  SIRI_EASE_IN_OUT,
  SIRI_SPRING,
} from './constants'

/**
 * `AIState` and the `colors` shape are re-declared inline rather than imported.
 * `AIAmplitude` is imported because it only resolves to `number`, which the
 * compiler can derive without touching the filesystem.
 */
export interface SiriOrbProps {
  /**
   * Live audio level, `0..1`. Pass a `MotionValue` from `useAudioAmplitude` for
   * real input, or a plain number for a static level. The orb falls back to its
   * ambient animation when nothing is supplied.
   */
  amplitude?: AIAmplitude
  /**
   * Seconds for one ambient rotation of the gradient, before the current state
   * speeds it up. `thinking` runs it 2.4x faster than `idle`.
   */
  animationDuration?: number
  /** Merged over the default palette. Unspecified channels keep their default. */
  colors?: {
    bg?: string
    c1?: string
    c2?: string
    c3?: string
    c4?: string
  }
  /** Extra classes for the outer wrapper. */
  class?: string
  /**
   * Diameter. Every internal value - blur, contrast, dot size, rim, mask
   * radius - is derived from it, so one prop rescales the whole orb.
   */
  size?: string
  /**
   * Assistant state. Drives the bloom, the gradient saturation, the base scale
   * and how much the amplitude is allowed to move anything.
   */
  state?: AIState
}

const props = withDefaults(defineProps<SiriOrbProps>(), {
  animationDuration: 20,
  size: DEFAULT_SIRI_ORB_SIZE,
  state: 'idle',
})

const shouldReduceMotion = useReducedMotion()
const metrics = computed(() => resolveOrbMetrics(props.size))
const stateMotion = computed(() => getAIStateMotion(props.state))
const palette = computed(() => ({ ...DEFAULT_SIRI_ORB_COLORS, ...props.colors }))

// ------------------------------------------------------------------- amplitude

const amplitudeValue = useAmplitudeValue(() => props.amplitude)

/**
 * A transform only re-runs when one of its *inputs* changes, so the state
 * derived halves are mirrored into motion values. Reading `stateMotion` off the
 * computed inside the transformer would leave the disc on the previous state's
 * scale and blur until the next amplitude tick - which, with a silent
 * microphone, is never.
 */
const stateScale = useMotionValue(stateMotion.value.scale)
const reactivity = useMotionValue(shouldReduceMotion.value ? 0 : stateMotion.value.reactivity)
const blurBaseline = useMotionValue(metrics.value.blurAmount)

watch(stateMotion, (next) => {
  stateScale.set(next.scale)
  reactivity.set(shouldReduceMotion.value ? 0 : next.reactivity)
})
watch(metrics, next => blurBaseline.set(next.blurAmount))

/** Reduced motion is re-read through a watcher because it can flip at runtime. */
watch(shouldReduceMotion, reduce => reactivity.set(reduce ? 0 : stateMotion.value.reactivity))

// ---------------------------------------------------------------------- motion

const loopDuration = computed(() =>
  shouldReduceMotion.value ? props.animationDuration : props.animationDuration / stateMotion.value.speed,
)
const driftDuration = computed(() => (DRIFT_BASE_SECONDS / (1 + stateMotion.value.speed)) * 2)

const discScale = useTransform<number, number>(
  [amplitudeValue, stateScale, reactivity],
  ([level, scale, react]) => scale + level * react * AMPLITUDE_SCALE_GAIN,
)
const blurAmount = useTransform<number, string>(
  [amplitudeValue, blurBaseline, reactivity],
  ([level, baseline, react]) => `${baseline * (1 - level * react * AMPLITUDE_BLUR_FALLOFF)}px`,
)

/**
 * The root carries the state's *shape*; the disc carries its *colour*. Each
 * state owns a distinct motif so two states are told apart by what moves rather
 * than by how fast: `idle` breathes, `error` shakes once, and everything else
 * settles at rest and churns internally through the faster gradient.
 *
 * The transitions are computed rather than inlined in the template - a fresh
 * object literal on every render restarts a running keyframe animation.
 */
const rootAnimate = computed(() => {
  if (shouldReduceMotion.value)
    return { scale: 1, x: 0 }
  if (props.state === 'error')
    return { scale: 1, x: ERROR_SHAKE_OFFSETS }
  if (stateMotion.value.motif === 'breathe')
    return { scale: BREATHE_SCALE, x: 0 }
  return { scale: 1, x: 0 }
})

const rootTransition = computed(() => {
  if (shouldReduceMotion.value)
    return INSTANT
  if (props.state === 'error')
    return { duration: ERROR_SHAKE_DURATION, ease: SIRI_EASE_IN_OUT }
  if (stateMotion.value.motif === 'breathe')
    return { duration: BREATHE_SECONDS, ease: SIRI_EASE_IN_OUT, repeat: Number.POSITIVE_INFINITY, repeatType: 'loop' as const }
  return SIRI_SPRING
})

const bloomAnimate = computed(() => ({ opacity: stateMotion.value.glow * GLOW_MAX_OPACITY }))
const bloomTransition = computed(() => (shouldReduceMotion.value ? INSTANT : SIRI_SPRING))

// ----------------------------------------------------------------------- style

const rootStyle = computed(() => ({
  '--orb-size': props.size,
  'height': props.size,
  'width': props.size,
}))

const bloomStyle = computed(() => ({
  background: `radial-gradient(circle at 50% 50%, ${palette.value.c2} 0%, transparent 64%)`,
}))

const discStyle = computed(() => ({
  '--animation-duration': `${loopDuration.value}s`,
  '--bg': palette.value.bg,
  '--blur-amount': blurAmount,
  '--c1': palette.value.c1,
  '--c2': palette.value.c2,
  '--c3': palette.value.c3,
  '--c4': palette.value.c4,
  '--contrast-amount': metrics.value.contrastAmount,
  '--dot-size': `${metrics.value.dotSize}px`,
  '--drift-duration': `${driftDuration.value}s`,
  '--mask-radius': metrics.value.maskRadius,
  '--rim': `${metrics.value.rim}px`,
  '--shadow-spread': `${metrics.value.shadowSpread}px`,
  'filter': `saturate(${stateMotion.value.saturation}) hue-rotate(${stateMotion.value.hueRotate}deg)`,
  'height': '100%',
  'scale': discScale,
  'width': '100%',
}))

/**
 * The dot layer's radial mask is what turns the flat dot grid into a lit sphere.
 * At the smallest tier it is removed rather than kept, because a mask covering
 * that much of a 24px orb reads as a dark hole instead of a highlight.
 */
const discClass = computed(() => ({
  'siri-orb--no-mask': metrics.value.maskRadius === '0%',
}))
</script>

<style scoped>
/*
 * `--angle` has to be a registered custom property for the conic gradients to
 * interpolate. Without `@property` the angle is an untyped token, the rotation
 * keyframe cannot animate it, and every band snaps between two static poses.
 */
@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.siri-orb-root {
  position: relative;
}

.siri-orb-bloom {
  position: absolute;
  border-radius: 50%;
  /* Bleeds past the orb so the blur never clips against the disc's edge. */
  inset: -12%;
  filter: blur(calc(var(--orb-size) * 0.28));
}

.siri-orb {
  display: grid;
  grid-template-areas: 'stack';
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  isolation: isolate;
}

/*
 * One grid cell, four painted layers. Stacking them in a grid rather than with
 * absolute positioning keeps the disc's own overflow clip authoritative, so the
 * blurred gradient cannot bleed into the bloom.
 */
.siri-orb::before,
.siri-orb::after,
.siri-orb > .siri-orb-layer {
  content: '';
  display: block;
  grid-area: stack;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

/*
 * Seven conic gradients at different multipliers, origins and colour stops.
 * A single gradient reads as a spinning pie chart; the multiplied angles make
 * the bands drift against each other so the surface churns instead of turning.
 */
.siri-orb::before {
  background:
    conic-gradient(from calc(var(--angle) * 2) at 25% 70%, var(--c3), transparent 20% 80%),
    conic-gradient(from calc(var(--angle) * 2) at 45% 75%, var(--c2), transparent 30% 60%),
    conic-gradient(from calc(var(--angle) * -3) at 80% 20%, var(--c1), transparent 40% 60%),
    conic-gradient(from calc(var(--angle) * 1.5) at 60% 35%, var(--c4), transparent 25% 75%),
    conic-gradient(from calc(var(--angle) * 2) at 15% 5%, var(--c2), transparent 10% 90%),
    conic-gradient(from calc(var(--angle) * 1) at 20% 80%, var(--c1), transparent 10% 90%),
    conic-gradient(from calc(var(--angle) * -2) at 85% 10%, var(--c3), transparent 20% 80%);
  box-shadow: inset var(--bg) 0 0 var(--shadow-spread) calc(var(--shadow-spread) * 0.2);
  filter: blur(var(--blur-amount)) contrast(var(--contrast-amount)) saturate(1.4);
  animation: siri-orb-rotate var(--animation-duration) linear infinite;
}

/* The dot grid is the texture that sells the surface as a physical object. */
.siri-orb::after {
  background: radial-gradient(circle at center, var(--bg) var(--dot-size), transparent var(--dot-size));
  background-size: calc(var(--dot-size) * 2) calc(var(--dot-size) * 2);
  backdrop-filter: blur(calc(var(--blur-amount) * 2)) contrast(calc(var(--contrast-amount) * 2));
  mix-blend-mode: overlay;
  mask-image: radial-gradient(black var(--mask-radius), transparent 75%);
}

.siri-orb--no-mask::after {
  mask-image: none;
}

/* Two soft highlights on opposite sides read as a single curved specular. */
.siri-orb-sheen {
  background:
    radial-gradient(circle at 30% 24%, hsl(0 0% 100% / 0.32), transparent 34%),
    radial-gradient(circle at 72% 80%, hsl(0 0% 100% / 0.07), transparent 48%);
  mix-blend-mode: screen;
  animation: siri-orb-drift var(--drift-duration) ease-in-out infinite alternate;
}

.siri-orb-rim {
  box-shadow:
    inset 0 0 0 1px hsl(0 0% 100% / 0.16),
    inset 0 calc(var(--rim) * 1) calc(var(--rim) * 2) hsl(0 0% 100% / 0.22),
    inset 0 calc(var(--rim) * -1.2) calc(var(--rim) * 2.4) hsl(0 0% 0% / 0.4);
  pointer-events: none;
}

@keyframes siri-orb-rotate {
  to {
    --angle: 360deg;
  }
}

@keyframes siri-orb-drift {
  0% {
    transform: translate(-6%, -4%) scale(1.05);
  }

  100% {
    transform: translate(7%, 6%) scale(1.12);
  }
}

/*
 * The CSS animations are stopped outright rather than slowed. A slowed gradient
 * rotation is still a rotating gradient, and the whole point of the media query
 * is that nothing on the orb should suggest ongoing work.
 */
@media (prefers-reduced-motion: reduce) {
  .siri-orb::before,
  .siri-orb-sheen {
    animation: none;
  }
}
</style>
