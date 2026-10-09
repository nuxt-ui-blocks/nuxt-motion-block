/** Circle radius in px when no `radius` prop is supplied. */
export const DEFAULT_RADIUS = 160

/** Degrees per second the wheel turns while auto-rotating. */
export const DEFAULT_AUTO_ROTATE_SPEED = 12

/** Diameter of each thumbnail button, in px. */
export const ITEM_SIZE = 80

/** Degrees of rotation per pixel of horizontal drag. */
export const ROTATE_SENSITIVITY = 0.6

/** Share of the instantaneous drag velocity used when releasing, 0-1. */
export const VELOCITY_SMOOTHING = 0.35

/** Velocity retained per ~16ms frame once the pointer is released. */
export const MOMENTUM_FRICTION = 0.94

/** deg/ms below which momentum stops and the wheel is allowed to settle. */
export const MOMENTUM_EPSILON = 0.02

/** Duration of the snap/step tween in ms. */
export const SNAP_DURATION = 250

/** Duration of an Arrow-key step in ms. */
export const STEP_DURATION = 250

/** Horizontal pixels a pointer must travel before a gesture counts as a drag. */
export const DRAG_MOVE_THRESHOLD = 4

/** Media query that reports a mouse-like pointer, used to gate hover pause. */
export const HOVER_CAPABLE_QUERY = '(hover: hover) and (pointer: fine)'

/** Wraps any angle into the `[0, 360)` range. */
export const normalizeAngle = (angle: number): number => {
  const wrapped = angle % 360
  return wrapped < 0 ? wrapped + 360 : wrapped
}

/** Signed angular distance from `from` to `to`, always within `[-180, 180]`. */
export const shortestDelta = (from: number, to: number): number => {
  const diff = normalizeAngle(to - from)
  return diff > 180 ? diff - 360 : diff
}

export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2

/** Rounds a pixel offset to well below sub-pixel precision. */
export const roundPx = (value: number): number => Math.round(value * 1e4) / 1e4
