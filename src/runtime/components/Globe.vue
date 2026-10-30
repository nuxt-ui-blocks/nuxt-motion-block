<template>
  <div
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <canvas
      v-show="ready"
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
    <div
      v-if="missing"
      :class="ui.fallback({ class: uiProps.ui?.fallback })"
    >
      <slot name="fallback">
        <p class="font-medium text-highlighted">
          Globe needs two optional packages
        </p>
        <p>
          Install <code class="rounded bg-elevated px-1 py-0.5 text-xs">three</code> and
          <code class="rounded bg-elevated px-1 py-0.5 text-xs">three-globe</code> to render it:
        </p>
        <code class="rounded bg-elevated px-2 py-1 text-xs">pnpm add three three-globe</code>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import globeTheme from '../theme/globe'

export interface GlobePoint {
  /** Latitude, in degrees. */
  lat: number
  /** Longitude, in degrees. */
  lng: number
  /** Optional label, handed to the point accessor untouched. */
  label?: string
  /** Height of the marker above the surface, `0` to `1`. */
  size?: number
}

export interface GlobeProps {
  /** Accessible description of the canvas. */
  ariaLabel?: string
  /** Thickness of the atmosphere glow, relative to the globe radius. */
  atmosphereAltitude?: number
  /** Colour of the atmosphere glow. */
  atmosphereColor?: string
  /** Turn the globe on its own. Dragging pauses it while the pointer is down. */
  autoRotate?: boolean
  /** Image used as the bump map. Defaults to a topology texture on unpkg. */
  bumpImageUrl?: string
  /** Extra classes for the container. */
  class?: string
  /** Markers to pin on the globe. */
  data?: GlobePoint[]
  /** Image wrapped around the globe. Defaults to a blue marble texture on unpkg. */
  globeImageUrl?: string
  /** Colour of every marker. */
  pointColor?: string
  /** Radians per second the globe turns on its own. */
  rotateSpeed?: number
  /** Draw the latitude and longitude grid. */
  showAtmosphere?: boolean
  /** Draw the graticule lines. */
  showGraticules?: boolean
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<GlobeProps>(), {
  ariaLabel: 'Interactive globe',
  atmosphereAltitude: 0.15,
  atmosphereColor: '#3a228a',
  autoRotate: true,
  bumpImageUrl: 'https://unpkg.com/three-globe/example/img/earth-topology.png',
  class: undefined,
  data: () => [],
  globeImageUrl: 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
  pointColor: '#ffffff',
  rotateSpeed: 0.35,
  showAtmosphere: true,
  showGraticules: false,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'globe', props, theme: globeTheme })

const CAMERA_DISTANCE = 340
/** The globe never tips past this, so it cannot roll over its poles. */
const MAX_TILT = 0.6
const DRAG_SPEED = 0.005

const shouldReduceMotion = useReducedMotion()

const rootRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)
const missing = ref(false)

const drag = { active: false, x: 0, y: 0 }

let three: any
let renderer: any
let scene: any
let camera: any
let globe: any
let frameId = 0
let lastFrame = 0
let visible = true
let disposed = false
let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined

/**
 * `three` and `three-globe` are optional peers: they are only pulled in when
 * the component actually mounts, and a missing install is caught here so the
 * fallback can take over instead of breaking the page.
 */
const loadModules = async () => {
  try {
    // @ts-ignore - optional peer dependency, installed by the consumer
    const threeModule = await import('three')
    // @ts-ignore - optional peer dependency, installed by the consumer
    const globeModule = await import('three-globe')

    // A partial or stubbed install is treated as missing.
    if (!threeModule?.WebGLRenderer || !globeModule?.default) {
      return null
    }

    return {
      three: threeModule,
      ThreeGlobe: globeModule.default,
    }
  }
  catch {
    return null
  }
}

const toPoints = () => props.data.map(point => ({
  ...point,
  size: point.size ?? 0.01,
}))

const render = () => {
  if (!renderer || !scene || !camera) {
    return
  }
  renderer.render(scene, camera)
}

const resize = () => {
  const root = rootRef.value
  if (!root || !renderer || !camera) {
    return
  }

  const rect = root.getBoundingClientRect()
  const width = Math.max(1, rect.width)
  const height = Math.max(1, rect.height)

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height, false)
  render()
}

const tick = (time: number) => {
  frameId = requestAnimationFrame(tick)

  const elapsed = lastFrame ? Math.min(time - lastFrame, 64) / 1000 : 0
  lastFrame = time

  if (!visible || !globe) {
    return
  }

  if (props.autoRotate && !drag.active && !shouldReduceMotion.value) {
    globe.rotation.y += props.rotateSpeed * elapsed
  }

  render()
}

const onPointerDown = (event: PointerEvent) => {
  drag.active = true
  drag.x = event.clientX
  drag.y = event.clientY
  canvasRef.value?.setPointerCapture(event.pointerId)
}

const onPointerMove = (event: PointerEvent) => {
  if (!drag.active || !globe) {
    return
  }

  globe.rotation.y += (event.clientX - drag.x) * DRAG_SPEED
  globe.rotation.x = Math.max(
    -MAX_TILT,
    Math.min(MAX_TILT, globe.rotation.x + (event.clientY - drag.y) * DRAG_SPEED),
  )
  drag.x = event.clientX
  drag.y = event.clientY
  render()
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

onMounted(async () => {
  const modules = await loadModules()
  if (disposed) {
    return
  }
  if (!modules) {
    missing.value = true
    return
  }

  const canvas = canvasRef.value
  if (!canvas) {
    return
  }

  three = modules.three
  renderer = new three.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

  scene = new three.Scene()
  camera = new three.PerspectiveCamera(50, 1, 0.1, 2000)
  camera.position.z = CAMERA_DISTANCE

  globe = new modules.ThreeGlobe()
    .globeImageUrl(props.globeImageUrl)
    .bumpImageUrl(props.bumpImageUrl)
    .showAtmosphere(props.showAtmosphere)
    .atmosphereColor(props.atmosphereColor)
    .atmosphereAltitude(props.atmosphereAltitude)
    .showGraticules(props.showGraticules)
    .pointsData(toPoints())
    .pointAltitude((point: GlobePoint) => point.size ?? 0.01)
    .pointRadius(0.18)
    .pointColor(() => props.pointColor)

  scene.add(globe)

  const ambient = new three.AmbientLight(0xCCCCCC, Math.PI)
  const key = new three.DirectionalLight(0xFFFFFF, Math.PI * 0.6)
  key.position.set(1, 1, 1)
  scene.add(ambient, key)

  ready.value = true
  resize()
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
  renderer?.dispose()
})

watch(() => props.data, () => {
  globe?.pointsData(toPoints())
  render()
}, { deep: true })

watch(
  () => [
    props.globeImageUrl,
    props.bumpImageUrl,
    props.showAtmosphere,
    props.atmosphereColor,
    props.atmosphereAltitude,
    props.showGraticules,
  ],
  () => {
    if (!globe) {
      return
    }
    globe
      .globeImageUrl(props.globeImageUrl)
      .bumpImageUrl(props.bumpImageUrl)
      .showAtmosphere(props.showAtmosphere)
      .atmosphereColor(props.atmosphereColor)
      .atmosphereAltitude(props.atmosphereAltitude)
      .showGraticules(props.showGraticules)
    render()
  },
)

watch(() => props.pointColor, () => {
  globe?.pointColor(() => props.pointColor)
  render()
})
</script>
