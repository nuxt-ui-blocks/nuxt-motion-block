<template>
  <motion.div
    v-bind="$attrs"
    :ref="setRoot"
    :class="cn('relative overflow-hidden', props.class)"
    :style="rootStyle"
    :transition="rootTransition"
    :while-hover="tracksPointer ? LIFT : undefined"
  >
    <svg
      v-if="displaces"
      aria-hidden="true"
      focusable="false"
      class="pointer-events-none absolute h-0 w-0"
    >
      <title>Refractive glass edge</title>
      <filter :id="filterId">
        <feTurbulence
          baseFrequency="0.016 0.024"
          numOctaves="2"
          result="noise"
          seed="7"
          type="fractalNoise"
        />
        <feGaussianBlur
          in="noise"
          result="soft"
          stdDeviation="1.4"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="soft"
          :scale="props.refraction"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
    <div
      aria-hidden="true"
      class="absolute"
      :style="bodyStyle"
    />
    <div
      aria-hidden="true"
      class="absolute inset-0 rounded-[inherit]"
      :style="rimStyle"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]"
    >
      <div
        :ref="setLayer(0)"
        aria-hidden="true"
        class="absolute inset-0 rounded-[inherit]"
        :style="chromaticStyle"
      />
      <template v-if="props.specular">
        <div
          :ref="setLayer(1)"
          aria-hidden="true"
          class="absolute"
          :style="specularStyle"
        />
        <div
          :ref="setLayer(2)"
          aria-hidden="true"
          class="absolute top-0"
          :style="sweepStyle"
        />
      </template>
      <div
        class="absolute inset-0 rounded-[inherit]"
        :style="bottomShadeStyle"
      />
    </div>
    <div
      v-if="props.border"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-[inherit]"
      :style="innerRingStyle"
    />
    <div
      class="relative"
      :style="contentStyle"
    >
      <slot />
    </div>
  </motion.div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { motion, useReducedMotion, useSpring } from 'motion-v'
import type { CSSProperties } from 'vue'
import { cn } from '../utils/merge'

defineOptions({ inheritAttrs: false })

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'
const SPECULAR_SIZE = 260
const SPECULAR_BASE_X = 0.3
const SPECULAR_BASE_Y = 0.28
const SWEEP_WIDTH = 42
const RIM_SHIFT = 6
const CONTENT_PADDING_MIN = 20
const CONTENT_PADDING_GAP = 10
const INNER_RADIUS_MIN = 6
const RIM_BLUR_RATIO = 0.12
const SPRING = { damping: 34, mass: 0.5, stiffness: 250 } as const
const LIFT = { scale: 1.006, y: -3 }
const SPECULAR_GRADIENT
  = 'radial-gradient(closest-side, oklch(1 0 0 / 0.3), oklch(1 0 0 / 0.07) 48%, transparent 74%)'
const SWEEP_GRADIENT
  = 'linear-gradient(to bottom, oklch(1 0 0 / 0.92), oklch(1 0 0 / 0.22) 55%, transparent)'
const SWEEP_MASK
  = 'linear-gradient(90deg, transparent, oklch(0 0 0) 42%, oklch(0 0 0) 58%, transparent)'
const CHROMATIC_RIM
  = 'linear-gradient(125deg, oklch(0.84 0.12 215 / 0.4) 0%, transparent 36%, transparent 64%, oklch(0.78 0.15 340 / 0.34) 100%)'
const BODY_EDGE
  = 'inset 0 1px 0 oklch(1 0 0 / 0.22), inset 0 0 0 1px oklch(1 0 0 / 0.07)'
const BOTTOM_SHADE
  = 'linear-gradient(to bottom, transparent 48%, oklch(0 0 0 / 0.2) 100%)'
const INNER_RING
  = 'inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 0 0 1px oklch(1 0 0 / 0.15), inset 0 -1px 0 oklch(1 0 0 / 0.12)'
const DROP_SHADOW
  = '0 26px 60px -26px oklch(0 0 0 / 0.6), 0 10px 26px -18px oklch(0 0 0 / 0.45)'

