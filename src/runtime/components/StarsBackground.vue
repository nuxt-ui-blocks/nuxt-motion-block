<template>
  <canvas
    ref="canvasRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import starsBackground from '../theme/stars-background'

interface StarProps {
  x: number
  y: number
  radius: number
  opacity: number
  twinkleSpeed: number | null
}

interface Props {
  starDensity?: number
  allStarsTwinkle?: boolean
  twinkleProbability?: number
  minTwinkleSpeed?: number
  maxTwinkleSpeed?: number
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  starDensity: 0.00015,
  allStarsTwinkle: true,
  twinkleProbability: 0.7,
  minTwinkleSpeed: 0.5,
  maxTwinkleSpeed: 1,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'starsBackground', props, theme: starsBackground })

const canvasRef = ref<HTMLCanvasElement | null>(null)
const stars = ref<StarProps[]>([])
const animationFrameId = ref<number | null>(null)
const resizeObserver = ref<ResizeObserver | null>(null)

// Throttle resize updates
const throttledUpdateStars = useThrottleFn(() => {
  updateStars()
}, 100)

const generateStars = (width: number, height: number): StarProps[] => {
  const area = width * height
  const numStars = Math.floor(area * props.starDensity)

  return Array.from({ length: numStars }, () => {
    const shouldTwinkle = props.allStarsTwinkle || Math.random() < props.twinkleProbability
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 0.05 + 0.5,
      opacity: Math.random() * 0.5 + 0.5,
      twinkleSpeed: shouldTwinkle
        ? props.minTwinkleSpeed + Math.random() * (props.maxTwinkleSpeed - props.minTwinkleSpeed)
        : null,
    }
  })
}

const updateStars = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const { width, height } = canvas.getBoundingClientRect()
  canvas.width = width
  canvas.height = height
  stars.value = generateStars(width, height)
}

const render = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  stars.value.forEach((star) => {
    // Only update opacity for twinkling stars
    if (star.twinkleSpeed !== null) {
      star.opacity = 0.5 + Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5)
    }

    ctx.beginPath()
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
    ctx.fill()
  })

  animationFrameId.value = requestAnimationFrame(render)
}

onMounted(() => {
  updateStars()

  if (canvasRef.value) {
    resizeObserver.value = new ResizeObserver(throttledUpdateStars)
    resizeObserver.value.observe(canvasRef.value)
  }

  animationFrameId.value = requestAnimationFrame(render)
})

onUnmounted(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }

  if (resizeObserver.value && canvasRef.value) {
    resizeObserver.value.unobserve(canvasRef.value)
  }
})
</script>
