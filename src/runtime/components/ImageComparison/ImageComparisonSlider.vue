<template>
  <div
    :class="sliderClasses"
    :style="sliderStyle"
    @mousedown="handlePointerDown"
    @touchstart.passive="handlePointerDown"
  >
    <div class="slider-handle" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, onUnmounted, type Ref } from 'vue'
import type { MotionValue } from 'motion-v'

const props = defineProps<{
  class?: string
}>()

const sliderClasses = computed(() => [
  'absolute bottom-0 top-0 w-4 cursor-ew-resize z-30',
  'flex items-center justify-center',
  props.class,
])

const motionSliderPosition = inject<MotionValue<number>>('motionSliderPosition')
const isDragging = inject<Ref<boolean>>('isDragging', ref(false))

const sliderValue = ref(motionSliderPosition?.get() || 50)

onMounted(() => {
  const unsubscribe = motionSliderPosition?.on('change', (latest) => {
    sliderValue.value = latest
  })
  onUnmounted(() => {
    unsubscribe?.()
  })
})

const sliderStyle = computed(() => ({
  left: `${sliderValue.value}%`,
  transform: 'translateX(-50%)',
}))

const handlePointerDown = (event: MouseEvent | TouchEvent) => {
  event.preventDefault()
  event.stopPropagation()
  isDragging.value = true
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'ew-resize'
}
</script>

<style scoped>
.slider-handle {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  cursor: ew-resize;
  touch-action: none;
}

@media (hover: none) {
  .slider-handle {
    width: 44px;
    height: 44px;
  }
}
</style>
