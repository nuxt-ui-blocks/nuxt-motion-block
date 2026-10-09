/**
 * Duration of the per-character blur-and-rise, in seconds. Long for a text
 * reveal because the blur has to travel from 12px down to 0 and a shorter run
 * reads as a smudge rather than as a focus pull.
 */
export const SOFT_BLUR_IN_DURATION_S = 0.9

/**
 * Milliseconds per second. The public props are in milliseconds (to match the
 * upstream catalog API) but motion-v transitions expect seconds, so they go
 * through this divisor.
 */
export const SOFT_BLUR_IN_MS = 1000

/** Apple's signature front-loaded ease-out. */
export const SOFT_BLUR_IN_EASE = [0.22, 1, 0.36, 1]

/** Default delay before the first character moves, in milliseconds. */
export const SOFT_BLUR_IN_DEFAULT_DELAY = 0

/**
 * Default per-character stagger, in milliseconds. Deliberately small: at 25ms a
 * long headline reads as one continuous blur resolving into focus, whereas the
 * 80ms+ staggers used by the letter-slicing effects make each glyph a separate
 * event.
 */
export const SOFT_BLUR_IN_DEFAULT_STAGGER = 25

/**
 * Starting blur radius, in pixels. Wide enough that no character is legible
 * before it animates, which is what keeps the reveal from flickering.
 */
export const SOFT_BLUR_IN_START_BLUR = 12

/**
 * Starting vertical offset, in pixels. Small on purpose - the effect is a focus
 * pull that drifts gently upward, not a rise.
 */
export const SOFT_BLUR_IN_START_Y = 16
