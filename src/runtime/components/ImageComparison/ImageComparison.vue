<template>
  <div
    ref="container"
    :class="containerClasses"
    :style="containerStyles"
    role="img"
    :aria-label="props.ariaLabel"
    :aria-valuenow="Math.round(sliderPosition)"
    aria-valuemin="0"
    aria-valuemax="100"
    tabindex="0"
    @mousemove="handleDrag"
    @mousedown="!enableHover && startDrag()"
    @mouseup="stopDrag"
    @mouseleave="handleMouseLeave"
    @touchmove="handleDrag"
    @touchstart.passive="!enableHover && startDrag()"
    @touchend="stopDrag"
    @touchcancel="stopDrag"
    @wheel="handleWheel"
    @keydown="handleKeyDown"
  >
    <slot />

    <!-- Overlay controls -->
    <div
      v-if="showControls"
      class="absolute top-4 right-4 z-20 flex gap-2"
    >
      <UButton
        v-if="enableZoom"
        size="xs"
        variant="outline"
        class="bg-default/80 backdrop-blur-sm"
        @click="resetZoom"
      >
        <UIcon
          name="i-lucide-zoom-out"
          class="w-3 h-3"
        />
      </UButton>
      <UButton
        size="xs"
        variant="outline"
        class="bg-default/80 backdrop-blur-sm"
        @click="resetPosition"
      >
        <UIcon
          name="i-lucide-refresh-cw"
          class="w-3 h-3"
        />
      </UButton>
    </div>

    <!-- Position indicator -->
    <div
      v-if="showPosition"
      class="absolute bottom-4 left-4 z-20"
    >
      <div class="bg-(--ui-bg-inverted)/60 text-inverted px-2 py-1 rounded text-xs backdrop-blur-sm">
        {{ Math.round(sliderPosition) }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMotionValue, useSpring } from 'motion-v'
import type { SpringOptions } from 'motion-v'
import { ref, computed, watch, readonly, provide, onUnmounted } from 'vue'

type ComparisonMode = 'slide' | 'fade' | 'curtain' | 'circle'
type SliderOrientation = 'horizontal' | 'vertical'

interface ImageComparisonProps {
  class?: string
  enableHover?: boolean
  springOptions?: SpringOptions
  initialPosition?: number
  mode?: ComparisonMode
  orientation?: SliderOrientation
  enableZoom?: boolean
  showControls?: boolean
  showPosition?: boolean
  autoPlay?: boolean
  autoPlayDuration?: number
  snapToSteps?: boolean
  steps?: number[]
  ariaLabel?: string
  leftImageLabel?: string
  rightImageLabel?: string
}

const props = withDefaults(defineProps<ImageComparisonProps>(), {
  enableHover: false,
  initialPosition: 50,
  mode: 'slide',
  orientation: 'horizontal',
  enableZoom: false,
  showControls: true,
  showPosition: false,
  autoPlay: false,
  autoPlayDuration: 3000,
  snapToSteps: false,
  steps: () => [0, 25, 50, 75, 100],
  ariaLabel: 'Image comparison slider',
  leftImageLabel: 'Before image',
  rightImageLabel: 'After image',
})

const emit = defineEmits<{
  positionChange: [position: number]
  dragStart: []
  dragEnd: []
}>()

const DEFAULT_SPRING_OPTIONS = {
  bounce: 0,
  duration: 0.1,
}

const container = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const zoomLevel = ref(1)
const autoPlayInterval = ref<number | null>(null)
const motionValue = useMotionValue(props.initialPosition)
const motionSliderPosition = useSpring(
  motionValue,
  props.springOptions ?? DEFAULT_SPRING_OPTIONS,
)
const sliderPosition = ref(props.initialPosition)

const containerClasses = computed(() => [
  'relative select-none overflow-hidden image-comparison-container',
  props.enableHover && 'cursor-ew-resize',
  props.orientation === 'vertical' && 'cursor-ns-resize',
  props.class,
])

const containerStyles = computed(() => ({
  transform: props.enableZoom ? `scale(${zoomLevel.value})` : undefined,
  transformOrigin: 'center',
}))

const handleDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value && !props.enableHover) return
  if (!container.value) return

  event.preventDefault()

  const containerRect = container.value.getBoundingClientRect()
  let percentage: number

  if (props.orientation === 'vertical') {
    const clientY = 'touches' in event ? event.touches[0].clientY : (event as MouseEvent).clientY
    const y = clientY - containerRect.top
    percentage = Math.max(0, Math.min(100, (y / containerRect.height) * 100))
  }
  else {
    const clientX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX
    const x = clientX - containerRect.left
    percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100))
  }

  // Snap to steps if enabled
  if (props.snapToSteps) {
    const closestStep = props.steps.reduce((prev, curr) =>
      Math.abs(curr - percentage) < Math.abs(prev - percentage) ? curr : prev,
    )
    percentage = closestStep
  }

  motionValue.set(percentage)
  sliderPosition.value = percentage
  emit('positionChange', percentage)
}

const handleWheel = (event: WheelEvent) => {
  if (!props.enableZoom) return

  event.preventDefault()
  const delta = event.deltaY > 0 ? -0.1 : 0.1
  zoomLevel.value = Math.max(0.5, Math.min(3, zoomLevel.value + delta))
}

const startDrag = () => {
  isDragging.value = true
  document.body.style.userSelect = 'none'
  document.body.style.cursor = props.orientation === 'vertical' ? 'ns-resize' : 'ew-resize'
  stopAutoPlay()
  emit('dragStart')
}

const stopDrag = () => {
  isDragging.value = false
  document.body.style.userSelect = ''
  document.body.style.cursor = ''
  emit('dragEnd')
}

const handleMouseLeave = () => {
  stopDrag()
}

const resetPosition = () => {
  motionValue.set(props.initialPosition)
  sliderPosition.value = props.initialPosition
  emit('positionChange', props.initialPosition)
}

const resetZoom = () => {
  zoomLevel.value = 1
}

// Keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  const step = 5 // 5% step for keyboard navigation
  let newPosition = sliderPosition.value

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      event.preventDefault()
      newPosition = Math.max(0, sliderPosition.value - step)
      break
    case 'ArrowRight':
    case 'ArrowUp':
      event.preventDefault()
      newPosition = Math.min(100, sliderPosition.value + step)
      break
    case 'Home':
      event.preventDefault()
      newPosition = 0
      break
    case 'End':
      event.preventDefault()
      newPosition = 100
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      resetPosition()
      return
  }

  if (newPosition !== sliderPosition.value) {
    motionValue.set(newPosition)
    sliderPosition.value = newPosition
    emit('positionChange', newPosition)
  }
}

const startAutoPlay = () => {
  if (!props.autoPlay) return

  stopAutoPlay()
  // Only set up interval in the browser, not on the server
  if (import.meta.client) {
    autoPlayInterval.value = setInterval(() => {
      const newPosition = (sliderPosition.value + 10) % 100
      motionValue.set(newPosition)
      sliderPosition.value = newPosition
      emit('positionChange', newPosition)
    }, props.autoPlayDuration) as any
  }
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

// Auto-play functionality
watch(() => props.autoPlay, (enabled) => {
  if (enabled) {
    startAutoPlay()
  }
  else {
    stopAutoPlay()
  }
}, { immediate: true })

// Cleanup
onUnmounted(() => {
  stopAutoPlay()
})

// Provide enhanced context
const context = {
  motionSliderPosition,
  sliderPosition: readonly(sliderPosition),
  isDragging: readonly(isDragging),
  containerRef: container,
  mode: props.mode,
  orientation: props.orientation,
  zoomLevel: readonly(zoomLevel),
}

provide('imageComparisonContext', context)

// Legacy provides for backward compatibility
provide('motionSliderPosition', motionSliderPosition)
provide('sliderPosition', sliderPosition)
provide('isDragging', isDragging)
provide('containerRef', container)

defineExpose({
  startDrag,
  stopDrag,
  handleDrag,
  resetPosition,
  resetZoom,
  startAutoPlay,
  stopAutoPlay,
})
</script>

<style scoped>
.image-comparison-container {
  touch-action: none;
}
</style>
