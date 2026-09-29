<template>
  <div
    ref="frameRef"
    :class="['relative', props.class]"
    @pointerenter="isHovered = true"
    @pointerleave="isHovered = false"
  >
    <svg
      aria-hidden="true"
      class="absolute h-0 w-0"
      focusable="false"
    >
      <defs>
        <!--
          `clipPathUnits` is the literal SVG attribute name — the kebab-case
          `clip-path-units` is a CSS property and is ignored here. The default
          is `objectBoundingBox` anyway, which is the whole reason these paths
          can be authored in 0..1 and reused at any size.
        -->
        <clipPath
          :id="clipId"
          clipPathUnits="objectBoundingBox"
        >
          <!--
            A plain <path>, not <Motion>. Motion renders a div by default and
            does not resolve `as` to an SVG element, so a Motion child inside a
            <clipPath> produces invalid markup and the clip is silently dropped.
            The `d` value is interpolated here instead — see lerpPaths.
          -->
          <path :d="renderedD" />
        </clipPath>
      </defs>
    </svg>

    <div
      class="h-full w-full"
      :style="{ clipPath: `url(#${clipId})`, WebkitClipPath: `url(#${clipId})` }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion-v'
import { useRafFn } from '@vueuse/core'
import type { MaybeComputedElementRef } from '@vueuse/core'
import type { ScrollOffset } from 'motion-v'

export type SvgClipMaskShape = 'blob' | 'arch' | 'diamond' | 'wave' | 'custom'
export type SvgClipMaskAnimate = 'none' | 'morph' | 'scroll' | 'hover'

export interface SvgClipMaskProps {
  /**
   * "morph" cycles through morphPaths forever, "scroll" steps through them as
   * the frame scrolls, "hover" swaps to morphPaths[0] on hover.
   */
  animate?: SvgClipMaskAnimate
  class?: string
  /** Seconds for one full "morph" loop. */
  duration?: number
  /**
   * Ref to a scrollable ancestor that drives "scroll" mode instead of the
   * window. Without it `useScroll` measures the document, which never leaves
   * the 0..1 band for a container that scrolls internally.
   *
   * Pass a getter — `:container="() => panelRef"` — not the element. A plain
   * binding is unwrapped by the template and captured as `null` during
   * `setup`, after which nothing re-reads it and `useScroll` quietly falls back
   * to the window. The getter is invoked inside Motion's own `flush: 'post'`
   * effect, where your ref is a tracked dependency.
   */
  container?: MaybeComputedElementRef
  /**
   * Paths to cycle between for "morph"/"scroll"/"hover". They must all share
   * the same command structure (same sequence of M/L/C/Z and the same number of
   * coordinates) — the morph below interpolates numbers positionally, so
   * mismatched structures would bend rather than blend.
   */
  morphPaths?: string[]
  /** Custom path data, in objectBoundingBox (0..1) coordinates. Required when shape is "custom". */
  path?: string
  shape?: SvgClipMaskShape
}

const props = withDefaults(defineProps<SvgClipMaskProps>(), {
  animate: 'none',
  class: '',
  duration: 4,
  shape: 'blob',
})

// The mask has to finish opening while the frame is still in view; the full
// enter-to-exit range parks the fully-revealed state off-screen.
const SCROLL_OFFSET: ScrollOffset = ['start 0.9', 'end 0.6']
const SEGMENT_PATTERN = /(-?\d*\.?\d+(?:e[-+]?\d+)?)/gi

/**
 * The reference easing, kept as the literal cubic-bezier it is. It is not a
 * symmetric ease-in-out: the control points sit at x=0.645 / x=0.355 with very
 * shallow y, which is what gives the mask its "settle into place" feel. A
 * generic `2t²` ease reads as mechanical next to it.
 */
const EASE_MOVE = [0.645, 0.045, 0.355, 1] as const

/** Seconds for a non-"morph" path swap to ease in. */
const TRANSITION_DURATION = 0.3
const TRANSITION_MS = TRANSITION_DURATION * 1000

/**
 * Cubic-bezier evaluator (Newton-Raphson on x, then evaluate y). Values that
 * are not a plain ease-in/out have no closed form, and this is the only one
 * that needs to be exact — it drives every visible transition in this file.
 */
