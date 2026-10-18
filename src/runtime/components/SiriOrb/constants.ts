/**
 * SiriOrb static tokens.
 *
 * Everything here is a plain module constant rather than a literal inside
 * `SiriOrb.vue` so the reasoning behind a tuning value stays next to the value
 * it tunes. Anything that depends on the `size` prop is resolved at runtime by
 * `resolveOrbMetrics` instead of being baked in here.
 */

/** Default orb diameter. */
export const DEFAULT_SIRI_ORB_SIZE = '192px'

/**
 * Default palette.
 *
 * The chroma sits around 0.2 rather than the 0.12-0.15 of the pastel orbs this
 * replaces: the disc's own `blur()` and the dot overlay both eat saturation, so
 * softer numbers render as grey. The background is the only light value - it is
 * what the dot pattern and the inset shadow are painted in.
 */
export const DEFAULT_SIRI_ORB_COLORS = {
  bg: 'oklch(92% 0.03 300)',
  c1: 'oklch(68% 0.21 350)',
  c2: 'oklch(70% 0.18 210)',
  c3: 'oklch(66% 0.2 285)',
  c4: 'oklch(72% 0.19 325)',
}

export type SiriOrbColorOverrides = Partial<typeof DEFAULT_SIRI_ORB_COLORS>
export type SiriOrbColors = typeof DEFAULT_SIRI_ORB_COLORS

// ---------------------------------------------------------------- size tiers

/** Below this the dot overlay is dropped entirely and the mask is removed. */
export const SIZE_THRESHOLD_TINY = 30
/** Below this the small-size multipliers apply. */
export const SIZE_THRESHOLD_SMALL = 50
/** Below this the mask radius is 15% instead of 25%. */
export const SIZE_THRESHOLD_MEDIUM = 100

const BLUR_RATIO_SMALL = 0.008
const BLUR_RATIO_LARGE = 0.015
const BLUR_MIN_SMALL = 1
const BLUR_MIN_LARGE = 4

const CONTRAST_RATIO_SMALL = 0.004
const CONTRAST_RATIO_LARGE = 0.008
const CONTRAST_MIN_SMALL = 1.2
const CONTRAST_MIN_LARGE = 1.5

const DOT_RATIO_SMALL = 0.004
const DOT_RATIO_LARGE = 0.008
const DOT_MIN_SMALL = 0.05
const DOT_MIN_LARGE = 0.1

const SHADOW_RATIO_SMALL = 0.004
const SHADOW_RATIO_LARGE = 0.008
const SHADOW_MIN_SMALL = 0.5
const SHADOW_MIN_LARGE = 2

/**
 * The lit rim is sized from the diameter so the same edge reads at 24px and at
 * 240px. A fixed pixel rim disappears on small orbs and swallows a large one.
 */
export const RIM_RATIO = 0.06
export const RIM_MIN = 1.5

/** Small orbs lose contrast faster, so they get a little extra to compensate. */
const SMALL_CONTRAST_BOOST = 1.2
const SMALL_CONTRAST_FLOOR = 1.3
const TINY_CONTRAST = 1.1

// ------------------------------------------------------------------- motion

/**
 * How much of the amplitude is allowed to reach the blur. Below 1 so the disc
 * never loses its gradient entirely at full volume.
 */
export const AMPLITUDE_BLUR_FALLOFF = 0.45
/** Loud audio tightens the disc slightly - reads as the orb focusing. */
export const AMPLITUDE_SCALE_GAIN = 0.12

/** A short horizontal shake is the only `error` affordance; it must not read as breathing. */
export const ERROR_SHAKE_OFFSETS = [0, -3, 3, 0]
export const ERROR_SHAKE_DURATION = 0.18

export const SIRI_EASE_IN_OUT: [number, number, number, number] = [0.645, 0.045, 0.355, 1]

/** The bloom is blurred by a fraction of the orb size so it scales with it. */
export const GLOW_BLUR_RATIO = 0.28
/** Upper bound applied to every state's glow so no preset blows the bloom out. */
export const GLOW_MAX_OPACITY = 0.7

