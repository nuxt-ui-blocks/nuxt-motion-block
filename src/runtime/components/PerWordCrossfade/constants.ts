/**
 * Reveal duration for each word, in seconds. Longest of the stagger-based text
 * effects in this catalog: words move further (8px) than the letter effects do,
 * and need the extra time to land softly.
 */
export const PER_WORD_CROSSFADE_DURATION_S = 0.7

/**
 * Milliseconds per second. The public props are in milliseconds (to match the
 * upstream catalog API), but motion-v transitions expect seconds, so every
 * delay goes through this divisor.
 */
export const PER_WORD_CROSSFADE_MS = 1000

/**
 * Calm keynote ease-out. The gentlest of the catalog's curves — used where the
 * text should feel considered rather than announced.
 */
export const PER_WORD_CROSSFADE_EASE = [0.16, 1, 0.3, 1]

/** Default per-step stagger between words, in milliseconds. */
export const PER_WORD_CROSSFADE_DEFAULT_STAGGER = 70

/** Default delay before the first word fades, in milliseconds. */
export const PER_WORD_CROSSFADE_DEFAULT_DELAY = 0

/**
 * Upward drift the words start from. Small on purpose: at word granularity a
 * large offset reads as a bounce, so this leans on opacity for most of the
 * effect and uses travel only as a settling cue.
 */
export const PER_WORD_CROSSFADE_START_Y = 8
