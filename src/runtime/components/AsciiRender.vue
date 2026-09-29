<template>
  <div
    ref="containerRef"
    :class="['relative isolate overflow-hidden rounded-xl bg-default', props.class]"
  >
    <video
      v-if="props.source.type === 'video'"
      ref="videoRef"
      aria-hidden="true"
      :class="mediaClass"
      crossorigin="anonymous"
      loop
      muted
      playsinline
      preload="auto"
      :src="props.source.src"
      tabindex="-1"
    />
    <img
      v-else
      ref="imageRef"
      alt=""
      aria-hidden="true"
      :class="mediaClass"
      crossorigin="anonymous"
      :src="props.source.src"
    >

    <pre
      v-show="!isFallback"
      ref="preRef"
      aria-hidden="true"
      :class="[
        'm-0 select-none whitespace-pre font-mono',
        props.color === 'mono' ? 'text-default' : 'bg-clip-text text-transparent',
      ]"
      :style="{
        backgroundClip: props.color === 'source' ? 'text' : undefined,
        WebkitBackgroundClip: props.color === 'source' ? 'text' : undefined,
        backgroundSize: '100% 100%',
        fontSize: `${props.fontSize}px`,
        imageRendering: 'pixelated',
        lineHeight: 1,
        whiteSpace: 'pre',
      }"
    />

    <span class="sr-only">{{ props.alt }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { useReducedMotion } from 'motion-v'

export type AsciiColorMode = 'mono' | 'source'

export interface AsciiRenderSource {
  /** URL of the image or video to sample. Must allow cross-origin reads. */
  src: string
  /** Kind of media behind `src`. */
  type: 'image' | 'video'
}

export interface AsciiRenderProps {
  /** Description of the media. Exposed to assistive technology. */
  alt: string
  /** Character ramp ordered dense to sparse. */
  charset?: string
  class?: string
  /** `mono` paints one theme colour, `source` tints the glyphs with the frame. */
  color?: AsciiColorMode
  /** Number of character columns sampled across the frame. */
  columns?: number
  /** Glyph size in pixels. */
  fontSize?: number
  /** Frames per second for video sources. */
  fps?: number
  /** Flip the luminance-to-character mapping. */
  invert?: boolean
  /** Hold the current frame without tearing down the renderer. */
  paused?: boolean
  source: AsciiRenderSource
}

const props = withDefaults(defineProps<AsciiRenderProps>(), {
  charset: '@%#*+=-:. ',
  class: '',
  color: 'mono',
  columns: 80,
  fontSize: 10,
  fps: 24,
  invert: false,
  paused: false,
})

const DEFAULT_CHARSET = '@%#*+=-:. '
const MIN_COLUMNS = 8
const MAX_COLUMNS = 240
const MIN_FPS = 1
const MAX_FPS = 60
/** A monospace cell is about twice as tall as it is wide. */
const CHAR_ASPECT = 0.5
const CHANNELS = 4
const MAX_CHANNEL = 255
/** Rec. 709 luma weights — the same ones the eye uses. */
const LUMA_R = 0.2126
const LUMA_G = 0.7152
const LUMA_B = 0.0722
const MS_PER_SECOND = 1000
const NEWLINE = '\n'
const VISIBILITY_MARGIN = '0px 0px 10% 0px'

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const buildAscii = (
  data: Uint8ClampedArray,
  columns: number,
  rows: number,
  charset: string,
  invert: boolean,
) => {
  const lastIndex = charset.length - 1
  const glyphs: string[] = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const offset = (y * columns + x) * CHANNELS
      const luminance = (data[offset] * LUMA_R + data[offset + 1] * LUMA_G + data[offset + 2] * LUMA_B) / MAX_CHANNEL
      const level = invert ? 1 - luminance : luminance
      glyphs.push(charset[clamp(Math.round(level * lastIndex), 0, lastIndex)])
    }
    glyphs.push(NEWLINE)
  }
  return glyphs.join('')
}

const shouldReduceMotion = useReducedMotion()
const containerRef = ref<HTMLElement | null>(null)
const preRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const isFallback = ref(false)
const isVisible = ref(true)

const mediaClass = computed(() =>
  isFallback.value
    ? 'relative h-full w-full object-contain'
    : 'pointer-events-none absolute inset-0 h-full w-full object-contain opacity-0',
)

