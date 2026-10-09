/**
 * Corner radius in pixels. 24 is the Apple "large corner" size, which is where
 * a squircle reads as a deliberate shape rather than as a rounding.
 */
export const DEFAULT_SQUIRCLE_RADIUS = 24

/**
 * Superellipse exponent offset. `0` maps to exponent 2 — a plain circle, which
 * is identical to `border-radius` — and `1` maps to exponent 6, which flattens
 * the corners into the straight edges.
 */
export const DEFAULT_SQUIRCLE_SMOOTHING = 0.6

/** Exponent of a circle: |x|^n + |y|^n = 1 with n = 2. */
export const SUPERELLIPSE_EXPONENT_BASE = 2

/** How far `smoothing` pushes the exponent above the circle. */
export const SUPERELLIPSE_EXPONENT_RANGE = 4

export const SMOOTHING_MIN = 0
export const SMOOTHING_MAX = 1

/**
 * Corners are traced as polylines, so the sample count has to grow with the
 * corner: 12 samples read as smooth on a 24px radius and visibly faceted on a
 * 96px one. Half a sample per pixel, bounded at both ends so a tiny radius is
 * not over-tessellated and a huge one does not generate a path with thousands of
 * points.
 */
export const SQUIRCLE_MIN_SAMPLES = 12
export const SQUIRCLE_MAX_SAMPLES = 48
export const SQUIRCLE_SAMPLES_PER_PX = 0.5

/** One corner spans a quarter turn, so `t` runs from 0 to π/2. */
export const SQUIRCLE_QUARTER_TURN = Math.PI / 2
