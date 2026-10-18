<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <div :class="ui.inner({ class: uiProps.ui?.inner })">
      <!-- Left Gradient -->
      <Motion
        :initial="{ opacity: 0.5, width: '15rem' }"
        :while-in-view="{ opacity: 1, width: '30rem' }"
        :transition="{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }"
        :style="leftGradientStyle"
        :class="ui.leftGradient({ class: uiProps.ui?.leftGradient })"
      >
        <div :class="ui.leftMaskTop({ class: uiProps.ui?.leftMaskTop })" />
        <div :class="ui.leftMaskSide({ class: uiProps.ui?.leftMaskSide })" />
      </Motion>

      <!-- Right Gradient -->
      <Motion
        :initial="{ opacity: 0.5, width: '15rem' }"
        :while-in-view="{ opacity: 1, width: '30rem' }"
        :transition="{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }"
        :style="rightGradientStyle"
        :class="ui.rightGradient({ class: uiProps.ui?.rightGradient })"
      >
        <div :class="ui.rightMaskSide({ class: uiProps.ui?.rightMaskSide })" />
        <div :class="ui.rightMaskTop({ class: uiProps.ui?.rightMaskTop })" />
      </Motion>

      <!-- Background Effects -->
      <div :class="ui.bgBlur({ class: uiProps.ui?.bgBlur })" />
      <div :class="ui.bgOverlay({ class: uiProps.ui?.bgOverlay })" />
      <div
        :class="ui.centerGlow({ class: uiProps.ui?.centerGlow })"
        :style="centerColorStyle"
      />

      <!-- Animated Elements -->
      <Motion
        :initial="{ width: '8rem' }"
        :while-in-view="{ width: '16rem' }"
        :transition="{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }"
        :class="ui.glow({ class: uiProps.ui?.glow })"
        :style="glowColorStyle"
      />

      <Motion
        :initial="{ width: '15rem' }"
        :while-in-view="{ width: '30rem' }"
        :transition="{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }"
        :class="ui.line({ class: uiProps.ui?.line })"
        :style="lineColorStyle"
      />

      <div :class="ui.cover({ class: uiProps.ui?.cover })" />
    </div>

    <div :class="ui.content({ class: uiProps.ui?.content })">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import lampContainer from '../theme/lamp-container'

interface LampContainerProps {
  class?: string
  ui?: Record<string, any>
  fromColor?: string
  toColor?: string
  centerColor?: string
  glowColor?: string
  lineColor?: string
}

const props = withDefaults(defineProps<LampContainerProps>(), {
  class: undefined,
  ui: undefined,
  fromColor: 'var(--color-primary-500, #0ea5e9)',
  toColor: 'var(--color-primary-500, #0ea5e9)',
  centerColor: 'var(--color-primary-500, #0ea5e9)',
  glowColor: 'var(--color-primary-400, #38bdf8)',
  lineColor: 'var(--color-primary-400, #38bdf8)',
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'lampContainer', props, theme: lampContainer })

// Convert color prop to CSS variable or hex color
const getColorValue = (colorProp: string): string => {
  // If it's already a hex/rgb/hsl/color variable, return as is
  if (colorProp.startsWith('#') || colorProp.startsWith('rgb') || colorProp.startsWith('hsl') || colorProp.startsWith('var(')) {
    return colorProp
  }

  // Convert Tailwind color class to CSS variable
  // Remove 'bg-' prefix if present
  const cleanClass = colorProp.replace(/^bg-/, '')

  // Convert format: primary-500 => var(--color-primary-500)
  return `var(--color-${cleanClass})`
}

// Computed styles for all elements using inline styles
const leftGradientStyle = computed(() => ({
  backgroundImage: `conic-gradient(var(--conic-position), ${getColorValue(props.fromColor)}, transparent, transparent)`,
}))

const rightGradientStyle = computed(() => ({
  backgroundImage: `conic-gradient(var(--conic-position), transparent, transparent, ${getColorValue(props.toColor)})`,
}))

const centerColorStyle = computed(() => ({
  backgroundColor: getColorValue(props.centerColor),
}))

const glowColorStyle = computed(() => ({
  backgroundColor: getColorValue(props.glowColor),
}))

const lineColorStyle = computed(() => ({
  backgroundColor: getColorValue(props.lineColor),
}))
</script>
