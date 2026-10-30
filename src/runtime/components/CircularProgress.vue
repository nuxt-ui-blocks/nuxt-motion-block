<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg
      :viewBox="`0 0 ${size} ${size}`"
      role="img"
      :aria-label="accessibleLabel"
      :class="ui.svg({ class: uiProps.ui?.svg })"
    >
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke-width="strokeWidth"
        :class="ui.track({ class: uiProps.ui?.track })"
      />
      <Motion
        as="circle"
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        stroke-linecap="round"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :initial="{ strokeDashoffset: circumference }"
        :animate="{ strokeDashoffset: dashOffset }"
        :transition="transition"
        :class="ui.indicator({ class: uiProps.ui?.indicator })"
      />
    </svg>
    <div
      v-if="showLabel"
      :class="ui.label({ class: uiProps.ui?.label })"
    >
      <slot>
        <span :class="ui.value({ class: uiProps.ui?.value })">{{ Math.round(clampedValue) }}%</span>
        <span
          v-if="caption"
          :class="ui.caption({ class: uiProps.ui?.caption })"
        >{{ caption }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import circularProgress from '../theme/circular-progress'

export interface CircularProgressProps {
  /** Text under the percentage. Left out, only the percentage shows. */
  caption?: string
  /** Extra classes for the wrapper. */
  class?: string
  /** Seconds the ring takes to reach a new value. */
  duration?: number
  /** Accessible description. Defaults to the current value. */
  label?: string
  /** Draw the percentage in the middle of the ring. */
  showLabel?: boolean
  /** Diameter of the ring, in pixels. */
  size?: number
  /** Thickness of the ring, in pixels. */
  strokeWidth?: number
  ui?: Record<string, any>
  /** Progress from `0` to `100`. */
  value?: number
}

const props = withDefaults(defineProps<CircularProgressProps>(), {
  caption: undefined,
  class: undefined,
  duration: 1.1,
  label: undefined,
  showLabel: true,
  size: 140,
  strokeWidth: 10,
  ui: undefined,
  value: 0,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'circularProgress', props, theme: circularProgress })

const shouldReduceMotion = useReducedMotion()

const clampedValue = computed(() => Math.min(100, Math.max(0, props.value)))
const center = computed(() => props.size / 2)
const radius = computed(() => Math.max(1, (props.size - props.strokeWidth) / 2))
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - clampedValue.value / 100))

const transition = computed(() => ({
  duration: shouldReduceMotion.value ? 0 : props.duration,
  ease: 'easeOut',
}))

const accessibleLabel = computed(() => props.label ?? `${Math.round(clampedValue.value)}% complete`)
</script>
