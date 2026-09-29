<template>
  <svg
    v-if="spec.specular"
    aria-hidden="true"
    class="pointer-events-none absolute h-0 w-0"
  >
    <title>Plaster relief filter</title>
    <filter :id="filterId">
      <!--
        Blur the alpha channel into a height field, light that field, then clip
        the result back to the original silhouette. A stack of box-shadows can
        only darken; this is what actually produces a lit surface.
      -->
      <feGaussianBlur
        in="SourceAlpha"
        result="relief"
        :stdDeviation="depth"
      />
      <feSpecularLighting
        in="relief"
        lighting-color="white"
        result="specular"
        :specular-constant="SPECULAR_CONSTANT"
        :specular-exponent="SPECULAR_EXPONENT"
        :surface-scale="SPECULAR_SURFACE_SCALE"
      >
        <feDistantLight
          :azimuth="lightAzimuth"
          :elevation="SPECULAR_ELEVATION"
        />
      </feSpecularLighting>
      <feComposite
        in="specular"
        in2="SourceAlpha"
        operator="in"
        result="clipped"
      />
      <feComposite
        in="SourceGraphic"
        in2="clipped"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        operator="arithmetic"
      />
    </filter>
  </svg>

  <component
    :is="props.as"
    :ref="surfaceRef"
    :class="['text-default', props.class]"
    :style="surfaceStyle"
    @pointerleave="tracksPointer ? resetLight() : undefined"
    @pointermove="tracksPointer ? trackPointer($event) : undefined"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { useReducedMotion } from 'motion-v'
import { EASE_IN_OUT } from '../utils/motion-tokens'

export type EmbossSurfaceVariant = 'emboss' | 'deboss' | 'plaster' | 'metal-stamp'

export interface EmbossSurfaceProps {
  /** Element or component rendered as the material surface. Defaults to `div`. */
  as?: string
  class?: string
  /**
   * Base material colour. Any CSS colour; defaults to the page background.
   *
   * Upstream defaults to shadcn's `var(--background)`. That variable does not
   * exist under Nuxt UI, and an undefined custom property inside `color-mix()`
   * invalidates the whole colour, which silently drops the entire `box-shadow`
   * to `none` — a surface with no relief at all. `--ui-bg` is the equivalent.
   */
  color?: string
  /** Relief depth in pixels. */
  depth?: number
  /** Let the light angle follow the pointer on hover-capable devices. */
  interactive?: boolean
  /** Direction the light comes from, in degrees. `0` is right, `90` is up. */
  lightAngle?: number
  /** Shadow diffusion, `0` (hard) to `1` (soft). */
  softness?: number
  /** Material recipe used to build the relief. */
  variant?: EmbossSurfaceVariant
}

const props = withDefaults(defineProps<EmbossSurfaceProps>(), {
  as: 'div',
  class: '',
  color: 'var(--ui-bg)',
  depth: 2,
  interactive: false,
  lightAngle: 135,
  softness: 0.5,
  variant: 'emboss',
})

interface VariantSpec {
  blurScale: number
  hardEdge: boolean
  highlightMix: number
  inset: boolean
  invert: boolean
  shadeMix: number
  specular: boolean
}

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'
const SOFTNESS_SCALE = 2.4
const MIN_BLUR = 0.25
const DEGREES_PER_TURN = 360
const HARD_LAYER_SCALE = 1.8
const DROP_SHADOW_BLUR_SCALE = 0.6
const SPECULAR_ELEVATION = 42
const SPECULAR_CONSTANT = 0.9
const SPECULAR_EXPONENT = 18
const SPECULAR_SURFACE_SCALE = 3
const RADIANS_PER_DEGREE = Math.PI / 180
const RELIEF_TRANSITION = `box-shadow 240ms cubic-bezier(${EASE_IN_OUT.join(', ')})`

const VARIANTS: Record<EmbossSurfaceVariant, VariantSpec> = {
  'deboss': { blurScale: 1, hardEdge: false, highlightMix: 46, inset: true, invert: true, shadeMix: 34, specular: false },
  'emboss': { blurScale: 1, hardEdge: false, highlightMix: 46, inset: false, invert: false, shadeMix: 34, specular: false },
  'metal-stamp': { blurScale: 0.45, hardEdge: true, highlightMix: 72, inset: false, invert: false, shadeMix: 58, specular: false },
  'plaster': { blurScale: 1.8, hardEdge: false, highlightMix: 64, inset: true, invert: true, shadeMix: 26, specular: true },
}

const BLUR_VAR = 'calc(var(--es-blur) * 1px)'

