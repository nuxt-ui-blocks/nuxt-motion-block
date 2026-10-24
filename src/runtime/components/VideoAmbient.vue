<script setup lang="ts">
import { useReducedMotion } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { cn } from '../utils/merge'

export interface VideoAmbientProps {
  /** Describes the video content for assistive technology. */
  alt: string
  /** Starts playback once the component is mounted. */
  autoPlay?: boolean
  /** Blur radius in pixels on the inner glow. The outer bloom doubles it. */
  blur?: number
  /** Extra classes for the positioned wrapper. */
  class?: string
  /** Shows the browser's native playback controls. */
  controls?: boolean
  /**
   * Extra light pushed into the glow. The sampled frame is composited onto
   * itself with `lighter`, so 1 is the video's own brightness and anything
   * above it reads as emitted light rather than a colour wash. Values past
   * ~2.2 clip the highlights to white.
   */
  gain?: number
  /** Turns the ambient glow off entirely — useful for an A/B toggle. */
  glow?: boolean
  /** Glow opacity, 0-1. */
  intensity?: number
  loop?: boolean
  muted?: boolean
  poster?: string
  /** Border radius in pixels applied to the video itself. */
  rounded?: number
  /** How many times per second the glow re-samples the current frame. */
  sampleRate?: number
  /** Colour boost on the glow, 1 is the video's own saturation. */
  saturation?: number
  /** How far past the video's edges the inner glow bleeds, 1 is no bleed. */
  scale?: number
  src: string
}

const props = withDefaults(defineProps<VideoAmbientProps>(), {
  autoPlay: true,
  blur: 34,
  class: undefined,
  controls: false,
  gain: 1.7,
  glow: true,
  intensity: 0.9,
  loop: true,
  muted: true,
  poster: undefined,
  rounded: 20,
  sampleRate: 12,
  saturation: 1.9,
  scale: 1.3,
})

const GLOW_BRIGHTNESS = 1.12
const BLOOM_BRIGHTNESS = 1.2

/**
 * The sampled canvas is deliberately tiny. The glow is a colour field, not a
 * picture — a low-resolution grab left to the browser's own bilinear upscaling
 * is already a soft gradient, so the CSS blur only has to finish the job.
 */
const SAMPLE_WIDTH = 24
const SAMPLE_HEIGHT = 14

/** The outer pass is bigger, softer and more saturated than the inner one. */
const BLOOM_SCALE_FACTOR = 1.55
const BLOOM_BLUR_FACTOR = 1.9
const BLOOM_SATURATION_FACTOR = 1.2
const BLOOM_OPACITY_FACTOR = 0.6

const MS_PER_SECOND = 1000
const MIN_SAMPLE_RATE = 1
const MAX_SAMPLE_RATE = 60
const GLOW_FADE_MS = 400
const STATIC_GRADIENT_OPACITY_FACTOR = 0.55
const HAVE_CURRENT_DATA = 2
const GLOW_TRANSITION = `opacity ${GLOW_FADE_MS}ms cubic-bezier(0.23, 1, 0.32, 1)`
const PLAYBACK_EVENTS = ['play', 'playing', 'pause', 'ended', 'loadeddata'] as const

const containerRef = ref<HTMLDivElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const innerCanvasRef = ref<HTMLCanvasElement | null>(null)
const bloomCanvasRef = ref<HTMLCanvasElement | null>(null)

const reducedMotion = useReducedMotion()
const isPlaying = ref(false)
const isOnScreen = ref(true)
const isTabVisible = ref(true)
const isBlocked = ref(false)
const hasFrame = ref(false)

const showSampledGlow = computed(() => props.glow && hasFrame.value && !isBlocked.value)
const showFallbackGlow = computed(() => props.glow && !showSampledGlow.value)

const innerStyle = computed(() => ({
  filter: `blur(${props.blur}px) saturate(${props.saturation}) brightness(${GLOW_BRIGHTNESS})`,
  opacity: showSampledGlow.value ? props.intensity : 0,
  transform: `scale(${props.scale})`,
  transition: GLOW_TRANSITION,
}))

const bloomStyle = computed(() => ({
  filter: `blur(${props.blur * BLOOM_BLUR_FACTOR}px) saturate(${props.saturation * BLOOM_SATURATION_FACTOR}) brightness(${BLOOM_BRIGHTNESS})`,
  opacity: showSampledGlow.value ? props.intensity * BLOOM_OPACITY_FACTOR : 0,
  transform: `scale(${props.scale * BLOOM_SCALE_FACTOR})`,
  transition: GLOW_TRANSITION,
}))

const fallbackStyle = computed(() => ({
  opacity: showFallbackGlow.value ? 1 : 0,
  transition: GLOW_TRANSITION,
}))

const fallbackMediaStyle = computed(() => ({
  filter: `blur(${props.blur}px) saturate(${props.saturation})`,
  opacity: props.intensity * STATIC_GRADIENT_OPACITY_FACTOR,
  transform: `scale(${props.scale})`,
}))

const fallbackGradientStyle = computed(() => ({
  ...fallbackMediaStyle.value,
  background: 'radial-gradient(circle, var(--ui-primary) 0%, transparent 70%)',
}))

const videoStyle = computed(() => ({ borderRadius: `${props.rounded}px` }))

/** Sampling only runs while there is something worth sampling. */
const shouldSample = computed(
  () =>
    props.glow
    && !isBlocked.value
    && !reducedMotion.value
    && isPlaying.value
    && isOnScreen.value
    && isTabVisible.value,
)

let frameId = 0
let lastSampleAt = 0
let intersectionObserver: IntersectionObserver | null = null

