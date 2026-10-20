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
        v-if="!painted"
        :colors="orbColors"
        :flow="orbFlow"
        :glow="0"
        :class="ui.orb({ class: uiProps.ui?.orb })"
        size="100%"
        :turbulence="orbTurbulence"
      />
    </motion.div>

    <svg
      :aria-hidden="ariaLabel ? undefined : true"
      :aria-label="ariaLabel"
      :class="ui.face({ class: uiProps.ui?.face })"
      :role="ariaLabel ? 'img' : undefined"
      viewBox="0 0 100 100"
    >
      <title>{{ ariaLabel ?? 'AI assistant character' }}</title>

      <!-- One wrapper carries the mood motion, so every part of the face moves
           together instead of each element drifting on its own loop. -->
      <g :class="['aimf-face', `aimf-face--${mood}`]">
        <!-- Brows -->
        <path
          v-for="(brow, i) in browPaths"
          :key="`brow-${i}`"
          :d="brow"
          fill="none"
          :stroke="resolvedColors.feature"
          stroke-linecap="round"
          stroke-width="2.6"
        />

        <!-- Eyes. Open eyes are ellipses, happy eyes are arches and sleeping
             eyes are shut lids; the outer group is painted by hand so the gaze
             spring and the blink can share one transform. -->
        <g
          v-for="eye in eyes"
          :key="eye.side"
          :ref="(el) => setEye(eye.side, el)"
        >
          <ellipse
            class="aimf-eye"
            :cx="eye.cx"
            :cy="eye.cy"
            :fill="resolvedColors.feature"
            :rx="EYE_RX"
            :ry="EYE_RY"
            :style="{
              opacity: eye.style === 'open' ? 1 : 0,
              transform: eye.transform,
            }"
          />
          <path
            class="aimf-eye"
            :d="eye.linePath"
            fill="none"
            :stroke="resolvedColors.feature"
            stroke-linecap="round"
            stroke-width="4.2"
            :style="{ opacity: eye.style === 'open' ? 0 : 1 }"
          />
        </g>

        <!-- Mouth. Every shape is mounted and cross-faded, because an SVG path
             cannot tween its `d` through a CSS transition. -->
        <path
          v-for="shape in mouthShapes"
          :key="shape.id"
          class="aimf-mouth"
          :class="[ui.mouth({ class: uiProps.ui?.mouth }), { 'aimf-mouth--talk': shape.id === 'talk' && shape.id === mouthId }]"
          :d="shape.d"
          :fill="shape.filled ? resolvedColors.feature : 'none'"
          :stroke="shape.filled ? 'none' : resolvedColors.feature"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          :style="{ opacity: shape.id === mouthId ? 1 : 0 }"
        />

        <!-- Thinking dots -->
        <g v-if="accent === 'dots'" :fill="resolvedColors.feature">
          <circle class="aimf-dot" cx="73" cy="34" r="1.8" />
          <circle class="aimf-dot" cx="79" cy="28.5" r="2.2" />
          <circle class="aimf-dot" cx="85.5" cy="22.5" r="2.6" />
        </g>

        <!-- Sleeping z's -->
        <g
          v-if="accent === 'zzz'"
          class="aimf-zzz"
          :fill="resolvedColors.feature"
          font-family="system-ui, sans-serif"
          font-weight="700"
        >
          <text class="aimf-z" x="73.5" y="47" font-size="8.5">z</text>
          <text class="aimf-z" x="78" y="37" font-size="10.5">z</text>
          <text class="aimf-z" x="82.5" y="27" font-size="12.5">z</text>
        </g>

        <!-- Confused question mark -->
        <text
          v-if="accent === 'question'"
          class="aimf-question"
          x="69"
          y="36"
          font-size="22"
          font-family="system-ui, sans-serif"
          font-weight="800"
          :fill="resolvedColors.feature"
        >?</text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
