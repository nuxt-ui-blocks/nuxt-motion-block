<script setup lang="ts">
import { computed, useId, type Component } from 'vue'

export interface GooeyFilterProps {
  /** Wrapper element or component. Defaults to a `div`. */
  as?: string | Component
  /** Extra classes for the wrapper. */
  class?: string
  /** Alpha threshold of the merge. Higher pulls more of the blur into the shape. */
  contrast?: number
  /** Render the children without the filter. */
  disabled?: boolean
  /** Shorthand that sets both `strength` and the matching `contrast`. */
  intensity?: number
  /** Blur radius used before the contrast pass, in pixels. */
  strength?: number
}

const props = withDefaults(defineProps<GooeyFilterProps>(), {
  as: 'div',
  class: undefined,
  contrast: undefined,
  disabled: false,
  intensity: undefined,
  strength: undefined,
})

const DEFAULT_STRENGTH = 8
const DEFAULT_CONTRAST = 18
const CONTRAST_TO_STRENGTH_RATIO = DEFAULT_CONTRAST / DEFAULT_STRENGTH
const MATRIX_ALPHA_OFFSET_RATIO = -0.5

const filterId = `gooey-${useId().replace(/[^\w-]/g, '')}`

const resolvedStrength = computed(() => props.strength ?? props.intensity ?? DEFAULT_STRENGTH)
const resolvedContrast = computed(
  () =>
    props.contrast
    ?? (props.intensity === undefined
      ? DEFAULT_CONTRAST
      : props.intensity * CONTRAST_TO_STRENGTH_RATIO),
)

const wrapperStyle = computed(() =>
  props.disabled ? undefined : { filter: `url(#${filterId})` },
)

const matrixValues = computed(
  () =>
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${resolvedContrast.value} ${
      resolvedContrast.value * MATRIX_ALPHA_OFFSET_RATIO
    }`,
)
</script>

<template>
  <svg
    v-if="!props.disabled"
    aria-hidden="true"
    class="absolute"
    style="height: 0; width: 0; overflow: hidden"
  >
    <defs>
      <filter :id="filterId">
        <feGaussianBlur
          in="SourceGraphic"
          result="blur"
          :stdDeviation="resolvedStrength"
        />
        <feColorMatrix
          in="blur"
          result="goo"
          type="matrix"
          :values="matrixValues"
        />
        <feComposite
          in="SourceGraphic"
          in2="goo"
          operator="atop"
        />
      </filter>
    </defs>
  </svg>

  <component
    :is="props.as"
    :class="props.class"
    :style="wrapperStyle"
  >
    <slot />
  </component>
</template>
