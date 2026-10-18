<template>
  <div
    ref="rootEl"
    v-bind="$attrs"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class, uiProps.className] })"
  >
    <div
      :style="recordFrameStyle"
      :class="ui.recordFrame({ class: uiProps.ui?.recordFrame })"
    >
      <div
        :aria-label="seekLabel"
        :aria-valuemax="100"
        :aria-valuemin="0"
        :aria-valuenow="Math.round(progress * 100)"
        :tabindex="seekable ? 0 : -1"
        :class="ui.seek({ class: uiProps.ui?.seek })"
        role="slider"
        @keydown="handleSeekKeyDown"
      >
        <svg
          :class="ui.ring({ class: uiProps.ui?.ring })"
          :viewBox="`0 0 ${RING_VIEWBOX} ${RING_VIEWBOX}`"
        >
          <circle
            :class="ui.ringTrack({ class: uiProps.ui?.ringTrack })"
            cx="50"
            cy="50"
            fill="none"
            :r="RING_RADIUS"
            stroke="currentColor"
            :stroke-width="RING_STROKE_WIDTH"
          />
          <motion.circle
            :animate="{ strokeDashoffset: circumference * (1 - progress) }"
            :transition="ringTransition"
            :class="ui.ringProgress({ class: uiProps.ui?.ringProgress })"
            cx="50"
            cy="50"
            fill="none"
            :r="RING_RADIUS"
            stroke="currentColor"
            :stroke-dasharray="circumference"
            stroke-linecap="round"
            :stroke-width="RING_STROKE_WIDTH"
          />
        </svg>
      </div>

      <motion.div
        aria-hidden="true"
        :class="ui.disc({ class: uiProps.ui?.disc })"
        data-music-record=""
      >
        <img
          v-if="props.cover"
          :src="props.cover"
          alt=""
          :class="ui.cover({ class: uiProps.ui?.cover })"
        >
        <div
          v-else
          :class="ui.coverFallback({ class: uiProps.ui?.coverFallback })"
        />
        <div :class="ui.discCenter({ class: uiProps.ui?.discCenter })" />
      </motion.div>

      <button
        :aria-label="toggleLabel"
        :aria-pressed="playing"
        :class="ui.toggle({ class: uiProps.ui?.toggle })"
        type="button"
        @click="handleToggle"
      >
        <AnimatePresence :initial="false">
          <motion.span
            v-if="playing"
            key="pause"
            :animate="iconAnimate"
            :exit="iconExit"
            :initial="iconPauseInitial"
            :transition="iconTransition"
            :class="ui.iconWrapper({ class: uiProps.ui?.iconWrapper })"
          >
            <UIcon
              aria-hidden="true"
              :class="ui.icon({ class: uiProps.ui?.icon })"
              name="i-lucide-pause"
            />
          </motion.span>

          <motion.span
            v-else
            key="play"
            :animate="iconAnimate"
            :exit="iconExit"
            :initial="iconPlayInitial"
            :transition="iconTransition"
            :class="ui.iconWrapper({ class: uiProps.ui?.iconWrapper })"
          >
            <UIcon
              aria-hidden="true"
              :class="ui.icon({ class: uiProps.ui?.icon })"
              name="i-lucide-play"
            />
          </motion.span>
        </AnimatePresence>
      </button>
    </div>

    <div :class="ui.info({ class: uiProps.ui?.info })">
      <div
        v-if="props.title || props.artist"
        :class="ui.text({ class: uiProps.ui?.text })"
      >
        <span
          v-if="props.title"
          :class="ui.title({ class: uiProps.ui?.title })"
        >{{ props.title }}</span>
        <span
          v-if="props.artist"
          :class="ui.artist({ class: uiProps.ui?.artist })"
        >{{ props.artist }}</span>
      </div>
      <div
        aria-hidden="true"
        :class="ui.bars({ class: uiProps.ui?.bars })"
      >
        <motion.span
          v-for="(bar, index) in bars"
          :key="index"
          :animate="bar.animate"
          :transition="bar.transition"
          :class="ui.bar({ class: uiProps.ui?.bar })"
          style="height: 100%; transform-origin: bottom"
        />
      </div>
    </div>

    <audio
      v-if="props.src"
      ref="audioEl"
      :src="props.src"
    >
      <track kind="captions">
    </audio>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import musicToggle from '../theme/music-toggle'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<MusicToggleProps>(), {
  bars: DEFAULT_BARS,
  class: undefined,
  className: undefined,
  cover: undefined,
  defaultPlaying: false,
  artist: undefined,
  title: undefined,
  onSeek: undefined,
  onPlayingChange: undefined,
  playing: undefined,
  progress: 0,
  size: DEFAULT_SIZE,
  src: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'musicToggle', props, theme: musicToggle })

