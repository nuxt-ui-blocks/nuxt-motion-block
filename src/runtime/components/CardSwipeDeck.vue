<script setup lang="ts" generic="T extends { id: string }">
import type { PanInfo } from 'motion-v'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion-v'
import { computed, onBeforeUnmount, ref, useId } from 'vue'
import { cn } from '../utils/merge'

export interface CardSwipeDeckItem {
  /** Optional plain-text fallback when the default slot is omitted. */
  content?: string
  /** Stable key. Used as the list key and in the `swipe` payload. */
  id: string
}

export interface CardSwipeDeckLabels {
  /** Stamp copy for a left swipe, shown in the top-right corner. */
  left?: string
  /** Stamp copy for a right swipe, shown in the top-left corner. */
  right?: string
}

export type SwipeDirection = 'left' | 'right'

export interface CardSwipeDeckHandle {
  /** Bring every swiped card back and reset the drag position. */
  reset: () => void
  /** Swipe the top card left, as if it were dragged. */
  swipeLeft: () => void
  /** Swipe the top card right, as if it were dragged. */
  swipeRight: () => void
}

export interface CardSwipeDeckProps<T extends { id: string } = CardSwipeDeckItem> {
  /** Extra classes for the deck container. */
  class?: string
  /** Disable dragging, keyboard swipes and the imperative API. */
  disabled?: boolean
  /** Cards to swipe. The first item starts on top. */
  items: T[]
  /** Stamp copy burned into the top corners. */
  labels?: CardSwipeDeckLabels
  /** Maximum rotation in degrees at the edge of the drag range. */
  rotationFactor?: number
  /** Vertical offset in pixels for each receding card. */
  stackOffset?: number
  /** How many cards are visible in the stack, front card included. */
  stackSize?: number
  /** Horizontal drag distance in pixels required to commit a swipe. */
  threshold?: number
}

const props = withDefaults(defineProps<CardSwipeDeckProps<T>>(), {
  class: undefined,
  disabled: false,
  labels: () => ({}),
  rotationFactor: 18,
  stackOffset: 14,
  stackSize: 3,
  threshold: 110,
})

const emit = defineEmits<{
  /** Fired when the last card leaves the deck. */
  empty: []
  /** Fired with the card id and the direction it was thrown. */
  swipe: [id: string, direction: SwipeDirection]
}>()

const DEFAULT_THROW_LIFT = -160
const DRAG_RANGE = 260
const EXIT_DISTANCE = 900
const EXIT_FALLBACK = 800
const MIN_THROW_SPEED = 750
const PIVOT_ORIGIN = '50% 165%'
const STACK_SCALE_STEP = 0.05
const STAMP_MIN_SCALE = 0.7
const STAMP_RATIO = 0.85
const THROW_DURATION = 0.34
const VELOCITY_COMMIT_THRESHOLD = 450
const VERTICAL_LIMIT = 90
const WASH_MAX_OPACITY = 0.9
const WASH_RATIO = 1.35

const DRAG_CONSTRAINTS = Object.freeze({
  bottom: VERTICAL_LIMIT,
  top: -VERTICAL_LIMIT,
})
const DRAG_ELASTIC = Object.freeze({
  bottom: 0.35,
  left: 1,
  right: 1,
  top: 0.35,
})
const SNAP_BACK_TRANSITION = {
  bounce: 0.3,
  duration: 0.45,
  type: 'spring',
} as const
const THROW_TRANSITION = {
  bounce: 0,
  duration: THROW_DURATION,
  type: 'spring',
} as const
const WHILE_DRAG = { scale: 1.02 }

type AnimationControls = ReturnType<typeof animate>

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const x = useMotionValue(0)
const y = useMotionValue(0)

const rotate = useTransform(() => {
  const limit = Math.max(0, props.rotationFactor)
  return clamp((x.get() / DRAG_RANGE) * limit, -limit, limit)
})

const likeOpacity = useTransform(() => clamp(x.get() / stampSpan(), 0, 1))
const likeScale = useTransform(
  () => STAMP_MIN_SCALE + (1 - STAMP_MIN_SCALE) * likeOpacity.get(),
)
const nopeOpacity = useTransform(() => clamp(-x.get() / stampSpan(), 0, 1))
const nopeScale = useTransform(
  () => STAMP_MIN_SCALE + (1 - STAMP_MIN_SCALE) * nopeOpacity.get(),
)
const likeWash = useTransform(() =>
  clamp(x.get() / washSpan(), 0, WASH_MAX_OPACITY),
)
const nopeWash = useTransform(() =>
  clamp(-x.get() / washSpan(), 0, WASH_MAX_OPACITY),
)

const removedIds = ref<Set<string>>(new Set())
const exitingId = ref<string | null>(null)
const instructionsId = useId()

