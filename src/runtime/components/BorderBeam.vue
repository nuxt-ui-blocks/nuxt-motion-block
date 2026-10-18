<template>
  <div
    ref="wrapperRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="wrapperStyle"
  >
    <slot />

    <svg
      v-if="hasBox"
      aria-hidden="true"
      :class="ui.svg({ class: uiProps.ui?.svg })"
      fill="none"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <defs>
        <linearGradient
          :id="beamGradientId"
          x1="0"
          x2="1"
          y1="0"
          y2="1"
        >
          <stop
            offset="0%"
            :stop-color="resolvedColorFrom"
          />
          <stop
            offset="100%"
            :stop-color="resolvedColorTo"
          />
        </linearGradient>
        <linearGradient
          :id="haloGradientId"
          x1="0"
          x2="1"
          y1="0"
          y2="1"
        >
          <stop
            offset="0%"
            :stop-color="toHaloStop(resolvedColorFrom)"
          />
          <stop
            offset="100%"
            :stop-color="toHaloStop(resolvedColorTo)"
          />
        </linearGradient>
      </defs>

      <!--
        The ring is a hairline border, not part of the beam. Keeping it off the
        beam gradient lets `colorFrom`/`colorTo` be as bright as a glow needs
        without turning the resting border into a stripe.
      -->
      <path
        ref="ringRef"
        :d="path"
        :opacity="isTravelling ? RING_ACTIVE_OPACITY : RING_STATIC_OPACITY"
        stroke="var(--color-border)"
        :stroke-width="props.borderWidth"
      />

      <g
        v-if="isTravelling"
        ref="cometRef"
        style="opacity: 0"
      >
        <!--
          `plus-lighter` only where there is darkness to add light to. On a light
          surface an additive glow washes out to nothing, so the halo composites
          normally there and simply tints.
        -->
        <g
          :class="ui.halo({ class: uiProps.ui?.halo })"
          color-interpolation-filters="sRGB"
          :style="{ filter: `blur(${haloBlur}px)` }"
        >
          <path
            v-for="entry in haloPlan"
            :key="entry.key"
            :data-beam-index="entry.index"
            :d="path"
            fill="none"
            pathLength="1"
            :stroke="`url(#${haloGradientId})`"
            :stroke-dasharray="`${entry.length} ${1 - entry.length}`"
            :stroke-dashoffset="entry.length"
            stroke-linecap="round"
            :stroke-opacity="entry.opacity"
            :stroke-width="entry.width"
          />
        </g>
        <g
          color-interpolation-filters="sRGB"
          :style="{ filter: `blur(${coreBlur}px)` }"
        >
          <path
            v-for="entry in corePlan"
            :key="entry.key"
            :data-beam-index="entry.index"
            :d="path"
            fill="none"
            pathLength="1"
            :stroke="`url(#${beamGradientId})`"
            :stroke-dasharray="`${entry.length} ${1 - entry.length}`"
            :stroke-dashoffset="entry.length"
            stroke-linecap="round"
            :stroke-opacity="entry.opacity"
            :stroke-width="entry.width"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useHoverCapable } from '../composables/useHoverCapable'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { useResolvedColor } from '../composables/useThemeColor'
import borderBeam from '../theme/border-beam'

const hoverCapable = useHoverCapable()

export type BorderBeamRadius = number | 'squircle'

export interface BorderBeamProps {
  /** Keep the beams travelling. Set to `false` to freeze and hide them. */
  active?: boolean
  /** How many beams ride the border, evenly phase-offset around the loop. */
  beams?: number
  /** Thickness of the border ring in pixels. */
  borderWidth?: number
  class?: string
  /** Trailing colour of the beam gradient. Use a light, saturated colour. */
  colorFrom?: string
  /** Leading colour of the beam gradient. Use a light, saturated colour. */
  colorTo?: string
  /** Seconds to wait before the first lap. */
  delay?: number
  /** Seconds for one full lap of the border. */
  duration?: number
  /** Pause the beams while a fine pointer hovers the element. */
  pauseOnHover?: boolean
  /** Corner geometry of both the ring and the travel path. */
  radius?: BorderBeamRadius
  /** Travel counter-clockwise. */
  reverse?: boolean
  /** Arc length of each beam, in pixels measured along the border. */
  size?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<BorderBeamProps>(), {
  active: true,
  beams: 1,
  borderWidth: 1,
  class: undefined,
  colorFrom: 'var(--color-brand)',
  colorTo: 'var(--color-brand-light)',
  delay: 0,
  duration: 6,
  pauseOnHover: false,
  radius: 16,
  reverse: false,
  size: 72,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'borderBeam', props, theme: borderBeam })

