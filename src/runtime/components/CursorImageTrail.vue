<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useHoverCapable } from '../composables/useHoverCapable'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import cursorImageTrail from '../theme/cursor-image-trail'

export interface CursorTrailImage {
  /** Image source URL. */
  src: string
  /** Alternative text, kept for parity with the source image. */
  alt: string
}

export interface CursorImageTrailProps {
  /** Images cycled through as the pointer travels. */
  images: CursorTrailImage[]
  /** Extra classes for the tracking surface. */
  class?: string
  /** Pointer travel, in pixels, between two spawned images. */
  distance?: number
  /** Width and height of each trailing image, in pixels. */
  imageSize?: number
  /** Base lifetime of a spawned image, in milliseconds. */
  lifetime?: number
  /** How many images can be on screen at once. */
  poolSize?: number
  /** Maximum random rotation applied to a spawned image, in degrees. */
  rotate?: number
  /** How strongly pointer speed scales the image size. */
  velocityScale?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<CursorImageTrailProps>(), {
  class: undefined,
  distance: 90,
  imageSize: 96,
  lifetime: 700,
  poolSize: 12,
  rotate: 12,
  velocityScale: 0.5,
  ui: undefined,
})

const ENTER_RATIO = 0.25
const EXIT_RATIO = 0.35
const MAX_FRAME_DELTA_MS = 50

interface TrailSlot {
  active: boolean
  duration: number
  rotation: number
  scale: number
  startTime: number
  x: number
  y: number
}

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'cursorImageTrail',
  props,
  theme: cursorImageTrail,
})

const hoverCapable = useHoverCapable()
const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const rootRef = ref<HTMLElement | null>(null)
const poolRef = ref<HTMLElement | null>(null)

const effectEnabled = computed(
  () => hoverCapable.value && !isReduced.value && props.images.length > 0,
)

let slots: TrailSlot[] = []
let elements: HTMLImageElement[] = []
let pointer: { x: number, y: number } | null = null
let isInside = false
let lastFrame: { t: number, x: number, y: number } | null = null
let lastSpawn: { x: number, y: number } | null = null
let nextSlot = 0
let nextImage = 0
let frameId: number | null = null

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const easeOutQuint = (t: number) => 1 - (1 - t) ** 5
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2

function resetSlots() {
  slots = Array.from({ length: props.poolSize }, () => ({
    active: false,
    duration: props.lifetime,
    rotation: 0,
    scale: 1,
    startTime: 0,
    x: 0,
    y: 0,
  }))
  nextSlot = 0
  nextImage = 0
  lastFrame = null
  lastSpawn = null
}

function spawn(x: number, y: number, velocity: number) {
  const slot = slots[nextSlot % slots.length]
  const image = props.images[nextImage % props.images.length]
  const element = elements[nextSlot % elements.length]

  nextSlot += 1
  nextImage += 1

  if (!(slot && image && element)) {
    return
  }

  element.src = image.src
  element.alt = image.alt

  const speedFactor = clamp(velocity * props.velocityScale, 0, 1)

  slot.active = true
  slot.duration = props.lifetime * (1 + speedFactor * 0.6)
  slot.rotation = (Math.random() * 2 - 1) * props.rotate
  slot.scale = 1 + speedFactor * 0.5
  slot.startTime = performance.now()
  slot.x = x
  slot.y = y
}

function tick(now: number) {
  if (pointer && isInside) {
    const { x, y } = pointer
    let velocity = 0

    if (lastFrame) {
      const delta = Math.min(now - lastFrame.t, MAX_FRAME_DELTA_MS)
      if (delta > 0) {
        velocity = Math.hypot(x - lastFrame.x, y - lastFrame.y) / delta
      }
    }
    lastFrame = { t: now, x, y }

    if (lastSpawn) {
      if (Math.hypot(x - lastSpawn.x, y - lastSpawn.y) >= props.distance) {
        spawn(x, y, velocity)
        lastSpawn = { x, y }
      }
    }
    else {
      lastSpawn = { x, y }
    }
  }

  for (let i = 0; i < slots.length; i += 1) {
    const slot = slots[i]
    const element = elements[i]

    if (!(slot?.active && element)) {
      continue
    }

    const progress = clamp((now - slot.startTime) / slot.duration, 0, 1)
    let opacity: number
    let scale: number

    if (progress <= ENTER_RATIO) {
      const eased = easeOutQuint(progress / ENTER_RATIO)
      opacity = eased
      scale = eased * slot.scale
    }
    else if (progress >= 1 - EXIT_RATIO) {
      const eased = easeInOutCubic((progress - (1 - EXIT_RATIO)) / EXIT_RATIO)
      opacity = 1 - eased
      scale = slot.scale * (1 - eased * 0.15)
    }
    else {
      opacity = 1
      scale = slot.scale
    }

    element.style.transform = `translate3d(${slot.x}px, ${slot.y}px, 0) translate(-50%, -50%) rotate(${slot.rotation}deg) scale(${scale})`
    element.style.opacity = String(opacity)

    if (progress >= 1) {
      slot.active = false
      element.style.opacity = '0'
    }
  }

  frameId = requestAnimationFrame(tick)
}

// The rect is read once per pointer move, so the animation loop never forces a
// layout pass.
function updatePointer(event: PointerEvent) {
  const root = rootRef.value
  if (!root) {
    return
  }

  const rect = root.getBoundingClientRect()
  pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
  isInside = true
}

function onPointerEnter(event: PointerEvent) {
  updatePointer(event)
  lastSpawn = null
  lastFrame = null
}

function onPointerLeave() {
  isInside = false
}

function stop() {
  const root = rootRef.value

  if (root) {
    root.removeEventListener('pointermove', updatePointer)
    root.removeEventListener('pointerenter', onPointerEnter)
    root.removeEventListener('pointerleave', onPointerLeave)
  }

  if (frameId !== null) {
    cancelAnimationFrame(frameId)
    frameId = null
  }

  pointer = null
  isInside = false
}

function start() {
  const root = rootRef.value
  const pool = poolRef.value

  if (!(root && pool)) {
    return
  }

  elements = Array.from(pool.querySelectorAll<HTMLImageElement>('[data-trail-slot]'))
  resetSlots()

  root.addEventListener('pointermove', updatePointer)
  root.addEventListener('pointerenter', onPointerEnter)
  root.addEventListener('pointerleave', onPointerLeave)
  frameId = requestAnimationFrame(tick)
}

onMounted(() => {
  if (effectEnabled.value) {
    start()
  }
})

onBeforeUnmount(stop)

watch([effectEnabled, () => props.poolSize, () => props.lifetime], async ([enabled]) => {
  stop()

  if (!enabled) {
    return
  }

  await nextTick()
  start()
})
</script>

<template>
  <div
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <slot />

    <div
      v-if="images.length > 0"
      ref="poolRef"
      aria-hidden="true"
      :class="ui.pool({ class: uiProps.ui?.pool })"
    >
      <img
        v-for="index in poolSize"
        :key="index"
        data-trail-slot
        :src="images[0]?.src"
        alt=""
        :draggable="false"
        :class="ui.image({ class: uiProps.ui?.image })"
        :style="{ height: `${imageSize}px`, width: `${imageSize}px` }"
      >
    </div>
  </div>
</template>
