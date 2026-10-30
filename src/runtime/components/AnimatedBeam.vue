<template>
  <svg
    aria-hidden="true"
    :class="ui.svg({ class: uiProps.ui?.svg })"
    :width="canvas.width"
    :height="canvas.height"
    :viewBox="`0 0 ${canvas.width} ${canvas.height}`"
    fill="none"
  >
    <defs>
      <linearGradient
        :id="gradientId"
        gradientUnits="userSpaceOnUse"
        :x1="geometry.sx"
        :y1="geometry.sy"
        :x2="geometry.ex"
        :y2="geometry.ey"
      >
        <stop
          offset="0%"
          :stop-color="gradientStartColor"
          stop-opacity="0"
        />
        <stop
          offset="100%"
          :stop-color="gradientStopColor"
        />
      </linearGradient>
    </defs>

    <path
      v-if="pathD"
      ref="basePathRef"
      :d="pathD"
      :stroke="pathColor"
      :stroke-width="pathWidth"
      :stroke-opacity="pathOpacity"
      stroke-linecap="round"
    />

    <path
      v-if="pathD && isTravelling"
      class="beam"
      :d="pathD"
      :stroke="`url(#${gradientId})`"
      :stroke-width="pathWidth"
      stroke-linecap="round"
      pathLength="1"
      :stroke-dasharray="dashArray"
      :style="beamStyle"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, useId, watch } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedBeam from '../theme/animated-beam'

export interface AnimatedBeamProps {
  /** Extra classes for the `<svg>` overlay. */
  class?: string
  /** The positioned element the beam is drawn inside. */
  containerRef?: HTMLElement | null
  /** How far the curve bows away from the straight line, in pixels. */
  curvature?: number
  /** Seconds to wait before the first sweep. */
  delay?: number
  /** Seconds for one sweep. */
  duration?: number
  /** Nudge the end point along the x axis. */
  endXOffset?: number
  /** Nudge the end point along the y axis. */
  endYOffset?: number
  /** The element the beam leaves from. */
  fromRef?: HTMLElement | null
  /** Colour the travelling gradient starts from, at zero opacity. */
  gradientStartColor?: string
  /** Colour the travelling gradient fades up to. */
  gradientStopColor?: string
  /** Colour of the static path the beam rides along. */
  pathColor?: string
  /** Opacity of the static path. */
  pathOpacity?: number
  /** Thickness of both the path and the beam, in pixels. */
  pathWidth?: number
  /** Sweep back towards `fromRef`. */
  reverse?: boolean
  /** Arc length of the travelling beam, in pixels. */
  size?: number
  /** Nudge the start point along the x axis. */
  startXOffset?: number
  /** Nudge the start point along the y axis. */
  startYOffset?: number
  /** The element the beam arrives at. */
  toRef?: HTMLElement | null
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<AnimatedBeamProps>(), {
  class: undefined,
  containerRef: null,
  curvature: 0,
  delay: 0,
  duration: 4,
  endXOffset: 0,
  endYOffset: 0,
  fromRef: null,
  gradientStartColor: 'var(--ui-primary)',
  gradientStopColor: 'var(--ui-secondary)',
  pathColor: 'var(--ui-border)',
  pathOpacity: 1,
  pathWidth: 2,
  reverse: false,
  size: 72,
  startXOffset: 0,
  startYOffset: 0,
  toRef: null,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'animatedBeam', props, theme: animatedBeam })

const shouldReduceMotion = useReducedMotion()
// `useId` keeps the gradient id stable between the server render and hydration.
const gradientId = `beam-${useId()}`

const HALF = 0.5
const MIN_BEAM_FRACTION = 0.05
const MAX_BEAM_FRACTION = 0.9
/** Keeps the curve from degenerating when both refs share a centre. */
const MIN_SEGMENT = 1

const canvas = reactive({ width: 0, height: 0 })
const geometry = reactive({ sx: 0, sy: 0, ex: 0, ey: 0 })
const pathLength = ref(0)
const pathD = ref('')
const basePathRef = ref<SVGPathElement | null>(null)

const isTravelling = computed(
  () => !shouldReduceMotion.value && pathLength.value > 0 && canvas.width > 0,
)

const beamFraction = computed(() =>
  Math.min(
    MAX_BEAM_FRACTION,
    Math.max(MIN_BEAM_FRACTION, props.size / Math.max(pathLength.value, MIN_SEGMENT)),
  ),
)

