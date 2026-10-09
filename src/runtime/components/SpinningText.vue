<template>
  <Motion
    :class="cn('relative', className)"
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
      class="absolute left-1/2 top-1/2 inline-block"
      :style="getLetterStyle(index)"
    >
      {{ letter }}
    </Motion>
    <span class="sr-only">{{ children }}</span>
  </Motion>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'
import { cn } from '../utils/merge'

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
