<template>
  <svg
    aria-hidden="true"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :viewBox="viewBox"
    preserveAspectRatio="xMidYMid slice"
  >
    <rect
      v-for="cell in cells"
      :key="cell.key"
      :x="cell.x"
      :y="cell.y"
      :width="width"
      :height="height"
      :class="ui.square({ class: uiProps.ui?.square })"
      :fill="hovered === cell.key ? hoverColor : 'transparent'"
      :stroke="color"
      @pointerenter="hovered = cell.key"
      @pointerleave="hovered = null"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import interactiveGridPattern from '../theme/interactive-grid-pattern'

export interface InteractiveGridPatternProps {
  /** Extra classes for the `<svg>`. */
  class?: string
  /** Colour of the cell strokes. */
  color?: string
  /** Cell height, in pixels. */
  height?: number
  /** Fill of the cell under the pointer. */
  hoverColor?: string
  /** Columns of cells. */
  squaresX?: number
  /** Rows of cells. */
  squaresY?: number
  ui?: Record<string, any>
  /** Cell width, in pixels. */
  width?: number
}

const props = withDefaults(defineProps<InteractiveGridPatternProps>(), {
  class: undefined,
  color: 'var(--ui-border)',
  height: 40,
  hoverColor: 'var(--ui-bg-elevated)',
  squaresX: 24,
  squaresY: 24,
  ui: undefined,
  width: 40,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'interactiveGridPattern',
  props,
  theme: interactiveGridPattern,
})

const hovered = ref<string | null>(null)

/**
 * `slice` on a viewBox sized to the lattice means the cells stay square at any
 * container ratio and the overflow is cropped, instead of the grid stretching.
 */
const viewBox = computed(() => `0 0 ${props.squaresX * props.width} ${props.squaresY * props.height}`)

const cells = computed(() => {
  const next: { key: string, x: number, y: number }[] = []

  for (let column = 0; column < props.squaresX; column++) {
    for (let row = 0; row < props.squaresY; row++) {
      next.push({
        key: `${column}-${row}`,
        x: column * props.width,
        y: row * props.height,
      })
    }
  }

  return next
})
</script>
