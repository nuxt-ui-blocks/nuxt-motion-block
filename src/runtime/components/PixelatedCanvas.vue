<template>
  <canvas
    ref="canvasRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    aria-label="Pixelated rendering of source image"
    role="img"
  />
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import pixelatedCanvas from '../theme/pixelated-canvas'
import { colorToRgb, resolveColor } from '../utils/theme-color'

interface PixelatedCanvasProps {
  src: string
  width?: number
  height?: number
  cellSize?: number
  dotScale?: number
  shape?: 'circle' | 'square'
  backgroundColor?: string
  grayscale?: boolean
  class?: string
  responsive?: boolean
  dropoutStrength?: number
  interactive?: boolean
  distortionStrength?: number
  distortionRadius?: number
  distortionMode?: 'repel' | 'attract' | 'swirl'
  followSpeed?: number
  sampleAverage?: boolean
  tintColor?: string
  tintStrength?: number
  maxFps?: number
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
  jitterStrength?: number
  jitterSpeed?: number
  fadeOnLeave?: boolean
  fadeSpeed?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<PixelatedCanvasProps>(), {
  width: 400,
  height: 500,
  cellSize: 3,
  dotScale: 0.9,
  shape: 'square',
  backgroundColor: '#000000',
  grayscale: false,
  responsive: false,
  dropoutStrength: 0.4,
  interactive: true,
  distortionStrength: 3,
  distortionRadius: 80,
  distortionMode: 'swirl',
  followSpeed: 0.2,
  sampleAverage: true,
  tintColor: '#FFFFFF',
  tintStrength: 0.2,
  maxFps: 60,
  objectFit: 'cover',
  jitterStrength: 4,
  jitterSpeed: 4,
  fadeOnLeave: true,
  fadeSpeed: 0.1,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'pixelatedCanvas',
  props,
  theme: pixelatedCanvas,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

const colorMode = useColorMode()
const loadedImage = ref<HTMLImageElement | null>(null)
const resolvedBackgroundColor = ref(props.backgroundColor)
const resolvedTintColor = ref(props.tintColor)

// Both colours accept a theme token (`'primary'`, `'var(--ui-primary)'`) or any
// CSS colour; resolve them against the active theme before they reach the
// canvas, so a token tracks light/dark instead of painting a raw string.
const resolveColors = () => {
  const target = canvasRef.value ?? undefined
  resolvedBackgroundColor.value = resolveColor(props.backgroundColor, { target }) ?? props.backgroundColor
  resolvedTintColor.value = resolveColor(props.tintColor, { target }) ?? props.tintColor
}

const rerender = () => {
  const canvas = canvasRef.value
  if (!canvas || !loadedImage.value) return
  computeSamples(loadedImage.value, canvas)
  if (!props.interactive) drawStatic()
}

watch(
  [() => props.backgroundColor, () => props.tintColor, () => colorMode.value],
  () => {
    resolveColors()
    rerender()
  },
)

// Refs for state management
const samples = ref<Array<{
  x: number
  y: number
  r: number
  g: number
  b: number
  a: number
  drop: boolean
  seed: number
}>>([])

const dims = ref<{
  width: number
  height: number
  dot: number
} | null>(null)

const targetMouse = ref({ x: -9999, y: -9999 })
const animMouse = ref({ x: -9999, y: -9999 })
const rafId = ref<number | null>(null)
const lastFrame = ref(0)
const pointerInside = ref(false)
const activity = ref(0)
const activityTarget = ref(0)

// Utility functions
const hash2D = (ix: number, iy: number) => {
  const s = Math.sin(ix * 12.9898 + iy * 78.233) * 43758.5453123
  return s - Math.floor(s)
}

const computeSamples = (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  const displayWidth = props.width ?? img.naturalWidth
  const displayHeight = props.height ?? img.naturalHeight

  canvas.width = Math.max(1, Math.floor(displayWidth * dpr))
  canvas.height = Math.max(1, Math.floor(displayHeight * dpr))
  canvas.style.width = `${displayWidth}px`
  canvas.style.height = `${displayHeight}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.resetTransform()
  ctx.scale(dpr, dpr)

  if (resolvedBackgroundColor.value) {
    ctx.fillStyle = resolvedBackgroundColor.value
    ctx.fillRect(0, 0, displayWidth, displayHeight)
  }
  else {
    ctx.clearRect(0, 0, displayWidth, displayHeight)
  }

  const offscreen = document.createElement('canvas')
  offscreen.width = Math.max(1, Math.floor(displayWidth))
  offscreen.height = Math.max(1, Math.floor(displayHeight))
  const off = offscreen.getContext('2d')
  if (!off) return

  const iw = img.naturalWidth || displayWidth
  const ih = img.naturalHeight || displayHeight
  let dw = displayWidth
  let dh = displayHeight
  let dx = 0
  let dy = 0

  switch (props.objectFit) {
    case 'cover':
    { const coverScale = Math.max(displayWidth / iw, displayHeight / ih)
      dw = Math.ceil(iw * coverScale)
      dh = Math.ceil(ih * coverScale)
      dx = Math.floor((displayWidth - dw) / 2)
      dy = Math.floor((displayHeight - dh) / 2)
      break }
    case 'contain':
    { const containScale = Math.min(displayWidth / iw, displayHeight / ih)
      dw = Math.ceil(iw * containScale)
      dh = Math.ceil(ih * containScale)
      dx = Math.floor((displayWidth - dw) / 2)
      dy = Math.floor((displayHeight - dh) / 2)
      break }
    case 'fill':
      dw = displayWidth
      dh = displayHeight
      break
    default: // "none"
      dw = iw
      dh = ih
      dx = Math.floor((displayWidth - dw) / 2)
      dy = Math.floor((displayHeight - dh) / 2)
  }

  off.drawImage(img, dx, dy, dw, dh)

  let imageData: ImageData
  try {
    imageData = off.getImageData(0, 0, offscreen.width, offscreen.height)
  }
  catch {
    ctx.drawImage(img, 0, 0, displayWidth, displayHeight)
    return
  }

  const data = imageData.data
  const stride = offscreen.width * 4
  const effectiveDotSize = Math.max(1, Math.floor(props.cellSize * props.dotScale))

  dims.value = {
    width: displayWidth,
    height: displayHeight,
    dot: effectiveDotSize,
  }

  const luminanceAt = (px: number, py: number) => {
    const ix = Math.max(0, Math.min(offscreen.width - 1, px))
    const iy = Math.max(0, Math.min(offscreen.height - 1, py))
    const i = iy * stride + ix * 4
    const rr = data[i]
    const gg = data[i + 1]
    const bb = data[i + 2]
    return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb
  }

  const newSamples: typeof samples.value = []
  let tintRGB: [number, number, number] | null = null

  if (resolvedTintColor.value && props.tintStrength > 0) {
    tintRGB = colorToRgb(resolvedTintColor.value)
  }

  for (let y = 0; y < offscreen.height; y += props.cellSize) {
    const cy = Math.min(offscreen.height - 1, y + Math.floor(props.cellSize / 2))
    for (let x = 0; x < offscreen.width; x += props.cellSize) {
      const cx = Math.min(offscreen.width - 1, x + Math.floor(props.cellSize / 2))
      let r = 0
      let g = 0
      let b = 0
      let a = 0

      if (!props.sampleAverage) {
        const idx = cy * stride + cx * 4
        r = data[idx]
        g = data[idx + 1]
        b = data[idx + 2]
        a = data[idx + 3] / 255
      }
      else {
        let count = 0
        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            const sx = Math.max(0, Math.min(offscreen.width - 1, cx + ox))
            const sy = Math.max(0, Math.min(offscreen.height - 1, cy + oy))
            const sIdx = sy * stride + sx * 4
            r += data[sIdx]
            g += data[sIdx + 1]
            b += data[sIdx + 2]
            a += data[sIdx + 3] / 255
            count++
          }
        }
        r = Math.round(r / count)
        g = Math.round(g / count)
        b = Math.round(b / count)
        a = a / count
      }

      if (props.grayscale) {
        const L = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b)
        r = L
        g = L
        b = L
      }
      else if (tintRGB && props.tintStrength > 0) {
        const k = Math.max(0, Math.min(1, props.tintStrength))
        r = Math.round(r * (1 - k) + tintRGB[0] * k)
        g = Math.round(g * (1 - k) + tintRGB[1] * k)
        b = Math.round(b * (1 - k) + tintRGB[2] * k)
      }

      const Lc = luminanceAt(cx, cy)
      const Lx1 = luminanceAt(cx - 1, cy)
      const Lx2 = luminanceAt(cx + 1, cy)
      const Ly1 = luminanceAt(cx, cy - 1)
      const Ly2 = luminanceAt(cx, cy + 1)
      const grad
        = Math.abs(Lx2 - Lx1)
          + Math.abs(Ly2 - Ly1)
          + Math.abs(Lc - (Lx1 + Lx2 + Ly1 + Ly2) / 4)
      const gradientNorm = Math.max(0, Math.min(1, grad / 255))
      const dropoutProb = Math.max(0, Math.min(1, (1 - gradientNorm) * props.dropoutStrength))
      const drop = hash2D(cx, cy) < dropoutProb
      const seed = hash2D(cx, cy)

      newSamples.push({ x, y, r, g, b, a, drop, seed })
    }
  }

  samples.value = newSamples
}

const drawStatic = () => {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!ctx || !dims.value || !samples.value) return

  if (resolvedBackgroundColor.value) {
    ctx.fillStyle = resolvedBackgroundColor.value
    ctx.fillRect(0, 0, dims.value.width, dims.value.height)
  }
  else {
    ctx.clearRect(0, 0, dims.value.width, dims.value.height)
  }

  for (const s of samples.value) {
    if (s.drop || s.a <= 0) continue
    ctx.globalAlpha = s.a
    ctx.fillStyle = `rgb(${s.r}, ${s.g}, ${s.b})`
    if (props.shape === 'circle') {
      const radius = dims.value.dot / 2
      ctx.beginPath()
      ctx.arc(s.x + props.cellSize / 2, s.y + props.cellSize / 2, radius, 0, Math.PI * 2)
      ctx.fill()
    }
    else {
      ctx.fillRect(
        s.x + props.cellSize / 2 - dims.value.dot / 2,
        s.y + props.cellSize / 2 - dims.value.dot / 2,
        dims.value.dot,
        dims.value.dot,
      )
    }
  }
  ctx.globalAlpha = 1
}

const animate = () => {
  const now = performance.now()
  const minDelta = 1000 / Math.max(1, props.maxFps)
  if (now - lastFrame.value < minDelta) {
    rafId.value = requestAnimationFrame(animate)
    return
  }
  lastFrame.value = now

  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!ctx || !dims.value || !samples.value) {
    rafId.value = requestAnimationFrame(animate)
    return
  }

  // Smooth mouse follow
  animMouse.value.x = animMouse.value.x + (targetMouse.value.x - animMouse.value.x) * props.followSpeed
  animMouse.value.y = animMouse.value.y + (targetMouse.value.y - animMouse.value.y) * props.followSpeed

  // Activity fade
  if (props.fadeOnLeave) {
    activity.value = activity.value + (activityTarget.value - activity.value) * props.fadeSpeed
  }
  else {
    activity.value = pointerInside.value ? 1 : 0
  }

  // Clear canvas
  if (resolvedBackgroundColor.value) {
    ctx.fillStyle = resolvedBackgroundColor.value
    ctx.fillRect(0, 0, dims.value.width, dims.value.height)
  }
  else {
    ctx.clearRect(0, 0, dims.value.width, dims.value.height)
  }

  const mx = animMouse.value.x
  const my = animMouse.value.y
  const sigma = Math.max(1, props.distortionRadius * 0.5)
  const t = now * 0.001 * props.jitterSpeed
  const currentActivity = Math.max(0, Math.min(1, activity.value))

  // Draw samples with distortion
  for (const s of samples.value) {
    if (s.drop || s.a <= 0) continue
    let drawX = s.x + props.cellSize / 2
    let drawY = s.y + props.cellSize / 2
    const dx = drawX - mx
    const dy = drawY - my
    const dist2 = dx * dx + dy * dy
    const falloff = Math.exp(-dist2 / (2 * sigma * sigma))
    const influence = falloff * currentActivity

    if (influence > 0.0005) {
      // Apply distortion based on mode
      switch (props.distortionMode) {
        case 'repel':
        { const dist = Math.sqrt(dist2) + 0.0001
          drawX += (dx / dist) * props.distortionStrength * influence
          drawY += (dy / dist) * props.distortionStrength * influence
          break }
        case 'attract':
        { const distA = Math.sqrt(dist2) + 0.0001
          drawX -= (dx / distA) * props.distortionStrength * influence
          drawY -= (dy / distA) * props.distortionStrength * influence
          break }
        case 'swirl':
        { const angle = props.distortionStrength * 0.05 * influence
          const cosA = Math.cos(angle)
          const sinA = Math.sin(angle)
          const rx = cosA * dx - sinA * dy
          const ry = sinA * dx + cosA * dy
          drawX = mx + rx
          drawY = my + ry
          break }
      }

      // Apply jitter
      if (props.jitterStrength > 0) {
        const k = s.seed * 43758.5453
        const jx = Math.sin(t + k) * props.jitterStrength * influence
        const jy = Math.cos(t + k * 1.13) * props.jitterStrength * influence
        drawX += jx
        drawY += jy
      }
    }

    ctx.globalAlpha = s.a
    ctx.fillStyle = `rgb(${s.r}, ${s.g}, ${s.b})`
    if (props.shape === 'circle') {
      const radius = dims.value.dot / 2
      ctx.beginPath()
      ctx.arc(drawX, drawY, radius, 0, Math.PI * 2)
      ctx.fill()
    }
    else {
      ctx.fillRect(
        drawX - dims.value.dot / 2,
        drawY - dims.value.dot / 2,
        dims.value.dot,
        dims.value.dot,
      )
    }
  }
  ctx.globalAlpha = 1

  rafId.value = requestAnimationFrame(animate)
}

// Event handlers
const handlePointerMove = (e: PointerEvent) => {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  targetMouse.value.x = e.clientX - rect.left
  targetMouse.value.y = e.clientY - rect.top
  pointerInside.value = true
  activityTarget.value = 1
}

const handlePointerEnter = () => {
  pointerInside.value = true
  activityTarget.value = 1
}

const handlePointerLeave = () => {
  pointerInside.value = false
  if (props.fadeOnLeave) {
    activityTarget.value = 0
  }
  else {
    targetMouse.value.x = -9999
    targetMouse.value.y = -9999
  }
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const img = new Image()
  img.onload = () => {
    loadedImage.value = img
    computeSamples(img, canvas)
  }
  img.src = props.src
}

// Initialize component
onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  resolveColors()

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = props.src

  img.onload = () => {
    loadedImage.value = img
    computeSamples(img, canvas)

    if (!props.interactive) {
      drawStatic()
      return
    }

    // Add event listeners for interactive mode
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerenter', handlePointerEnter)
    canvas.addEventListener('pointerleave', handlePointerLeave)

    // Start animation loop
    rafId.value = requestAnimationFrame(animate)
  }

  img.onerror = () => {
    console.error('Failed to load image for PixelatedCanvas:', props.src)
  }

  // Handle responsive resize
  if (props.responsive) {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  // Cleanup
  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
  }

  const canvas = canvasRef.value
  if (canvas) {
    canvas.removeEventListener('pointermove', handlePointerMove)
    canvas.removeEventListener('pointerenter', handlePointerEnter)
    canvas.removeEventListener('pointerleave', handlePointerLeave)
  }

  if (props.responsive) {
    window.removeEventListener('resize', handleResize)
  }
})
</script>
