<template>
  <Motion
    ref="root"
    class="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.17_0.015_274)] shadow-lg"
    :class="props.class"
    :style="rootStyle"
    @pointerenter="onPointerEnter"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div class="relative h-full">
      <!--
        DOM order is what decides which surface the foil blends with, so the
        sheet is placed before or after the content rather than being lifted
        with `z-index`. Giving any layer a z-index would make it a stacking
        context of its own, and the blend would then apply to that context
        instead of to the artwork underneath — which is the difference between
        "the artwork catches the light" and "a text scrim stays opaque".
      -->
      <HolographicFoilSheet
        v-if="!props.foilOver"
        :material="material"
        :x="foilX"
        :y="foilY"
        :filter="foilFilter"
        :live="isLive"
        :opacity="foilOpacity"
      />

      <div class="relative h-full">
        <slot />
      </div>

      <HolographicFoilSheet
        v-if="props.foilOver"
        :material="material"
        :x="foilX"
        :y="foilY"
        :filter="foilFilter"
        :live="isLive"
        :opacity="foilOpacity"
      />

      <!--
        The outer div clips the sweep to the card's own rounded corners; without
        `rounded-[inherit]` the sheen would square off the border radius.
      -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        <Motion
          class="absolute inset-0"
          :style="{ x: isLive ? sheenX : 0 }"
        >
          <Motion
            class="absolute inset-y-0 left-0 w-2/3"
            :animate="isLive ? sheenSweep : undefined"
            :transition="sheenTransition"
            :style="sheenStyle"
          />
        </Motion>
      </div>

      <Motion
        aria-hidden="true"
        class="pointer-events-none absolute"
        :style="glareStyle"
      />
    </div>

    <UButton
      v-if="showPermissionButton"
      type="button"
      size="xs"
      variant="solid"
      class="absolute bottom-3 right-3 !bg-white/90 !text-neutral-900 hover:!bg-white"
      @click="requestOrientation"
    >
      Enable tilt
    </UButton>
  </Motion>
</template>

