<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <!-- @vue-ignore -->
    <Motion
      :class="ui.trail({ class: uiProps.ui?.trail })"
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
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import borderTrail from '../theme/border-trail'

// Types
interface Transition {
  repeat?: number | string
  duration?: number
  ease?: string
  [key: string]: any
}

interface BorderTrailProps {
  class?: string
  ui?: Record<string, any>
  size?: number
  transition?: Transition
  onAnimationComplete?: () => void
  style?: Record<string, any>
}

const props = withDefaults(defineProps<BorderTrailProps>(), {
  class: undefined,
  ui: undefined,
  size: 60,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'borderTrail', props, theme: borderTrail })

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
</script>
