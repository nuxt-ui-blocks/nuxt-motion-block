<template>
  <!-- @vue-ignore -->
  <Motion
    :as="component"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{ color: 'var(--base-color)' }"
  >
    <Motion
      v-for="(char, i) in characters"
      :key="i"
      :class="ui.char({ class: uiProps.ui?.char })"
      :initial="{
        translateZ: 0,
        scale: 1,
        rotateY: 0,
        color: 'var(--base-color)',
      }"
      :animate="{
        translateZ: [0, zDistance, 0],
        translateX: [0, xDistance, 0],
        translateY: [0, yDistance, 0],
        scale: [1, scaleDistance, 1],
        rotateY: [0, rotateYDistance, 0],
        color: [
          'var(--base-color)',
          'var(--base-gradient-color)',
          'var(--base-color)',
        ],
      }"
      :transition="{
        duration: duration,
        repeat: Infinity,
        repeatDelay: (characters.length * 0.05) / spread,
        delay: (i * duration * (1 / spread)) / characters.length,
        ease: 'easeInOut',
        ...transition,
      }"
    >
      {{ char }}
    </Motion>
  </Motion>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import textShimmerWave from '../theme/text-shimmer-wave'

interface TextShimmerWaveProps {
  text?: string
  as?: string
  class?: string
  ui?: Record<string, any>
  duration?: number
  zDistance?: number
  xDistance?: number
  yDistance?: number
  spread?: number
  scaleDistance?: number
  rotateYDistance?: number
  transition?: object
}

const props = withDefaults(defineProps<TextShimmerWaveProps>(), {
  text: '',
  as: 'p',
  class: undefined,
  ui: undefined,
  duration: 1,
  zDistance: 10,
  xDistance: 2,
  yDistance: -2,
  spread: 1,
  scaleDistance: 1.1,
  rotateYDistance: 10,
  transition: () => ({}),
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'textShimmerWave',
  props,
  theme: textShimmerWave,
})

// Split text into characters
const characters = computed(() => {
  return props.text.split('')
})

// Determine the component to render
const component = computed(() => props.as)
</script>
