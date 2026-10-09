/**
 * Timing constants for FocusBlurResolve.
 *
 * The duration is deliberately long (0.76s) for a 0→1 blur ramp. Blur is the
 * most expensive property in this component: it forces the compositor to
 * re-rasterise the layer every frame, so shortening the ramp buys very little
 * perceived speed while roughly doubling the peak cost.
 */
export const FOCUS_BLUR_DURATION_S = 0.76

/**
 * Exponential-out curve. Blur and opacity read as much better with the
 * classic "fast start, long settle" feel than with a linear ramp, which
 * lingers in the muddy mid-tones where the text is neither sharp nor absent.
 */
export const FOCUS_BLUR_EASE = [0.22, 1, 0.36, 1]

/** Blur radius, in px, at the start of the ramp. */
export const FOCUS_BLUR_START = 14

/** Vertical offset, in px, at the start of the ramp. */
export const FOCUS_BLUR_START_Y = 14

/** Scale at the start of the ramp. Slightly above 1, so the text settles *in* rather than snapping to size. */
export const FOCUS_BLUR_START_SCALE = 1.01
