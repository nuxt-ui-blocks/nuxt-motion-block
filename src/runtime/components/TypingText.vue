<script setup lang="ts">
import { ref, computed, onUnmounted, watch, onMounted } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { Motion, type MotionProps } from 'motion-v'
import { useElementVisibility } from '@vueuse/core'

// motion-v types `inViewOptions.margin` as an internal `MarginType` template-literal
// union that it never exports, so read it off the resolved `MotionProps` rather than
// the raw runtime props declaration.
type ResolvedMotionProps = Partial<ExtractPropTypes<MotionProps>>
type MotionInViewMargin = NonNullable<NonNullable<ResolvedMotionProps['inViewOptions']>['margin']>

interface TypingTextProps {
  /** Text to animate */
  text?: string
  /** Array of texts to cycle through */
  texts?: string[]
  /** Typing speed in milliseconds */
  speed?: number
  /** Delay before starting animation */
  delay?: number
  /** Whether to show cursor */
  showCursor?: boolean
  /** Cursor character */
  cursor?: string
  /** Cursor class */
  cursorClass?: string
  /** Whether to loop through texts */
  loop?: boolean
  /** Pause duration between loops */
  pauseDuration?: number
  /** Custom class */
  class?: string
  /** Callback when typing completes */
  onComplete?: () => void
  /** Whether to start animation when component enters viewport */
  startOnView?: boolean
  /** Whether to animate only once */
  once?: boolean
  /** The animation preset to use */
  animation?: string
  /** Margin for in-view detection (rootMargin) */
  inViewMargin?: MotionInViewMargin
}

const props = withDefaults(defineProps<TypingTextProps>(), {
  text: '',
  speed: 100,
  delay: 0,
  showCursor: true,
  cursor: '|',
  cursorClass: '',
  loop: false,
  pauseDuration: 2000,
  class: '',
  startOnView: true,
  once: false,
  inViewMargin: '0px' as MotionInViewMargin,
  animation: 'fadeIn',
})

const emit = defineEmits(['complete'])

const containerRef = ref<HTMLElement | null>(null)
const isInView = useElementVisibility(containerRef, { rootMargin: props.inViewMargin })
const hasAnimated = ref(false)
const displayText = ref('')
const currentIndex = ref(0)
const isTyping = ref(false)
const currentTextIndex = ref(0)

let delayTimeoutId: ReturnType<typeof setTimeout> | null = null
let typingTimeoutId: ReturnType<typeof setTimeout> | null = null

const textArray = computed(() => {
  return props.texts && props.texts.length > 0 ? props.texts : [props.text]
})

const currentText = computed(() => {
  return textArray.value[currentTextIndex.value] ?? ''
})

const shouldStart = computed(() => {
  return !props.startOnView || (isInView.value && (!props.once || !hasAnimated.value))
})

// Animation states based on animation type
const initialAnimationState = computed(() => {
  switch (props.animation) {
    case 'fadeIn':
      return { opacity: 0 }
    case 'blurIn':
      return { opacity: 0, filter: 'blur(10px)' }
    case 'blurInUp':
      return { opacity: 0, filter: 'blur(10px)', y: 20 }
    case 'blurInDown':
      return { opacity: 0, filter: 'blur(10px)', y: -20 }
    case 'slideUp':
      return { opacity: 0, y: 20 }
    case 'slideDown':
      return { opacity: 0, y: -20 }
    case 'slideLeft':
      return { opacity: 0, x: 20 }
    case 'slideRight':
      return { opacity: 0, x: -20 }
    case 'scaleUp':
      return { opacity: 0, scale: 0.8 }
    case 'scaleDown':
      return { opacity: 0, scale: 1.2 }
    default:
      return { opacity: 0, y: 10 }
  }
})

const targetAnimationState = computed(() => {
  switch (props.animation) {
    case 'blurIn':
    case 'blurInUp':
    case 'blurInDown':
      return { opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }
    default:
      return { opacity: 1, x: 0, y: 0, scale: 1 }
  }
})

const containerTransition = computed(() => {
  return {
    duration: 0.6,
    easing: 'ease-out',
  }
})

// Start typing when component mounts if startOnView is false
onMounted(() => {
  if (!props.startOnView) {
    delayTimeoutId = setTimeout(() => {
      isTyping.value = true
      hasAnimated.value = true
    }, props.delay)
  }
})

// Clean up timeouts
onUnmounted(() => {
  if (delayTimeoutId) {
    clearTimeout(delayTimeoutId)
  }
  if (typingTimeoutId) {
    clearTimeout(typingTimeoutId)
  }
})

watch(shouldStart, (newValue) => {
  if (newValue && props.startOnView) {
    delayTimeoutId = setTimeout(() => {
      isTyping.value = true
      hasAnimated.value = true
    }, props.delay)
  }
})

watch(isTyping, (newValue) => {
  if (newValue) {
    typeText()
  }
})

function typeText() {
  if (currentIndex.value < currentText.value.length) {
    typingTimeoutId = setTimeout(() => {
      displayText.value = currentText.value.slice(0, currentIndex.value + 1)
      currentIndex.value++
      typeText()
    }, props.speed)
  }
  else {
    // Typing complete
    emit('complete')
    props.onComplete?.()

    const texts = props.texts
    if (props.loop && texts && texts.length > 1) {
      typingTimeoutId = setTimeout(() => {
        displayText.value = ''
        currentIndex.value = 0
        currentTextIndex.value = (currentTextIndex.value + 1) % texts.length
        typeText()
      }, props.pauseDuration)
    }
  }
}

function handleClick() {
  // Optional: Add click handler if needed
}
</script>

<template>
  <Motion
    ref="containerRef"
    :initial="initialAnimationState"
    :animate="shouldStart ? targetAnimationState : initialAnimationState"
    :transition="containerTransition"
    :class="['typing-text-container', 'whitespace-pre-wrap', props.class]"
    :in-view-options="{ margin: inViewMargin }"
    @click="handleClick"
  >
    <span class="inline-flex items-center">
      {{ displayText }}
      <Motion
        v-if="showCursor"
        :initial="{ opacity: 1 }"
        :animate="{ opacity: [0, 1, 1, 0] }"
        :transition="{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
          times: [0, 0.5, 0.5, 1],
        }"
        :class="['typing-cursor', 'inline-block ms-1 font-normal select-none w-px', cursorClass]"
      >
        {{ cursor }}
      </Motion>
    </span>
  </Motion>
</template>