/**
 * The orb, with a face that has a mouth.
 *
 * `AiOrbFace` reads entirely through two eyes, which is why it has no mouth: a
 * mouth carries so much of an expression that the eyes stop mattering. This
 * component is the opposite trade. A mood picks one eye treatment and one mouth
 * at the same time, and the two are tuned against each other so neither can win.
 *
 * Moods are the public unit because they are how a character is described in
 * conversation - happy, confused, asleep - while `state` is how a program is
 * described. `AI_ORB_FACE_MOUTH_STATE_MOOD` maps one onto the other, so an
 * assistant still gets a face for free.
 *
 * The eyes are painted imperatively for the same reason as `AiOrbFace`: a motion
 * value on an SVG node is promoted to attributes, so a spring riding in as `x`
 * would overwrite the geometry that is meant to move. The mood change itself is
 * a CSS transition, which the browser can run while the springs are busy.
 */
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
const EYE_OFFSET = 14
const EYE_Y = 42
const EYE_RX = 7.2
const EYE_RY = 9.8
/** Pupil travel from centre, in viewBox units. */
const GAZE_RANGE = 3.4
/** Cursor distance in pixels at which the gaze reaches full deflection. */
const GAZE_FALLOFF = 220
const BLINK_CLOSE_MS = 70
const BLINK_REOPEN_MS = 70
const BLINK_OPEN_MS = 160
const BLINK_MIN_MS = 3200
const BLINK_EXTRA_MS = 2600
const DOUBLE_BLINK_CHANCE = 0.25
const SACCADE_MIN_MS = 700
const SACCADE_EXTRA_MS = 700
/** Where the eyes land while thinking, in turn. */
const SACCADE_TARGETS = [
  { x: -1, y: -1 },
  { x: 1, y: -1 },
  { x: -0.6, y: -0.4 },
  { x: 0.8, y: -0.9 },
]
const SIDES = [-1, 1] as const
/** The orb paints its sphere at this fraction of its own box. */
const ORB_SPHERE_FRACTION = 0.86
const ENERGY_STEPS = 4

type Easing = (progress: number) => number

/** Cubic bezier, Newton first with a bisection fallback for the flat parts. */
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
  expression: undefined,
  gaze: true,
  mood: undefined,
  painted: false,
  size: 128,
  state: 'idle',
  talking: undefined,
  ui: undefined,
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

/** An explicit mood wins, then the deprecated alias, then the state mapping. */
const mood = computed<AiOrbFaceMouthMood>(() =>
  props.mood ?? props.expression ?? AI_ORB_FACE_MOUTH_STATE_MOOD[props.state],
)

const moodConfig = computed(() => AI_ORB_FACE_MOUTH_MOODS[mood.value])
const accent = computed(() => moodConfig.value.accent ?? null)
const canBlink = computed(() => moodConfig.value.eye === 'open')
const isThinking = computed(() => mood.value === 'thinking')
const isSleeping = computed(() => mood.value === 'sleeping')

/**
 * A speaking assistant is answering, so `streaming` talks on its own. `talking`
 * still wins where it is set, and nothing talks while asleep.
 */
const isTalking = computed(() => (props.talking ?? props.state === 'streaming') && !isSleeping.value)

/**
 * The mouth is the one part `talking` replaces. Keeping it a swap rather than a
 * second mouth means every mood can speak without a mouth per mood.
 */
const mouthId = computed<AiOrbFaceMouthShapeName>(() =>
  isTalking.value ? 'talk' : moodConfig.value.mouth,
)

/**
 * The orb draws its sphere at 86% of its own box, so the box is scaled up by
 * that much to land the sphere exactly on the circle the face was drawn around.
 */
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

const mouthShapes = Object.entries(AI_ORB_FACE_MOUTH_SHAPES).map(([id, shape]) => ({ id, ...shape }))

const eyes = computed(() => {
  const config = moodConfig.value
  return SIDES.map((side) => {
    const shape = { sx: 1, sy: 1, dy: 0, tilt: 0, ...(side < 0 ? config.left : config.right) }
    const cx = CENTER + side * EYE_OFFSET
    return {
      side,
      cx,
      cy: EYE_Y,
      style: config.eye,
      // An open eye is an ellipse that squashes and tilts; the arched and shut
      // eyes are already drawn in their final shape, so they stay untransformed.
      transform: config.eye === 'open'
        ? `translateY(${shape.dy}px) rotate(${shape.tilt}deg) scale(${shape.sx}, ${shape.sy})`
        : '',
      linePath: config.eye === 'arc'
        ? `M${cx - EYE_RX} ${EYE_Y + 3} Q${cx} ${EYE_Y - 4.6} ${cx + EYE_RX} ${EYE_Y + 3}`
        : `M${cx - EYE_RX} ${EYE_Y - 0.4} Q${cx} ${EYE_Y + 5} ${cx + EYE_RX} ${EYE_Y - 0.4}`,
    }
  })
})

