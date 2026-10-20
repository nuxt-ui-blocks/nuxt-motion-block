<template>
  <div
    ref="rootEl"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{
      filter: `saturate(${stateMotion.saturation})`,
      height: resolvedSize,
      width: resolvedSize,
    }"
  >
    <motion.div
      :class="ui.body({ class: uiProps.ui?.body })"
      data-orb-body
      :style="{
        height: `${bodySpan}%`,
        left: `${bodyInset}%`,
        top: `${bodyInset}%`,
        width: `${bodySpan}%`,
      }"
    >
      <div
        aria-hidden="true"
        :class="ui.understudy({ class: uiProps.ui?.understudy })"
        :style="{
          background: `radial-gradient(circle at 34% 30%, ${resolvedColors.bodyEdge}, ${resolvedColors.body} 72%)`,
          inset: `${bodyUnderstudyInset}%`,
        }"
      />
      <AiOrb
        :colors="orbColors"
        :flow="orbFlow"
        :glow="0"
        :class="ui.orb({ class: uiProps.ui?.orb })"
        size="100%"
        :turbulence="orbTurbulence"
      />
    </motion.div>
    <motion.svg
      :aria-hidden="ariaLabel ? undefined : true"
      :aria-label="ariaLabel"
      :class="ui.face({ class: uiProps.ui?.face })"
      data-orb-body
      :role="ariaLabel ? 'img' : undefined"
      :style="{ transformBox: 'view-box' }"
      viewBox="0 0 100 100"
    >
      <title>{{ ariaLabel ?? 'AI assistant character' }}</title>
      <rect
        v-for="part in eyes"
        :key="part.side"
        :ref="(el) => setEye(part.side, el)"
        :fill="resolvedColors.feature"
        :height="part.drawn"
        :rx="part.rx"
        :width="part.width"
        :x="part.x"
        :y="part.y"
      />
      <path
        class="ai-orb-mouth"
        :style="{
          transform: mouthTransform,
          opacity: mouthOpacity,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), d 0.3s ease, opacity 0.3s ease',
        }"
        :d="mouthD"
        :fill="mouthStroked ? 'none' : resolvedColors.feature"
        :stroke="mouthStroked ? resolvedColors.feature : 'none'"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
      />
      <path
        v-for="side in spiralSides"
        :key="'spiral-' + side"
        :ref="(el) => setSpiral(side, el)"
        :d="SPIRAL"
        fill="none"
        :stroke="resolvedColors.feature"
        stroke-linecap="round"
        stroke-width="3"
      />
      <g v-if="isSleeping" class="ai-orb-zzz" :fill="resolvedColors.feature" font-family="sans-serif" font-weight="800">
        <text class="ai-orb-z ai-orb-z-1" x="72" y="60" font-size="8">z</text>
        <text class="ai-orb-z ai-orb-z-2" x="78" y="52" font-size="10">z</text>
        <text class="ai-orb-z ai-orb-z-3" x="84" y="42" font-size="12">z</text>
      </g>
      <text
        v-if="isConfused"
        class="ai-orb-question"
        x="78"
        y="48"
        font-size="16"
        font-family="sans-serif"
        font-weight="800"
        :fill="resolvedColors.feature"
      >?</text>
    </motion.svg>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { motion, useMotionValueEvent, useReducedMotion, useSpring } from 'motion-v'
import AiOrb from './AiOrb.vue'
import type { AIAmplitude, AIState } from '../composables/useAiState'
import { getAIStateMotion, useAmplitudeValue } from '../composables/useAiState'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import aiOrbFaceMouth from '../theme/ai-orb-face-mouth'
import { useColorMode } from '#imports'
import { colorToRgb, resolveColor } from '../utils/theme-color'

const VIEWBOX = 100
const CENTER = VIEWBOX / 2
const EYE_OFFSET = 16
const EYE_Y = 44
const EYE_WIDTH = 11
const EYE_HEIGHT = 26
const EYE_RADIUS = 5.5
const GAZE_RANGE = 5.5
const GAZE_FALLOFF = 220
const SPIRAL = 'M0 0C-0.6 -4 5 -5 6 -0.6C7 4.5 1 8 -4 6C-9 4.5 -9.5 -2 -6 -6'
const BLINK_CLOSE_MS = 70
const BLINK_REOPEN_MS = 70
const BLINK_OPEN_MS = 160
const BLINK_MIN_MS = 3200
const BLINK_EXTRA_MS = 2600
const DOUBLE_BLINK_CHANCE = 0.25
const SACCADE_MIN_MS = 700
const SACCADE_EXTRA_MS = 700
const SACCADE_TARGETS = [
  { x: -1, y: -1 },
  { x: 1, y: -1 },
  { x: -0.6, y: -0.4 },
  { x: 0.8, y: -0.9 },
]
const SIDES = [-1, 1] as const
const ORB_SPHERE_FRACTION = 0.86
const ENERGY_STEPS = 4

