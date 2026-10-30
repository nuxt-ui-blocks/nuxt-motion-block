<template>
  <div :class="ui.root({ cols: props.cols, class: [uiProps.ui?.root, uiProps.class] })">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import bentoGrid from '../theme/bento-grid'

export interface BentoGridProps {
  /** Extra classes for the grid. */
  class?: string
  /** Column count from `md` upwards. `1` keeps a single column at every width. */
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<BentoGridProps>(), {
  class: undefined,
  cols: 3,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'bentoGrid', props, theme: bentoGrid })
</script>
