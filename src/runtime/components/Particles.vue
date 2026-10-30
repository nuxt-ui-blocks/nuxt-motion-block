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
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import particles from '../theme/particles'

export interface ParticlesProps {
  /** Extra classes for the container. */
  class?: string
  /** Colour of every particle. Any CSS colour works. */
  color?: string
  /** How quickly a pushed particle settles home. `0` never settles, `100` snaps back. */
  ease?: number
  /** How many particles to draw. */
  quantity?: number
  /** Redraw the field with fresh random positions whenever this flips. */
  refresh?: boolean
  /** Base radius of a particle, in pixels. Each one is drawn somewhere between this and twice it. */
  size?: number
  /** How firmly the pointer pushes particles away. `0` ignores the pointer entirely. */
  staticity?: number
  ui?: Record<string, any>
  /** Horizontal drift of every particle, in pixels per frame. */
  vx?: number
  /** Vertical drift of every particle, in pixels per frame. */
  vy?: number
}

const props = withDefaults(defineProps<ParticlesProps>(), {
  class: undefined,
  color: 'var(--ui-primary)',
  ease: 50,
  quantity: 100,
  refresh: false,
  size: 0.4,
  staticity: 50,
  ui: undefined,
  vx: 0,
  vy: 0,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'particles', props, theme: particles })

/** Pointer reach at the default `staticity`, in pixels. */
const CIRCLE_RADIUS = 350
/** Divisor that turns `staticity` into a reach: higher staticity, shorter reach. */
const STATICITY_SCALE = 20
const DPR_LIMIT = 2
const FRAME_MS = 1000 / 60

interface Particle {
  /** Home position, in CSS pixels. */
  x: number
  y: number
  /** Offset from home, pushed by the pointer and eased back to zero. */
  tx: number
  ty: number
  size: number
}

const shouldReduceMotion = useReducedMotion()

const rootRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const nodes: Particle[] = []
const viewport = { width: 0, height: 0 }
const pointer = { x: 0, y: 0 }

let ctx: CanvasRenderingContext2D | null = null
let frameId = 0
let lastFrame = 0
let visible = true
let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)

const seed = () => {
  nodes.length = 0
  for (let index = 0; index < props.quantity; index += 1) {
    nodes.push({
      x: randomBetween(0, viewport.width),
      y: randomBetween(0, viewport.height),
      tx: 0,
      ty: 0,
      size: props.size * randomBetween(1, 2.4),
    })
  }
}

const paint = () => {
  if (!ctx) {
    return
  }
  ctx.clearRect(0, 0, viewport.width, viewport.height)
  ctx.fillStyle = props.color
  for (const node of nodes) {
    ctx.beginPath()
    ctx.arc(node.x + node.tx, node.y + node.ty, node.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

/** Particles that drift off one edge come back on the opposite one. */
const wrap = (node: Particle) => {
  const margin = 20
  if (node.x < -margin) {
    node.x = viewport.width + margin
  }
  else if (node.x > viewport.width + margin) {
    node.x = -margin
  }
  if (node.y < -margin) {
    node.y = viewport.height + margin
  }
  else if (node.y > viewport.height + margin) {
    node.y = -margin
  }
}

const tick = (time: number) => {
  frameId = requestAnimationFrame(tick)
  if (!ctx || !visible || shouldReduceMotion.value) {
    return
  }
  if (time - lastFrame < FRAME_MS) {
    return
  }
  lastFrame = time

  const easing = (props.ease / 100) * 0.1
  for (const node of nodes) {
    node.tx -= node.tx * easing
    node.ty -= node.ty * easing
    node.x += props.vx
    node.y += props.vy
    wrap(node)
  }
  paint()
}

const resize = () => {
  const canvas = canvasRef.value
  const root = rootRef.value
  if (!canvas || !root || !ctx) {
    return
  }

  const rect = root.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, DPR_LIMIT)
  viewport.width = rect.width
  viewport.height = rect.height
  canvas.width = Math.max(1, Math.floor(rect.width * dpr))
  canvas.height = Math.max(1, Math.floor(rect.height * dpr))
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  seed()
  paint()
}

const onPointerMove = (event: PointerEvent) => {
  const canvas = canvasRef.value
  if (!canvas || shouldReduceMotion.value || props.staticity <= 0) {
    return
  }

  const rect = canvas.getBoundingClientRect()
  pointer.x = event.clientX - rect.left
  pointer.y = event.clientY - rect.top

  const reach = CIRCLE_RADIUS / Math.max(props.staticity / STATICITY_SCALE, 0.01)
  const strength = 8 * (props.ease / 50)

  for (const node of nodes) {
    const dx = node.x + node.tx - pointer.x
    const dy = node.y + node.ty - pointer.y
    const distance = Math.hypot(dx, dy)
    if (distance === 0 || distance > reach) {
      continue
    }
    const force = (1 - distance / reach) * strength
    node.tx += (dx / distance) * force
    node.ty += (dy / distance) * force
  }

  paint()
}

const onPointerLeave = () => {
  pointer.x = 0
  pointer.y = 0
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
  frameId = requestAnimationFrame(tick)

  resizeObserver = new ResizeObserver(resize)
  if (rootRef.value) {
    resizeObserver.observe(rootRef.value)
  }

  // Nothing to animate while the field is off screen.
  intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries.some(entry => entry.isIntersecting)
  })
  if (rootRef.value) {
    intersectionObserver.observe(rootRef.value)
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
  () => [props.quantity, props.size, props.refresh],
  () => {
    seed()
    paint()
  },
)

watch(() => props.color, paint)
</script>
