<script setup lang="ts">
import { useReducedMotion } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { cn } from '../utils/merge'
import { colorToRgb, resolveColor } from '../utils/theme-color'

/**
 * 5x7 pixel font glyphs expressed as readable row strings ("#" = lit pixel,
 * "." = blank pixel), converted to numeric grids below.
 */
const FONT_GLYPH_ROWS: Record<string, string[]> = {
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
  '-': ['.....', '.....', '.....', '#####', '.....', '.....', '.....'],
  ',': ['.....', '.....', '.....', '.....', '..#..', '..#..', '.#...'],
  ':': ['.....', '..#..', '..#..', '.....', '..#..', '..#..', '.....'],
  '!': ['..#..', '..#..', '..#..', '..#..', '..#..', '.....', '..#..'],
  '?': ['.###.', '#...#', '....#', '...#.', '..#..', '.....', '..#..'],
  '.': ['.....', '.....', '.....', '.....', '.....', '..#..', '..#..'],
  '*': ['.....', '#.#.#', '.###.', '#####', '.###.', '#.#.#', '.....'],
  '0': ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
  '1': ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  '2': ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
  '3': ['.###.', '#...#', '....#', '..##.', '....#', '#...#', '.###.'],
  '4': ['#...#', '#...#', '#...#', '#####', '....#', '....#', '....#'],
  '5': ['#####', '#....', '#....', '####.', '....#', '....#', '####.'],
  '6': ['.###.', '#....', '#....', '####.', '#...#', '#...#', '.###.'],
  '7': ['#####', '....#', '...#.', '..#..', '..#..', '..#..', '..#..'],
  '8': ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
  '9': ['.###.', '#...#', '#...#', '.####', '....#', '#...#', '.###.'],
  'A': ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  'B': ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  'C': ['.####', '#....', '#....', '#....', '#....', '#....', '.####'],
  'D': ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  'E': ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  'F': ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
  'G': ['.####', '#....', '#....', '#..##', '#...#', '#...#', '.####'],
  'H': ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  'I': ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '#####'],
  'J': ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
  'K': ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  'L': ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  'M': ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  'N': ['#...#', '##..#', '#.#.#', '#.#.#', '#..##', '#...#', '#...#'],
  'O': ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  'P': ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  'Q': ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
  'R': ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  'S': ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  'T': ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  'U': ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  'V': ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  'W': ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '#.#.#', '.#.#.'],
  'X': ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
  'Y': ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  'Z': ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
}

const FONT_COLUMNS = 5
const FONT_ROWS = 7
/** Blank columns inserted between characters when building a text grid. */
const CHARACTER_SPACING_COLUMNS = 1
const CHARACTER_UNIT_WIDTH = FONT_COLUMNS + CHARACTER_SPACING_COLUMNS

const BLANK_CELL_CHARACTERS = new Set(['.', ' '])

/**
 * Row strings accept "." or " " for an unlit cell, "#" for palette index 1, and
 * a digit for any other palette index, so sprites can be multi-colour.
 */
function characterToCellValue(character: string): number {
  if (BLANK_CELL_CHARACTERS.has(character)) return 0
  const parsed = Number.parseInt(character, 10)
  return Number.isNaN(parsed) ? 1 : parsed
}

const rowsToGrid = (rows: string[]): number[][] =>
  rows.map(row => Array.from(row, characterToCellValue))

/** Numeric 5x7 pixel font map (0 = blank, 1 = lit), keyed by uppercase character. */
const PIXEL_FONT_5X7: Record<string, number[][]> = Object.fromEntries(
  Object.entries(FONT_GLYPH_ROWS).map(([character, rows]) => [character, rowsToGrid(rows)]),
)

const BLANK_GLYPH_GRID = rowsToGrid(
  Array.from({ length: FONT_ROWS }, () => '.'.repeat(FONT_COLUMNS)),
)

