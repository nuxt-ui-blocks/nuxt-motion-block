<template>
  <div
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import magneticField from '../theme/magnetic-field'

export type MagneticFieldMode = 'attract' | 'repel' | 'orbit'

export interface MagneticFieldProps {
  mode?: MagneticFieldMode
  /** Distance at which an element starts to feel the pointer, in pixels. */
  radius?: number
  /** Peak displacement as a fraction of the distance to the pointer. */
  strength?: number
  stiffness?: number
  damping?: number
  /** Turn each element toward the pointer, up to 18 degrees. */
  rotate?: boolean
  /** Stop the field without removing the listener wiring. */
  paused?: boolean
  class?: string
  ui?: Record<string, any>
}

/**
 * A field of elements that lean toward the pointer.
 *
 * Mark any descendant with `data-magnetic` and it participates; nothing else in
 * the subtree is touched. Each element gets its own spring, so a cursor moving
 * across a row leaves a wake instead of dragging the whole group.
 *
 * The loop stops once every element has settled, which matters on a page with
 * several fields: a permanent rAF loop is a permanent battery cost for an
 * effect that is only interesting while the pointer is moving.
 */
const props = withDefaults(defineProps<MagneticFieldProps>(), {
  mode: 'attract',
  radius: 160,
  strength: 0.35,
  stiffness: 180,
  damping: 18,
  rotate: false,
  paused: false,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'magneticField', props, theme: magneticField })

const SELECTOR = '[data-magnetic]'
const FALLOFF_POWER = 2
const MAX_ROTATE_DEG = 18
const MAX_DELTA_SECONDS = 0.05
const ORBIT_RADIAL_FACTOR = 0.2
const ORBIT_TANGENTIAL_FACTOR = 0.4
/** Below this, an element is at rest and its transform can be dropped. */
const REST_EPSILON = 0.01
const REST_SPEED = 0.5

interface Participant {
  centerX: number
  centerY: number
  rotate: number
  vx: number
  vr: number
  vy: number
  x: number
  y: number
}

const reducedMotion = useReducedMotion()
const rootRef = ref<HTMLElement | null>(null)
const pointerCapable = ref(false)

const participants = new Map<HTMLElement, Participant>()
let pointer: { x: number, y: number } | null = null
let raf: number | null = null
let lastFrame: number | null = null

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value))

const falloffAt = (distance: number): number => {
  if (distance >= props.radius) return 0
  return (1 - distance / props.radius) ** FALLOFF_POWER
}

const offsetFor = (dx: number, dy: number, distance: number, falloff: number): { x: number, y: number } => {
  if (distance === 0) return { x: 0, y: 0 }
  const directional = props.mode === 'repel' ? -Math.abs(props.strength) : props.strength

  if (props.mode === 'orbit') {
    // Radial pull plus a tangential shove: the element circles the pointer
    // instead of collapsing onto it.
    const tangentX = -dy / distance
    const tangentY = dx / distance
    const pull = directional * falloff * distance * ORBIT_TANGENTIAL_FACTOR
    return {
      x: dx * directional * falloff * ORBIT_RADIAL_FACTOR + tangentX * pull,
      y: dy * directional * falloff * ORBIT_RADIAL_FACTOR + tangentY * pull,
    }
  }

  return { x: dx * directional * falloff, y: dy * directional * falloff }
}

const isDisabled = computed(() => props.paused || reducedMotion.value === true || !pointerCapable.value)

