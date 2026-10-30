<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{ width: `${width}px` }"
  >
    <div :class="ui.frame({ class: uiProps.ui?.frame })">
      <div :class="ui.screen({ class: uiProps.ui?.screen })">
        <span
          aria-hidden="true"
          :class="ui.camera({ class: uiProps.ui?.camera })"
        />
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import android from '../theme/android'

export interface AndroidProps {
  /** Extra classes for the outer wrapper. */
  class?: string
  ui?: Record<string, any>
  /** Width of the phone, in pixels. The screen keeps its 9:19 aspect ratio. */
  width?: number
}

const props = withDefaults(defineProps<AndroidProps>(), {
  class: undefined,
  ui: undefined,
  width: 280,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'android', props, theme: android })
</script>