let exitControls: AnimationControls[] = []
let exitTimer: ReturnType<typeof setTimeout> | null = null
let exitToken = 0
let snapControls: AnimationControls[] = []

const stackCount = computed(() => Math.max(1, Math.floor(props.stackSize)))
const remaining = computed(() =>
  props.items.filter(item => !removedIds.value.has(item.id)),
)
const visible = computed(() =>
  remaining.value.slice(0, stackCount.value + 1),
)
const resolvedLabels = computed(() => ({
  left: props.labels?.left ?? 'Nope',
  right: props.labels?.right ?? 'Like',
}))
const remainingLabel = computed(() => {
  const count = remaining.value.length

  if (count === 0) {
    return 'No cards remaining'
  }

  return `${count} card${count === 1 ? '' : 's'} remaining`
})

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function stampSpan() {
  return Math.max(1, props.threshold * STAMP_RATIO)
}

function washSpan() {
  return Math.max(1, props.threshold * WASH_RATIO)
}

function fallbackContent(item: T) {
  return (item as { content?: string }).content ?? item.id
}

function positionFor(index: number) {
  return exitingId.value ? Math.max(index - 1, 0) : index
}

function isBuried(index: number) {
  return positionFor(index) >= stackCount.value
}

function stackStyle(index: number) {
  const position = positionFor(index)

  return {
    transform: `translateY(${position * props.stackOffset}px) scale(${1 - position * STACK_SCALE_STEP})`,
    zIndex: visible.value.length - index,
  }
}

function cardStyle(index: number) {
  if (index !== 0) {
    return { transformOrigin: PIVOT_ORIGIN }
  }

  return {
    rotate,
    transformOrigin: PIVOT_ORIGIN,
    x,
    y,
  }
}

function removeCard(id: string) {
  removedIds.value = new Set(removedIds.value).add(id)
}

function stopExit() {
  exitToken += 1

  for (const controls of exitControls) {
    controls.stop()
  }

  exitControls = []

  if (exitTimer) {
    clearTimeout(exitTimer)
    exitTimer = null
  }
}

function stopSnap() {
  for (const controls of snapControls) {
    controls.stop()
  }

  snapControls = []
}

function finishExit(id: string, token: number) {
  if (token !== exitToken) {
    return
  }

  stopExit()
  removeCard(id)
  exitingId.value = null
  x.set(0)
  y.set(0)
}

function throwCard(
  id: string,
  direction: SwipeDirection,
  vx: number,
  vy: number,
) {
  const targetX = direction === 'left' ? -EXIT_DISTANCE : EXIT_DISTANCE
  const speed = Math.max(Math.abs(vx), MIN_THROW_SPEED)
  const signedVx = direction === 'left' ? -speed : speed
  const targetY = y.get() + vy * THROW_DURATION

  const xControls = animate(x, targetX, {
    ...THROW_TRANSITION,
    velocity: signedVx,
  })
  const yControls = animate(y, targetY, {
    ...THROW_TRANSITION,
    velocity: vy,
  })

  exitControls = [xControls, yControls]
  const token = ++exitToken

  void Promise.resolve(xControls).then(() => finishExit(id, token))
  exitTimer = setTimeout(() => finishExit(id, token), EXIT_FALLBACK)
}

function snapBack() {
  stopSnap()

  if (isReduced.value) {
    x.set(0)
    y.set(0)
    return
  }

  snapControls = [
    animate(x, 0, SNAP_BACK_TRANSITION),
    animate(y, 0, SNAP_BACK_TRANSITION),
  ]
}

function commitSwipe(direction: SwipeDirection, info?: PanInfo) {
  if (props.disabled || exitingId.value) {
    return
  }

  const top = remaining.value[0]

  if (!top) {
    return
  }

  const wasLast = remaining.value.length === 1
  const vx = info?.velocity.x ?? 0
  const vy = info?.velocity.y ?? DEFAULT_THROW_LIFT

  if (isReduced.value) {
    stopExit()
    stopSnap()
    x.set(0)
    y.set(0)
    removeCard(top.id)
  }
  else {
    exitingId.value = top.id
    throwCard(top.id, direction, vx, vy)
  }

  emit('swipe', top.id, direction)

  if (wasLast) {
    emit('empty')
  }
}

function onDragEnd(_event: PointerEvent, info: PanInfo) {
  if (props.disabled || exitingId.value) {
    return
  }

  const shouldCommit
    = Math.abs(info.offset.x) > props.threshold
      || Math.abs(info.velocity.x) > VELOCITY_COMMIT_THRESHOLD

  if (shouldCommit) {
    let direction: SwipeDirection = info.velocity.x >= 0 ? 'right' : 'left'

    if (info.offset.x !== 0) {
      direction = info.offset.x > 0 ? 'right' : 'left'
    }

    commitSwipe(direction, info)
    return
  }

  snapBack()
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) {
    return
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    commitSwipe('left')
  }
  else if (event.key === 'ArrowRight' || event.key === 'Enter') {
    event.preventDefault()
    commitSwipe('right')
  }
}

