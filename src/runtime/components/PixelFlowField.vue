<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { cn } from '../utils/merge'
import { colorToRgb, resolveColor } from '../utils/theme-color'

export type PixelFlowFieldShape = 'square' | 'circle' | 'cross'

export interface PixelFlowFieldProps {
  /** Cell size in CSS pixels. Smaller cells read the source more sharply. */
  cellSize?: number
  /**
   * Three ramp stops, dim to bright: `[field, accent, ink]`. Cells the source
   * does not cover sit on the first stop; fully covered cells sit on the last.
   * Accepts any CSS colour, a `var(--token)` expression, or a bare custom
   * property name such as `--ui-primary`.
   */
  colors?: string[]
  /** Gap between cells in CSS pixels. */
  gap?: number
  /** Freezes the field on its current frame. */
  paused?: boolean
  /** Radius in CSS pixels within which the pointer disturbs cells. */
  pointerRadius?: number
  /** How hard the pointer shoves cells, from 0 to 1. */
  pointerStrength?: number
  /**
   * Increment this to blow the field apart and let it re-form. Any change to
   * the number re-scatters with a fresh deterministic seed; the value itself
   * carries no meaning.
   */
  scatter?: number
  /** Shape drawn for every cell. */
  shape?: PixelFlowFieldShape
  /** Flow speed multiplier. 1 is the calibrated default. */
  speed?: number
  /**
   * Image URL sampled instead of `text`. Needs to be CORS-readable; if the
   * pixels cannot be read the component falls back to `text`.
   */
  src?: string
  /** Word sampled into the grid. Short words read best. */
  text?: string
  /** Font weight used when rasterising `text`. Heavy weights survive better. */
  weight?: number
  /** Extra classes for the positioned wrapper. */
  class?: string
}

type Rgba = [number, number, number, number]

interface FieldSettings {
  cellSize: number
  colors: Rgba[]
  fontFamily: string
  gap: number
  pointerRadius: number
  pointerStrength: number
  scatterSeed: number
  shape: PixelFlowFieldShape
  source: HTMLImageElement | null
  speed: number
  still: boolean
  text: string
  weight: number
}

interface FieldController {
  destroy: () => void
  render: () => void
  resize: () => void
  setPointer: (x: number, y: number, active: boolean) => void
  setRunning: (running: boolean) => void
  setSettings: (settings: FieldSettings) => void
}

const MAX_DPR = 2
const RGB_MAX = 255
const MS_PER_SECOND = 1000
const TAU = Math.PI * 2

const DEFAULT_CELL_SIZE = 8
const DEFAULT_GAP = 3
const DEFAULT_SPEED = 1
const DEFAULT_TEXT = 'motion'
const DEFAULT_WEIGHT = 800
const DEFAULT_POINTER_RADIUS = 130
const DEFAULT_POINTER_STRENGTH = 1
const DEFAULT_FONT_FAMILY = 'system-ui, sans-serif'

/**
 * Ramp stops as theme tokens, so the field follows the active light/dark theme.
 * The first stop is a dim neutral for empty cells, the second is the accent the
 * covered cells climb through, and the last is the brightest ink.
 */
const DEFAULT_COLORS = [
  'var(--ui-text-dimmed)',
  'var(--ui-primary)',
  'var(--ui-text-highlighted)',
]

/** Used only when a colour cannot be resolved against the live document. */
const FALLBACK_COLORS: Rgba[] = [
  [160, 160, 165, 1],
  [99, 102, 241, 1],
  [40, 40, 46, 1],
]

const MIN_STEP = 3
const MIN_COLS = 44
const MAX_CELLS = 14_000
const MIN_DRAW = 0.35

/** Brightness tiers. Each tier is one `fillStyle` + one `fill()` per frame. */
const TIER_COUNT = 7
const RAMP_MID = 0.6
const FIELD_ALPHA = 0.24
const ACCENT_ALPHA = 0.92
const INK_ALPHA = 1

/** Coverage below/above these lands flat, so letter edges stay crisp. */
const MASK_LOW = 0.08
const MASK_HIGH = 0.86

const TEXT_HEIGHT_RATIO = 0.68
const TEXT_WIDTH_RATIO = 0.86
const LUMA_R = 0.2126
const LUMA_G = 0.7152
const LUMA_B = 0.0722

