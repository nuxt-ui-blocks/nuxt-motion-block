/**
 * How the plane's rotation is driven.
 *
 * - `static` - a fixed resting tilt, applied once.
 * - `pointer` - follows the cursor across the wrapper.
 * - `scroll`  - driven by scroll progress through the wrapper.
 */
export type PerspectiveTextDriver = 'scroll' | 'pointer' | 'static'

/**
 * How the copy is broken into independently transformed segments. `words` keeps
 * everything on one line; `lines` respects `\n` in the source text.
 */
export type PerspectiveTextSplit = 'lines' | 'words'

/** Default CSS `perspective` on the wrapper, in pixels. */
export const PERSPECTIVE_TEXT_3D_DEFAULT_PERSPECTIVE = 800

/**
 * Default depth of the Z stack, in pixels. Each segment is offset by one depth
 * step from its neighbour, centred on the middle segment.
 */
export const PERSPECTIVE_TEXT_3D_DEFAULT_DEPTH = 40

/** Default resting tilt on the X axis, in degrees. */
export const PERSPECTIVE_TEXT_3D_DEFAULT_ROTATE_X = 8

/** Default resting tilt on the Y axis, in degrees. */
export const PERSPECTIVE_TEXT_3D_DEFAULT_ROTATE_Y = 10

/**
 * Pointer travel multiplier. The pointer's normalised position runs from -0.5 to
 * 0.5, so doubling it turns the full sweep of the element into the full sweep
 * of the tilt.
 */
export const PERSPECTIVE_TEXT_3D_POINTER_RANGE_MULTIPLIER = 2

/**
 * Shared spring for every driven rotation. Framer's duration-based spring form
 * maps one-to-one onto motion-v's, which supports `duration` and `bounce`
 * natively.
 */
export const PERSPECTIVE_TEXT_3D_SPRING_TRANSITION = {
  type: 'spring',
  duration: 0.25,
  bounce: 0.1,
} as const

/**
 * The rotation applied when the visitor asks for reduced motion. Flat means
 * exactly zero on both axes - not "smaller" - so the text reads as ordinary
 * copy rather than as a half-finished 3D effect.
 */
export const PERSPECTIVE_TEXT_3D_FLAT_ROTATION = 0