const getGlyphGrid = (character: string): number[][] =>
  PIXEL_FONT_5X7[character.toUpperCase()] ?? BLANK_GLYPH_GRID

function buildTextGrid(text: string): number[][] {
  const characters = text.length > 0 ? Array.from(text) : [' ']
  const rows: number[][] = Array.from({ length: FONT_ROWS }, () => [] as number[])

  for (const [index, character] of characters.entries()) {
    const glyph = getGlyphGrid(character)
    for (let rowIndex = 0; rowIndex < FONT_ROWS; rowIndex++) {
      rows[rowIndex]!.push(...glyph[rowIndex]!)
      if (index < characters.length - 1) rows[rowIndex]!.push(0)
    }
  }

  return rows
}

const resolveGrid = (sprite?: number[][], text?: string): number[][] => {
  if (sprite && sprite.length > 0) return sprite
  if (typeof text === 'string') return buildTextGrid(text)
  return BLANK_GLYPH_GRID
}

/**
 * Palettes arrive as arrays, which are a fresh reference on every render when
 * written inline. Serialising them gives the watcher a stable dependency. The
 * separator is a unit separator rather than a space, because a modern colour
 * such as `oklch(0.72 0.2 145)` contains spaces of its own.
 */
const PALETTE_SEPARATOR = '\u001F'

const DEFAULT_SPEED = 1
const DEFAULT_GLOW_INTENSITY = 0.65
const MAX_DEVICE_PIXEL_RATIO = 2
const TYPE_DURATION_MS = 1400
const WIPE_DURATION_MS = 900
const BLINK_INTERVAL_MS = 450
const BLINK_SETTLE_CYCLES = 3
const TYPE_FLASH_MS = 110
const MARQUEE_COLUMNS_PER_SECOND = 16
const MARQUEE_TAIL_COLUMNS = 8
const MS_PER_SECOND = 1000
const FLASH_COLOR = '#ffffff'
const BLOOM_BLUR_PX = 5
const MATRIX_ALPHA = 0.07
const FALLBACK_COLOR = '#ffffff'

const SCANLINE_PERIOD_PX = 3

const SCANLINE_BACKGROUND = `repeating-linear-gradient(to bottom, rgba(0,0,0,0.44) 0px, rgba(0,0,0,0.44) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) ${SCANLINE_PERIOD_PX}px)`
const ROLL_BAND_BACKGROUND
  = 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)'
const ABERRATION_BACKGROUND
  = 'linear-gradient(90deg, rgba(255,0,72,0.18) 0%, rgba(255,0,72,0) 13%, rgba(0,190,255,0) 87%, rgba(0,190,255,0.18) 100%)'
const VIGNETTE_BACKGROUND
  = 'radial-gradient(125% 125% at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.32) 74%, rgba(0,0,0,0.82) 100%)'

const aberrationStyle = {
  backgroundImage: ABERRATION_BACKGROUND,
  mixBlendMode: 'screen' as const,
}
const vignetteStyle = {
  backgroundImage: VIGNETTE_BACKGROUND,
  boxShadow: 'inset 0 0 24px rgba(0,0,0,0.65)',
}

interface FrameState {
  done: boolean
  /** Column range currently landing with a type-reveal flash. */
  flashEnd: number
  flashStart: number
  offsetColumns: number
  revealedColumns: number
  visible: boolean
}

interface PaintOptions {
  bloomAlpha: number
  columnsInView: number
  frame: FrameState
  grid: number[][]
  height: number
  matrixColor: string
  palette: string[]
  /** Column span after which the grid repeats, for a seamless marquee. */
  period: number
  pixelSize: number
  stride: number
  width: number
}

const isSameFrame = (a: FrameState, b: FrameState): boolean =>
  a.visible === b.visible
  && a.revealedColumns === b.revealedColumns
  && a.offsetColumns === b.offsetColumns
  && a.flashStart === b.flashStart
  && a.flashEnd === b.flashEnd

