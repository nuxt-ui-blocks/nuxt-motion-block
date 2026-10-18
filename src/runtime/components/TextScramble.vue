<template>
  <Motion
    :is="component"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class, props.className] })"
    v-bind="$attrs"
  >
    {{ displayText }}
  </Motion>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { Motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import textScramble from '../theme/text-scramble'

interface TextScrambleProps {
  text?: string
  duration?: number
  speed?: number
  characterSet?: string
  as?: string
  class?: string
  ui?: Record<string, any>
  className?: string
  trigger?: boolean
  onScrambleComplete?: () => void
}

const props = withDefaults(defineProps<TextScrambleProps>(), {
  text: '',
  duration: 0.8,
  speed: 0.04,
  characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  as: 'p',
  class: undefined,
  ui: undefined,
  className: '',
  trigger: true,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'textScramble',
  props,
  theme: textScramble,
})

const emit = defineEmits(['scrambleComplete'])

const displayText = ref(props.text)
const isAnimating = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null

const component = ref(props.as)

const scramble = async () => {
  // Only run on client side
  if (typeof window === 'undefined') return

  if (isAnimating.value) return
  isAnimating.value = true

  const steps = props.duration / props.speed
  let step = 0
  const text = props.text

  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }

  // Start with random characters
  let initialScrambled = ''
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      initialScrambled += ' '
    }
    else {
      initialScrambled += props.characterSet[Math.floor(Math.random() * props.characterSet.length)]
    }
  }
  displayText.value = initialScrambled

  // Wait a frame before starting the animation
  await nextTick()

  intervalId = setInterval(() => {
    let scrambled = ''
    const progress = step / steps

    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        scrambled += ' '
        continue
      }

      if (progress * text.length > i) {
        scrambled += text[i]
      }
      else {
        scrambled
          += props.characterSet[Math.floor(Math.random() * props.characterSet.length)]
      }
    }

    displayText.value = scrambled
    step++

    if (step > steps) {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
      displayText.value = text
      isAnimating.value = false
      emit('scrambleComplete')
      props.onScrambleComplete?.()
    }
  }, props.speed * 1000)
}

// Watch for text changes and trigger scramble
watch(() => props.text, (newText, oldText) => {
  if (newText !== oldText) {
    scramble()
  }
})

// Watch for trigger changes
watch(() => props.trigger, (newValue) => {
  if (newValue) {
    scramble()
  }
})

// Start on mount if trigger is true
onMounted(() => {
  // Only run on client side
  if (typeof window !== 'undefined' && props.trigger) {
    scramble()
  }
})
</script>