function reset() {
  stopExit()
  stopSnap()
  x.set(0)
  y.set(0)
  exitingId.value = null
  removedIds.value = new Set()
}

function swipeLeft() {
  commitSwipe('left')
}

function swipeRight() {
  commitSwipe('right')
}

defineExpose<CardSwipeDeckHandle>({ reset, swipeLeft, swipeRight })

onBeforeUnmount(() => {
  stopExit()
  stopSnap()
})
</script>

<template>
  <div
    :aria-describedby="instructionsId"
    aria-label="Swipeable card deck"
    :aria-disabled="props.disabled ? 'true' : undefined"
    :class="
      cn(
        'relative h-[480px] w-[340px] max-w-full touch-pan-y rounded-[28px] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default',
        props.disabled && 'opacity-60',
        props.class,
      )
    "
    role="application"
    tabindex="0"
    @keydown="onKeydown"
  >
    <p
      :id="instructionsId"
      class="sr-only"
    >
      Drag the top card left or right, or focus the deck and use the left and
      right arrow keys. Enter likes the top card.
    </p>

    <template v-if="visible.length > 0">
      <div
        v-for="(item, index) in visible"
        :key="item.id"
        class="deck-shell absolute inset-0"
        :style="stackStyle(index)"
      >
        <motion.div
          :class="[
            'deck-card relative h-full w-full touch-pan-y overflow-hidden rounded-[28px] bg-default shadow-[0_1px_2px_rgba(0,0,0,0.06),0_10px_20px_-8px_rgba(0,0,0,0.18),0_28px_56px_-20px_rgba(0,0,0,0.32)] ring-1 ring-default',
            props.disabled
              ? 'cursor-default'
              : 'cursor-grab active:cursor-grabbing',
            {
              'is-buried': isBuried(index),
              'is-exiting': exitingId === item.id,
            },
          ]"
          :drag="index === 0 && !props.disabled && !exitingId"
          :drag-constraints="DRAG_CONSTRAINTS"
          :drag-elastic="DRAG_ELASTIC"
          :drag-momentum="false"
          :style="cardStyle(index)"
          :while-drag="WHILE_DRAG"
          @drag-end="onDragEnd"
          @drag-start="stopSnap"
        >
          <slot
            :is-front="index === 0"
            :index="index"
            :item="item"
          >
            <div
              class="flex h-full w-full flex-col items-center justify-center gap-3 bg-elevated p-6 text-center"
            >
              <span class="text-lg font-semibold text-highlighted">
                {{ fallbackContent(item) }}
              </span>
            </div>
          </slot>

          <template v-if="index === 0">
            <motion.div
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 bg-linear-to-l from-success/55 via-success/15 to-transparent"
              :style="{ opacity: likeWash }"
            />
            <motion.div
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 bg-linear-to-r from-error/55 via-error/15 to-transparent"
              :style="{ opacity: nopeWash }"
            />

            <motion.div
              aria-hidden="true"
              class="pointer-events-none absolute top-7 left-6 rounded-xl border-[3px] border-success px-3 py-1 text-2xl leading-none font-black tracking-[0.08em] text-success uppercase drop-shadow-sm"
              :style="{
                opacity: likeOpacity,
                rotate: -20,
                scale: likeScale,
              }"
            >
              {{ resolvedLabels.right }}
            </motion.div>
            <motion.div
              aria-hidden="true"
              class="pointer-events-none absolute top-7 right-6 rounded-xl border-[3px] border-error px-3 py-1 text-2xl leading-none font-black tracking-[0.08em] text-error uppercase drop-shadow-sm"
              :style="{
                opacity: nopeOpacity,
                rotate: 20,
                scale: nopeScale,
              }"
            >
              {{ resolvedLabels.left }}
            </motion.div>
          </template>
        </motion.div>
      </div>
    </template>

    <div
      v-else
      class="flex h-full w-full items-center justify-center rounded-[28px] border border-dashed border-default"
    >
      <slot name="empty">
        <p class="text-center text-sm text-muted">
          No more cards
        </p>
      </slot>
    </div>

    <div
      aria-live="polite"
      class="sr-only"
    >
      {{ remainingLabel }}
    </div>
  </div>
</template>

<style scoped>
.deck-shell {
  transition: transform 250ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
}

.deck-card {
  opacity: 1;
  transition: opacity 250ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform, opacity;
}

.deck-card.is-buried {
  opacity: 0;
}

.deck-card.is-exiting {
  opacity: 0;
  transition: opacity 140ms cubic-bezier(0.645, 0.045, 0.355, 1) 200ms;
}

@media (prefers-reduced-motion: reduce) {
  .deck-shell,
  .deck-card,
  .deck-card.is-exiting {
    transition: none;
  }
}
</style>
