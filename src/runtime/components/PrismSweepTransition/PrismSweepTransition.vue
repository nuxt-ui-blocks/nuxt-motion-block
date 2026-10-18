<script setup lang="ts">
import { useReducedMotion } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  MIN_SWEEP_MS,
  type ShaderTransitionPlayback,
  playShaderTransition,
} from '../../utils/shader-transition'
import { transitionCoverOpacity } from '../../utils/transition-cover'
import {
  WEBGL_ALPHA_ATTRIBUTES,
  clamp01,
  type WebGLProgramHandle,
  createWebGLProgram,
  easeOutSmoothstep,
  resizeWebGLCanvas,
} from '../../utils/webgl'
import {
  PRISM_SWEEP_CONTENT_SWAP_RATIO,
  PRISM_SWEEP_DEFAULT_DURATION_MS,
  PRISM_SWEEP_DIRECTIONS,
  PRISM_SWEEP_FALLBACK_TRAVEL_PERCENT,
  PRISM_SWEEP_FRAGMENT_SHADER,
  PRISM_SWEEP_OUTRO_MS,
  PRISM_SWEEP_TONES,
  PRISM_SWEEP_VERTEX_SHADER,
  easePrismTravel,
  prismSweepRgb,
} from './constants'

/**
 * Props for `MPrismSweepTransition`.
 *
 * Declared inline rather than imported: `defineProps` has to expand the type to
 * emit runtime props, and when that type comes from another file the SFC compiler
 * needs filesystem access to resolve it — which the dev server's browser-side
 * compile path cannot provide. `direction` and `tone` are literal unions rather
 * than imported aliases for the same reason; `PRISM_SWEEP_DIRECTIONS` and
 * `PRISM_SWEEP_TONES` are keyed by the identical unions, so `test:types` still
 * catches the two drifting apart.
 */
export interface PrismSweepTransitionProps {
  /** Which edge the band enters from. */
  direction?: 'down' | 'left' | 'right' | 'up'
  /** Extra classes for the root element. */
  class?: string
  /** Total sweep time, in milliseconds. */
  duration?: number
  /** Palette and field behaviour of the band. */
  tone?: 'aperture' | 'beam' | 'chroma' | 'prism'
  /** Change this to replay the transition. */
  transitionKey?: string | number
}

const props = withDefaults(defineProps<PrismSweepTransitionProps>(), {
  direction: 'left',
  duration: PRISM_SWEEP_DEFAULT_DURATION_MS,
  tone: 'prism',
  transitionKey: 0,
})