const browPaths = computed(() => {
  switch (moodConfig.value.brows) {
    // Inner corners up. The mirror image reads as a scowl, which is the one
    // mistake a set of brows can make.
    case 'sad':
      return ['M27.5 35 L43.5 30.5', 'M56.5 30.5 L72.5 35']
    case 'raised':
      return ['M28.5 25 Q36 20 43.5 25', 'M56.5 25 Q64 20 71.5 25']
    default:
      return []
  }
})

/* --- Imperative painters ---------------------------------------------------
   The gaze springs notify on every animated frame, so subscribing to them is
   the whole per-frame loop. Nothing here runs when nothing is moving. */

const eyeEls = new Map<number, SVGGElement>()
/** Shared by both eyes, because a blink always takes both at once. */
let lid = 1

const setEye = (side: number, el: unknown) => {
  if (el instanceof SVGGElement) eyeEls.set(side, el)
  else eyeEls.delete(side)
}

const paintEyes = () => {
  const dx = gazeX.get()
  const dy = gazeY.get()
  for (const eye of eyes.value) {
    const el = eyeEls.get(eye.side)
    if (!el) continue
    el.style.transform
      = `translate(${dx}px, ${dy}px)`
        + ` translate(${eye.cx}px, ${eye.cy}px)`
        + ` scaleY(${lid})`
        + ` translate(${-eye.cx}px, ${-eye.cy}px)`
  }
}

useMotionValueEvent(gazeX, 'change', paintEyes)
useMotionValueEvent(gazeY, 'change', paintEyes)

/* Lid tweens. Each one settles the previous one, because a lid that never
   settles strands every blink waiting on it. */
interface LidTween {
  frame: number
  resolve: () => void
}

let lidTween: LidTween | null = null

const tweenLid = (to: number, ms: number, ease: Easing) =>
  new Promise<void>((resolve) => {
    const settled = lidTween
    lidTween = null
    if (settled) {
      cancelAnimationFrame(settled.frame)
      settled.resolve()
    }
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
      if (progress < 1) {
        lidTween = { frame: requestAnimationFrame(step), resolve }
        return
      }
      resolve()
    }
    lidTween = { frame: requestAnimationFrame(step), resolve }
  })

const blink = async (double = false) => {
  if (!mounted.value) return
  await tweenLid(0.08, BLINK_CLOSE_MS, EASE_IN)
  if (!mounted.value) return
  await tweenLid(1, double ? BLINK_REOPEN_MS : BLINK_OPEN_MS, double ? EASE_IN : EASE_OUT)
  if (double) await blink(false)
}

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
  if (blinkTimer !== null) {
    clearTimeout(blinkTimer)
    blinkTimer = null
  }
}

const startBlinking = () => {
  stopBlinking()
  if (shouldReduceMotion.value || !canBlink.value) return
  blinkRunning = true
  scheduleBlink()
}

/* --- Gaze and saccades ---------------------------------------------------- */

let detachGaze: (() => void) | null = null

