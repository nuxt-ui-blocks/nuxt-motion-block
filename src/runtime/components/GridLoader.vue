<template>
  <output
    aria-label="Loading"
    role="status"
    class="inline-grid grid-cols-3"
    :class="$attrs.class"
    :style="{
      filter: blur ? `blur(${blur}px)` : undefined,
      gap: `${gap}px`,
      width: `${resolvedSize}px`,
      height: `${resolvedSize}px`,
    }"
  >
    <template
      v-for="(active, idx) in cells"
      :key="cellKeys[idx]"
    >
      <div
        v-if="active === 1 && disableAnimation"
        :style="cellStyle"
      />
      <motion.div
        v-else-if="active === 1"
        :animate="cellAnimation"
        :transition="getTransition(idx)"
        :style="cellStyle"
      />
      <div
        v-else
        :style="spacerStyle"
      />
    </template>
  </output>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { motion } from 'motion-v'

type GridMatrix = [
  [0 | 1, 0 | 1, 0 | 1],
  [0 | 1, 0 | 1, 0 | 1],
  [0 | 1, 0 | 1, 0 | 1],
]

type PresetPattern
  = | 'solo-center' | 'solo-tl' | 'solo-tr' | 'solo-bl' | 'solo-br'
    | 'line-h-top' | 'line-h-mid' | 'line-h-bot'
    | 'line-v-left' | 'line-v-mid' | 'line-v-right'
    | 'line-diag-1' | 'line-diag-2'
    | 'corners-only' | 'corners-sync' | 'corners'
    | 'plus-hollow' | 'plus-full'
    | 'L-tl' | 'L-tr' | 'L-bl' | 'L-br'
    | 'T-top' | 'T-bot' | 'T-left' | 'T-right'
    | 'duo-h' | 'duo-v' | 'duo-diag'
    | 'frame' | 'frame-sync'
    | 'sparse-1' | 'sparse-2' | 'sparse-3'
    | 'wave-lr' | 'wave-rl' | 'wave-tb' | 'wave-bt'
    | 'diagonal-tl' | 'diagonal-tr' | 'diagonal-bl' | 'diagonal-br'
    | 'ripple-out' | 'ripple-in'
    | 'cross' | 'x-shape' | 'diamond'
    | 'stripes-h' | 'stripes-v'
    | 'checkerboard' | 'rows-alt'
    | 'spiral-cw' | 'spiral-ccw'
    | 'snake' | 'snake-rev'
    | 'rain' | 'rain-rev'
    | 'waterfall' | 'breathing' | 'heartbeat' | 'twinkle' | 'sparkle' | 'chaos'
    | 'edge-cw' | 'border'

interface Props {
  blur?: number
  className?: string
  color?: 'white' | 'red' | 'blue' | 'green' | 'amber' | string
  gap?: number
  mode?: 'pulse' | 'sequence' | 'stagger'
  pattern?: PresetPattern | GridMatrix
  rounded?: boolean
  sequence?: Array<PresetPattern | GridMatrix>
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  speed?: 'slow' | 'normal' | 'fast'
  static?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  blur: 0,
  gap: 0,
  mode: 'pulse',
  pattern: 'plus-hollow',
  rounded: false,
  sequence: () => [],
  size: 'md',
  speed: 'normal',
  static: false,
})