const resolvedColorFrom = useResolvedColor(() => props.colorFrom)
const resolvedColorTo = useResolvedColor(() => props.colorTo)

const HALF = 0.5
const MS_PER_SECOND = 1000
const MIN_LAP_SECONDS = 0.1
const OFFSET_PRECISION = 5
/** The comet is one dash on a path normalised to `pathLength={1}`. */
const PATH_UNIT = 1
const MIN_COMET_FRACTION = 0.02
const MAX_COMET_FRACTION = 0.45
const CORE_WIDTH_FACTOR = 2.6
const MIN_CORE_WIDTH = 2.5

/**
 * Four core dashes, not six, and one halo instead of two. Each dash is another
 * semi-opaque layer compositing over the last, so every extra one costs a paint
 * and buys less taper than the one before. Four is where the falloff stops
 * reading as steps: alpha lands on 0.14 / 0.48 / 0.82 / 0.98 towards the head.
 */
const CORE_LAYERS = 4
/** Shortest dash — the head — as a share of the full comet length. */
const CORE_MIN_LENGTH_RATIO = 0.1
/** >1 clusters the short dashes near the head, which is where the taper reads. */
const CORE_LENGTH_EXPONENT = 1.8
const CORE_HEAD_OPACITY = 0.9
const CORE_TAIL_OPACITY = 0.14
/** A beam of light barely thins along its trail; only the halo widens. */
const CORE_WIDTH_TAPER = 0.12
/** Just enough bloom to feather the seam between two stacked dashes. */
const CORE_BLUR_FACTOR = 0.2
const MIN_CORE_BLUR = 0.5
const HALO_WIDTH_FACTOR = 2.4
const HALO_LENGTH_RATIO = 0.92
const HALO_OPACITY = 0.34
const HALO_BLUR_FACTOR = 0.7
const MIN_HALO_BLUR = 4
/** How far each halo stop is pushed towards white. */
const HALO_TINT = '68%'
const RING_ACTIVE_OPACITY = 0.7
const RING_STATIC_OPACITY = 1
const SQUIRCLE_CORNER_RATIO = 0.3
const SQUIRCLE_CONTROL_RATIO = 0.76

interface CometLayer {
  blurred: boolean
  id: string
  length: number
  opacity: number
  width: number
}

interface DashPlan extends CometLayer {
  index: number
  key: string
  phase: number
}

const buildBorderPath = (
  width: number,
  height: number,
  radius: BorderBeamRadius,
  inset: number,
): string => {
  const x = inset
  const y = inset
  const w = Math.max(0, width - inset * 2)
  const h = Math.max(0, height - inset * 2)

  if (radius === 'squircle') {
    const corner = Math.min(w, h) * SQUIRCLE_CORNER_RATIO
    const k = corner * SQUIRCLE_CONTROL_RATIO
    return [
      `M ${x + corner} ${y}`,
      `L ${x + w - corner} ${y}`,
      `C ${x + w - corner + k} ${y} ${x + w} ${y + corner - k} ${x + w} ${y + corner}`,
      `L ${x + w} ${y + h - corner}`,
      `C ${x + w} ${y + h - corner + k} ${x + w - corner + k} ${y + h} ${x + w - corner} ${y + h}`,
      `L ${x + corner} ${y + h}`,
      `C ${x + corner - k} ${y + h} ${x} ${y + h - corner + k} ${x} ${y + h - corner}`,
      `L ${x} ${y + corner}`,
      `C ${x} ${y + corner - k} ${x + corner - k} ${y} ${x + corner} ${y}`,
      'Z',
    ].join(' ')
  }

  const r = Math.max(0, Math.min(radius, Math.min(w, h) * HALF))
  return [
    `M ${x + r} ${y}`,
    `H ${x + w - r}`,
    `A ${r} ${r} 0 0 1 ${x + w} ${y + r}`,
    `V ${y + h - r}`,
    `A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}`,
    `H ${x + r}`,
    `A ${r} ${r} 0 0 1 ${x} ${y + h - r}`,
    `V ${y + r}`,
    `A ${r} ${r} 0 0 1 ${x + r} ${y}`,
    'Z',
  ].join(' ')
}

/** Wraps a normalised offset back into `[0, 1)` so the dash never falls off. */
const wrapUnit = (value: number) => ((value % PATH_UNIT) + PATH_UNIT) % PATH_UNIT

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/**
 * Blurring a stroke darkens its fringe whenever the stroke itself is dark, so
 * the halo never inherits the beam colour verbatim — it is pushed towards white
 * first. A glow is light by definition; a dark blur is a shadow.
 */
