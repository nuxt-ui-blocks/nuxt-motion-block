<script setup lang="ts">
import { useReducedMotion } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  DEFAULT_OUTRO_MS,
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
  resizeWebGLCanvas,
} from '../../utils/webgl'
import {
  SDF_BLOB_COVER_CLEAR_PROGRESS,
  SDF_BLOB_COVER_COLOR,
  SDF_BLOB_DEFAULT_DURATION_MS,
  SDF_BLOB_FALLBACK_MAX_SCALE,
  SDF_BLOB_FRAGMENT_SHADER,
  SDF_BLOB_VARIANTS,
} from './constants'

/**
 * Props for `MSdfBlobTransition`.
 *
 * Declared inline rather than imported: `defineProps` has to expand the type to
 * emit runtime props, and when that type comes from another file the SFC compiler
 * needs filesystem access to resolve it — which the dev server's browser-side
 * compile path cannot provide. `variant` is a literal union rather than an
 * imported alias for the same reason; `SDF_BLOB_VARIANTS` is keyed by the
 * identical union, so `test:types` still catches the two drifting apart.
 */
export interface SdfBlobTransitionProps {
  /** Extra classes for the root element. */
  class?: string
  /** Total sweep time, in milliseconds. */
  duration?: number
  /** Change this to replay the transition. */
  transitionKey?: string | number
  /** Which blob shape to sweep. */
  variant?: 'circle' | 'final' | 'merge' | 'radial' | 'warped'
}

const props = withDefaults(defineProps<SdfBlobTransitionProps>(), {
  duration: SDF_BLOB_DEFAULT_DURATION_MS,
  transitionKey: 0,
  variant: 'final',
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
 * Sweep progress as the driver last reported it.
 *
 * The driver opens with `setAlpha(1)` before its first frame, and the fade
 * repaints on every step — both need the progress to paint against, not the
 * `1` the sweep ends on, or the canvas flashes a fully-covered frame.
 */
let sweepProgress = 0

const variantIndex = computed(() => SDF_BLOB_VARIANTS[props.variant])

/**
 * The canvas stays in the layout for the component's whole life and is faded
 * rather than removed. Toggling `display` would collapse it to a zero rect, and
 * `resizeWebGLCanvas` reads that rect to size the drawing buffer — so a hidden
 * canvas would be sized 1x1 and stay that way for the next sweep.
 */
const canvasStyle = computed(() => ({ opacity: active.value ? overlayAlpha.value : 0 }))

/** The cover clears over the first fraction of the sweep, then stays clear. */
const coverStyle = computed(() => ({
  opacity: coverOpacity.value,
  backgroundColor: SDF_BLOB_COVER_COLOR,
}))

const fallbackStyle = computed(() => {
  const progress = clamp01(fallbackProgress.value)
  return {
    opacity: Math.sin(progress * Math.PI) * 0.9,
    transform: `scale(${0.35 + progress * SDF_BLOB_FALLBACK_MAX_SCALE})`,
    backgroundImage: 'radial-gradient(circle at 50% 50%, rgb(255 226 196 / 85%) 0%, rgb(253 132 154 / 65%) 45%, rgb(255 120 168 / 0%) 72%)',
  }
})

const overlayVisible = computed(() => active.value && reducedMotion.value !== true)

/** Uniform locations are resolved once per frame; `getUniformLocation` is cheap but not free. */
function paint(progress: number, alpha = overlayAlpha.value) {
  if (!handle) return

  const { canvas, gl, program } = handle
  gl.useProgram(program)
  // Size the buffer before sampling it, otherwise `uRes` lags the real dimensions
  // by one frame and the blob's aspect ratio is wrong on resize.
  resizeWebGLCanvas(canvas, gl)
  // The shader composites itself with premultiplied alpha, so a stale frame has
  // to be cleared outright — blending a new sweep over the last one's glow would
  // leave the previous blob ghosting behind this one.
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.uniform2f(gl.getUniformLocation(program, 'uRes'), gl.canvas.width, gl.canvas.height)
  gl.uniform1f(gl.getUniformLocation(program, 'uTime'), performance.now() / 1000)
  gl.uniform1f(gl.getUniformLocation(program, 'uProgress'), progress)
  gl.uniform1f(gl.getUniformLocation(program, 'uAlpha'), alpha)
  gl.uniform1f(gl.getUniformLocation(program, 'uVariant'), variantIndex.value)
  handle.draw()
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
 * Preserves the effect's timing and colour but not its edge: the blob becomes a
 * scaled radial gradient. The alternative — dropping the transition — would leave
 * a caller awaiting `rest` waiting on an event that never came.
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
    // The cover clears on the same progress the shader path uses, so a fallback
    // sweep reveals the swapped slots at the identical moment.
    coverOpacity.value = transitionCoverOpacity(raw, SDF_BLOB_COVER_CLEAR_PROGRESS)

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
  sweepProgress = 0

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
    onRest: () => {
      active.value = false
      coverOpacity.value = 0
      emit('rest')
    },
    outroMs: DEFAULT_OUTRO_MS,
    setAlpha: (alpha) => {
      overlayAlpha.value = alpha
      paint(sweepProgress, alpha)
    },
    setProgress: (progress) => {
      sweepProgress = progress
      coverOpacity.value = transitionCoverOpacity(progress, SDF_BLOB_COVER_CLEAR_PROGRESS)
      paint(progress)
    },
  })
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  handle = createWebGLProgram(canvas, {
    attributes: WEBGL_ALPHA_ATTRIBUTES,
    fragment: SDF_BLOB_FRAGMENT_SHADER,
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

// A variant change only writes a uniform, so it never rebuilds the program.
watch(variantIndex, () => {
  if (handle && active.value) paint(0)
})

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
    :data-transitioning="active"
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
