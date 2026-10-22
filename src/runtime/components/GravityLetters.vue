<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'

export type GravityLettersTrigger = 'click' | 'hover' | 'inView' | 'manual'

export interface GravityLettersProps {
  /** Restitution after the letter hits the floor. `0` stops dead, `1` never loses energy. */
  bounce?: number
  /** Extra classes for the container. */
  class?: string
  /** Drop the letters. Use with `update:collapsed` to drive the fall from outside. */
  collapsed?: boolean
  /** Share of horizontal velocity kept after a bounce. */
  friction?: number
  /** Downward acceleration in pixels per second squared. */
  gravity?: number
  /** Horizontal launch speed, in pixels per second, randomised per letter. */
  spread?: number
  /** Milliseconds between two letters being released. */
  stagger?: number
  /** The text to break apart. Split into one animated letter per character. */
  text: string
  /** What makes the letters fall. */
  trigger?: GravityLettersTrigger
}

const props = withDefaults(defineProps<GravityLettersProps>(), {
  bounce: 0.35,
  collapsed: undefined,
  friction: 0.4,
  gravity: 1200,
  spread: 140,
  stagger: 40,
  trigger: 'hover',
})

const emit = defineEmits<{
  'update:collapsed': [collapsed: boolean]
}>()

interface LetterOrigin {
  height: number
  width: number
  x: number
  y: number
}

interface LetterPhysics {
  angle: number
  angularVel: number
  dx: number
  dy: number
  releaseAt: number
  settled: boolean
  vx: number
  vy: number
}

type Phase = 'falling' | 'idle' | 'reforming' | 'settled'

const MAX_DT_SECONDS = 0.05
const REST_VELOCITY = 20
const REST_HORIZONTAL_VELOCITY = 5
const SPRING_STIFFNESS = 180
const SPRING_DAMPING = 18
const REFORM_EPSILON_POSITION = 0.5
const REFORM_EPSILON_ANGLE = 0.5
const REFORM_EPSILON_VELOCITY = 5
const IN_VIEW_THRESHOLD = 0.4

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const letters = computed(() => Array.from(props.text))

const isControlled = computed(() => props.collapsed !== undefined)
const internalCollapsed = ref(false)
const collapsed = computed(() => isControlled.value ? Boolean(props.collapsed) : internalCollapsed.value)

/**
 * The conventional controlled pattern: write internally only when the parent
 * did not pass `collapsed`, always announce the change. `defineModel` would do
 * the same in less code, but the library keeps one shape for every controlled
 * component so a reader can move between pages without relearning it.
 */
function setCollapsed(next: boolean) {
  if (!isControlled.value) {
    internalCollapsed.value = next
  }

  emit('update:collapsed', next)
}

const containerRef = ref<HTMLElement | null>(null)
const measureRefs: (HTMLElement | null)[] = []
const letterRefs: (HTMLElement | null)[] = []
let origins: LetterOrigin[] = []
let physics: LetterPhysics[] = []
let phase: Phase = 'idle'
let frame: number | null = null
let lastTick: number | null = null
let resizeObserver: ResizeObserver | null = null
let viewObserver: IntersectionObserver | null = null

/**
 * `Element` is what Vue hands a function ref; narrowing here keeps the template
 * free of casts and the arrays typed as elements rather than components.
 */
function setMeasureRef(element: Element | ComponentPublicInstance | null, index: number) {
  measureRefs[index] = element instanceof HTMLElement ? element : null
}

function setLetterRef(element: Element | ComponentPublicInstance | null, index: number) {
  letterRefs[index] = element instanceof HTMLElement ? element : null
}

/**
 * Origins are read from the invisible copy, not from the animated letters: the
 * animated ones are absolutely positioned and already translated, so measuring
 * them would make the second drop start where the first one ended.
 */
function measure() {
  const container = containerRef.value

  if (!container) {
    return
  }

  const containerRect = container.getBoundingClientRect()

  origins = measureRefs.map((element) => {
    if (!element) {
      return { height: 0, width: 0, x: 0, y: 0 }
    }

    const rect = element.getBoundingClientRect()

    return {
      height: rect.height,
      width: rect.width,
      x: rect.left - containerRect.left,
      y: rect.top - containerRect.top,
    }
  })

  if (phase === 'idle') {
    applyIdleTransforms()
  }
}