const toHaloStop = (color?: string) => color ? `color-mix(in oklab, ${color} ${HALO_TINT}, white)` : undefined

const shouldReduceMotion = useReducedMotion()
// `useId` rather than a random string: the gradient ids are in the rendered
// markup, so a per-render value would differ between server and client and
// trip a hydration mismatch on every instance.
const instanceId = `bb-${useId()}`
const beamGradientId = `${instanceId}-beam`
const haloGradientId = `${instanceId}-halo`

const wrapperRef = ref<HTMLElement | null>(null)
const ringRef = ref<SVGPathElement | null>(null)
const cometRef = ref<SVGGElement | null>(null)
const width = ref(0)
const height = ref(0)
const perimeter = ref(0)

/**
 * The dash nodes are looked up by their `data-beam-index` rather than captured
 * through a `:ref` callback. A function ref is re-created on every render, so
 * Vue invokes the previous closure with `null` before invoking the new one with
 * the element — a rAF tick landing between those two calls reads a cleared slot
 * and the stroke silently stops updating. Querying the DOM once per loop start
 * has no such window.
 */
const collectDashNodes = (): Map<number, SVGPathElement> => {
  const nodes = new Map<number, SVGPathElement>()
  wrapperRef.value?.querySelectorAll<SVGPathElement>('[data-beam-index]').forEach((node) => {
    nodes.set(Number(node.dataset.beamIndex), node)
  })
  return nodes
}

let paused = false
let offscreen = false
let frameId = 0

const wrapperStyle = computed(() =>
  props.radius === 'squircle' ? undefined : { borderRadius: `${props.radius}px` },
)

const beamCount = computed(() => Math.max(1, Math.round(props.beams)))
const hasBox = computed(() => width.value > 0 && height.value > 0)
const path = computed(() =>
  hasBox.value ? buildBorderPath(width.value, height.value, props.radius, props.borderWidth * HALF) : '',
)
const isTravelling = computed(
  () => props.active && !shouldReduceMotion.value && hasBox.value && perimeter.value > 0,
)
const headWidth = computed(() => Math.max(MIN_CORE_WIDTH, props.borderWidth * CORE_WIDTH_FACTOR))
const haloBlur = computed(() => Math.max(MIN_HALO_BLUR, headWidth.value * HALO_BLUR_FACTOR))
const coreBlur = computed(() => Math.max(MIN_CORE_BLUR, headWidth.value * CORE_BLUR_FACTOR))

const layers = computed<CometLayer[]>(() => {
  if (perimeter.value <= 0) {
    return []
  }
  const comet = clamp(props.size / perimeter.value, MIN_COMET_FRACTION, MAX_COMET_FRACTION)
  const lastIndex = CORE_LAYERS - 1
  // Every core dash ends at the same head position, so the exposed far end of
  // the longest one reads as the faint tip of the tail and the overlap at the
  // head accumulates into the brightest point.
  const core = Array.from({ length: CORE_LAYERS }, (_unused, index) => {
    const ratio = index / lastIndex
    const growth = CORE_MIN_LENGTH_RATIO + (1 - CORE_MIN_LENGTH_RATIO) * ratio ** CORE_LENGTH_EXPONENT
    return {
      blurred: false,
      id: `core-${index.toString()}`,
      length: comet * growth,
      opacity: CORE_HEAD_OPACITY + (CORE_TAIL_OPACITY - CORE_HEAD_OPACITY) * ratio,
      width: headWidth.value * (1 - CORE_WIDTH_TAPER * ratio),
    }
  })

  return [
    {
      blurred: true,
      id: 'halo',
      length: comet * HALO_LENGTH_RATIO,
      opacity: HALO_OPACITY,
      width: headWidth.value * HALO_WIDTH_FACTOR,
    },
    ...core,
  ]
})

/**
 * The comet is the outline itself: every layer is a dash stroked along the same
 * `d`, so it is curved by construction and cannot leave the border. Only
 * `stroke-dashoffset` moves, which slides the dash through corners instead of
 * pivoting a straight sprite across them.
 */
const plan = computed<DashPlan[]>(() => {
  const layerList = layers.value
  if (!isTravelling.value || layerList.length === 0) {
    return []
  }
  const count = beamCount.value
  const entries: DashPlan[] = []
  for (let index = 0; index < count * layerList.length; index++) {
    const beamIndex = Math.floor(index / layerList.length)
    const layer = layerList[index % layerList.length]
    entries.push({
      ...layer,
      index,
      key: `${beamIndex}-${layer.id}`,
      phase: beamIndex / count,
    })
  }
  return entries
})

