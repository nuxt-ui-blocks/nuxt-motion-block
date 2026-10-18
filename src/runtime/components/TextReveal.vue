<template>
  <span
    ref="containerRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    role="text"
    :aria-label="accessibilityLabel"
    :aria-live="isAnimating ? 'polite' : 'off'"
    :aria-busy="isAnimating"
    @click="handleClick"
  >
    <span
      v-for="(char, index) in chars"
      :key="`${char}-${index}`"
      :class="ui.char({ class: [uiProps.ui?.char, props.charClass] })"
      aria-hidden="true"
    >
      <!-- @vue-ignore -->
      <Motion
        as="span"
        :initial="initialVariant"
        :animate="shouldAnimate ? getCharAnimateVariant(index) : initialVariant"
        :transition="getCharTransition(index)"
        :class="ui.charInner({ class: uiProps.ui?.charInner })"
      >
        {{ char === ' ' ? '\u00A0' : char }}
      </Motion>
    </span>
    <!-- Screen reader accessible text -->
    <span :class="ui.srOnly({ class: uiProps.ui?.srOnly })">{{ props.text }}</span>
  </span>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { ref, computed, watch, onMounted } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import textReveal from '../theme/text-reveal'

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'random'
type RevealEffect = 'fade' | 'slide' | 'bounce' | 'rotate' | 'scale' | 'blur'

interface TextRevealProps {
  text?: string
  direction?: RevealDirection
  effect?: RevealEffect
  stagger?: number
  duration?: number
  delay?: number
  startOnView?: boolean
  once?: boolean
  class?: string
  ui?: Record<string, any>
  charClass?: string
  trigger?: boolean
  ariaLabel?: string
  reduceMotion?: boolean
}

const props = withDefaults(defineProps<TextRevealProps>(), {
  text: '',
  direction: 'up',
  effect: 'slide',
  stagger: 0.05,
  duration: 0.6,
  delay: 0,
  startOnView: true,
  once: true,
  class: undefined,
  ui: undefined,
  charClass: '',
  trigger: undefined,
  ariaLabel: '',
  reduceMotion: false,
})

const emit = defineEmits(['complete', 'click'])

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'textReveal',
  props,
  theme: textReveal,
})

const containerRef = ref<HTMLElement>()
const isVisible = useElementVisibility(containerRef, {
  threshold: 0.1,
  rootMargin: '50px',
})
const hasAnimated = ref(false)
const isAnimating = ref(false)

// Check for reduced motion preference
const prefersReducedMotion = ref(false)
if (import.meta.client) {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Accessibility label
const accessibilityLabel = computed(() => {
  return props.ariaLabel || `Animated text: ${props.text}`
})

const chars = computed(() => {
  return props.text.split('')
})

const shouldAnimate = computed(() => {
  if (props.trigger !== undefined) {
    return props.trigger
  }
  // If startOnView is false, always animate (unless already animated and once=true)
  if (!props.startOnView) {
    return !props.once || !hasAnimated.value
  }
  // If startOnView is true, animate when visible (unless already animated and once=true)
  return isVisible.value && (!props.once || !hasAnimated.value)
})

// Base animation variants
const getBaseVariant = (effect: RevealEffect, direction: RevealDirection, isInitial: boolean) => {
  const variants: Record<RevealEffect, any> = {
    fade: {
      opacity: isInitial ? 0 : 1,
    },
    slide: {
      opacity: isInitial ? 0 : 1,
      y: isInitial ? getDirectionOffset(direction, 'y') : 0,
      x: isInitial ? getDirectionOffset(direction, 'x') : 0,
    },
    bounce: {
      opacity: isInitial ? 0 : 1,
      y: isInitial ? getDirectionOffset(direction, 'y') : 0,
      scale: isInitial ? 0.8 : 1,
    },
    rotate: {
      opacity: isInitial ? 0 : 1,
      rotateX: isInitial ? (direction === 'up' ? -90 : direction === 'down' ? 90 : 0) : 0,
      rotateY: isInitial ? (direction === 'left' ? -90 : direction === 'right' ? 90 : 0) : 0,
    },
    scale: {
      opacity: isInitial ? 0 : 1,
      scale: isInitial ? 0 : 1,
    },
    blur: {
      opacity: isInitial ? 0 : 1,
      filter: isInitial ? 'blur(10px)' : 'blur(0px)',
      y: isInitial ? getDirectionOffset(direction, 'y') : 0,
    },
  }

  return variants[effect] || variants.slide
}

const getDirectionOffset = (direction: RevealDirection, axis: 'x' | 'y') => {
  if (direction === 'random') {
    return Math.random() * 40 - 20
  }

  const offsets = {
    up: { x: 0, y: 30 },
    down: { x: 0, y: -30 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  }

  return offsets[direction][axis]
}

const initialVariant = computed(() => {
  return getBaseVariant(props.effect, props.direction, true)
})

const getCharAnimateVariant = () => {
  // Always return the final variant - Motion will handle the animation
  return getBaseVariant(props.effect, props.direction, false)
}

const getCharTransition = (index: number) => {
  // Respect reduced motion preferences
  if (prefersReducedMotion.value || props.reduceMotion) {
    return {
      duration: 0.1,
      delay: 0,
      ease: 'easeInOut',
    }
  }

  const baseTransition = {
    duration: props.duration,
    delay: props.delay + (index * props.stagger),
    ease: props.effect === 'bounce' ? 'easeOut' : 'easeInOut',
  }

  if (props.effect === 'bounce') {
    return {
      ...baseTransition,
      type: 'spring',
      stiffness: 300,
      damping: 10,
    }
  }

  return baseTransition
}

// Handle click event
const handleClick = () => {
  emit('click')
}

// Watch for animation completion
watch(hasAnimated, (newVal) => {
  if (newVal) {
    emit('complete')
  }
})

// Lifecycle hooks
onMounted(() => {
  // Set initial animation state
  if (!props.startOnView && !props.once) {
    hasAnimated.value = false
  }
})
</script>
