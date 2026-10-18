/**
 * Ease for the phrase entering and for the per-word opacity cascade. One curve
 * for both, so the two motions read as a single unit rather than two effects
 * that happen to overlap.
 */
export const SHORT_SLIDE_RIGHT_ENTER_EASE = [0.2, 0.8, 0.2, 1]

/**
 * Accelerating exit curve. The phrase leaves faster than it arrived, which is
 * what keeps a looping swap from feeling like it is stalling.
 */
export const SHORT_SLIDE_RIGHT_EXIT_EASE = [0.4, 0, 0.2, 1]

/** Milliseconds between phrase swaps. */
export const SHORT_SLIDE_RIGHT_DEFAULT_INTERVAL = 2500

/** Duration of the phrase glide, in seconds. */
export const SHORT_SLIDE_RIGHT_DURATION_S = 0.52

/** Duration of the exit, in seconds. */
export const SHORT_SLIDE_RIGHT_EXIT_DURATION_S = 0.32

/** Horizontal offset the phrase glides in from. */
export const SHORT_SLIDE_RIGHT_START_X = -24

/** Blur the phrase starts from. */
export const SHORT_SLIDE_RIGHT_START_BLUR = 1.2

/** Blur and drift applied as the phrase leaves. */
export const SHORT_SLIDE_RIGHT_EXIT_BLUR = 1
export const SHORT_SLIDE_RIGHT_EXIT_X = 12

/** Gap between words, in ems, so it tracks the text size. */
export const SHORT_SLIDE_RIGHT_WORD_GAP_EM = 0.25

/** Per-word delay, in seconds. */
export const SHORT_SLIDE_RIGHT_WORD_STAGGER_S = 0.092

/** Per-word fade duration, in seconds. Short, because the words are only two. */
export const SHORT_SLIDE_RIGHT_WORD_DURATION_S = 0.21
