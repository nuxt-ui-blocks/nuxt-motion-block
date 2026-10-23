<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export type DitherAlgorithm
  = | 'bayer'
    | 'atkinson'
    | 'floyd-steinberg'
    | 'threshold'

export interface DitherImageProps {
  /** Dithering kernel used to quantise the image. */
  algorithm?: DitherAlgorithm
  /** Alternative text. Always required - it names the image. */
  alt: string
  /** Extra classes for the wrapper. */
  class?: string
  /** Rendered height in CSS pixels. */
  height?: number
  /** Number of tones in the ramp, clamped to 2-8. */
  levels?: number
  /** Colour ramp, dark to light. Defaults to the surrounding theme colours. */
  palette?: string[]
  /** Size of one dithered block in CSS pixels. */
  pixelSize?: number
  /** Wipe the dithered pass in when the image scrolls into view. */
  progressive?: boolean
  /** Image URL. Must allow cross-origin reads to be dithered. */
  src: string
  /** Rendered width in CSS pixels. */
  width?: number
}

type Rgb = [number, number, number]
type RenderStatus = 'fallback' | 'loading' | 'ready'

const DEFAULT_WIDTH = 480
const DEFAULT_HEIGHT = 320
const DEFAULT_PIXEL_SIZE = 4
const DEFAULT_LEVELS = 2
const MIN_LEVELS = 2
const MAX_LEVELS = 8
const MIN_PIXEL_SIZE = 1
const MAX_DPR = 2
const CHANNELS = 4
const MAX_CHANNEL = 255
const BAYER_SIZE = 8
const BAYER_DIVISOR = BAYER_SIZE * BAYER_SIZE
const LUMA_R = 0.2126
const LUMA_G = 0.7152
const LUMA_B = 0.0722
const REVEAL_MARGIN = '0px 0px -10% 0px'

const BAYER_MATRIX = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
  14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23,
  61, 29, 53, 21,
]

const FLOYD_STEINBERG_KERNEL = [
  { dx: 1, dy: 0, weight: 7 / 16 },
  { dx: -1, dy: 1, weight: 3 / 16 },
  { dx: 0, dy: 1, weight: 5 / 16 },
  { dx: 1, dy: 1, weight: 1 / 16 },
]

const ATKINSON_WEIGHT = 1 / 8
const ATKINSON_KERNEL = [
  { dx: 1, dy: 0, weight: ATKINSON_WEIGHT },
  { dx: 2, dy: 0, weight: ATKINSON_WEIGHT },
  { dx: -1, dy: 1, weight: ATKINSON_WEIGHT },
  { dx: 0, dy: 1, weight: ATKINSON_WEIGHT },
  { dx: 1, dy: 1, weight: ATKINSON_WEIGHT },
  { dx: 0, dy: 2, weight: ATKINSON_WEIGHT },
]

const props = withDefaults(defineProps<DitherImageProps>(), {
  algorithm: 'bayer',
  class: undefined,
  height: DEFAULT_HEIGHT,
  levels: DEFAULT_LEVELS,
  palette: undefined,
  pixelSize: DEFAULT_PIXEL_SIZE,
  progressive: false,
  width: DEFAULT_WIDTH,
})

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const status = ref<RenderStatus>('loading')
const isRevealed = ref(false)

let observer: IntersectionObserver | undefined
let generation = 0

const safeLevels = computed(() =>
  clamp(Math.round(props.levels), MIN_LEVELS, MAX_LEVELS),
)
const safePixelSize = computed(() =>
  Math.max(MIN_PIXEL_SIZE, Math.round(props.pixelSize)),
)
const resolvedPalette = computed(() =>
  props.palette && props.palette.length > 0 ? props.palette : undefined,
)
const revealHidden = computed(() => props.progressive && !isRevealed.value)

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function luminanceOf([r, g, b]: Rgb) {
  return (r * LUMA_R + g * LUMA_G + b * LUMA_B) / MAX_CHANNEL
}

function readCssColor(
  scratch: CanvasRenderingContext2D,
  value: string,
): Rgb {
  scratch.clearRect(0, 0, 1, 1)
  scratch.fillStyle = value
  scratch.fillRect(0, 0, 1, 1)
  const { data } = scratch.getImageData(0, 0, 1, 1)

  return [data[0]!, data[1]!, data[2]!]
}

function isTransparent(value: string) {
  return (
    value === 'transparent'
    || /^rgba?\([^)]*,\s*0(?:\.0+)?\s*\)$/.test(value)
  )
}