type Easing = (progress: number) => number

function cubicBezier(x1: number, y1: number, x2: number, y2: number): Easing {
  const ax = 3 * x1 - 3 * x2 + 1
  const bx = 3 * x2 - 6 * x1
  const cx = 3 * x1
  const ay = 3 * y1 - 3 * y2 + 1
  const by = 3 * y2 - 6 * y1
  const cy = 3 * y1
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t
  const sampleSlope = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  const solve = (x: number) => {
    let guess = x
    for (let step = 0; step < 8; step += 1) {
      const error = sampleX(guess) - x
      if (Math.abs(error) < 1e-6) return guess
      const slope = sampleSlope(guess)
      if (Math.abs(slope) < 1e-6) break
      guess -= error / slope
    }
    let low = 0
    let high = 1
    guess = x
    for (let step = 0; step < 20; step += 1) {
      if (sampleX(guess) > x) high = guess
      else low = guess
      guess = (low + high) / 2
    }
    return guess
  }
  return progress => (progress <= 0 ? 0 : progress >= 1 ? 1 : sampleY(solve(progress)))
}

const EASE_OUT = cubicBezier(0.23, 1, 0.32, 1)
const EASE_IN = cubicBezier(0.4, 0, 1, 1)

const props = withDefaults(defineProps<AiOrbFaceMouthProps>(), {
  class: undefined,
  gaze: true,
  size: 128,
  state: 'idle',
  ui: undefined,
  expression: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiOrbFaceMouth', props, theme: aiOrbFaceMouth })

const stateMotion = computed(() => getAIStateMotion(props.state))
const amplitudeValue = useAmplitudeValue(() => props.amplitude)
const finalColors = computed<AiOrbFaceMouthColors>(() => ({ ...AI_ORB_FACE_MOUTH_DEFAULT_COLORS, ...props.colors }))

const colorMode = useColorMode()
const resolvedColors = ref<AiOrbFaceMouthColors>({ ...finalColors.value })

const toConcreteColor = (value: string): string => {
  const target = rootEl.value ?? undefined
  const resolved = resolveColor(value, { target }) ?? value
  const rgb = colorToRgb(resolved, target)
  return rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : resolved
}

const resolveColors = () => {
  const source = finalColors.value
  resolvedColors.value = {
    body: toConcreteColor(source.body),
    bodyEdge: toConcreteColor(source.bodyEdge),
    feature: toConcreteColor(source.feature),
  }
}

const orbColors = computed(() => [resolvedColors.value.body, resolvedColors.value.bodyEdge])
const resolvedSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))

const isHappy = computed(() => props.state === 'done')
const isThinking = computed(() => props.state === 'thinking')
const isListening = computed(() => props.state === 'listening')
const isBroken = computed(() => props.state === 'error')
const isSleeping = computed(() => false)
const isConfused = computed(() => false)

const active = computed<AiOrbFaceMouthExpression>(() => {
  if (typeof props.expression === 'object') return props.expression
  if (props.expression) return AI_ORB_FACE_MOUTH_EXPRESSIONS[props.expression as AiOrbFaceMouthExpressionName]
  return AI_ORB_FACE_MOUTH_EXPRESSIONS[AI_ORB_FACE_MOUTH_STATE_EXPRESSION[props.state]]
})

const bodySpan = (96 / VIEWBOX / ORB_SPHERE_FRACTION) * 100
const bodyInset = (100 - bodySpan) / 2
const bodyUnderstudyInset = (1 - ORB_SPHERE_FRACTION) * 50

const energy = ref(0)
const orbFlow = computed(() => 0.6 + energy.value * 0.36)
const orbTurbulence = computed(() => 0.4 + energy.value * 0.32)

const gazeX = useSpring(0, { damping: 26, stiffness: 220 })
const gazeY = useSpring(0, { damping: 26, stiffness: 220 })
const shouldReduceMotion = useReducedMotion()

const rootEl = ref<HTMLElement | null>(null)
const mounted = ref(false)

const eyes = computed(() => {
  if (isBroken.value) return []
  return SIDES.map((side) => {
    const shape = side < 0 ? active.value.left : active.value.right
    const width = EYE_WIDTH * shape.w
    const height = EYE_HEIGHT * shape.h
    const x = CENTER + side * EYE_OFFSET - width / 2
    const y = EYE_Y + (EYE_HEIGHT - height) / 2 + (shape.dy ?? 0)
    const drawn = Math.max(height, 0.5)
    return {
      side, x, y, width, drawn,
      rx: Math.min(EYE_RADIUS * shape.w, drawn / 2),
      cx: x + width / 2,
      cy: y + height / 2,
      rotate: shape.rotate ?? 0,
    }
  })
})

