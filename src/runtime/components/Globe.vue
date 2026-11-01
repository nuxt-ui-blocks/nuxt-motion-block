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
      :style="{ opacity: ready ? 1 : 0 }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerUp"
    />
    <div
      v-if="missing"
      :class="ui.fallback({ class: uiProps.ui?.fallback })"
    >
      <slot name="fallback">
        <p class="font-medium text-highlighted">
          Globe needs an optional package
        </p>
        <p>
          Install <code class="rounded bg-elevated px-1 py-0.5 text-xs">cobe</code> to render it:
        </p>
        <code class="rounded bg-elevated px-2 py-1 text-xs">pnpm add cobe</code>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useMotionValue, useReducedMotion, useSpring } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import globeTheme from '../theme/globe'

type RGB = [number, number, number]

export interface GlobePoint {
  /** Latitude, in degrees. */
  lat: number
  /** Longitude, in degrees. */
  lng: number
  /** Optional label, used as the marker's stable id. */
  label?: string
  /** Radius of the marker, `0` to `1`. */
  size?: number
  /** Override the marker colour for this point. */
  color?: RGB
}

/** A point on the sphere, either as `[lat, lng]` or as an object. */
export type GlobeCoordinate = [number, number] | { lat: number, lng: number }

export interface GlobeArc {
  /** Where the arc starts. */
  from: GlobeCoordinate
  /** Where the arc ends. */
  to: GlobeCoordinate
  /** Override the arc colour for this arc. */
  color?: RGB
  /** Stable id, also exposed as the `--cobe-arc-{id}` CSS anchor. */
  id?: string
}

export interface GlobeProps {
  /** Colour of the arcs, as `[r, g, b]` from `0` to `1`. */
  arcColor?: RGB
  /** Thickness of the arcs above the surface. */
  arcHeight?: number
  /** Great-circle arcs drawn between two coordinates. */
  arcs?: GlobeArc[]
  /** Width of the arcs. */
  arcWidth?: number
  /** Accessible description of the canvas. */
  ariaLabel?: string
  /** Turn the globe on its own. Dragging pauses it while the pointer is down. */
  autoRotate?: boolean
  /** Colour of the landmass. */
  baseColor?: RGB
  /** Extra classes for the container. */
  class?: string
  /** `0` renders a light globe, `1` a dark one. */
  dark?: number
  /** Markers to pin on the globe. */
  data?: GlobePoint[]
  /** Pixel ratio of the render target. Higher is sharper and slower. */
  devicePixelRatio?: number
  /** Sharpness of the light falling across the sphere. */
  diffuse?: number
  /** Colour of the atmosphere glow around the rim. */
  glowColor?: RGB
  /** Brightness of the flat base layer beneath the landmass texture. */
  mapBaseBrightness?: number
  /** Brightness of the landmass texture. */
  mapBrightness?: number
  /** Number of samples used to build the landmass texture. */
  mapSamples?: number
  /** Height of every marker above the surface. */
  markerElevation?: number
  /** Colour of the markers. */
  markerColor?: RGB
  /** Shift of the sphere inside the canvas, in fractions of its size. */
  offset?: [number, number]
  /** Opacity of the whole globe. */
  opacity?: number
  /** Starting rotation around the vertical axis, in radians. */
  phi?: number
  /** Radians per second the globe turns on its own. */
  rotateSpeed?: number
  /** Scale of the sphere inside the canvas. */
  scale?: number
  /** Tilt of the globe, in radians. `0.3` looks slightly down on it. */
  theta?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<GlobeProps>(), {
  arcColor: () => [0.3, 0.6, 1] as RGB,
  arcHeight: 0.2,
  arcs: () => [],
  arcWidth: 1,
  ariaLabel: 'Interactive globe',
  autoRotate: true,
  baseColor: () => [1, 1, 1] as RGB,
  class: undefined,
  dark: 0,
  data: () => [],
  devicePixelRatio: 2,
  diffuse: 0.4,
  glowColor: () => [1, 1, 1] as RGB,
  mapBaseBrightness: 0,
  mapBrightness: 1.2,
  mapSamples: 16000,
  markerElevation: 0.05,
  markerColor: () => [251 / 255, 100 / 255, 21 / 255] as RGB,
  offset: () => [0, 0] as [number, number],
  opacity: 1,
  phi: 0,
  rotateSpeed: 0.3,
  scale: 1,
  theta: 0.3,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'globe', props, theme: globeTheme })

/** Damping applied to every dragged pixel before it is added to `phi`. */
const MOVEMENT_DAMPING = 1400
/** cobe renders at twice the CSS size, so the canvas stays crisp on retina screens. */
const PIXEL_SCALE = 2

const shouldReduceMotion = useReducedMotion()

const rootRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)
const missing = ref(false)

/**
 * `phi` accumulates outside Vue's reactivity: it changes every frame, and the
 * render loop reads it directly rather than through a watcher.
 */
let phi = props.phi
/** CSS width of the square canvas. */
let cssSize = 0
let cobe: any = null
let frameId = 0
let lastFrame = 0
let visible = true
let disposed = false
let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined

let dragX: number | null = null
const movement = useMotionValue(0)
const movementSpring = useSpring(movement, {
  mass: 1,
  damping: 30,
  stiffness: 100,
})

const toCoordinate = (value: GlobeCoordinate): [number, number] =>
  Array.isArray(value) ? value : [value.lat, value.lng]

const toMarkers = () => props.data.map((point, index) => ({
  location: [point.lat, point.lng] as [number, number],
  size: point.size ?? 0.05,
  color: point.color,
  id: point.label ?? `marker-${index}`,
}))