const PATTERNS: Record<PresetPattern, GridMatrix> = {
  'solo-center': [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
  'solo-tl': [[1, 0, 0], [0, 0, 0], [0, 0, 0]],
  'solo-tr': [[0, 0, 1], [0, 0, 0], [0, 0, 0]],
  'solo-bl': [[0, 0, 0], [0, 0, 0], [1, 0, 0]],
  'solo-br': [[0, 0, 0], [0, 0, 0], [0, 0, 1]],
  'line-h-top': [[1, 1, 1], [0, 0, 0], [0, 0, 0]],
  'line-h-mid': [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
  'line-h-bot': [[0, 0, 0], [0, 0, 0], [1, 1, 1]],
  'line-v-left': [[1, 0, 0], [1, 0, 0], [1, 0, 0]],
  'line-v-mid': [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
  'line-v-right': [[0, 0, 1], [0, 0, 1], [0, 0, 1]],
  'line-diag-1': [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
  'line-diag-2': [[0, 0, 1], [0, 1, 0], [1, 0, 0]],
  'corners-only': [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
  'corners-sync': [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
  'corners': [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
  'plus-hollow': [[0, 1, 0], [1, 0, 1], [0, 1, 0]],
  'plus-full': [[0, 1, 0], [1, 1, 1], [0, 1, 0]],
  'L-tl': [[1, 1, 0], [1, 0, 0], [0, 0, 0]],
  'L-tr': [[0, 1, 1], [0, 0, 1], [0, 0, 0]],
  'L-bl': [[0, 0, 0], [1, 0, 0], [1, 1, 0]],
  'L-br': [[0, 0, 0], [0, 0, 1], [0, 1, 1]],
  'T-top': [[1, 1, 1], [0, 1, 0], [0, 0, 0]],
  'T-bot': [[0, 0, 0], [0, 1, 0], [1, 1, 1]],
  'T-left': [[1, 0, 0], [1, 1, 0], [1, 0, 0]],
  'T-right': [[0, 0, 1], [0, 1, 1], [0, 0, 1]],
  'duo-h': [[0, 0, 0], [1, 1, 0], [0, 0, 0]],
  'duo-v': [[0, 1, 0], [0, 1, 0], [0, 0, 0]],
  'duo-diag': [[1, 0, 0], [0, 1, 0], [0, 0, 0]],
  'frame': [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
  'frame-sync': [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
  'sparse-1': [[1, 0, 0], [0, 0, 1], [0, 1, 0]],
  'sparse-2': [[0, 1, 0], [1, 0, 0], [0, 0, 1]],
  'sparse-3': [[0, 0, 1], [0, 1, 0], [1, 0, 0]],
  'wave-lr': [[1, 1, 0], [1, 1, 0], [1, 1, 0]],
  'wave-rl': [[0, 1, 1], [0, 1, 1], [0, 1, 1]],
  'wave-tb': [[1, 1, 1], [1, 1, 1], [0, 0, 0]],
  'wave-bt': [[0, 0, 0], [1, 1, 1], [1, 1, 1]],
  'diagonal-tl': [[1, 1, 0], [1, 1, 0], [0, 0, 0]],
  'diagonal-tr': [[0, 1, 1], [0, 1, 1], [0, 0, 0]],
  'diagonal-bl': [[0, 0, 0], [1, 1, 0], [1, 1, 0]],
  'diagonal-br': [[0, 0, 0], [0, 1, 1], [0, 1, 1]],
  'ripple-out': [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
  'ripple-in': [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
  'cross': [[0, 1, 0], [1, 1, 1], [0, 1, 0]],
  'x-shape': [[1, 0, 1], [0, 1, 0], [1, 0, 1]],
  'diamond': [[0, 1, 0], [1, 0, 1], [0, 1, 0]],
  'stripes-h': [[1, 1, 1], [0, 0, 0], [1, 1, 1]],
  'stripes-v': [[1, 0, 1], [1, 0, 1], [1, 0, 1]],
  'checkerboard': [[1, 0, 1], [0, 1, 0], [1, 0, 1]],
  'rows-alt': [[1, 1, 1], [0, 0, 0], [1, 1, 1]],
  'spiral-cw': [[1, 1, 1], [0, 0, 1], [0, 0, 1]],
  'spiral-ccw': [[1, 1, 1], [1, 0, 0], [1, 0, 0]],
  'snake': [[1, 1, 0], [0, 1, 0], [0, 0, 0]],
  'snake-rev': [[0, 0, 0], [0, 1, 0], [0, 1, 1]],
  'rain': [[0, 1, 0], [0, 1, 0], [0, 0, 0]],
  'rain-rev': [[0, 0, 0], [0, 1, 0], [0, 1, 0]],
  'waterfall': [[1, 1, 0], [0, 0, 0], [0, 0, 0]],
  'breathing': [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
  'heartbeat': [[0, 1, 0], [1, 1, 1], [0, 1, 0]],
  'twinkle': [[1, 0, 0], [0, 0, 1], [0, 1, 0]],
  'sparkle': [[1, 0, 1], [0, 1, 0], [1, 0, 1]],
  'chaos': [[1, 0, 1], [0, 1, 0], [1, 0, 0]],
  'edge-cw': [[1, 1, 1], [0, 0, 0], [0, 0, 0]],
  'border': [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
}

const COLORS: Record<string, string> = {
  amber: 'var(--color-warning)',
  warning: 'var(--color-warning)',
  blue: 'var(--color-info)',
  info: 'var(--color-info)',
  green: 'var(--color-success)',
  success: 'var(--color-success)',
  red: 'var(--color-error)',
  error: 'var(--color-error)',
  white: 'var(--color-neutral-100)',
  neutral: 'var(--color-neutral-100)',
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
}

const SIZES: Record<string, number> = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
}

const SPEEDS: Record<string, number> = {
  fast: 400,
  normal: 800,
  slow: 1500,
}

function resolvePattern(pattern: PresetPattern | GridMatrix | undefined): GridMatrix {
  if (!pattern) return PATTERNS['plus-hollow']
  if (typeof pattern === 'string') return PATTERNS[pattern] ?? PATTERNS['plus-hollow']
  return pattern
}

function resolveColor(color: string | undefined): string {
  if (!color) return COLORS.white
  return COLORS[color] ?? color
}

function resolveSize(size: 'sm' | 'md' | 'lg' | 'xl' | number | undefined): number {
  if (size === undefined) return SIZES.md
  if (typeof size === 'number') return size
  return SIZES[size] ?? SIZES.md
}

const shouldReduceMotion = ref(false)
onMounted(() => {
  if (typeof window !== 'undefined') {
    shouldReduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
})

const sequenceIndex = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

const resolvedSize = computed(() => resolveSize(props.size))
const cellSize = computed(() => (resolvedSize.value - props.gap * 2) / 3)
const resolvedColor = computed(() => resolveColor(props.color))
const cycleDuration = computed(() => SPEEDS[props.speed] ?? SPEEDS.normal)
const glowSize = computed(() => cellSize.value * 0.8)
const disableAnimation = computed(() => props.static || shouldReduceMotion.value)

const cellStyle = computed(() => ({
  backgroundColor: resolvedColor.value,
  borderRadius: props.rounded ? '50%' : undefined,
  boxShadow: `0 0 ${glowSize.value * 0.3}px ${resolvedColor.value}, 0 0 ${glowSize.value * 0.6}px color-mix(in srgb, ${resolvedColor.value} 25%, transparent), 0 0 ${glowSize.value * 1.2}px color-mix(in srgb, ${resolvedColor.value} 12%, transparent)`,
  width: `${cellSize.value}px`,
  height: `${cellSize.value}px`,
}))

const spacerStyle = computed(() => ({
  width: `${cellSize.value}px`,
  height: `${cellSize.value}px`,
}))

const currentGrid = computed<GridMatrix>(() => {
  if (props.mode === 'sequence' && props.sequence && props.sequence.length > 0) {
    return resolvePattern(props.sequence[sequenceIndex.value])
  }
  return resolvePattern(props.pattern)
})

const cells = computed(() => currentGrid.value.flat())

const cellKeys = ['tl', 'tm', 'tr', 'ml', 'mm', 'mr', 'bl', 'bm', 'br']

const staggerDelays = computed(() => {
  if (props.mode !== 'stagger') return cells.value.map(() => 0)

  const activeCellIndices = cells.value.reduce<number[]>((acc, cell, idx) => {
    if (cell === 1) acc.push(idx)
    return acc
  }, [])

  const delayPerCell = cycleDuration.value / 1000 / (activeCellIndices.length + 2)

  return cells.value.map((cell, idx) => {
    if (cell === 0) return 0
    const activeIndex = activeCellIndices.indexOf(idx)
    return activeIndex * delayPerCell
  })
})

const cellAnimation = computed(() => {
  if (props.mode === 'stagger') {
    return {
      opacity: [0, 1, 1, 0],
      scale: [0.8, 1, 1, 0.8],
    }
  }
  return {
    opacity: [0.4, 1, 0.4],
    scale: [0.95, 1, 0.95],
  }
})

function getTransition(idx: number) {
  if (disableAnimation.value) {
    return {
      duration: 0,
    }
  }

  return {
    delay: props.mode === 'stagger' ? staggerDelays.value[idx] : 0,
    duration: cycleDuration.value / 1000,
    ease: [0.645, 0.045, 0.355, 1],
    repeat: Infinity,
    times: props.mode === 'stagger' ? [0, 0.2, 0.8, 1] : undefined,
  }
}

onMounted(() => {
  if (props.mode === 'sequence' && props.sequence && props.sequence.length > 0 && !disableAnimation.value) {
    intervalId = setInterval(() => {
      sequenceIndex.value = (sequenceIndex.value + 1) % props.sequence.length
    }, cycleDuration.value)
  }
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
})

defineExpose({ PATTERNS, COLORS, SIZES })
</script>
