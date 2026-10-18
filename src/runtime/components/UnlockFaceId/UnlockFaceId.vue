<template>
  <div
    class="flex w-full flex-col items-center gap-4"
    :class="props.class"
  >
    <button
      :aria-busy="isBusy"
      :aria-describedby="statusMessageId"
      :aria-label="props.label"
      class="relative flex shrink-0 cursor-pointer items-center justify-center rounded-3xl text-highlighted outline-none transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-default active:scale-95 disabled:cursor-default disabled:active:scale-100 motion-reduce:transition-none motion-reduce:active:scale-100"
      :disabled="isBusy || isUnlocked"
      :style="{ height: `${props.size}px`, width: `${props.size}px` }"
      type="button"
      data-unlock-trigger
      @click="handleTriggerClick"
    >
      <motion.svg
        :animate="{ x: isShaking ? SHAKE_KEYFRAMES : 0 }"
        aria-hidden="true"
        class="h-full w-full overflow-visible"
        :style="SVG_TRANSFORM_ORIGIN"
        :transition="canAnimate
          ? { duration: SHAKE_DURATION, ease: EASE_IN_OUT }
          : INSTANT"
        :viewBox="`0 0 ${VIEWBOX} ${VIEWBOX}`"
        data-unlock-svg
      >
        <defs>
          <clipPath :id="clipId">
            <rect
              :height="SCAN_CLIP.height"
              :rx="SCAN_CLIP.rx"
              :width="SCAN_CLIP.width"
              :x="SCAN_CLIP.x"
              :y="SCAN_CLIP.y"
            />
          </clipPath>
          <linearGradient
            :id="gradientId"
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              :stop-color="BRAND_STROKE"
              stop-opacity="0"
            />
            <stop
              offset="100%"
              :stop-color="BRAND_STROKE"
              stop-opacity="0.45"
            />
          </linearGradient>
        </defs>

        <!--
          `mode="wait"` so the check cannot overlap the face: both glyphs draw
          on entry, and the face's exit has to finish before the check starts or
          the two outlines cross in the middle of the frame.
        -->
        <AnimatePresence mode="wait">
          <UnlockFaceIdCheckGlyph
            v-if="isUnlocked"
            key="check"
            :can-animate="canAnimate"
          />
          <UnlockFaceIdFaceGlyph
            v-else
            key="face"
            :can-animate="canAnimate"
            :clip-id="clipId"
            :gradient-id="gradientId"
            :is-scanning="isBusy"
            :stroke="STROKE_BY_STATUS[status]"
          />
        </AnimatePresence>
      </motion.svg>
    </button>

    <p
      :id="statusMessageId"
      aria-live="polite"
      class="text-center font-medium text-sm transition-colors duration-200"
      :class="statusClass"
      role="status"
      data-unlock-status
    >
      {{ statusMessage }}
    </p>

    <Motion
      v-if="slots.default"
      :animate="contentMotion"
      class="w-full"
      :class="isUnlocked ? '' : 'pointer-events-none'"
      :initial="false"
      :transition="canAnimate
        ? { duration: CONTENT_REVEAL, ease: EASE_OUT }
        : INSTANT"
      data-unlock-content
    >
      <slot />
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { AnimatePresence, Motion, motion, useReducedMotion } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import UnlockFaceIdCheckGlyph from './UnlockFaceIdCheckGlyph.vue'
import UnlockFaceIdFaceGlyph from './UnlockFaceIdFaceGlyph.vue'
import type { UnlockStatus } from './constants'
import {
  BRAND_STROKE,
  CONTENT_REVEAL,
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_LABEL,
  DEFAULT_SCAN_DURATION,
  DEFAULT_SIZE,
  EASE_IN_OUT,
  EASE_OUT,
  INSTANT,
  SCAN_CLIP,
  SHAKE_DURATION,
  SHAKE_KEYFRAMES,
  STATUS_MESSAGES,
  STROKE_BY_STATUS,
  VIEWBOX,
} from './constants'

/**
 * An Apple Face ID mark that runs its own scan.
 *
 * Uncontrolled by default: activating the glyph starts a timed scan and resolves
 * to `success`. Pass `status` to drive it yourself and the component stops
 * touching its own state entirely.
 *
 * The `defineProps` interface is inline on purpose. The dev server resolves a
 * component's props through the browser-side `compileScript` path, which cannot
 * follow a filesystem import — an imported prop type silently breaks the
 * browser build.
 */