const emit = defineEmits<{
  /** Fired once, after the sweep and its closing fade have finished. */
  rest: []
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const reducedMotion = useReducedMotion()

/**
 * Held in a ref rather than a plain variable because the template branches on it
 * to choose between the shader and the CSS fallback. A computed over a non-reactive
 * variable would evaluate once and then stay cached forever, so the fallback would
 * never appear.
 */
const shaderReady = ref(false)
/** True while a sweep is running. */
const active = ref(false)
/** Overlay alpha, driven by the transition driver's fade. */
const overlayAlpha = ref(0)
/** Leading cover opacity, derived from sweep progress rather than wall-clock time. */
const coverOpacity = ref(0)
/** Fallback-only progress, 0..1. Untouched while a context is available. */
const fallbackProgress = ref(0)

let handle: WebGLProgramHandle | null = null
let playback: ShaderTransitionPlayback | null = null
let fallbackFrame = 0
/**
 * Sweep travel as the driver last reported it.
 *
 * The driver opens with `setAlpha(1)` before its first frame, and the fade
 * repaints on every step — both need the travel to paint against, not the `1`
 * the sweep ends on, or the canvas flashes a fully-crossed frame.
 */
let sweepTravel = 0
/** Sweep start, so the clock uniform can advance without a per-frame allocation. */
const clockStartedAt = performance.now()

const tone = computed(() => PRISM_SWEEP_TONES[props.tone])
const direction = computed(() => PRISM_SWEEP_DIRECTIONS[props.direction])

/**
 * The canvas stays in the layout for the component's whole life and is faded
 * rather than removed. Toggling `display` would collapse it to a zero rect, and
 * `resizeWebGLCanvas` reads that rect to size the drawing buffer — so a hidden
 * canvas would be sized 1x1 and stay that way for the next sweep.
 */
const canvasStyle = computed(() => ({ opacity: active.value ? overlayAlpha.value : 0 }))

/**
 * The cover clears over the first half of the sweep rather than the shared
 * default's first fifth: the source holds the previous content until the band
 * crosses `CONTENT_SWAP_RATIO`, and the cover stands in for exactly that held
 * content. Clearing it earlier would swap the slots while the band was still
 * over unswapped material; later, and the band would have already passed.
 *
 * The cover renders whenever the overlay is up, context or no context — the CSS
 * fallback band needs the same seam hidden or the slot swap shows through it.
 */
const coverStyle = computed(() => ({
  opacity: coverOpacity.value,
  backgroundColor: prismSweepRgb(tone.value.ink),
}))

/**
 * The fallback sweeps a tone-matched gradient band across the frame.
 *
 * Translation rather than a scale: the shader's whole read is a band travelling
 * on a fixed axis, and a fade-in would drop the direction entirely — which for
 * a transition whose prop *is* the direction would leave nothing recognisable.
 */
const fallbackStyle = computed(() => {
  const progress = clamp01(fallbackProgress.value)
  const vertical = props.direction === 'down' || props.direction === 'up'
  const sign = props.direction === 'left' || props.direction === 'down' ? 1 : -1
  const travel = (progress - 0.5) * 2 * PRISM_SWEEP_FALLBACK_TRAVEL_PERCENT
  const gradient = `linear-gradient(${vertical ? 180 : 90}deg, transparent 34%, ${prismSweepRgb(
    tone.value.warm,
  )} 45%, ${prismSweepRgb(tone.value.pearl)} 50%, ${prismSweepRgb(tone.value.cool)} 55%, transparent 66%)`

  return {
    backgroundImage: gradient,
    opacity: progress > 0 && progress < 1 ? Math.sin(progress * Math.PI) * 0.95 : 0,
    transform: vertical ? `translateY(${sign * travel}%)` : `translateX(${sign * travel}%)`,
  }
})

const overlayVisible = computed(() => active.value && reducedMotion.value !== true)

function paint(travel: number, alpha = overlayAlpha.value) {
  if (!handle) return

  const { canvas, gl, program } = handle
  gl.useProgram(program)
  // Size the buffer before sampling it, otherwise `uResolution` lags the real
  // dimensions by one frame and the band's width is wrong on resize.
  resizeWebGLCanvas(canvas, gl)
  // The shader composites itself with premultiplied alpha, so a stale frame has
  // to be cleared outright — blending a new sweep over the last one's glow would
  // leave the previous band ghosting behind this one.
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.uniform2f(gl.getUniformLocation(program, 'uResolution'), canvas.width, canvas.height)
  gl.uniform1f(gl.getUniformLocation(program, 'uClock'), (performance.now() - clockStartedAt) / 1000)
  gl.uniform1f(gl.getUniformLocation(program, 'uTravel'), travel)
  gl.uniform1f(gl.getUniformLocation(program, 'uOpacity'), alpha)
  gl.uniform1f(gl.getUniformLocation(program, 'uAxis'), direction.value.axis)
  gl.uniform1f(gl.getUniformLocation(program, 'uForward'), direction.value.forward)
  gl.uniform1f(gl.getUniformLocation(program, 'uSpan'), tone.value.span)
  gl.uniform1f(gl.getUniformLocation(program, 'uSoftness'), tone.value.softness)
  gl.uniform1f(gl.getUniformLocation(program, 'uBend'), tone.value.bend)
  gl.uniform1f(gl.getUniformLocation(program, 'uFacet'), tone.value.facet)
  gl.uniform1f(gl.getUniformLocation(program, 'uBloom'), tone.value.bloom)
  uniformVec3(gl, program, 'uInk', tone.value.ink)
  uniformVec3(gl, program, 'uPearl', tone.value.pearl)
  uniformVec3(gl, program, 'uWarm', tone.value.warm)
  uniformVec3(gl, program, 'uCool', tone.value.cool)
  handle.draw()
}

/**
 * Writes a palette colour.
 *
 * Destructured in the parameter list rather than spread at the call site:
 * `uniform3f` is fixed-arity, and a spread over the union of the four tones'
 * tuples is not one tuple type as far as the checker is concerned.
 */
function uniformVec3(
  gl: WebGLRenderingContext | WebGL2RenderingContext,
  program: WebGLProgram,
  name: string,
  [r, g, b]: readonly [number, number, number],
) {
  gl.uniform3f(gl.getUniformLocation(program, name), r, g, b)
}

function stop() {
  playback?.cancel()
  playback = null
  if (fallbackFrame) cancelAnimationFrame(fallbackFrame)
  fallbackFrame = 0
}

/**
 * The path taken when the browser refuses a context.
 *
 * Preserves the effect's timing, direction and palette but not its texture: a
 * faceted caustic cannot be expressed in CSS. The alternative — dropping the
 * transition — would leave a caller awaiting `rest` waiting on an event that
 * never came.
 */
function playFallback() {
  const startedAt = performance.now()
  const sweepMs = Math.max(MIN_SWEEP_MS, props.duration)

  // The template branches on `active`, so without this the fallback element is
  // never rendered and the transition is silently invisible.
  active.value = true

  const step = () => {
    const raw = clamp01((performance.now() - startedAt) / sweepMs)
    fallbackProgress.value = raw
    // The cover clears on the same travel the shader path uses, so a fallback
    // sweep reveals the swapped slots at the identical moment.
    coverOpacity.value = transitionCoverOpacity(raw, PRISM_SWEEP_CONTENT_SWAP_RATIO)

    if (raw < 1) {
      fallbackFrame = requestAnimationFrame(step)
      return
    }

    fallbackFrame = 0
    active.value = false
    fallbackProgress.value = 0
    coverOpacity.value = 0
    emit('rest')
  }

  fallbackFrame = requestAnimationFrame(step)
}

function play() {
  stop()
  sweepTravel = 0

  // Reduced motion and a missing context reduce to the same requirement: the
  // content must still settle and `rest` must still fire.
  if (reducedMotion.value === true) {
    emit('rest')
    return
  }

  if (!handle) {
    playFallback()
    return
  }

  active.value = true

  playback = playShaderTransition({
    duration: props.duration,
    ease: easePrismTravel,
    onRest: () => {
      active.value = false
      coverOpacity.value = 0
      emit('rest')
    },
    // The source closes with a plain smoothstep, not the shared fade curve.
    outroEase: easeOutSmoothstep,
    outroMs: PRISM_SWEEP_OUTRO_MS,
    setAlpha: (alpha) => {
      overlayAlpha.value = alpha
      paint(sweepTravel, alpha)
    },
    setProgress: (progress) => {
      sweepTravel = progress
      coverOpacity.value = transitionCoverOpacity(progress, PRISM_SWEEP_CONTENT_SWAP_RATIO)
      paint(progress)
    },
  })
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  handle = createWebGLProgram(canvas, {
    attributes: WEBGL_ALPHA_ATTRIBUTES,
    fragment: PRISM_SWEEP_FRAGMENT_SHADER,
    vertex: PRISM_SWEEP_VERTEX_SHADER,
  })

  if (!handle) {
    shaderReady.value = false
    if (props.transitionKey !== 0 && reducedMotion.value !== true) playFallback()
    return
  }

  shaderReady.value = true
  // Clears the drawing buffer to a known empty state, so a previous sweep's last
  // frame cannot linger under the content.
  paint(0, 0)

  if (props.transitionKey !== 0) play()
})

// Direction and tone only write uniforms, so neither rebuilds the program. Both
// are read inside `paint`, which the sweep loop calls every frame — so a control
// moved mid-sweep lands on the very next frame, with no watch to set up here.
watch(() => props.transitionKey, () => play())

watch(reducedMotion, (value) => {
  if (value !== true) return
  stop()
  active.value = false
  coverOpacity.value = 0
  overlayAlpha.value = 0
})

onBeforeUnmount(() => {
  stop()
  handle?.destroy()
  handle = null
})
</script>

<template>
  <div
    :class="['relative isolate overflow-hidden', props.class]"
    :data-sweeping="active"
  >
    <div class="relative h-full w-full">
      <slot />
    </div>

    <div
      v-if="overlayVisible"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0"
      :style="coverStyle"
    />

    <div
      v-if="overlayVisible && !shaderReady"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0"
      :style="fallbackStyle"
    />

    <canvas
      ref="canvasRef"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full"
      :style="canvasStyle"
    />
  </div>
</template>