const emit = defineEmits<{
  'update:playing': [value: boolean]
}>()

const shouldReduceMotion = useReducedMotion()

const rootEl = ref<HTMLElement>()
const audioEl = ref<HTMLAudioElement>()
const internalPlaying = ref(props.defaultPlaying)

const isControlled = computed(() => props.playing !== undefined)
const playing = computed(() => (isControlled.value ? props.playing : internalPlaying.value))
const progress = computed(() => props.progress)

function handleToggle() {
  const next = !playing.value
  if (!isControlled.value) {
    internalPlaying.value = next
  }
  emit('update:playing', next)
  props.onPlayingChange?.(next)
}

// The reference keeps the slider out of the tab order and ignores arrow keys
// unless the caller supplied `onSeek`, so mirror that on the prop itself.
const seekable = computed(() => props.onSeek !== undefined)

function handleSeekKeyDown(event: KeyboardEvent) {
  if (!props.onSeek) {
    return
  }

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp': {
      event.preventDefault()
      props.onSeek(clampUnit(progress.value + SEEK_STEP))
      break
    }
    case 'ArrowLeft':
    case 'ArrowDown': {
      event.preventDefault()
      props.onSeek(clampUnit(progress.value - SEEK_STEP))
      break
    }
    case 'Home': {
      event.preventDefault()
      props.onSeek(0)
      break
    }
    case 'End': {
      event.preventDefault()
      props.onSeek(1)
      break
    }
    default:
      break
  }
}

// The reference skips the first run of its audio effect so it does not start
// playback on mount. A non-immediate watcher has exactly that behaviour.
watch(playing, (value) => {
  const audio = audioEl.value
  if (!audio) {
    return
  }

  if (value) {
    audio.play().catch(() => {
      // Playback was blocked or interrupted; the visual state stays in sync.
    })
  }
  else {
    audio.pause()
  }
})

// The reference animates a MotionValue bound to the record's `rotate` style.
// motion-v snapshots MotionValues in `:style`, so the rotation is driven with a
// plain rAF loop writing the CSS `rotate` property instead. The tick locals stay
// non-reactive so no frame triggers a re-render, and the element is resolved
// lazily on the first frame because function refs on `motion.*` do not resolve.
let rotationDeg = 0
let recordEl: HTMLElement | null = null
let frameId = 0
let lastTime = 0

function tick(time: number) {
  const delta = lastTime === 0 ? 0 : time - lastTime
  lastTime = time

  recordEl ??= rootEl.value?.querySelector<HTMLElement>('[data-music-record]') ?? null
  if (recordEl) {
    rotationDeg += delta * ROTATION_DEG_PER_MS
    recordEl.style.rotate = `${rotationDeg % 360}deg`
  }

  frameId = requestAnimationFrame(tick)
}

function startRotation() {
  if (frameId !== 0) {
    return
  }
  lastTime = 0
  frameId = requestAnimationFrame(tick)
}

function stopRotation() {
  if (frameId === 0) {
    return
  }
  cancelAnimationFrame(frameId)
  frameId = 0
  lastTime = 0
}

// The reference's `useAnimationFrame` is client-only, but an `immediate`
// watcher would run this during SSR where `requestAnimationFrame` does not
// exist. The first sync therefore hangs off `onMounted` and later ones off a
// plain watcher, so the loop only ever starts in the browser.
function syncRotation() {
  if (playing.value && !shouldReduceMotion.value) {
    startRotation()
  }
  else {
    stopRotation()
  }
}

onMounted(syncRotation)

watch([playing, shouldReduceMotion], syncRotation)

onBeforeUnmount(stopRotation)

