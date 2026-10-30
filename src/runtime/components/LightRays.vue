<template>
  <div
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
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
import lightRays from '../theme/light-rays'

export type LightRaysOrigin = 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right'

export interface LightRaysProps {
  /** Extra classes for the frame. */
  class?: string
  /** Colour of the beams. */
  color?: string
  /** How many beams to draw. */
  count?: number
  /** Where the beams fade out, from `0` to `1` of their length. */
  fade?: number
  /** Let the beams lean toward the pointer. */
  followMouse?: boolean
  /** How far the beams reach, as a multiple of the frame's larger side. */
  length?: number
  /** How far the pointer pulls the source, from `0` to `1`. */
  mouseInfluence?: number
  /** Corner or edge the beams come from. */
  origin?: LightRaysOrigin
  /** Breathe the beams in and out. */
  pulsate?: boolean
  /** Seconds for one animation cycle. Lower is faster. */
  speed?: number
  /** Half-angle of the fan, in radians. */
  spread?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<LightRaysProps>(), {
  class: undefined,
  color: '#ffffff',
  count: 24,
  fade: 0.55,
  followMouse: false,
  length: 1.15,
  mouseInfluence: 0.15,
  origin: 'top-center',
  pulsate: true,
  speed: 1,
  spread: 0.85,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'lightRays', props, theme: lightRays })

const DPR_LIMIT = 2

const shouldReduceMotion = useReducedMotion()

const rootRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

let frameId = 0
let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined
let offscreen = false
let width = 0
let height = 0
let pointer: { x: number, y: number } | null = null

/** A stable per-beam number in `[0, 1)`, so the fan does not reshuffle each frame. */
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

const sourcePoint = () => {
  // The source sits just outside the frame, so the beams enter the canvas
  // already spread out instead of converging into a bright knot on the edge.
  const overshoot = Math.max(height, 1) * 0.08
  const horizontal = props.origin.endsWith('left') ? 0 : props.origin.endsWith('right') ? width : width / 2
  const vertical = props.origin.startsWith('top') ? -overshoot : height + overshoot

  if (!props.followMouse || !pointer) {
    return { x: horizontal, y: vertical }
  }

  return {
    x: horizontal + (pointer.x - horizontal) * props.mouseInfluence,
    y: vertical + (pointer.y - vertical) * props.mouseInfluence,
  }
}

const draw = (time: number) => {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) {
    return
  }

  const [red, green, blue] = parseColor(props.color)
  const fromTop = props.origin.startsWith('top')
  const center = fromTop ? Math.PI / 2 : -Math.PI / 2
  const reach = Math.max(width, height) * props.length
  const source = sourcePoint()

  ctx.globalCompositeOperation = 'source-over'
  ctx.clearRect(0, 0, width, height)
  ctx.globalCompositeOperation = 'lighter'

  for (let index = 0; index < props.count; index++) {
    const spreadSeed = hash(index + 1)
    const share = props.count === 1 ? 0.5 : index / (props.count - 1)
    const wobble = Math.sin(time * props.speed + index * 1.7) * 0.04
    const angle = center + (share - 0.5) * 2 * props.spread + wobble
    const beamLength = reach * (0.72 + spreadSeed * 0.55)
    const halfWidth = 0.003 + hash(index + 41) * 0.012
    const flicker = props.pulsate ? 0.7 + 0.3 * Math.sin(time * props.speed * 1.6 + index * 2.3) : 1
    const alpha = (0.06 + hash(index + 97) * 0.1) * flicker

    const gradient = ctx.createRadialGradient(source.x, source.y, 0, source.x, source.y, beamLength)
    gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${alpha})`)
    gradient.addColorStop(Math.min(props.fade, 0.95), `rgba(${red}, ${green}, ${blue}, ${alpha * 0.45})`)
    gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`)

    ctx.fillStyle = gradient

    // A wider, fainter pass under the core wedge: overlapping skirts read as a
    // glow, where a single hard wedge reads as a laser line.
    ctx.globalAlpha = 0.45
    ctx.beginPath()
    ctx.moveTo(source.x, source.y)
    ctx.arc(source.x, source.y, beamLength, angle - halfWidth * 3, angle + halfWidth * 3)
    ctx.closePath()
    ctx.fill()

    ctx.globalAlpha = 1
    ctx.beginPath()
    ctx.moveTo(source.x, source.y)
    ctx.arc(source.x, source.y, beamLength, angle - halfWidth, angle + halfWidth)
    ctx.closePath()
    ctx.fill()
  }

  ctx.globalAlpha = 1

  // A soft halo at the source keeps the fan from looking like it starts in mid-air.
  const halo = ctx.createRadialGradient(source.x, source.y, 0, source.x, source.y, reach * 0.35)
  halo.addColorStop(0, `rgba(${red}, ${green}, ${blue}, 0.22)`)
  halo.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`)
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(source.x, source.y, reach * 0.35, 0, Math.PI * 2)
  ctx.fill()
}

let startedAt = 0

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

const onPointerMove = (event: PointerEvent) => {
  if (!props.followMouse) {
    return
  }

  const rect = rootRef.value?.getBoundingClientRect()
  if (!rect) {
    return
  }

  pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
}

const onPointerLeave = () => {
  pointer = null
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
  () => [props.color, props.count, props.fade, props.length, props.origin, props.pulsate, props.spread],
  () => draw(0),
)
</script>
