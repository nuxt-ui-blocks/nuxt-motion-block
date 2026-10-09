/**
 * Timing and shape constants for WaveText.
 *
 * The motion is a five-stop keyframe loop rather than a spring: the character
 * rises, dips below the baseline, and returns. A spring cannot express that
 * mid-path overshoot in both directions, so an explicit curve is the only way
 * to get a symmetric wave.
 */
export const DEFAULT_WAVE_AMPLITUDE = 8
export const DEFAULT_WAVE_DURATION = 1.2
export const DEFAULT_WAVE_STAGGER_DELAY = 0.05

/**
 * Sine-in/sine-out. The wave has no sharp corners to hit, so a linear curve
 * would read as mechanical and an exponential one would bunch all the travel
 * into the first few frames.
 */
export const WAVE_EASE = [0.37, 0, 0.63, 1]

/**
 * Where each amplitude peak falls during the loop: rest, full rise, back
 * through the middle, half dip, rest. The middle stop at 0.5 is what makes the
 * return leg read as a settle instead of a mirror of the rise.
 */
export const WAVE_TIMES = [0, 0.25, 0.5, 0.75, 1]