<script setup lang="ts">
import {
  Motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { SPRING_TILT } from '../../utils/motion-tokens'
import {
  AXIS_MAX,
  AXIS_MIN,
  FOIL_CONTRAST_GAIN,
  FOIL_DRIFT,
  FOIL_MAX_OPACITY,
  FOIL_MIN_CONTRAST,
  FOIL_MIN_OPACITY,
  FOIL_MIN_SATURATION,
  FOIL_SATURATION_GAIN,
  GLARE_DRIFT,
  GLARE_GRADIENT,
  GLARE_OPACITY_RATIO,
  HOVER_QUERY,
  LINEAR_EASE,
  MATERIALS,
  MAX_TILT_DEG,
  MIN_SHEEN_SPEED,
  ORIENTATION_RANGE_DEG,
  PERSPECTIVE_PX,
  SHEEN_BASE_DURATION_S,
  SHEEN_DRIFT,
  SHEEN_EDGE_FADE,
  SHEEN_FROM,
  SHEEN_GRADIENT,
  SHEEN_OPACITY_RATIO,
  SHEEN_TO,
  clamp01,
  clampAxis,
} from './constants'
import HolographicFoilSheet from './HolographicFoilSheet.vue'

/**
 * Props for `MHolographicFoil`.
 *
 * Declared inline rather than imported: `defineProps` has to expand the type to
 * emit runtime props, and when that type comes from another file the SFC
 * compiler needs filesystem access to resolve it — which the dev server's
 * browser-side compile path cannot provide. `pattern` is a literal union
 * rather than an imported alias for the same reason; `MATERIALS` is keyed by
 * the identical union, so `test:types` still catches the two drifting apart.
 */
export interface HolographicFoilProps {
  /** Classes merged onto the card root. */
  class?: string
  /** Blend the foil over the content instead of under it. */
  foilOver?: boolean
  /** Strength of the white specular blob, 0..1. */
  glare?: number
  /** Strength of the foil, the sheen and the glare together, 0..1. */
  intensity?: number
  /** Which foil material to paint. */
  pattern?: 'aurora' | 'gold' | 'oil' | 'prism'
  /** Multiplier on the sheen sweep rate. */
  sheenSpeed?: number
  /** Tilt the card toward the pointer. */
  tilt?: boolean
  /** Tilt with device orientation instead, behind a permission prompt. */
  useDeviceOrientation?: boolean
}

const props = withDefaults(defineProps<HolographicFoilProps>(), {
  foilOver: false,
  glare: 0.5,
  intensity: 0.6,
  pattern: 'prism',
  sheenSpeed: 1,
  tilt: true,
  useDeviceOrientation: false,
})

const root = ref<HTMLElement | { $el?: HTMLElement } | null>(null)
const reducedMotion = useReducedMotion()

/**
 * `<Motion>` is a component, so `ref` resolves to the component instance and
 * not to the element — the rect has to be read off `$el`. Everything below
 * needs a real node, so the unwrapping happens once, here.
 */
function rootElement(): HTMLElement | null {
  const candidate = root.value
  if (candidate instanceof HTMLElement) return candidate
  return candidate?.$el instanceof HTMLElement ? candidate.$el : null
}

const material = computed(() => MATERIALS[props.pattern])

// ---------------------------------------------------------------- pointer axis

const pointerX = useMotionValue(0)
const pointerY = useMotionValue(0)
const springX = useSpring(pointerX, SPRING_TILT)
const springY = useSpring(pointerY, SPRING_TILT)

/** Normalises a sprung axis value onto 0..1, clamping spring overshoot. */
function axisProgress(value: number) {
  return clamp01((value - AXIS_MIN) / (AXIS_MAX - AXIS_MIN))
}

// ------------------------------------------------------------ derived motion

const rotateX = useTransform<number, number>(
  springY,
  value => (axisProgress(value) * 2 - 1) * -MAX_TILT_DEG,
)
const rotateY = useTransform<number, number>(
  springX,
  value => (axisProgress(value) * 2 - 1) * MAX_TILT_DEG,
)

const foilX = useTransform<number, string>(springX, value => `${(axisProgress(value) * 2 - 1) * FOIL_DRIFT}%`)
const foilY = useTransform<number, string>(springY, value => `${(axisProgress(value) * 2 - 1) * FOIL_DRIFT}%`)
const glareX = useTransform<number, string>(springX, value => `${(axisProgress(value) * 2 - 1) * GLARE_DRIFT}%`)
const glareY = useTransform<number, string>(springY, value => `${(axisProgress(value) * 2 - 1) * GLARE_DRIFT}%`)
const sheenX = useTransform<number, string>(springX, value => `${(axisProgress(value) * 2 - 1) * SHEEN_DRIFT}%`)

/**
 * The hue range is fed in as a motion value rather than read inside the
 * transformer. A transform only re-runs when one of its *inputs* changes, so a
 * captured range would leave a newly selected pattern painting with the old
 * pattern's swing until the pointer next moved.
 */
const hueRange = useMotionValue(material.value.hueRange)
const hueDeg = useTransform<number, number>(
  [springX, hueRange],
  ([x, range]) => (axisProgress(x) * 2 - 1) * range,
)

watch(material, next => hueRange.set(next.hueRange))

// `useMotionTemplate` only accepts motion values, so the intensity-derived
// halves of the filter have to be motion values too — passing plain numbers
// would freeze them at the value they had when the template was built.
const saturation = useMotionValue(FOIL_MIN_SATURATION)
const contrast = useMotionValue(FOIL_MIN_CONTRAST)

const foilLevel = computed(() => clamp01(props.intensity))
const glareLevel = computed(() => clamp01(props.glare))

watch([foilLevel, material], ([level, next]) => {
  saturation.set((FOIL_MIN_SATURATION + level * FOIL_SATURATION_GAIN) * next.saturation)
  contrast.set(FOIL_MIN_CONTRAST + level * FOIL_CONTRAST_GAIN)
}, { immediate: true })

const foilFilter = useMotionTemplate`hue-rotate(${hueDeg}deg) saturate(${saturation}) contrast(${contrast})`

const foilOpacity = computed(
  () => FOIL_MIN_OPACITY + foilLevel.value * (FOIL_MAX_OPACITY - FOIL_MIN_OPACITY),
)

// ------------------------------------------------------------------- liveness

const isHoverDevice = ref(false)
let hoverQuery: MediaQueryList | undefined

function onHoverChange(event: MediaQueryListEvent) {
  isHoverDevice.value = event.matches
}

function syncHoverDevice() {
  hoverQuery?.removeEventListener('change', onHoverChange)
  hoverQuery = undefined

  if (typeof window === 'undefined') {
    isHoverDevice.value = false
    return
  }

  hoverQuery = window.matchMedia(HOVER_QUERY)
  hoverQuery.addEventListener('change', onHoverChange)
  isHoverDevice.value = hoverQuery.matches
}

// ------------------------------------------------------- device orientation

type OrientationPermission = 'granted' | 'denied'
interface OrientationPermissionApi {
  requestPermission: () => Promise<OrientationPermission>
}

type OrientationAccess = 'idle' | 'prompt' | 'granted' | 'denied'

function readOrientationApi(): OrientationPermissionApi | undefined {
  if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) return undefined
  return (window as unknown as { DeviceOrientationEvent?: OrientationPermissionApi })
    .DeviceOrientationEvent
}

const orientationAccess = ref<OrientationAccess>('idle')

function syncOrientationAccess() {
  if (!props.useDeviceOrientation || reducedMotion.value === true) {
    orientationAccess.value = 'idle'
    return
  }
  const api = readOrientationApi()
  // iOS 13+ requires an explicit, user-initiated grant. Everywhere else the
  // events are already flowing, so there is nothing to ask for.
  orientationAccess.value
    = api && typeof api.requestPermission === 'function' ? 'prompt' : 'granted'
}

async function requestOrientation() {
  try {
    const api = readOrientationApi()
    orientationAccess.value = api && typeof api.requestPermission === 'function'
      ? await api.requestPermission()
      : 'granted'
  }
  catch {
    orientationAccess.value = 'denied'
  }
}

