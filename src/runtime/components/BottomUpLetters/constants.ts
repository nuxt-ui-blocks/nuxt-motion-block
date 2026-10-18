/**
 * Reveal duration for each letter, in seconds. Shorter than the blur-based
 * cascades: this effect relies on travel, not on resolving out of a blur, so a
 * long tail reads as sluggish.
 */
export const BOTTOM_UP_LETTERS_DURATION_S = 0.4

/**
 * Milliseconds per second. The public props are in milliseconds (to match the
 * upstream catalog API), but motion-v transitions expect seconds, so every
 * delay goes through this divisor.
 */
export const BOTTOM_UP_LETTERS_MS = 1000

/**
 * Pronounced ease-out for a tall, staged lift. Front-loaded deceleration so the
 * letters settle quickly after a long 46px drop.
 */
export const BOTTOM_UP_LETTERS_EASE = [0.18, 1, 0.32, 1]

/** Default per-step stagger between letters, in milliseconds. */
export const BOTTOM_UP_LETTERS_DEFAULT_STAGGER = 88

/** Default delay before the letters start rising, in milliseconds. */
export const BOTTOM_UP_LETTERS_DEFAULT_DELAY = 0

/**
 * Travel the letters start from. Deliberately large — the reference describes
 * this as a "tall, staged lift", and a short offset reads as a fade rather than
 * a staircase.
 */
export const BOTTOM_UP_LETTERS_START_Y = 46
