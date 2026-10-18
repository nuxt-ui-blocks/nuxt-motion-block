<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import textGlitchNew from '../theme/text-glitch-new'

interface GlitchTextProps {
  text: string
  speed?: number
  enableShadows?: boolean
  enableOnHover?: boolean
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<GlitchTextProps>(), {
  speed: 0.5,
  enableShadows: true,
  enableOnHover: false,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'textGlitchNew', props, theme: textGlitchNew })

interface CustomCSSProperties extends CSSProperties {
  // Custom properties for shadow offset (used in after/before styles)
  '--after-shadow': string
  '--before-shadow': string

  // Custom properties for the full animation string (applied in after/before styles)
  '--after-animation': string
  '--before-animation': string
}

// --- CORE FIX: Define the FULL animation string here ---
const inlineStyles = computed<CustomCSSProperties>(() => {
  // Calculate the speed-dependent animation strings
  const afterAnimationString = `glitch ${props.speed * 3}s infinite linear alternate-reverse`
  const beforeAnimationString = `glitch ${props.speed * 2}s infinite linear alternate-reverse`

  return {
    '--after-shadow': props.enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': props.enableShadows ? '5px 0 cyan' : 'none',

    // Store the full animation value in a CSS variable
    '--after-animation': afterAnimationString,
    '--before-animation': beforeAnimationString,
  }
})
</script>

<template>
  <div
    :style="inlineStyles"
    :data-text="text"
    :class="ui.root({ enableOnHover: props.enableOnHover, class: [uiProps.ui?.root, uiProps.class] })"
  >
    {{ text }}
  </div>
</template>

<style>
/* 1. Define your @keyframes (REQUIRED for the hover effect) */
@keyframes glitch {
  /* These keyframes define the clip-path movement for the glitch */
  0% { clip-path: inset(20% 0 50% 0); }
  5% { clip-path: inset(10% 0 60% 0); }
  10% { clip-path: inset(15% 0 55% 0); }
  15% { clip-path: inset(25% 0 35% 0); }
  20% { clip-path: inset(30% 0 40% 0); }
  25% { clip-path: inset(40% 0 20% 0); }
  30% { clip-path: inset(10% 0 60% 0); }
  35% { clip-path: inset(15% 0 55% 0); }
  40% { clip-path: inset(25% 0 35% 0); }
  45% { clip-path: inset(30% 0 40% 0); }
  50% { clip-path: inset(20% 0 50% 0); }
  55% { clip-path: inset(10% 0 60% 0); }
  60% { clip-path: inset(15% 0 55% 0); }
  65% { clip-path: inset(25% 0 35% 0); }
  70% { clip-path: inset(30% 0 40% 0); }
  75% { clip-path: inset(40% 0 20% 0); }
  80% { clip-path: inset(20% 0 50% 0); }
  85% { clip-path: inset(10% 0 60% 0); }
  90% { clip-path: inset(15% 0 55% 0); }
  95% { clip-path: inset(25% 0 35% 0); }
  100% { clip-path: inset(30% 0 40% 0); }
}

/* 2. Register the custom animation utilities (REQUIRED for the hover effect) */
  .animate-glitch-after {
    animation: glitch var(--after-duration) infinite linear alternate-reverse;
  }

  .animate-glitch-before {
    animation: glitch var(--before-duration) infinite linear alternate-reverse;
  }
</style>
