<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { useResolvedColor } from '../composables/useThemeColor'
import flowingStroke from '../theme/flowing-stroke'

/**
 * Named path a stroke can follow. Each one is generated from `width`, `height`
 * and `amplitude`, so it scales with the box rather than being clipped.
 */
export type FlowingStrokeShape = 'wave' | 'arc' | 'diagonal' | 'zigzag' | 'ring'

/** Which way the dashes travel along the path. */
export type FlowingStrokeDirection = 'forward' | 'reverse'

/** What sets the dashes moving: pointer entry, or a continuous loop. */
export type FlowingStrokeTrigger = 'hover' | 'loop'

export interface FlowingStrokeProps {
  /** Pixel width of the drawing surface. Drives the root size, the viewBox and the path. */
  width?: number
  /** Pixel height, used the same way as `width`. */
  height?: number
  /** Colour of the travelling dashes. A theme token (`'primary'`, …) or any CSS colour. */
  color?: string
  /**
   * Colour of the solid tube the dashes ride in. Defaults to a soft tint of
   * `color` (30% of it over transparency), so one colour prop styles both layers.
   */
  trackColor?: string
  /** Stroke width of the solid background tube. */
  ribbon?: number
  /** How much thinner the dash layer is than the tube, applied to each side. */
  stripeInset?: number
  /** Length of each dash, in pixels along the path. */
  dash?: number
  /** Gap between dashes. `dash + gap` is the period the travel offset wraps on. */
  gap?: number
  /** Multiplier on the base travel rate of 120px per second. */
  speed?: number
  /** Named path shape the dashes travel along. */
  shape?: FlowingStrokeShape
  /** Vertical scale of the curve: `0` is a flat line, `1` the designed shape, `2` exaggerated. */
  amplitude?: number
  /** Direction the dashes travel. */
  direction?: FlowingStrokeDirection
  /** Pointer entry, or a continuous loop. */
  trigger?: FlowingStrokeTrigger
  /** Emit a soft glow behind the dashes, in the flow colour. */
  glow?: boolean
  /** Extra CSS class on the wrapper. */
  class?: string
  /** Per-slot class overrides. */
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<FlowingStrokeProps>(), {
  width: 1200,
  height: 220,
  color: 'primary',
  trackColor: undefined,
  ribbon: 18,
  stripeInset: 4,
  dash: 34,
  gap: 22,
  speed: 1,
  shape: 'wave',
  amplitude: 1,
  direction: 'forward',
  trigger: 'hover',
  glow: false,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'flowingStroke',
  props,
  theme: flowingStroke,
})

/** Base travel rate in px/second; `speed` scales it. */
const BASE_SPEED = 120
/** How far past each edge the wave overshoots, so crests are not clipped. */
const EDGE = 40

const hovered = ref(false)
// the offset (px) the dash pattern is slid by. Kept bounded by the period.
const stripeOffset = ref(0)
let rafId: number | null = null

const totalDash = computed(() => Math.max(1, props.dash + props.gap))

const resolvedColor = useResolvedColor(() => props.color)
const resolvedTrackColor = useResolvedColor(() => props.trackColor)

/**
 * The rubber band the dashes ride in. When no `trackColor` is given it is a soft
 * tint of the flow colour, so a single `color` prop dresses both layers.
 */
const trackPaint = computed(() =>
  props.trackColor
    ? resolvedTrackColor.value
    : `color-mix(in oklab, ${resolvedColor.value} 30%, transparent)`,
)

/** The dash layer sits `stripeInset` inside the tube on both sides, never below 1px. */
const stripeWidth = computed(() => Math.max(1, props.ribbon - props.stripeInset * 2))

const glowBlur = computed(() => Math.max(4, props.ribbon * 0.6))

const stripeStyle = computed(() =>
  props.glow ? { filter: `drop-shadow(0 0 ${glowBlur.value}px ${resolvedColor.value})` } : undefined,
)

/**
 * A horizontal wave, built from one `base` line and control points lifted or
 * dropped by `amp`. At `amp = 1` this is the authored curve; `0` flattens it and
 * `2` doubles it.
 */