const toArcs = () => props.arcs.map((arc, index) => ({
  from: toCoordinate(arc.from),
  to: toCoordinate(arc.to),
  color: arc.color,
  id: arc.id ?? `arc-${index}`,
}))

const render = () => {
  if (!cobe || !cssSize) {
    return
  }
  cobe.update({
    phi: phi + movementSpring.get(),
    theta: props.theta,
  })
}

const resize = () => {
  const root = rootRef.value
  if (!root) {
    return
  }

  const next = Math.max(1, root.getBoundingClientRect().width)
  if (next === cssSize) {
    return
  }
  cssSize = next

  // cobe only resizes the backing store when it is handed a new width.
  cobe?.update({
    width: cssSize * PIXEL_SCALE,
    height: cssSize * PIXEL_SCALE,
  })
}

const tick = (time: number) => {
  frameId = requestAnimationFrame(tick)

  const elapsed = lastFrame ? Math.min(time - lastFrame, 64) / 1000 : 0
  lastFrame = time

  if (!cobe || !visible) {
    return
  }

  if (props.autoRotate && dragX === null && !shouldReduceMotion.value) {
    phi += props.rotateSpeed * elapsed
  }

  render()
}

const onPointerDown = (event: PointerEvent) => {
  dragX = event.clientX
  canvasRef.value?.setPointerCapture(event.pointerId)
}

const onPointerMove = (event: PointerEvent) => {
  if (dragX === null) {
    return
  }

  const delta = event.clientX - dragX
  dragX = event.clientX
  movement.set(movement.get() + delta / MOVEMENT_DAMPING)
}

const onPointerUp = (event?: PointerEvent) => {
  if (dragX === null) {
    return
  }
  dragX = null
  if (event && canvasRef.value?.hasPointerCapture(event.pointerId)) {
    canvasRef.value.releasePointerCapture(event.pointerId)
  }
}

/**
 * `cobe` is an optional peer: it is only pulled in when the component mounts,
 * and a missing install is caught here so the fallback can take over instead of
 * breaking the page.
 */
const loadCobe = async () => {
  try {
    // @ts-ignore - optional peer dependency, installed by the consumer
    const module = await import('cobe')

    // A partial or stubbed install is treated as missing.
    if (!module?.default) {
      return null
    }

    return module.default
  }
  catch {
    return null
  }
}

onMounted(async () => {
  const createGlobe = await loadCobe()
  if (disposed) {
    return
  }
  if (!createGlobe) {
    missing.value = true
    return
  }

  const canvas = canvasRef.value
  if (!canvas) {
    return
  }

  resize()

  cobe = createGlobe(canvas, {
    width: Math.max(1, cssSize) * PIXEL_SCALE,
    height: Math.max(1, cssSize) * PIXEL_SCALE,
    devicePixelRatio: props.devicePixelRatio,
    phi: phi,
    theta: props.theta,
    dark: props.dark,
    diffuse: props.diffuse,
    mapSamples: props.mapSamples,
    mapBrightness: props.mapBrightness,
    mapBaseBrightness: props.mapBaseBrightness,
    baseColor: props.baseColor,
    markerColor: props.markerColor,
    glowColor: props.glowColor,
    markerElevation: props.markerElevation,
    opacity: props.opacity,
    offset: props.offset,
    scale: props.scale,
    markers: toMarkers(),
    arcs: toArcs(),
    arcColor: props.arcColor,
    arcWidth: props.arcWidth,
    arcHeight: props.arcHeight,
  })

  ready.value = true
  frameId = requestAnimationFrame(tick)

  resizeObserver = new ResizeObserver(resize)
  if (rootRef.value) {
    resizeObserver.observe(rootRef.value)
  }

  // Nothing to render while the globe is off screen.
  intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries.some(entry => entry.isIntersecting)
  })
  if (rootRef.value) {
    intersectionObserver.observe(rootRef.value)
  }
})

onBeforeUnmount(() => {
  disposed = true
  if (frameId) {
    cancelAnimationFrame(frameId)
  }
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  cobe?.destroy()
  cobe = null
})

watch(() => props.data, () => {
  cobe?.update({ markers: toMarkers() })
  render()
}, { deep: true })

watch(() => props.arcs, () => {
  cobe?.update({ arcs: toArcs() })
  render()
}, { deep: true })

watch(
  () => [
    props.theta,
    props.dark,
    props.diffuse,
    props.mapSamples,
    props.mapBrightness,
    props.mapBaseBrightness,
    props.baseColor,
    props.markerColor,
    props.glowColor,
    props.markerElevation,
    props.arcColor,
    props.arcWidth,
    props.arcHeight,
    props.offset,
    props.opacity,
    props.scale,
  ],
  () => {
    cobe?.update({
      theta: props.theta,
      dark: props.dark,
      diffuse: props.diffuse,
      mapSamples: props.mapSamples,
      mapBrightness: props.mapBrightness,
      mapBaseBrightness: props.mapBaseBrightness,
      baseColor: props.baseColor,
      markerColor: props.markerColor,
      glowColor: props.glowColor,
      markerElevation: props.markerElevation,
      arcColor: props.arcColor,
      arcWidth: props.arcWidth,
      arcHeight: props.arcHeight,
      offset: props.offset,
      opacity: props.opacity,
      scale: props.scale,
    })
    render()
  },
  { deep: true },
)

watch(() => props.phi, (value) => {
  phi = value
  render()
})
</script>
