<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { PropType } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import Explosion from './Explosion.vue'
import { cn } from '../../utils/merge'

// Define BeamOptions interface
interface BeamOptions {
  initialX?: number
  translateX?: number
  initialY?: number
  translateY?: number
  rotate?: number
  className?: string
  duration?: number
  delay?: number
  repeatDelay?: number
  fromColor?: string
  viaColor?: string
  toColor?: string
}

// Define collision interface
interface Collision {
  detected: boolean
  coordinates: { x: number, y: number } | null
}

// Define props, receiving the refs from the parent
const props = defineProps({
  parentRef: {
    type: Object as PropType<HTMLDivElement | null>,
    required: true,
  },
  containerRef: {
    type: Object as PropType<HTMLDivElement | null>,
    required: true,
  },
  beamOptions: {
    type: Object as PropType<BeamOptions>,
    default: () => ({}),
  },
})

const beamRef = ref<HTMLDivElement | null>(null)
const collision = ref<Collision>({
  detected: false,
  coordinates: null,
})

// Used to force-remount the motion component to restart animation
const beamKey = ref(0)
const cycleCollisionDetected = ref(false)

let animationFrameId: number | null = null

const animationLoop = () => {
  checkCollision()
  animationFrameId = requestAnimationFrame(animationLoop)
}

// Collision detection logic
const checkCollision = () => {
  // Get the actual DOM elements
  let beamElement: Element | null = beamRef.value as any
  if (beamElement && typeof beamElement === 'object' && '$el' in beamElement) {
    beamElement = (beamElement as any).$el as Element
  }

  const containerElement = props.containerRef
  const parentElement = props.parentRef

  if (
    beamElement
    && containerElement
    && parentElement
    && !cycleCollisionDetected.value
    && typeof beamElement.getBoundingClientRect === 'function'
    && typeof containerElement.getBoundingClientRect === 'function'
    && typeof parentElement.getBoundingClientRect === 'function'
  ) {
    const beamRect = beamElement.getBoundingClientRect()
    const containerRect = containerElement.getBoundingClientRect()
    const parentRect = parentElement.getBoundingClientRect()

    // Check if beam bottom has hit the container top
    if (beamRect.bottom >= containerRect.top) {
      const relativeX = beamRect.left - parentRect.left + beamRect.width / 2
      const relativeY = beamRect.bottom - parentRect.top

      collision.value = {
        detected: true,
        coordinates: {
          x: relativeX,
          y: relativeY,
        },
      }
      cycleCollisionDetected.value = true
    }
  }
}

// Start collision checking on mount
onMounted(() => {
  animationFrameId = requestAnimationFrame(animationLoop)
})

// Clean up interval on unmount
onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

// Watch for collisions to reset the animation
watch(() => collision.value.detected, (isDetected) => {
  if (isDetected) {
    // After a delay, reset for the next cycle
    setTimeout(() => {
      // Reset collision state
      collision.value = { detected: false, coordinates: null }
      // Allow collision detection for the new cycle
      cycleCollisionDetected.value = false
      // Trigger re-render of the beam to restart animation
      beamKey.value += 1
    }, 2000)
  }
})

// Computed colors with defaults matching Nuxt UI theme
const fromColor = props.beamOptions.fromColor || 'from-indigo-500'
const viaColor = props.beamOptions.viaColor || 'via-purple-500'
const toColor = props.beamOptions.toColor || 'to-transparent'
</script>

<template>
  <motion.div
    :key="beamKey"
    ref="beamRef"
    :initial="{
      translateY: props.beamOptions.initialY || '-200px',
      translateX: props.beamOptions.initialX || '0px',
      rotate: props.beamOptions.rotate || 0,
    }"
    :animate="{
      translateY: props.beamOptions.translateY || '1800px',
      translateX: props.beamOptions.translateX || '0px',
      rotate: props.beamOptions.rotate || 0,
    }"
    :transition="{
      duration: props.beamOptions.duration || 8,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
      delay: props.beamOptions.delay || 0,
      repeatDelay: props.beamOptions.repeatDelay || 0,
    }"
    :class="cn(
      'absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t',
      fromColor,
      viaColor,
      toColor,
      props.beamOptions.className,
    )"
  />

  <AnimatePresence>
    <Explosion
      v-if="collision.detected && collision.coordinates"
      :key="`${collision.coordinates.x}-${collision.coordinates.y}`"
      :style="{
        left: `${collision.coordinates.x}px`,
        top: `${collision.coordinates.y}px`,
        transform: 'translate(-50%, -50%)',
      }"
      :from-color="fromColor"
      :via-color="viaColor"
      :to-color="toColor"
      class=""
    />
  </AnimatePresence>
</template>
