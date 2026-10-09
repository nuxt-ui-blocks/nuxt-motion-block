/**
 * Duration of the per-line reveal, in seconds. Slower than the unmasked
 * equivalents because the line spends most of its run travelling through the
 * mask - a faster run clips the blur into a hard edge.
 */
export const MASK_REVEAL_UP_DURATION_S = 0.76

/**
 * Milliseconds per second. The public props are in milliseconds (to match the
 * upstream catalog API) but motion-v transitions expect seconds, so they go
 * through this divisor.
 */
export const MASK_REVEAL_UP_MS = 1000

/** Apple's signature front-loaded ease-out. */
export const MASK_REVEAL_UP_EASE = [0.22, 1, 0.36, 1]

/** Default delay before the first line starts, in milliseconds. */
export const MASK_REVEAL_UP_DEFAULT_DELAY = 0

/**
 * Default per-line stagger, in milliseconds. Wide, so the reader's eye is led
 * down the block one line at a time.
 */
export const MASK_REVEAL_UP_DEFAULT_STAGGER = 90

/**
 * Starting blur radius, in pixels. Noticeable, but only half of the travel
 * distance - the mask is doing most of the hiding here.
 */
export const MASK_REVEAL_UP_START_BLUR = 6

/**
 * Starting vertical offset, in pixels. Large: this is what the mask cuts off.
 * Because the line rises by more than the mask is tall, it enters from below the
 * visible edge rather than fading in place.
 */
export const MASK_REVEAL_UP_START_Y = 30

/**
 * The string the text is split on when no `lines` array is supplied.
 */
export const MASK_REVEAL_UP_SEPARATOR = '\n'
