/**
 * Duration of the per-word scale pop, in seconds. Short, because the overshoot
 * easing has to be readable in a single beat - stretch it and the settle turns
 * into a wobble.
 */
export const SPRING_SCALE_IN_DURATION_S = 0.36

/**
 * Milliseconds per second. The public props are in milliseconds (to match the
 * upstream catalog API) but motion-v transitions expect seconds, so they go
 * through this divisor.
 */
export const SPRING_SCALE_IN_MS = 1000

/**
 * A back-out curve: the second control point sits above 1, so the scale
 * overshoots its target before settling. Despite the component name this is a
 * plain cubic-bezier, not a spring - which is what makes the settle identical
 * on every word rather than varying with velocity.
 */
export const SPRING_SCALE_IN_EASE = [0.34, 1.56, 0.64, 1]

/** Default delay before the first word starts, in milliseconds. */
export const SPRING_SCALE_IN_DEFAULT_DELAY = 0

/**
 * Default per-word stagger, in milliseconds. Wide, so the pop travels across the
 * line rather than landing on every word at once.
 */
export const SPRING_SCALE_IN_DEFAULT_STAGGER = 95

/**
 * Starting scale. Deep enough that the overshoot has somewhere to go before it
 * comes back.
 */
export const SPRING_SCALE_IN_START_SCALE = 0.7

/**
 * The string the text is split on. Single space, so runs of spaces collapse into
 * empty words - see the notes in the docs page.
 */
export const SPRING_SCALE_IN_SEPARATOR = ' '
