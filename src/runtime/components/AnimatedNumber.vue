<template>
  <!-- @vue-ignore -->
  <Motion
    :as="as"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    v-bind="$attrs"
  >
    {{ displayValue }}
  </Motion>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Motion, motionValue, useSpring, type SpringOptions } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedNumber from '../theme/animated-number'

interface AnimatedNumberProps {
  value: number
  class?: string
  ui?: Record<string, any>
  springOptions?: SpringOptions
  as?: string
  format?: (value: number) => string
}

const props = withDefaults(defineProps<AnimatedNumberProps>(), {
  class: '',
  ui: undefined,
  springOptions: () => ({
    stiffness: 300,
    damping: 30,
    mass: 1,
  }),
  as: 'span',
  format: (value: number) => Math.round(value).toLocaleString(),
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'animatedNumber',
  props,
  theme: animatedNumber,
})

// State for the current display value
const currentValue = ref(props.value)
const displayValue = computed(() => props.format(currentValue.value))

// Create motion value for the animated number
const motionNumber = motionValue(props.value)

// Create spring animation with configurable options
const springValue = useSpring(motionNumber, props.springOptions)

// Subscribe to spring value changes and update display
let unsubscribe: (() => void) | null = null

// Watch for value changes and update the motion value
watch(() => props.value, (newValue) => {
  motionNumber.set(newValue)
}, { immediate: false })

// Initialize the motion value and subscribe to changes on mount
onMounted(() => {
  motionNumber.set(props.value)

  // Subscribe to spring value changes
  unsubscribe = springValue.on('change', (latest: number) => {
    currentValue.value = latest
  })
})

// Clean up subscription on unmount
onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})
</script>
