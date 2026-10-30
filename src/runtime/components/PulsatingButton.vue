<template>
  <button
    type="button"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <Motion
      as="span"
      aria-hidden="true"
      :class="ui.pulse({ class: uiProps.ui?.pulse })"
      :animate="shouldReduceMotion ? undefined : { scale: [1, 1.35], opacity: [0.55, 0] }"
      :transition="{ duration, repeat: Infinity, ease: 'easeOut' }"
    />
    <span :class="ui.label({ class: uiProps.ui?.label })">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import pulsatingButton from '../theme/pulsating-button'

export interface PulsatingButtonProps {
  /** Extra classes for the button. */
  class?: string
  /** Seconds one pulse takes to expand and fade. */
  duration?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<PulsatingButtonProps>(), {
  class: undefined,
  duration: 1.6,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'pulsatingButton', props, theme: pulsatingButton })

const shouldReduceMotion = useReducedMotion()
</script>
