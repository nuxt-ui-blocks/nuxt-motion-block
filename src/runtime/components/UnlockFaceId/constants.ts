/**
 * Geometry, motion tokens and copy for `UnlockFaceId`.
 *
 * The glyph is Apple's Face ID mark: four corner brackets drawn as separate
 * strokes with a gap between them, plus a schematic face. There is deliberately
 * no full outline — a closed ring would read as "picture of a face" rather than
 * "something is being scanned".
 */

export type UnlockStatus = 'idle' | 'scanning' | 'success' | 'error'

/* -------------------------------------------------------------------------- */
/* Defaults                                                                    */
/* -------------------------------------------------------------------------- */

export const DEFAULT_SIZE = 128
export const DEFAULT_SCAN_DURATION = 1800
export const DEFAULT_ERROR_MESSAGE = 'Face not recognized. Try again.'
export const DEFAULT_LABEL = 'Scan to unlock'

/* -------------------------------------------------------------------------- */
/* Motion tokens                                                               */
/* -------------------------------------------------------------------------- */

export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]
export const EASE_IN_OUT: [number, number, number, number] = [0.645, 0.045, 0.355, 1]
export const INSTANT = { duration: 0 }
export const CHECK_SPRING = { bounce: 0.28, duration: 0.4, type: 'spring' as const }
export const GLYPH_SPRING = { bounce: 0.1, duration: 0.25, type: 'spring' as const }

/** Each bracket draws over 0.4s, offset by 0.07s so the frame assembles clockwise. */
export const BRACKET_DRAW = 0.4
export const BRACKET_STAGGER = 0.07

/** The face waits for the brackets, then its four strokes draw in order. */
export const FACE_DELAY = 0.26
export const FACE_DRAW = 0.42
export const FACE_STAGGER = 0.07

/** One pass of the scan band, then back again — `repeatType: reverse`. */
export const SCAN_SWEEP = 1.5

export const SHAKE_DURATION = 0.4
/** Damped rather than symmetric, so a failed read reads as a refusal, not a wobble. */
export const SHAKE_KEYFRAMES = [0, -7, 7, -5, 5, -2, 0]

export const CONTENT_REVEAL = 0.4

/* -------------------------------------------------------------------------- */
/* Geometry                                                                    */
/* -------------------------------------------------------------------------- */

export const VIEWBOX = 100
export const STROKE_WIDTH = 4
export const CHECK_STROKE_WIDTH = 5

/** Four corner brackets only, each ending short of the corner arc it continues into. */
export const BRACKET_PATHS = [
  'M8 34 L8 28 A20 20 0 0 1 28 8 L34 8',
  'M66 8 L72 8 A20 20 0 0 1 92 28 L92 34',
  'M92 66 L92 72 A20 20 0 0 1 72 92 L66 92',
  'M34 92 L28 92 A20 20 0 0 1 8 72 L8 66',
] as const

/** Two eye strokes, a nose that turns right at the bottom, a shallow smile. */
export const FACE_PATHS = [
  'M36 38 L36 47',
  'M64 38 L64 47',
  'M50 38 L50 54 Q50 57.5 53.5 57.5 L56 57.5',
  'M36 61 L36 66 Q50 73 64 66 L64 61',
] as const

export const CHECK_PATH = 'M30 52 L44 66 L72 34'

/** The scan band is clipped to the glyph's inner area, not the full viewBox. */
export const SCAN_CLIP = { height: 84, rx: 22, width: 84, x: 8, y: 8 }
export const SCAN_BAND_HEIGHT = 18
/** Travels ±34px around the viewBox centre, so it exits and re-enters the clip. */
export const SCAN_TRAVEL = 34

/* -------------------------------------------------------------------------- */
/* Copy + colour                                                               */
/* -------------------------------------------------------------------------- */

/** `error` is excluded: it has its own message and its own stroke. */
export const STATUS_MESSAGES: Record<Exclude<UnlockStatus, 'error'>, string> = {
  idle: 'Ready to scan.',
  scanning: 'Scanning face…',
  success: 'Identity confirmed. Unlocked.',
}

/**
 * Upstream read shadcn tokens (`--color-destructive`, `--color-green`,
 * `--color-brand`); Nuxt UI publishes the equivalents, with the same hex as the
 * fallback so the glyph still reads correctly outside a themed tree.
 */
export const STROKE_BY_STATUS: Record<UnlockStatus, string> = {
  error: 'var(--ui-error, #ef4444)',
  idle: 'currentColor',
  scanning: 'currentColor',
  success: 'var(--ui-success, #22c55e)',
}

export const BRAND_STROKE = 'var(--ui-primary, #6366f1)'
