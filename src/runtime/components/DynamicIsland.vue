<template>
  <div
    ref="rootEl"
    v-bind="$attrs"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <div :class="ui.inner({ class: uiProps.ui?.inner })">
      <motion.div
        :layout="true"
        :class="ui.pill({ class: uiProps.ui?.pill })"
        :style="{ borderRadius: PILL_RADIUS }"
        :transition="pillTransition"
      >
        <!--
          The reference React component keys this node on `view`, which remounts
          the whole subtree on every switch. The port keeps that key so the
          enter animation replays AND every per-view ref below (temperature,
          playing, countdown) resets exactly like the unmounted React state did.
        -->
        <motion.div
          :key="activeView"
          :class="ui.content({ class: uiProps.ui?.content })"
          :initial="contentInitial"
          :animate="contentAnimate"
          :transition="contentTransition"
        >
          <motion.div
            v-if="activeView === 'idle'"
            :layout="true"
            :class="ui.idle({ class: uiProps.ui?.idle })"
            @mouseenter="handleIdleEnter"
            @mouseleave="handleIdleLeave"
          >
            <slot name="idle">
              <motion.div
                :initial="{ opacity: 0, scale: 0.8 }"
                :animate="{ opacity: 1, scale: 1 }"
              >
                <UIcon
                  name="i-lucide-cloud-lightning"
                  :class="ui.idleIcon({ class: uiProps.ui?.idleIcon })"
                />
              </motion.div>

              <AnimatePresence>
                <motion.div
                  v-if="showTemperature"
                  key="temperature"
                  :class="ui.temperature({ class: uiProps.ui?.temperature })"
                  :initial="{ opacity: 0, width: 0 }"
                  :animate="{ opacity: 1, width: 'auto' }"
                  :exit="{ opacity: 0, width: 0 }"
                >
                  <UIcon
                    name="i-lucide-thermometer"
                    :class="ui.temperatureIcon({ class: uiProps.ui?.temperatureIcon })"
                  />
                  <span :class="ui.temperatureValue({ class: uiProps.ui?.temperatureValue })">
                    12°C
                  </span>
                </motion.div>
              </AnimatePresence>
            </slot>
          </motion.div>

          <div
            v-else-if="activeView === 'ring'"
            :class="ui.ring({ class: uiProps.ui?.ring })"
          >
            <slot name="ring">
              <UIcon
                name="i-lucide-phone"
                class="h-5 w-5 text-green-500"
              />
              <div class="flex-1">
                <p class="pointer-events-none font-medium text-white text-sm">
                  Incoming Call
                </p>
                <p class="pointer-events-none text-white text-xs opacity-70">
                  Guillermo Rauch
                </p>
              </div>
              <div class="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            </slot>
          </div>

          <div
            v-else-if="activeView === 'timer'"
            :class="ui.timer({ class: uiProps.ui?.timer })"
          >
            <slot name="timer">
              <UIcon
                name="i-lucide-timer"
                class="h-5 w-5 text-amber-500"
              />
              <div class="flex-1">
                <p class="pointer-events-none font-medium text-white text-sm">
                  <span data-island-timer>{{ remainingSeconds }}</span>s remaining
                </p>
              </div>
              <div class="h-1 w-24 overflow-hidden rounded-full bg-white/20">
                <div
                  data-island-progress
                  class="h-full w-full bg-amber-500"
                />
              </div>
            </slot>
          </div>

          <div
            v-else-if="activeView === 'notification'"
            :class="ui.notification({ class: uiProps.ui?.notification })"
          >
            <UIcon
              name="i-lucide-bell"
              class="h-5 w-5 text-yellow-400"
            />
            <div class="flex-1">
              <p class="pointer-events-none font-medium text-white text-sm">
                New Message
              </p>
              <p class="pointer-events-none text-white text-xs opacity-70">
                You have a new notification!
              </p>
            </div>
            <span class="rounded-full bg-yellow-400/40 px-2 py-0.5 text-yellow-500 text-xs">
              1
            </span>
          </div>

          <div
            v-else
            :class="ui.music({ class: uiProps.ui?.music })"
          >
            <UIcon
              name="i-lucide-music-2"
              class="h-5 w-5 text-pink-500"
            />
            <div class="min-w-0 flex-1">
              <p class="pointer-events-none truncate font-medium text-white text-sm">
                Lofi Chill Beats
              </p>
              <p class="pointer-events-none truncate text-white text-xs opacity-70">
                DJ Smooth
              </p>
            </div>
            <button
              type="button"
              aria-label="Previous track"
              class="rounded-full p-1 hover:bg-white/30"
              @click="handleSkipBack"
            >
              <UIcon
                name="i-lucide-skip-back"
                class="h-4 w-4 text-white"
              />
            </button>
            <button
              type="button"
              :aria-label="isPlaying ? 'Pause' : 'Play'"
              :aria-pressed="isPlaying"
              data-island-play-toggle
              class="rounded-full p-1 hover:bg-white/30"
              @click="handleTogglePlaying"
            >
              <UIcon
                :name="isPlaying ? 'i-lucide-pause' : 'i-lucide-play'"
                class="h-4 w-4 text-white"
              />
            </button>
            <button
              type="button"
              aria-label="Next track"
              class="rounded-full p-1 hover:bg-white/30"
              @click="handleSkipForward"
            >
              <UIcon
                name="i-lucide-skip-forward"
                class="h-4 w-4 text-white"
              />
            </button>
          </div>
        </motion.div>
      </motion.div>

      <div :class="ui.track({ class: uiProps.ui?.track })">
        <button
          v-for="item in VIEW_SWITCHES"
          :key="item.key"
          type="button"
          :aria-label="item.key"
          :aria-pressed="activeView === item.key"
          :class="ui.dot({ class: uiProps.ui?.dot })"
          @click="handleSwitch(item.key)"
        >
          <UIcon
            :name="item.icon"
            :class="ui.dotIcon({ class: uiProps.ui?.dotIcon })"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { dynamicIsland } from '../theme'

