<template>
  <!-- @vue-ignore -->
  <Motion
    :as="component"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="computedStyle"
    :initial="{ backgroundPosition: '100% center' }"
    :animate="{ backgroundPosition: '0% center' }"
    :transition="{
      repeat: Infinity,
      duration,
      ease: 'linear',
    }"
  >
    {{ text }}
  </Motion>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import textShimmer from '../theme/text-shimmer'

interface TextShimmerProps {
  text?: string
  as?: string
  class?: string
  ui?: Record<string, any>
  duration?: number
  spread?: number
}

const props = withDefaults(defineProps<TextShimmerProps>(), {
  text: 'no text provided',
  as: 'p',
  class: undefined,
  ui: undefined,
  duration: 2,
  spread: 2,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'textShimmer',
  props,
  theme: textShimmer,
})

// Compute dynamic spread based on text length
const dynamicSpread = computed(() => {
  return props.text.length * props.spread
})

// Compute component style
const computedStyle = computed(() => {
  return {
    '--spread': `${dynamicSpread.value}px`,
    'backgroundImage': `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
  }
})

// Determine the component to render
const component = computed(() => props.as)
</script>
