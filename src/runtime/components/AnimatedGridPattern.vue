<template>
  <svg
    ref="rootRef"
    aria-hidden="true"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{ color: color }"
  >
    <defs>
      <pattern
        :id="patternId"
        :width="width"
        :height="height"
        patternUnits="userSpaceOnUse"
        :x="x"
        :y="y"
      >
        <path
          :d="`M.5 ${height}V.5H${width}`"
          fill="none"
          stroke="currentColor"
          stroke-opacity="0.3"
        />
      </pattern>
    </defs>

    <rect
      width="100%"
      height="100%"
      :fill="`url(#${patternId})`"
      :stroke-dasharray="strokeDasharray"
    />

    <svg
      :x="x"
      :y="y"
      :class="ui.squares({ class: uiProps.ui?.squares })"
    >
      <rect
        v-for="square in squares"
        :key="square.key"
        :x="square.x"
        :y="square.y"
        :width="width - 1"
        :height="height - 1"
        :class="ui.square({ class: uiProps.ui?.square })"
        stroke-width="0"
        fill="currentColor"
        :style="{
          'animationDelay': `${square.delay}s`,
          'animationDuration': `${Math.max(duration, 0.1)}s`,
          '--square-opacity': `${maxOpacity}`,
        }"
      />
    </svg>
  </svg>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedGridPattern from '../theme/animated-grid-pattern'

export interface AnimatedGridPatternProps {
  /** Extra classes for the `<svg>`. */
  class?: string
  /** Colour of the grid and the twinkling squares. */
  color?: string
  /** Seconds for one pulse of a square. */
  duration?: number
  /** Cell height, in pixels. */
  height?: number
  /** Ceiling for a square's opacity. */
  maxOpacity?: number
  /** How many squares to scatter across the grid. */
  numSquares?: number
  /** Dash pattern for the grid strokes. */
  strokeDasharray?: string
  ui?: Record<string, any>
  /** Cell width, in pixels. */
  width?: number
  /** Horizontal offset of the pattern origin. */
  x?: number
  /** Vertical offset of the pattern origin. */
  y?: number
}

const props = withDefaults(defineProps<AnimatedGridPatternProps>(), {
  class: undefined,
  color: 'var(--ui-border)',
  duration: 4,
  height: 40,
  maxOpacity: 0.5,
  numSquares: 50,
  strokeDasharray: '0',
  ui: undefined,
  width: 40,
  x: -1,
  y: -1,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'animatedGridPattern',
  props,
  theme: animatedGridPattern,
})

/** `useId` keeps the pattern id stable between the server render and hydration. */
const patternId = `agp-${useId()}`

interface Square {
  delay: number
  key: string
  x: number
  y: number
}

const rootRef = ref<SVGSVGElement | null>(null)
const squares = ref<Square[]>([])

let resizeObserver: ResizeObserver | undefined

/**
 * Squares are placed on the same lattice as the grid so a pulse always lands
 * inside a cell rather than straddling the stroke.
 */
const buildSquares = () => {
  const root = rootRef.value
  if (!root) {
    return
  }

  const width = root.clientWidth
  const height = root.clientHeight
  const columns = Math.max(1, Math.floor(width / props.width))
  const rows = Math.max(1, Math.floor(height / props.height))
  const count = Math.min(props.numSquares, columns * rows)

  const picked = new Set<number>()
  const next: Square[] = []

  while (next.length < count && picked.size < columns * rows) {
    const cell = Math.floor(Math.random() * columns * rows)
    if (picked.has(cell)) {
      continue
    }
    picked.add(cell)

    const column = cell % columns
    const row = Math.floor(cell / columns)

    next.push({
      key: `${column}-${row}`,
      x: column * props.width,
      y: row * props.height,
      delay: Math.random() * Math.max(props.duration, 0.1),
    })
  }

  squares.value = next
}

onMounted(() => {
  buildSquares()

  if (rootRef.value) {
    resizeObserver = new ResizeObserver(buildSquares)
    resizeObserver.observe(rootRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

watch(
  () => [props.width, props.height, props.numSquares],
  buildSquares,
)
</script>

<style scoped>
.animated-grid-pattern-square {
  animation-name: m-grid-pattern-pulse;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  opacity: 0;
}

@keyframes m-grid-pattern-pulse {
  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: var(--square-opacity, 0.5);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animated-grid-pattern-square {
    animation: none;
    opacity: calc(var(--square-opacity, 0.5) * 0.4);
  }
}
</style>
