<template>
  <div
    ref="containerRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{
      position: 'absolute',
      inset: 0,
      ...(style as any),
    }"
  >
    <canvas
      ref="canvasRef"
      :class="ui.canvas({ class: uiProps.ui?.canvas })"
      :style="{
        display: 'block',
        width: '100%',
        height: '100%',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, type StyleValue } from 'vue'
import { useColorMode } from '#imports'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import dottedGlowBackground from '../theme/dotted-glow-background'
import { resolveColor, resolveCssColor } from '../utils/theme-color'

interface DottedGlowBackgroundProps {
  class?: string
  style?: StyleValue
  gap?: number
  radius?: number
  color?: string
  darkColor?: string
  glowColor?: string
  darkGlowColor?: string
  colorLightVar?: string
  colorDarkVar?: string
  glowColorLightVar?: string
  glowColorDarkVar?: string
  opacity?: number
  backgroundOpacity?: number
  speedMin?: number
  speedMax?: number
  speedScale?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<DottedGlowBackgroundProps>(), {
  gap: 12,
  radius: 2,
  color: 'rgba(0,0,0,0.7)',
  glowColor: 'rgba(0, 170, 255, 0.85)',
  opacity: 0.6,
  backgroundOpacity: 0,
  speedMin: 0.4,
  speedMax: 1.3,
  speedScale: 1,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'dottedGlowBackground', props, theme: dottedGlowBackground })

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
const resolvedColor = ref(props.color)
const resolvedGlowColor = ref(props.glowColor)

const colorMode = useColorMode()

interface Dot {
  x: number
  y: number
  phase: number
  speed: number
}

// Initialize colors immediately
const initializeColors = () => {
  const container = containerRef.value ?? document.documentElement
  const isDark = colorMode.value === 'dark'

  const baseColor = resolveColor(props.color, { target: container, fallback: props.color }) ?? props.color
  const baseGlow = resolveColor(props.glowColor, { target: container, fallback: props.glowColor }) ?? props.glowColor
  const darkColor = props.darkColor
    ? resolveColor(props.darkColor, { target: container, fallback: props.darkColor }) ?? props.darkColor
    : undefined
  const darkGlow = props.darkGlowColor
    ? resolveColor(props.darkGlowColor, { target: container, fallback: props.darkGlowColor }) ?? props.darkGlowColor
    : undefined

  let nextColor: string = baseColor
  let nextGlow: string = baseGlow

  if (isDark) {
    const varDot = resolveCssVariable(container, props.colorDarkVar)
    const varGlow = resolveCssVariable(container, props.glowColorDarkVar)
    nextColor = varDot || darkColor || nextColor
    nextGlow = varGlow || darkGlow || nextGlow
  }
  else {
    const varDot = resolveCssVariable(container, props.colorLightVar)
    const varGlow = resolveCssVariable(container, props.glowColorLightVar)
    nextColor = varDot || nextColor
    nextGlow = varGlow || nextGlow
  }

  resolvedColor.value = nextColor
  resolvedGlowColor.value = nextGlow
}

// Resolve CSS variable value
/**
 * Resolve a theme variable read against the container, then fall back through
 * the cascade to the root — which is what `resolveCssColor` does with `var()`.
 */
const resolveCssVariable = (el: Element, variableName?: string): string | null => {
  if (!variableName) return null
  const normalized = variableName.startsWith('--') ? variableName : `--${variableName}`
  return resolveCssColor(`var(${normalized})`, { target: el as HTMLElement })
}

// Update colors when props or color mode changes
const updateColors = () => {
  initializeColors()
}

// Initialize colors immediately and watch for changes
onMounted(() => {
  initializeColors()
})

watch(
  () => [
    colorMode.value,
    props.color,
    props.darkColor,
    props.glowColor,
    props.darkGlowColor,
    props.colorLightVar,
    props.colorDarkVar,
    props.glowColorLightVar,
    props.glowColorDarkVar,
  ],
  updateColors,
  { deep: true },
)

// Canvas animation
onMounted(() => {
  const el = canvasRef.value
  const container = containerRef.value
  if (!el || !container) return

  const ctx = el.getContext('2d')
  if (!ctx) return

  let raf = 0
  let stopped = false

  const dpr = Math.max(1, window.devicePixelRatio || 1)

  const resize = () => {
    const { width, height } = container.getBoundingClientRect()
    el.width = Math.max(1, Math.floor(width * dpr))
    el.height = Math.max(1, Math.floor(height * dpr))
    el.style.width = `${Math.floor(width)}px`
    el.style.height = `${Math.floor(height)}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const ro = new ResizeObserver(resize)
  ro.observe(container)
  resize()

  let dots: Dot[] = []

  const regenDots = () => {
    dots = []
    const { width, height } = container.getBoundingClientRect()
    const cols = Math.ceil(width / props.gap) + 2
    const rows = Math.ceil(height / props.gap) + 2
    const min = Math.min(props.speedMin, props.speedMax)
    const max = Math.max(props.speedMin, props.speedMax)

    for (let i = -1; i < cols; i++) {
      for (let j = -1; j < rows; j++) {
        const x = i * props.gap + (j % 2 === 0 ? 0 : props.gap * 0.5)
        const y = j * props.gap
        const phase = Math.random() * Math.PI * 2
        const span = Math.max(max - min, 0)
        const speed = min + Math.random() * span
        dots.push({ x, y, phase, speed })
      }
    }
  }

  regenDots()

  const draw = (now: number) => {
    if (stopped) return

    const { width, height } = container.getBoundingClientRect()

    ctx.clearRect(0, 0, el.width, el.height)
    ctx.globalAlpha = props.opacity

    if (props.backgroundOpacity > 0) {
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        Math.min(width, height) * 0.1,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7,
      )
      grad.addColorStop(0, 'rgba(0,0,0,0)')
      grad.addColorStop(1, `rgba(0,0,0,${Math.min(Math.max(props.backgroundOpacity, 0), 1)})`)
      ctx.fillStyle = grad as unknown as CanvasGradient
      ctx.fillRect(0, 0, width, height)
    }

    ctx.save()
    ctx.fillStyle = resolvedColor.value

    const time = (now / 1000) * Math.max(props.speedScale, 0)
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i]
      const mod = (time * d.speed + d.phase) % 2
      const lin = mod < 1 ? mod : 2 - mod
      const a = 0.25 + 0.55 * lin

      if (a > 0.6) {
        const glow = (a - 0.6) / 0.4
        ctx.shadowColor = resolvedGlowColor.value
        ctx.shadowBlur = 6 * glow
      }
      else {
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
      }

      ctx.globalAlpha = a * props.opacity
      ctx.beginPath()
      ctx.arc(d.x, d.y, props.radius, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()

    raf = requestAnimationFrame(draw)
  }

  const handleResize = () => {
    resize()
    regenDots()
  }

  window.addEventListener('resize', handleResize)

  // Start animation
  raf = requestAnimationFrame(draw)

  onUnmounted(() => {
    stopped = true
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', handleResize)
    ro.disconnect()
  })
})
</script>
