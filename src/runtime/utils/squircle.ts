const DEFAULT_RADIUS = 24
const DEFAULT_SMOOTHING = 0.6

/** Superellipse exponent at the low end: a plain ellipse corner. */
const EXPONENT_BASE = 2
/** Extra exponent contributed by full smoothing: a near-rectangular corner. */
const EXPONENT_RANGE = 4

const MIN_RATIO = 0
const MAX_RATIO = 1

const MIN_SAMPLES = 12
const MAX_SAMPLES = 48
const SAMPLES_PER_PX = 0.5

const QUARTER_TURN = Math.PI / 2

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Maps a 0..1 smoothing ratio onto a superellipse exponent.
 *
 * 2 is an ellipse, higher values square the corner off towards a rectangle.
 */
function superellipseExponent(smoothing: number) {
  return EXPONENT_BASE + clamp(smoothing, MIN_RATIO, MAX_RATIO) * EXPONENT_RANGE
}

/**
 * Corners are traced as polylines, so the sample count has to grow with the
 * corner: 12 samples read as smooth on a 24px radius and visibly faceted on a
 * 96px one.
 */
function sampleCount(radius: number) {
  return Math.round(clamp(radius * SAMPLES_PER_PX, MIN_SAMPLES, MAX_SAMPLES))
}

interface Point {
  x: number
  y: number
}

/**
 * Samples one corner quadrant, from the edge tangent to the corner point.
 *
 * The `(2 / exponent)` power is what rounds a polar circle into a superellipse:
 * raising the cosine/sine to a power below 1 pulls the arc outwards towards the
 * corner.
 */
function quadrantPoints(radius: number, exponent: number): Point[] {
  const samples = sampleCount(radius)
  const power = 2 / exponent
  const points: Point[] = []

  for (let i = 1; i <= samples; i++) {
    const t = QUARTER_TURN * (i / samples)
    points.push({
      x: radius * Math.cos(t) ** power,
      y: radius * Math.sin(t) ** power,
    })
  }

  return points
}

function formatPoint({ x, y }: Point) {
  return `${x.toFixed(2)},${y.toFixed(2)}`
}

/**
 * Traces a superellipse ("squircle") as an SVG path string, suitable for
 * `clip-path: path('…')`.
 *
 * Returns an empty string for non-positive dimensions, and a plain rectangle
 * path when `radius` is 0.
 */
export function squirclePath(
  width: number,
  height: number,
  radius: number = DEFAULT_RADIUS,
  smoothing: number = DEFAULT_SMOOTHING,
): string {
  if (width <= 0 || height <= 0) return ''

  const r = clamp(radius, 0, Math.min(width, height) / 2)
  if (r <= 0) {
    return `M0,0 L${width},0 L${width},${height} L0,${height} Z`
  }

  const exponent = superellipseExponent(smoothing)
  const quadrant = quadrantPoints(r, exponent)

  const topRight = quadrant.map(p => formatPoint({ x: width - r + p.y, y: r - p.x }))
  const bottomRight = quadrant.map(p => formatPoint({ x: width - r + p.x, y: height - r + p.y }))
  const bottomLeft = quadrant.map(p => formatPoint({ x: r - p.y, y: height - r + p.x }))
  const topLeft = quadrant.map(p => formatPoint({ x: r - p.x, y: r - p.y }))

  return [
    `M${r},0`,
    `L${width - r},0`,
    ...topRight,
    `L${width},${height - r}`,
    ...bottomRight,
    `L${r},${height}`,
    ...bottomLeft,
    `L0,${r}`,
    ...topLeft,
    'Z',
  ].join(' ')
}