function buildWave(w: number, h: number, amp: number): string {
  const base = h * 0.68
  const y = (k: number) => base + (h * k - base) * amp
  return [
    `M ${-EDGE} ${base}`,
    `C ${w * 0.08} ${y(0.15)}, ${w * 0.18} ${y(1.05)}, ${w * 0.28} ${base}`,
    `S ${w * 0.48} ${y(0.25)}, ${w * 0.58} ${base}`,
    `S ${w * 0.78} ${y(0.96)}, ${w * 0.88} ${y(0.6)}`,
    `S ${w * 1.08} ${y(0.45)}, ${w + EDGE} ${base}`,
  ].join(' ')
}

/** A single arch that rises in the middle and lands back at the baseline. */
function buildArc(w: number, h: number, amp: number): string {
  const base = h * 0.5
  const peak = base - h * 0.45 * amp
  return `M ${-EDGE} ${base} C ${w * 0.22} ${peak}, ${w * 0.78} ${peak}, ${w + EDGE} ${base}`
}

/** A gentle rise from the lower-left to the upper-right. */
function buildDiagonal(w: number, h: number, amp: number): string {
  const startY = h * 0.8
  const endY = h * 0.2
  return `M ${-EDGE} ${startY} C ${w * 0.35} ${startY - h * 0.25 * amp}, ${w * 0.65} ${endY + h * 0.25 * amp}, ${w + EDGE} ${endY}`
}

/** Sharp alternating peaks — a straight-line path, no curves. */
function buildZigzag(w: number, h: number, amp: number): string {
  const segments = 6
  const top = h * 0.5 - h * 0.32 * amp
  const bottom = h * 0.5 + h * 0.32 * amp
  const step = (w + EDGE * 2) / segments
  const points = [`M ${-EDGE} ${bottom}`]
  for (let i = 1; i <= segments; i++) {
    const x = -EDGE + step * i
    points.push(`L ${Math.round(x * 100) / 100} ${i % 2 === 0 ? bottom : top}`)
  }
  return points.join(' ')
}

/** A closed ellipse the dashes orbit forever; `amplitude` scales its height. */
function buildRing(w: number, h: number, amp: number): string {
  const cx = w / 2
  const cy = h / 2
  const rx = Math.max(12, w / 2 - EDGE)
  const ry = Math.max(12, (h / 2 - 12) * amp)
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`
}

const path = computed(() => {
  const { width: w, height: h, amplitude } = props
  switch (props.shape) {
    case 'arc': return buildArc(w, h, amplitude)
    case 'diagonal': return buildDiagonal(w, h, amplitude)
    case 'zigzag': return buildZigzag(w, h, amplitude)
    case 'ring': return buildRing(w, h, amplitude)
    case 'wave':
    default: return buildWave(w, h, amplitude)
  }
})

function startLoop() {
  let lastTime = performance.now()
  function loop(now: number) {
    const dt = now - lastTime
    lastTime = now

    if (props.trigger === 'loop' || hovered.value) {
      const period = totalDash.value
      const direction = props.direction === 'reverse' ? -1 : 1
      const pxThisFrame = (BASE_SPEED * props.speed * dt) / 1000 * direction
      stripeOffset.value = (((stripeOffset.value + pxThisFrame) % period) + period) % period
    }
    rafId = requestAnimationFrame(loop)
  }
  rafId = requestAnimationFrame(loop)
}

onMounted(() => startLoop())
onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{ width: `${props.width}px`, height: `${props.height}px` }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <svg
      :width="props.width"
      :height="props.height"
      :viewBox="`0 0 ${props.width} ${props.height}`"
      :class="ui.svg({ class: uiProps.ui?.svg })"
      aria-hidden="true"
    >
      <!-- solid tube (background) -->
      <path
        :d="path"
        fill="none"
        :stroke="trackPaint"
        :stroke-width="props.ribbon"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- dash layer, same path slid by the dash offset -->
      <path
        :d="path"
        fill="none"
        :stroke="resolvedColor"
        :stroke-width="stripeWidth"
        stroke-linecap="butt"
        stroke-linejoin="round"
        :stroke-dasharray="`${props.dash} ${props.gap}`"
        :stroke-dashoffset="`${-stripeOffset}px`"
        :style="stripeStyle"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  </div>
</template>

<style scoped>
/* small accessibility/UX: if user prefers reduced motion we avoid updates */
@media (prefers-reduced-motion: reduce) {
  path[stroke-dasharray] {
    stroke-dashoffset: 0 !important;
  }
}
</style>
