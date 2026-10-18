<template>
  <div
    ref="containerRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <div :class="ui.inner({ class: uiProps.ui?.inner })">
      <div :class="ui.mask({ class: uiProps.ui?.mask })" />
      <DivGrid
        :key="`base-${rippleKey}`"
        :class="ui.grid({ class: uiProps.ui?.grid })"
        :rows="rows"
        :cols="cols"
        :cell-size="cellSize"
        border-color="var(--cell-border-color)"
        fill-color="var(--cell-fill-color)"
        :clicked-cell="clickedCell"
        :interactive="true"
        @cell-click="handleCellClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DivGrid from './DivGrid.vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import backgroundRippleEffect from '../theme/background-ripple-effect'

interface ClickedCell {
  row: number
  col: number
}

interface Props {
  class?: string
  ui?: Record<string, any>
  rows?: number
  cols?: number
  cellSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  rows: 8,
  cols: 27,
  cellSize: 56,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'backgroundRippleEffect',
  props,
  theme: backgroundRippleEffect,
})

const clickedCell = ref<ClickedCell | null>(null)
const rippleKey = ref(0)
const containerRef = ref<HTMLElement>()

const handleCellClick = (row: number, col: number) => {
  clickedCell.value = { row, col }
  rippleKey.value += 1
}
</script>

<style>
@keyframes cell-ripple {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.4;
  }
}

.animate-cell-ripple {
  animation: cell-ripple var(--duration, 200ms) ease-out none 1 var(--delay, 0ms);
}
</style>