const writeTransform = (element: HTMLElement, state: Participant): boolean => {
  if (
    Math.abs(state.x) < REST_EPSILON
    && Math.abs(state.y) < REST_EPSILON
    && Math.abs(state.rotate) < REST_EPSILON
    && Math.abs(state.vx) < REST_SPEED
    && Math.abs(state.vy) < REST_SPEED
    && Math.abs(state.vr) < REST_SPEED
  ) {
    state.x = 0
    state.y = 0
    state.rotate = 0
    if (element.style.transform !== '') element.style.transform = ''
    return false
  }

  element.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.rotate}deg)`
  return true
}

const resetAll = (): void => {
  for (const element of participants.keys()) {
    element.style.transform = ''
    element.style.willChange = ''
  }
  participants.clear()
}

const step = (time: number): void => {
  const last = lastFrame ?? time
  const dt = clamp((time - last) / 1000, 0, MAX_DELTA_SECONDS)
  lastFrame = time

  let moving = false

  for (const [element, state] of participants) {
    let targetX = 0
    let targetY = 0
    let targetRotate = 0

    if (pointer) {
      const dx = pointer.x - state.centerX
      const dy = pointer.y - state.centerY
      const distance = Math.hypot(dx, dy)
      const falloff = falloffAt(distance)
      if (falloff > 0) {
        const offset = offsetFor(dx, dy, distance, falloff)
        targetX = offset.x
        targetY = offset.y
        if (props.rotate) {
          targetRotate = clamp(
            ((Math.atan2(dy, dx) * 180) / Math.PI) * falloff,
            -MAX_ROTATE_DEG,
            MAX_ROTATE_DEG,
          )
        }
      }
    }

    state.vx += ((targetX - state.x) * props.stiffness - state.vx * props.damping) * dt
    state.vy += ((targetY - state.y) * props.stiffness - state.vy * props.damping) * dt
    state.vr += ((targetRotate - state.rotate) * props.stiffness - state.vr * props.damping) * dt

    state.x += state.vx * dt
    state.y += state.vy * dt
    state.rotate += state.vr * dt

    if (writeTransform(element, state)) moving = true
  }

  if (!pointer && !moving) {
    raf = null
    lastFrame = null
    return
  }

  raf = requestAnimationFrame(step)
}

const start = (): void => {
  if (raf !== null || isDisabled.value) return
  lastFrame = null
  raf = requestAnimationFrame(step)
}

/**
 * Rest positions are measured with the transforms cleared: a transformed
 * element reports a shifted rect, and measuring through the offset would move
 * its own target a little further away on every sync.
 */
const measure = (): void => {
  const root = rootRef.value
  if (!root) return

  const elements = Array.from(participants.keys())
  const previous = elements.map(element => element.style.transform)

  for (const element of elements) element.style.transform = ''

  const rootRect = root.getBoundingClientRect()
  elements.forEach((element, index) => {
    const state = participants.get(element)
    if (!state) return
    const rect = element.getBoundingClientRect()
    state.centerX = rect.left + rect.width / 2 - rootRect.left
    state.centerY = rect.top + rect.height / 2 - rootRect.top
    element.style.transform = previous[index] ?? ''
  })
}

/** Adds and drops participants after the subtree changes shape. */
const sync = (): void => {
  const root = rootRef.value
  if (!root) return

  const found = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR))

  for (const element of Array.from(participants.keys())) {
    if (found.includes(element)) continue
    element.style.transform = ''
    element.style.willChange = ''
    participants.delete(element)
    resizeObserver?.unobserve(element)
  }

  for (const element of found) {
    if (participants.has(element)) continue
    element.style.willChange = 'transform'
    participants.set(element, { centerX: 0, centerY: 0, rotate: 0, vr: 0, vx: 0, vy: 0, x: 0, y: 0 })
    resizeObserver?.observe(element)
  }

  measure()
}

const onPointerMove = (event: PointerEvent): void => {
  if (event.pointerType === 'touch') return
  const root = rootRef.value
  if (!root) return
  const rect = root.getBoundingClientRect()
  pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
  start()
}

const onPointerLeave = (): void => {
  pointer = null
  start()
}

let resizeObserver: ResizeObserver | undefined
let mutationObserver: MutationObserver | undefined

const stopLoop = (): void => {
  if (raf !== null) cancelAnimationFrame(raf)
  raf = null
  lastFrame = null
}

const settle = (): void => {
  stopLoop()
  pointer = null
  for (const element of participants.keys()) element.style.transform = ''
}

watch(isDisabled, (disabled) => {
  if (disabled) settle()
})

let mediaQuery: MediaQueryList | undefined

const onMediaChange = (event: MediaQueryListEvent): void => {
  pointerCapable.value = event.matches
}

onMounted(() => {
  mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  pointerCapable.value = mediaQuery.matches
  mediaQuery.addEventListener('change', onMediaChange)

  const root = rootRef.value
  if (!root) return

  resizeObserver = new ResizeObserver(() => measure())
  resizeObserver.observe(root)

  sync()

  mutationObserver = new MutationObserver(sync)
  mutationObserver.observe(root, { childList: true, subtree: true })

  root.addEventListener('pointermove', onPointerMove, { passive: true })
  root.addEventListener('pointerleave', onPointerLeave, { passive: true })
})

onBeforeUnmount(() => {
  stopLoop()
  mediaQuery?.removeEventListener('change', onMediaChange)
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
  rootRef.value?.removeEventListener('pointermove', onPointerMove)
  rootRef.value?.removeEventListener('pointerleave', onPointerLeave)
  resetAll()
})
</script>
