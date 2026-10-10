<template>
  <canvas
    ref="canvasRef"
    role="img"
    :aria-label="`Avatar for ${props.seed}`"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{ height: `${props.size}px`, width: `${props.size}px` }"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import agentAvatar from '../theme/agent-avatar'

export interface AgentAvatarProps {
  /** Animate the pixel field. Still respects `prefers-reduced-motion`. */
  animated?: boolean
  class?: string
  /** String seed. The same seed always produces the same avatar. */
  seed: string
  /** Diameter in pixels. */
  size?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<AgentAvatarProps>(), {
  animated: true,
  class: undefined,
  size: 64,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'agentAvatar', props, theme: agentAvatar })

const GRID_SIZE = 6
/** Each pixel oscillates its own lightness, out of phase with its neighbours. */
const PULSE_SPEED = 0.002
const PULSE_AMPLITUDE = 22
/** One slow global offset shared by every pixel. */
const BREATHE_SPEED = 0.001
const BREATHE_AMPLITUDE = 10
/** A diagonal sweep travelling across the grid. */
const WAVE_SPEED = 0.0015
const WAVE_AMPLITUDE = 15
const WAVE_LENGTH = 3
/** Occasional bright flashes, kept rare so they read as events. */
const SPARKLE_SPEED = 0.004
const SPARKLE_THRESHOLD = 0.92
const SPARKLE_BOOST = 25
/** The whole avatar breathes in size as well as brightness. */
const SCALE_PULSE_SPEED = 0.0008
const SCALE_PULSE_AMOUNT = 0.03
/** Max hue spread from the base hue. */
const HUE_SPREAD = 45
const GLOW_RADIUS_RATIO = 0.25
const BACKGROUND = '#08080f'
const MIN_LIGHTNESS = 20
const MAX_LIGHTNESS = 90
const SATURATION_BOOST = 5
const GLOW_RING_INSET = 1
const GLOW_RING_WIDTH = 2
const TWO_PI = Math.PI * 2

/** A 32-bit string hash, so the same seed always yields the same avatar. */
const hashSeed = (value: string) => {
  let hash = 0
  for (let index = 0; index < value.length; index++) {
    hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0
  }
  return Math.abs(hash)
}

