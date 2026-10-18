<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.className, uiProps.class] })"
    :style="{ height: containerHeight, display: 'inline-flex', verticalAlign: 'baseline' }"
  >
    <AnimatePresence mode="wait">
      <Motion
        :key="currentIndex"
        :class="ui.item({ class: uiProps.ui?.item })"
        :initial="computedVariants.initial"
        :animate="computedVariants.animate"
        :exit="computedVariants.exit"
        :transition="transition"
        :style="{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'baseline',
        }"
        @motionstart="onMotionStart"
        @motioncomplete="onMotionComplete"
      >
        {{ currentItem }}
      </Motion>
    </AnimatePresence>

    <!-- Hidden element to measure text height -->
    <div
      ref="measureRef"
      :class="ui.measure({ class: uiProps.ui?.measure })"
    >
      <div
        v-for="(item, index) in items"
        :key="'measure-' + index"
        :class="ui.measureItem({ class: uiProps.ui?.measureItem })"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { Motion, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import textLoop from '../theme/text-loop'

interface TextLoopProps {
  items?: any[]
  className?: string
  interval?: number
  transition?: any
  variants?: any
  onIndexChange?: (index: number) => void
  trigger?: boolean
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<TextLoopProps>(), {
  items: () => [],
  className: '',
  interval: 2,
  transition: () => ({
    type: 'spring',
    stiffness: 150,
    damping: 19,
    mass: 1.2,
  }),
  trigger: true,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'textLoop', props, theme: textLoop })

const emit = defineEmits(['indexChange'])

const currentIndex = ref(0)
const direction = ref(1)
const containerHeight = ref('auto')
const measureRef = ref<HTMLElement | null>(null)
const isAnimating = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null

const currentItem = computed(() => {
  return props.items[currentIndex.value]
})

// Compute variants with direction
const computedVariants = computed(() => {
  const dir = direction.value

  if (props.variants) {
    // Handle string-based direction expressions
    const processVariant = (variant: any) => {
      if (!variant || typeof variant !== 'object') return variant

      const processed = { ...variant }
      for (const key in processed) {
        if (typeof processed[key] === 'string') {
          processed[key] = processed[key].replace('direction', dir.toString())
        }
      }
      return processed
    }

    return {
      initial: processVariant(props.variants.initial),
      animate: processVariant(props.variants.animate),
      exit: processVariant(props.variants.exit),
    }
  }

  // Default variants with shorter duration for fast intervals
  const duration = props.interval < 1 ? 0.3 : 0.5

  return {
    initial: {
      y: -dir * 20,
      rotateX: -dir * 90,
      opacity: 0,
      filter: 'blur(4px)',
    },
    animate: {
      y: 0,
      rotateX: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration },
    },
    exit: {
      y: -dir * 20,
      rotateX: -dir * 90,
      opacity: 0,
      filter: 'blur(4px)',
      transition: { duration },
    },
  }
})

// Measure the height of the tallest text item
function measureTextHeight() {
  if (!measureRef.value) return

  let maxHeight = 0
  const children = measureRef.value.children

  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement
    maxHeight = Math.max(maxHeight, child.offsetHeight)
  }

  containerHeight.value = `${maxHeight}px`
}

// Set up the interval for cycling through items
function startInterval() {
  // Clear any existing interval
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }

  if (!props.trigger || props.items.length <= 1) return

  // Only run on client side
  if (typeof window === 'undefined') return

  // Ensure minimum interval to prevent transition conflicts
  const intervalMs = Math.max(props.interval * 1000, 1000)
  intervalId = setInterval(() => {
    // Don't start a new animation if one is already in progress
    if (isAnimating.value) return

    // Update direction
    direction.value = 1

    // Update index
    currentIndex.value = (currentIndex.value + 1) % props.items.length
    emit('indexChange', currentIndex.value)
    props.onIndexChange?.(currentIndex.value)
  }, intervalMs)
}

// Handle motion start event
function onMotionStart() {
  isAnimating.value = true
  // Ensure container height is updated when motion starts
  nextTick(() => {
    measureTextHeight()
  })
}

// Handle motion complete event
function onMotionComplete() {
  isAnimating.value = false
}

// Clean up interval on unmount
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

// Initialize the interval on mount (client-side only)
onMounted(() => {
  // Only initialize on client side
  if (typeof window !== 'undefined') {
    // Measure text height after component is mounted
    nextTick(() => {
      measureTextHeight()
    })

    startInterval()
  }
})

// Watch for changes to trigger or items
watch(() => [props.trigger, props.items], () => {
  // Only run on client side
  if (typeof window === 'undefined') return

  // Re-measure text height when items change
  nextTick(() => {
    measureTextHeight()
  })

  startInterval()
}, { flush: 'post' })

// Watch for interval changes
watch(() => props.interval, () => {
  startInterval()
})
</script>
