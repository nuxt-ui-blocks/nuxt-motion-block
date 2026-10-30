<template>
  <button
    type="button"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <span
      aria-hidden="true"
      :class="ui.shine({ class: uiProps.ui?.shine })"
    />
    <span :class="ui.label({ class: uiProps.ui?.label })">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import shinyButton from '../theme/shiny-button'

export interface ShinyButtonProps {
  /** Extra classes for the button. */
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<ShinyButtonProps>(), {
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'shinyButton', props, theme: shinyButton })
</script>
