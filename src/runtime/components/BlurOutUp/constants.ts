/**
 * Duration of the per-word blur-and-rise, in seconds. Shorter than the
 * character-slicing effect because a word is already a readable unit, so there
 * is nothing to gain by making the viewer wait.
 */
export const BLUR_OUT_UP_DURATION_S = 0.56

/**
 * Milliseconds per second. The public props are in milliseconds (to match the
 * upstream catalog API) but motion-v transitions expect seconds, so they go
 * through this divisor.
 */
export const BLUR_OUT_UP_MS = 1000

/** Apple's signature front-loaded ease-out. */
export const BLUR_OUT_UP_EASE = [0.22, 1, 0.36, 1]

/** Default delay before the first word moves, in milliseconds. */
export const BLUR_OUT_UP_DEFAULT_DELAY = 0

/**
 * Default per-word stagger, in milliseconds. A touch slower than a pure
 * crossfade so each word resolves out of the blur on its own beat.
 */
export const BLUR_OUT_UP_DEFAULT_STAGGER = 28

/**
 * Starting blur radius, in pixels. Half the character-level equivalent: at word
 * granularity a 12px blur smears neighbouring words together.
 */
export const BLUR_OUT_UP_START_BLUR = 6

/**
 * Starting vertical offset, in pixels. The "out" in the name is the blur; the
 * travel is only enough to give the word a direction to resolve from.
 */
export const BLUR_OUT_UP_START_Y = 10

/**
 * The string the text is split on. Single space, so runs of spaces collapse into
 * empty words - see the notes in the docs page.
 */
export const BLUR_OUT_UP_SEPARATOR = ' '
