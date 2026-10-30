<template>
  <div
    ref="rootRef"
    aria-hidden="true"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <canvas
      ref="canvasRef"
      :class="ui.canvas({ class: uiProps.ui?.canvas })"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import confetti from '../theme/confetti'

export interface ConfettiFireOptions {
  /** Colours to draw from. Defaults to the `colors` prop. */
  colors?: string[]
  /** Seconds the burst lasts. Defaults to the `duration` prop. */
  duration?: number
  /** How many pieces to launch. Defaults to the `particleCount` prop. */
  particleCount?: number
  /** Half-angle of the launch cone, in degrees. Defaults to the `spread` prop. */
  spread?: number
  /** Horizontal launch point, in pixels from the canvas edge. Defaults to the centre. */
  x?: number
  /** Vertical launch point, in pixels from the canvas edge. Defaults to the centre. */
  y?: number
}

export interface ConfettiProps {
  /** Extra classes for the overlay. */
  class?: string
  /** Colours a burst picks from. */
  colors?: string[]
  /** Seconds a burst lasts. */
  duration?: number
  /** Pieces launched per burst. */
  particleCount?: number
  /** Half-angle of the launch cone, in degrees. `90` sprays a full circle. */
  spread?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<ConfettiProps>(), {
  class: undefined,
  colors: () => ['#22d3ee', '#a855f7', '#f97316', '#22c55e', '#facc15'],
  duration: 2.4,
  particleCount: 80,
  spread: 60,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'confetti', props, theme: confetti })

const DPR_LIMIT = 2
const FRAME_MS = 1000 / 60
/** Downward acceleration per frame, in pixels. */
const GRAVITY = 0.35
/** Share of horizontal speed kept per frame, so pieces slow as they fly. */
const DRAG = 0.985
const MIN_SPEED = 7
const MAX_SPEED = 15

const shouldReduceMotion = useReducedMotion()

const rootRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Piece {
  color: string
  life: number
  rotation: number
  size: number
  spin: number
  vx: number
  vy: number
  x: number
  y: number
}

const pieces: Piece[] = []

let ctx: CanvasRenderingContext2D | null = null
let frameId = 0
let lastFrame = 0
let bounds = { width: 0, height: 0 }

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)

const resize = () => {
  const canvas = canvasRef.value
  const root = rootRef.value
  if (!canvas || !root || !ctx) {
    return
  }

  const rect = root.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, DPR_LIMIT)
  bounds = { width: rect.width, height: rect.height }
  canvas.width = Math.max(1, Math.floor(rect.width * dpr))
  canvas.height = Math.max(1, Math.floor(rect.height * dpr))
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

const paint = () => {
  if (!ctx) {
    return
  }

  ctx.clearRect(0, 0, bounds.width, bounds.height)

  for (const piece of pieces) {
    ctx.save()
    ctx.translate(piece.x, piece.y)
    ctx.rotate(piece.rotation)
    ctx.globalAlpha = Math.min(1, piece.life * 2)
    ctx.fillStyle = piece.color
    ctx.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2)
    ctx.restore()
  }

  ctx.globalAlpha = 1
}

const tick = (time: number) => {
  frameId = requestAnimationFrame(tick)

  if (time - lastFrame < FRAME_MS) {
    return
  }
  const elapsed = lastFrame ? Math.min(time - lastFrame, 64) / 1000 : FRAME_MS / 1000
  lastFrame = time

  for (let index = pieces.length - 1; index >= 0; index -= 1) {
    const piece = pieces[index]!
    piece.life -= elapsed
    if (piece.life <= 0) {
      pieces.splice(index, 1)
      continue
    }
    piece.vy += GRAVITY
    piece.vx *= DRAG
    piece.x += piece.vx
    piece.y += piece.vy
    piece.rotation += piece.spin
  }

  paint()

  if (!pieces.length) {
    cancelAnimationFrame(frameId)
    frameId = 0
    lastFrame = 0
  }
}

const fire = (options: ConfettiFireOptions = {}) => {
  if (shouldReduceMotion.value || !ctx) {
    return
  }

  const colors = options.colors ?? props.colors
  const count = options.particleCount ?? props.particleCount
  const spread = options.spread ?? props.spread
  const life = options.duration ?? props.duration
  const originX = options.x ?? bounds.width / 2
  const originY = options.y ?? bounds.height / 2

  for (let index = 0; index < count; index += 1) {
    // Straight up is -90°, so the cone opens symmetrically around it.
    const angle = (-90 + randomBetween(-spread, spread)) * (Math.PI / 180)
    const speed = randomBetween(MIN_SPEED, MAX_SPEED)

    pieces.push({
      color: colors[index % colors.length] ?? '#ffffff',
      life: life * randomBetween(0.75, 1),
      rotation: randomBetween(0, Math.PI * 2),
      size: randomBetween(6, 11),
      spin: randomBetween(-0.25, 0.25),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      x: originX,
      y: originY,
    })
  }

  if (!frameId) {
    frameId = requestAnimationFrame(tick)
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) {
    return
  }
  ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }
  resize()
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  if (frameId) {
    cancelAnimationFrame(frameId)
  }
  window.removeEventListener('resize', resize)
})

defineExpose({ fire })
</script>
