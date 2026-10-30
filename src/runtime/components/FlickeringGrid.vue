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
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import flickeringGrid from '../theme/flickering-grid'

export interface FlickeringGridProps {
  /** Extra classes for the container. */
  class?: string
  /** Colour of the squares, as `#rgb`, `#rrggbb` or `rgb()` parts. */
  color?: string
  /** Chance per tick that any one square re-rolls its opacity. */
  flickerChance?: number
  /** Gap between squares, in pixels. */
  gridGap?: number
  /** Cap on redraws per second. The flicker reads the same well below 60. */
  fps?: number
  /** Ceiling for a square's opacity. */
  maxOpacity?: number
  /** Side length of a square, in pixels. */
  squareSize?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<FlickeringGridProps>(), {
  class: undefined,
  color: '#6b7280',
  flickerChance: 0.3,
  gridGap: 6,
  fps: 15,
  maxOpacity: 0.3,
  squareSize: 4,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'flickeringGrid', props, theme: flickeringGrid })

const MS_PER_SECOND = 1000
const DPR_LIMIT = 2

const shouldReduceMotion = useReducedMotion()

const rootRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

let frameId = 0
let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined
let lastDraw = 0
let offscreen = false
let columns = 0
let rows = 0
let opacities = new Float32Array(0)

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
      return [107, 114, 128]
    }
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
  }

  const parts = value.split(',').map(part => Number.parseFloat(part))
  if (parts.length === 3 && parts.every(part => Number.isFinite(part))) {
    return [parts[0]!, parts[1]!, parts[2]!]
  }

  return [107, 114, 128]
}

const resize = () => {
  const root = rootRef.value
  const canvas = canvasRef.value
  if (!root || !canvas) {
    return
  }

  const ratio = Math.min(window.devicePixelRatio || 1, DPR_LIMIT)
  const width = root.clientWidth
  const height = root.clientHeight

  canvas.width = Math.max(1, Math.floor(width * ratio))
  canvas.height = Math.max(1, Math.floor(height * ratio))

  const context = canvas.getContext('2d')
  if (context) {
    // Drawing in CSS pixels keeps the square size stable across display scales.
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
  }

  const step = props.squareSize + props.gridGap
  columns = Math.max(1, Math.floor(width / step))
  rows = Math.max(1, Math.floor(height / step))
  opacities = new Float32Array(columns * rows)

  for (let index = 0; index < opacities.length; index++) {
    opacities[index] = Math.random() * props.maxOpacity
  }

  draw()
}

const draw = () => {
  const canvas = canvasRef.value
  const context = canvas?.getContext('2d')
  if (!canvas || !context) {
    return
  }

  const step = props.squareSize + props.gridGap
  const [red, green, blue] = parseColor(props.color)

  context.clearRect(0, 0, canvas.width, canvas.height)

  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      const opacity = opacities[column * rows + row] ?? 0
      if (opacity <= 0.005) {
        continue
      }
      context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`
      context.fillRect(column * step, row * step, props.squareSize, props.squareSize)
    }
  }
}

/** Re-rolls a share of the squares, leaving the rest at their current opacity. */
const flicker = () => {
  for (let index = 0; index < opacities.length; index++) {
    if (Math.random() < props.flickerChance) {
      opacities[index] = Math.random() * props.maxOpacity
    }
  }
}

const tick = (timestamp: number) => {
  frameId = requestAnimationFrame(tick)

  // Squares scrolled out of view cost nothing, and the reduced-motion case is
  // painted once by `resize` rather than animated.
  if (offscreen || shouldReduceMotion.value) {
    return
  }

  const interval = MS_PER_SECOND / Math.max(props.fps, 1)
  if (timestamp - lastDraw < interval) {
    return
  }

  lastDraw = timestamp
  flicker()
  draw()
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

  frameId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (frameId) {
    cancelAnimationFrame(frameId)
  }
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
})

watch(
  () => [props.squareSize, props.gridGap, props.maxOpacity, props.color],
  resize,
)
</script>