const offsetLayer = (scale: number, blur: string, tint: string) =>
  `calc(var(--es-dx) * ${scale}px) calc(var(--es-dy) * ${scale}px) ${blur} ${tint}`

const buildShadow = (spec: VariantSpec, highlight: string, shade: string, prefix: string) => {
  const sign = spec.invert ? -1 : 1
  const layers = [
    `${prefix}${offsetLayer(sign, BLUR_VAR, highlight)}`,
    `${prefix}${offsetLayer(-sign, BLUR_VAR, shade)}`,
  ]
  if (spec.hardEdge) {
    layers.push(`${prefix}${offsetLayer(sign * HARD_LAYER_SCALE, '0px', highlight)}`)
    layers.push(`${prefix}${offsetLayer(-sign * HARD_LAYER_SCALE, '0px', shade)}`)
  }
  return layers.join(', ')
}

const shouldReduceMotion = useReducedMotion()
// The id is referenced from the surface's own `filter`, so it has to survive
// hydration; `useId` is stable across server and client, a random string is not.
const filterId = `es-${useId()}`
const surfaceRef = ref<HTMLElement | null>(null)
const isHoverDevice = ref(false)

onMounted(() => {
  const query = window.matchMedia(HOVER_QUERY)
  isHoverDevice.value = query.matches
  const handleChange = (event: MediaQueryListEvent) => {
    isHoverDevice.value = event.matches
  }
  query.addEventListener('change', handleChange)
  onBeforeUnmount(() => query.removeEventListener('change', handleChange))
})

const spec = computed(() => VARIANTS[props.variant])

const lightX = computed(() => Math.cos(props.lightAngle * RADIANS_PER_DEGREE) * props.depth)
const lightY = computed(() => -Math.sin(props.lightAngle * RADIANS_PER_DEGREE) * props.depth)
const lightAzimuth = computed(() => (DEGREES_PER_TURN - props.lightAngle) % DEGREES_PER_TURN)

const blur = computed(() =>
  Math.max(MIN_BLUR, props.depth * props.softness * SOFTNESS_SCALE * spec.value.blurScale),
)

const highlight = computed(() => `color-mix(in oklab, ${props.color}, white ${spec.value.highlightMix}%)`)
const shade = computed(() => `color-mix(in oklab, ${props.color}, black ${spec.value.shadeMix}%)`)

const tracksPointer = computed(
  () => props.interactive && !shouldReduceMotion.value && isHoverDevice.value,
)

/**
 * The pointer only sets a direction, never a distance: the relief depth is a
 * material property, so letting the light travel further with the cursor would
 * make the same surface look like a different one.
 */
const trackPointer = (event: PointerEvent) => {
  const element = surfaceRef.value
  if (!element) {
    return
  }
  const rect = element.getBoundingClientRect()
  const deltaX = event.clientX - (rect.left + rect.width / 2)
  const deltaY = event.clientY - (rect.top + rect.height / 2)
  const length = Math.hypot(deltaX, deltaY)
  if (length === 0) {
    return
  }
  element.style.setProperty('--es-dx', `${(deltaX / length) * props.depth}`)
  element.style.setProperty('--es-dy', `${(deltaY / length) * props.depth}`)
}

const resetLight = () => {
  const element = surfaceRef.value
  if (!element) {
    return
  }
  element.style.setProperty('--es-dx', `${lightX.value}`)
  element.style.setProperty('--es-dy', `${lightY.value}`)
}

const dropShadow = computed(() => {
  if (!spec.value.hardEdge) {
    return undefined
  }
  const softBlur = `calc(var(--es-blur) * ${DROP_SHADOW_BLUR_SCALE}px)`
  return `drop-shadow(${offsetLayer(1, softBlur, highlight.value)}) drop-shadow(${offsetLayer(-1, softBlur, shade.value)})`
})

const surfaceStyle = computed(() => ({
  '--es-blur': blur.value,
  '--es-dx': lightX.value,
  '--es-dy': lightY.value,
  'backgroundColor': props.color,
  'boxShadow': buildShadow(spec.value, highlight.value, shade.value, spec.value.inset ? 'inset ' : ''),
  'filter': spec.value.specular ? `url(#${filterId})` : dropShadow.value,
  'textShadow': buildShadow(spec.value, highlight.value, shade.value, ''),
  // The light snapping back to its resting angle on pointer-out should be
  // smooth, but a pointer chasing the light should not lag behind the cursor.
  'transition': shouldReduceMotion.value ? undefined : RELIEF_TRANSITION,
}))
</script>