const easeMove = (t: number) => {
  if (t <= 0) {
    return 0
  }
  if (t >= 1) {
    return 1
  }
  const [x1, y1, x2, y2] = EASE_MOVE
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const sampleX = (u: number) => ((ax * u + bx) * u + cx) * u
  const slopeX = (u: number) => (3 * ax * u + 2 * bx) * u + cx
  let u = t
  for (let i = 0; i < 8; i += 1) {
    const error = sampleX(u) - t
    if (Math.abs(error) < 1e-6) {
      break
    }
    const slope = slopeX(u)
    if (Math.abs(slope) < 1e-6) {
      break
    }
    u -= error / slope
  }
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  return ((ay * u + by) * u + cy) * u
}

/**
 * Each shape carries a partner outline, not just one path. A single preset can
 * never morph — there is nothing to morph *to* — so shipping presets without a
 * companion would make `animate="morph"` silently inert. Every partner repeats
 * its shape's command structure number for number, which is what the positional
 * interpolation in `interpolatePath` requires: a mismatched segment count would
 * lerp a coordinate against a missing one and read as `0`.
 */
const PRESET_PATHS: Record<string, [string, string]> = {
  arch: [
    'M0,1 L0,0.4 C0,0.18 0.18,0 0.5,0 C0.82,0 1,0.18 1,0.4 L1,1 Z',
    'M0,1 L0,0.28 C0,0.1 0.1,0 0.5,0 C0.9,0 1,0.1 1,0.28 L1,1 Z',
  ],
  blob: [
    'M0.5,0.02 C0.75,0.02 0.98,0.25 0.98,0.5 C0.98,0.75 0.75,0.98 0.5,0.98 C0.25,0.98 0.02,0.75 0.02,0.5 C0.02,0.25 0.25,0.02 0.5,0.02 Z',
    'M0.5,0.07 C0.9,0.07 0.93,0.1 0.93,0.5 C0.93,0.9 0.9,0.93 0.5,0.93 C0.1,0.93 0.07,0.9 0.07,0.5 C0.07,0.1 0.1,0.07 0.5,0.07 Z',
  ],
  diamond: [
    'M0.5,0 L1,0.5 L0.5,1 L0,0.5 Z',
    'M0.5,0.1 L0.9,0.5 L0.5,0.9 L0.1,0.5 Z',
  ],
  wave: [
    'M0,0.3 C0.25,0.05 0.75,0.55 1,0.3 L1,1 L0,1 Z',
    'M0,0.62 C0.25,0.95 0.75,0.28 1,0.62 L1,1 L0,1 Z',
  ],
} as const

// `useId` keeps the reference stable across SSR; a random string would make the
// server and client disagree on every instance.
const clipId = `svg-clip-mask-${useId()}`
const shouldReduceMotion = useReducedMotion()
const frameRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const isHoverCapable = ref(false)
const scrollIndex = ref(0)
const morphProgress = ref(0)
const isVisible = ref(true)

const basePath = computed(() => {
  if (props.shape === 'custom') {
    return props.path ?? PRESET_PATHS.blob![0]
  }
  return PRESET_PATHS[props.shape]?.[0] ?? PRESET_PATHS.blob![0]
})

const paths = computed(() => {
  if (props.morphPaths && props.morphPaths.length > 1) {
    return props.morphPaths
  }
  const preset = props.shape === 'custom' ? PRESET_PATHS.blob : PRESET_PATHS[props.shape]
  return preset ? [preset[0], preset[1]] : [basePath.value]
})

const { scrollYProgress } = useScroll({
  // Straight through, never `props.container?.value`: `useScroll` resolves the
  // getter via `unrefElement` inside its own `flush: 'post'` effect, so
  // unwrapping here would strip the reactive source.
  container: props.container,
  offset: SCROLL_OFFSET,
  target: frameRef,
})

useMotionValueEvent(scrollYProgress, 'change', (value) => {
  if (shouldReduceMotion.value || props.animate !== 'scroll' || paths.value.length < 2) {
    return
  }
  scrollIndex.value = Math.min(paths.value.length - 1, Math.floor(value * paths.value.length))
})

/**
 * Morphing is done by interpolating the coordinate lists rather than by handing
 * the `d` string to an animation library, for two reasons. Motion cannot render
 * a path inside a `<clipPath>`, and SVG's own `d` interpolation is not something
 * a JS-driven loop can read back mid-flight. Splitting on numbers and lerping
 * reproduces exactly what the browser's native morph does, given the documented
 * requirement that every path shares its command structure.
 */