const orientationActive = computed(
  () => props.useDeviceOrientation
    && reducedMotion.value !== true
    && orientationAccess.value === 'granted',
)

const tracksPointer = computed(() => reducedMotion.value !== true && isHoverDevice.value)
const isLive = computed(() => tracksPointer.value || orientationActive.value)

const showPermissionButton = computed(
  () => props.useDeviceOrientation
    && reducedMotion.value !== true
    && orientationAccess.value === 'prompt',
)

// -------------------------------------------------------------------- gesture

/**
 * The card measures itself while it is already rotated, and
 * `getBoundingClientRect` reports the *rendered* box — so its `left` and
 * `width` shift as the card tilts, and the pointer mapping feeds back into the
 * tilt that produced it. A cursor held still would see the value drift. The
 * unrotated centre is captured once on entry, when the tilt is still ~0, and
 * reused for the rest of the gesture.
 */
let gestureBox: { centerX: number, centerY: number, halfW: number, halfH: number } | null = null

function captureBox() {
  const el = rootElement()
  if (!el) return
  const rect = el.getBoundingClientRect()
  // `offsetWidth`/`offsetHeight` are layout values and ignore the transform, so
  // they stay honest even if the rect we read is already tilted.
  gestureBox = {
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2,
    halfW: (el.offsetWidth || rect.width) / 2,
    halfH: (el.offsetHeight || rect.height) / 2,
  }
}

function onPointerEnter() {
  captureBox()
}

function onPointerMove(event: PointerEvent) {
  // Both inputs write the same axis values, so letting them run together makes
  // the card fight itself whenever orientation is live.
  if (orientationActive.value || !tracksPointer.value) return
  if (!gestureBox) captureBox()
  if (!gestureBox) return

  pointerX.set(clampAxis((event.clientX - gestureBox.centerX) / gestureBox.halfW / 2))
  pointerY.set(clampAxis((event.clientY - gestureBox.centerY) / gestureBox.halfH / 2))
}

function onPointerLeave() {
  gestureBox = null
  pointerX.set(0)
  pointerY.set(0)
}

/** Drop a cached box whose page position no longer matches the viewport. */
function onWindowScroll() {
  gestureBox = null
}

function onDeviceOrientation(event: DeviceOrientationEvent) {
  pointerX.set(clampAxis((event.gamma ?? 0) / ORIENTATION_RANGE_DEG / 2))
  pointerY.set(clampAxis((event.beta ?? 0) / ORIENTATION_RANGE_DEG / 2))
}

// Losing the pointer mid-gesture (reduced motion switched on, a coarse pointer
// replacing a fine one) used to detach the handlers and leave the card frozen
// at whatever angle it had reached, because nothing reset the axes.
watch(tracksPointer, (tracking) => {
  if (!tracking) onPointerLeave()
})

watch([() => props.useDeviceOrientation, reducedMotion], syncOrientationAccess)

// ---------------------------------------------------------------------- style

const rootStyle = computed(() =>
  props.tilt && isLive.value
    ? { rotateX, rotateY, transformPerspective: `${PERSPECTIVE_PX}px`, transformStyle: 'preserve-3d' }
    : undefined,
)

const sheenStyle = computed(() => ({
  backgroundImage: SHEEN_GRADIENT,
  maskImage: SHEEN_EDGE_FADE,
  WebkitMaskImage: SHEEN_EDGE_FADE,
  mixBlendMode: 'soft-light',
  opacity: glareLevel.value * SHEEN_OPACITY_RATIO,
  willChange: 'transform',
}))

const glareStyle = computed(() => ({
  backgroundImage: GLARE_GRADIENT,
  inset: `-${GLARE_DRIFT}%`,
  mixBlendMode: 'soft-light',
  opacity: glareLevel.value * GLARE_OPACITY_RATIO,
  willChange: 'transform',
  x: isLive.value ? glareX : 0,
  y: isLive.value ? glareY : 0,
}))

const sheenSweep = computed(() => (isLive.value ? { x: [SHEEN_FROM, SHEEN_TO] } : undefined))

// Computed rather than inline so the transition keeps a stable identity while
// nothing about it changes; a fresh object each render restarts the loop.
const sheenTransition = computed(() =>
  isLive.value
    ? {
        duration: SHEEN_BASE_DURATION_S / Math.max(MIN_SHEEN_SPEED, props.sheenSpeed),
        ease: LINEAR_EASE,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'loop' as const,
      }
    : { duration: 0 },
)

// ------------------------------------------------------------------- lifecycle

onMounted(() => {
  syncHoverDevice()
  syncOrientationAccess()
  window.addEventListener('scroll', onWindowScroll, { passive: true })
  window.addEventListener('deviceorientation', onDeviceOrientation)
})

onBeforeUnmount(() => {
  hoverQuery?.removeEventListener('change', onHoverChange)
  hoverQuery = undefined
  window.removeEventListener('scroll', onWindowScroll)
  window.removeEventListener('deviceorientation', onDeviceOrientation)
})
</script>
