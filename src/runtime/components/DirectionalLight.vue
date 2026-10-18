<template>
  <svg
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 3787 2842"
    fill="none"
  >
    <g filter="url(#filter)">
      <ellipse
        cx="1924.71"
        cy="273.501"
        rx="1924.71"
        ry="273.501"
        transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
        :fill="resolvedFill"
        fill-opacity="0.21"
      />
    </g>
    <defs>
      <filter
        id="filter"
        x="0.860352"
        y="0.838989"
        width="3785.16"
        height="2840.26"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="151"
          result="effect1_foregroundBlur_1065_8"
        />
      </filter>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { useResolvedColor } from '../composables/useThemeColor'
import directionalLight from '../theme/directional-light'

interface SpotlightProps {
  class?: string
  ui?: Record<string, any>
  fill?: string
}

const props = withDefaults(defineProps<SpotlightProps>(), {
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'directionalLight',
  props,
  theme: directionalLight,
})

const resolvedFill = useResolvedColor(() => props.fill || 'white')
</script>

<style scoped>
@keyframes spotlight {
  0% {
    opacity: 0;
    transform: translate(-72%, -62%) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -40%) scale(1);
  }
}

.animate-spotlight {
  animation: spotlight 2s ease 0.75s 1 forwards;
}
</style>
