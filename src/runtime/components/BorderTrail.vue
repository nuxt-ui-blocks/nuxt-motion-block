<template>
  <div class="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
    <!-- @vue-ignore -->
    <Motion
      :class="['absolute aspect-square', trailClass]"
      :style="motionStyle"
      :animate="{
        offsetDistance: ['0%', '100%'],
      }"
      :transition="finalTransition"
      @animationcomplete="onAnimationComplete"
    />
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'

// Types
interface Transition {
  repeat?: number | string
  duration?: number
  ease?: string
  [key: string]: any
}

interface BorderTrailProps {
  class?: string
  size?: number
  transition?: Transition
  onAnimationComplete?: () => void
  style?: Record<string, any>
}

const props = withDefaults(defineProps<BorderTrailProps>(), {
  size: 60,
})

// Default transition
const defaultTransition: Transition = {
  repeat: Infinity,
  duration: 5,
  ease: 'linear',
}

// Computed properties
const finalTransition = computed(() => ({
  ...defaultTransition,
  ...props.transition,
}))

const motionStyle = computed(() => ({
  width: `${props.size}px`,
  offsetPath: `rect(0 auto auto 0 round ${props.size}px)`,
  ...props.style,
}))

const trailClass = computed(() => {
  return props.class || 'bg-accented'
})
</script>
