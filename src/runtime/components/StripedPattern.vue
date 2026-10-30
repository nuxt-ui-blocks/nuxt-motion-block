<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <div
      aria-hidden="true"
      :class="ui.pattern({ class: uiProps.ui?.pattern })"
      :style="{ backgroundImage }"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import stripedPattern from '../theme/striped-pattern'

export interface StripedPatternProps {
  /** Angle of the stripes, in degrees. */
  angle?: number
  /** Extra classes for the container. */
  class?: string
  /** Colour of a stripe. Any CSS colour works. */
  color?: string
  /** Space between two stripes, in pixels. */
  gap?: number
  /** Thickness of one stripe, in pixels. */
  width?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<StripedPatternProps>(), {
  angle: 45,
  class: undefined,
  color: 'var(--ui-border)',
  gap: 10,
  width: 1,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'stripedPattern', props, theme: stripedPattern })

/**
 * One stripe, then a gap as wide as the rest of the period. `transparent` stops
 * the gradient from blending the two, so the stripes stay crisp at any width.
 */
const backgroundImage = computed(() => {
  const period = props.width + props.gap

  return `repeating-linear-gradient(${props.angle}deg, ${props.color} 0px, ${props.color} ${props.width}px, transparent ${props.width}px, transparent ${period}px)`
})
</script>
