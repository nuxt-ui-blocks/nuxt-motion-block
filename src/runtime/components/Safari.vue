<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <div :class="ui.bar({ class: uiProps.ui?.bar })">
      <span
        v-for="tint in lights"
        :key="tint"
        aria-hidden="true"
        :class="ui.light({ class: [tint, uiProps.ui?.light] })"
      />
      <span :class="ui.address({ class: uiProps.ui?.address })">
        {{ url }}
      </span>
    </div>
    <div :class="ui.content({ class: uiProps.ui?.content })">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import safari from '../theme/safari'

export interface SafariProps {
  /** Extra classes for the frame. */
  class?: string
  ui?: Record<string, any>
  /** Text shown in the address bar. */
  url?: string
}

const props = withDefaults(defineProps<SafariProps>(), {
  class: undefined,
  ui: undefined,
  url: 'nuxt.com',
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'safari', props, theme: safari })

/** Window controls, in their macOS order. */
const lights = ['bg-red-500', 'bg-yellow-500', 'bg-green-500']
</script>