/** One flow-field sample per 4x4 block of cells, bilinear-filtered per cell. */
const LATTICE = 4
const NOISE_SCALE = 0.19
const TIME_SCALE = 0.14
const FLOW_TURNS = 1.35
const MAG_FLOOR = 0.35
const MAG_RANGE = 0.65
const NOISE_OFFSET_X = 37.2
const NOISE_OFFSET_Y = 11.5
const NOISE_COUNTER_FLOW = 0.8

const DRIFT_RATIO = 0.95
const WORD_CALM = 0.84
const SIZE_FLOOR = 0.3
const SIZE_MASK = 0.64
const SIZE_FLOW = 0.2
const STILL_MAG = 0.55
const CROSS_THICKNESS = 0.34

const REFORM_MS = 1750
const STAGGER = 0.45
const WORD_LEAD = 0.16
const DELAY_X = 0.55
const DELAY_Y = 0.3
const DELAY_JITTER = 0.15
const SCATTER_SIZE = 0.5
const SCATTER_SPREAD = 1.25

const WAKE_TAU = 0.42
const WAKE_GAIN = 3.4
const WAKE_CEILING = 2.4
const MAX_SUBSTEPS = 4
const MAX_DT = 0.05

const HASH_X = 127.1
const HASH_Y = 311.7
const HASH_SEED = 74.7
const HASH_MULTIPLIER = 43_758.545_312_3

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

const smoothstep = (value: number) => value * value * (3 - 2 * value)

const toCssColor = (input: string) =>
  input.trim().startsWith('--') ? `var(${input.trim()})` : input.trim()

const hash2 = (x: number, y: number) => {
  const value = Math.sin(x * HASH_X + y * HASH_Y + HASH_SEED) * HASH_MULTIPLIER
  return value - Math.floor(value)
}

const valueNoise = (x: number, y: number) => {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy
  const ux = smoothstep(fx)
  const uy = smoothstep(fy)
  const a = hash2(ix, iy)
  const b = hash2(ix + 1, iy)
  const c = hash2(ix, iy + 1)
  const d = hash2(ix + 1, iy + 1)
  const top = a + (b - a) * ux
  const bottom = c + (d - c) * ux
  return top + (bottom - top) * uy
}

const mixChannel = (from: number, to: number, t: number) =>
  Math.round(from + (to - from) * t)

/**
 * Coverage → colour. Brightness travels through the ramp's lightness, not
 * through opacity alone, which is what makes the sampled word actually read
 * instead of looking like a dimmer patch of the same grey.
 */
