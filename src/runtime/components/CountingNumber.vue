<template>
  <Motion
    ref="containerRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    v-bind="props"
  >
    {{ formattedValue }}
  </Motion>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Motion } from 'motion-v'
import { useElementVisibility } from '@vueuse/core'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import countingNumber from '../theme/counting-number'

interface CountingNumberProps {
  from?: number
  to?: number
  duration?: number // seconds
  delay?: number // ms
  class?: string
  ui?: Record<string, any>
  startOnView?: boolean
  once?: boolean
  inViewMargin?: string
  onComplete?: () => void
  format?: (value: number) => string
}

const props = withDefaults(defineProps<CountingNumberProps>(), {
  from: 0,
  to: 100,
  duration: 2,
  delay: 0,
  class: '',
  ui: undefined,
  startOnView: true,
  once: false,
  inViewMargin: '0px',
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'countingNumber',
  props,
  theme: countingNumber,
})

const emit = defineEmits(['complete'])

const containerRef = ref<HTMLElement | null>(null)
const isInView = useElementVisibility(containerRef, { rootMargin: props.inViewMargin })
const hasAnimated = ref(false)
const displayValue = ref(props.from)

const shouldStart = computed(() => {
  return !props.startOnView || (isInView.value && (!props.once || !hasAnimated.value))
})

const formattedValue = computed(() => {
  return props.format ? props.format(displayValue.value) : Math.round(displayValue.value).toString()
})

let animationFrame: number | null = null

function animateNumber({ from, to, duration, onUpdate, onComplete }: {
  from: number
  to: number
  duration: number
  onUpdate: (value: number) => void
  onComplete: () => void
}) {
  const start = performance.now()

  function frame(now: number) {
    const progress = Math.min((now - start) / (duration * 1000), 1)
    const value = from + (to - from) * progress
    onUpdate(value)
    if (progress < 1) {
      animationFrame = requestAnimationFrame(frame)
    }
    else {
      onUpdate(to)
      onComplete()
    }
  }
  animationFrame = requestAnimationFrame(frame)
}

function startAnimation() {
  if (!shouldStart.value) return

  hasAnimated.value = true

  setTimeout(() => {
    animateNumber({
      from: props.from,
      to: props.to,
      duration: props.duration,
      onUpdate: (value: number) => {
        displayValue.value = value
      },
      onComplete: () => {
        emit('complete')
        props.onComplete?.()
      },
    })
  }, props.delay)
}

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})

watch(isInView, (newValue) => {
  if (newValue && props.startOnView) {
    startAnimation()
  }
})

onMounted(() => {
  if (!props.startOnView) {
    startAnimation()
  }
})
</script>
