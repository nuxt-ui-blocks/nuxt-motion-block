<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <svg
      v-if="ready"
      role="img"
      :aria-label="ariaLabel"
      :viewBox="`0 0 ${width} ${height}`"
      :class="ui.map({ class: uiProps.ui?.map })"
    >
      <circle
        v-for="dot in dots"
        :key="dot.key"
        :cx="dot.x"
        :cy="dot.y"
        :r="dotRadius"
        :fill="dotColor"
      />

      <g
        v-for="marker in markers"
        :key="marker.key"
      >
        <circle
          :cx="marker.x"
          :cy="marker.y"
          :r="marker.r"
          :fill="markerColor"
        />

        <g
          v-if="marker.pulse"
          pointer-events="none"
        >
          <circle
            :cx="marker.x"
            :cy="marker.y"
            :r="marker.r"
            fill="none"
            :stroke="markerColor"
            stroke-opacity="1"
            stroke-width="0.35"
          >
            <animate
              attributeName="r"
              :values="`${marker.r};${marker.r * 2.8}`"
              dur="1.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            :cx="marker.x"
            :cy="marker.y"
            :r="marker.r"
            fill="none"
            :stroke="markerColor"
            stroke-opacity="0.9"
            stroke-width="0.3"
          >
            <animate
              attributeName="r"
              :values="`${marker.r};${marker.r * 2.8}`"
              dur="1.4s"
              begin="0.7s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.9;0"
              dur="1.4s"
              begin="0.7s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        <slot
          name="marker"
          :marker="marker.data"
          :index="marker.index"
          :x="marker.x"
          :y="marker.y"
          :r="marker.r"
        />
      </g>
    </svg>

    <div
      v-else-if="missing"
      :class="ui.fallback({ class: uiProps.ui?.fallback })"
    >
      <slot name="fallback">
        <p class="font-medium text-highlighted">
          Dotted Map needs an optional package
        </p>
        <p>
          Install <code class="rounded bg-elevated px-1 py-0.5 text-xs">svg-dotted-map</code> to render it:
        </p>
        <code class="rounded bg-elevated px-2 py-1 text-xs">pnpm add svg-dotted-map</code>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import dottedMap from '../theme/dotted-map'

export interface DottedMapMarker {
  /** Latitude, in degrees. */
  lat: number
  /** Longitude, in degrees. */
  lng: number
  /** Radius of the marker. Falls back to `dotRadius`. */
  size?: number
  /** Per-marker pulse override. */
  pulse?: boolean
  [key: string]: unknown
}

export interface DottedMapProps {
  /** Accessible description of the map. */
  ariaLabel?: string
  /** Extra classes for the wrapper. */
  class?: string
  /** Colour of the map dots. */
  dotColor?: string
  /** Radius of the map dots, in viewBox units. */
  dotRadius?: number
  /** Height of the map, in viewBox units. */
  height?: number
  /** Samples used to trace the landmass. More samples give a denser map. */
  mapSamples?: number
  /** Colour of the markers and their pulse rings. */
  markerColor?: string
  /** Points to pin on the map. */
  markers?: DottedMapMarker[]
  /** Animate a marker once `pulse` is on, or per marker via `marker.pulse`. */
  pulse?: boolean
  /** Offset every other row by half a step so the dots read as a weave. */
  stagger?: boolean
  ui?: Record<string, any>
  /** Width of the map, in viewBox units. */
  width?: number
}

const props = withDefaults(defineProps<DottedMapProps>(), {
  ariaLabel: 'World map',
  class: undefined,
  dotColor: 'currentColor',
  dotRadius: 0.2,
  height: 75,
  mapSamples: 5000,
  markerColor: '#FF6900',
  markers: () => [],
  pulse: false,
  stagger: true,
  ui: undefined,
  width: 150,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'dottedMap', props, theme: dottedMap })

const shouldReduceMotion = useReducedMotion()

interface MapPoint {
  x: number
  y: number
}

interface PlacedMarker extends MapPoint {
  size?: number
  pulse?: boolean
  [key: string]: unknown
}

const ready = ref(false)
const missing = ref(false)
const points = ref<MapPoint[]>([])
const placed = ref<PlacedMarker[]>([])

let disposed = false
let createMap: ((options: { width: number, height: number, mapSamples: number }) => {
  points: MapPoint[]
  addMarkers: (markers: DottedMapMarker[]) => PlacedMarker[]
}) | null = null

/**
 * Row index of every distinct `y`, plus the smallest horizontal step between
 * two dots in the same row — the amount a staggered row is shifted by.
 */
const staggerGeometry = computed(() => {
  const sorted = [...points.value].sort((a, b) => a.y - b.y || a.x - b.x)
  const yToRowIndex = new Map<number, number>()
  let step = 0
  let prevY = Number.NaN
  let prevXInRow = Number.NaN

  for (const point of sorted) {
    if (point.y !== prevY) {
      prevY = point.y
      prevXInRow = Number.NaN
      if (!yToRowIndex.has(point.y)) {
        yToRowIndex.set(point.y, yToRowIndex.size)
      }
    }
    if (!Number.isNaN(prevXInRow)) {
      const delta = point.x - prevXInRow
      if (delta > 0) {
        step = step === 0 ? delta : Math.min(step, delta)
      }
    }
    prevXInRow = point.x
  }

  return { xStep: step || 1, yToRowIndex }
})

const offsetXFor = (y: number) => {
  if (!props.stagger) {
    return 0
  }
  const { xStep, yToRowIndex } = staggerGeometry.value
  const rowIndex = yToRowIndex.get(y) ?? 0
  return rowIndex % 2 === 1 ? xStep / 2 : 0
}

const dots = computed(() => points.value.map((point, index) => ({
  key: `${point.x}-${point.y}-${index}`,
  x: point.x + offsetXFor(point.y),
  y: point.y,
})))

const markers = computed(() => placed.value.map((marker, index) => {
  const x = marker.x + offsetXFor(marker.y)
  const y = marker.y
  const r = marker.size ?? props.dotRadius
  // A global `pulse` lights up every marker unless it opts out; otherwise only
  // markers that ask for it animate.
  const pulse = shouldReduceMotion.value
    ? false
    : props.pulse
      ? marker.pulse !== false
      : marker.pulse === true

  return {
    key: `${marker.x}-${marker.y}-${index}`,
    index,
    x,
    y,
    r,
    pulse,
    data: { ...marker, x, y },
  }
}))

const rebuild = () => {
  if (!createMap) {
    return
  }
  const map = createMap({ width: props.width, height: props.height, mapSamples: props.mapSamples })
  points.value = map.points
  placed.value = map.addMarkers(props.markers)
}

/**
 * `svg-dotted-map` is an optional peer: it is only pulled in on mount, and a
 * missing install is caught here so the fallback can take over instead of
 * breaking the page.
 */
const loadCreateMap = async () => {
  try {
    // @ts-ignore - optional peer dependency, installed by the consumer
    const module = await import('svg-dotted-map')

    return typeof module?.createMap === 'function' ? module.createMap : null
  }
  catch {
    return null
  }
}

onMounted(async () => {
  createMap = await loadCreateMap()
  if (disposed) {
    return
  }
  if (!createMap) {
    missing.value = true
    return
  }

  rebuild()
  ready.value = true
})

onBeforeUnmount(() => {
  disposed = true
})

watch(() => [props.width, props.height, props.mapSamples], rebuild)

watch(() => props.markers, rebuild, { deep: true })
</script>