/** Crisp, opaque pixels: one fillRect per lit cell. */
function paintLitPixels(ctx: CanvasRenderingContext2D, options: PaintOptions): void {
  const { frame, period, pixelSize, stride, width } = options
  const repeats = period > 0 ? [0, period] : [0]

  for (const [rowIndex, row] of options.grid.entries()) {
    const y = rowIndex * stride
    for (const [columnIndex, value] of row.entries()) {
      if (!value || columnIndex >= frame.revealedColumns) continue
      const isFlashing = columnIndex >= frame.flashStart && columnIndex < frame.flashEnd
      const color = isFlashing
        ? FLASH_COLOR
        : (options.palette[value] ?? options.palette.at(-1))
      if (!color || color === 'transparent') continue
      ctx.fillStyle = color
      for (const repeat of repeats) {
        const x = (columnIndex + repeat - frame.offsetColumns) * stride
        if (x + pixelSize < 0 || x > width) continue
        ctx.fillRect(x, y, pixelSize, pixelSize)
      }
    }
  }
}

/**
 * Phosphor bleed. One blurred self-composite in `lighter` mode costs a single
 * draw call, where a per-pixel `shadowBlur` would cost one blur per lit cell.
 */
function paintBloom(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  options: PaintOptions,
): void {
  if (options.bloomAlpha <= 0) return
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.globalAlpha = options.bloomAlpha
  ctx.filter = `blur(${BLOOM_BLUR_PX}px)`
  ctx.drawImage(canvas, 0, 0, options.width, options.height)
  ctx.restore()
}

/**
 * The unlit dot matrix behind the message. Drawn last with `destination-over`
 * so it never dulls a lit pixel, and phase-locked to the marquee offset so the
 * dots and the message always sit on the same sub-cell grid.
 */
function paintDotMatrix(ctx: CanvasRenderingContext2D, options: PaintOptions): void {
  const { columnsInView, frame, pixelSize, stride } = options
  const phase = frame.offsetColumns - Math.floor(frame.offsetColumns)
  ctx.save()
  ctx.globalCompositeOperation = 'destination-over'
  ctx.globalAlpha = MATRIX_ALPHA
  ctx.fillStyle = options.matrixColor
  for (let rowIndex = 0; rowIndex < options.grid.length; rowIndex++) {
    const y = rowIndex * stride
    for (let column = 0; column <= columnsInView; column++) {
      ctx.fillRect((column - phase) * stride, y, pixelSize, pixelSize)
    }
  }
  ctx.restore()
}

function paintFrame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  options: PaintOptions,
): void {
  ctx.clearRect(0, 0, options.width, options.height)
  if (options.frame.visible) {
    paintLitPixels(ctx, options)
    paintBloom(ctx, canvas, options)
  }
  paintDotMatrix(ctx, options)
}

type ArcadePixelAnimate = 'none' | 'type' | 'wipe' | 'blink' | 'marquee'

interface ArcadePixelProps {
  /** Reveal animation played on mount. `marquee` scrolls the message forever. */
  animate?: ArcadePixelAnimate
  /** Extra classes for the positioned wrapper. */
  class?: string
  /** Fixed display width in pixel cells. Defaults to the content width. */
  columns?: number
  /** Curved vignette, chromatic fringing and a faint flicker over the canvas. */
  crt?: boolean
  /** Gap, in CSS pixels, between pixel cells. */
  gap?: number
  /** Phosphor bloom bleeding out of lit pixels. A number sets its intensity (0-1). */
  glow?: boolean | number
  /** Whether the reveal animation repeats indefinitely. */
  loop?: boolean
  /** Colours indexed by sprite/font value. Index 0 is treated as background. */
  palette?: string[]
  /** Size, in CSS pixels, of a single pixel cell. */
  pixelSize?: number
  /** Overlays a CRT-style scanline pattern. */
  scanlines?: boolean
  /** Animation speed multiplier. Higher plays faster. */
  speed?: number
  /** 2D array of palette indices. Takes precedence over `text` when both are set. */
  sprite?: number[][]
  /** Text rendered through the built-in 5x7 pixel font. Ignored if `sprite` is set. */
  text?: string
}

