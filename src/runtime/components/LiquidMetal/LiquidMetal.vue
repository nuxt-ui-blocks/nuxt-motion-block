<script setup lang="ts">
import { useReducedMotion } from 'motion-v'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  type WebGLProgramHandle,
  WEBGL_OPAQUE_ATTRIBUTES,
  createWebGLProgram,
  createWebGLRenderLoop,
  resizeWebGLCanvas,
} from '../../utils/webgl'
import {
  LIQUID_METAL_DEFAULT_DISTORTION,
  LIQUID_METAL_DEFAULT_SPEED,
  LIQUID_METAL_FALLBACK_SURFACE,
  LIQUID_METAL_FRAGMENT_SHADER,
  LIQUID_METAL_MAX_FRAME_DELTA,
  LIQUID_METAL_POINTER_CENTER,
  LIQUID_METAL_POINTER_EASE,
  LIQUID_METAL_POINTER_RANGE,
  LIQUID_METAL_TEXT_BACKGROUND_SIZE,
  LIQUID_METAL_TEXT_POINTER_SHIFT,
  LIQUID_METAL_TEXT_REST_POSITION,
  LIQUID_METAL_TEXT_SURFACE,
  LIQUID_METAL_TEXT_SWEEP_RANGE,
  LIQUID_METAL_TEXT_SWEEP_SECONDS,
  LIQUID_METAL_VARIANTS,
  LIQUID_METAL_VERTEX_SHADER,
} from './constants'

/**
 * Props for `MLiquidMetal`.
 *
 * Declared inline rather than imported: `defineProps` has to expand the type to
 * emit runtime props, and when that type comes from another file the SFC compiler
 * needs filesystem access to resolve it — which the dev server's browser-side
 * compile path cannot provide. `variant` is a literal union for the same reason.
 */
export interface LiquidMetalProps {
  /** Extra classes for the root element. */
  class?: string
  /** Strength of the domain warp. `0` is an almost flat sheet, `2` is molten. */
  distortion?: number
  /** Clip the material to the shape of the text instead of filling the box. */
  maskText?: boolean
  /** Freeze the surface on its current frame. */
  paused?: boolean
  /** Let the pointer push the flow field around. */
  pointerInfluence?: boolean
  /** Time multiplier for the flow. */
  speed?: number
  /** Which metal to render. */
  variant?: 'chrome' | 'gold' | 'mercury' | 'oil'
}

const props = withDefaults(defineProps<LiquidMetalProps>(), {
  distortion: LIQUID_METAL_DEFAULT_DISTORTION,
  maskText: false,
  paused: false,
  pointerInfluence: true,
  speed: LIQUID_METAL_DEFAULT_SPEED,
  variant: 'chrome',
})

const reducedMotion = useReducedMotion()

const wrapperRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const textRef = ref<HTMLElement | null>(null)

/**
 * Flipped to `false` only when a context could not be created.
 *
 * Starts `true` so the first render does not flash the CSS stand-in before WebGL
 * reports in — a fallback that appears and then disappears is worse than one that
 * appears only when it is genuinely needed.
 */
const supported = ref(true)
const inView = ref(true)

/**
 * `false` during SSR and during the client's very first render.
 *
 * `useReducedMotion` has no answer on the server, so without this gate the server
 * renders a canvas while a reduced-motion client renders the CSS stand-in, and Vue
 * reports a hydration mismatch. Both sides render the same (empty) container until
 * mount, and the decision is made once, client-side.
 */
const mounted = ref(false)

let handle: WebGLProgramHandle | null = null
let loop: ReturnType<typeof createWebGLRenderLoop> | null = null
let observer: IntersectionObserver | null = null

/**
 * Live uniform state.
 *
 * Plain variables rather than refs: they are read once per frame from inside the
 * draw callback, so making them reactive would only add dependency tracking to a
 * hot path that never renders them.
 */
let elapsed = 0
let lastFrameAt = 0
let pointerX = 0
let pointerY = 0
let targetPointerX = 0
let targetPointerY = 0
let textFrame = 0
let textSweepStartedAt = 0
let textSweepSeconds = LIQUID_METAL_TEXT_SWEEP_SECONDS / 2

/**
 * `background-position` of the masked-text gradient.
 *
 * Held in a ref rather than written straight onto the element: the reactive `:style`
 * binding below re-applies its whole object on every re-render, so an imperative write
 * is clobbered the moment `paused` (or any other prop) changes.
 */
const textPosition = ref(LIQUID_METAL_TEXT_REST_POSITION)

/** `maskText` swaps the whole rendering strategy, so it decides which path runs. */
const usesShader = computed(
  () => mounted.value && !props.maskText && reducedMotion.value !== true && supported.value,
)

const isPlaying = computed(
  () => !props.paused && reducedMotion.value !== true && inView.value,
)

