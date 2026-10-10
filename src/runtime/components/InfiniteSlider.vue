<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <div
      :class="ui.content({ class: [uiProps.ui?.content, className] })"
      :style="style"
    >
      <slot />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import infiniteSlider from '../theme/infinite-slider'

type Props = {
  className?: string
  duration?: number
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  duration: 40,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'infiniteSlider', props, theme: infiniteSlider })

const style = computed(() => ({
  animationDuration: `${props.duration}s`,
}))
</script>

<style scoped>
.infinite-slider-content {
  display: flex;
  width: fit-content;
  animation-name: scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
