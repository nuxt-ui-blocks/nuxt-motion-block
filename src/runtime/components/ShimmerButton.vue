<template>
  <button
    type="button"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <Motion
      as="span"
      aria-hidden="true"
      :class="ui.shimmer({ class: uiProps.ui?.shimmer })"
      :animate="shouldReduceMotion ? undefined : { x: ['-100%', '300%'] }"
      :transition="{ duration, repeat: Infinity, ease: 'linear' }"
    />
    <span :class="ui.label({ class: uiProps.ui?.label })">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import shimmerButton from '../theme/shimmer-button'

export interface ShimmerButtonProps {
  /** Extra classes for the button. */
  class?: string
  /** Seconds one sweep of the shimmer takes. */
  duration?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<ShimmerButtonProps>(), {
  class: undefined,
  duration: 2.4,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'shimmerButton', props, theme: shimmerButton })

const shouldReduceMotion = useReducedMotion()
</script>
