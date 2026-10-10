<template>
  <main>
    <div
      :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
      v-bind="attrs"
    >
      <div
        :class="ui.mask({ class: uiProps.ui?.mask })"
        :style="auroraStyles"
      >
        <div
          :class="ui.aurora({ radial: props.showRadialGradient, class: uiProps.ui?.aurora })"
        />
      </div>
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { auroraBackground } from '../theme'

interface AuroraBackgroundProps {
  class?: string
  showRadialGradient?: boolean
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<AuroraBackgroundProps>(), {
  showRadialGradient: true,
})

const attrs = useAttrs()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'auroraBackground', props, theme: auroraBackground })

// Exact CSS variables from React code
const auroraStyles = {
  '--aurora': 'repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)',
  '--dark-gradient': 'repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)',
  '--white-gradient': 'repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)',
  '--blue-300': '#93c5fd',
  '--blue-400': '#60a5fa',
  '--blue-500': '#3b82f6',
  '--indigo-300': '#a5b4fc',
  '--violet-200': '#ddd6fe',
  '--black': '#000',
  '--white': '#fff',
  '--transparent': 'transparent',
}
</script>

<style>
@keyframes aurora {
  from {
    background-position: 50% 50%, 50% 50%;
  }
  to {
    background-position: 350% 50%, 350% 50%;
  }
}

.after\:animate-aurora::after {
  animation: aurora 60s linear infinite;
}
</style>