function readThemeStops(
  scratch: CanvasRenderingContext2D,
  element: HTMLElement,
): Rgb[] {
  const styles = getComputedStyle(element)
  const isDark = document.documentElement.classList.contains('dark')
  const foreground
    = styles.color || (isDark ? 'rgb(250, 250, 250)' : 'rgb(17, 17, 17)')
  const background
    = styles.backgroundColor && !isTransparent(styles.backgroundColor)
      ? styles.backgroundColor
      : isDark
        ? 'rgb(10, 10, 10)'
        : 'rgb(255, 255, 255)'
  const first = readCssColor(scratch, foreground)
  const second = readCssColor(scratch, background)

  return luminanceOf(first) <= luminanceOf(second)
    ? [first, second]
    : [second, first]
}

function buildRamp(stops: Rgb[], levels: number): Rgb[] {
  if (stops.length === 1) {
    return Array.from({ length: levels }, () => stops[0]!)
  }

  const lastStop = stops.length - 1
  const lastLevel = levels - 1

  return Array.from({ length: levels }, (_unused, index) => {
    const position = (index / lastLevel) * lastStop
    const lower = Math.floor(position)
    const upper = Math.min(lastStop, lower + 1)
    const mix = position - lower
    const from = stops[lower]!
    const to = stops[upper]!

    return [
      Math.round(from[0] + (to[0] - from[0]) * mix),
      Math.round(from[1] + (to[1] - from[1]) * mix),
      Math.round(from[2] + (to[2] - from[2]) * mix),
    ] as Rgb
  })
}

function readLuminance(data: Uint8ClampedArray) {
  const values = new Float32Array(data.length / CHANNELS)

  for (let index = 0; index < values.length; index++) {
    const offset = index * CHANNELS
    values[index]
      = (data[offset]! * LUMA_R
        + data[offset + 1]! * LUMA_G
        + data[offset + 2]! * LUMA_B)
      / MAX_CHANNEL
  }

  return values
}

function diffuse(
  values: Float32Array,
  gridWidth: number,
  gridHeight: number,
  levels: number,
  kernel: { dx: number, dy: number, weight: number }[],
) {
  const steps = levels - 1
  const quantised = new Uint8Array(values.length)

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const index = y * gridWidth + x
      const original = values[index]!
      const level = clamp(Math.round(original * steps), 0, steps)
      quantised[index] = level
      const error = original - level / steps

      for (const tap of kernel) {
        const nx = x + tap.dx
        const ny = y + tap.dy

        if (nx < 0 || nx >= gridWidth || ny >= gridHeight) {
          continue
        }

        values[ny * gridWidth + nx] = values[ny * gridWidth + nx]! + error * tap.weight
      }
    }
  }

  return quantised
}

function quantiseOrdered(
  values: Float32Array,
  gridWidth: number,
  levels: number,
  ordered: boolean,
) {
  const steps = levels - 1
  const quantised = new Uint8Array(values.length)

  for (let index = 0; index < values.length; index++) {
    let value = values[index]!

    if (ordered) {
      const x = index % gridWidth
      const y = Math.floor(index / gridWidth)
      const cell
        = BAYER_MATRIX[(y % BAYER_SIZE) * BAYER_SIZE + (x % BAYER_SIZE)]!
      value += ((cell + 0.5) / BAYER_DIVISOR - 0.5) / steps
    }

    quantised[index] = clamp(Math.round(value * steps), 0, steps)
  }

  return quantised
}

function applyRamp(
  data: Uint8ClampedArray,
  quantised: Uint8Array,
  ramp: Rgb[],
) {
  for (let index = 0; index < quantised.length; index++) {
    const offset = index * CHANNELS
    const tone = ramp[quantised[index]!]!

    data[offset] = tone[0]
    data[offset + 1] = tone[1]
    data[offset + 2] = tone[2]
  }
}

