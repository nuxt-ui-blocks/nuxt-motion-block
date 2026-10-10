<template>
  <Motion
    ref="containerRef"
    :class="ui.root({ class: [props.containerClass, uiProps.ui?.root] })"
    v-bind="$attrs"
  >
    <!-- @vue-ignore -->
    <Motion
      :key="currentWord"
      :initial="variants[animationStyle].initial"
      :animate="show ? 'animate' : 'exit'"
      :variants="variants[animationStyle]"
      :transition="{ duration: 0.5 }"
      :style="{
        perspective: animationStyle === 'flip' ? '1000px' : undefined,
      }"
      :class="ui.word({ class: [uiProps.ui?.word, uiProps.class] })"
    >
      {{ words[currentWord] }}
    </Motion>
  </Motion>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Motion } from 'motion-v'
import { useElementVisibility } from '@vueuse/core'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import wordRotate from '../theme/word-rotate'

interface WordRotateProps {
  words?: string[]
  duration?: number // ms each word is visible
  animationStyle?: 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'flip'
  loop?: boolean
  pauseDuration?: number // ms between word transitions
  class?: string
  containerClass?: string
  startOnView?: boolean
  once?: boolean
  inViewMargin?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<WordRotateProps>(), {
  words: () => [],
  duration: 1500,
  animationStyle: 'fade',
  loop: true,
  class: undefined,
  containerClass: '',
  pauseDuration: 300,
  startOnView: true,
  once: false,
  inViewMargin: '0px',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'wordRotate',
  props,
  theme: wordRotate,
})

const containerRef = ref<HTMLElement | null>(null)
const isInView = useElementVisibility(containerRef, { rootMargin: props.inViewMargin })
const hasAnimated = ref(false)
const currentWord = ref(0)
const show = ref(true)

let intervalId: ReturnType<typeof setInterval> | null = null
let timeoutId: ReturnType<typeof setTimeout> | null = null

// Animation variants
const variants = {
  'fade': {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut', // Use a valid easing string
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut', // Use a valid easing string
      },
    },
  },
  'slide-up': {
    initial: { opacity: 0, y: 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      y: -24,
      transition: {
        duration: 0.25,
        ease: [0.4, 0.0, 1, 1],
      },
    },
  },
  'slide-down': {
    initial: { opacity: 0, y: -24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      y: 24,
      transition: {
        duration: 0.25,
        ease: [0.4, 0.0, 1, 1],
      },
    },
  },
  'scale': {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.6,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 1, 1],
      },
    },
  },
  'flip': {
    initial: { opacity: 0, rotateX: 90 },
    animate: {
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        mass: 1,
      },
    },
    exit: {
      opacity: 0,
      rotateX: -90,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 1, 1],
      },
    },
  },
}

// Determine if we should start animation
const shouldStart = computed(() => {
  return !props.startOnView || (isInView.value && (!props.once || !hasAnimated.value))
})

// Start the animation
function startAnimation() {
  if (!shouldStart.value) return

  // Only run on client side
  if (typeof window === 'undefined') return

  hasAnimated.value = true

  intervalId = setInterval(() => {
    show.value = false

    timeoutId = setTimeout(() => {
      currentWord.value = props.loop
        ? (currentWord.value + 1) % props.words.length
        : Math.min(currentWord.value + 1, props.words.length - 1)

      show.value = true
    }, props.pauseDuration)
  }, props.duration + props.pauseDuration)
}
// Clean up intervals and timeouts
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})

// Watch for when the component comes into view
watch(isInView, (newValue) => {
  if (newValue && props.startOnView) {
    // Only run on client side
    if (typeof window !== 'undefined') {
      startAnimation()
    }
  }
})// Start immediately if startOnView is false
onMounted(() => {
  if (!props.startOnView) {
    startAnimation()
  }
})
</script>
