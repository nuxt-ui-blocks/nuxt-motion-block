/**
 * Design constants for `MHolographicFoil`, carried over verbatim from the
 * smoothui React original. The values are tuned as a set — the drift ratios
 * only read as "depth" while `PERSPECTIVE_PX` stays far enough away to avoid
 * keystoning, and the opacity ratios only sit correctly because the gradients
 * below already carry their own alpha.
 */

/** Only devices with a real hovering cursor get pointer tilt. */
export const HOVER_QUERY = '(hover: hover) and (pointer: fine)'

/** Peak rotation, in degrees, at the extremes of the pointer range. */
export const MAX_TILT_DEG = 9

/**
 * Distance the viewer sits from the card. Far enough back that the 9° rotation
 * reads as a lean rather than a fisheye; closer and the corners stretch.
 */
export const PERSPECTIVE_PX = 900

/** How far the foil sheet slides across the card, in percent of its width. */
export const FOIL_DRIFT = 14

/** How far the glare blob slides. Deliberately much larger than the foil. */
export const GLARE_DRIFT = 42

/** How far the sheen band slides, in percent. Independent of `FOIL_DRIFT`. */
export const SHEEN_DRIFT = 18

/** One full sweep of the sheen, before `sheenSpeed` scales it. */
export const SHEEN_BASE_DURATION_S = 6

/** Device tilt, in degrees, that maps to one end of the axis range. */
export const ORIENTATION_RANGE_DEG = 32

/** The normalised axis range every transform maps from. */
export const AXIS_MIN = -0.5
export const AXIS_MAX = 0.5

/**
 * Floor on the sheen speed divisor. Without it a `sheenSpeed` of 0 would
 * produce an infinite duration, and Motion treats that as a never-ending
 * animation rather than a stopped one.
 */
export const MIN_SHEEN_SPEED = 0.05

/**
 * Linear control points, deliberately not a curve. A sheen that eases in and
 * out of each sweep reads as a pulse; one that runs at a constant rate reads as
 * a reflection being carried across a surface.
 */
export const LINEAR_EASE = Object.freeze([0.25, 0.25, 0.75, 0.75]) as unknown as [number, number, number, number]

export const FOIL_MIN_OPACITY = 0.05
export const FOIL_MAX_OPACITY = 0.85
export const FOIL_MIN_SATURATION = 0.5
export const FOIL_SATURATION_GAIN = 0.85
export const FOIL_MIN_CONTRAST = 0.95
export const FOIL_CONTRAST_GAIN = 0.3

export const SHEEN_OPACITY_RATIO = 0.34
export const GLARE_OPACITY_RATIO = 0.18

export const SHEEN_FROM = '-120%'
export const SHEEN_TO = '220%'

/**
 * Concentrates the foil into a diagonal band so it *travels* across the card
 * rather than tinting all of it. A full-bleed wash would flatten the content
 * underneath; a band reads as a light source moving over a surface.
 */
export const FOIL_MASK
  = 'linear-gradient(104deg, transparent 0%, oklch(0 0 0 / 0.35) 14%, oklch(0 0 0) 30%, oklch(0 0 0) 70%, oklch(0 0 0 / 0.35) 86%, transparent 100%)'

export const SHEEN_GRADIENT
  = 'linear-gradient(102deg, transparent 0%, oklch(0.86 0.07 220 / 0.55) 34%, oklch(1 0 0 / 0.85) 50%, oklch(0.82 0.08 330 / 0.5) 66%, transparent 100%)'

/**
 * The sheen gradient is tilted, so its `transparent` stops run diagonally while
 * the band it paints is a rectangle. Near the top of the card the band's left
 * edge lands mid-gradient and the box boundary shows as a straight vertical cut
 * travelling across the content. This mask fades the band's vertical edges so
 * that only the gradient itself decides where the sheen ends.
 */
export const SHEEN_EDGE_FADE
  = 'linear-gradient(to right, transparent 0%, oklch(0 0 0) 22%, oklch(0 0 0) 78%, transparent 100%)'

export const GLARE_GRADIENT
  = 'radial-gradient(closest-side, oklch(1 0 0 / 0.75), oklch(1 0 0 / 0.12) 55%, transparent 78%)'

/** One material: how the foil is painted and how far the hue rotates. */
export interface FoilMaterial {
  /** Comma-joined gradient stack: banded foil first, base wash second. */
  background: string
  blend: 'screen'
  /** Peak `hue-rotate` swing, in degrees, at the extremes of pointer travel. */
  hueRange: number
  /** Multiplier on the derived saturation, so `oil` stays muted. */
  saturation: number
}

/**
 * The four patterns.
 *
 * Every `background` is two layers: a `repeating-linear-gradient` of hue bands
 * **with gaps** — a uniform wash was the first attempt and it looked like a
 * tinted rectangle, not a foil — followed by a low-alpha base wash that keeps
 * the card from reading as pure black between the bands.
 */
export const MATERIALS: Record<'aurora' | 'gold' | 'oil' | 'prism', FoilMaterial> = {
  /** Cool: blue through violet into cyan. */
  aurora: {
    background: [
      'repeating-linear-gradient(103deg, transparent 0 5%, oklch(0.74 0.12 232 / 0.85) 7.5%, oklch(0.66 0.13 288 / 0.8) 10.5%, oklch(0.8 0.1 205 / 0.85) 13.5%, transparent 16% 26%)',
      'linear-gradient(160deg, oklch(0.45 0.09 262 / 0.5), transparent 65%)',
    ].join(', '),
    blend: 'screen',
    hueRange: 20,
    saturation: 1,
  },
  /** Warm: gold through amber into magenta. */
  gold: {
    background: [
      'repeating-linear-gradient(97deg, transparent 0 5%, oklch(0.86 0.12 96 / 0.85) 7.5%, oklch(0.78 0.14 62 / 0.8) 10.5%, oklch(0.7 0.15 355 / 0.78) 14%, transparent 17% 27%)',
      'linear-gradient(150deg, oklch(0.5 0.1 55 / 0.45), transparent 68%)',
    ].join(', '),
    blend: 'screen',
    hueRange: 24,
    saturation: 1,
  },
  /** Wide hue spread at very low chroma, which reads as an oil film. */
  oil: {
    background: [
      'repeating-linear-gradient(110deg, transparent 0 6%, oklch(0.7 0.06 190 / 0.7) 8.5%, oklch(0.62 0.06 300 / 0.65) 12%, oklch(0.72 0.05 140 / 0.6) 15.5%, transparent 18.5% 30%)',
      'linear-gradient(135deg, oklch(0.4 0.04 250 / 0.4), transparent 70%)',
    ].join(', '),
    blend: 'screen',
    hueRange: 30,
    saturation: 0.7,
  },
  /** Full holographic spread — cyan, violet, magenta — capped by one gold band. */
  prism: {
    background: [
      'repeating-linear-gradient(100deg, transparent 0 4%, oklch(0.8 0.14 200 / 0.9) 6%, oklch(0.7 0.16 268 / 0.88) 9%, oklch(0.72 0.17 330 / 0.86) 12%, oklch(0.84 0.12 60 / 0.7) 15%, transparent 17.5% 25%)',
      'radial-gradient(120% 90% at 30% 15%, oklch(0.6 0.12 250 / 0.5), transparent 65%)',
    ].join(', '),
    blend: 'screen',
    hueRange: 34,
    saturation: 1.1,
  },
}

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export const clampAxis = (value: number) => Math.min(AXIS_MAX, Math.max(AXIS_MIN, value))
