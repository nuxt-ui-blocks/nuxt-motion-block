/**
 * Reveal duration for each character, in seconds. Matches the centre-out
 * cascade so the two components read as one family.
 */
export const STAGGER_EDGES_DURATION_S = 0.62

/**
 * Milliseconds per second. The public props are in milliseconds (to match the
 * upstream catalog API), but motion-v transitions expect seconds, so every
 * delay goes through this divisor.
 */
export const STAGGER_EDGES_MS = 1000

/** Default per-step stagger between characters, in milliseconds. */
export const STAGGER_EDGES_DEFAULT_STAGGER = 22

/** Default delay before the reveal starts, in milliseconds. */
export const STAGGER_EDGES_DEFAULT_DELAY = 0

/** Blur the characters start from. Kept small so text stays legible mid-ramp. */
export const STAGGER_EDGES_START_BLUR = 3

/** Vertical travel the characters start from, in pixels. */
export const STAGGER_EDGES_START_Y = 12

// Written without `as const` on purpose: motion-v's ease parameter is a mutable
// tuple type, and a readonly literal would not be assignable to it.
/** Apple-ish ease-out for the edges-in reveal. */
export const STAGGER_EDGES_EASE = [0.22, 1, 0.36, 1]
