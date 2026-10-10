<template>
  <div
    ref="wrapperRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <svg
      aria-hidden="true"
      :class="ui.svg({ class: uiProps.ui?.svg })"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      :viewBox="props.viewBox"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        v-for="entry in drawEntries"
        :key="entry.key"
        :d="entry.d"
        fill="none"
        pathLength="1"
        :stroke="props.stroke"
        stroke-linecap="round"
        :stroke-width="props.strokeWidth"
        :style="{ strokeDasharray: '1 1', strokeDashoffset: 1 - entry.pathLength }"
      />
      <!-- Never painted â€” it exists only so the marker has a single, stable
           geometry to measure against, including across multiple paths. -->
      <path
        v-if="hasMarker"
        ref="measureRef"
        :d="combinedD"
        fill="none"
        stroke="none"
      />
    </svg>

    <div
      v-if="hasMarker"
      aria-hidden="true"
      :class="ui.marker({ class: uiProps.ui?.marker })"
      :style="{ transform: `translate3d(${markerX}px, ${markerY}px, 0)` }"
    >
      <div :class="ui.markerInner({ class: uiProps.ui?.markerInner })">
        <slot name="marker" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, useSlots } from 'vue'
import { motionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import svgDrawOnScroll from '../theme/svg-draw-on-scroll'
import type { MaybeComputedElementRef } from '@vueuse/core'
import type { ScrollOffset } from 'motion-v'

export interface SvgDrawOnScrollProps {
  class?: string
  /**
   * A scrollable ancestor that drives the draw instead of the window. Without
   * it several instances on one page all read the same page-level progress, so
   * their offset ranges overlap and only the last one appears to work. The
   * container must be `position: relative` — Motion walks `offsetParent` from
   * the target up to the scroll container.
   *
   * Pass a **getter**, not the element: `:container="() => panelRef"`. A plain
   * binding is unwrapped by the template and captured as `null` during `setup`,
   * after which nothing ever re-reads it and `useScroll` quietly falls back to
   * the window. The getter is invoked inside Motion's own `flush: 'post'`
   * effect, where your ref is a tracked dependency, so it resolves to the
   * mounted element and re-resolves if that ever changes.
   */
  container?: MaybeComputedElementRef
  /** Motion `useScroll` offset tuple, e.g. ["start 0.9", "end 0.3"]. */
  offset?: ScrollOffset
  /** Freeze fully drawn once complete instead of undrawing on scroll-up. */
  once?: boolean
  /** Single path's `d`. Ignored if `paths` is also provided. */
  path?: string
  /** Multiple paths, drawn one after another across the scroll range. */
  paths?: string[]
  stroke?: string
  strokeWidth?: number
  viewBox?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<SvgDrawOnScrollProps>(), {
  class: undefined,
  // Finishes drawing while the artwork is still mid-viewport rather than on its
  // way out, so the completed stroke is something you actually get to look at.
  offset: () => ['start 0.9', 'end 0.6'],
  once: false,
  stroke: 'currentColor',
  strokeWidth: 2,
  viewBox: '0 0 100 100',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'svgDrawOnScroll', props, theme: svgDrawOnScroll })

const SPRING_CONFIG = { damping: 28, mass: 0.4, stiffness: 240 }
const MARKER_KEY_SLICE = 8
const FULL_PROGRESS = 1

const clampUnit = (value: number) => Math.min(1, Math.max(0, value))

const shouldReduceMotion = useReducedMotion()
const wrapperRef = ref<HTMLElement | null>(null)
const slots = useSlots()
const measureRef = ref<SVGPathElement | null>(null)
const maxProgress = ref(0)

const pathList = computed(() =>
  props.paths && props.paths.length > 0 ? props.paths : props.path ? [props.path] : [],
)
const combinedD = computed(() => pathList.value.join(' '))
const hasMarker = computed(() => Boolean(slots.marker) && combinedD.value.length > 0)

// `container` is passed straight through, never as `props.container?.value`.
// `useScroll` calls `unrefElement` on it inside a `flush: 'post'` effect, so a
// getter prop is resolved to the live element there; unwrapping it here would
// strip the reactive source and re-freeze whatever was captured at `setup`
// (i.e. `null`, which makes `useScroll` silently fall back to the window).
const { scrollYProgress } = useScroll({
  container: props.container,
  offset: props.offset,
  target: wrapperRef,
})

const monotonicProgress = useTransform(scrollYProgress, (latest: number) => {
  if (!props.once) {
    return latest
  }
  if (latest > maxProgress.value) {
    maxProgress.value = latest
  }
  return maxProgress.value
})

const spring = useSpring(monotonicProgress, SPRING_CONFIG)

interface DrawEntry {
  d: string
  key: string
  pathLength: number
}

/**
 * One mirrored value for the whole spring, rather than a `useTransform` per
 * path. `useTransform` inside a `computed` re-subscribes on every recomputation
 * and never unsubscribes, and a `MotionValue` bound into `style` is not
 * unwrapped by the template — so the element would have been driven by a value
 * it never received. `spring` is already smoothed, so reading it directly costs
 * nothing and keeps the per-path mapping a pure function of one number.
 */
const scrollProgress = shallowRef(0)
useMotionValueEvent(spring, 'change', (latest) => {
  scrollProgress.value = latest
})

const drawEntries = computed<DrawEntry[]>(() => {
  const list = pathList.value
  return list.map((d, index) => {
    const start = index / list.length
    const end = (index + 1) / list.length
    const raw = (scrollProgress.value - start) / (end - start)
    return {
      d,
      key: `svg-draw-on-scroll-path-${index}-${d.slice(0, MARKER_KEY_SLICE)}`,
      // `pathLength="1"` on the element normalises the dash units, so a plain
      // `stroke-dashoffset` of 1 hides the stroke entirely and 0 reveals all of
      // it. Going through the dash rather than a `pathLength` style avoids
      // re-measuring every path, and keeps to properties the DOM actually types.
      pathLength: shouldReduceMotion.value ? FULL_PROGRESS : clampUnit(raw),
    }
  })
})

const markerX = shallowRef(0)
const markerY = shallowRef(0)
const markerXValue = motionValue(0)
const markerYValue = motionValue(0)

/**
 * The marker is positioned from the path's own geometry rather than CSS
 * `offset-path`. `offset-path: path()` measures in the element's CSS pixel
 * space, but the `d` is written in viewBox units â€” so any viewBox that is not
 * 1:1 with the rendered box (which is the normal case, since the SVG scales
 * with `preserveAspectRatio`) left the marker floating away from the stroke it
 * is supposed to ride. `getPointAtLength` + `getScreenCTM` resolve the point
 * through the exact same transform the browser used to paint the line.
 */
const syncMarker = (latest: number) => {
  const pathElement = measureRef.value
  const wrapper = wrapperRef.value
  if (!pathElement || !wrapper) {
    return
  }
  const totalLength = pathElement.getTotalLength()
  const matrix = pathElement.getScreenCTM()
  if (!totalLength || !matrix) {
    return
  }
  const progress = shouldReduceMotion.value ? FULL_PROGRESS : clampUnit(latest)
  const point = pathElement.getPointAtLength(progress * totalLength)
  const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(matrix)
  const rect = wrapper.getBoundingClientRect()
  markerXValue.set(screenPoint.x - rect.left)
  markerYValue.set(screenPoint.y - rect.top)
}

useMotionValueEvent(spring, 'change', syncMarker)

onMounted(() => {
  const wrapper = wrapperRef.value
  if (!hasMarker.value || !wrapper) {
    return
  }
  // Also sync on mount and on resize: the scroll value can sit still for the
  // whole life of the component (reduced motion, or simply an untouched page)
  // and the mapping changes whenever the SVG is laid out at a new size.
  syncMarker(spring.get())
  const observer = new ResizeObserver(() => syncMarker(spring.get()))
  observer.observe(wrapper)
  onBeforeUnmount(() => observer.disconnect())
})

// A `MotionValue` is not a Vue ref, so it has to be mirrored by subscription
// rather than watched.
useMotionValueEvent(markerXValue, 'change', (latest) => {
  markerX.value = latest
})
useMotionValueEvent(markerYValue, 'change', (latest) => {
  markerY.value = latest
})
</script>
