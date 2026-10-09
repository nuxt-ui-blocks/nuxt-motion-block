import {
  DEFAULT_SQUIRCLE_RADIUS,
  DEFAULT_SQUIRCLE_SMOOTHING,
  SMOOTHING_MAX,
  SMOOTHING_MIN,
  SQUIRCLE_MAX_SAMPLES,
  SQUIRCLE_MIN_SAMPLES,
  SQUIRCLE_QUARTER_TURN,
  SQUIRCLE_SAMPLES_PER_PX,
  SUPERELLIPSE_EXPONENT_BASE,
  SUPERELLIPSE_EXPONENT_RANGE,
} from './constants'

interface Point {
  x: number
  y: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function superellipseExponent(smoothing: number): number {
  return SUPERELLIPSE_EXPONENT_BASE + clamp(smoothing, SMOOTHING_MIN, SMOOTHING_MAX) * SUPERELLIPSE_EXPONENT_RANGE
}

function sampleCount(radius: number): number {
  return Math.round(clamp(radius * SQUIRCLE_SAMPLES_PER_PX, SQUIRCLE_MIN_SAMPLES, SQUIRCLE_MAX_SAMPLES))
}

/**
 * One quadrant of a superellipse, as points measured from the corner centre.
 *
 * The `** (2 / exponent)` is what makes this a squircle rather than an arc: on
 * a circle the exponent is 2 and the power is 1, so the coordinates come out
 * untouched. Raising the exponent pushes the curve out towards the straight
 * edges — the curvature stays continuous into the edge instead of jumping.
 */
function quadrantPoints(radius: number, exponent: number): Point[] {
  const samples = sampleCount(radius)
  const points: Point[] = []
  const power = 2 / exponent

  for (let i = 1; i <= samples; i++) {
    const t = SQUIRCLE_QUARTER_TURN * (i / samples)
    const x = radius * Math.cos(t) ** power
    const y = radius * Math.sin(t) ** power
    points.push({ x, y })
  }

  return points
}

function formatPoint({ x, y }: Point): string {
  return `${x.toFixed(2)},${y.toFixed(2)}`
}

/**
 * Builds an SVG path (for use with `clip-path: path(...)`) that traces a
 * rectangle whose four corners follow a superellipse (squircle) curve instead of
 * a plain circular arc, giving the smoother, curvature-continuous look Apple's
 * icons use.
 *
 * Coordinates are in the element's own pixels, not percentages, so the caller
 * has to measure first — `clip-path: path()` has no responsive form.
 *
 * `smoothing` (0..1) maps to the superellipse exponent: 0 is exactly a circular
 * corner — identical to `border-radius` — and 1 pushes the curve out into the
 * flat edges.
 */
export function squirclePath(
  width: number,
  height: number,
  radius: number = DEFAULT_SQUIRCLE_RADIUS,
  smoothing: number = DEFAULT_SQUIRCLE_SMOOTHING,
): string {
  if (width <= 0 || height <= 0) {
    return ''
  }

  // A radius past the halfway point makes consecutive corners overlap, so the
  // curve has to be pulled back in or the path self-intersects.
  const r = clamp(radius, 0, Math.min(width, height) / 2)

  if (r <= 0) {
    return `M0,0 L${width},0 L${width},${height} L0,${height} Z`
  }

  const exponent = superellipseExponent(smoothing)
  const quadrant = quadrantPoints(r, exponent)

  // The quadrant is generated once, then rotated into each corner by swapping
  // and offsetting the axes. Deriving four independent curves would risk the
  // corners disagreeing at the seams.
  const topRight = quadrant.map(({ x, y }) => ({ x: width - r + y, y: r - x }))
  const bottomRight = quadrant.map(({ x, y }) => ({ x: width - r + x, y: height - r + y }))
  const bottomLeft = quadrant.map(({ x, y }) => ({ x: r - y, y: height - r + x }))
  const topLeft = quadrant.map(({ x, y }) => ({ x: r - x, y: r - y }))

  const segments = [
    `M${r.toFixed(2)},0`,
    `L${(width - r).toFixed(2)},0`,
    ...topRight.map(point => `L${formatPoint(point)}`),
    `L${width.toFixed(2)},${(height - r).toFixed(2)}`,
    ...bottomRight.map(point => `L${formatPoint(point)}`),
    `L${r.toFixed(2)},${height.toFixed(2)}`,
    ...bottomLeft.map(point => `L${formatPoint(point)}`),
    `L0,${r.toFixed(2)}`,
    ...topLeft.map(point => `L${formatPoint(point)}`),
    'Z',
  ]

  return segments.join(' ')
}