/** The sheen drifts over a base period, divided by state speed and doubled for the full alternate cycle. */
export const DRIFT_BASE_SECONDS = 12

/** Slow, tiny inhale. The `idle` preset is the only one that breathes by default. */
export const BREATHE_SCALE = [1, 1.035, 1]
export const BREATHE_SECONDS = 5.5

export const SIRI_SPRING = { bounce: 0.1, duration: 0.25, type: 'spring' } as const
/** Reduced motion collapses every transition rather than merely shortening it. */
export const INSTANT = { duration: 0 } as const

// ------------------------------------------------------------------ metrics

export interface SiriOrbMetrics {
  /** Parsed diameter in pixels - every other metric is derived from it. */
  sizeValue: number
  blurAmount: number
  /** Post-boost contrast actually written to `--contrast-amount`. */
  contrastAmount: number
  dotSize: number
  shadowSpread: number
  rim: number
  /** `0%` means the dot layer is unmasked entirely. */
  maskRadius: string
}

/** Parses `size`, falling back to the default for anything unparseable. */
export function parseOrbSize(size: string): number {
  const parsed = Number.parseInt(String(size).replace('px', ''), 10)
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : Number.parseInt(DEFAULT_SIRI_ORB_SIZE, 10)
}

/**
 * The radial mask hides the dot pattern's centre so the gradient reads as a lit
 * sphere. On small orbs that centre is proportionally huge, so the radius is
 * pulled in - and dropped completely below 30px where it would cover the orb.
 */
export function resolveMaskRadius(sizeValue: number): string {
  if (sizeValue < SIZE_THRESHOLD_TINY)
    return '0%'
  if (sizeValue < SIZE_THRESHOLD_SMALL)
    return '5%'
  if (sizeValue < SIZE_THRESHOLD_MEDIUM)
    return '15%'
  return '25%'
}

function resolveContrast(sizeValue: number, contrastAmount: number): number {
  if (sizeValue < SIZE_THRESHOLD_TINY)
    return TINY_CONTRAST
  if (sizeValue < SIZE_THRESHOLD_SMALL)
    return Math.max(contrastAmount * SMALL_CONTRAST_BOOST, SMALL_CONTRAST_FLOOR)
  return contrastAmount
}

/**
 * Resolves every size-dependent value at once. Blur, contrast, dot size and
 * shadow spread all scale with the diameter but each has a floor, so a 24px orb
 * still renders visible structure instead of a flat wash.
 */
export function resolveOrbMetrics(size: string): SiriOrbMetrics {
  const sizeValue = parseOrbSize(size)
  const small = sizeValue < SIZE_THRESHOLD_SMALL

  return {
    sizeValue,
    blurAmount: small
      ? Math.max(sizeValue * BLUR_RATIO_SMALL, BLUR_MIN_SMALL)
      : Math.max(sizeValue * BLUR_RATIO_LARGE, BLUR_MIN_LARGE),
    contrastAmount: resolveContrast(
      sizeValue,
      small
        ? Math.max(sizeValue * CONTRAST_RATIO_SMALL, CONTRAST_MIN_SMALL)
        : Math.max(sizeValue * CONTRAST_RATIO_LARGE, CONTRAST_MIN_LARGE),
    ),
    dotSize: small
      ? Math.max(sizeValue * DOT_RATIO_SMALL, DOT_MIN_SMALL)
      : Math.max(sizeValue * DOT_RATIO_LARGE, DOT_MIN_LARGE),
    shadowSpread: small
      ? Math.max(sizeValue * SHADOW_RATIO_SMALL, SHADOW_MIN_SMALL)
      : Math.max(sizeValue * SHADOW_RATIO_LARGE, SHADOW_MIN_LARGE),
    rim: Math.max(sizeValue * RIM_RATIO, RIM_MIN),
    maskRadius: resolveMaskRadius(sizeValue),
  }
}
