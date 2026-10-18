<template>
  <Motion
    ref="rootEl"
    :style="computedStyles"
    :animate="currentAnimation"
    :class="ui.root({ blur: blurVariant, class: [uiProps.ui?.root, uiProps.class, scaleClass, blurDynamic] })"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Motion } from 'motion-v'
import type { Transition } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import glowEffect from '../theme/glow-effect'
import { useColorMode } from '#imports'
import { resolveColor } from '../utils/theme-color'

// Define props
const props = withDefaults(defineProps<{
  class?: string
  ui?: Record<string, any>
  style?: object
  colors?: string[]
  mode?: 'rotate' | 'pulse' | 'breathe' | 'colorShift' | 'flowHorizontal' | 'static'
  blur?: number | 'softest' | 'soft' | 'medium' | 'strong' | 'stronger' | 'strongest' | 'none'
  transition?: Transition
  scale?: number
  duration?: number
}>(), {
  class: undefined,
  ui: undefined,
  colors: () => ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
  mode: 'rotate',
  blur: 'medium',
  scale: 1,
  duration: 5,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'glowEffect',
  props,
  theme: glowEffect,
})

/**
 * `colors` accepts a theme token (`'primary'`, `var(--ui-primary)`) or a literal
 * colour per entry. Resolve each against the active theme so the CSS gradient
 * strings are built from concrete colours, not a bare token the browser drops.
 */
const colorMode = useColorMode()
const rootEl = ref<HTMLElement | null>(null)
const resolvedColors = ref<string[]>([...props.colors])

const resolveColors = () => {
  const target = rootEl.value instanceof HTMLElement ? rootEl.value : undefined
  resolvedColors.value = props.colors.map(color => resolveColor(color, { target }) ?? color)
}

watch([() => props.colors, () => colorMode.value], resolveColors)
onMounted(resolveColors)

// Base transition configuration
const BASE_TRANSITION = {
  repeat: Infinity,
  duration: props.duration,
  ease: 'linear',
} as Transition

// Animation configurations
const animations = computed(() => {
  const { mode, scale, transition } = props
  const colors = resolvedColors.value

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

const blurVariant = computed(() =>
  typeof props.blur === 'string' ? props.blur : undefined,
)

const blurDynamic = computed(() =>
  typeof props.blur === 'number' ? `blur-[${props.blur}px]` : undefined,
)

const scaleClass = computed(() => `scale-[${props.scale}]`)

// Computed styles
const computedStyles = computed(() => ({
  ...props.style,
  willChange: 'transform',
  backfaceVisibility: 'hidden',
}))
</script>
