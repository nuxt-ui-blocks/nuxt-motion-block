<template>
  <div
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <canvas
      ref="canvasRef"
      aria-hidden="true"
      :class="ui.canvas({ class: uiProps.ui?.canvas })"
    />
    <div :class="ui.content({ class: uiProps.ui?.content })">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import warpBackground from '../theme/warp-background'

export interface WarpBackgroundProps {
  /** How many light shafts stand on the floor. */
  beams?: number
  /** Extra classes for the frame. */
  class?: string
  /** Colour of the horizon glow and the shafts. */
  color?: string
  /** Strength of the horizon glow, from `0` to `1`. */
  glow?: number
  /** Colour of the floor grid. */
  gridColor?: string
  /** Where the floor meets the sky, from `0` (top) to `1` (bottom). */
  horizon?: number
  /** How many lines fan out from the vanishing point. */
  lines?: number
  /** Speed of the travel. Lower is slower. */
  speed?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<WarpBackgroundProps>(), {
  beams: 4,
  class: undefined,
  color: '#6366f1',
  glow: 0.6,
  gridColor: '#ffffff',
  horizon: 0.55,
  lines: 22,
  speed: 1,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'warpBackground', props, theme: warpBackground })

const DPR_LIMIT = 2

const shouldReduceMotion = useReducedMotion()

const rootRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

let frameId = 0
let startedAt = 0
let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined
let offscreen = false
let width = 0
let height = 0

/** A stable per-element number in `[0, 1)`, so the shafts keep their places. */
const hash = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

/** Accepts `#rgb`, `#rrggbb` and a bare `r, g, b` triple. */
const parseColor = (input: string): [number, number, number] => {
  const value = input.trim()

  if (value.startsWith('#')) {
    const hex = value.slice(1)
    const expanded = hex.length === 3
      ? hex.split('').map(char => char + char).join('')
      : hex
    const int = Number.parseInt(expanded, 16)
    if (Number.isNaN(int)) {
      return [255, 255, 255]
    }
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
  }

  const parts = value.split(',').map(part => Number.parseFloat(part))
  if (parts.length === 3 && parts.every(part => Number.isFinite(part))) {
    return [parts[0]!, parts[1]!, parts[2]!]
  }

  return [255, 255, 255]
}

const draw = (time: number) => {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) {
    return
  }

  const [cr, cg, cb] = parseColor(props.color)
  const [gr, gg, gb] = parseColor(props.gridColor)

  const horizonY = height * props.horizon
  const vanishingX = width / 2

  ctx.clearRect(0, 0, width, height)

  if (props.glow > 0) {
    const radius = Math.max(width, height) * 0.55
    const glow = ctx.createRadialGradient(vanishingX, horizonY, 0, vanishingX, horizonY, radius)
    glow.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${0.5 * props.glow})`)
    glow.addColorStop(0.45, `rgba(${cr}, ${cg}, ${cb}, ${0.12 * props.glow})`)
    glow.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`)
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, width, height)
  }

  // Rungs travel toward the viewer and bunch up as they approach the horizon.
  const travel = (time * props.speed * 0.35) % 1
  const rungCount = 16
  ctx.lineWidth = 1

  for (let index = 0; index < rungCount; index++) {
    const depth = ((index / rungCount) + travel) % 1
    const y = horizonY + (height - horizonY) * Math.pow(depth, 2.6)
    ctx.strokeStyle = `rgba(${gr}, ${gg}, ${gb}, ${0.04 + depth * 0.38})`
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // The fan converges on the vanishing point, so one path is enough.
  ctx.strokeStyle = `rgba(${gr}, ${gg}, ${gb}, 0.16)`
  ctx.beginPath()
  for (let index = 0; index < props.lines; index++) {
    const share = props.lines === 1 ? 0.5 : index / (props.lines - 1)
    ctx.moveTo(vanishingX, horizonY)
    ctx.lineTo(vanishingX + (share - 0.5) * width * 2.2, height)
  }
  ctx.stroke()

  // Light shafts standing on the floor, fading up into the haze.
  for (let index = 0; index < props.beams; index++) {
    const x = width * (0.1 + hash(index + 7) * 0.8)
    const beamWidth = width * (0.02 + hash(index + 31) * 0.05)
    const flicker = 0.6 + 0.4 * Math.sin(time * props.speed * 1.2 + index * 2.1)

    const shaft = ctx.createLinearGradient(0, horizonY, 0, height)
    shaft.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${0.24 * flicker})`)
    shaft.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`)
    ctx.fillStyle = shaft
    ctx.fillRect(x - beamWidth / 2, horizonY, beamWidth, height - horizonY)
  }
}

const resize = () => {
  const root = rootRef.value
  const canvas = canvasRef.value
  if (!root || !canvas) {
    return
  }

  const ratio = Math.min(window.devicePixelRatio || 1, DPR_LIMIT)
  width = root.clientWidth
  height = root.clientHeight

  canvas.width = Math.max(1, Math.floor(width * ratio))
  canvas.height = Math.max(1, Math.floor(height * ratio))

  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  }

  draw(0)
}

const tick = (timestamp: number) => {
  frameId = requestAnimationFrame(tick)

  if (offscreen || shouldReduceMotion.value) {
    return
  }

  if (!startedAt) {
    startedAt = timestamp
  }

  draw((timestamp - startedAt) / 1000)
}

onMounted(() => {
  const root = rootRef.value
  if (!root) {
    return
  }

  resize()

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(root)

  intersectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      offscreen = !entry.isIntersecting
    }
  })
  intersectionObserver.observe(root)

  if (!shouldReduceMotion.value) {
    frameId = requestAnimationFrame(tick)
  }
})

onBeforeUnmount(() => {
  if (frameId) {
    cancelAnimationFrame(frameId)
  }
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
})

watch(
  () => [props.beams, props.color, props.glow, props.gridColor, props.horizon, props.lines],
  () => draw(0),
)
</script>