const fallbackSurface = computed(
  () => LIQUID_METAL_FALLBACK_SURFACE[props.variant],
)

const textStyle = computed(() => ({
  backgroundClip: 'text',
  backgroundImage: LIQUID_METAL_TEXT_SURFACE[props.variant],
  backgroundPosition: textPosition.value,
  backgroundSize: LIQUID_METAL_TEXT_BACKGROUND_SIZE,
  color: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}))

function draw() {
  if (!handle) return

  const { canvas, gl, program } = handle
  gl.useProgram(program)

  const now = performance.now()
  // First frame has no previous timestamp, so it advances the clock by zero rather
  // than by however long the component spent unmounted.
  if (lastFrameAt !== 0) {
    elapsed += Math.min((now - lastFrameAt) / 1000, LIQUID_METAL_MAX_FRAME_DELTA) * props.speed
  }
  lastFrameAt = now

  // Pointer easing runs on the render thread, not on the event, so the surface keeps
  // drifting toward the cursor after the pointer has stopped moving.
  pointerX += (targetPointerX - pointerX) * LIQUID_METAL_POINTER_EASE
  pointerY += (targetPointerY - pointerY) * LIQUID_METAL_POINTER_EASE

  // Size before sampling, or `uRes` lags the real dimensions by a frame.
  resizeWebGLCanvas(canvas, gl)
  gl.uniform2f(gl.getUniformLocation(program, 'uRes'), canvas.width, canvas.height)
  gl.uniform1f(gl.getUniformLocation(program, 'uTime'), elapsed)
  gl.uniform1f(gl.getUniformLocation(program, 'uDistortion'), props.distortion)
  gl.uniform1f(gl.getUniformLocation(program, 'uVariant'), LIQUID_METAL_VARIANTS[props.variant])
  gl.uniform2f(gl.getUniformLocation(program, 'uPointer'), pointerX, pointerY)
  handle.draw()
}

function buildContext() {
  const canvas = canvasRef.value
  if (!canvas) return
  handle = createWebGLProgram(canvas, {
    attributes: WEBGL_OPAQUE_ATTRIBUTES,
    fragment: LIQUID_METAL_FRAGMENT_SHADER,
    vertex: LIQUID_METAL_VERTEX_SHADER,
  })

  if (!handle) {
    // Only a WebGL2 context can compile `#version 300 es`, and that is not
    // negotiable for this shader.
    supported.value = false
    return
  }

  // Reset the clock so a rebuilt context does not jump forward by the time it spent
  // being torn down and recreated.
  elapsed = 0
  lastFrameAt = 0
  loop = createWebGLRenderLoop(draw)
}

function releaseContext() {
  loop?.destroy()
  loop = null
  handle?.destroy()
  handle = null
  lastFrameAt = 0
}

// The context is rebuilt only when the rendering strategy changes. Every other
// prop is a uniform write, and rebuilding on those would restart the clock mid-scroll.
// The `nextTick` is required because `usesShader` also gates the `<canvas v-if>`, so
// the element does not exist until the render triggered by this same change.
watch(usesShader, async (enabled, wasEnabled) => {
  if (enabled === wasEnabled) return
  await nextTick()
  if (!enabled) {
    releaseContext()
    return
  }
  buildContext()
  // `buildContext` replaces the loop, so a loop started earlier no longer exists.
  if (isPlaying.value) loop?.start()
})

watch(isPlaying, (playing, wasPlaying) => {
  if (playing === wasPlaying) return
  if (playing) {
    // Clears the accumulated gap so the surface resumes from the frame it paused on
    // instead of skipping forward by however long it was stopped.
    lastFrameAt = 0
    loop?.start()
    return
  }

  loop?.stop()
  // Draws one last frame so a pause shows the surface it froze on.
  if (wasPlaying) loop?.drawOnce()
})

function stopTextSweep() {
  if (!textFrame) return
  // Carry the elapsed sweep across a pause, so resuming continues from where it
  // stopped instead of jumping back to the start of the cycle.
  textSweepSeconds += ((performance.now() - textSweepStartedAt) / 1000) * Math.max(props.speed, 0)
  cancelAnimationFrame(textFrame)
  textFrame = 0
}

