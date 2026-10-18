<script setup lang="ts">
import { computed } from 'vue'
import { Motion, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import transitionPanel from '../theme/transition-panel'

interface TransitionPanelProps {
  activeIndex: number
  variants?: {
    enter?: Record<string, any>
    center?: Record<string, any>
    exit?: Record<string, any>
  }
  transition?: Record<string, any>
  class?: string
  custom?: any
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<TransitionPanelProps>(), {
  variants: () => ({}),
  transition: () => ({}),
  class: '',
  custom: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'transitionPanel', props, theme: transitionPanel })

const motionProps = computed(() => {
  const { activeIndex, variants, transition, class: _class, custom } = props
  return { activeIndex, variants, transition, custom }
})
</script>

<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <AnimatePresence
      :initial="false"
      mode="popLayout"
      :custom="motionProps.custom"
    >
      <Motion
        :key="activeIndex"
        :variants="motionProps.variants"
        :transition="motionProps.transition"
        initial="enter"
        animate="center"
        exit="exit"
      >
        <slot />
      </Motion>
    </AnimatePresence>
  </div>
</template>
