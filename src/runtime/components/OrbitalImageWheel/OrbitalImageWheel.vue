<template>
  <div
    :aria-label="props.label"
    class="relative mx-auto touch-none select-none"
    :class="props.class"
    :style="{ height: `${diameter}px`, width: `${diameter}px` }"
    role="application"
    @click="handleRootClick"
    @focusin="handleFocus"
    @focusout="handleBlur"
    @keydown="handleKeyDown"
    @pointerdown="handlePointerDown"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
  >
    <button
      v-for="entry in placedItems"
      :key="entry.id"
      :aria-current="entry.isActive ? 'true' : undefined"
      :aria-label="entry.label ?? entry.alt"
      class="absolute top-1/2 left-1/2 flex items-center justify-center overflow-hidden rounded-full border-2 border-transparent shadow-md transition-[border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      :class="entry.isActive ? 'border-primary shadow-lg' : undefined"
      :data-orbital-position="entry.position"
      :style="{
        height: `${ITEM_SIZE}px`,
        width: `${ITEM_SIZE}px`,
        transform: entry.transform,
        zIndex: entry.zIndex,
      }"
      type="button"
    >
      <img
        :alt="entry.alt"
        class="h-full w-full object-cover"
        :draggable="false"
        :src="entry.image"
      >
    </button>

    <span
      aria-live="polite"
      class="sr-only"
    >{{ liveMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { useReducedMotion } from 'motion-v'
import { useHoverCapable } from '../../composables/useHoverCapable'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  DEFAULT_AUTO_ROTATE_SPEED,
  DEFAULT_RADIUS,
  DRAG_MOVE_THRESHOLD,
  easeInOutCubic,
  ITEM_SIZE,
  MOMENTUM_EPSILON,
  MOMENTUM_FRICTION,
  normalizeAngle,
  ROTATE_SENSITIVITY,
  roundPx,
  shortestDelta,
  SNAP_DURATION,
  STEP_DURATION,
  VELOCITY_SMOOTHING,
} from './constants'

export interface OrbitalImageWheelItem {
  /** Alternative text for the thumbnail image. */
  alt: string
  id: string
  /** Thumbnail image source. */
  image: string
  /** Accessible name for the item's button. Falls back to `alt`. */
  label?: string
}

export interface OrbitalImageWheelProps {
  /** Forces a specific item to be highlighted, overriding top-of-circle detection. */
  activeId?: string
  autoRotate?: boolean
  /** Degrees per second while auto-rotating. */
  autoRotateSpeed?: number
  class?: string
  /** Accessible name for the wheel itself. */
  label?: string
  /** Tilts each thumbnail to face outward from the center, like a ferris wheel gondola. */
  faceOutward?: boolean
  items: OrbitalImageWheelItem[]
  /** Circle radius in px. */
  radius?: number
  /** Controlled rotation in degrees. Omit to let the wheel own its rotation. */
  rotation?: number
  /** Snap to the nearest item when a drag or momentum settles. */
  snap?: boolean
}

const props = withDefaults(defineProps<OrbitalImageWheelProps>(), {
  autoRotate: false,
  autoRotateSpeed: DEFAULT_AUTO_ROTATE_SPEED,
  faceOutward: false,
  label: 'Orbital image wheel',
  radius: DEFAULT_RADIUS,
  snap: false,
})

const emit = defineEmits<{
  /** Fired with the normalized rotation in degrees after every change. */
  rotationChange: [rotation: number]
}>()

const shouldReduceMotion = useReducedMotion()
const isControlled = computed(() => props.rotation !== undefined)
const internalRotation = ref(0)
const currentRotation = computed(() => props.rotation ?? internalRotation.value)

// Everything below the two frames of state above is deliberately plain `let`
// rather than `ref`: the wheel writes rotation 60+ times per second and only
// the value that reaches the DOM needs to be reactive.
let rotationRef = currentRotation.value
let velocityRef = 0
let snapFrame: number | null = null
let autoRotateFrame: number | null = null
let drag: { lastTime: number, lastX: number, moved: boolean, pointerId: number } | null = null
let justDragged = false
let pointerDownPosition: number | null = null
const pauseReasons = { focus: false, hidden: false, hover: false }

const isHoverDevice = useHoverCapable()
const isPaused = ref(false)

const itemAngle = computed(() =>
  props.items.length > 0 ? 360 / props.items.length : 0,
)

function commitRotation(next: number) {
  const normalized = normalizeAngle(next)
  if (!isControlled.value) {
    internalRotation.value = normalized
  }
  emit('rotationChange', normalized)
}

function cancelSnapFrame() {
  if (snapFrame !== null) {
    cancelAnimationFrame(snapFrame)
    snapFrame = null
  }
}

function nearestItemAngleTo(value: number): number {
  if (itemAngle.value === 0) {
    return value
  }
  return Math.round(value / itemAngle.value) * itemAngle.value
}

function snapTo(target: number, duration: number = SNAP_DURATION) {
  cancelSnapFrame()
  if (shouldReduceMotion.value) {
    rotationRef = normalizeAngle(target)
    commitRotation(rotationRef)
    return
  }
  const from = rotationRef
  const delta = shortestDelta(from, target)
  const start = performance.now()
  const tick = (time: number) => {
    const progress = duration <= 0 ? 1 : Math.min((time - start) / duration, 1)
    rotationRef = normalizeAngle(from + delta * easeInOutCubic(progress))
    commitRotation(rotationRef)
    snapFrame = progress < 1 ? requestAnimationFrame(tick) : null
  }
  snapFrame = requestAnimationFrame(tick)
}

function startMomentum() {
  cancelSnapFrame()
  let last = performance.now()
  const tick = (time: number) => {
    const dt = time - last
    last = time
    rotationRef = normalizeAngle(rotationRef + velocityRef * dt)
    velocityRef *= MOMENTUM_FRICTION ** (dt / 16)
    commitRotation(rotationRef)
    if (Math.abs(velocityRef) < MOMENTUM_EPSILON) {
      // Zeroed rather than left decayed: every later gesture reads this slot as
      // its starting velocity, and a click on the wheel starts a momentum run
      // of its own. Keeping the decayed residue meant the next click replayed
      // the full fling of whichever drag happened last.
      velocityRef = 0
      if (props.snap) {
        snapTo(nearestItemAngleTo(rotationRef))
      }
      snapFrame = null
      return
    }
    snapFrame = requestAnimationFrame(tick)
  }
  snapFrame = requestAnimationFrame(tick)
}

function recomputePause() {
  isPaused.value = pauseReasons.focus || pauseReasons.hidden || pauseReasons.hover
}

function stopAutoRotate() {
  if (autoRotateFrame !== null) {
    cancelAnimationFrame(autoRotateFrame)
    autoRotateFrame = null
  }
}

function startAutoRotate() {
  stopAutoRotate()
  if (
    shouldReduceMotion.value
    || !props.autoRotate
    || isPaused.value
    || props.items.length === 0
  ) {
    return
  }
  let last = performance.now()
  const tick = (time: number) => {
    const dt = time - last
    last = time
    rotationRef = normalizeAngle(rotationRef + (props.autoRotateSpeed * dt) / 1000)
    commitRotation(rotationRef)
    autoRotateFrame = requestAnimationFrame(tick)
  }
  autoRotateFrame = requestAnimationFrame(tick)
}

function handlePointerEnter() {
  // Attached unconditionally but ignored on touch, where `pointerenter` can
  // fire without a matching `pointerleave` and would otherwise pause forever.
  if (!isHoverDevice.value) {
    return
  }
  pauseReasons.hover = true
  recomputePause()
}

function handlePointerLeave() {
  if (!isHoverDevice.value) {
    return
  }
  pauseReasons.hover = false
  recomputePause()
}

// `focusin`/`focusout` rather than `focus`/`blur`: the pause is meant to react
// to a thumbnail being focused, and the native focus/blur pair does not
// bubble. Focus moving between two tiles inside the wheel keeps `focus` set.
function handleFocus() {
  pauseReasons.focus = true
  recomputePause()
}

function handleBlur(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (next && (event.currentTarget as HTMLElement).contains(next)) {
    return
  }
  pauseReasons.focus = false
  recomputePause()
}

function handlePointerDown(event: PointerEvent) {
  cancelSnapFrame()
  drag = {
    lastTime: performance.now(),
    lastX: event.clientX,
    moved: false,
    pointerId: event.pointerId,
  }
  // Cleared here, not just after the swallowed click: leaving it set until the
  // next item activation meant the first deliberate click after any drag was
  // eaten too.
  justDragged = false
  pointerDownPosition = tilePositionFrom(event.target)
  const target = event.currentTarget as HTMLElement
  target.setPointerCapture(event.pointerId)
}

function handlePointerMove(event: PointerEvent) {
  if (!drag) {
    return
  }
  const now = performance.now()
  const dx = event.clientX - drag.lastX
  if (Math.abs(dx) > DRAG_MOVE_THRESHOLD) {
    drag.moved = true
  }
  const dt = Math.max(now - drag.lastTime, 1)
  const delta = dx * ROTATE_SENSITIVITY
  velocityRef
    = velocityRef * (1 - VELOCITY_SMOOTHING)
      + (delta / dt) * VELOCITY_SMOOTHING
  rotationRef = normalizeAngle(rotationRef + delta)
  commitRotation(rotationRef)
  drag.lastX = event.clientX
  drag.lastTime = now
}

function handlePointerUp(event: PointerEvent) {
  const active = drag
  drag = null
  if (!active) {
    return
  }
  const target = event.currentTarget as HTMLElement
  // `releasePointerCapture` throws if the capture was already dropped (for
  // example by a `pointercancel`), so check before releasing.
  if (target.hasPointerCapture(active.pointerId)) {
    target.releasePointerCapture(active.pointerId)
  }
  justDragged = active.moved
  if (shouldReduceMotion.value) {
    velocityRef = 0
    if (props.snap) {
      snapTo(nearestItemAngleTo(rotationRef))
    }
    return
  }
  startMomentum()
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    snapTo(
      rotationRef - itemAngle.value,
      shouldReduceMotion.value ? 0 : STEP_DURATION,
    )
  }
  else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    snapTo(
      rotationRef + itemAngle.value,
      shouldReduceMotion.value ? 0 : STEP_DURATION,
    )
  }
}

