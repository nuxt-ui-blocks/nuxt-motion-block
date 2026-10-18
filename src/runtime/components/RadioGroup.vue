<script setup lang="ts">
import { computed } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import radioGroup from '../theme/radio-group'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'radioGroup',
  props,
  theme: radioGroup,
})

const motionUi = computed(() => ({
  ...uiProps.ui,
  root: ui.value.root({ class: [uiProps.ui?.root, uiProps.class] }),
  indicator: ui.value.indicator({ class: uiProps.ui?.indicator }),
}))
</script>

<template>
  <URadioGroup
    v-bind="$attrs"
    :ui="motionUi"
  />
</template>

<style>
[data-slot="item"] {
  animation: m-radio-item-in 250ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

[data-slot="item"]:nth-of-type(2) { animation-delay: 40ms; }
[data-slot="item"]:nth-of-type(3) { animation-delay: 80ms; }
[data-slot="item"]:nth-of-type(4) { animation-delay: 120ms; }
[data-slot="item"]:nth-of-type(5) { animation-delay: 160ms; }
[data-slot="item"]:nth-of-type(6) { animation-delay: 200ms; }
[data-slot="item"]:nth-of-type(7) { animation-delay: 240ms; }
[data-slot="item"]:nth-of-type(8) { animation-delay: 280ms; }
[data-slot="item"]:nth-of-type(9) { animation-delay: 320ms; }
[data-slot="item"]:nth-of-type(n + 10) { animation-delay: 360ms; }

@keyframes m-radio-item-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

[data-slot="base"] {
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

[data-slot="base"]:hover {
  transform: scale(1.1);
}

.m-radio-indicator[data-state="checked"]::after {
  animation: m-radio-dot-in 250ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes m-radio-dot-in {
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-slot="item"],
  .m-radio-indicator[data-state="checked"]::after {
    animation: none;
  }

  [data-slot="base"] {
    transition: none;
  }

  [data-slot="base"]:hover {
    transform: none;
  }
}
</style>
