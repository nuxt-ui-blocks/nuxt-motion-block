<template>
  <div
    ref="containerRef"
    :class="['relative', props.class]"
  >
    <slot />

    <div
      v-if="isMounted"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0"
    >
      <canvas
        ref="canvasRef"
        class="h-full w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'

export interface DrawingCursorProps {
  /** Canvas composite operation used for every stroke. */
  blend?: GlobalCompositeOperation
  /** Erase the drawing when the pointer leaves. */
  clearOnLeave?: boolean
  /** Stroke colour. */
  color?: string
  /** Milliseconds for a point to fade to nothing. `0` never fades. */
  decay?: number
  /** Stroke width in CSS pixels, before any taper. */
  lineWidth?: number
  /** Extra CSS class on the wrapper. */
  class?: string
  /** Freeze the current frame. */
  paused?: boolean
  /** Quality of the curve fit. `0` is polyline, `1` is fully smoothed. */
  smoothing?: number
  /** Thin the stroke as the pointer moves faster. */
  taper?: boolean
}

const props = withDefaults(defineProps<DrawingCursorProps>(), {
  blend: 'source-over',
  clearOnLeave: true,
  class: '',
  color: 'var(--color-brand, #6366f1)',
  decay: 800,
  lineWidth: 3,
  paused: false,
  smoothing: 0.5,
  taper: true,
})

const MAX_DEVICE_PIXEL_RATIO = 2
/** A pause longer than this starts a new stroke instead of bridging the gap. */
const STROKE_BREAK_MS = 120
const MIN_WIDTH_FACTOR = 0.35
const SPEED_TO_WIDTH_SCALE = 0.12
const MAX_POINTS_PER_STROKE = 600
const MAX_STROKES = 40
const MIN_CANVAS_SIZE = 1
/** A round cap needs a segment with length to paint, however small. */
const DOT_EPSILON = 0.1

interface StrokePoint {
  time: number
  width: number
  x: number
  y: number
}

interface Stroke {
  points: StrokePoint[]
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/**
 * A pointer event carries one position per frame, but the path the hand actually
 * took between frames is lost. `getCoalescedEvents` hands back every position
 * the browser batched, so fast strokes come out smooth instead of faceted.
 */
const getPointerCoordinates = (event: PointerEvent, rect: DOMRect) => {
  const coalesced = typeof event.getCoalescedEvents === 'function' ? event.getCoalescedEvents() : null
  const events = coalesced && coalesced.length > 0 ? coalesced : [event]
  return events.map(coalescedEvent => ({
    x: coalescedEvent.clientX - rect.left,
    y: coalescedEvent.clientY - rect.top,
  }))
}

const shouldReduceMotion = useReducedMotion()
const containerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isPointerCapable = ref(false)

const strokes: Stroke[] = []
let activeStroke: Stroke | null = null
let frameId = 0
let lastPointTime = 0
let size = { height: 0, width: 0 }

const isMounted = computed(() => isPointerCapable.value && !shouldReduceMotion.value)

const clear = () => {
  strokes.length = 0
  activeStroke = null
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}

const toDataURL = (type = 'image/png', quality?: number) => canvasRef.value?.toDataURL(type, quality) ?? ''

defineExpose({ clear, toDataURL })

const startRenderer = () => {
  teardown?.()
  teardown = null
  const container = containerRef.value
  const canvas = canvasRef.value
  if (!container || !canvas) {
    return
  }
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  const { blend, clearOnLeave, decay, lineWidth, smoothing, taper } = props

  /**
   * `ctx.strokeStyle` is not a CSS property parser: assigning `var(--brand)` to
   * it is silently ignored and the previous colour survives, which in practice
   * means a default black stroke. Resolving through a throwaway child of the
   * container lets any CSS colour — including tokens defined in the component's
   * own scope — reach the canvas.
   */
  const color = props.color.includes('var(')
    ? (() => {
        const probe = document.createElement('span')
        probe.style.display = 'none'
        probe.style.color = props.color
        container.appendChild(probe)
        const resolved = window.getComputedStyle(probe).color
        probe.remove()
        return resolved || props.color
      })()
    : props.color

  const resize = () => {
    const rect = container.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO)
    canvas.width = Math.max(MIN_CANVAS_SIZE, Math.round(rect.width * dpr))
    canvas.height = Math.max(MIN_CANVAS_SIZE, Math.round(rect.height * dpr))
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    size = { height: rect.height, width: rect.width }
  }

