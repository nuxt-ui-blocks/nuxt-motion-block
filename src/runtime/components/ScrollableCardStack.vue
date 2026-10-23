<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue'
import { cn } from '../utils/merge'

export interface ScrollableCardItem {
  /** Avatar shown beside the name. */
  avatar: string
  /** Short account handle, shown after the name. */
  handle: string
  /** Profile URL. Opens in a new tab. */
  href: string
  /** Stable key. */
  id: string
  /** Cover image. */
  image: string
  /** Overrides the generated cover description. */
  imageAlt?: string
  /** Display name. */
  name: string
}

export interface ScrollableCardStackProps {
  /** Height of one card, in pixels. */
  cardHeight?: number
  /** Extra classes for the outer section. */
  class?: string
  /** Cards, front to back. */
  items: ScrollableCardItem[]
  /** CSS perspective for the stack, in pixels. */
  perspective?: number
  /** Transform and lockout time, in milliseconds. */
  transitionDuration?: number
}

const props = withDefaults(defineProps<ScrollableCardStackProps>(), {
  cardHeight: 384,
  class: undefined,
  perspective: 1000,
  transitionDuration: 180,
})

const SCROLL_TIMEOUT_OFFSET = 100
const MIN_SCROLL_INTERVAL = 300
const SCROLL_THRESHOLD = 20
const TOUCH_SCROLL_THRESHOLD = 100
const SCALE_FACTOR = 0.08
const MIN_SCALE = 0.08
const MAX_SCALE = 2
const CARD_PADDING = 100
const FRAME_OFFSET = -30
const FRAMES_VISIBLE_LENGTH = 3

const currentIndex = ref(0)
const hoveredIndex = ref<number | null>(null)
const isScrolling = ref(false)
const isDragging = ref(false)
const instructionsId = useId()

let lastScrollTime = 0
let lockTimer: ReturnType<typeof setTimeout> | null = null
let touchStartY = 0
let touchMoved = false

const maxIndex = computed(() => Math.max(0, props.items.length - 1))

const liveLabel = computed(() => {
  if (props.items.length === 0) return 'No cards to show.'
  const item = props.items[currentIndex.value]
  return `Card ${currentIndex.value + 1} of ${props.items.length} selected${item ? `: ${item.name}` : ''}.`
})

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function setIndex(next: number) {
  const target = clamp(next, 0, maxIndex.value)
  if (target === currentIndex.value) return false

  currentIndex.value = target
  hoveredIndex.value = null
  isScrolling.value = true

  if (lockTimer) clearTimeout(lockTimer)
  lockTimer = setTimeout(() => {
    isScrolling.value = false
    lockTimer = null
  }, props.transitionDuration + SCROLL_TIMEOUT_OFFSET)

  return true
}

function scrollToCard(direction: 1 | -1) {
  if (isScrolling.value) return false

  const now = Date.now()
  if (now - lastScrollTime < MIN_SCROLL_INTERVAL) return false

  const target = clamp(currentIndex.value + direction, 0, maxIndex.value)
  if (target === currentIndex.value) return false

  lastScrollTime = now
  return setIndex(target)
}

function onWheel(event: WheelEvent) {
  if (isDragging.value || Math.abs(event.deltaY) < SCROLL_THRESHOLD) return

  const direction = event.deltaY > 0 ? 1 : -1
  const target = clamp(currentIndex.value + direction, 0, maxIndex.value)

  // At either end the stack has nowhere to go, so let the page take the wheel.
  if (target === currentIndex.value) return

  event.preventDefault()
  scrollToCard(direction)
}

function onKeydown(event: KeyboardEvent) {
  if (isScrolling.value) return
  if (event.metaKey || event.ctrlKey || event.altKey) return

  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault()
      scrollToCard(-1)
      break
    case 'ArrowDown':
    case 'ArrowRight':
      event.preventDefault()
      scrollToCard(1)
      break
    case 'Home':
      event.preventDefault()
      setIndex(0)
      break
    case 'End':
      event.preventDefault()
      setIndex(maxIndex.value)
      break
  }
}

function onTouchStart(event: TouchEvent) {
  const touch = event.touches[0]
  if (!touch) return

  touchStartY = touch.clientY
  touchMoved = false
  isDragging.value = true
}

function onTouchMove(event: TouchEvent) {
  if (!isDragging.value || isScrolling.value) return

  const touch = event.touches[0]
  if (!touch) return

  const deltaY = touchStartY - touch.clientY
  if (Math.abs(deltaY) <= TOUCH_SCROLL_THRESHOLD || touchMoved) return

  touchMoved = true
  scrollToCard(deltaY > 0 ? 1 : -1)
}

function onTouchEnd() {
  isDragging.value = false
  touchMoved = false
}

function selectIndex(index: number) {
  if (index === currentIndex.value || isScrolling.value) return
  setIndex(index)
}

function getCardTransform(index: number) {
  const offsetIndex = index - currentIndex.value
  const isBehind = index < currentIndex.value

  return {
    blur: index === currentIndex.value ? 0 : 2,
    opacity: isBehind ? 0 : 1,
    scale: clamp(1 - offsetIndex * SCALE_FACTOR, MIN_SCALE, MAX_SCALE),
    y: clamp(offsetIndex * FRAME_OFFSET, FRAME_OFFSET * FRAMES_VISIBLE_LENGTH, Number.POSITIVE_INFINITY),
    zIndex: props.items.length - index,
  }
}