const rampCss = (coverage: number, colors: Rgba[]) => {
  const field = colors[0] ?? FALLBACK_COLORS[0]!
  const accent = colors[1] ?? colors[0] ?? FALLBACK_COLORS[1]!
  const ink = colors[2] ?? accent
  const low = coverage <= RAMP_MID
  const from = low ? field : accent
  const to = low ? accent : ink
  const t = low
    ? coverage / RAMP_MID
    : (coverage - RAMP_MID) / (1 - RAMP_MID || 1)
  const fromAlpha = low ? FIELD_ALPHA : ACCENT_ALPHA
  const toAlpha = low ? ACCENT_ALPHA : INK_ALPHA
  const r = mixChannel(from[0], to[0], t)
  const g = mixChannel(from[1], to[1], t)
  const b = mixChannel(from[2], to[2], t)
  const a = (fromAlpha + (toAlpha - fromAlpha) * t) * (to[3] ?? 1)
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`
}

const createFieldController = (
  canvas: HTMLCanvasElement,
): FieldController | null => {
  const context = canvas.getContext('2d')
  if (!context) {
    return null
  }

  const sampler = document.createElement('canvas')
  const samplerContext = sampler.getContext('2d', { willReadFrequently: true })

  let settings: FieldSettings = {
    cellSize: DEFAULT_CELL_SIZE,
    colors: FALLBACK_COLORS,
    fontFamily: DEFAULT_FONT_FAMILY,
    gap: DEFAULT_GAP,
    pointerRadius: DEFAULT_POINTER_RADIUS,
    pointerStrength: DEFAULT_POINTER_STRENGTH,
    scatterSeed: 0,
    shape: 'square',
    source: null,
    speed: DEFAULT_SPEED,
    still: false,
    text: DEFAULT_TEXT,
    weight: DEFAULT_WEIGHT,
  }

  let width = 1
  let height = 1
  let cols = 1
  let rows = 1
  let count = 1
  let step = DEFAULT_CELL_SIZE + DEFAULT_GAP
  let cellPx = DEFAULT_CELL_SIZE

  let mask = new Float32Array(1)
  let ampFactor = new Float32Array(1)
  let sizeBase = new Float32Array(1)
  let homeX = new Float32Array(1)
  let homeY = new Float32Array(1)
  let scatterX = new Float32Array(1)
  let scatterY = new Float32Array(1)
  let wakeX = new Float32Array(1)
  let wakeY = new Float32Array(1)
  let delay = new Float32Array(1)
  let latticeIndex = new Int32Array(1)
  let latticeWx = new Float32Array(1)
  let latticeWy = new Float32Array(1)

  let latCols = 2
  let latRows = 2
  let fieldU = new Float32Array(4)
  let fieldV = new Float32Array(4)

  let tiers: Int32Array[] = []
  let tierCss: string[] = []
  let sampleKey = ''

  let pointerX = 0
  let pointerY = 0
  let previousPointerX = 0
  let previousPointerY = 0
  let pointerActive = false

  const startedAt = performance.now()
  let lastFrameAt = startedAt
  let scatterAt = startedAt
  let hasStarted = false
  let frame = 0
  let running = false
  let destroyed = false

  const allocate = () => {
    mask = new Float32Array(count)
    ampFactor = new Float32Array(count)
    sizeBase = new Float32Array(count)
    homeX = new Float32Array(count)
    homeY = new Float32Array(count)
    scatterX = new Float32Array(count)
    scatterY = new Float32Array(count)
    wakeX = new Float32Array(count)
    wakeY = new Float32Array(count)
    delay = new Float32Array(count)
    latticeIndex = new Int32Array(count)
    latticeWx = new Float32Array(count)
    latticeWy = new Float32Array(count)
  }

  /**
   * Rasterises the source once into a cols x rows bitmap — one pixel per cell —
   * and reads it back. Called only when the grid or the source changes, never
   * from the frame loop.
   */
  const sampleSource = () => {
    if (!samplerContext) {
      mask.fill(0)
      return
    }
    sampler.width = cols
    sampler.height = rows
    samplerContext.clearRect(0, 0, cols, rows)

    const { source, text } = settings
    let drewSource = false

    if (source && source.naturalWidth > 0) {
      const scale = Math.min(
        cols / source.naturalWidth,
        rows / source.naturalHeight,
      )
      const drawWidth = source.naturalWidth * scale
      const drawHeight = source.naturalHeight * scale
      try {
        samplerContext.drawImage(
          source,
          (cols - drawWidth) / 2,
          (rows - drawHeight) / 2,
          drawWidth,
          drawHeight,
        )
        drewSource = true
      }
      catch {
        // A source the browser refuses to draw leaves the text path in charge.
        drewSource = false
      }
    }

    if (!drewSource && text.length > 0) {
      let fontSize = Math.max(rows * TEXT_HEIGHT_RATIO, 1)
      samplerContext.font = `${settings.weight} ${fontSize}px ${settings.fontFamily}`
      const measured = samplerContext.measureText(text).width
      const maxWidth = cols * TEXT_WIDTH_RATIO
      if (measured > maxWidth && measured > 0) {
        fontSize = Math.max((fontSize * maxWidth) / measured, 1)
        samplerContext.font = `${settings.weight} ${fontSize}px ${settings.fontFamily}`
      }
      samplerContext.fillStyle = '#ffffff'
      samplerContext.textAlign = 'center'
      samplerContext.textBaseline = 'middle'
      samplerContext.fillText(text, cols / 2, rows / 2)
    }

    let pixels: Uint8ClampedArray | null = null
    try {
      pixels = samplerContext.getImageData(0, 0, cols, rows).data
    }
    catch {
      // Tainted canvas (cross-origin image without CORS headers).
      pixels = null
    }
    if (!pixels) {
      mask.fill(0)
      return
    }

    const span = MASK_HIGH - MASK_LOW || 1
    for (let i = 0; i < count; i++) {
      const p = i * 4
      const luma
        = (pixels[p]! * LUMA_R
          + pixels[p + 1]! * LUMA_G
          + pixels[p + 2]! * LUMA_B)
        / RGB_MAX
      const coverage = (luma * pixels[p + 3]!) / RGB_MAX
      mask[i] = smoothstep(clamp((coverage - MASK_LOW) / span, 0, 1))
    }
  }

  const buildDerived = () => {
    for (let row = 0; row < rows; row++) {
      const ny = rows > 1 ? row / (rows - 1) : 0
      const latY = row / LATTICE
      const iy = Math.floor(latY)
      const wy = latY - iy
      for (let col = 0; col < cols; col++) {
        const i = row * cols + col
        const nx = cols > 1 ? col / (cols - 1) : 0
        const m = mask[i]!
        homeX[i] = (col + 0.5) * step
        homeY[i] = (row + 0.5) * step
        ampFactor[i] = 1 - m * WORD_CALM
        sizeBase[i] = SIZE_FLOOR + SIZE_MASK * m
        delay[i] = clamp(
          nx * DELAY_X
          + ny * DELAY_Y
          + hash2(col, row) * DELAY_JITTER
          - m * WORD_LEAD,
          0,
          1,
        )
        const latX = col / LATTICE
        const ix = Math.floor(latX)
        latticeIndex[i] = iy * latCols + ix
        latticeWx[i] = latX - ix
        latticeWy[i] = wy
      }
    }
  }

  const buildScatter = (seed: number) => {
    const offset = (SCATTER_SPREAD - 1) / 2
    for (let i = 0; i < count; i++) {
      const a = hash2(i + 1, seed * 1.7 + 3.1)
      const b = hash2(seed * 2.3 + 7.7, i + 1)
      scatterX[i] = (a * SCATTER_SPREAD - offset) * width
      scatterY[i] = (b * SCATTER_SPREAD - offset) * height
    }
  }

  const buildTiers = () => {
    const buckets: number[][] = Array.from({ length: TIER_COUNT }, () => [])
    for (let i = 0; i < count; i++) {
      const tier = Math.min(TIER_COUNT - 1, Math.floor(mask[i]! * TIER_COUNT))
      buckets[tier]!.push(i)
    }
    tiers = buckets.map(bucket => Int32Array.from(bucket))
    tierCss = buckets.map((_, tier) =>
      rampCss((tier + 0.5) / TIER_COUNT, settings.colors),
    )
  }

  const buildGrid = () => {
    step = Math.max(settings.cellSize + settings.gap, MIN_STEP)
    cellPx = settings.cellSize
    cols = Math.max(1, Math.ceil(width / step))
    rows = Math.max(1, Math.ceil(height / step))

    // The word is fitted to a fraction of the column count, so too few columns
    // means too few cells per glyph and the word stops reading. On a narrow
    // surface the grid densifies instead, keeping the type legible.
    const legibleStep = Math.max(width / MIN_COLS, MIN_STEP)
    if (width >= MIN_COLS && legibleStep < step) {
      cellPx *= legibleStep / step
      step = legibleStep
      cols = Math.max(1, Math.ceil(width / step))
      rows = Math.max(1, Math.ceil(height / step))
    }

    // A dense grid over a large surface would blow the frame budget, so the
    // grid is coarsened rather than truncated — coverage stays complete.
    if (cols * rows > MAX_CELLS) {
      const scale = Math.sqrt((cols * rows) / MAX_CELLS)
      step *= scale
      cellPx *= scale
      cols = Math.max(1, Math.ceil(width / step))
      rows = Math.max(1, Math.ceil(height / step))
    }

    const nextCount = cols * rows
    const resized = nextCount !== count
    count = nextCount
    latCols = Math.ceil(cols / LATTICE) + 2
    latRows = Math.ceil(rows / LATTICE) + 2

    if (resized) {
      allocate()
      fieldU = new Float32Array(latCols * latRows)
      fieldV = new Float32Array(latCols * latRows)
    }
    else if (fieldU.length !== latCols * latRows) {
      fieldU = new Float32Array(latCols * latRows)
      fieldV = new Float32Array(latCols * latRows)
    }

    const key = [
      cols,
      rows,
      settings.text,
      settings.weight,
      settings.fontFamily,
      settings.source?.src ?? '',
    ].join('|')
    if (key !== sampleKey) {
      sampleKey = key
      sampleSource()
    }

    buildDerived()
    buildScatter(settings.scatterSeed)
    buildTiers()
  }

  const resize = () => {
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    width = Math.max(1, rect.width)
    height = Math.max(1, rect.height)
    const pixelWidth = Math.max(1, Math.round(width * dpr))
    const pixelHeight = Math.max(1, Math.round(height * dpr))
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth
      canvas.height = pixelHeight
    }
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    buildGrid()
  }

  /** Adds one cell to the current path around its centre. Never fills. */
  const traceCell = (cx: number, cy: number, size: number) => {
    const half = size / 2
    if (settings.shape === 'circle') {
      context.moveTo(cx + half, cy)
      context.arc(cx, cy, half, 0, TAU)
      return
    }
    if (settings.shape === 'cross') {
      const arm = size * CROSS_THICKNESS
      context.rect(cx - half, cy - arm / 2, size, arm)
      context.rect(cx - arm / 2, cy - half, arm, size)
      return
    }
    context.rect(cx - half, cy - half, size, size)
  }

  /** Refreshes the coarse flow lattice. O(cols + rows), not O(cells). */
  const updateFlowField = (time: number) => {
    for (let ly = 0; ly < latRows; ly++) {
      const gy = ly * LATTICE * NOISE_SCALE
      const base = ly * latCols
      for (let lx = 0; lx < latCols; lx++) {
        const gx = lx * LATTICE * NOISE_SCALE
        const swirl = valueNoise(gx, gy + time)
        const strength = valueNoise(
          gx + NOISE_OFFSET_X,
          gy - time * NOISE_COUNTER_FLOW + NOISE_OFFSET_Y,
        )
        const angle = swirl * TAU * FLOW_TURNS
        const magnitude = MAG_FLOOR + MAG_RANGE * strength
        fieldU[base + lx] = Math.cos(angle) * magnitude
        fieldV[base + lx] = Math.sin(angle) * magnitude
      }
    }
  }

  /** Stamps a decaying impulse into every cell inside the pointer radius. */
  const stampWake = (px: number, py: number, dt: number) => {
    const radius = Math.max(settings.pointerRadius, 1)
    const limit = radius * radius
    const ceiling = step * WAKE_CEILING
    const firstCol = clamp(Math.floor((px - radius) / step), 0, cols - 1)
    const lastCol = clamp(Math.ceil((px + radius) / step), 0, cols - 1)
    const firstRow = clamp(Math.floor((py - radius) / step), 0, rows - 1)
    const lastRow = clamp(Math.ceil((py + radius) / step), 0, rows - 1)

    for (let row = firstRow; row <= lastRow; row++) {
      const base = row * cols
      for (let col = firstCol; col <= lastCol; col++) {
        const i = base + col
        const dx = homeX[i]! - px
        const dy = homeY[i]! - py
        const squared = dx * dx + dy * dy
        if (squared >= limit || squared === 0) {
          continue
        }
        const distance = Math.sqrt(squared)
        const falloff = 1 - distance / radius
        const push
          = falloff
            * falloff
            * settings.pointerStrength
            * radius
            * WAKE_GAIN
            * dt
        wakeX[i] = clamp(wakeX[i]! + (dx / distance) * push, -ceiling, ceiling)
        wakeY[i] = clamp(wakeY[i]! + (dy / distance) * push, -ceiling, ceiling)
      }
    }
  }

  /**
   * Walks the segment the pointer covered since the previous frame so a fast
   * flick leaves a continuous trail instead of a dotted line of impacts.
   */
  const advanceWake = (dt: number) => {
    if (!pointerActive) {
      previousPointerX = pointerX
      previousPointerY = pointerY
      return
    }
    const dx = pointerX - previousPointerX
    const dy = pointerY - previousPointerY
    const travel = Math.hypot(dx, dy)
    const steps = clamp(Math.ceil(travel / step), 1, MAX_SUBSTEPS)
    const slice = dt / steps
    for (let s = 1; s <= steps; s++) {
      const t = s / steps
      stampWake(previousPointerX + dx * t, previousPointerY + dy * t, slice)
    }
    previousPointerX = pointerX
    previousPointerY = pointerY
  }

  /** The one frame drawn when motion is reduced: grid at rest, word legible. */
  const drawResolved = () => {
    for (let tier = 0; tier < tiers.length; tier++) {
      const bucket = tiers[tier]!
      if (bucket.length === 0) {
        continue
      }
      context.fillStyle = tierCss[tier]!
      context.beginPath()
      for (const i of bucket) {
        const size = cellPx * (sizeBase[i]! + SIZE_FLOW * STILL_MAG)
        if (size > MIN_DRAW) {
          traceCell(homeX[i]!, homeY[i]!, size)
        }
      }
      context.fill()
    }
  }

  const drawFlowing = (reform: number, decay: number) => {
    const settled = reform >= 1
    const rest = 1 / (1 - STAGGER)
    const drift = step * DRIFT_RATIO

    for (let tier = 0; tier < tiers.length; tier++) {
      const bucket = tiers[tier]!
      if (bucket.length === 0) {
        continue
      }
      context.fillStyle = tierCss[tier]!
      context.beginPath()

      for (const i of bucket) {
        const wx = wakeX[i]! * decay
        const wy = wakeY[i]! * decay
        wakeX[i] = wx
        wakeY[i] = wy

        const corner = latticeIndex[i]!
        const tx = latticeWx[i]!
        const ty = latticeWy[i]!
        const below = corner + latCols
        const uTop
          = fieldU[corner]! + (fieldU[corner + 1]! - fieldU[corner]!) * tx
        const uBottom
          = fieldU[below]! + (fieldU[below + 1]! - fieldU[below]!) * tx
        const vTop
          = fieldV[corner]! + (fieldV[corner + 1]! - fieldV[corner]!) * tx
        const vBottom
          = fieldV[below]! + (fieldV[below + 1]! - fieldV[below]!) * tx
        const u = uTop + (uBottom - uTop) * ty
        const v = vTop + (vBottom - vTop) * ty
        const magnitude = Math.abs(u) + Math.abs(v)

        const amplitude = drift * ampFactor[i]!
        const restX = homeX[i]! + u * amplitude + wx
        const restY = homeY[i]! + v * amplitude + wy

        let x = restX
        let y = restY
        let scale = 1
        if (!settled) {
          const local = clamp((reform - delay[i]! * STAGGER) * rest, 0, 1)
          const inverse = 1 - local
          // Ease-out cubic: cells decelerate into place instead of arriving
          // at a constant speed.
          const eased = 1 - inverse * inverse * inverse
          x = scatterX[i]! + (restX - scatterX[i]!) * eased
          y = scatterY[i]! + (restY - scatterY[i]!) * eased
          scale = SCATTER_SIZE + (1 - SCATTER_SIZE) * eased
        }

        const size = cellPx * (sizeBase[i]! + SIZE_FLOW * magnitude) * scale
        if (size <= MIN_DRAW) {
          continue
        }
        if (x < -size || x > width + size) {
          continue
        }
        if (y < -size || y > height + size) {
          continue
        }
        traceCell(x, y, size)
      }
      context.fill()
    }
  }

  const draw = () => {
    if (destroyed) {
      return
    }
    context.clearRect(0, 0, width, height)

    if (settings.still) {
      drawResolved()
      return
    }

    const now = performance.now()
    const dt = clamp((now - lastFrameAt) / MS_PER_SECOND, 0, MAX_DT)
    lastFrameAt = now

    const elapsed = (now - startedAt) / MS_PER_SECOND
    updateFlowField(elapsed * settings.speed * TIME_SCALE)
    advanceWake(dt)

    const reform = clamp((now - scatterAt) / REFORM_MS, 0, 1)
    // Exponential decay, so the wake settles like momentum bleeding off
    // rather than fading on a straight line.
    drawFlowing(reform, Math.exp(-dt / WAKE_TAU))
  }

  const tick = () => {
    if (destroyed || !running) {
      return
    }
    draw()
    frame = requestAnimationFrame(tick)
  }

  resize()

  return {
    destroy: () => {
      destroyed = true
      running = false
      cancelAnimationFrame(frame)
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = 0
      canvas.height = 0
      sampler.width = 0
      sampler.height = 0
    },
    render: () => {
      resize()
      draw()
    },
    resize: () => {
      resize()
      if (!running) {
        draw()
      }
    },
    setPointer: (x: number, y: number, active: boolean) => {
      if (!pointerActive) {
        previousPointerX = x
        previousPointerY = y
      }
      pointerX = x
      pointerY = y
      pointerActive = active
    },
    setRunning: (next: boolean) => {
      if (destroyed || running === next) {
        return
      }
      running = next
      if (next) {
        lastFrameAt = performance.now()
        if (!hasStarted) {
          // The reveal plays when the field first becomes visible, not while
          // it is still parked below the fold.
          hasStarted = true
          scatterAt = lastFrameAt
        }
        frame = requestAnimationFrame(tick)
      }
      else {
        cancelAnimationFrame(frame)
      }
    },
    setSettings: (next: FieldSettings) => {
      const rescatter = next.scatterSeed !== settings.scatterSeed
      settings = next
      buildGrid()
      if (rescatter) {
        scatterAt = performance.now()
        wakeX.fill(0)
        wakeY.fill(0)
      }
    },
  }
}

const props = withDefaults(defineProps<PixelFlowFieldProps>(), {
  cellSize: 8,
  colors: () => [
    'var(--ui-text-dimmed)',
    'var(--ui-primary)',
    'var(--ui-text-highlighted)',
  ],
  gap: 3,
  paused: false,
  pointerRadius: 130,
  pointerStrength: 1,
  scatter: 0,
  shape: 'square',
  speed: 1,
  src: undefined,
  text: 'motion',
  weight: 800,
  class: undefined,
})

/**
 * Read straight from `matchMedia` in `onMounted`, before the controller exists,
 * so the very first paint is already still. A composable that resolves its
 * query a tick later would let a reduced-motion visitor see the loop start.
 */
const prefersReducedMotion = ref(false)
let motionQuery: MediaQueryList | null = null

const hostRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const controllerRef = shallowRef<FieldController | null>(null)
const isSupported = ref(true)
const isActive = ref(false)
const resolvedColors = shallowRef<Rgba[]>(FALLBACK_COLORS)
const fontFamily = ref(DEFAULT_FONT_FAMILY)
const sourceImage = shallowRef<HTMLImageElement | null>(null)

let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let onScreen = true
let imageToken = 0

/** Resolves the three ramp stops to sRGB against the live document. */
function resolveColors(inputs: string[]): Rgba[] {
  const host = hostRef.value
  if (!host) return FALLBACK_COLORS
  return inputs.map((input, index) => {
    const fallback = FALLBACK_COLORS[index % FALLBACK_COLORS.length]!
    const resolved = resolveColor(input, { target: host })
    if (!resolved) return fallback
    const rgb = colorToRgb(resolved, host)
    if (!rgb) return fallback
    return [rgb[0], rgb[1], rgb[2], 1]
  })
}

/** Reads the page typeface, so the sampled word matches the surrounding text. */
function readFontFamily(): void {
  const host = hostRef.value
  if (!host) return
  fontFamily.value = window.getComputedStyle(host).fontFamily
}

function loadSource(url: string | undefined): void {
  imageToken++
  const token = imageToken
  if (!url) {
    sourceImage.value = null
    return
  }
  const image = new Image()
  image.crossOrigin = 'anonymous'
  image.decoding = 'async'
  image.onload = () => {
    if (token === imageToken) {
      sourceImage.value = image
    }
  }
  image.onerror = () => {
    if (token === imageToken) {
      sourceImage.value = null
    }
  }
  image.src = url
}

function applySettings(): void {
  const controller = controllerRef.value
  if (!controller) return
  controller.setSettings({
    cellSize: Math.max(props.cellSize, MIN_STEP),
    colors: resolvedColors.value,
    fontFamily: fontFamily.value,
    gap: Math.max(props.gap, 0),
    pointerRadius: Math.max(props.pointerRadius, 1),
    pointerStrength: clamp(props.pointerStrength, 0, 1),
    scatterSeed: props.scatter,
    shape: props.shape,
    source: sourceImage.value,
    speed: Math.max(props.speed, 0),
    still: prefersReducedMotion.value,
    text: props.text,
    weight: props.weight,
  })
  controller.render()
}

function applyRunning(): void {
  const controller = controllerRef.value
  if (!controller) return
  const shouldRun
    = isActive.value && !props.paused && !prefersReducedMotion.value
  controller.setRunning(shouldRun)
  if (!shouldRun) {
    controller.render()
  }
}

function syncVisibility(): void {
  isActive.value = onScreen && document.visibilityState === 'visible'
}

function syncReducedMotion(): void {
  prefersReducedMotion.value = motionQuery?.matches ?? false
}

function handlePointer(event: PointerEvent): void {
  const canvas = canvasRef.value
  if (!canvas || prefersReducedMotion.value) return
  const rect = canvas.getBoundingClientRect()
  controllerRef.value?.setPointer(
    event.clientX - rect.left,
    event.clientY - rect.top,
    true,
  )
}

function releasePointer(): void {
  controllerRef.value?.setPointer(0, 0, false)
}

onMounted(() => {
  const host = hostRef.value
  const canvas = canvasRef.value
  if (!host || !canvas) return

  resolvedColors.value = resolveColors(props.colors)
  readFontFamily()
  loadSource(props.src)

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', syncReducedMotion)

  const controller = createFieldController(canvas)
  controllerRef.value = controller
  isSupported.value = controller !== null
  if (!controller) return

  resizeObserver = new ResizeObserver(() => controller.resize())
  resizeObserver.observe(canvas)

  intersectionObserver = new IntersectionObserver((entries) => {
    onScreen = entries.some(entry => entry.isIntersecting)
    syncVisibility()
  })
  intersectionObserver.observe(host)
  document.addEventListener('visibilitychange', syncVisibility)
  syncVisibility()

  // Pointer events, not hover: a touch drag has to leave a wake too.
  host.addEventListener('pointermove', handlePointer, { passive: true })
  host.addEventListener('pointerdown', handlePointer, { passive: true })
  host.addEventListener('pointerleave', releasePointer)
  host.addEventListener('pointercancel', releasePointer)

  applySettings()
  applyRunning()

  document.fonts?.ready.then(readFontFamily).catch(() => {
    // A font that never resolves just leaves the fallback family in place.
  })
})

onBeforeUnmount(() => {
  const host = hostRef.value
  if (host) {
    host.removeEventListener('pointermove', handlePointer)
    host.removeEventListener('pointerdown', handlePointer)
    host.removeEventListener('pointerleave', releasePointer)
    host.removeEventListener('pointercancel', releasePointer)
  }
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', syncVisibility)
  }
  motionQuery?.removeEventListener('change', syncReducedMotion)
  motionQuery = null
  resizeObserver?.disconnect()
  resizeObserver = null
  intersectionObserver?.disconnect()
  intersectionObserver = null
  controllerRef.value?.destroy()
  controllerRef.value = null
})

watch(
  () => props.colors.join('|'),
  () => {
    resolvedColors.value = resolveColors(props.colors)
  },
)

watch(resolvedColors, () => applySettings())

watch(fontFamily, () => applySettings())

watch(sourceImage, () => applySettings())

watch(
  () => props.src,
  (url) => {
    loadSource(url)
  },
)

watch(
  [
    () => props.cellSize,
    () => props.gap,
    () => props.pointerRadius,
    () => props.pointerStrength,
    () => props.scatter,
    () => props.shape,
    () => props.speed,
    () => props.text,
    () => props.weight,
    prefersReducedMotion,
  ],
  () => {
    applySettings()
    applyRunning()
  },
)

watch(
  [() => props.paused, isActive],
  () => applyRunning(),
)

const fallbackStyle = computed(() => {
  const color = toCssColor(props.colors[1] ?? props.colors[0] ?? DEFAULT_COLORS[1]!)
  const step = Math.max(props.cellSize + props.gap, MIN_STEP)
  return {
    backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
    backgroundSize: `${step}px ${step}px`,
  }
})
</script>

<template>
  <div
    ref="hostRef"
    :class="cn('relative isolate overflow-hidden', props.class)"
  >
    <div
      v-if="isSupported"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0"
    >
      <canvas
        ref="canvasRef"
        class="block size-full"
      />
    </div>
    <div
      v-else
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 opacity-40"
      :style="fallbackStyle"
    />
    <div class="relative z-10 h-full">
      <slot />
    </div>
  </div>
</template>
