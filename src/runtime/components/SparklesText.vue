<template>
  <span :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <span :class="ui.text({ class: uiProps.ui?.text })">
      <slot>{{ text }}</slot>
    </span>
    <Motion
      v-for="sparkle in sparkles"
      :key="sparkle.id"
      as="svg"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      :class="ui.sparkle({ class: uiProps.ui?.sparkle })"
      :style="{
        left: `${sparkle.x}%`,
        top: `${sparkle.y}%`,
        width: `${sparkle.size}px`,
        height: `${sparkle.size}px`,
        marginLeft: `${-sparkle.size / 2}px`,
        marginTop: `${-sparkle.size / 2}px`,
        color: sparkle.color,
      }"
      :initial="{ scale: 0, opacity: 0 }"
      :animate="shouldReduceMotion ? { scale: 1, opacity: 0.6 } : { scale: [0, 1, 0], opacity: [0, 1, 0] }"
      :transition="{
        duration: sparkle.duration,
        repeat: Infinity,
        delay: sparkle.delay,
        repeatDelay: sparkle.pause,
        ease: 'easeInOut',
      }"
    >
      <path d="M12 0c.7 6.1 5.2 10.6 11.3 11.3C17.2 12 12.7 16.5 12 22.6 11.3 16.5 6.8 12 .7 11.3 6.8 10.6 11.3 6.1 12 0Z" />
    </Motion>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import sparklesText from '../theme/sparkles-text'

export interface SparklesTextProps {
  /** Extra classes for the wrapper. */
  class?: string
  /** Colours the sparkles cycle through. Defaults to the theme's primary colour. */
  colors?: string[]
  /** How many sparkles to scatter around the text. */
  count?: number
  /** Base size of a sparkle, in pixels. */
  size?: number
  /** Text to draw. Ignored when the default slot is filled. */
  text?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<SparklesTextProps>(), {
  class: undefined,
  colors: () => [],
  count: 10,
  size: 14,
  text: '',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'sparklesText', props, theme: sparklesText })

const shouldReduceMotion = useReducedMotion()

/** A tiny deterministic PRNG keeps the server and the client in agreement. */
const random = (seed: number) => {
  const value = Math.sin(seed * 127.1) * 43758.5453
  return value - Math.floor(value)
}

const sparkles = computed(() => Array.from({ length: props.count }, (_, index) => {
  const seed = index + 1

  return {
    id: index,
    x: random(seed) * 100,
    y: random(seed + 17) * 100,
    size: props.size * (0.55 + random(seed + 31) * 0.7),
    duration: 1.4 + random(seed + 53) * 1.6,
    delay: random(seed + 71) * 1.6,
    pause: random(seed + 97) * 1.8,
    /** Left undefined when there is no custom palette, so the theme's colour wins. */
    color: props.colors.length > 0 ? props.colors[index % props.colors.length] : undefined,
  }
}))
</script>