function handleItemActivate(position: number) {
  // A drag ends on the pointer that started it, so the browser also fires a
  // click. Swallow that one or the wheel would snap back to where it started.
  if (justDragged) {
    justDragged = false
    return
  }
  snapTo(-(position * itemAngle.value))
}

/**
 * Resolves which tile a click landed on.
 *
 * The handler lives on the root rather than on each button because
 * `handlePointerDown` captures the pointer on the root so a drag survives
 * leaving the wheel, and while a capture is active Chrome retargets both the
 * `pointerup` and the resulting `click` to the capture element. A retargeted
 * click's `target` is the root itself, so the tile is resolved from the tile
 * recorded at `pointerdown` instead. That fallback is still needed even after
 * the capture is released on `pointerup`, because Chrome fires the click
 * against the capture target.
 *
 * A keyboard activation (Enter/Space on a focused tile) fires no pointerdown and
 * is not retargeted, so the event target is checked first.
 */
function tilePositionFrom(node: EventTarget | null): number | null {
  const tile = node instanceof Element
    ? node.closest<HTMLElement>('[data-orbital-position]')
    : null
  const raw = tile?.dataset.orbitalPosition
  if (raw === undefined) {
    return null
  }
  const position = Number(raw)
  return Number.isFinite(position) ? position : null
}