/** mulberry32 — small, fast, and good enough for visual noise. */
const createRng = (seed: number) => {
  let state = seed
  return () => {
    state = (state + 0x6D2B79F5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Hsl = [hue: number, saturation: number, lightness: number]

interface Cell {
  brightness: number
  colorIndex: number
  phase: number
  sparklePhase: number
}

/** Three colours in one hue family, so no cell can fight the grid. */
const generatePalette = (hash: number): [Hsl, Hsl, Hsl] => {
  const rng = createRng(hash)
  const baseHue = rng() * 360
  const sat = 75 + rng() * 20
  return [
    [baseHue, sat, 55 + rng() * 10],
    [(baseHue - HUE_SPREAD + rng() * HUE_SPREAD * 2) % 360, sat - 5 + rng() * 10, 40 + rng() * 15],
    [(baseHue - HUE_SPREAD + rng() * HUE_SPREAD * 2) % 360, sat - 10 + rng() * 15, 60 + rng() * 15],
  ]
}

const generateGrid = (hash: number): Cell[][] => {
  const rng = createRng(hash + 1)
  const grid: Cell[][] = []
  for (let y = 0; y < GRID_SIZE; y++) {
    const row: Cell[] = []
    for (let x = 0; x < GRID_SIZE; x++) {
      row.push({
        brightness: 0.3 + rng() * 0.7,
        colorIndex: Math.floor(rng() * 3),
        phase: rng() * TWO_PI,
        sparklePhase: rng() * TWO_PI,
      })
    }
    grid.push(row)
  }
  return grid
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let frameId = 0
let teardown: (() => void) | null = null

const startRenderer = () => {
  // A re-run must not leave the previous frame loop or media query listener
  // attached, so each start replaces the last teardown wholesale.
  teardown?.()
  teardown = null

  const canvas = canvasRef.value
  if (!canvas) {
    return
  }
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  const size = props.size
  const animated = props.animated
  const dpr = window.devicePixelRatio || 1
  canvas.width = size * dpr
  canvas.height = size * dpr
  ctx.scale(dpr, dpr)

  const hash = hashSeed(props.seed)
  const palette = generatePalette(hash)
  const grid = generateGrid(hash)
  const cellSize = size / GRID_SIZE
  const half = size / 2

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let shouldAnimate = animated && !motionQuery.matches

  const draw = (time: number) => {
    ctx.clearRect(0, 0, size, size)

    const scale = shouldAnimate ? 1 + Math.sin(time * SCALE_PULSE_SPEED) * SCALE_PULSE_AMOUNT : 1

    ctx.save()
    ctx.translate(half, half)
    ctx.scale(scale, scale)
    ctx.translate(-half, -half)

    ctx.beginPath()
    ctx.arc(half, half, half, 0, TWO_PI)
    ctx.clip()

    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, size, size)

    const breatheOffset = shouldAnimate ? Math.sin(time * BREATHE_SPEED) * BREATHE_AMPLITUDE : 0

    for (let y = 0; y < GRID_SIZE; y++) {
      const row = grid[y]
      for (let x = 0; x < GRID_SIZE; x++) {
        const cell = row[x]
        const [h, s, l] = palette[cell.colorIndex]

        const pulse = shouldAnimate ? Math.sin(time * PULSE_SPEED + cell.phase) * PULSE_AMPLITUDE : 0
        const wave = shouldAnimate
          ? Math.sin(time * WAVE_SPEED + (x + y) / WAVE_LENGTH) * WAVE_AMPLITUDE
          : 0
        const sparkleVal = shouldAnimate ? Math.sin(time * SPARKLE_SPEED + cell.sparklePhase) : 0
        const sparkle
          = sparkleVal > SPARKLE_THRESHOLD
            ? ((sparkleVal - SPARKLE_THRESHOLD) / (1 - SPARKLE_THRESHOLD)) * SPARKLE_BOOST
            : 0

        const finalLight = Math.min(
          MAX_LIGHTNESS,
          Math.max(MIN_LIGHTNESS, (l + pulse + breatheOffset + wave + sparkle) * cell.brightness),
        )
        const finalSat = Math.min(100, s + SATURATION_BOOST)

        // Each cell casts its own shadow, so neighbouring pixels bleed a little
        // into each other and the grid reads as glowing rather than tiled.
        ctx.shadowColor = `hsl(${h}, ${finalSat}%, ${finalLight}%)`
        ctx.shadowBlur = cellSize * 0.45
        ctx.fillStyle = `hsl(${h}, ${finalSat}%, ${finalLight}%)`
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
      }
    }

    ctx.shadowBlur = 0
    ctx.restore()

    const [gh, gs, gl] = palette[0]
    ctx.save()
    ctx.globalCompositeOperation = 'screen'
    ctx.shadowColor = `hsla(${gh}, ${gs}%, ${gl}%, 0.6)`
    ctx.shadowBlur = size * GLOW_RADIUS_RATIO
    ctx.beginPath()
    ctx.arc(half, half, half - GLOW_RING_INSET, 0, TWO_PI)
    ctx.strokeStyle = `hsla(${gh}, ${gs}%, ${gl}%, 0.15)`
    ctx.lineWidth = GLOW_RING_WIDTH
    ctx.stroke()
    ctx.restore()

    if (shouldAnimate) {
      frameId = requestAnimationFrame(draw)
    }
  }

  const handleMotionChange = () => {
    cancelAnimationFrame(frameId)
    shouldAnimate = animated && !motionQuery.matches
    if (shouldAnimate) {
      frameId = requestAnimationFrame(draw)
    }
    else {
      draw(0)
    }
  }

  motionQuery.addEventListener('change', handleMotionChange)

  if (shouldAnimate) {
    frameId = requestAnimationFrame(draw)
  }
  else {
    draw(0)
  }

  teardown = () => {
    cancelAnimationFrame(frameId)
    motionQuery.removeEventListener('change', handleMotionChange)
  }
}

// Canvas-only: no motion-v involved, so there is nothing to watch reactively
// beyond the three inputs the upstream effect depends on.
watch(() => [props.seed, props.size, props.animated], startRenderer, { flush: 'post' })

onMounted(startRenderer)
onBeforeUnmount(() => {
  teardown?.()
  teardown = null
})
</script>