interface Props {
  class?: string
  blur?: number
  border?: boolean
  interactive?: boolean
  radius?: number
  refraction?: number
  rimWidth?: number
  shadow?: boolean
  specular?: boolean
  tint?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  blur: 11,
  border: true,
  interactive: true,
  radius: 26,
  refraction: 24,
  rimWidth: 12,
  shadow: true,
  specular: true,
  tint: 'oklch(1 0 0 / 0.1)',
})

function ringMask(width: number): CSSProperties {
  const maskImage
    = 'linear-gradient(oklch(0 0 0), oklch(0 0 0)), linear-gradient(oklch(0 0 0), oklch(0 0 0))'

  return {
    boxSizing: 'border-box',
    maskClip: 'content-box, border-box',
    maskComposite: 'exclude',
    maskImage,
    padding: `${width}px`,
    WebkitMaskClip: 'content-box, border-box',
    WebkitMaskComposite: 'xor',
    WebkitMaskImage: maskImage,
  }
}

const shouldReduceMotion = useReducedMotion()
const filterId = `glass-refraction-${useId().replace(/:/g, '')}`
const isHoverDevice = ref(false)
const canDisplace = ref(false)

const specularX = useSpring(0, SPRING)
const specularY = useSpring(0, SPRING)
const sweepX = useSpring(0, SPRING)
const rimX = useSpring(0, SPRING)
const rimY = useSpring(0, SPRING)

// motion-v's DOM pipeline only animates the props it owns (whileHover, animate,
// initial); MotionValues handed over through `style` are snapshotted once at
// mount and never re-read, so the three tracked layers below are plain divs
// whose transform a single rAF loop writes from the springs. The springs still
// supply the easing, and the loop avoids re-rendering Vue on every frame.
//
// `motion.div` renders the real element, but the listener props handed to it
// are only read on its first render, so `@pointermove` never reaches the DOM
// (it stays a no-op invoker once `tracksPointer` flips to true after mount).
// The root is therefore resolved through a function ref and observed directly.
const layerEls: (HTMLElement | undefined)[] = []
let rootEl: HTMLElement | undefined
let listening = false

function setLayer(index: number) {
  return (el: unknown) => {
    layerEls[index] = (el as HTMLElement | null) || undefined
  }
}

function setRoot(el: unknown) {
  const candidate
    = (el as { $el?: HTMLElement } | null)?.$el ?? (el as HTMLElement | null)
  rootEl = candidate instanceof HTMLElement ? candidate : undefined
}

function attachPointerListeners() {
  if (listening || !rootEl || !props.interactive) {
    return
  }

  rootEl.addEventListener('pointermove', handlePointerMove)
  rootEl.addEventListener('pointerleave', handlePointerLeave)
  listening = true
}

const tracksPointer = computed(
  () => props.interactive && isHoverDevice.value && !shouldReduceMotion.value,
)

let hoverMedia: MediaQueryList | undefined
let paintFrame = 0

function paint() {
  attachPointerListeners()

  const [chromatic, specular, sweep] = layerEls

  if (chromatic) {
    chromatic.style.transform = `translateX(${rimX.get()}px) translateY(${rimY.get()}px)`
  }

  if (specular) {
    specular.style.transform = `translateX(${specularX.get()}px) translateY(${specularY.get()}px)`
  }

  if (sweep) {
    sweep.style.transform = `translateX(${sweepX.get()}px)`
  }

  paintFrame = requestAnimationFrame(paint)
}

function handleHoverChange(event: MediaQueryListEvent) {
  isHoverDevice.value = event.matches
}

onMounted(() => {
  if (props.interactive) {
    paintFrame = requestAnimationFrame(paint)
  }

  if (typeof window.matchMedia === 'function') {
    hoverMedia = window.matchMedia(HOVER_QUERY)
    isHoverDevice.value = hoverMedia.matches
    hoverMedia.addEventListener('change', handleHoverChange)
  }

  // Only Chromium composites an SVG displacement inside `backdrop-filter`.
  // Elsewhere the rim keeps its blur and drops the bend rather than
  // invalidating the whole declaration.
  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return
  }

  const probe = `url(#${filterId}) blur(2px)`
  canDisplace.value
    = CSS.supports('backdrop-filter', probe)
      || CSS.supports('-webkit-backdrop-filter', probe)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(paintFrame)
  hoverMedia?.removeEventListener('change', handleHoverChange)

  if (listening) {
    rootEl?.removeEventListener('pointermove', handlePointerMove)
    rootEl?.removeEventListener('pointerleave', handlePointerLeave)
    listening = false
  }
})