function renderDither() {
  const canvas = canvasRef.value
  const container = containerRef.value

  if (!(canvas && container)) {
    return
  }

  const context = canvas.getContext('2d', { willReadFrequently: true })
  const scratchCanvas = document.createElement('canvas')
  scratchCanvas.width = 1
  scratchCanvas.height = 1
  const scratch = scratchCanvas.getContext('2d', { willReadFrequently: true })
  const grid = document.createElement('canvas')
  const gridContext = grid.getContext('2d', { willReadFrequently: true })

  if (!(context && scratch && gridContext)) {
    status.value = 'fallback'

    return
  }

  const current = ++generation
  const image = new Image()
  image.crossOrigin = 'anonymous'
  image.decoding = 'async'

  image.onload = () => {
    if (current !== generation) {
      return
    }

    try {
      const width = Math.max(1, Math.round(props.width))
      const height = Math.max(1, Math.round(props.height))
      const gridWidth = Math.max(1, Math.round(width / safePixelSize.value))
      const gridHeight = Math.max(1, Math.round(height / safePixelSize.value))
      const levels = safeLevels.value

      grid.width = gridWidth
      grid.height = gridHeight
      gridContext.clearRect(0, 0, gridWidth, gridHeight)
      gridContext.drawImage(image, 0, 0, gridWidth, gridHeight)

      const frame = gridContext.getImageData(0, 0, gridWidth, gridHeight)
      const values = readLuminance(frame.data)
      let quantised: Uint8Array

      if (props.algorithm === 'floyd-steinberg') {
        quantised = diffuse(
          values,
          gridWidth,
          gridHeight,
          levels,
          FLOYD_STEINBERG_KERNEL,
        )
      }
      else if (props.algorithm === 'atkinson') {
        quantised = diffuse(
          values,
          gridWidth,
          gridHeight,
          levels,
          ATKINSON_KERNEL,
        )
      }
      else {
        quantised = quantiseOrdered(
          values,
          gridWidth,
          levels,
          props.algorithm === 'bayer',
        )
      }

      const stops = resolvedPalette.value
        ? resolvedPalette.value.map(entry => readCssColor(scratch, entry))
        : readThemeStops(scratch, container)

      applyRamp(frame.data, quantised, buildRamp(stops, levels))
      gridContext.putImageData(frame, 0, 0)

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      context.imageSmoothingEnabled = false
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(grid, 0, 0, canvas.width, canvas.height)
      status.value = 'ready'
    }
    catch {
      status.value = 'fallback'
    }
  }

  image.onerror = () => {
    if (current === generation) {
      status.value = 'fallback'
    }
  }

  image.src = props.src
}

function setupReveal() {
  observer?.disconnect()
  observer = undefined

  if (!props.progressive) {
    isRevealed.value = true

    return
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || !('IntersectionObserver' in window)) {
    isRevealed.value = true

    return
  }

  const container = containerRef.value

  if (!container) {
    isRevealed.value = true

    return
  }

  isRevealed.value = false
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          isRevealed.value = true
          observer?.disconnect()
        }
      }
    },
    { rootMargin: REVEAL_MARGIN },
  )
  observer.observe(container)
}

watch(
  () => [
    props.src,
    props.algorithm,
    props.width,
    props.height,
    props.pixelSize,
    props.levels,
    props.palette?.join('|') ?? '',
  ],
  renderDither,
)

watch(() => props.progressive, setupReveal)

onMounted(() => {
  setupReveal()
  renderDither()
})

onBeforeUnmount(() => {
  generation += 1
  observer?.disconnect()
  observer = undefined

  const canvas = canvasRef.value

  if (canvas) {
    canvas.width = 0
    canvas.height = 0
  }
})
</script>

<template>
  <div
    ref="containerRef"
    :class="[
      'relative isolate overflow-hidden rounded-xl bg-default text-highlighted',
      props.class,
    ]"
    :style="{ width: `${props.width}px`, height: `${props.height}px` }"
  >
    <img
      :alt="props.alt"
      :height="props.height"
      :src="props.src"
      :width="props.width"
      class="absolute inset-0 h-full w-full object-cover"
      decoding="async"
    >

    <canvas
      ref="canvasRef"
      :class="[
        'dither-canvas absolute inset-0 h-full w-full',
        status === 'ready' ? 'is-ready' : '',
        revealHidden ? 'is-hidden' : '',
      ]"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.dither-canvas {
  image-rendering: pixelated;
  opacity: 0;
  clip-path: inset(0% 0% 0% 0%);
  transition:
    opacity 600ms cubic-bezier(0.23, 1, 0.32, 1),
    clip-path 600ms cubic-bezier(0.23, 1, 0.32, 1);
}

.dither-canvas.is-ready {
  opacity: 1;
}

.dither-canvas.is-hidden {
  clip-path: inset(0% 0% 100% 0%);
}

@media (prefers-reduced-motion: reduce) {
  .dither-canvas {
    transition: none;
  }
}
</style>
