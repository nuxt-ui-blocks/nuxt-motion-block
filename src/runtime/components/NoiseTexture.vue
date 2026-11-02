<template>
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <filter :id="filterId">
      <feTurbulence
        type="fractalNoise"
        :baseFrequency="frequency"
        :numOctaves="octaves"
        stitchTiles="stitch"
      />
      <feColorMatrix
        type="saturate"
        values="0"
      />
      <feComponentTransfer>
        <feFuncR
          type="linear"
          :slope="slope"
        />
        <feFuncG
          type="linear"
          :slope="slope"
        />
        <feFuncB
          type="linear"
          :slope="slope"
        />
      </feComponentTransfer>
    </filter>
    <rect
      width="100%"
      height="100%"
      :filter="`url(#${filterId})`"
      :opacity="noiseOpacity"
    />
  </svg>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import noiseTexture from '../theme/noise-texture'

export interface NoiseTextureProps {
  /** Extra classes for the `<svg>`. */
  class?: string
  /** `baseFrequency` for `feTurbulence`. Higher values give finer grain. */
  frequency?: number
  /** Opacity of the filled noise layer. */
  noiseOpacity?: number
  /** `numOctaves` for `feTurbulence`. More octaves add smaller-scale detail. */
  octaves?: number
  /** Linear slope applied to every channel after desaturation, so it sets the contrast. */
  slope?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<NoiseTextureProps>(), {
  class: undefined,
  frequency: 0.4,
  noiseOpacity: 0.6,
  octaves: 6,
  slope: 0.15,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'noiseTexture', props, theme: noiseTexture })

/** `useId` keeps the filter id stable between the server render and hydration. */
const filterId = `noise-${useId().replace(/[^\w-]/g, '')}`
</script>