function handlePointerMove(event: PointerEvent) {
  if (!tracksPointer.value) {
    return
  }

  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const pointerX = event.clientX - rect.left
  const pointerY = event.clientY - rect.top

  specularX.set(pointerX - rect.width * SPECULAR_BASE_X)
  specularY.set(pointerY - rect.height * SPECULAR_BASE_Y)
  sweepX.set(pointerX - rect.width / 2)
  rimX.set((pointerX / rect.width - 0.5) * RIM_SHIFT)
  rimY.set((pointerY / rect.height - 0.5) * RIM_SHIFT)
}

function handlePointerLeave() {
  specularX.set(0)
  specularY.set(0)
  sweepX.set(0)
  rimX.set(0)
  rimY.set(0)
}

const bodyFilters = computed(
  () => `blur(${props.blur}px) saturate(160%) brightness(1.02)`,
)
const rimBlur = computed(() =>
  Math.max(1, Math.round(props.blur * RIM_BLUR_RATIO)),
)
const rimFilters = computed(
  () => `blur(${rimBlur.value}px) saturate(172%) brightness(1.07)`,
)
const displaces = computed(
  () => props.refraction > 0 && canDisplace.value,
)
const rimBackdrop = computed(() =>
  displaces.value ? `url(#${filterId}) ${rimFilters.value}` : rimFilters.value,
)
const contentPadding = computed(() =>
  Math.max(CONTENT_PADDING_MIN, props.rimWidth + CONTENT_PADDING_GAP),
)
const rimMaskStyle = computed(() => ringMask(props.rimWidth))

const rootStyle = computed(() => ({
  borderRadius: `${props.radius}px`,
  boxShadow: props.shadow ? DROP_SHADOW : undefined,
}))
const rootTransition = computed(() =>
  shouldReduceMotion.value
    ? ({ duration: 0 } as const)
    : ({ bounce: 0, duration: 0.3, type: 'spring' } as const),
)

const bodyStyle = computed(() => ({
  backdropFilter: bodyFilters.value,
  backgroundColor: props.tint,
  borderRadius: `${Math.max(props.radius - props.rimWidth, INNER_RADIUS_MIN)}px`,
  boxShadow: BODY_EDGE,
  inset: `${props.rimWidth}px`,
  WebkitBackdropFilter: bodyFilters.value,
}))
const rimStyle = computed<CSSProperties>(() => ({
  ...rimMaskStyle.value,
  backdropFilter: rimBackdrop.value,
  WebkitBackdropFilter: rimBackdrop.value,
}))
const chromaticStyle = computed<CSSProperties>(() => ({
  ...rimMaskStyle.value,
  backgroundImage: CHROMATIC_RIM,
  mixBlendMode: 'plus-lighter',
}))
const specularStyle = computed<CSSProperties>(() => ({
  backgroundImage: SPECULAR_GRADIENT,
  height: `${SPECULAR_SIZE}px`,
  left: `${SPECULAR_BASE_X * 100}%`,
  marginLeft: `${-SPECULAR_SIZE / 2}px`,
  marginTop: `${-SPECULAR_SIZE / 2}px`,
  mixBlendMode: 'plus-lighter',
  top: `${SPECULAR_BASE_Y * 100}%`,
  width: `${SPECULAR_SIZE}px`,
  willChange: 'transform',
}))
const sweepStyle = computed<CSSProperties>(() => ({
  backgroundImage: SWEEP_GRADIENT,
  height: `${props.rimWidth + 2}px`,
  left: `${50 - SWEEP_WIDTH / 2}%`,
  maskImage: SWEEP_MASK,
  mixBlendMode: 'plus-lighter',
  WebkitMaskImage: SWEEP_MASK,
  width: `${SWEEP_WIDTH}%`,
  willChange: 'transform',
}))
const bottomShadeStyle = computed(() => ({ backgroundImage: BOTTOM_SHADE }))
const innerRingStyle = computed(() => ({ boxShadow: INNER_RING }))
const contentStyle = computed(() => ({ padding: `${contentPadding.value}px` }))
</script>
