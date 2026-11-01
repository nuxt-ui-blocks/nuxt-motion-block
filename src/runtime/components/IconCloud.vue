<template>
  <div
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <canvas
      ref="canvasRef"
      role="img"
      :aria-label="ariaLabel"
      :class="ui.canvas({ class: uiProps.ui?.canvas })"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerUp"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import iconCloud from '../theme/icon-cloud'

export interface IconCloudProps {
  /** Accessible description of the cloud. */
  ariaLabel?: string
  /** Extra classes for the container. */
  class?: string
  /** Side length of an icon at the front of the sphere, in pixels. */
  iconSize?: number
  /** Image URLs placed on the sphere. Any square image works. */
  images?: string[]
  /** Radians per second the cloud turns on its own. `0` holds still until dragged. */
  speed?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<IconCloudProps>(), {
  ariaLabel: 'Icon cloud',
  class: undefined,
  iconSize: 42,
  images: () => [],
  speed: 0.15,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'iconCloud', props, theme: iconCloud })

const DPR_LIMIT = 2
/** Fraction of the shorter side the sphere occupies. */
const SPHERE_RATIO = 0.38
/** How much a drag of one pixel turns the sphere, in radians. */
const DRAG_SPEED = 0.006
/** The sphere never tips past its poles. */
const MAX_TILT = Math.PI / 2.2

interface CloudIcon {
  image: HTMLImageElement
  loaded: boolean
  /** Unit-sphere coordinates. */
  x: number
  y: number
  z: number
}

const shouldReduceMotion = useReducedMotion()

const rootRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const icons: CloudIcon[] = []
const size = { width: 0, height: 0 }
const rotation = { x: 0.18, y: 0 }
const drag = { active: false, x: 0, y: 0 }

let ctx: CanvasRenderingContext2D | null = null
let frameId = 0
let lastFrame = 0
let resizeObserver: ResizeObserver | undefined

/**
 * Even points on a sphere: walking the polar angle by a golden-angle step keeps
 * the icons from clustering at the poles.
 */
const seed = () => {
  icons.length = 0
  const count = props.images.length
  if (!count) {
    return
  }

  const offset = 2 / count
  const increment = Math.PI * (3 - Math.sqrt(5))

  props.images.forEach((src, index) => {
    const y = index * offset - 1 + offset / 2
    const radius = Math.sqrt(Math.max(0, 1 - y * y))
    const phi = index * increment

    const image = new Image()
    const icon: CloudIcon = {
      image,
      loaded: false,
      x: Math.cos(phi) * radius,
      y,
      z: Math.sin(phi) * radius,
    }

    image.addEventListener('load', () => {
      icon.loaded = true
      paint()
    })
    image.src = src

    icons.push(icon)
  })
}

const paint = () => {
  if (!ctx) {
    return
  }

  ctx.clearRect(0, 0, size.width, size.height)

  const cx = size.width / 2
  const cy = size.height / 2
  const radius = Math.min(size.width, size.height) * SPHERE_RATIO

  const cosY = Math.cos(rotation.y)
  const sinY = Math.sin(rotation.y)
  const cosX = Math.cos(rotation.x)
  const sinX = Math.sin(rotation.x)

  const projected = icons
    .filter(icon => icon.loaded)
    .map((icon) => {
      const x1 = icon.x * cosY - icon.z * sinY
      const z1 = icon.x * sinY + icon.z * cosY
      const y1 = icon.y * cosX - z1 * sinX
      const z2 = icon.y * sinX + z1 * cosX
      // `z2` runs -1 (front) to 1 (back); this keeps the front slightly larger.
      const perspective = 2 / (2 + z2)

      return {
        icon,
        x: cx + x1 * radius * perspective,
        y: cy + y1 * radius * perspective,
        depth: z2,
        side: props.iconSize * perspective,
      }
    })
    // Back to front, so nearer icons cover the ones behind them.
    .sort((a, b) => b.depth - a.depth)

  for (const item of projected) {
    ctx.globalAlpha = 0.28 + 0.72 * ((1 - item.depth) / 2)
    ctx.drawImage(item.icon.image, item.x - item.side / 2, item.y - item.side / 2, item.side, item.side)
  }

  ctx.globalAlpha = 1
}

const tick = (time: number) => {
  frameId = requestAnimationFrame(tick)

  const elapsed = lastFrame ? Math.min(time - lastFrame, 64) : 16
  lastFrame = time

  if (!drag.active && !shouldReduceMotion.value) {
    rotation.y += props.speed * (elapsed / 1000)
    paint()
  }
}

const resize = () => {
  const canvas = canvasRef.value
  const root = rootRef.value
  if (!canvas || !root || !ctx) {
    return
  }

  const rect = root.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, DPR_LIMIT)
  size.width = rect.width
  size.height = rect.height
  canvas.width = Math.max(1, Math.floor(rect.width * dpr))
  canvas.height = Math.max(1, Math.floor(rect.height * dpr))
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  paint()
}

const onPointerDown = (event: PointerEvent) => {
  drag.active = true
  drag.x = event.clientX
  drag.y = event.clientY
  canvasRef.value?.setPointerCapture(event.pointerId)
}

const onPointerMove = (event: PointerEvent) => {
  if (!drag.active) {
    return
  }

  rotation.y += (event.clientX - drag.x) * DRAG_SPEED
  rotation.x = Math.max(
    -MAX_TILT,
    Math.min(MAX_TILT, rotation.x + (event.clientY - drag.y) * DRAG_SPEED),
  )
  drag.x = event.clientX
  drag.y = event.clientY
  paint()
}

const onPointerUp = (event?: PointerEvent) => {
  if (!drag.active) {
    return
  }
  drag.active = false
  if (event && canvasRef.value?.hasPointerCapture(event.pointerId)) {
    canvasRef.value.releasePointerCapture(event.pointerId)
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

  seed()
  resize()
  frameId = requestAnimationFrame(tick)

  resizeObserver = new ResizeObserver(resize)
  if (rootRef.value) {
    resizeObserver.observe(rootRef.value)
  }
})

onBeforeUnmount(() => {
  if (frameId) {
    cancelAnimationFrame(frameId)
  }
  resizeObserver?.disconnect()
})

watch(
  () => props.images,
  () => {
    seed()
    paint()
  },
  { deep: true },
)

watch(() => props.iconSize, paint)
</script>
