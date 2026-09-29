<script setup lang="ts">
import { computed } from 'vue'
import { Motion, AnimatePresence } from 'motion-v'

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
}

const props = withDefaults(defineProps<TransitionPanelProps>(), {
  variants: () => ({}),
  transition: () => ({}),
  class: '',
  custom: undefined,
})

const motionProps = computed(() => {
  const { activeIndex, variants, transition, class: _class, custom } = props
  return { activeIndex, variants, transition, custom }
})
</script>

<template>
  <div :class="['relative', props.class]">
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
