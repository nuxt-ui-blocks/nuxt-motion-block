<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="gridStyle"
  >
    <div
      v-for="idx in cells"
      :key="idx"
      :class="ui.cell({ class: [uiProps.ui?.cell, clickedCell && 'animate-cell-ripple [animation-fill-mode:none]', !interactive && 'pointer-events-none'] })"
      :style="getCellStyle(idx) as any"
      @click="interactive ? handleClick(idx) : undefined"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { useResolvedColor } from '../composables/useThemeColor'
import divGrid from '../theme/div-grid'

interface ClickedCell {
  row: number
  col: number
}

interface CellStyle {
  '--delay'?: string
  '--duration'?: string
  'backgroundColor': string
  'borderColor': string
}

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 7,
  },
  cols: {
    type: Number,
    default: 30,
  },
  cellSize: {
    type: Number,
    default: 56,
  },
  borderColor: {
    type: String,
    default: 'border',
  },
  fillColor: {
    type: String,
    default: 'primary',
  },
  clickedCell: {
    type: Object as PropType<ClickedCell | null>,
    default: null,
  },
  interactive: {
    type: Boolean,
    default: true,
  },
  ui: {
    type: Object as PropType<Record<string, any>>,
    default: undefined,
  },
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'divGrid', props, theme: divGrid })

const resolvedFillColor = useResolvedColor(() => props.fillColor)
const resolvedBorderColor = useResolvedColor(() => props.borderColor)

const emit = defineEmits<{
  cellClick: [row: number, col: number]
}>()

const cells = computed(() =>
  Array.from({ length: props.rows * props.cols }, (_, idx) => idx),
)

const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.cols}, ${props.cellSize}px)`,
  gridTemplateRows: `repeat(${props.rows}, ${props.cellSize}px)`,
  width: `${props.cols * props.cellSize}px`,
  height: `${props.rows * props.cellSize}px`,
  marginInline: 'auto',
}))

const getCellStyle = (idx: number): CellStyle => {
  const rowIdx = Math.floor(idx / props.cols)
  const colIdx = idx % props.cols

  if (!props.clickedCell) {
    return {
      backgroundColor: resolvedFillColor.value ?? props.fillColor,
      borderColor: resolvedBorderColor.value ?? props.borderColor,
    }
  }

  const distance = Math.hypot(
    props.clickedCell.row - rowIdx,
    props.clickedCell.col - colIdx,
  )
  const delay = Math.max(0, distance * 55)
  const duration = 200 + distance * 80

  return {
    '--delay': `${delay}ms`,
    '--duration': `${duration}ms`,
    'backgroundColor': resolvedFillColor.value ?? props.fillColor,
    'borderColor': resolvedBorderColor.value ?? props.borderColor,
  }
}

const handleClick = (idx: number) => {
  const rowIdx = Math.floor(idx / props.cols)
  const colIdx = idx % props.cols
  emit('cellClick', rowIdx, colIdx)
}
</script>