function cardStyle(index: number) {
  const transform = getCardTransform(index)

  return {
    '--stack-blur': `${transform.blur}px`,
    '--stack-scale': `${transform.scale}`,
    '--stack-y': `${transform.y}px`,
    'borderWidth': `${2 / transform.scale}px`,
    'height': `${props.cardHeight}px`,
    'opacity': transform.opacity,
    'pointerEvents': index === currentIndex.value ? 'auto' as const : 'none' as const,
    'zIndex': transform.zIndex,
  }
}

function setHovered(index: number | null) {
  hoveredIndex.value = index
}

watch(
  () => props.items.length,
  (length) => {
    if (length === 0) {
      currentIndex.value = 0
      return
    }

    if (currentIndex.value > length - 1) currentIndex.value = length - 1
  },
)

onBeforeUnmount(() => {
  if (lockTimer) clearTimeout(lockTimer)
})
</script>

<template>
  <section :class="cn('relative mx-auto h-fit w-[400px] max-w-full', props.class)">
    <div
      role="application"
      tabindex="0"
      aria-label="Scrollable card stack"
      :aria-describedby="instructionsId"
      class="relative h-full w-full touch-none outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default"
      :style="{
        'minHeight': `${cardHeight + CARD_PADDING}px`,
        'perspective': `${perspective}px`,
        'perspectiveOrigin': 'center 60%',
        '--stack-duration': `${transitionDuration}ms`,
      }"
      @keydown="onKeydown"
      @wheel="onWheel"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <template v-if="items.length > 0">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="stack-card absolute top-1/2 left-1/2 w-full max-w-full overflow-hidden rounded-2xl border border-default bg-default shadow-lg"
          :class="{ 'is-hovered': hoveredIndex === index && index === currentIndex }"
          :style="cardStyle(index)"
          :data-active="index === currentIndex"
          :aria-hidden="index === currentIndex ? undefined : 'true'"
          :inert="index === currentIndex ? undefined : true"
          @mouseenter="setHovered(index)"
          @mouseleave="setHovered(null)"
          @focusin="setHovered(index)"
          @focusout="setHovered(null)"
        >
          <div
            class="relative flex h-full flex-col rounded-xl bg-default transition-shadow duration-200"
            :class="{
              'shadow-xl': hoveredIndex === index && index === currentIndex,
              'ring-2 ring-primary/50': isScrolling && index === currentIndex,
            }"
          >
            <div
              v-if="isScrolling && index === currentIndex"
              aria-hidden="true"
              class="absolute -top-1 left-1/2 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-primary opacity-75"
            />

            <div class="relative min-h-0 flex-1 overflow-hidden bg-muted">
              <img
                :src="item.image"
                :alt="item.imageAlt ?? `${item.name}'s card`"
                width="400"
                :height="cardHeight"
                decoding="async"
                draggable="false"
                class="h-full w-full object-cover"
              >
            </div>

            <a
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`View ${item.name}'s profile (opens in a new tab)`"
              class="flex items-center justify-center gap-1 border-t border-default bg-default/95 p-3 text-inherit no-underline backdrop-blur-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset focus-visible:outline-none"
            >
              <img
                :src="item.avatar"
                :alt="`${item.name}'s avatar`"
                width="20"
                height="20"
                draggable="false"
                loading="lazy"
                class="mr-1 h-5 w-5 overflow-hidden rounded-full ring-1 ring-default"
              >
              <span class="text-sm leading-none font-medium text-highlighted">{{ item.name }}</span>
              <span class="text-sm text-muted">{{ item.handle }}</span>
            </a>
          </div>
        </div>

        <div
          role="group"
          aria-label="Card navigation"
          class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2"
          :style="{ zIndex: items.length + 1 }"
        >
          <button
            v-for="(item, index) in items"
            :key="`dot-${item.id}`"
            type="button"
            class="h-2 w-2 cursor-pointer rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 motion-reduce:transition-none"
            :class="index === currentIndex
              ? 'scale-125 bg-primary'
              : 'bg-muted hover:bg-accented'"
            :aria-label="`Go to card ${index + 1} of ${items.length}`"
            :aria-current="index === currentIndex ? 'true' : undefined"
            @click="selectIndex(index)"
          />
        </div>
      </template>

      <div
        v-else
        class="absolute inset-0 grid place-items-center rounded-2xl border border-dashed border-default"
      >
        <p class="text-sm text-muted">
          No cards to show
        </p>
      </div>

      <p
        :id="instructionsId"
        class="sr-only"
      >
        Use the up and down arrow keys to move through the stack. Home and End jump to the first and last card.
      </p>

      <div
        aria-live="polite"
        class="sr-only"
      >
        {{ liveLabel }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.stack-card {
  filter: blur(var(--stack-blur, 0));
  transform: translate(-50%, -50%) translateY(var(--stack-y, 0)) scale(var(--stack-scale, 1));
  transform-origin: center center;
  transition-property: transform, opacity, filter, border-width, scale, box-shadow;
  transition-duration: var(--stack-duration, 180ms);
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  will-change: transform, opacity, filter;
}

.stack-card.is-hovered {
  scale: 1.02;
}

@media (prefers-reduced-motion: reduce) {
  .stack-card {
    filter: none;
    transform: translate(-50%, -50%);
    transition: none;
    will-change: auto;
  }

  .stack-card.is-hovered {
    scale: 1;
  }
}
</style>
