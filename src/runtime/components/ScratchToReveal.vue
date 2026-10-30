<template>
  <div
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="rootStyle"
  >
    <div :class="ui.content({ class: uiProps.ui?.content })">
      <slot />
    </div>

    <canvas
      ref="canvasRef"
      aria-hidden="true"
      :class="[ui.canvas({ class: uiProps.ui?.canvas }), revealed ? 'pointer-events-none opacity-0' : 'opacity-100']"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerUp"
      @pointercancel="onPointerUp"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import scratchToReveal from '../theme/scratch-to-reveal'

export interface ScratchToRevealProps {
  /** Radius of the scratch stroke, in pixels. */
  brushSize?: number
  /** Extra classes for the frame. */
  class?: string
  /** Colours the cover fades through, left to right. */
  gradientColors?: string[]
  /** Height of the frame, in pixels. Left out, the frame fills its parent. */
  height?: number
  /** Share of the cover, from `0` to `100`, that has to be scratched away before it lifts. */
  threshold?: number
  ui?: Record<string, any>
  /** Width of the frame, in pixels. Left out, the frame fills its parent. */
  width?: number
}

const props = withDefaults(defineProps<ScratchToRevealProps>(), {
  brushSize: 24,
  class: undefined,
  gradientColors: () => ['#a97cf8', '#f38cb8', '#fdcc92'],
  height: undefined,
  threshold: 50,
  ui: undefined,
  width: undefined,
})

const emit = defineEmits<{
  complete: []
}>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'scratchToReveal', props, theme: scratchToReveal })

const DPR_LIMIT = 2
const ALPHA_CUTOFF = 32

const rootRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const revealed = ref(false)

let resizeObserver: ResizeObserver | undefined
let drawing = false
let lastPoint: { x: number, y: number } | null = null

const rootStyle = computed(() => ({
  width: props.width ? `${props.width}px` : undefined,
  height: props.height ? `${props.height}px` : undefined,
}))

const context = () => canvasRef.value?.getContext('2d', { willReadFrequently: true }) ?? null

/** Paints the cover back over the whole canvas. */
const paintCover = () => {
  const canvas = canvasRef.value
  const ctx = context()
  if (!canvas || !ctx) {
    return
  }

  ctx.globalCompositeOperation = 'source-over'
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  const colors = props.gradientColors.length > 0 ? props.gradientColors : ['#a97cf8']
  colors.forEach((color, index) => {
    gradient.addColorStop(index / Math.max(colors.length - 1, 1), color)
  })

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const resize = () => {
  const root = rootRef.value
  const canvas = canvasRef.value
  if (!root || !canvas) {
    return
  }

  const ratio = Math.min(window.devicePixelRatio || 1, DPR_LIMIT)

  canvas.width = Math.max(1, Math.floor(root.clientWidth * ratio))
  canvas.height = Math.max(1, Math.floor(root.clientHeight * ratio))

  const ctx = context()
  if (ctx) {
    // Work in CSS pixels so the brush size is the same at any display scale.
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  }

  paintCover()
}

const pointFrom = (event: PointerEvent) => {
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) {
    return { x: 0, y: 0 }
  }

  return { x: event.clientX - rect.left, y: event.clientY - rect.top }
}

const scratchTo = (point: { x: number, y: number }) => {
  const ctx = context()
  if (!ctx) {
    return
  }

  ctx.globalCompositeOperation = 'destination-out'
  ctx.lineWidth = props.brushSize
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  const from = lastPoint ?? point
  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(point.x, point.y)
  ctx.stroke()

  lastPoint = point
}

/** Share of the cover that has been scratched away, from `0` to `100`. */
const clearedShare = () => {
  const canvas = canvasRef.value
  const ctx = context()
  if (!canvas || !ctx) {
    return 0
  }

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const step = 8
  let cleared = 0
  let total = 0

  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      total++
      if (data[(y * canvas.width + x) * 4 + 3]! < ALPHA_CUTOFF) {
        cleared++
      }
    }
  }

  return total === 0 ? 0 : (cleared / total) * 100
}

const settle = () => {
  if (revealed.value) {
    return
  }

  if (clearedShare() >= props.threshold) {
    revealed.value = true
    emit('complete')
  }
}

const onPointerDown = (event: PointerEvent) => {
  if (revealed.value) {
    return
  }

  drawing = true
  lastPoint = null
  canvasRef.value?.setPointerCapture(event.pointerId)
  scratchTo(pointFrom(event))
}

const onPointerMove = (event: PointerEvent) => {
  if (!drawing || revealed.value) {
    return
  }

  scratchTo(pointFrom(event))
}

const onPointerUp = (event: PointerEvent) => {
  if (!drawing) {
    return
  }

  drawing = false
  lastPoint = null
  if (canvasRef.value?.hasPointerCapture(event.pointerId)) {
    canvasRef.value.releasePointerCapture(event.pointerId)
  }
  settle()
}

/** Paints the cover back, ready to be scratched again. */
const reset = () => {
  revealed.value = false
  lastPoint = null
  drawing = false
  paintCover()
}

onMounted(() => {
  resize()

  if (rootRef.value) {
    resizeObserver = new ResizeObserver(() => {
      if (!revealed.value) {
        resize()
      }
    })
    resizeObserver.observe(rootRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

watch(() => props.gradientColors, () => {
  if (!revealed.value) {
    paintCover()
  }
})

defineExpose({ reset })
</script>
