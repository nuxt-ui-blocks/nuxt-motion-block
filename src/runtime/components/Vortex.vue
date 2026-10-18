<template>
  <div :class="ui.root({ class: [props.containerClass, uiProps.ui?.root] })">
    <motion.div
      ref="containerRef"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :class="ui.background({ class: uiProps.ui?.background })"
    >
      <canvas
        ref="canvasRef"
        :class="ui.canvas({ class: uiProps.ui?.canvas })"
      />
    </motion.div>

    <div :class="ui.content({ class: [uiProps.ui?.content, uiProps.class] })">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { createNoise3D } from 'simplex-noise' // for 3D noise add this package as dependency make sure add details in docs
import { useColorMode } from '#imports'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import vortex from '../theme/vortex'
import { resolveColor } from '../utils/theme-color'

interface VortexProps {
  class?: string
  containerClass?: string
  particleCount?: number
  rangeY?: number
  baseHue?: number
  baseSpeed?: number
  rangeSpeed?: number
  baseRadius?: number
  rangeRadius?: number
  backgroundColor?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<VortexProps>(), {
  particleCount: 700,
  rangeY: 100,
  baseHue: 220,
  baseSpeed: 0.0,
  rangeSpeed: 1.5,
  baseRadius: 1,
  rangeRadius: 2,
  backgroundColor: '#000000',
  class: undefined,
  containerClass: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'vortex',
  props,
  theme: vortex,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const animationFrameId = ref<number>()

const colorMode = useColorMode()
const resolvedBackgroundColor = ref(props.backgroundColor)

// `backgroundColor` accepts a theme token (`'primary'`, `'var(--ui-primary)'`)
// or any CSS colour; resolve it against the active theme so the canvas paints
// the concrete value.
const resolveBackgroundColor = () => {
  const target = containerRef.value ?? undefined
  resolvedBackgroundColor.value = resolveColor(props.backgroundColor, { target }) ?? props.backgroundColor
}

watch(
  [() => props.backgroundColor, () => colorMode.value],
  resolveBackgroundColor,
)

// Constants
const particlePropCount = 9
const particlePropsLength = props.particleCount * particlePropCount
const baseTTL = 50
const rangeTTL = 150
const rangeHue = 100
const noiseSteps = 3
const xOff = 0.00125
const yOff = 0.00125
const zOff = 0.0005

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HALF_PI: number = 0.5 * Math.PI
const TAU: number = 2 * Math.PI
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TO_RAD: number = Math.PI / 180

let tick = 0
const noise3D = createNoise3D()
let particleProps = new Float32Array(particlePropsLength)
const center: [number, number] = [0, 0]

// Utility functions
const rand = (n: number): number => n * Math.random()
const randRange = (n: number): number => n - rand(2 * n)
const fadeInOut = (t: number, m: number): number => {
  const hm = 0.5 * m
  return Math.abs(((t + hm) % m) - hm) / hm
}
const lerp = (n1: number, n2: number, speed: number): number =>
  (1 - speed) * n1 + speed * n2

const setup = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  resize(canvas)
  initParticles()
  draw(canvas, ctx)
}

const initParticles = () => {
  tick = 0
  particleProps = new Float32Array(particlePropsLength)

  for (let i = 0; i < particlePropsLength; i += particlePropCount) {
    initParticle(i)
  }
}

const initParticle = (i: number) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const x = rand(canvas.width)
  const y = center[1] + randRange(props.rangeY)
  const vx = 0
  const vy = 0
  const life = 0
  const ttl = baseTTL + rand(rangeTTL)
  const speed = props.baseSpeed + rand(props.rangeSpeed)
  const radius = props.baseRadius + rand(props.rangeRadius)
  const hue = props.baseHue + rand(rangeHue)

  particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i)
}

const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  tick++

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = resolvedBackgroundColor.value
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  drawParticles(ctx)
  renderGlow(canvas, ctx)
  renderToScreen(canvas, ctx)

  animationFrameId.value = requestAnimationFrame(() => draw(canvas, ctx))
}

const drawParticles = (ctx: CanvasRenderingContext2D) => {
  for (let i = 0; i < particlePropsLength; i += particlePropCount) {
    updateParticle(i, ctx)
  }
}

const updateParticle = (i: number, ctx: CanvasRenderingContext2D) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i

  const x = particleProps[i]
  const y = particleProps[i2]
  const n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU
  const vx = lerp(particleProps[i3], Math.cos(n), 0.5)
  const vy = lerp(particleProps[i4], Math.sin(n), 0.5)
  let life = particleProps[i5]
  const ttl = particleProps[i6]
  const speed = particleProps[i7]
  const x2 = x + vx * speed
  const y2 = y + vy * speed
  const radius = particleProps[i8]
  const hue = particleProps[i9]

  drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx)

  life++

  particleProps[i] = x2
  particleProps[i2] = y2
  particleProps[i3] = vx
  particleProps[i4] = vy
  particleProps[i5] = life

  if (checkBounds(x, y, canvas) || life > ttl) {
    initParticle(i)
  }
}

const drawParticle = (
  x: number,
  y: number,
  x2: number,
  y2: number,
  life: number,
  ttl: number,
  radius: number,
  hue: number,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.save()
  ctx.lineCap = 'round'
  ctx.lineWidth = radius
  ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}

const checkBounds = (x: number, y: number, canvas: HTMLCanvasElement) => {
  return x > canvas.width || x < 0 || y > canvas.height || y < 0
}

const resize = (canvas: HTMLCanvasElement) => {
  if (typeof window === 'undefined') return

  const { innerWidth, innerHeight } = window
  canvas.width = innerWidth
  canvas.height = innerHeight
  center[0] = 0.5 * canvas.width
  center[1] = 0.5 * canvas.height
}

const renderGlow = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  ctx.save()
  ctx.filter = 'blur(8px) brightness(200%)'
  ctx.globalCompositeOperation = 'lighter'
  ctx.drawImage(canvas, 0, 0)
  ctx.restore()

  ctx.save()
  ctx.filter = 'blur(4px) brightness(200%)'
  ctx.globalCompositeOperation = 'lighter'
  ctx.drawImage(canvas, 0, 0)
  ctx.restore()
}

const renderToScreen = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  ctx.drawImage(canvas, 0, 0)
  ctx.restore()
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (ctx) {
    resize(canvas)
  }
}

onMounted(() => {
  resolveBackgroundColor()
  setup()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
})
</script>
