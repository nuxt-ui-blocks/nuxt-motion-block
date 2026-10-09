/**
 * How the scraps behave.
 *
 * - `assemble` - every letter flies in from a random offset and settles.
 * - `jitter`   - letters stay put and tremble forever.
 * - `none`     - no movement at all, just the collage.
 */
export type RansomNoteAnimate = 'none' | 'assemble' | 'jitter'

/**
 * Default behaviour. `assemble` is the one that reads as a ransom note landing
 * rather than as an already-settled scrap of paper.
 */
export const RANSOM_NOTE_DEFAULT_ANIMATE: RansomNoteAnimate = 'assemble'

/**
 * Serif, monospace, condensed sans, script, humanist sans, old-style serif. A
 * ransom note is only legible as one because the letters disagree; a single
 * family would look like a font bug.
 */
export const RANSOM_NOTE_DEFAULT_FONTS = [
  'Georgia, \'Times New Roman\', serif',
  '\'Courier New\', Courier, monospace',
  'Impact, \'Arial Narrow Bold\', sans-serif',
  '\'Brush Script MT\', cursive',
  'Verdana, Geneva, sans-serif',
  '\'Palatino Linotype\', \'Book Antiqua\', Palatino, serif',
]

/** Aged paper. Warm, low-saturation, never white. */
export const RANSOM_NOTE_DEFAULT_PALETTE = [
  '#f7f1e3',
  '#fdf6e3',
  '#f1e4c3',
  '#e9dcc0',
  '#fbeee0',
  '#eee2cf',
]

/** Ink colour for the scraps. Near-black with a brown cast. */
export const RANSOM_NOTE_SCRAP_TEXT_COLOR = '#1f1b16'

/**
 * Baseline scale multiplier for each scrap, before variance. Below 1 so the
 * collage never grows wider than the copy it replaces.
 */
export const RANSOM_NOTE_FONT_SCALE_BASE = 0.85

/** Extra scale available on top of the base, scaled by intensity. */
export const RANSOM_NOTE_FONT_SCALE_VARIANCE = 0.5

/** How far scraps are scattered when assembling, before intensity scaling. */
export const RANSOM_NOTE_ENTRANCE_OFFSET_BASE = 24

/** Extra scatter available on top of the base, scaled by intensity. */
export const RANSOM_NOTE_ENTRANCE_OFFSET_VARIANCE = 60

/** Extra rotation available during assembly, in degrees, scaled by intensity. */
export const RANSOM_NOTE_ENTRANCE_ROTATION_VARIANCE = 30

/** Hard limit on the permanent skew, in degrees, before intensity scaling. */
export const RANSOM_NOTE_SKEW_MAX = 6

/** Resting tremble, in degrees, before intensity scaling. */
export const RANSOM_NOTE_JITTER_ROTATION_BASE = 1.5

/** Extra tremble available on top of the base, scaled by intensity. */
export const RANSOM_NOTE_JITTER_ROTATION_VARIANCE = 2.5

/** Shortest tremble cycle, in seconds. */
export const RANSOM_NOTE_JITTER_DURATION_MIN_SECONDS = 0.6

/** Extra length available for a tremble cycle, in seconds. */
export const RANSOM_NOTE_JITTER_DURATION_VARIANCE_SECONDS = 0.6

/**
 * Unlike every other stagger in this library, `stagger` on this component is in
 * **seconds**, not milliseconds. The default is `0.03`, i.e. 30ms. It is kept in seconds
 * so the prop matches the upstream catalogue exactly.
 */
export const RANSOM_NOTE_DEFAULT_STAGGER_SECONDS = 0.03

/** Default how "messy" the collage is, from 0 to 1. */
export const RANSOM_NOTE_DEFAULT_INTENSITY = 0.6

/** Default resting rotation of each scrap, in degrees. */
export const RANSOM_NOTE_DEFAULT_ROTATION = 8

/**
 * Default PRNG seed. Fixed so the server and the client generate byte-identical
 * markup - a random collage would otherwise never hydrate.
 */
export const RANSOM_NOTE_DEFAULT_SEED = 1

/** Lower clamp for `intensity`. */
export const RANSOM_NOTE_INTENSITY_MIN = 0

/** Upper clamp for `intensity`. */
export const RANSOM_NOTE_INTENSITY_MAX = 1

/** Duration of one assembly spring, in seconds. */
export const RANSOM_NOTE_SPRING_DURATION = 0.25

/** Overshoot of one assembly spring. */
export const RANSOM_NOTE_SPRING_BOUNCE = 0.1

/**
 * Assembly spring in motion-v's duration-based spring form, which supports
 * `duration` and `bounce` natively.
 */
export const RANSOM_NOTE_SPRING_TRANSITION = {
  type: 'spring',
  duration: RANSOM_NOTE_SPRING_DURATION,
  bounce: RANSOM_NOTE_SPRING_BOUNCE,
} as const

/**
 * Used by `animate: 'none'` and by reduced motion. A zero duration rather than
 * no transition at all: motion-v treats "nothing to animate" as "write
 * nothing", which would strand the starting styles.
 */
export const RANSOM_NOTE_STATIC_TRANSITION = { duration: 0 }

/** Symmetric in-out curve, so the tremble eases at both ends of each swing. */
export const RANSOM_NOTE_JITTER_EASE = [0.645, 0.045, 0.355, 1]

/** Characters that get no paper of their own. */
export const RANSOM_NOTE_WHITESPACE_PATTERN = /\s/

/** mulberry32's increment. */
export const RANSOM_NOTE_MULBERRY32_INCREMENT = 0x6D2B79F5

/** 2^32, the mulberry32 output divisor. */
export const RANSOM_NOTE_UINT32_DIVISOR = 4_294_967_296

/** Clamp helper shared by `intensity`. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Uniform pick between `min` and `max` from a seeded generator. */
export function randomInRange(
  random: () => number,
  min: number,
  max: number,
): number {
  return min + random() * (max - min)
}

/**
 * mulberry32, a 32-bit seeded PRNG.
 *
 * This has to be deterministic rather than `Math.random`: every scrap's font,
 * colour, rotation and entrance offset is derived from it, so a non-reproducible
 * generator would hand the server one collage and the client another.
 */
export function createSeededRandom(seed: number): () => number {
  let state = seed

  return () => {
    state = (state + RANSOM_NOTE_MULBERRY32_INCREMENT) | 0

    let t = Math.imul(state ^ (state >>> 15), 1 | state)

    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t

    return ((t ^ (t >>> 14)) >>> 0) / RANSOM_NOTE_UINT32_DIVISOR
  }
}