function handleRootClick(event: MouseEvent) {
  const position = tilePositionFrom(event.target) ?? pointerDownPosition
  pointerDownPosition = null
  if (position === null) {
    return
  }
  handleItemActivate(position)
}

const nearestTopId = computed<string | undefined>(() => {
  if (props.items.length === 0) {
    return undefined
  }
  let bestId = props.items[0].id
  let bestDistance = Number.POSITIVE_INFINITY
  for (const [position, item] of props.items.entries()) {
    const angle = normalizeAngle(position * itemAngle.value + currentRotation.value)
    const distance = Math.abs(shortestDelta(angle, 0))
    if (distance < bestDistance) {
      bestDistance = distance
      bestId = item.id
    }
  }
  return bestId
})

const highlightedId = computed(() => props.activeId ?? nearestTopId.value)

const placedItems = computed(() =>
  props.items.map((item, position) => {
    const angle = normalizeAngle(position * itemAngle.value + currentRotation.value)
    const angleRad = (angle * Math.PI) / 180
    // Node and Chrome disagree on the last bit of `Math.sin`, which serialises
    // to a different `translate()` string on the server than in the browser and
    // fails hydration. Rounded far below sub-pixel precision, both agree and
    // nothing visibly moves.
    const x = roundPx(props.radius * Math.sin(angleRad))
    const y = roundPx(-props.radius * Math.cos(angleRad))
    const transform
      = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${props.faceOutward ? angle : 0}deg)`
    return {
      alt: item.alt,
      id: item.id,
      image: item.image,
      isActive: highlightedId.value === item.id,
      label: item.label,
      position,
      transform,
      // `y` alone runs negative for the tiles near the top of the ring, and the
      // wheel root is `position: relative` with `z-index: auto` — so it is not a
      // stacking context and a negative child paints behind its own parent
      // background. Those tiles stopped taking clicks. Shifting by the radius
      // keeps the near-side-over-far-side ordering and stays non-negative.
      zIndex: Math.round(y + props.radius),
    }
  }),
)

const highlightedItem = computed(() =>
  props.items.find(item => item.id === highlightedId.value),
)
const liveMessage = computed(() =>
  highlightedItem.value
    ? `${highlightedItem.value.label ?? highlightedItem.value.alt} selected`
    : '',
)
const diameter = computed(() => props.radius * 2 + ITEM_SIZE)

// Upstream re-syncs its rotation ref on every render so an externally driven
// `rotation` prop wins over in-flight gesture math; `flush: 'sync'` keeps that
// ordering identical.
watch(currentRotation, (value) => {
  rotationRef = value
}, { flush: 'sync' })

const handleVisibilityChange = () => {
  pauseReasons.hidden = document.hidden
  recomputePause()
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange)
  startAutoRotate()
})

// Restarts the loop from a clean clock on any of the upstream effect deps.
watch(
  [
    () => props.autoRotate,
    () => props.autoRotateSpeed,
    isPaused,
    () => props.items.length,
    shouldReduceMotion,
  ],
  startAutoRotate,
  { flush: 'post' },
)

onBeforeUnmount(() => {
  cancelSnapFrame()
  stopAutoRotate()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style scoped>
/* A live region is never interactive, and as an absolutely positioned sibling
   it would otherwise sit in the hit-test path at the wheel's corner. */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
  pointer-events: none;
}
</style>