const safeCharset = computed(() => (props.charset.length > 1 ? props.charset : DEFAULT_CHARSET))
const safeColumns = computed(() => clamp(Math.round(props.columns), MIN_COLUMNS, MAX_COLUMNS))
const safeFps = computed(() => clamp(Math.round(props.fps), MIN_FPS, MAX_FPS))

onMounted(() => {
  const container = containerRef.value
  if (!container || typeof IntersectionObserver === 'undefined') {
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isVisible.value = entry.isIntersecting
      }
    },
    { rootMargin: VISIBILITY_MARGIN },
  )
  observer.observe(container)
  onBeforeUnmount(() => observer.disconnect())
})

// The upstream version tears down and rebuilds the whole renderer whenever any
// input changes; `watchEffect` plus `onCleanup` is the direct Vue equivalent.
watchEffect((onCleanup) => {
  const pre = preRef.value
  const media = props.source.type === 'video' ? videoRef.value : imageRef.value
  const sourceSrc = props.source.src
  if (!pre || !media || !sourceSrc) {
    return
  }

  const grid = document.createElement('canvas')
  const context = grid.getContext('2d', { willReadFrequently: true })
  if (!context) {
    isFallback.value = true
    return
  }

  const video = props.source.type === 'video' ? (media as HTMLVideoElement) : null
  // Anything that is not explicitly a video is treated as an image. Branching on
  // the exact string 'image' meant a caller passing a MIME type ('image/png')
  // silently produced no render at all, which is a very easy mistake to make
  // given the prop is called `type`.
  const image = (video ? null : media) as HTMLImageElement | null
  const charset = safeCharset.value
  const columns = safeColumns.value
  const fps = safeFps.value
  const { color, invert, paused } = props
  const reduceMotion = shouldReduceMotion.value
  const visible = isVisible.value

  let frame = 0
  let lastDrawnAt = 0
  let isCancelled = false

  const naturalSize = () => {
    if (video) {
      return { height: video.videoHeight, width: video.videoWidth }
    }
    return { height: image?.naturalHeight ?? 0, width: image?.naturalWidth ?? 0 }
  }

  const drawFrame = () => {
    const { height: mediaHeight, width: mediaWidth } = naturalSize()
    if (mediaWidth === 0 || mediaHeight === 0) {
      return false
    }
    const rows = Math.max(1, Math.round((columns * mediaHeight * CHAR_ASPECT) / mediaWidth))
    grid.width = columns
    grid.height = rows
    context.clearRect(0, 0, columns, rows)
    context.drawImage(media, 0, 0, columns, rows)

    const { data } = context.getImageData(0, 0, columns, rows)
    pre.textContent = buildAscii(data, columns, rows, charset, invert)
    // The glyph mask never changes shape, only density, so the one-pixel grid
    // render it sits on can be reused verbatim as the paint behind the text.
    pre.style.backgroundImage = color === 'source' ? `url(${grid.toDataURL()})` : ''
    return true
  }

  const safeDraw = () => {
    try {
      return drawFrame()
    }
    catch {
      // A tainted canvas throws on read — the source did not allow CORS.
      isFallback.value = true
      return false
    }
  }

  const tick = (time: number) => {
    if (isCancelled) {
      return
    }
    const interval = MS_PER_SECOND / fps
    if (time - lastDrawnAt >= interval) {
      lastDrawnAt = time
      if (!safeDraw()) {
        return
      }
    }
    frame = requestAnimationFrame(tick)
  }

  const start = () => {
    if (isCancelled) {
      return
    }
    if (!safeDraw()) {
      return
    }
    isFallback.value = false
    const isStatic = !video || reduceMotion || paused || !visible
    if (isStatic) {
      video?.pause()
      return
    }
    const playback = video.play()
    playback?.catch(() => {
      isFallback.value = true
    })
    frame = requestAnimationFrame(tick)
  }

  const handleError = () => {
    if (!isCancelled) {
      isFallback.value = true
    }
  }

  if (video) {
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      start()
    }
    else {
      video.addEventListener('loadeddata', start, { once: true })
    }
    video.addEventListener('error', handleError)
  }
  else if (image) {
    if (image.complete) {
      start()
    }
    else {
      image.addEventListener('load', start, { once: true })
    }
    image.addEventListener('error', handleError)
  }

  onCleanup(() => {
    isCancelled = true
    cancelAnimationFrame(frame)
    video?.removeEventListener('loadeddata', start)
    video?.removeEventListener('error', handleError)
    video?.pause()
    image?.removeEventListener('load', start)
    image?.removeEventListener('error', handleError)
    grid.width = 0
    grid.height = 0
  })
})
</script>