const circumference = 2 * Math.PI * RING_RADIUS
const recordFrameStyle = computed<CSSProperties>(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`,
}))

const ringTransition = computed(() =>
  shouldReduceMotion.value ? { duration: 0 } : { duration: 0.25, ease: MOVEMENT_EASE },
)

const label = computed(() =>
  [props.title, props.artist].filter(Boolean).join(' — '),
)
const seekLabel = computed(() =>
  label.value ? `Seek ${label.value}` : 'Seek track',
)
const toggleLabel = computed(() =>
  `${playing.value ? 'Pause' : 'Play'}${label.value ? ` ${label.value}` : ''}`,
)

// motion-v's `AnimatePresence` does not support `mode="wait"`, so both icons
// stay mounted during the swap and are centred on top of each other instead.
const iconTransition = computed(() =>
  shouldReduceMotion.value ? { duration: 0 } : SPRING,
)
const iconAnimate = computed(() =>
  shouldReduceMotion.value ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 },
)
const iconExit = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, rotate: 45, scale: 0.6 },
)
const iconPlayInitial = computed(() =>
  shouldReduceMotion.value ? { opacity: 0 } : { opacity: 0, rotate: -45, scale: 0.6 },
)
const iconPauseInitial = computed(() =>
  shouldReduceMotion.value ? { opacity: 0 } : { opacity: 0, rotate: 45, scale: 0.6 },
)

const bars = computed(() => {
  const animated = playing.value && !shouldReduceMotion.value

  return Array.from({ length: props.bars }, (_, index) => {
    const heightSeed = hashUnit(index)
    const durationSeed = hashUnit(index + 0.5)
    const delaySeed = hashUnit(index + 0.25)
    const minScale = BAR_MIN_SCALE + heightSeed * 0.15
    const maxScale = BAR_MAX_SCALE - (1 - heightSeed) * 0.3
    const duration = BAR_BASE_DURATION + durationSeed * BAR_DURATION_JITTER
    const delay = delaySeed * duration

    return {
      animate: animated
        ? { scaleY: [minScale, maxScale, minScale] }
        : { scaleY: minScale },
      transition: animated
        ? {
            delay,
            duration,
            ease: MOVEMENT_EASE,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'mirror' as const,
          }
        : { duration: 0 },
    }
  })
})

function hashUnit(seed: number) {
  const x = Math.sin(seed * HASH_MULTIPLIER) * HASH_SCALE
  return x - Math.floor(x)
}

function clampUnit(value: number) {
  return Math.min(1, Math.max(0, value))
}
</script>

<script lang="ts">
// Kept in a normal script so the hoisted `defineProps()` defaults can reference
// these module-scope constants, and so the public prop interface is importable.
const DEFAULT_SIZE = 96
const DEFAULT_BARS = 24
const RING_RADIUS = 46
const RING_VIEWBOX = 100
const RING_STROKE_WIDTH = 4
const ROTATION_DEG_PER_MS = 360 / 15_000
const SEEK_STEP = 0.05
const BAR_MIN_SCALE = 0.2
const BAR_MAX_SCALE = 1
const BAR_BASE_DURATION = 0.6
const BAR_DURATION_JITTER = 0.5
const HASH_MULTIPLIER = 12.9898
const HASH_SCALE = 43_758.5453
const SPRING = { bounce: 0.1, duration: 0.25, type: 'spring' as const }
const MOVEMENT_EASE: [number, number, number, number] = [0.645, 0.045, 0.355, 1]

export interface MusicToggleProps {
  /** Number of waveform bars rendered next to the track info */
  bars?: number
  /** Extra classes for the root element */
  class?: string
  /** Alias of `class`, kept for parity with the React reference */
  className?: string
  /** Cover art image url shown inside the spinning record */
  cover?: string
  /** Default playing state for uncontrolled usage */
  defaultPlaying?: boolean
  /** Called whenever the playing state changes */
  onPlayingChange?: (playing: boolean) => void
  /** Called when the seek slider is used to change progress */
  onSeek?: (progress: number) => void
  /** Controlled playing state. Leave undefined for uncontrolled usage. */
  playing?: boolean
  /** Current playback progress, from 0 to 1 */
  progress?: number
  /** Diameter of the record, in pixels */
  size?: number
  /**
   * Audio source. When provided the component owns an `<audio>` element and
   * plays/pauses it. When omitted the component is purely visual and the
   * caller drives `playing` externally.
   */
  src?: string
  /** Theme slots for the component */
  ui?: Record<string, any>
  /** Track artist, shown under the title */
  artist?: string
  /** Track title, shown above the artist and read by assistive tech */
  title?: string
}
</script>