const attachGaze = () => {
  detachGaze?.()
  detachGaze = null
  // While thinking the eyes look away, which is what makes that mood legible
  // without adding a single graphic to it.
  if (!props.gaze || shouldReduceMotion.value || isThinking.value || isSleeping.value) return
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

let saccadeTimer: ReturnType<typeof setTimeout> | null = null
let saccadeRunning = false
let saccadeIndex = 0

const stopSaccades = () => {
  saccadeRunning = false
  if (saccadeTimer !== null) {
    clearTimeout(saccadeTimer)
    saccadeTimer = null
  }
}

const startSaccades = () => {
  stopSaccades()
  if (!isThinking.value || shouldReduceMotion.value) return
  saccadeRunning = true
  const schedule = () => {
    saccadeTimer = setTimeout(() => {
      if (!saccadeRunning) return
      const target = SACCADE_TARGETS[saccadeIndex % SACCADE_TARGETS.length]
      saccadeIndex += 1
      gazeX.set(target.x * GAZE_RANGE)
      gazeY.set(target.y * GAZE_RANGE)
      schedule()
    }, SACCADE_MIN_MS + Math.random() * SACCADE_EXTRA_MS)
  }
  schedule()
}

/* --- Amplitude ------------------------------------------------------------ */

let detachEnergy: (() => void) | null = null

const applyEnergy = (level: number) => {
  energy.value = Math.round(level * ENERGY_STEPS) / ENERGY_STEPS
}

onMounted(() => {
  mounted.value = true
  resolveColors()
  applyEnergy(amplitudeValue.get())
  detachEnergy = amplitudeValue.on('change', applyEnergy)
  startBlinking()
  attachGaze()
  startSaccades()
  paintEyes()
})

onBeforeUnmount(() => {
  mounted.value = false
  stopBlinking()
  stopSaccades()
  detachGaze?.()
  detachEnergy?.()
  if (lidTween) {
    cancelAnimationFrame(lidTween.frame)
    lidTween.resolve()
    lidTween = null
  }
})

// A changed mood rebuilds the eye nodes, so the paint has to be re-applied once
// the DOM has caught up.
watch(eyes, paintEyes, { flush: 'post' })

watch([canBlink, shouldReduceMotion], () => {
  startBlinking()
  if (!canBlink.value) {
    lid = 1
    paintEyes()
  }
}, { flush: 'post' })

watch([() => props.gaze, isThinking, isSleeping, shouldReduceMotion], attachGaze)
watch([isThinking, shouldReduceMotion], startSaccades)

// Re-resolve whenever the colours change or the theme flips, so a token follows
// the active light/dark palette instead of freezing at its first value.
watch([finalColors, () => colorMode.value], resolveColors)
</script>

<script lang="ts">
export interface AiOrbFaceMouthColors {
  body: string
  bodyEdge: string
  feature: string
}

export interface AiOrbFaceMouthEyeShape {
  /** Multiplier on resting width. */
  sx?: number
  /** Multiplier on resting height. `0.08` is a blink, `0.5` a squint. */
  sy?: number
  /** Nudges the eye up or down. Negative is higher. */
  dy?: number
  /** Degrees. Positive tilts the outer corner down on the right eye. */
  tilt?: number
}

export interface AiOrbFaceMouthShape {
  d: string
  /** Filled mouths read as open; stroked ones as a line. */
  filled: boolean
}

export interface AiOrbFaceMouthMoodConfig {
  /** `arc` is the happy `^ ^`; `closed` is the sleeping `u u`. */
  eye: 'open' | 'arc' | 'closed'
  brows?: 'sad' | 'raised' | null
  mouth: AiOrbFaceMouthShapeName
  accent?: 'dots' | 'question' | 'zzz' | null
  left?: AiOrbFaceMouthEyeShape
  right?: AiOrbFaceMouthEyeShape
}

export interface AiOrbFaceMouthProps {
  /** Names the character for assistive technology. Omit it to stay decorative. */
  ariaLabel?: string
  /** 0 to 1 speech level. Stirs the interior while talking. */
  amplitude?: AIAmplitude
  class?: string
  /** Overrides any of the body, body edge, or feature colours. */
  colors?: Partial<AiOrbFaceMouthColors>
  /** Follow the pointer. Turn it off where the face is decorative and busy. */
  gaze?: boolean
  /** Set the character directly and ignore `state`. */
  mood?: AiOrbFaceMouthMood
  /** Deprecated alias for `mood`. */
  expression?: AiOrbFaceMouthMood
  /**
   * Paint the sphere as a gradient instead of mounting the WebGL orb. A browser
   * only keeps about sixteen live contexts per page, so a grid of faces — a
   * gallery, an assistant list — starts losing them and those orbs freeze. The
   * painted sphere looks the same at small sizes and costs no GPU.
   */
  painted?: boolean
  /** Pixels when a number, any CSS length when a string. */
  size?: number | string
  state?: AIState
  /**
   * Swap the mouth for a speaking one without changing the rest of the face, so
   * `happy`, `thinking` and `confused` can all talk. Defaults to on for the
   * `streaming` state, and never applies while the character is asleep.
   */
  talking?: boolean
  ui?: Record<string, any>
}

/**
 * Mouths, in viewBox units. The two filled smiles are crescents: the lower edge
 * bows further than the upper one, which is what makes them read as open rather
 * than as a flat shape.
 */
export const AI_ORB_FACE_MOUTH_SHAPES = {
  /** Gentle closed smile. */
  soft: { d: 'M41 63.5 Q50 69 59 63.5', filled: false },
  /** Open smile. */
  smile: { d: 'M35 59 Q50 78 65 59 Q50 67.5 35 59 Z', filled: true },
  /** Wide open laugh. */
  grin: { d: 'M33.5 57.5 Q50 81 66.5 57.5 Q50 66 33.5 57.5 Z', filled: true },
  /** Level and slightly tilted. Working something out. */
  flat: { d: 'M42.5 64.8 L57.5 63.8', filled: false },
  /** Caught off guard. */
  'open-o': { d: 'M50 61.5 m-4.6 0 a4.6 5.6 0 1 0 9.2 0 a4.6 5.6 0 1 0 -9.2 0', filled: true },
  /** Asleep. */
  'small-o': { d: 'M50 65 m-2.8 0 a2.8 3.4 0 1 0 5.6 0 a2.8 3.4 0 1 0 -5.6 0', filled: true },
  /** Turned down. */
  frown: { d: 'M40.5 68.5 Q50 59.5 59.5 68.5', filled: false },
  /** Not following. */
  wavy: { d: 'M40 65 Q45 60.5 50 65 Q55 69.5 60 65', filled: false },
  /**
   * The speaking mouth. It is a plain wide ellipse because it is animated by a
   * vertical pulse rather than drawn open and shut: one shape can then cover
   * every syllable, and it layers over any mood.
   */
  talk: { d: 'M50 63.5 m-6.4 0 a6.4 4.6 0 1 0 12.8 0 a6.4 4.6 0 1 0 -12.8 0', filled: true },
} as const

export type AiOrbFaceMouthShapeName = keyof typeof AI_ORB_FACE_MOUTH_SHAPES

/**
 * The moods. Each one is a complete read: eyes, mouth, optional brows and an
 * optional accent, so no combination can land as an accidental expression.
 */
export type AiOrbFaceMouthMood
  = | 'idle'
    | 'happy'
    | 'excited'
    | 'thinking'
    | 'surprised'
    | 'sleeping'
    | 'sad'
    | 'confused'
    | 'talking'

export const AI_ORB_FACE_MOUTH_MOODS: Record<AiOrbFaceMouthMood, AiOrbFaceMouthMoodConfig> = {
  idle: {
    eye: 'open',
    mouth: 'soft',
  },
  happy: {
    eye: 'arc',
    mouth: 'smile',
  },
  excited: {
    eye: 'open',
    mouth: 'grin',
    left: { sy: 1.1, dy: -1 },
    right: { sy: 1.1, dy: -1 },
  },
  thinking: {
    accent: 'dots',
    eye: 'open',
    left: { dy: 1, sy: 0.7, tilt: -7 },
    mouth: 'flat',
    right: { dy: 1, sy: 0.55, tilt: 6 },
  },
  surprised: {
    eye: 'open',
    brows: 'raised',
    left: { dy: -2, sx: 1.1, sy: 1.16 },
    mouth: 'open-o',
    right: { dy: -2, sx: 1.1, sy: 1.16 },
  },
  sleeping: {
    accent: 'zzz',
    eye: 'closed',
    mouth: 'small-o',
  },
  sad: {
    brows: 'sad',
    eye: 'open',
    left: { dy: 2, sy: 0.9, tilt: -8 },
    mouth: 'frown',
    right: { dy: 2, sy: 0.9, tilt: 8 },
  },
  confused: {
    accent: 'question',
    eye: 'open',
    left: { sx: 1.02 },
    mouth: 'wavy',
    right: { dy: 1, sx: 0.82, sy: 0.52, tilt: -14 },
  },
  talking: {
    eye: 'open',
    mouth: 'talk',
  },
} satisfies Record<string, AiOrbFaceMouthMoodConfig>

/** Which mood each assistant state wears when the caller does not name one. */
export const AI_ORB_FACE_MOUTH_STATE_MOOD = {
  done: 'happy',
  error: 'sad',
  idle: 'idle',
  listening: 'excited',
  streaming: 'happy',
  thinking: 'thinking',
} as const

/**
 * Follow the theme by default: the body is the primary colour, and the edge and
 * features are mixed away from it so the sphere keeps a lit highlight and the
 * eyes stay legible.
 */
export const AI_ORB_FACE_MOUTH_DEFAULT_COLORS = {
  body: 'var(--ui-primary)',
  bodyEdge: 'color-mix(in oklab, var(--ui-primary), white 78%)',
  feature: 'color-mix(in oklab, var(--ui-primary), black 82%)',
} as const
</script>

<style>
.aimf-face {
  transform-box: view-box;
  transform-origin: 50% 50%;
}

/* The mood transform is a CSS transition so a change of face is legible as a
   movement rather than a cut. */
.aimf-eye {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.34s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.22s ease;
}

.aimf-mouth {
  transition: opacity 0.2s linear;
}

/* The speaking mouth opens and shuts in place. Scaling the shape rather than
   swapping paths means one mouth covers every syllable and layers over any
   mood without a mouth variant per mood. */
.aimf-mouth--talk {
  transform-box: fill-box;
  transform-origin: center;
  animation: aimf-talk 0.36s ease-in-out infinite;
}

.aimf-face--idle {
  animation: aimf-breathe 4.2s ease-in-out infinite;
}

.aimf-face--happy {
  animation: aimf-bob 2.4s ease-in-out infinite;
}

.aimf-face--excited {
  animation: aimf-bounce 0.9s ease-in-out infinite;
}

.aimf-face--thinking {
  animation: aimf-tilt 3.6s ease-in-out infinite;
}

.aimf-face--surprised {
  animation: aimf-pop 0.62s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.aimf-face--sleeping {
  animation: aimf-sleep 5s ease-in-out infinite;
}

.aimf-face--sad {
  animation: aimf-sink 4.6s ease-in-out infinite;
}

.aimf-face--confused {
  animation: aimf-tilt-soft 3s ease-in-out infinite;
}

.aimf-face--talking {
  animation: aimf-breathe 3.2s ease-in-out infinite;
}

.aimf-z {
  animation: aimf-zzz 2.4s ease-out infinite;
  opacity: 0;
}

.aimf-z:nth-child(2) {
  animation-delay: 0.8s;
}

.aimf-z:nth-child(3) {
  animation-delay: 1.6s;
}

.aimf-question {
  transform-box: fill-box;
  transform-origin: center;
  animation: aimf-wobble 2.2s ease-in-out infinite;
}

.aimf-dot {
  animation: aimf-dot 1.4s ease-in-out infinite;
}

.aimf-dot:nth-child(2) {
  animation-delay: 0.18s;
}

.aimf-dot:nth-child(3) {
  animation-delay: 0.36s;
}

@keyframes aimf-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.015); }
}

