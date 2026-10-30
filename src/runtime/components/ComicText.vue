<template>
  <Motion
    as="span"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :initial="shouldReduceMotion ? false : 'hidden'"
    :animate="shouldReduceMotion ? undefined : 'visible'"
    :variants="containerVariants"
    :aria-label="text"
  >
    <Motion
      v-for="(char, index) in characters"
      :key="`${char}-${index}`"
      as="span"
      aria-hidden="true"
      :class="ui.char({ class: uiProps.ui?.char })"
      :variants="charVariants(index)"
    >
      {{ char === ' ' ? '\u00A0' : char }}
    </Motion>
  </Motion>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import comicText from '../theme/comic-text'

export interface ComicTextProps {
  /** Extra classes for the wrapper. */
  class?: string
  /** Seconds between two letters popping in. */
  stagger?: number
  /** Text to draw. Spaces are kept as gaps between words. */
  text?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<ComicTextProps>(), {
  class: undefined,
  stagger: 0.05,
  text: 'Boom!',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'comicText', props, theme: comicText })

const shouldReduceMotion = useReducedMotion()

const characters = computed(() => [...props.text])

const containerVariants = computed(() => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: props.stagger,
    },
  },
}))

/**
 * Each letter arrives from its own angle. The tilt is derived from the index
 * rather than drawn at random, so the server and the client agree.
 */
const charVariants = (index: number) => {
  const tilt = ((index % 5) - 2) * 6

  return {
    hidden: { opacity: 0, scale: 0.2, rotate: tilt, y: 12 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 380, damping: 18 },
    },
  }
}
</script>
