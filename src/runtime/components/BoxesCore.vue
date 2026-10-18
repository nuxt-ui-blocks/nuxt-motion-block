<!-- eslint-disable vue/no-template-shadow -->
<template>
  <div
    :style="containerStyle"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    v-bind="rest"
  >
    <div
      v-for="(_, i) in rowsArray"
      :key="`row-${i}`"
      :class="ui.row({ class: [uiProps.ui?.row, borderClass] })"
    >
      <motion.div
        v-for="(_, j) in colsArray"
        :key="`col-${j}`"
        :while-hover="{
          backgroundColor: getRandomColor(),
          transition: { duration: 0 },
        }"
        :animate="{
          transition: { duration: 2 },
        }"
        :class="ui.cell({ class: [uiProps.ui?.cell, borderClass] })"
      >
        <svg
          v-if="showPlusSigns && j % 2 === 0 && i % 2 === 0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          :class="ui.plusSign({ class: [uiProps.ui?.plusSign, borderClass.replace('border-', 'text-')] })"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
      </motion.div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { useResolvedColors } from '../composables/useThemeColor'
import boxesCore from '../theme/boxes-core'

// Define props with defaults
interface Props {
  class?: string
  ui?: Record<string, any>
  rows?: number
  cols?: number
  colors?: string[]
  skew?: boolean
  showPlusSigns?: boolean
  borderColor?: string
  [key: string]: any
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  rows: 150,
  cols: 100,
  skew: true,
  showPlusSigns: true,
  borderColor: 'border-muted',
  colors: () => [
    '#93c5fd',
    '#f9a8d4',
    '#86efac',
    '#fde047',
    '#fca5a5',
    '#d8b4fe',
    '#93c5fd',
    '#a5b4fc',
    '#c4b5fd',
  ],
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'boxesCore', props, theme: boxesCore })

const { class: _, borderColor, ui: _ui, ...rest } = props

// Computed properties for reactive arrays
const rowsArray = computed(() => Array.from({ length: props.rows }))
const colsArray = computed(() => Array.from({ length: props.cols }))

// Computed style for container with conditional skew
const containerStyle = computed(() => ({
  transform: props.skew
    ? `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`
    : `scale(0.675) translateZ(0)`,
}))

// Computed class for border color
const borderClass = computed(() => props.borderColor)

const resolvedColors = useResolvedColors(() => props.colors)

const getRandomColor = () => {
  const colors = resolvedColors.value ?? props.colors
  return colors[Math.floor(Math.random() * colors.length)]
}
</script>