function startTextSweep() {
  if (textFrame) return
  // The immediate watcher also runs during SSR, where there is no frame clock.
  if (typeof requestAnimationFrame === 'undefined') return
  textSweepStartedAt = performance.now()

  const step = () => {
    const seconds
      = textSweepSeconds
        + ((performance.now() - textSweepStartedAt) / 1000) * Math.max(props.speed, 0)
    const cycle = (seconds / LIQUID_METAL_TEXT_SWEEP_SECONDS) % 1

    // The shader path eases the pointer inside its draw loop; this path has no
    // draw loop, so the easing has to happen here or the shift would snap.
    if (props.pointerInfluence) {
      pointerX += (targetPointerX - pointerX) * LIQUID_METAL_POINTER_EASE
      pointerY += (targetPointerY - pointerY) * LIQUID_METAL_POINTER_EASE
    }

    const offset = props.pointerInfluence ? pointerX * LIQUID_METAL_TEXT_POINTER_SHIFT : 0
    textPosition.value = `${cycle * LIQUID_METAL_TEXT_SWEEP_RANGE + offset}% 50%`
    textFrame = requestAnimationFrame(step)
  }

  textFrame = requestAnimationFrame(step)
}

/**
 * Starts or stops the masked-text sweep.
 *
 * Separated from the watcher because the watcher alone is not enough: it first runs
 * during setup, when `textRef` does not exist yet, and afterwards only fires when one
 * of its inputs *changes*. `inView` starts as `true` and the IntersectionObserver
 * confirms the same value, so nothing changes after mount and the sweep never starts.
 * `onMounted` therefore calls this directly.
 */
function syncTextSweep() {
  if (props.maskText && isPlaying.value) startTextSweep()
  else stopTextSweep()
}

watch(
  () => [props.maskText, isPlaying.value] as const,
  syncTextSweep,
  { immediate: true },
)

function onPointerMove(event: PointerEvent) {
  const wrapper = wrapperRef.value
  if (!wrapper) return

  const rect = wrapper.getBoundingClientRect()
  targetPointerX
    = ((event.clientX - rect.left) / rect.width - LIQUID_METAL_POINTER_CENTER)
      * LIQUID_METAL_POINTER_RANGE
  targetPointerY
    = (LIQUID_METAL_POINTER_CENTER - (event.clientY - rect.top) / rect.height)
      * LIQUID_METAL_POINTER_RANGE
}

function onPointerLeave() {
  targetPointerX = 0
  targetPointerY = 0
}

/**
 * Binds the pointer listeners, or unbinds them if the surface should ignore the
 * pointer now.
 *
 * Watched rather than bound once on mount, so toggling `pointerInfluence` takes
 * effect without needing the caller to remount the component. The hover check is
 * here for a touch device: without it, the field latches wherever the last tap
 * landed and stays there.
 */
function syncPointerListeners() {
  const wrapper = wrapperRef.value
  if (!wrapper) return

  const wanted
    = props.pointerInfluence
      && reducedMotion.value !== true
      && window.matchMedia('(hover: hover) and (pointer: fine)').matches

  if (wanted) {
    wrapper.addEventListener('pointermove', onPointerMove)
    wrapper.addEventListener('pointerleave', onPointerLeave)
    return
  }

  wrapper.removeEventListener('pointermove', onPointerMove)
  wrapper.removeEventListener('pointerleave', onPointerLeave)
  // Returns the field to rest, so the texture does not stay pushed to one side by
  // a pointer the component has just stopped tracking.
  onPointerLeave()
}

onMounted(() => {
  // Flips `usesShader` on, which is what triggers the context build above.
  mounted.value = true

  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) inView.value = entry.isIntersecting
    })
    if (wrapperRef.value) observer.observe(wrapperRef.value)
  }

  syncPointerListeners()
  // The immediate watcher ran before the component was mounted, so the first real
  // start is here.
  syncTextSweep()
})

// `maskText` swaps the root element, so the listeners have to move to the new node.
watch([() => props.pointerInfluence, reducedMotion, () => props.maskText], syncPointerListeners)

onBeforeUnmount(() => {
  releaseContext()
  stopTextSweep()
  observer?.disconnect()
  observer = null
  wrapperRef.value?.removeEventListener('pointermove', onPointerMove)
  wrapperRef.value?.removeEventListener('pointerleave', onPointerLeave)
})
</script>

<template>
  <span
    v-if="props.maskText"
    ref="wrapperRef"
    :class="['inline-block', props.class]"
  >
    <span
      ref="textRef"
      class="inline-block"
      :style="textStyle"
    ><slot /></span>
  </span>

  <div
    v-else
    ref="wrapperRef"
    :class="['relative isolate overflow-hidden rounded-2xl bg-(--ui-bg)', props.class]"
  >
    <div
      aria-hidden="true"
      class="absolute inset-0 z-0"
    >
      <canvas
        v-if="usesShader"
        ref="canvasRef"
        class="h-full w-full"
      />
      <!-- Empty until mount: the strategy is not known yet, and showing the CSS
           stand-in first would mean painting it and then tearing it down. -->
      <div
        v-else-if="mounted"
        class="h-full w-full"
        :style="{ backgroundImage: fallbackSurface }"
      />
      <div
        v-else
        class="h-full w-full"
      />
    </div>
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
