<template>
  <span :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <span
      v-for="(letter, i) in letters"
      :key="i"
      :class="ui.letter({ class: uiProps.ui?.letter })"
      aria-hidden="true"
    >
      <!-- @vue-ignore -->
      <Motion
        as="span"
        :class="ui.enter({ class: uiProps.ui?.enter })"
        :initial="enterInitial"
        :animate="enterAnimate"
        :transition="{
          ...transition,
          duration,
          delay: getEnterDelay(i),
        }"
      >
        {{ letter === ' ' ? '\u00A0' : letter }}
      </Motion>
      <!-- @vue-ignore -->
      <Motion
        as="span"
        :class="ui.exit({ class: uiProps.ui?.exit })"
        :initial="exitInitial"
        :animate="exitAnimate"
        :transition="{
          ...transition,
          duration,
          delay: getExitDelay(i),
        }"
        @motioncomplete="i === letters.length - 1 ? onAnimationComplete?.() : undefined"
      >
        {{ letter === ' ' ? '\u00A0' : letter }}
      </Motion>
      <span :class="ui.placeholder({ class: uiProps.ui?.placeholder })">
        {{ letter === ' ' ? '\u00A0' : letter }}
      </span>
    </span>
    <span :class="ui.srOnly({ class: uiProps.ui?.srOnly })">{{ children }}</span>
  </span>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import textRoll from '../theme/text-roll'

interface TextRollProps {
  children?: string
  duration?: number
  getEnterDelay?: (index: number) => number
  getExitDelay?: (index: number) => number
  class?: string
  ui?: Record<string, any>
  transition?: object
  variants?: {
    enter: {
      initial: object | string | boolean
      animate: object | string
    }
    exit: {
      initial: object | string | boolean
      animate: object | string
    }
  }
  onAnimationComplete?: () => void
}

const props = withDefaults(defineProps<TextRollProps>(), {
  children: '',
  duration: 0.5,
  getEnterDelay: (i: number) => i * 0.1,
  getExitDelay: (i: number) => i * 0.1 + 0.2,
  class: undefined,
  ui: undefined,
  className: '',
  transition: () => ({ ease: 'easeIn' }),
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'textRoll',
  props,
  theme: textRoll,
})

// Default variants
const defaultVariants = {
  enter: {
    initial: { rotateX: 0 },
    animate: { rotateX: 90 },
  },
  exit: {
    initial: { rotateX: 90 },
    animate: { rotateX: 0 },
  },
}

// Compute variants with fallback to defaults
const enterInitial = computed(() => {
  return props.variants?.enter?.initial || defaultVariants.enter.initial
})

const enterAnimate = computed(() => {
  return props.variants?.enter?.animate || defaultVariants.enter.animate
})

const exitInitial = computed(() => {
  return props.variants?.exit?.initial || defaultVariants.exit.initial
})

const exitAnimate = computed(() => {
  return props.variants?.exit?.animate || defaultVariants.exit.animate
})

// Split text into letters
const letters = computed(() => {
  return props.children.split('')
})
</script>
