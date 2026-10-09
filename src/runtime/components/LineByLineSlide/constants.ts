/**
 * Reveal duration for each line, in seconds. The longest reveal in this catalog:
 * lines travel 48px horizontally, which needs the time to read as a slide rather
 * than as a fade.
 */
export const LINE_BY_LINE_SLIDE_DURATION_S = 0.9

/**
 * Milliseconds per second. The public props are in milliseconds (to match the
 * upstream catalog API), but motion-v transitions expect seconds, so every
 * delay goes through this divisor.
 */
export const LINE_BY_LINE_SLIDE_MS = 1000

/**
 * Apple-ish ease-out. Shared with the blur-based cascades so a page mixing both
 * effects keeps one motion signature.
 */
export const LINE_BY_LINE_SLIDE_EASE = [0.22, 1, 0.36, 1]

/**
 * Default per-line stagger, in milliseconds. Generous, because a paragraph read
 * as a single block sliding in 40ms after the last line would feel mechanical.
 */
export const LINE_BY_LINE_SLIDE_DEFAULT_STAGGER = 120

/** Default delay before the first line slides in, in milliseconds. */
export const LINE_BY_LINE_SLIDE_DEFAULT_DELAY = 0

/**
 * Horizontal offset the lines start from, negative so they enter from the left.
 */
export const LINE_BY_LINE_SLIDE_START_X = -48

/** Character the `text` prop is split on to derive lines. */
export const LINE_BY_LINE_SLIDE_SEPARATOR = '\n'