const lerpPaths = (from: string, to: string, t: number) => {
  if (!from) {
    return to
  }
  if (!to || t >= 1) {
    return to || from
  }
  if (t <= 0) {
    return from
  }
  // A capturing group is what makes `split` keep the numbers as array members,
  // so the result alternates literal, number, literal, number...
  const a = from.split(SEGMENT_PATTERN)
  const b = to.split(SEGMENT_PATTERN)
  const length = Math.max(a.length, b.length)
  let out = ''
  for (let index = 0; index < length; index += 1) {
    if (index % 2 === 0) {
      out += b[index] ?? a[index] ?? ''
    }
    else {
      const start = Number(a[index] ?? 0)
      const end = Number(b[index] ?? 0)
      out += String(start + (end - start) * t)
    }
  }
  return out
}

const isMorphing = computed(
  () => props.animate === 'morph' && !shouldReduceMotion.value && paths.value.length > 1,
)

const activeD = computed(() => {
  if (shouldReduceMotion.value || props.animate === 'none' || isMorphing.value) {
    return paths.value[0]
  }
  if (props.animate === 'scroll') {
    return paths.value[scrollIndex.value] ?? paths.value[0]
  }
  if (props.animate === 'hover') {
    return isHoverCapable.value && isHovered.value ? (paths.value[1] ?? paths.value[0]) : paths.value[0]
  }
  return paths.value[0]
})

const renderedD = ref('')

const tweenFrom = ref('')
const tweenTo = ref('')
const tweenStartedAt = ref(0)
const isTweening = ref(false)

const { pause: pauseLoop, resume: resumeLoop } = useRafFn(() => {
  if (isMorphing.value && isVisible.value) {
    const cycle = Math.max(0.1, props.duration) * 1000
    morphProgress.value = (morphProgress.value + 16.67 / cycle) % 1
    const list = paths.value
    const scaled = morphProgress.value * list.length
    const from = Math.min(list.length - 1, Math.floor(scaled))
    const to = from + 1 < list.length ? from + 1 : 0
    renderedD.value = lerpPaths(list[from] ?? '', list[to] ?? '', easeMove(scaled - from))
  }

  if (!isTweening.value) {
    return
  }
  const elapsed = performance.now() - tweenStartedAt.value
  const t = Math.min(1, elapsed / TRANSITION_MS)
  renderedD.value = t >= 1
    ? tweenTo.value
    : lerpPaths(tweenFrom.value, tweenTo.value, easeMove(t))
  if (t >= 1) {
    isTweening.value = false
  }
})

/**
 * A discrete path change (a "scroll" step or a "hover" swap) is *not* applied
 * instantly. The reference eases each step over 0.3s on the same cubic-bezier
 * the morph uses, and that eased settle is what makes the stepped progression
 * read as deliberate motion rather than a stutter. Binding `activeD` straight
 * to the `d` attribute drops it and the mask jumps.
 */
watch(activeD, (next) => {
  if (isMorphing.value || !next) {
    return
  }
  if (!renderedD.value) {
    renderedD.value = next
    return
  }
  if (next === renderedD.value) {
    return
  }
  tweenFrom.value = renderedD.value
  tweenTo.value = next
  tweenStartedAt.value = performance.now()
  isTweening.value = true
  resumeLoop()
})

watch(
  () => [isMorphing.value, isVisible.value, isTweening.value] as const,
  ([morphing, visible, tweening]) => {
    if ((morphing && visible) || tweening) {
      resumeLoop()
    }
    else {
      pauseLoop()
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (!renderedD.value) {
    renderedD.value = activeD.value
  }

  const frame = frameRef.value
  if (frame) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        isVisible.value = entry.isIntersecting
      }
    })
    observer.observe(frame)
    onBeforeUnmount(() => observer.disconnect())
  }

  if (props.animate !== 'hover') {
    return
  }
  const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  isHoverCapable.value = mediaQuery.matches
  const handleChange = (event: MediaQueryListEvent) => {
    isHoverCapable.value = event.matches
  }
  mediaQuery.addEventListener('change', handleChange)
  onBeforeUnmount(() => mediaQuery.removeEventListener('change', handleChange))
})
</script>