export interface UnlockFaceIdProps {
  /** Content gated behind the scan — blurred while locked, sharp once unlocked. */
  class?: string
  /** Message shown when the status is `error`. */
  errorMessage?: string
  /** Accessible name for the scan trigger. */
  label?: string
  /** Controlled status. Omit for uncontrolled behaviour. */
  status?: UnlockStatus
  /** How long an uncontrolled scan takes, in ms. */
  scanDuration?: number
  /** Rendered size of the glyph, in px. */
  size?: number
}

const props = withDefaults(defineProps<UnlockFaceIdProps>(), {
  errorMessage: DEFAULT_ERROR_MESSAGE,
  label: DEFAULT_LABEL,
  scanDuration: DEFAULT_SCAN_DURATION,
  size: DEFAULT_SIZE,
})

const emit = defineEmits<{
  /** Fired when an uncontrolled scan resolves successfully. */
  complete: []
  /** Fired whenever the trigger is activated. */
  scan: []
}>()

const slots = defineSlots<{ default?: () => unknown }>()

const shouldReduceMotion = useReducedMotion()
const mounted = ref(false)

/**
 * Held true through SSR *and* the first client render, then flipped in
 * `onMounted`.
 *
 * `useReducedMotion()` is always `false` on the server, so deriving the render
 * from it directly makes a reduced-motion client disagree with the SSR output:
 * every path gets a different `initial` (`stroke-dasharray="0 1"` versus
 * `"1 1"`), the glyph `motion.g` gets a different transform, and the scan band
 * exists in one pass and not the other. Hydration tears the subtree down to fix
 * that, and the re-mount then trips motion-v's
 * `invariant(Boolean(element), 'Animation state must be mounted with valid Element')`,
 * which fails the whole page.
 *
 * One tick later the user still gets the static treatment, with no mismatch.
 */
const canAnimate = computed(() => !mounted.value || !shouldReduceMotion.value)

onMounted(() => {
  mounted.value = true
})

const isControlled = computed(() => props.status !== undefined)
const internalStatus = ref<UnlockStatus>('idle')
const status = computed<UnlockStatus>(() => props.status ?? internalStatus.value)

const isBusy = computed(() => status.value === 'scanning')
const isUnlocked = computed(() => status.value === 'success')
const isShaking = computed(() => status.value === 'error' && canAnimate.value)

const statusMessage = computed(() => status.value === 'error'
  ? props.errorMessage
  : STATUS_MESSAGES[status.value])

const statusClass = computed(() => {
  if (status.value === 'error') return 'text-error'
  if (status.value === 'success') return 'text-success'
  return 'text-dimmed'
})

const contentMotion = computed(() => isUnlocked.value
  ? { filter: 'blur(0px)', opacity: 1 }
  : { filter: 'blur(9px)', opacity: 0.5 })

const SVG_TRANSFORM_ORIGIN = { transformBox: 'view-box' }

/**
 * Per-instance ids. The gradient and clipPath ids have to be unique, or a
 * second glyph on the page would clip and tint against the first one's defs.
 */
const uid = useId().replace(/:/g, '')
const statusMessageId = `unlock-face-id-status-${uid}`
const clipId = `unlock-face-id-clip-${uid}`
const gradientId = `unlock-face-id-gradient-${uid}`

/**
 * The scan timer is cleared when `scanDuration` changes mid-scan rather than
 * left to fire against the old duration — otherwise shortening the duration
 * while a scan is running does nothing at all.
 */
let timeout: ReturnType<typeof setTimeout> | undefined

watch(() => props.scanDuration, () => {
  if (!isBusy.value) return
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(resolveScan, props.scanDuration)
})

onBeforeUnmount(() => {
  if (timeout) clearTimeout(timeout)
})

function resolveScan() {
  timeout = undefined
  if (isControlled.value) return
  internalStatus.value = 'success'
  emit('complete')
}

function beginScan() {
  emit('scan')
  if (isControlled.value) return
  internalStatus.value = 'scanning'
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(resolveScan, props.scanDuration)
}

function handleTriggerClick() {
  // A failed read is dismissed by activating the glyph again, rather than by
  // resetting itself on a timer — a read that never succeeds would otherwise
  // leave the error message up with no way to try again.
  if (status.value === 'error') {
    emit('scan')
    if (!isControlled.value) internalStatus.value = 'idle'
    return
  }
  if (status.value === 'idle') beginScan()
}
</script>
