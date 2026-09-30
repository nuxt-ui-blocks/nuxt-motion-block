<template>
  <Motion
    :style="computedStyles"
    :animate="currentAnimation"
    :class="glowClasses"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from 'motion-v'
import type { Transition } from 'motion-v'

// Define props
const props = withDefaults(defineProps<{
  class?: string
  style?: object
  colors?: string[]
  mode?: 'rotate' | 'pulse' | 'breathe' | 'colorShift' | 'flowHorizontal' | 'static'
  blur?: number | 'softest' | 'soft' | 'medium' | 'strong' | 'stronger' | 'strongest' | 'none'
  transition?: Transition
  scale?: number
  duration?: number
}>(), {
  colors: () => ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
  mode: 'rotate',
  blur: 'medium',
  scale: 1,
  duration: 5,
})

// Base transition configuration
const BASE_TRANSITION = {
  repeat: Infinity,
  duration: props.duration,
  ease: 'linear',
} as Transition

// Animation configurations
const animations = computed(() => {
  const { colors, mode, scale, transition } = props

  const configs = {
    rotate: {
      background: [
        `conic-gradient(from 0deg at 50% 50%, ${colors.join(', ')})`,
        `conic-gradient(from 360deg at 50% 50%, ${colors.join(', ')})`,
      ],
      transition: {
        ...(transition || BASE_TRANSITION),
      },
    },
    pulse: {
      background: colors.map(
        color => `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`,
      ),
      scale: [1 * scale, 1.1 * scale, 1 * scale],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        ...(transition || {
          ...BASE_TRANSITION,
          repeatType: 'mirror',
        }),
      },
    },
    breathe: {
      background: colors.map(
        color => `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`,
      ),
      scale: [1 * scale, 1.05 * scale, 1 * scale],
      transition: {
        ...(transition || {
          ...BASE_TRANSITION,
          repeatType: 'mirror',
        }),
      },
    },
    colorShift: {
      background: colors.map((color, index) => {
        const nextColor = colors[(index + 1) % colors.length]
        return `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${nextColor} 50%, ${color} 100%)`
      }),
      transition: {
        ...(transition || {
          ...BASE_TRANSITION,
          repeatType: 'mirror',
        }),
      },
    },
    flowHorizontal: {
      background: colors.map((color) => {
        const nextColor = colors[(colors.indexOf(color) + 1) % colors.length]
        return `linear-gradient(to right, ${color}, ${nextColor})`
      }),
      transition: {
        ...(transition || {
          ...BASE_TRANSITION,
          repeatType: 'mirror',
        }),
      },
    },
    static: {
      background: `linear-gradient(to right, ${colors.join(', ')})`,
    },
  }

  return configs[mode]
})

// Current animation based on mode
const currentAnimation = computed(() => animations.value)

// Blur classes mapping
const blurClasses = {
  softest: 'blur-xs',
  soft: 'blur-sm',
  medium: 'blur-md',
  strong: 'blur-lg',
  stronger: 'blur-xl',
  strongest: 'blur-2xl',
  none: 'blur-none',
}

// Compute blur class based on prop
const blurClass = computed(() => {
  if (typeof props.blur === 'number') {
    return `blur-[${props.blur}px]`
  }
  return blurClasses[props.blur]
})

// Combined classes
const glowClasses = computed(() => [
  'pointer-events-none absolute inset-0 h-full w-full',
  `scale-[${props.scale}] transform-gpu`,
  blurClass.value,
  props.class,
])

// Computed styles
const computedStyles = computed(() => ({
  ...props.style,
  willChange: 'transform',
  backfaceVisibility: 'hidden',
}))
</script>
