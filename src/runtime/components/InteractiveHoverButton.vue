<template>
  <button
    type="button"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <span
      aria-hidden="true"
      :class="ui.dot({ class: uiProps.ui?.dot })"
    />
    <span :class="ui.label({ class: uiProps.ui?.label })">
      <slot />
    </span>
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="ui.arrow({ class: uiProps.ui?.arrow })"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import interactiveHoverButton from '../theme/interactive-hover-button'

export interface InteractiveHoverButtonProps {
  /** Extra classes for the button. */
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<InteractiveHoverButtonProps>(), {
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'interactiveHoverButton', props, theme: interactiveHoverButton })
</script>
