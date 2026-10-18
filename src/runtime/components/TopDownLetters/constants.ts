/**
 * Reveal duration for each letter, in seconds. Deliberately identical to
 * BottomUpLetters so the two read as one family.
 */
export const TOP_DOWN_LETTERS_DURATION_S = 0.4

/**
 * Milliseconds per second. The public props are in milliseconds (to match the
 * upstream catalog API), but motion-v transitions expect seconds, so every
 * delay goes through this divisor.
 */
export const TOP_DOWN_LETTERS_MS = 1000

/**
 * Pronounced ease-out for a tall, staged drop. Front-loaded deceleration so the
 * letters settle quickly after a long 46px fall.
 */
export const TOP_DOWN_LETTERS_EASE = [0.18, 1, 0.32, 1]

/** Default per-step stagger between letters, in milliseconds. */
export const TOP_DOWN_LETTERS_DEFAULT_STAGGER = 88

/** Default delay before the letters start falling, in milliseconds. */
export const TOP_DOWN_LETTERS_DEFAULT_DELAY = 0

/**
 * Travel the letters start from, negative so they descend from above. Matches
 * BottomUpLetters' 46px offset in magnitude — the two effects are mirrors.
 */
export const TOP_DOWN_LETTERS_START_Y = -46
