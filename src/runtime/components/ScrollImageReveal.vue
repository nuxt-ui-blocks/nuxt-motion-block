<template>
  <!-- @vue-ignore -->
  <Motion
    ref="frameRef"
    as="div"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class, props.rounded] })"
    :style="{ clipPath, maskImage, WebkitMaskImage: maskImage }"
  >
    <!-- @vue-ignore -->
    <Motion
      as="img"
      :alt="props.alt"
      :src="props.src"
      :class="ui.image({ class: uiProps.ui?.image })"
      decoding="async"
      :style="{
        height: `calc(100% + ${overscan * 2}px)`,
        opacity: revealOpacity,
        scale,
        top: `${-overscan}px`,
        y: parallaxY,
      }"
    />
  </Motion>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useReducedMotion, useScroll, useSpring, useTransform, Motion } from 'motion-v'
import type { ScrollOffset } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import scrollImageReveal from '../theme/scroll-image-reveal'

export type ScrollImageRevealMask = 'wipe' | 'curtain' | 'circle' | 'blinds' | 'scale'

export type ScrollImageRevealDirection = 'left' | 'right' | 'up' | 'down'

export interface ScrollImageRevealProps {
  /** Accessible description of the image. Required. */
  alt: string
  class?: string
  ui?: Record<string, any>
  /** Reveal direction. Only left/right apply to "wipe" and "blinds"; only up/down apply to "curtain". */
  direction?: ScrollImageRevealDirection
  mask?: ScrollImageRevealMask
  /** Motion `useScroll` offset tuple, e.g. ["start end", "end start"]. */
  offset?: ScrollOffset
  /** Freeze the reveal once fully open instead of re-hiding on scroll-up. */
  once?: boolean
  /** Counter-parallax travel of the image, in pixels. */
  parallax?: number
  /** Tailwind rounded-* class applied to the frame. */
  rounded?: string
  src: string
}

const props = withDefaults(defineProps<ScrollImageRevealProps>(), {
  class: undefined,
  ui: undefined,
  direction: 'left',
  mask: 'wipe',
  // The payoff has to land while the frame is still comfortably in view. Running
  // the full enter-to-exit range finishes the reveal as the element leaves, so
  // the moment it was built for happens off-screen.
  offset: () => ['start 0.9', 'end 0.6'],
  once: false,
  parallax: 60,
  rounded: 'rounded-2xl',
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'scrollImageReveal',
  props,
  theme: scrollImageReveal,
})

const DEFAULT_PARALLAX_PX = 60
const CIRCLE_MAX_RADIUS_PERCENT = 90
const BLIND_BAND_SIZE_PX = 40
const SCALE_START = 1.12
const FULL_SCALE = 1
const FULL_OPACITY = 1
const REVEAL_SPEED_MULTIPLIER = 2.5
const SPRING_CONFIG = { damping: 32, mass: 0.4, stiffness: 260 }
const NO_CLIP = 'inset(0% 0% 0% 0%)'

const clampUnit = (value: number) => Math.min(1, Math.max(0, value))

const buildClipPath = (mask: ScrollImageRevealMask, direction: ScrollImageRevealDirection, progress: number) => {
  const hiddenPercent = clampUnit(1 - progress) * 100
  if (mask === 'wipe') {
    return direction === 'right' ? `inset(0% 0% 0% ${hiddenPercent}%)` : `inset(0% ${hiddenPercent}% 0% 0%)`
  }
  if (mask === 'curtain') {
    return direction === 'down' ? `inset(${hiddenPercent}% 0% 0% 0%)` : `inset(0% 0% ${hiddenPercent}% 0%)`
  }
  if (mask === 'circle') {
    return `circle(${clampUnit(progress) * CIRCLE_MAX_RADIUS_PERCENT}% at 50% 50%)`
  }
  return NO_CLIP
}

/**
 * A repeating gradient whose opaque band grows with progress. A hard-edged
 * gradient is the only way to get N discrete slats from one value â€” a clip
 * path can only cut one continuous region.
 */
const buildBlindsMask = (direction: ScrollImageRevealDirection, progress: number) => {
  const revealPx = clampUnit(progress) * BLIND_BAND_SIZE_PX
  const axis = direction === 'left' || direction === 'right' ? 'to right' : 'to bottom'
  return `repeating-linear-gradient(${axis}, #000 0px, #000 ${revealPx}px, transparent ${revealPx}px, transparent ${BLIND_BAND_SIZE_PX}px)`
}

const shouldReduceMotion = useReducedMotion()
const frameRef = ref<HTMLElement | null>(null)
const maxReveal = ref(0)

const { scrollYProgress } = useScroll({ offset: props.offset, target: frameRef })
const baseSpring = useSpring(scrollYProgress, SPRING_CONFIG)

const revealProgress = useTransform(baseSpring, (latest) => {
  const scaled = clampUnit(latest * REVEAL_SPEED_MULTIPLIER)
  if (!props.once) {
    return scaled
  }
  if (scaled > maxReveal.value) {
    maxReveal.value = scaled
  }
  return maxReveal.value
})

// The mask lives on the frame, not the image: the image is deliberately taller
// than the frame so the parallax has somewhere to travel, and a clip measured
// against that oversized box would never line up with the edges.
const isStatic = computed(() => shouldReduceMotion.value)

const clipPath = useTransform(revealProgress, (latest) => {
  if (isStatic.value || props.mask === 'blinds' || props.mask === 'scale') {
    return NO_CLIP
  }
  return buildClipPath(props.mask, props.direction, latest)
})

const maskImage = useTransform(revealProgress, (latest) => {
  if (isStatic.value || props.mask !== 'blinds') {
    return 'none'
  }
  return buildBlindsMask(props.direction, latest)
})

// Scales *down* into place from an overscan, never up from smaller than the
// frame â€” scaling up from 0.85 would expose the background at the edges.
const scale = useTransform(revealProgress, (latest) => {
  if (isStatic.value || props.mask !== 'scale') {
    return FULL_SCALE
  }
  return SCALE_START + (FULL_SCALE - SCALE_START) * clampUnit(latest)
})

const revealOpacity = useTransform(revealProgress, (latest) => {
  if (isStatic.value || props.mask !== 'scale') {
    return FULL_OPACITY
  }
  return clampUnit(latest)
})

// Overscan on both edges so the counter-parallax never drags the image off its
// own frame and leaves a strip of background behind.
const overscan = computed(() => (isStatic.value ? 0 : Math.abs(props.parallax || DEFAULT_PARALLAX_PX)))

const parallaxY = useTransform(baseSpring, latest =>
  isStatic.value ? 0 : overscan.value - latest * overscan.value * 2,
)
</script>