defineOptions({ inheritAttrs: false })

export type DynamicIslandView = 'idle' | 'ring' | 'timer' | 'notification' | 'music'

export interface DynamicIslandProps {
  /** Merged onto the outer 200px-high container. */
  class?: string
  /** Per-slot classes resolved against the component theme. */
  ui?: Record<string, any>
  /** Controlled view. Leave undefined to let the island drive itself. */
  view?: DynamicIslandView
  /** Change callback. `@view-change` and `v-model:view` both land here. */
  onViewChange?: (view: DynamicIslandView) => void
}

const props = withDefaults(defineProps<DynamicIslandProps>(), {
  class: undefined,
  ui: undefined,
  view: undefined,
  onViewChange: undefined,
})

const emit = defineEmits<{
  'update:view': [view: DynamicIslandView]
}>()

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'dynamicIsland',
  props,
  theme: dynamicIsland,
})

const BOUNCE_VARIANTS: Record<string, number> = {
  'idle': 0.5,
  'idle-ring': 0.5,
  'idle-timer': 0.3,
  'ring-idle': 0.5,
  'ring-timer': 0.35,
  'timer-idle': 0.3,
  'timer-ring': 0.35,
}

const DEFAULT_BOUNCE = 0.5
const TIMER_INTERVAL_MS = 1000
const TIMER_SECONDS = 60
const PILL_RADIUS = 32

const VIEW_SWITCHES: { key: DynamicIslandView, icon: string }[] = [
  { key: 'idle', icon: 'i-lucide-cloud-lightning' },
  { key: 'ring', icon: 'i-lucide-phone' },
  { key: 'timer', icon: 'i-lucide-timer' },
  { key: 'notification', icon: 'i-lucide-bell' },
  { key: 'music', icon: 'i-lucide-music-2' },
]

const shouldReduceMotion = useReducedMotion()

const internalView = ref<DynamicIslandView>('idle')
const variantKey = ref<string>('idle')

const activeView = computed<DynamicIslandView>(
  () => props.view ?? internalView.value,
)

const bounce = computed(
  () => BOUNCE_VARIANTS[variantKey.value] ?? DEFAULT_BOUNCE,
)

const pillTransition = computed(() =>
  shouldReduceMotion.value
    ? { duration: 0 }
    : { bounce: bounce.value, duration: 0.25, type: 'spring' as const },
)

const contentInitial = computed(() => ({
  filter: 'blur(5px)',
  opacity: 0,
  originX: 0.5,
  originY: 0.5,
  scale: 0.9,
}))

