/**
 * Duration of the scale-and-fade, in seconds. Longer than a plain fade because
 * the scale change needs room to read as scale rather than as opacity.
 */
export const MICRO_SCALE_FADE_DURATION_S = 0.6

/**
 * Milliseconds per second. The public prop is in milliseconds (to match the
 * upstream catalog API) but motion-v transitions expect seconds, so it goes
 * through this divisor.
 */
export const MICRO_SCALE_FADE_MS = 1000

/**
 * Very front-loaded deceleration — the last third of the animation is nearly
 * still. This is what makes the effect read as "calm premium polish" rather
 * than as a bounce.
 */
export const MICRO_SCALE_FADE_EASE = [0.32, 0.72, 0, 1]

/** Default delay before the reveal starts, in milliseconds. */
export const MICRO_SCALE_FADE_DEFAULT_DELAY = 0

/**
 * Starting scale. Just under 1 on purpose: a larger shrink reads as a zoom
 * effect, whereas 4% is below the threshold where the eye notices geometry
 * change and only registers a settling quality.
 */
export const MICRO_SCALE_FADE_START_SCALE = 0.96