function sampleFrame() {
  const video = videoRef.value
  if (!video || video.readyState < HAVE_CURRENT_DATA) return

  const extraGain = Math.max(0, props.gain - 1)
  const canvases = [innerCanvasRef.value, bloomCanvasRef.value]

  for (const canvas of canvases) {
    const ctx = canvas?.getContext('2d')
    if (!(canvas && ctx)) continue
    try {
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      if (extraGain > 0) {
        // Composited onto itself with `lighter`, the frame gains light rather
        // than paint. Without this the glow reads as a tint over whatever it
        // sits on — the difference between a lamp and a coloured filter.
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = extraGain
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
      }
    }
    catch {
      // A few strict configurations throw on drawImage for a tainted
      // cross-origin source — the static fallback takes over.
      isBlocked.value = true
      return
    }
  }

  hasFrame.value = true
}

function stopSampling() {
  if (frameId) cancelAnimationFrame(frameId)
  frameId = 0
  lastSampleAt = 0
}

function startSampling() {
  const minDelta = MS_PER_SECOND / Math.min(MAX_SAMPLE_RATE, Math.max(MIN_SAMPLE_RATE, props.sampleRate))

  // rAF-driven and throttled rather than interval-driven, so it never fires on
  // a frame the browser is already dropping.
  const tick = (now: number) => {
    frameId = requestAnimationFrame(tick)
    if (now - lastSampleAt < minDelta) return
    lastSampleAt = now
    sampleFrame()
  }

  frameId = requestAnimationFrame(tick)
}

function syncPlayback() {
  const video = videoRef.value
  if (!video) return
  isPlaying.value = !(video.paused || video.ended)
}

/**
 * Draws one frame and stops. Reduced motion keeps the glow, it just never
 * moves again.
 */
function sampleStillFrame() {
  const video = videoRef.value
  if (!video) return
  if (video.readyState >= HAVE_CURRENT_DATA) {
    sampleFrame()
    return
  }
  video.addEventListener('loadeddata', sampleFrame, { once: true })
}

/**
 * Autoplay is started from script rather than the `autoplay` attribute: the
 * attribute would be in the server HTML, and a reader who prefers reduced
 * motion would get a moving video for the first frames before hydration could
 * take it away.
 */
function attemptAutoplay() {
  const video = videoRef.value
  if (!(video && props.autoPlay) || reducedMotion.value) return

  const attempt = () => {
    // Some browsers reject a programmatic-looking autoplay even when muted; a
    // rejected promise just means the user presses play themselves.
    video.play().catch(() => {})
  }

  if (video.readyState >= HAVE_CURRENT_DATA) {
    attempt()
    return
  }
  video.addEventListener('loadeddata', attempt, { once: true })
}

function onVisibilityChange() {
  isTabVisible.value = !document.hidden
}

watch(shouldSample, (on) => {
  stopSampling()
  if (on) startSampling()
})

// A gain change while the video is paused should still repaint the still frame.
watch(
  () => props.gain,
  () => {
    if (hasFrame.value && !shouldSample.value) sampleFrame()
  },
)

watch(reducedMotion, (reduce) => {
  if (reduce && props.glow) sampleStillFrame()
})

onMounted(() => {
  const video = videoRef.value
  if (!video) return

  syncPlayback()
  for (const event of PLAYBACK_EVENTS) video.addEventListener(event, syncPlayback)

  attemptAutoplay()

  if (props.glow && reducedMotion.value) sampleStillFrame()

  const container = containerRef.value
  if (container && typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(([entry]) => {
      isOnScreen.value = entry?.isIntersecting ?? true
    })
    observer.observe(container)
    intersectionObserver = observer
  }

  document.addEventListener('visibilitychange', onVisibilityChange)
  isTabVisible.value = !document.hidden
})

onBeforeUnmount(() => {
  stopSampling()
  intersectionObserver?.disconnect()
  intersectionObserver = null
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', onVisibilityChange)
  }
  const video = videoRef.value
  if (video) {
    for (const event of PLAYBACK_EVENTS) video.removeEventListener(event, syncPlayback)
  }
})
</script>

<template>
  <div
    ref="containerRef"
    :class="cn('relative isolate', props.class)"
  >
    <div
      v-if="props.glow"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0"
    >
      <!-- Outer bloom: bigger, softer, more saturated. -->
      <canvas
        ref="bloomCanvasRef"
        :width="SAMPLE_WIDTH"
        :height="SAMPLE_HEIGHT"
        class="absolute inset-0 size-full"
        :style="bloomStyle"
      />
      <!-- Inner glow: hugs the player, carries the colour. -->
      <canvas
        ref="innerCanvasRef"
        :width="SAMPLE_WIDTH"
        :height="SAMPLE_HEIGHT"
        class="absolute inset-0 size-full"
        :style="innerStyle"
      />
    </div>

    <!-- Stays mounted so the first sampled frame crossfades in rather than cutting. -->
    <div
      v-if="props.glow"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0"
      :style="fallbackStyle"
    >
      <img
        v-if="props.poster"
        alt=""
        :src="props.poster"
        class="absolute inset-0 size-full object-cover"
        :style="fallbackMediaStyle"
      >
      <div
        v-else
        class="absolute inset-0 rounded-full"
        :style="fallbackGradientStyle"
      />
    </div>

    <video
      ref="videoRef"
      :aria-label="props.alt"
      :controls="props.controls"
      :loop="props.loop"
      :muted="props.muted"
      :poster="props.poster"
      :src="props.src"
      :style="videoStyle"
      class="relative z-10 block size-full object-cover"
      playsinline
    />
  </div>
</template>
