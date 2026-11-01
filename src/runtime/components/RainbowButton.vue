<template>
  <button
    type="button"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <Motion
      as="span"
      aria-hidden="true"
      :class="ui.gradient({ class: uiProps.ui?.gradient })"
      :animate="shouldReduceMotion ? undefined : { rotate: 360 }"
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
import rainbowButton from '../theme/rainbow-button'

export interface RainbowButtonProps {
  /** Extra classes for the button. */
  class?: string
  /** Seconds one full turn of the gradient takes. */
  duration?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<RainbowButtonProps>(), {
  class: undefined,
  duration: 4,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'rainbowButton', props, theme: rainbowButton })

const shouldReduceMotion = useReducedMotion()
</script>