@keyframes aimf-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

@keyframes aimf-bounce {
  0%, 100% { transform: translateY(0) scale(1); }
  30% { transform: translateY(-3px) scale(1.012); }
  60% { transform: translateY(0) scale(0.996); }
}

@keyframes aimf-tilt {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(-0.5deg) translateY(-1px); }
}

@keyframes aimf-sleep {
  0%, 100% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.02) translateY(1px); }
}

@keyframes aimf-sink {
  0%, 100% { transform: translateY(1.5px); }
  50% { transform: translateY(2.5px); }
}

@keyframes aimf-tilt-soft {
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(1.5deg); }
}

@keyframes aimf-pop {
  0% { transform: scale(0.96); }
  55% { transform: scale(1.04); }
  100% { transform: scale(1); }
}

@keyframes aimf-zzz {
  0% { opacity: 0; transform: translate(0, 2px) scale(0.8); }
  20% { opacity: 1; }
  70% { opacity: 0.9; }
  100% { opacity: 0; transform: translate(5px, -13px) scale(1.2); }
}

@keyframes aimf-wobble {
  0%, 100% { transform: rotate(-6deg); }
  50% { transform: rotate(8deg); }
}

@keyframes aimf-dot {
  0%, 100% { opacity: 0.4; }
  40% { opacity: 1; }
}

@keyframes aimf-talk {
  0%, 100% { transform: scale(0.94, 0.34); }
  30% { transform: scale(1, 1.08); }
  55% { transform: scale(0.97, 0.58); }
  76% { transform: scale(1, 0.94); }
}

@media (prefers-reduced-motion: reduce) {
  .aimf-face,
  .aimf-z,
  .aimf-question,
  .aimf-dot,
  .aimf-mouth--talk {
    animation: none;
  }

  .aimf-z {
    opacity: 0.85;
  }
}
</style>
