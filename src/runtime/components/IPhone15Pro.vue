<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{ width: `${width}px` }"
  >
    <div :class="ui.frame({ class: uiProps.ui?.frame })">
      <div :class="ui.screen({ class: uiProps.ui?.screen })">
        <span
          aria-hidden="true"
          :class="ui.island({ class: uiProps.ui?.island })"
        />
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import iPhone15Pro from '../theme/iphone-15-pro'

export interface IPhone15ProProps {
  /** Extra classes for the outer wrapper. */
  class?: string
  ui?: Record<string, any>
  /** Width of the phone, in pixels. The screen keeps its 9:19.5 aspect ratio. */
  width?: number
}

const props = withDefaults(defineProps<IPhone15ProProps>(), {
  class: undefined,
  ui: undefined,
  width: 280,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'iPhone15Pro', props, theme: iPhone15Pro })
</script>