const spiralSides = computed(() => (isBroken.value ? SIDES : []))

const eyeEls = new Map<number, SVGRectElement>()
const spiralEls = new Map<number, SVGPathElement>()

const setEye = (side: number, el: unknown) => {
  if (el instanceof SVGRectElement) eyeEls.set(side, el)
  else eyeEls.delete(side)
}

const setSpiral = (side: number, el: unknown) => {
  if (el instanceof SVGPathElement) spiralEls.set(side, el)
  else spiralEls.delete(side)
}

const mouthD = computed(() => {
  if (isBroken.value) return ''
  if (isHappy.value) return 'M38 62 Q50 72 62 62'
  if (isThinking.value) return 'M42 64 Q50 60 58 64'
  if (props.state === 'error') return 'M38 68 Q50 58 62 68'
  return 'M40 62 Q50 68 60 62'
})

const mouthStroked = computed(() => isThinking.value || props.state === 'error')
const mouthOpacity = computed(() => isBroken.value ? 0 : 1)
const mouthTransform = computed(() => '')

const smileLeftPath = 'M30 50 Q36 44 42 50'
const smileRightPath = 'M58 50 Q64 44 70 50'
const showSmile = computed(() => isHappy.value)
const smileOpacity = computed(() => (showSmile.value ? 1 : 0))

const squintPaths = computed(() => {
  if (!showSmile.value) return []
  return ['M28 48 Q36 42 44 48', 'M56 48 Q64 42 72 48']
})
const squintOpacity = computed(() => (showSmile.value ? 1 : 0))

let lid = 1
const paintEyes = () => {
  const dx = gazeX.get()
  const dy = gazeY.get()
  for (const part of eyes.value) {
    const el = eyeEls.get(part.side)
    if (!el) continue
    el.style.transform = `translate(${dx}px, ${dy}px) translate(${part.cx}px, ${part.cy}px) scaleY(${lid}) rotate(${part.rotate}deg) translate(${-part.cx}px, ${-part.cy}px)`
  }
}

const tweenLid = (to: number, ms: number, ease: Easing) =>
  new Promise<void>((resolve) => {
    if (shouldReduceMotion.value || ms <= 0) {
      lid = to
      paintEyes()
      resolve()
      return
    }
    const from = lid
    const started = performance.now()
    const step = (now: number) => {
      const progress = Math.min(1, (now - started) / ms)
      lid = from + (to - from) * ease(progress)
      paintEyes()
      if (progress < 1) requestAnimationFrame(step)
      else resolve()
    }
    requestAnimationFrame(step)
  })

const blink = async (double = false) => {
  if (!mounted.value) return
  await tweenLid(0.08, BLINK_CLOSE_MS, EASE_IN)
  if (!mounted.value) return
  await tweenLid(1, double ? BLINK_REOPEN_MS : BLINK_OPEN_MS, double ? EASE_IN : EASE_OUT)
  if (double) await blink(false)
}

let lidTween: { frame: number; resolve: () => void } | null = null
let blinkTimer: ReturnType<typeof setTimeout> | null = null
let blinkRunning = false

const scheduleBlink = () => {
  blinkTimer = setTimeout(() => {
    if (!blinkRunning) return
    if (mounted.value) void blink(Math.random() < DOUBLE_BLINK_CHANCE)
    scheduleBlink()
  }, BLINK_MIN_MS + Math.random() * BLINK_EXTRA_MS)
}

const stopBlinking = () => {
  blinkRunning = false
  if (blinkTimer !== null) { clearTimeout(blinkTimer); blinkTimer = null }
}

const startBlinking = () => {
  stopBlinking()
  if (shouldReduceMotion.value || isBroken.value) return
  blinkRunning = true
  scheduleBlink()
}