const props = withDefaults(defineProps<ArcadePixelProps>(), {
  animate: 'none',
  class: undefined,
  columns: undefined,
  crt: false,
  gap: 1,
  glow: false,
  loop: false,
  palette: () => ['transparent', 'var(--ui-primary)'],
  pixelSize: 8,
  scanlines: false,
  speed: 1,
  sprite: undefined,
  text: undefined,
})

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const reducedMotion = useReducedMotion()
const resolvedPalette = ref<string[]>([])

const grid = computed(() => resolveGrid(props.sprite, props.text))
const totalRows = computed(() => grid.value.length)
const totalColumns = computed(() => grid.value[0]?.length ?? 0)
const columnsInView = computed(() => Math.max(1, props.columns ?? totalColumns.value))
const stride = computed(() => props.pixelSize + props.gap)
const cssWidth = computed(() => columnsInView.value * stride.value - props.gap)
const cssHeight = computed(() => totalRows.value * stride.value - props.gap)

const numUnits = computed(() =>
  !props.sprite && typeof props.text === 'string'
    ? Math.max(1, Array.from(props.text).length)
    : Math.max(1, totalColumns.value),
)
const unitWidth = computed(() =>
  !props.sprite && typeof props.text === 'string' ? CHARACTER_UNIT_WIDTH : 1,
)

const accessibleLabel = computed(() =>
  typeof props.text === 'string' && props.text.trim().length > 0 ? props.text : 'pixel art',
)

const glowIntensity = computed(() =>
  typeof props.glow === 'number' ? props.glow : (props.glow && DEFAULT_GLOW_INTENSITY) || 0,
)

const period = computed(() =>
  props.animate === 'marquee' ? totalColumns.value + MARQUEE_TAIL_COLUMNS : 0,
)

const staticFrame = computed<FrameState>(() => ({
  done: true,
  flashEnd: -1,
  flashStart: -1,
  offsetColumns: 0,
  revealedColumns: totalColumns.value,
  visible: true,
}))

const matrixColor = computed(
  () => resolvedPalette.value.find(color => color !== 'transparent') ?? FALLBACK_COLOR,
)

/** Settings that invalidate the painted frame and restart the reveal. */
const paintKey = computed(() =>
  [
    props.animate,
    props.speed,
    props.loop,
    props.pixelSize,
    props.gap,
    props.columns,
    glowIntensity.value,
    props.palette.join(PALETTE_SEPARATOR),
    props.text,
    JSON.stringify(props.sprite),
  ].join('\u001E'),
)

let rafId: number | null = null
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let finished = false
let offscreen = false
let hidden = false
let paused = false
let elapsedMs = 0
let lastTimestamp: number | null = null
let lastFrame: FrameState | null = null
let landedUnits = 0
let flashStartedAtMs = Number.NEGATIVE_INFINITY
let cssWidthPx = 0
let cssHeightPx = 0
let started = false

/**
 * `fillStyle` cannot resolve CSS custom properties, so every palette entry is
 * read off the live element before the first paint and normalised to sRGB.
 */
function syncPalette(): void {
  const container = containerRef.value
  resolvedPalette.value = props.palette.map((color) => {
    if (color === 'transparent' || !container) return color
    const resolved = resolveColor(color, { target: container })
    if (!resolved) return color
    const rgb = colorToRgb(resolved, container)
    return rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : resolved
  })
}

