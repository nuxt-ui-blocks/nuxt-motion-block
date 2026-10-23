<script setup lang="ts">
import { computed, ref } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { useMediaQuery } from '@vueuse/core'

export interface ScrubberProps {
  /** Extra classes for the root wrapper. */
  class?: string
  /** Number of decimal places to display. */
  decimals?: number
  /** Value used when the component keeps its own state. */
  defaultValue?: number
  /** Label displayed on the left side of the track. */
  label?: string
  /** Maximum value. */
  max?: number
  /** Minimum value. */
  min?: number
  /** Step increment. */
  step?: number
  /** Number of tick marks. `0` hides them. */
  ticks?: number
  /** Controlled value. Leave it out to let the component keep its own. */
  value?: number
}

const props = withDefaults(defineProps<ScrubberProps>(), {
  class: undefined,
  decimals: 2,
  defaultValue: 0,
  label: 'Value',
  max: 1,
  min: 0,
  step: 0.01,
  ticks: 9,
  value: undefined,
})

const emit = defineEmits<{
  /** Fired when the pointer is released, with the final value. */
  'change': [value: number]
  'update:value': [value: number]
}>()

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)
const isHoverDevice = useMediaQuery('(hover: hover) and (pointer: fine)')

const trackRef = ref<HTMLElement | null>(null)
const internalValue = ref(props.defaultValue)
const isDragging = ref(false)
const isHovering = ref(false)

const isControlled = computed(() => props.value !== undefined)
const value = computed(() => (isControlled.value ? props.value! : internalValue.value))
let lastValue = props.defaultValue
const range = computed(() => props.max - props.min)
const percentage = computed(() =>
  range.value > 0 ? ((value.value - props.min) / range.value) * 100 : 0,
)
const isActive = computed(() => isDragging.value || (isHoverDevice.value && isHovering.value))
const displayValue = computed(() => value.value.toFixed(props.decimals))

function clamp(next: number) {
  return Math.min(Math.max(next, props.min), props.max)
}

function roundToStep(next: number) {
  return Math.round((next - props.min) / props.step) * props.step + props.min
}

function setValue(next: number) {
  const clamped = clamp(roundToStep(next))
  lastValue = clamped
  if (!isControlled.value) {
    internalValue.value = clamped
  }

  emit('update:value', clamped)
  return clamped
}

function valueFromPointer(clientX: number) {
  const track = trackRef.value
  if (!track) {
    return value.value
  }

  const rect = track.getBoundingClientRect()
  const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
  return props.min + ratio * range.value
}

function onPointerDown(event: PointerEvent) {
  event.preventDefault()
  trackRef.value?.setPointerCapture(event.pointerId)
  isDragging.value = true
  setValue(valueFromPointer(event.clientX))
}

function onPointerMove(event: PointerEvent) {
  if (!isDragging.value) {
    return
  }

  setValue(valueFromPointer(event.clientX))
}

function onPointerUp(event: PointerEvent) {
  if (!isDragging.value) {
    return
  }

  isDragging.value = false
  trackRef.value?.releasePointerCapture?.(event.pointerId)
  emit('change', lastValue)
}

function onKeydown(event: KeyboardEvent) {
  let next: number | undefined

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      next = value.value + props.step
      break
    case 'ArrowLeft':
    case 'ArrowDown':
      next = value.value - props.step
      break
    case 'Home':
      next = props.min
      break
    case 'End':
      next = props.max
      break
    default:
      return
  }

  event.preventDefault()
  setValue(next)
  emit('change', lastValue)
}

const thumbTransition = computed(() =>
  isReduced.value ? { duration: 0 } : { bounce: 0.1, duration: 0.25, type: 'spring' as const },
)
</script>

<template>
  <div :class="['relative w-full select-none', props.class]">
    <div
      ref="trackRef"
      :aria-label="props.label"
      :aria-valuemax="props.max"
      :aria-valuemin="props.min"
      :aria-valuenow="Number(displayValue)"
      :aria-valuetext="displayValue"
      class="relative h-9 cursor-pointer touch-none overflow-hidden rounded-lg bg-muted outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default"
      role="slider"
      tabindex="0"
      @keydown="onKeydown"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
      @pointercancel="onPointerUp"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
    >
      <div
        class="pointer-events-none absolute inset-y-0 left-0 rounded-lg bg-inverted/15"
        :style="{
          transition: isDragging || isReduced ? 'none' : 'width 150ms cubic-bezier(0.23, 1, 0.32, 1)',
          width: `${percentage}%`,
        }"
      />

      <div
        v-if="props.ticks > 0"
        class="pointer-events-none absolute inset-0"
      >
        <span
          v-for="tick in props.ticks"
          :key="tick"
          class="absolute top-1/2 h-1.5 w-px -translate-x-1/2 -translate-y-1/2 rounded-full bg-inverted/25"
          :style="{ left: `${(tick / (props.ticks + 1)) * 100}%` }"
        />
      </div>

      <div
        class="pointer-events-none absolute top-1/2 z-30"
        :style="{
          left: `${percentage}%`,
          marginLeft: '-5px',
          transform: 'translateX(-50%) translateY(-50%)',
          transition: isDragging || isReduced ? 'none' : 'left 150ms cubic-bezier(0.23, 1, 0.32, 1)',
        }"
      >
        <motion.div
          :animate="{
            opacity: isActive ? 0.8 : 0.15,
            scaleX: isActive ? 1 : 0.7,
            scaleY: isActive ? 1 : 0.7,
          }"
          class="h-[22px] w-1 rounded-full bg-inverted/90"
          :transition="thumbTransition"
        />
      </div>

      <div class="pointer-events-none absolute top-1/2 left-3 z-40 -translate-y-1/2 text-[13px] font-medium whitespace-nowrap text-highlighted">
        {{ props.label }}
      </div>

      <div class="pointer-events-none absolute top-1/2 right-2.5 z-40 -translate-y-1/2 font-mono text-[13px] font-medium text-highlighted tabular-nums">
        {{ displayValue }}
      </div>
    </div>
  </div>
</template>
