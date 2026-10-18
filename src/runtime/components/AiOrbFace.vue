<template>
  <div
    ref="rootEl"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{
      // States carry their own saturation, so a faulted assistant visibly cools
      // down next to the rest of the interface instead of staying cheerful.
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
      <!-- Painted understudy for the shader. On pages running many WebGL
           surfaces the browser reclaims the oldest contexts, and a reclaimed
           orb leaves a bare canvas, which turns the character into a pair of
           floating eyes. This circle sits exactly under the sphere so the body
           survives losing its context. -->
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
        v-for="side in spiralSides"
        :key="side"
        :ref="(el) => setSpiral(side, el)"
        :d="SPIRAL"
        fill="none"
        :stroke="resolvedColors.feature"
        stroke-linecap="round"
        stroke-width="3"
      />
    </motion.svg>
  </div>
</template>

<script setup lang="ts">
/**
 * A character: an orb with a face, and a face that is almost entirely eyes.
 *
 * State lives here and the material lives in `AiOrb`, which is the whole reason
 * for the extra component. A state is a behaviour, and a behaviour wants the
 * whole silhouette, not one material of it. Driving an orb straight from `state`
 * would couple six lighting and flow constants to a prop that also moves the
 * eyes, and the two would have to be retuned together forever.
 *
 * Three things carry the read, and all three are here:
 *
 * - Expression. Nine named faces built from four numbers per eye, so a squint, a
 *   tilt, a lift and a width change are the entire vocabulary.
 * - Gaze. The eyes follow the pointer on a spring, which is the one bit of
 *   apparent attention a shape can fake convincingly. While thinking they break
 *   away instead, which is what makes that state legible without adding a single
 *   graphic to it.
 * - Three state moves. A wobble on fault, a hop on success, breathing while
 *   listening. The fault wobble plays once, but the spiral eyes stay for as long
 *   as the state lasts; recovering to a neutral face would leave a broken
 *   assistant looking fine.
 *
 * The eyes are painted imperatively rather than animated as motion values. On an
 * SVG node, motion-v promotes style keys to attributes, and the gaze rides in as
 * `x` and `y`, the same keys the eye uses for its own geometry, so a spring on
 * the gaze would overwrite the shape it is meant to move. Composing the
 * transform by hand keeps both, and the springs still drive every frame because
 * they notify on change.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { motion, useMotionValueEvent, useReducedMotion, useSpring } from 'motion-v'
import AiOrb from './AiOrb.vue'
import type { AIAmplitude, AIState } from '../composables/useAiState'
import { getAIStateMotion, useAmplitudeValue } from '../composables/useAiState'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import aiOrbFace from '../theme/ai-orb-face'
import { useColorMode } from '#imports'
import { colorToRgb, resolveColor } from '../utils/theme-color'

const VIEWBOX = 100
const CENTER = VIEWBOX / 2
const EYE_OFFSET = 16
const EYE_Y = 44
const EYE_WIDTH = 11
const EYE_HEIGHT = 26
const EYE_RADIUS = 5.5
/** Pupil travel from centre, in viewBox units. */
const GAZE_RANGE = 5.5
/** Cursor distance in pixels at which the gaze reaches full deflection. */
const GAZE_FALLOFF = 220
/** One and a quarter turns: enough to read as spinning rather than wiggling. */
const SPIRAL = 'M0 0C-0.6 -4 5 -5 6 -0.6C7 4.5 1 8 -4 6C-9 4.5 -9.5 -2 -6 -6'
const SPIRAL_MS = 2400
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
/**
 * The orb takes plain props, so the level has to cross into a render for it to
 * take effect. Quantising first means it crosses a few times a second instead of
 * sixty times a second.
 */
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

const props = withDefaults(defineProps<AiOrbFaceProps>(), {
  class: undefined,
  gaze: true,
  size: 128,
  state: 'idle',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiOrbFace', props, theme: aiOrbFace })

const stateMotion = computed(() => getAIStateMotion(props.state))
const amplitudeValue = useAmplitudeValue(() => props.amplitude)
const finalColors = computed<AiOrbFaceColors>(() => ({ ...AI_ORB_FACE_DEFAULT_COLORS, ...props.colors }))

/**
 * The colours the browser actually paints, so a theme token (`'primary'`), a
 * `var()`, a `color-mix()` and a literal colour all reach the shader, the
 * understudy gradient and the SVG fill the same way. The raw `finalColors` are
 * valid CSS wherever a declaration is parsed, but an SVG presentation attribute
 * is not: `fill="color-mix(…)"` and `fill="primary"` are both dropped, which
 * would leave the eyes unstyled. Resolving through the shared theme bridge hands
 * every surface a concrete `rgb()` instead.
 */
const colorMode = useColorMode()
const resolvedColors = ref<AiOrbFaceColors>({ ...finalColors.value })

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

const active = computed<AiOrbFaceExpression>(() => {
  if (typeof props.expression === 'object') return props.expression
  if (props.expression) return AI_ORB_FACE_EXPRESSIONS[props.expression]
  return AI_ORB_FACE_EXPRESSIONS[AI_ORB_FACE_STATE_EXPRESSION[props.state]]
})

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

/* Geometry, in viewBox units. The eye stays centred as it opens and closes, so a
   squint reads as lids meeting rather than the eye sliding up the face. */
const eyes = computed(() => {
  if (isBroken.value) return []
  return SIDES.map((side) => {
    const shape = side < 0 ? active.value.left : active.value.right
    const width = EYE_WIDTH * shape.w
    const height = EYE_HEIGHT * shape.h
    const x = CENTER + side * EYE_OFFSET - width / 2
    const y = EYE_Y + (EYE_HEIGHT - height) / 2 + (shape.dy ?? 0)
    // A capsule at any height: a rounded bar at rest, and as the eye shuts the
    // radius follows it down into a lozenge instead of squashing a fixed corner
    // into a rectangle. A zero-height rect is not renderable, hence the floor.
    const drawn = Math.max(height, 0.5)
    return {
      side,
      x,
      y,
      width,
      drawn,
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

/** Shared by both eyes, because a blink always takes both at once. */
let lid = 1

/**
 * Composed by hand rather than handed to the visual element, in the order
 * motion-v emits, with the centre pushed out and back around the blink and the
 * tilt. That is exactly what a `transform-origin` at the eye's centre does,
 * without depending on a reference box to resolve percentages against.
 */
const paintEyes = () => {
  const dx = gazeX.get()
  const dy = gazeY.get()
  for (const part of eyes.value) {
    const el = eyeEls.get(part.side)
    if (!el) continue
    el.style.transform
      = `translate(${dx}px, ${dy}px)`
        + ` translate(${part.cx}px, ${part.cy}px)`
        + ` scaleY(${lid})`
        + ` rotate(${part.rotate}deg)`
        + ` translate(${-part.cx}px, ${-part.cy}px)`
  }
}

const paintSpirals = (degrees: number) => {
  for (const side of spiralSides.value) {
    const el = spiralEls.get(side)
    if (!el) continue
    // Plain nodes, so nothing else sets these: the fill box is the reference
    // box here, which puts the rotation on the swirl's own centre.
    el.style.transformBox = 'fill-box'
    el.style.transformOrigin = '50% 50%'
    el.style.transform
      = `translate(${CENTER + side * EYE_OFFSET}px, ${EYE_Y + EYE_HEIGHT / 2}px)`
        + ` rotate(${degrees * side}deg)`
        + ` scale(1.5)`
  }
}

// The gaze springs notify on every animated frame, so subscribing to them is the
// whole per-frame loop for the eyes. Nothing here runs when nothing is moving.
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

/**
 * A blink spans several awaits, so the component can unmount mid-blink. Every leg
 * checks first, and a second blink follows the first closely often enough to be
 * worth the extra branch.
 */
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
  if (shouldReduceMotion.value || isBroken.value) return
  blinkRunning = true
  scheduleBlink()
}

/** Pointer tracking, capped so the eyes never run off the face. */
let detachGaze: (() => void) | null = null

const attachGaze = () => {
  detachGaze?.()
  detachGaze = null
  // While thinking the eyes look away, which is what makes that state legible
  // without any added graphic. A broken face has no eyes left to move.
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

/* The two whole-body moves, sampled by hand.
   `useAnimationControls().start()` is the obvious way to drive these and it is
   what the React reference does, but motion-v 1.7.2 under-delivers multi-keyframe
   values through that path: measured in a browser, this file's `error` wobble
   peaked at rotate -0.056deg against a keyframe of -11deg, and the `done` hop at
   scaleX 1.032 against 1.08, with both animations peaking ~40-76ms in regardless
   of their 1050/850ms durations. Removing `times`, swapping the easing and letting
   the state watcher settle all failed to move the numbers, so the shortfall is
   inside the keyframe interpolation rather than in the call. Everything on the
   imperative path below is unaffected, which is why the eyes are painted by hand
   too. So the same move is replayed here, with the same `cubicBezier` the file
   already uses for the blink, and the same constants the reference declares. */
const BODY_IDENTITY = { scale: 1, scaleX: 1, scaleY: 1, x: 0, y: 0, rotate: 0 }

const formatBodyTransform = (t: typeof BODY_IDENTITY) => {
  // Emitted in the same order motion-v uses: translate, scale, rotate. Keys that
  // sit at identity are left out, so a resting body carries no transform at all.
  const parts: string[] = []
  if (t.x !== 0 || t.y !== 0) parts.push(`translate(${t.x}px, ${t.y}px)`)
  if (t.scale !== 1) parts.push(`scale(${t.scale})`)
  if (t.scaleX !== 1) parts.push(`scaleX(${t.scaleX})`)
  if (t.scaleY !== 1) parts.push(`scaleY(${t.scaleY})`)
  if (t.rotate !== 0) parts.push(`rotate(${t.rotate}deg)`)
  return parts.join(' ')
}

let bodyFrame = 0
// Bumped on every stop and stamped onto each move, so a chain that somehow
// outlives its cancel retires itself on its next frame instead of painting.
let bodyGeneration = 0

const stopBodyMove = () => {
  bodyGeneration += 1
  if (bodyFrame) {
    cancelAnimationFrame(bodyFrame)
    bodyFrame = 0
  }
}

/** The body div and the face svg move as one silhouette, so they share a query. */
const paintBody = (t: typeof BODY_IDENTITY) => {
  const root = rootEl.value
  if (!root) return
  const value = formatBodyTransform(t)
  for (const el of root.querySelectorAll<HTMLElement>('[data-orb-body]')) {
    el.style.transform = value
  }
}

const playBodyMove = (
  keyframes: Record<string, number[]>,
  { duration, ease, times }: { duration: number, ease: Easing, times?: number[] },
) => {
  stopBodyMove()
  const channels = Object.entries(keyframes)
  if (!channels.length) return
  const count = channels[0][1].length
  // `times` is honoured only on an exact length match, which is how motion-dom
  // reads it too. Anything else falls back to an even distribution.
  const stops = times && times.length === count
    ? times
    : Array.from({ length: count }, (_, i) => i / (count - 1))
  const generation = ++bodyGeneration
  let handle = 0
  // The clock starts on the first frame that actually gets to paint, not when the
  // move is requested. A state change re-renders every orb at once, and that work
  // can outlast a short move, which would otherwise deliver the ending frame as
  // the opening one and leave the silhouette sitting at identity.
  let started = 0

  const step = () => {
    if (generation !== bodyGeneration) return
    // The next frame is booked before any work happens, so nothing thrown or
    // returned from below can leave the chain without a pending frame.
    handle = requestAnimationFrame(step)
    bodyFrame = handle
    if (!started) started = performance.now()
    // `duration` is in seconds, like every other duration in this component, but the
    // clock hands back milliseconds. The conversion matters: without it a 1.05s move
    // is treated as 1.05ms and finishes before the second frame ever arrives, so the
    // move is delivered as a single jump from the first keyframe to the last.
    const progress = Math.max(0, Math.min((performance.now() - started) / (duration * 1000), 1))
    let segment = 0
    while (segment < stops.length - 2 && progress > stops[segment + 1]) segment += 1
    const span = stops[segment + 1] - stops[segment]
    const local = span > 0 ? (progress - stops[segment]) / span : 1
    const eased = ease(Math.max(0, Math.min(1, local)))
    const frame = { ...BODY_IDENTITY } as Record<string, number>
    for (const [key, values] of channels) {
      frame[key] = values[segment] + (values[segment + 1] - values[segment]) * eased
    }
    paintBody(frame as typeof BODY_IDENTITY)
    if (progress >= 1) {
      cancelAnimationFrame(handle)
      handle = 0
      bodyFrame = 0
    }
  }

  handle = requestAnimationFrame(step)
  bodyFrame = handle
}

/**
 * Breathing, driven off the motion value so a 60fps audio signal never re-renders
 * this component. It rides the same painter as the one-shot moves rather than an
 * animation control, because exactly one thing has to own `transform` on these two
 * elements: while `:animate` was still bound, motion-v rewrote the body div's
 * `style.transform` on every tick and silently discarded every hand-written frame.
 */
let detachBreathing: (() => void) | null = null

const stopBreathing = () => {
  detachBreathing?.()
  detachBreathing = null
}

const paintBreathing = (level: number) => {
  paintBody({ ...BODY_IDENTITY, scale: 1 + level * 0.07, y: -level * 2 })
}

const syncBreathing = () => {
  stopBreathing()
  if (!mounted.value) return
  if (!isListening.value || shouldReduceMotion.value) {
    // Reset here rather than inside the subscription, because a listener that has
    // already been torn down cannot be relied on to catch a last value.
    paintBody(BODY_IDENTITY)
    return
  }
  // Painting once up front matters: `on('change')` only fires on a change, so an
  // amplitude that is already mid-sentence would otherwise start untransformed.
  paintBreathing(amplitudeValue.get())
  detachBreathing = amplitudeValue.on('change', paintBreathing)
}

const wobble = () => {
  gazeX.set(0)
  gazeY.set(0)
  if (shouldReduceMotion.value) return
  // Only one writer may own the body transform, and a fault always supersedes
  // whatever the last state was mid-breath.
  stopBreathing()
  playBodyMove(
    { rotate: [0, -11, 9, -7, 5, -3, 0], x: [0, -5, 4, -3, 2, -1, 0] },
    { duration: 1.05, ease: cubicBezier(0.45, 0, 0.55, 1) },
  )
}

/** The squash and the stretch are the whole payload of a success. */
const hop = () => {
  if (shouldReduceMotion.value) return
  stopBreathing()
  playBodyMove(
    {
      scaleX: [1, 1.08, 0.94, 1.04, 0.99, 1],
      scaleY: [1, 0.9, 1.08, 0.95, 1.02, 1],
      y: [0, 3, -9, 0, -3, 0],
    },
    { duration: 0.85, ease: EASE_OUT, times: [0, 0.12, 0.4, 0.62, 0.82, 1] },
  )
}

let spiralFrame = 0

const stopSpirals = () => {
  if (spiralFrame) {
    cancelAnimationFrame(spiralFrame)
    spiralFrame = 0
  }
}

const startSpirals = () => {
  stopSpirals()
  if (!isBroken.value) return
  if (shouldReduceMotion.value) {
    paintSpirals(0)
    return
  }
  const started = performance.now()
  const step = (now: number) => {
    paintSpirals((((now - started) / SPIRAL_MS) % 1) * 360)
    spiralFrame = requestAnimationFrame(step)
  }
  spiralFrame = requestAnimationFrame(step)
}

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
  startSpirals()
  syncBreathing()
  if (isBroken.value) wobble()
  else if (isHappy.value) hop()
  paintEyes()
})

onBeforeUnmount(() => {
  mounted.value = false
  stopBlinking()
  stopSaccades()
  stopBreathing()
  stopSpirals()
  stopBodyMove()
  detachGaze?.()
  detachEnergy?.()
  if (lidTween) {
    cancelAnimationFrame(lidTween.frame)
    lidTween.resolve()
    lidTween = null
  }
})

watch(eyes, paintEyes, { flush: 'post' })

watch([isBroken, shouldReduceMotion], () => {
  // The spirals keep turning for as long as the fault lasts, so they start and
  // stop with the state rather than once on entry.
  startSpirals()
  startBlinking()
  if (!isBroken.value) paintEyes()
}, { flush: 'post' })

watch([() => props.gaze, isThinking, isBroken, shouldReduceMotion], attachGaze)

watch([isThinking, shouldReduceMotion], startSaccades)

watch([isListening, shouldReduceMotion], syncBreathing, { flush: 'post' })

// Re-resolve whenever the colours change or the theme flips, so a token follows
// the active light/dark palette instead of freezing at its first value.
watch([finalColors, () => colorMode.value], resolveColors)

watch(() => props.state, (next, previous) => {
  if (!mounted.value) return
  if (next === 'error' && previous !== 'error') wobble()
  if (next === 'done' && previous !== 'done') hop()
}, { flush: 'post' })
</script>

<script lang="ts">
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

/** Two eyes described independently, which is what buys a wink. */
export type AiOrbFaceExpression = {
  left: AiOrbFaceEyeShape
  right: AiOrbFaceEyeShape
}

export interface AiOrbFaceColors {
  body: string
  bodyEdge: string
  feature: string
}

export interface AiOrbFaceProps {
  /** Names the character for assistive technology. Omit it to stay decorative. */
  ariaLabel?: string
  /** 0 to 1 speech level. Widens the eyes and stirs the interior while talking. */
  amplitude?: AIAmplitude
  class?: string
  /** Overrides any of the body, body edge, or feature colours. */
  colors?: Partial<AiOrbFaceColors>
  /** Follow the pointer. Turn it off where the face is decorative and busy. */
  gaze?: boolean
  /** Set the face directly and ignore `state`. */
  expression?: AiOrbFaceExpressionName | AiOrbFaceExpression
  /** Pixels when a number, any CSS length when a string. */
  size?: number | string
  state?: AIState
  ui?: Record<string, any>
}

const eye = (h: number, w = 1, rotate = 0, dy = 0): AiOrbFaceEyeShape => ({ dy, h, rotate, w })

const symmetric = (h: number, w = 1, rotate = 0, dy = 0): AiOrbFaceExpression => ({
  left: eye(h, w, rotate, dy),
  right: eye(h, w, -rotate, dy),
})

/**
 * There is no mouth. A mouth has to be drawn, and a drawn mouth ends up carrying
 * most of the expression, at which point the eyes stop mattering. Leaving it out
 * keeps the whole read in two shapes that cost nothing to change.
 */
export const AI_ORB_FACE_EXPRESSIONS = {
  /** Wide. Paying attention. */
  alert: symmetric(1.2, 1.05, 0, -1),
  /** Eyes shut, curved down. Content rather than asleep. */
  content: symmetric(0.16, 1.25, 0, 2),
  /** Both eyes tilted inward. */
  cross: symmetric(0.85, 1, 18),
  /** Flat dashes. Unimpressed. */
  deadpan: symmetric(0.14, 1.35),
  /** One eye narrowed. Not convinced. */
  doubtful: { left: eye(1, 1), right: eye(0.45, 1.1, -14) },
  /** Narrowed and level. Working on it. */
  focused: symmetric(0.55, 1.05),
  /** Resting. */
  neutral: symmetric(1),
  /** Small and high. Caught off guard. */
  surprised: symmetric(0.5, 0.55, 0, -3),
  wink: { left: eye(1, 1), right: eye(0.12, 1.2, 0, 2) },
} as const

export type AiOrbFaceExpressionName = keyof typeof AI_ORB_FACE_EXPRESSIONS

/** Which face each state wears when the caller does not name one. */
export const AI_ORB_FACE_STATE_EXPRESSION = {
  done: 'content',
  error: 'cross',
  idle: 'neutral',
  listening: 'alert',
  streaming: 'focused',
  thinking: 'doubtful',
} as const

/**
 * Follow the theme by default: the body is the primary colour, and the edge and
 * features are mixed away from it so the sphere keeps a lit highlight and the
 * eyes stay legible. The edge is mixed toward white and the features toward
 * black, so the marbled interior reads as a sphere rather than a flat disc and
 * the flow work in the shader stays visible.
 */
export const AI_ORB_FACE_DEFAULT_COLORS = {
  body: 'var(--ui-primary)',
  bodyEdge: 'color-mix(in oklab, var(--ui-primary), white 78%)',
  feature: 'color-mix(in oklab, var(--ui-primary), black 82%)',
} as const
</script>