  resize()
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)

  const pushPoint = (x: number, y: number, time: number) => {
    const isNewStroke = !activeStroke || time - lastPointTime > STROKE_BREAK_MS
    if (isNewStroke) {
      const stroke: Stroke = { points: [] }
      activeStroke = stroke
      strokes.push(stroke)
      if (strokes.length > MAX_STROKES) {
        strokes.shift()
      }
    }
    const stroke = activeStroke
    if (!stroke) {
      return
    }
    const previous = stroke.points.at(-1)
    let width = lineWidth
    if (taper && previous) {
      const dt = Math.max(1, time - previous.time)
      const distance = Math.hypot(x - previous.x, y - previous.y)
      const speed = distance / dt
      width = lineWidth * clamp(1 - speed * SPEED_TO_WIDTH_SCALE, MIN_WIDTH_FACTOR, 1)
    }
    stroke.points.push({ time, width, x, y })
    if (stroke.points.length > MAX_POINTS_PER_STROKE) {
      stroke.points.shift()
    }
    lastPointTime = time
  }

  const handlePointerMove = (event: PointerEvent) => {
    const rect = container.getBoundingClientRect()
    for (const point of getPointerCoordinates(event, rect)) {
      pushPoint(point.x, point.y, performance.now())
    }
  }

  const handlePointerLeave = () => {
    activeStroke = null
    if (clearOnLeave) {
      strokes.length = 0
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  container.addEventListener('pointermove', handlePointerMove, { passive: true })
  container.addEventListener('pointerleave', handlePointerLeave, { passive: true })

  const drawStroke = (stroke: Stroke, now: number) => {
    const { points } = stroke
    if (points.length === 0) {
      return
    }
    const last = points[points.length - 1]
    const lastAge = decay > 0 ? clamp(1 - (now - last.time) / decay, 0, 1) : 1
    if (lastAge <= 0) {
      return
    }
    /**
     * A stroke can legitimately hold exactly one sample: a tap, or the tail of a
     * slow drag whose consecutive samples fell further apart than the stroke
     * break, so each got its own stroke. It still has to render, or a slow drag
     * draws nothing at all while a fast one looks fine. With round caps a
     * zero-length segment paints as a dot, so this costs one extra sample.
     */
    if (points.length === 1) {
      ctx.beginPath()
      ctx.moveTo(last.x, last.y)
      ctx.lineTo(last.x + DOT_EPSILON, last.y)
      ctx.globalAlpha = lastAge
      ctx.strokeStyle = color
      ctx.lineWidth = last.width
      ctx.stroke()
      return
    }
    // Two points have no midpoint to smooth through, so a single straight
    // segment is the honest rendering of them.
    if (points.length === 2) {
      const [start, end] = points
      const age = decay > 0 ? clamp(1 - (now - end.time) / decay, 0, 1) : 1
      if (age <= 0) {
        return
      }
      ctx.beginPath()
      ctx.moveTo(start.x, start.y)
      ctx.lineTo(end.x, end.y)
      ctx.globalAlpha = age
      ctx.strokeStyle = color
      ctx.lineWidth = end.width
      ctx.stroke()
      return
    }
    // Each segment is a quadratic through its own point, with endpoints pulled
    // towards the neighbouring midpoints. Anchoring on raw points instead would
    // leave a visible kink at every sample.
    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const next = points[i + 1]
      const age = decay > 0 ? clamp(1 - (now - curr.time) / decay, 0, 1) : 1
      if (age <= 0) {
        continue
      }
      const startX = prev.x + ((prev.x + curr.x) / 2 - prev.x) * smoothing
      const startY = prev.y + ((prev.y + curr.y) / 2 - prev.y) * smoothing
      const endX = next.x + ((curr.x + next.x) / 2 - next.x) * smoothing
      const endY = next.y + ((curr.y + next.y) / 2 - next.y) * smoothing
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.quadraticCurveTo(curr.x, curr.y, endX, endY)
      ctx.globalAlpha = age
      ctx.strokeStyle = color
      ctx.lineWidth = curr.width
      ctx.stroke()
    }
  }

  const draw = () => {
    const now = performance.now()
    ctx.clearRect(0, 0, size.width, size.height)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.globalCompositeOperation = blend

    for (const stroke of strokes) {
      if (decay > 0) {
        while (stroke.points.length > 0 && now - stroke.points[0].time > decay) {
          stroke.points.shift()
        }
      }
      drawStroke(stroke, now)
    }

    for (let index = strokes.length - 1; index >= 0; index--) {
      if (strokes[index].points.length === 0) {
        strokes.splice(index, 1)
      }
    }

    if (!props.paused) {
      frameId = requestAnimationFrame(draw)
    }
  }

  if (!props.paused) {
    frameId = requestAnimationFrame(draw)
  }

  teardown = () => {
    cancelAnimationFrame(frameId)
    frameId = 0
    resizeObserver.disconnect()
    container.removeEventListener('pointermove', handlePointerMove)
    container.removeEventListener('pointerleave', handlePointerLeave)
  }
}

// The renderer is started from a `watch` callback, which is not a setup context,
// so it cannot register lifecycle hooks itself. It publishes a disposer instead,
// and the single `onBeforeUnmount` below owns the teardown.
let teardown: (() => void) | null = null

// `isMounted` gates the whole effect upstream, and a mid-session change in
// pointer capability or reduced-motion preference must rebuild it.
watch(
  isMounted,
  (mounted) => {
    if (mounted) {
      startRenderer()
    }
    else {
      teardown?.()
      teardown = null
    }
  },
  { flush: 'post' },
)

onBeforeUnmount(() => {
  teardown?.()
  teardown = null
})

onMounted(() => {
  const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  isPointerCapable.value = mediaQuery.matches
  const handleChange = (event: MediaQueryListEvent) => {
    isPointerCapable.value = event.matches
  }
  mediaQuery.addEventListener('change', handleChange)
  onBeforeUnmount(() => mediaQuery.removeEventListener('change', handleChange))
})
</script>