function applyIdleTransforms() {
  for (let index = 0; index < letterRefs.length; index++) {
    const element = letterRefs[index]
    const origin = origins[index]

    if (element && origin) {
      element.style.transform = `translate3d(${origin.x}px, ${origin.y}px, 0) rotate(0deg)`
    }
  }
}

function settle() {
  frame = null
  phase = phase === 'falling' ? 'settled' : 'idle'

  if (phase === 'idle') {
    applyIdleTransforms()
  }
}

function tick(now: number) {
  const previous = lastTick ?? now
  const dt = Math.min((now - previous) / 1000, MAX_DT_SECONDS)
  lastTick = now

  const container = containerRef.value

  if (!container) {
    frame = null
    return
  }

  const rect = container.getBoundingClientRect()
  const floorY = rect.height
  const wallRight = rect.width
  let active = false

  for (let index = 0; index < physics.length; index++) {
    const letter = physics[index]
    const element = letterRefs[index]
    const origin = origins[index]

    if (!letter || !element || !origin) {
      continue
    }

    if (phase === 'falling') {
      if (now < letter.releaseAt) {
        active = true
        continue
      }

      if (letter.settled) {
        continue
      }

      active = true

      letter.vy += props.gravity * dt
      letter.dx += letter.vx * dt
      letter.dy += letter.vy * dt
      letter.angle += letter.angularVel * dt

      const floorLimit = floorY - origin.y - origin.height

      if (letter.dy >= floorLimit) {
        letter.dy = floorLimit
        letter.vy = -letter.vy * props.bounce
        letter.vx *= 1 - props.friction
        letter.angularVel *= 1 - props.friction

        if (
          Math.abs(letter.vy) < REST_VELOCITY
          && Math.abs(letter.vx) < REST_HORIZONTAL_VELOCITY
        ) {
          letter.vy = 0
          letter.vx = 0
          letter.angularVel = 0
          letter.settled = true
        }
      }

      const leftLimit = -origin.x
      const rightLimit = wallRight - origin.x - origin.width

      if (letter.dx <= leftLimit) {
        letter.dx = leftLimit
        letter.vx = -letter.vx * props.bounce
      }
      else if (letter.dx >= rightLimit) {
        letter.dx = rightLimit
        letter.vx = -letter.vx * props.bounce
      }
    }
    else if (phase === 'reforming') {
      if (letter.settled) {
        continue
      }

      const ax = -SPRING_STIFFNESS * letter.dx - SPRING_DAMPING * letter.vx
      const ay = -SPRING_STIFFNESS * letter.dy - SPRING_DAMPING * letter.vy
      const aAngle = -SPRING_STIFFNESS * letter.angle - SPRING_DAMPING * letter.angularVel

      letter.vx += ax * dt
      letter.vy += ay * dt
      letter.angularVel += aAngle * dt
      letter.dx += letter.vx * dt
      letter.dy += letter.vy * dt
      letter.angle += letter.angularVel * dt

      if (
        Math.abs(letter.dx) < REFORM_EPSILON_POSITION
        && Math.abs(letter.dy) < REFORM_EPSILON_POSITION
        && Math.abs(letter.angle) < REFORM_EPSILON_ANGLE
        && Math.abs(letter.vx) < REFORM_EPSILON_VELOCITY
        && Math.abs(letter.vy) < REFORM_EPSILON_VELOCITY
      ) {
        letter.dx = 0
        letter.dy = 0
        letter.angle = 0
        letter.vx = 0
        letter.vy = 0
        letter.settled = true
      }
      else {
        active = true
      }
    }

    element.style.transform = `translate3d(${origin.x + letter.dx}px, ${origin.y + letter.dy}px, 0) rotate(${letter.angle}deg)`
  }

  if (active) {
    frame = requestAnimationFrame(tick)
  }
  else {
    settle()
  }
}

function startLoop() {
  if (frame !== null) {
    return
  }

  lastTick = null
  frame = requestAnimationFrame(tick)
}

function startFalling() {
  if (origins.length === 0) {
    return
  }

  const now = performance.now()

  physics = letters.value.map((_, index) => ({
    angle: 0,
    angularVel: (Math.random() * 2 - 1) * 180,
    dx: 0,
    dy: 0,
    releaseAt: now + index * props.stagger,
    settled: false,
    vx: (Math.random() * 2 - 1) * props.spread,
    vy: 0,
  }))

  phase = 'falling'
  startLoop()
}