const dashArray = computed(() => `${beamFraction.value} ${1 - beamFraction.value}`)

/**
 * A dash on a path normalised to `pathLength={1}` sits at `[-offset, -offset +
 * length]`. Starting at offset `0` puts it at the head of the path, and ending
 * at `length - 1` carries it all the way to the far end.
 */
const beamStyle = computed(() => {
  const fraction = beamFraction.value
  const start = props.reverse ? fraction - 1 : 0
  const end = props.reverse ? 0 : fraction - 1

  return {
    '--beam-from': start.toFixed(4),
    '--beam-to': end.toFixed(4),
    'animation-duration': `${Math.max(props.duration, 0.1)}s`,
    'animation-delay': `${Math.max(props.delay, 0)}s`,
  }
})

const measure = () => {
  const container = props.containerRef
  const from = props.fromRef
  const to = props.toRef
  if (!container || !from || !to) {
    return
  }

  const containerRect = container.getBoundingClientRect()
  const fromRect = from.getBoundingClientRect()
  const toRect = to.getBoundingClientRect()

  canvas.width = containerRect.width
  canvas.height = containerRect.height

  geometry.sx = fromRect.left - containerRect.left + fromRect.width * HALF + props.startXOffset
  geometry.sy = fromRect.top - containerRect.top + fromRect.height * HALF + props.startYOffset
  geometry.ex = toRect.left - containerRect.left + toRect.width * HALF + props.endXOffset
  geometry.ey = toRect.top - containerRect.top + toRect.height * HALF + props.endYOffset

  const dx = geometry.ex - geometry.sx
  const dy = geometry.ey - geometry.sy

  if (!props.curvature) {
    pathD.value = `M ${geometry.sx} ${geometry.sy} L ${geometry.ex} ${geometry.ey}`
    return
  }

  // Bow along the perpendicular rather than a fixed axis, so a vertical beam
  // curves sideways and a diagonal one curves diagonally.
  const segment = Math.hypot(dx, dy) || MIN_SEGMENT
  const normalX = -dy / segment
  const normalY = dx / segment
  const controlX = (geometry.sx + geometry.ex) * HALF + normalX * props.curvature
  const controlY = (geometry.sy + geometry.ey) * HALF + normalY * props.curvature

  pathD.value = `M ${geometry.sx} ${geometry.sy} Q ${controlX} ${controlY} ${geometry.ex} ${geometry.ey}`
}

/**
 * The comet's arc length is authored in pixels, so it needs the real length of
 * the current outline before it can be normalised to path units.
 */
const syncPathLength = async () => {
  await nextTick()
  const path = basePathRef.value
  pathLength.value = path ? path.getTotalLength() : 0
}

let resizeObserver: ResizeObserver | undefined
let frameId = 0

const remeasure = () => {
  measure()
  syncPathLength()
}

onMounted(() => {
  remeasure()

  // The refs are usually sized by the parent's flex/grid rules, which are not
  // final on the first paint.
  frameId = requestAnimationFrame(remeasure)

  resizeObserver = new ResizeObserver(remeasure)
  if (props.containerRef) {
    resizeObserver.observe(props.containerRef)
  }
  if (props.fromRef) {
    resizeObserver.observe(props.fromRef)
  }
  if (props.toRef) {
    resizeObserver.observe(props.toRef)
  }

  window.addEventListener('resize', remeasure)
})

onBeforeUnmount(() => {
  if (frameId) {
    cancelAnimationFrame(frameId)
  }
  resizeObserver?.disconnect()
  window.removeEventListener('resize', remeasure)
})

watch(
  () => [
    props.containerRef,
    props.fromRef,
    props.toRef,
    props.curvature,
    props.startXOffset,
    props.startYOffset,
    props.endXOffset,
    props.endYOffset,
  ],
  remeasure,
  { flush: 'post' },
)
</script>

<style scoped>
.beam {
  animation-name: m-beam-sweep;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  animation-iteration-count: infinite;
  stroke-dashoffset: var(--beam-from);
}

@keyframes m-beam-sweep {
  0% {
    stroke-dashoffset: var(--beam-from);
    opacity: 0;
  }

  12% {
    opacity: 1;
  }

  88% {
    opacity: 1;
  }

  100% {
    stroke-dashoffset: var(--beam-to);
    opacity: 0;
  }
}
</style>