function currentOptions(frame: FrameState): PaintOptions {
  return {
    bloomAlpha: glowIntensity.value,
    columnsInView: columnsInView.value,
    frame,
    grid: grid.value,
    height: cssHeightPx,
    matrixColor: matrixColor.value,
    palette: resolvedPalette.value,
    period: period.value,
    pixelSize: props.pixelSize,
    stride: stride.value,
    width: cssWidthPx,
  }
}

function resizeBackingStore(): void {
  const container = containerRef.value
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!(container && canvas && ctx)) return

  const rect = container.getBoundingClientRect()
  cssWidthPx = rect.width || cssWidth.value
  cssHeightPx = rect.height || cssHeight.value

  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO)
  const width = Math.max(1, Math.round(cssWidthPx * dpr))
  const height = Math.max(1, Math.round(cssHeightPx * dpr))
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function render(frame: FrameState): void {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!(canvas && ctx)) return
  lastFrame = frame
  paintFrame(ctx, canvas, currentOptions(frame))
}

function computeTypeFrame(safeSpeed: number): FrameState {
  const progress = Math.min(elapsedMs / (TYPE_DURATION_MS / safeSpeed), 1)
  const units = Math.floor(progress * numUnits.value)
  if (units !== landedUnits) {
    landedUnits = units
    flashStartedAtMs = elapsedMs
  }
  const isFlashing = elapsedMs - flashStartedAtMs < TYPE_FLASH_MS
  return {
    done: progress >= 1,
    flashEnd: isFlashing ? units * unitWidth.value : -1,
    flashStart: isFlashing ? (units - 1) * unitWidth.value : -1,
    offsetColumns: 0,
    revealedColumns: Math.min(totalColumns.value, units * unitWidth.value),
    visible: true,
  }
}

function computeWipeFrame(safeSpeed: number): FrameState {
  const progress = Math.min(elapsedMs / (WIPE_DURATION_MS / safeSpeed), 1)
  return {
    ...staticFrame.value,
    done: progress >= 1,
    revealedColumns: Math.floor(progress * totalColumns.value),
  }
}

function computeBlinkFrame(safeSpeed: number): FrameState {
  const phase = Math.floor(elapsedMs / (BLINK_INTERVAL_MS / safeSpeed))
  const settled = !props.loop && phase >= BLINK_SETTLE_CYCLES * 2
  return {
    ...staticFrame.value,
    done: settled,
    visible: settled || phase % 2 === 0,
  }
}

function computeMarqueeFrame(safeSpeed: number): FrameState {
  const columnsPerMs = (MARQUEE_COLUMNS_PER_SECOND * safeSpeed) / MS_PER_SECOND
  return {
    ...staticFrame.value,
    done: false,
    offsetColumns: (elapsedMs * columnsPerMs) % Math.max(1, period.value),
  }
}

function computeFrame(safeSpeed: number): FrameState {
  if (props.animate === 'type') return computeTypeFrame(safeSpeed)
  if (props.animate === 'wipe') return computeWipeFrame(safeSpeed)
  if (props.animate === 'blink') return computeBlinkFrame(safeSpeed)
  if (props.animate === 'marquee') return computeMarqueeFrame(safeSpeed)
  return staticFrame.value
}

function step(timestamp: number): void {
  rafId = null
  if (paused || finished) return
  if (lastTimestamp !== null) elapsedMs += timestamp - lastTimestamp
  lastTimestamp = timestamp

  const safeSpeed = props.speed > 0 ? props.speed : DEFAULT_SPEED
  const frame = computeFrame(safeSpeed)
  // A blinking display only changes twice a second, so repainting it every rAF
  // tick would be pure waste.
  if (!lastFrame || !isSameFrame(frame, lastFrame)) render(frame)

  if (frame.done) {
    if (props.loop) {
      elapsedMs = 0
      landedUnits = 0
      flashStartedAtMs = Number.NEGATIVE_INFINITY
    }
    else {
      render(staticFrame.value)
      finished = true
      return
    }
  }
  rafId = requestAnimationFrame(step)
}