const contentAnimate = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 1, scale: 1 }
    : {
        filter: 'blur(0px)',
        opacity: 1,
        originX: 0.5,
        originY: 0.5,
        scale: 1,
        transition: { delay: 0.05 },
      },
)

const contentTransition = computed(() => ({
  bounce: bounce.value,
  type: 'spring' as const,
}))

/* ------------------------------------------------------------------ idle --- */

const showTemperature = ref(false)

function handleIdleEnter() {
  showTemperature.value = true
}

function handleIdleLeave() {
  showTemperature.value = false
}

/* ----------------------------------------------------------------- music --- */

const isPlaying = ref(true)

function handleTogglePlaying() {
  isPlaying.value = !isPlaying.value
}

function handleSkipBack() {
  isPlaying.value = false
}

function handleSkipForward() {
  isPlaying.value = true
}

/* ----------------------------------------------------------------- timer --- */
//
// The reference builds its `setInterval` inside a `useMemo`, whose factory
// result React discards without ever running the effect body, so the countdown
// is frozen at 60 and the progress track never moves. The port runs both loops
// from the view watcher instead: a module-scope `setInterval` (TIMER_INTERVAL_MS)
// drives the integer label, and a self-rescheduling rAF writes the track width
// straight to the DOM. Both are torn down in `onBeforeUnmount` and whenever the
// island leaves the timer view.

const remainingSeconds = ref(TIMER_SECONDS)
const rootEl = ref<HTMLElement>()
let progressEl: HTMLElement | undefined
let countdownInterval: ReturnType<typeof setInterval> | undefined
let progressFrame = 0
let startedAt = 0

// The track lives inside the `timer` slot fallback, so it is not guaranteed to
// exist at the instant the view flips. It is resolved lazily on the first rAF
// tick — by then Vue has patched the keyed subtree — and re-resolved if the
// element is ever swapped out.
function resolveProgressEl(): HTMLElement | undefined {
  progressEl ??= rootEl.value?.querySelector<HTMLElement>('[data-island-progress]') ?? undefined
  return progressEl
}

function paintProgress() {
  const elapsed = (performance.now() - startedAt) / 1000
  const remaining = Math.max(0, TIMER_SECONDS - elapsed)
  const track = resolveProgressEl()

  if (track) {
    track.style.width = `${(remaining / TIMER_SECONDS) * 100}%`
  }

  if (remaining <= 0) {
    progressFrame = 0
    return
  }

  progressFrame = requestAnimationFrame(paintProgress)
}

function stopCountdown() {
  if (countdownInterval !== undefined) {
    clearInterval(countdownInterval)
    countdownInterval = undefined
  }

  if (progressFrame) {
    cancelAnimationFrame(progressFrame)
    progressFrame = 0
  }

  progressEl = undefined
}

function startCountdown() {
  stopCountdown()

  remainingSeconds.value = TIMER_SECONDS
  startedAt = performance.now()

  countdownInterval = setInterval(() => {
    const elapsed = (performance.now() - startedAt) / 1000
    remainingSeconds.value = Math.max(
      0,
      Math.ceil(TIMER_SECONDS - elapsed),
    )
  }, TIMER_INTERVAL_MS)

  progressFrame = requestAnimationFrame(paintProgress)
}

/* ----------------------------------------------------------------- views --- */

function handleViewChange(next: DynamicIslandView) {
  if (activeView.value === next) {
    return
  }

  variantKey.value = `${activeView.value}-${next}`
  internalView.value = next
  props.onViewChange?.(next)
  emit('update:view', next)
}

function handleSwitch(next: DynamicIslandView) {
  // The `if (view !== key)` guard lives here rather than on the binding so the
  // listener stays a stable function reference across renders.
  if (activeView.value === next) {
    return
  }

  handleViewChange(next)
}

watch(activeView, (next) => {
  // Mirrors the React `key={view}` remount: every view owns fresh state.
  showTemperature.value = false
  isPlaying.value = true

  if (next === 'timer') {
    startCountdown()
  }
  else {
    stopCountdown()
    remainingSeconds.value = TIMER_SECONDS
  }
})

onBeforeUnmount(stopCountdown)
</script>
