/**
 * Symmetric ease-out for both the build and the enter transition. Starts
 * quickly and lands softly — the word should feel dropped rather than thrown.
 */
export const SHORT_SLIDE_DOWN_BUILD_EASE = [0.2, 0.8, 0.2, 1]

/**
 * Accelerating exit curve. Opposite weighting to the build ease, so the stack
 * collapses in a different rhythm to the one it was built in.
 */
export const SHORT_SLIDE_DOWN_EXIT_EASE = [0.4, 0, 0.2, 1]

/** Milliseconds between phrase completions, before the next cycle starts. */
export const SHORT_SLIDE_DOWN_DEFAULT_INTERVAL = 2500

/**
 * Milliseconds between each word appearing. Slower than the letter staggers
 * (22–120ms) because the whole phrase has to finish inside one hold window —
 * a 8-word phrase at 500ms/word takes 3.5s to build.
 */
export const SHORT_SLIDE_DOWN_WORD_STEP_MS = 500

/**
 * Build duration for the first word, in seconds. Shorter than the rest because
 * the first word has nothing above it to push down.
 */
export const SHORT_SLIDE_DOWN_FIRST_WORD_DURATION_S = 0.36

/** Build duration for every word after the first, in seconds. */
export const SHORT_SLIDE_DOWN_WORD_DURATION_S = 0.5

/**
 * Duration of the layout shift that pushes the settled words downward as each
 * new word joins the stack. Matches the word build duration so the two read as
 * one move.
 */
export const SHORT_SLIDE_DOWN_LAYOUT_DURATION_S = 0.5

/** Exit duration, in seconds. */
export const SHORT_SLIDE_DOWN_EXIT_DURATION_S = 0.32

/**
 * Extra milliseconds held after the exit animation is dispatched before the
 * phrase index advances. 320ms is the exit itself; the remaining 180ms is a
 * blank beat so the stack is seen empty once between phrases.
 */
export const SHORT_SLIDE_DOWN_EXIT_LEAD_MS = 320
export const SHORT_SLIDE_DOWN_EXIT_TAIL_MS = 180

/** Blur the words drop in from. */
export const SHORT_SLIDE_DOWN_START_BLUR = 2.4

/**
 * Starting scale. Just under 1: this is the settle, not a zoom, so the geometry
 * change should be felt more than seen.
 */
export const SHORT_SLIDE_DOWN_START_SCALE = 0.992

/** Vertical offset the words drop in from, negative so they fall from above. */
export const SHORT_SLIDE_DOWN_START_Y = -28

/** Blur applied to a word as the stack collapses. */
export const SHORT_SLIDE_DOWN_EXIT_BLUR = 1.2

/** Downward drift applied to a word as the stack collapses. */
export const SHORT_SLIDE_DOWN_EXIT_Y = 10

/** Pixel gap between the stacked lines. */
export const SHORT_SLIDE_DOWN_GAP = 12