function startReforming() {
  if (physics.length === 0) {
    return
  }

  for (const letter of physics) {
    letter.settled = false
  }

  phase = 'reforming'
  startLoop()
}

const isInteractive = computed(() => props.trigger === 'hover' || props.trigger === 'click')

function handleClick() {
  if (props.trigger === 'click') {
    setCollapsed(!collapsed.value)
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (props.trigger === 'click' && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    setCollapsed(!collapsed.value)
  }
}

function handleFocus() {
  if (props.trigger === 'hover') {
    setCollapsed(true)
  }
}

function handleBlur() {
  if (props.trigger === 'hover') {
    setCollapsed(false)
  }
}

function handleMouseEnter() {
  if (props.trigger === 'hover') {
    setCollapsed(true)
  }
}

function handleMouseLeave() {
  if (props.trigger === 'hover') {
    setCollapsed(false)
  }
}

function observeInView() {
  const container = containerRef.value

  if (!container || props.trigger !== 'inView') {
    return
  }

  viewObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setCollapsed(true)
        viewObserver?.disconnect()
      }
    }
  }, { threshold: IN_VIEW_THRESHOLD })

  viewObserver.observe(container)
}

onMounted(async () => {
  await nextTick()
  measure()

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(containerRef.value)
  }

  observeInView()
})

onBeforeUnmount(() => {
  if (frame !== null) {
    cancelAnimationFrame(frame)
  }

  resizeObserver?.disconnect()
  viewObserver?.disconnect()
})

/**
 * Reduced motion is checked before the physics so the preference never starts a
 * loop that would then have to be torn down mid-fall. A change of preference
 * while the page is open simply leaves the letters where they are, which is the
 * resting state the loop already renders when it stops.
 */
watch(collapsed, (value) => {
  if (isReduced.value) {
    return
  }

  if (value) {
    startFalling()
  }
  else {
    startReforming()
  }
})

watch(() => props.text, async () => {
  physics = []
  phase = 'idle'
  await nextTick()
  measure()
})

watch(() => props.trigger, () => {
  viewObserver?.disconnect()
  observeInView()
})
</script>

<template>
  <!--
    One tree for every preference. The reduced-motion swap is pure CSS
    (`motion-reduce:`), because branching the template on `useReducedMotion()`
    would render a different DOM on the server than on a client that prefers
    reduced motion, and Vue would report a hydration mismatch on every visit.
  -->
  <div
    ref="containerRef"
    :aria-pressed="props.trigger === 'click' ? collapsed : undefined"
    :class="props.class"
    :role="props.trigger === 'click' ? 'button' : undefined"
    :tabindex="isInteractive ? 0 : undefined"
    class="relative isolate min-h-24 select-none overflow-hidden motion-reduce:min-h-0 motion-reduce:select-auto"
    @blur="isInteractive ? handleBlur() : undefined"
    @click="isInteractive ? handleClick() : undefined"
    @focus="isInteractive ? handleFocus() : undefined"
    @keydown="isInteractive ? handleKeydown($event) : undefined"
    @mouseenter="isInteractive ? handleMouseEnter() : undefined"
    @mouseleave="isInteractive ? handleMouseLeave() : undefined"
  >
    <!--
      The readable string, once. The animated letters are decorative copies, and
      each one is absolutely positioned, so the accessible tree keeps the word
      order and the exact text without following the physics.
    -->
    <span class="sr-only motion-reduce:hidden">{{ props.text }}</span>

    <!--
      The plain string, shown by the media query instead of the letters. It is
      `display: none` at rest, so it is neither measured nor read aloud twice.
    -->
    <span class="hidden motion-reduce:block">{{ props.text }}</span>

    <!--
      The invisible copy is the layout: it wraps at the natural width and its
      measured boxes become the resting position of every animated letter.
    -->
    <div
      aria-hidden="true"
      class="pointer-events-none invisible flex flex-wrap motion-reduce:hidden"
    >
      <span
        v-for="(character, index) in letters"
        :key="index"
        :ref="element => setMeasureRef(element, index)"
        class="inline-block whitespace-pre"
      >{{ character }}</span>
    </div>

    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 motion-reduce:hidden"
    >
      <span
        v-for="(character, index) in letters"
        :key="index"
        :ref="element => setLetterRef(element, index)"
        class="absolute top-0 left-0 inline-block whitespace-pre will-change-transform"
      >{{ character }}</span>
    </div>
  </div>
</template>
