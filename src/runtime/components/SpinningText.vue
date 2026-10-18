<template>
  <Motion
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class, props.className] })"
    :style="containerStyle"
    initial="hidden"
    animate="visible"
    :variants="containerVariants"
    :transition="finalTransition"
  >
    <Motion
      v-for="(letter, index) in letters"
      :key="`${index}-${letter}`"
      aria-hidden="true"
      :variants="itemVariants"
      :class="ui.letter({ class: uiProps.ui?.letter })"
      :style="getLetterStyle(index)"
    >
      {{ letter }}
    </Motion>
    <span :class="ui.srLabel({ class: uiProps.ui?.srLabel })">{{ children }}</span>
  </Motion>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import spinningText from '../theme/spinning-text'

// Types
interface Transition {
  repeat?: number | string
  ease?: string
  duration?: number
  [key: string]: any
}

interface Variants {
  [key: string]: any
}

interface SpinningTextProps {
  children: string
  style?: object
  duration?: number
  className?: string
  class?: string
  ui?: Record<string, any>
  reverse?: boolean
  fontSize?: number
  radius?: number
  transition?: Transition
  variants?: {
    container?: Variants
    item?: Variants
  }
}

const props = withDefaults(defineProps<SpinningTextProps>(), {
  duration: 10,
  reverse: false,
  fontSize: 1,
  radius: 5,
  transition: () => ({}),
  variants: () => ({}),
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'spinningText',
  props,
  theme: spinningText,
})

// Constants
const BASE_TRANSITION = {
  repeat: Infinity,
  ease: 'linear',
}

const BASE_ITEM_VARIANTS = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
}

// Computed properties
const letters = computed(() => props.children.split(''))
const totalLetters = computed(() => letters.value.length)

const finalTransition = computed(() => ({
  ...BASE_TRANSITION,
  ...props.transition,
  duration: props.transition.duration ?? props.duration,
}))

const containerVariants = computed(() => ({
  visible: { rotate: props.reverse ? -360 : 360 },
  ...props.variants.container,
}))

const itemVariants = computed(() => ({
  ...BASE_ITEM_VARIANTS,
  ...props.variants.item,
}))

const containerStyle = computed(() => ({
  ...props.style,
}))

// Methods
const getLetterStyle = (index: number) => {
  const rotateDegree = (360 / totalLetters.value * index)
  const translateY = `calc(var(--radius, ${props.radius}) * -1ch)`

  return {
    '--index': index,
    '--total': totalLetters.value,
    '--font-size': props.fontSize,
    '--radius': props.radius,
    'fontSize': `calc(var(--font-size, 2) * 1rem)`,
    'transform': `
      translate(-50%, -50%)
      rotate(${rotateDegree}deg)
      translateY(${translateY})
    `,
    'transformOrigin': 'center',
  }
}
</script>
