<template>
  <div
    ref="rootRef"
    :class="cn('relative w-full', className)"
  >
    <div
      v-if="label"
      class="mb-1 font-medium text-sm"
      :class="labelClassName"
    >
      {{ label }}
    </div>

    <UProgress
      :model-value="progressValue"
      :color="color"
      :size="size"
      :status="status"
      :max="max"
      :orientation="orientation"
      :inverted="inverted"
      :animation="animation"
      :ui="progressUi"
    >
      <template
        v-if="status || $slots.status"
        #status="slotProps"
      >
        <slot
          name="status"
          v-bind="slotProps ?? {}"
        >
          {{ slotProps.percent }}%
        </slot>
      </template>

      <template
        v-for="step in steps"
        #[`step-${step.index}`]="slotProps"
      >
        <slot
          :name="`step-${step.index}`"
          v-bind="slotProps ?? {}"
        >
          {{ step.value }}
        </slot>
      </template>
    </UProgress>

    <div
      v-if="orientation === 'horizontal'"
      class="pointer-events-none absolute left-0 overflow-hidden"
      :style="trackStyle"
    >
      <motion.div
        class="h-full overflow-hidden"
        :class="barClassName"
        :style="{ backgroundColor: barColor, borderRadius: barRadius }"
        :initial="{ width: `${MIN_PROGRESS_VALUE}%` }"
        :animate="{ width: `${clampedValue}%` }"
        :transition="shouldReduce ? REDUCED_TRANSITION : SPRING"
      >
        <motion.div
          v-if="shimmer"
          class="absolute inset-y-0 left-0"
          :style="{ background: SHIMMER_GRADIENT, width: '200%' }"
          :initial="{ x: '-100%' }"
          :animate="{ x: '100%' }"
          :transition="shouldReduce ? REDUCED_TRANSITION : SHIMMER_TRANSITION"
        />
      </motion.div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { motion, useReducedMotion } from 'motion-v'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, unref, watch } from 'vue'
import { cn } from '../utils/merge'

const MIN_PROGRESS_VALUE = 0
const MAX_PROGRESS_VALUE = 100

const SPRING = {
  damping: 10,
  duration: 0.25,
  mass: 0.75,
  stiffness: 100,
  type: 'spring' as const,
}

const REDUCED_TRANSITION = { duration: 0 }

const SHIMMER_GRADIENT
  = 'linear-gradient(90deg, transparent 0%, rgb(255 255 255 / 0.3) 50%, transparent 100%)'

const SHIMMER_TRANSITION = {
  duration: 1.5,
  ease: 'linear',
  repeat: Infinity,
}

const props = withDefaults(defineProps<{
  value?: number
  label?: string
  color?: string
  className?: string
  barClassName?: string
  labelClassName?: string
  shimmer?: boolean
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  status?: boolean
  max?: number | number[]
  orientation?: 'horizontal' | 'vertical'
  inverted?: boolean
  animation?: 'carousel' | 'carousel-inverse' | 'swing' | 'elastic'
  ui?: Record<string, any>
}>(), {
  value: 0,
  label: undefined,
  color: 'primary',
  className: '',
  barClassName: '',
  labelClassName: '',
  shimmer: false,
  size: undefined,
  status: false,
  max: undefined,
  orientation: 'horizontal',
  inverted: false,
  animation: undefined,
  ui: undefined,
})

const reduce = useReducedMotion()
const shouldReduce = computed(() => Boolean(unref(reduce)))

const clampedValue = computed(() =>
  Math.max(MIN_PROGRESS_VALUE, Math.min(MAX_PROGRESS_VALUE, props.value)),
)

const realMax = computed(() => {
  if (Array.isArray(props.max)) {
    return Math.max(props.max.length - 1, MIN_PROGRESS_VALUE)
  }
  return props.max ?? MAX_PROGRESS_VALUE
})

const progressValue = computed(() =>
  Math.min(clampedValue.value, realMax.value),
)

const steps = computed(() => {
  if (!Array.isArray(props.max)) {
    return []
  }
  return props.max.map((value, index) => ({ index, value }))
})

const progressUi = computed(() => {
  const ui = props.ui ?? {}
  return {
    ...ui,
    indicator: [ui.indicator, 'opacity-0', 'transition-none'],
  }
})

const rootRef = ref<HTMLElement | null>(null)
const track = ref({ top: 0, height: 0, width: 0 })
const barColor = ref('currentColor')
const barRadius = ref('inherit')
let observer: ResizeObserver | undefined

const trackStyle = computed(() => ({
  top: `${track.value.top}px`,
  height: `${track.value.height}px`,
  width: `${track.value.width}px`,
}))

function measure() {
  const root = rootRef.value
  if (!root) {
    return
  }
  const base = root.querySelector<HTMLElement>('[data-slot="base"]')
  if (!base) {
    return
  }
  const rootRect = root.getBoundingClientRect()
  const baseRect = base.getBoundingClientRect()
  track.value = {
    top: baseRect.top - rootRect.top,
    height: baseRect.height,
    width: baseRect.width,
  }
  const styles = window.getComputedStyle(base)
  barRadius.value = styles.borderRadius
  const indicator = base.querySelector<HTMLElement>('[data-slot="indicator"]')
  if (indicator) {
    const color = window.getComputedStyle(indicator).backgroundColor
    if (color) {
      barColor.value = color
    }
  }
}

function remeasure() {
  nextTick(measure)
}

onMounted(() => {
  measure()
  if (typeof ResizeObserver !== 'undefined' && rootRef.value) {
    observer = new ResizeObserver(measure)
    observer.observe(rootRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

watch(
  () => [props.status, props.label, props.shimmer, props.size, props.color, props.max],
  remeasure,
)
</script>