function schedule(): void {
  if (paused || finished || rafId !== null) return
  rafId = requestAnimationFrame(step)
}

function syncPauseState(): void {
  const shouldPause = offscreen || hidden
  if (shouldPause === paused) return
  paused = shouldPause
  if (paused) {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    lastTimestamp = null
  }
  else {
    schedule()
  }
}

function onVisibilityChange(): void {
  hidden = document.hidden
  syncPauseState()
}

function reset(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  elapsedMs = 0
  landedUnits = 0
  flashStartedAtMs = Number.NEGATIVE_INFINITY
  lastTimestamp = null
  paused = false
  finished = false
  lastFrame = null
}

function start(): void {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!(canvas && container && canvas.getContext('2d'))) return

  reset()
  syncPalette()
  resizeBackingStore()

  if (reducedMotion.value || props.animate === 'none') {
    render(staticFrame.value)
    return
  }

  render({ ...staticFrame.value, revealedColumns: 0 })
  schedule()
  syncPauseState()
}

function restart(): void {
  if (started) start()
}

watch(paintKey, restart)

onMounted(() => {
  const container = containerRef.value
  if (!container) return

  started = true
  hidden = document.hidden
  start()

  resizeObserver = new ResizeObserver(() => {
    resizeBackingStore()
    if (lastFrame) render(lastFrame)
  })
  resizeObserver.observe(container)

  if (typeof IntersectionObserver !== 'undefined') {
    intersectionObserver = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (!entry) return
      offscreen = !entry.isIntersecting
      syncPauseState()
    })
    intersectionObserver.observe(container)
  }

  document.addEventListener('visibilitychange', onVisibilityChange)
})

onBeforeUnmount(() => {
  reset()
  started = false
  resizeObserver?.disconnect()
  resizeObserver = null
  intersectionObserver?.disconnect()
  intersectionObserver = null
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', onVisibilityChange)
  }
})
</script>

<template>
  <div
    ref="containerRef"
    :class="cn('relative inline-block overflow-hidden', props.class)"
    :style="{ width: `${cssWidth}px`, height: `${cssHeight}px` }"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 select-none"
    >
      <canvas
        ref="canvasRef"
        class="block size-full"
      />
      <div
        v-if="props.scanlines"
        class="arcade-scanlines absolute inset-x-0 top-0 h-[200%]"
        :style="{ backgroundImage: SCANLINE_BACKGROUND }"
      />
      <template v-if="props.crt">
        <div
          class="arcade-roll absolute inset-x-0 top-0 h-1/3"
          :style="{ backgroundImage: ROLL_BAND_BACKGROUND }"
        />
        <div
          class="absolute inset-0"
          :style="aberrationStyle"
        />
        <div
          class="absolute inset-0"
          :style="vignetteStyle"
        />
        <div class="arcade-flicker absolute inset-0 bg-white" />
      </template>
    </div>
    <span class="sr-only">{{ accessibleLabel }}</span>
  </div>
</template>

<style scoped>
@keyframes arcade-scanline-drift {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-6px);
  }
}

.arcade-scanlines {
  animation: arcade-scanline-drift 5s linear infinite;
}

@keyframes arcade-roll {
  from {
    transform: translateY(-140%);
  }

  to {
    transform: translateY(240%);
  }
}

.arcade-roll {
  animation: arcade-roll 9s linear infinite;
}

@keyframes arcade-flicker {
  0% {
    opacity: 0.055;
  }

  20% {
    opacity: 0.015;
  }

  40% {
    opacity: 0.045;
  }

  60% {
    opacity: 0.01;
  }

  80% {
    opacity: 0.06;
  }

  100% {
    opacity: 0.055;
  }
}

.arcade-flicker {
  opacity: 0.055;
  animation: arcade-flicker 2.4s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .arcade-scanlines {
    animation: none;
  }

  .arcade-roll,
  .arcade-flicker {
    display: none;
  }
}
</style>