/**
 * One path per dash, split across the two filter groups. Each group must render
 * only* its own layers: if both groups rendered the full list and hid the
 * mismatches, every `:ref` would fire twice for the same slot and the second
 * write would point the dash node at a hidden element, leaving the visible
 * stroke frozen at its initial offset (and therefore invisible) forever.
 */
const haloPlan = computed(() => plan.value.filter(entry => entry.blurred))
const corePlan = computed(() => plan.value.filter(entry => !entry.blurred))

const stopLoop = () => {
  if (frameId) {
    cancelAnimationFrame(frameId)
    frameId = 0
  }
}

const startLoop = () => {
  stopLoop()
  const entries = plan.value
  if (entries.length === 0) {
    return
  }
  const nodes = collectDashNodes()
  if (nodes.size === 0) {
    return
  }

  const lapSeconds = Math.max(MIN_LAP_SECONDS, props.duration)
  let lastTimestamp = performance.now()
  let elapsed = 0

  const place = (progress: number) => {
    for (const item of entries) {
      const node = nodes.get(item.index)
      if (!node) {
        continue
      }
      const lap = wrapUnit(progress + item.phase)
      // Travelling backwards puts the leading end at the dash start, so the tail
      // keeps trailing the head in the direction of motion.
      const head = props.reverse ? PATH_UNIT - lap : lap
      const offset = props.reverse ? -head : item.length - head
      node.style.strokeDashoffset = wrapUnit(offset).toFixed(OFFSET_PRECISION)
    }
    if (cometRef.value) {
      cometRef.value.style.opacity = '1'
    }
  }

  const tick = (timestamp: number) => {
    frameId = requestAnimationFrame(tick)
    const deltaSeconds = (timestamp - lastTimestamp) / MS_PER_SECOND
    lastTimestamp = timestamp
    // Beams scrolled out of view keep no frame budget: the loop still runs but
    // skips every style write until the element is visible again.
    if (paused || offscreen) {
      return
    }
    elapsed += deltaSeconds
    const progress = (elapsed - props.delay) / lapSeconds
    if (progress < 0) {
      return
    }
    place(progress)
  }

  frameId = requestAnimationFrame(tick)
}

onMounted(() => {
  const wrapper = wrapperRef.value
  if (!wrapper) {
    return
  }

  const measure = () => {
    const rect = wrapper.getBoundingClientRect()
    width.value = rect.width
    height.value = rect.height
  }
  const sizeObserver = new ResizeObserver(measure)
  measure()
  sizeObserver.observe(wrapper)

  const intersectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      offscreen = !entry.isIntersecting
    }
  })
  intersectionObserver.observe(wrapper)

  const onEnter = () => {
    if (props.pauseOnHover && hoverCapable.value) {
      paused = true
    }
  }
  const onLeave = () => {
    paused = false
  }
  wrapper.addEventListener('pointerenter', onEnter)
  wrapper.addEventListener('pointerleave', onLeave)

  onBeforeUnmount(() => {
    stopLoop()
    sizeObserver.disconnect()
    intersectionObserver.disconnect()
    wrapper.removeEventListener('pointerenter', onEnter)
    wrapper.removeEventListener('pointerleave', onLeave)
  })
})

// The comet's arc length is authored in pixels, so it needs the real perimeter of
// the current outline before it can be normalised to path units.
watch([path, ringRef], () => {
  const ring = ringRef.value
  perimeter.value = ring && path.value ? ring.getTotalLength() : 0
}, { flush: 'post' })

// The comet's `<g>` only mounts on the render where `isTravelling` flips, so the
// dash nodes do not exist yet when this watcher first runs.
//
// Every source here is a scalar. Watching the `haloPlan`/`corePlan` arrays
// instead would compare a fresh array identity on each evaluation and restart
// the loop on every scheduler flush, which resets `elapsed` to zero and pins the
// comet at its initial offset. Upstream has the same dependency set —
// `[beamCount, delay, duration, isTravelling, layers, reverse]` — and a React
// effect can re-run harmlessly because it never carries animation state, so the
// Vue port has to make the trigger explicit instead.
watch(
  [
    isTravelling,
    beamCount,
    () => props.size,
    () => props.reverse,
    () => props.duration,
    () => props.delay,
  ],
  async () => {
    await nextTick()
    if (isTravelling.value) {
      startLoop()
    }
    else {
      stopLoop()
    }
  },
  { flush: 'post' },
)
</script>