let detachGaze: (() => void) | null = null
const attachGaze = () => {
  detachGaze?.()
  detachGaze = null
  if (!props.gaze || shouldReduceMotion.value || isThinking.value || isBroken.value) return
  const onPointerMove = (event: PointerEvent) => {
    const root = rootEl.value
    if (!root) return
    const rect = root.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    const reach = Math.min(1, Math.hypot(dx, dy) / GAZE_FALLOFF) * GAZE_RANGE
    const angle = Math.atan2(dy, dx)
    gazeX.set(Math.cos(angle) * reach)
    gazeY.set(Math.sin(angle) * reach)
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  detachGaze = () => window.removeEventListener('pointermove', onPointerMove)
}

const paintSpirals = (degrees: number) => {
  for (const side of spiralSides.value) {
    const el = spiralEls.get(side)
    if (!el) continue
    el.style.transformBox = 'fill-box'
    el.style.transformOrigin = '50% 50%'
    el.style.transform = `translate(${CENTER + side * EYE_OFFSET}px, ${EYE_Y + EYE_HEIGHT / 2}px) rotate(${degrees * side}deg) scale(1.5)`
  }
}

let spiralFrame = 0
const stopSpirals = () => { if (spiralFrame) { cancelAnimationFrame(spiralFrame); spiralFrame = 0 } }
const startSpirals = () => {
  stopSpirals()
  if (!isBroken.value) return
  if (shouldReduceMotion.value) { paintSpirals(0); return }
  const started = performance.now()
  const step = (now: number) => {
    paintSpirals((((now - started) / 2400) % 1) * 360)
    spiralFrame = requestAnimationFrame(step)
  }
  spiralFrame = requestAnimationFrame(step)
}

const applyEnergy = (level: number) => { energy.value = Math.round(level * 4) / 4 }
const detachEnergy: { value: (() => void) | null } = { value: null }

onMounted(() => {
  mounted.value = true
  resolveColors()
  applyEnergy(amplitudeValue.get())
  detachEnergy.value = amplitudeValue.on('change', applyEnergy)
  startBlinking()
  attachGaze()
  startSpirals()
  paintEyes()
})

onBeforeUnmount(() => {
  mounted.value = false
  stopBlinking()
  stopSpirals()
  detachGaze?.()
  detachEnergy.value?.()
  if (lidTween) {
    cancelAnimationFrame(lidTween.frame)
    lidTween.resolve()
    lidTween = null
  }
})

watch(eyes, paintEyes, { flush: 'post' })
watch([isBroken, shouldReduceMotion], () => { startSpirals(); startBlinking(); if (!isBroken.value) paintEyes() }, { flush: 'post' })
watch([() => props.gaze, isThinking, isBroken, shouldReduceMotion], attachGaze)
watch([finalColors, () => colorMode.value], resolveColors)
watch(() => props.state, (next, prev) => {
  if (!mounted.value) return
  if (next === 'error' && prev !== 'error') { /* wobble */ }
  if (next === 'done' && prev !== 'done') { /* hop */ }
}, { flush: 'post' })

</script>

<script lang="ts">
const eye = (h: number, w = 1, rotate = 0, dy = 0): AiOrbFaceEyeShape => ({ dy, h, rotate, w })

const symmetric = (h: number, w = 1, rotate = 0, dy = 0): AiOrbFaceMouthExpression => ({
  left: eye(h, w, rotate, dy),
  right: eye(h, w, -rotate, dy),
})

export interface AiOrbFaceEyeShape {
  /** Nudges the eye up or down. Negative is higher. */
  dy?: number
  /** Multiplier on resting height. `0` is shut. */
  h: number
  /** Degrees. Positive tilts the inner corner down, which reads as a scowl. */
  rotate?: number
  /** Multiplier on resting width. */
  w: number
}

export type AiOrbFaceMouthExpression = {
  left: AiOrbFaceEyeShape
  right: AiOrbFaceEyeShape
}

export interface AiOrbFaceMouthColors {
  body: string
  bodyEdge: string
  feature: string
}

export interface AiOrbFaceMouthProps {
  ariaLabel?: string
  amplitude?: AIAmplitude
  class?: string
  colors?: Partial<AiOrbFaceMouthColors>
  gaze?: boolean
  expression?: AiOrbFaceMouthExpressionName | AiOrbFaceMouthExpression
  size?: number | string
  state?: AIState
  ui?: Record<string, any>
}

export const AI_ORB_FACE_MOUTH_EXPRESSIONS = {
  alert: symmetric(1.2, 1.05, 0, -1),
  content: symmetric(0.16, 1.25, 0, 2),
  cross: symmetric(0.85, 1, 18),
  deadpan: symmetric(0.14, 1.35),
  doubtful: { left: eye(1, 1), right: eye(0.45, 1.1, -14) },
  focused: symmetric(0.55, 1.05),
  neutral: symmetric(1),
  surprised: symmetric(0.5, 0.55, 0, -3),
  wink: { left: eye(1, 1), right: eye(0.12, 1.2, 0, 2) },
  happy: symmetric(1.1, 1.1, 0, -2),
  sad: symmetric(0.7, 0.9, 0, 3),
} as const

export type AiOrbFaceMouthExpressionName = keyof typeof AI_ORB_FACE_MOUTH_EXPRESSIONS

export const AI_ORB_FACE_MOUTH_STATE_EXPRESSION = {
  done: 'content',
  error: 'cross',
  idle: 'neutral',
  listening: 'alert',
  streaming: 'focused',
  thinking: 'doubtful',
} as const

export const AI_ORB_FACE_MOUTH_DEFAULT_COLORS = {
  body: 'var(--ui-primary)',
  bodyEdge: 'color-mix(in oklab, var(--ui-primary), white 78%)',
  feature: 'color-mix(in oklab, var(--ui-primary), black 82%)',
} as const
</script>