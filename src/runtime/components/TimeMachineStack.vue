<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, useTemplateRef } from 'vue'

export interface TimeMachineStackItem {
  /** Stable identifier, also used for the option id. */
  id: string
  /** Optional fallback label when no item slot is provided. */
  title?: string
  /** Optional supporting copy for the default slot. */
  description?: string
  /** Optional year or step marker used by examples. */
  year?: string | number
  /** Optional background classes used by examples. */
  tone?: string
  [key: string]: unknown
}

export interface TimeMachineStackProps {
  /** Extra classes for the root. */
  class?: string
  /** Distance in pixels each receding panel is pushed back. */
  depth?: number
  /** Controlled index of the front-most panel. */
  index?: number
  /** Panels from front to back. */
  items: TimeMachineStackItem[]
  /** Vertical offset in pixels applied per receding panel. */
  offsetY?: number
  /** CSS perspective in pixels for the 3D context. */
  perspective?: number
  /** Scale reduction applied per receding panel. */
  scaleStep?: number
  /** Panels rendered at once; the rest stay unmounted. */
  visibleCount?: number
}

const props = withDefaults(defineProps<TimeMachineStackProps>(), {
  class: undefined,
  depth: 50,
  index: undefined,
  offsetY: 36,
  perspective: 1400,
  scaleStep: 0.05,
  visibleCount: 4,
})

const emit = defineEmits<{
  'change': [index: number]
  'update:index': [index: number]
}>()

/** Wheel deltas below this are ignored so a trackpad nudge does not advance. */
const WHEEL_THRESHOLD = 12
/** Wheel navigation is locked for this long after a step. */
const WHEEL_COOLDOWN_MS = 220
/** A drag shorter than this snaps back without changing panels. */
const DRAG_THRESHOLD = 48
const FORWARD = 1
const BACKWARD = -1

const listboxId = useId()
const listbox = useTemplateRef<HTMLElement>('listbox')

const isControlled = computed(() => props.index !== undefined)
const internalIndex = ref(0)
const lastIndex = computed(() => Math.max(props.items.length - 1, 0))

const currentIndex = computed(() => {
  const value = isControlled.value ? (props.index as number) : internalIndex.value
  return Math.min(Math.max(value, 0), lastIndex.value)
})

const visibleCount = computed(() => Math.max(1, Math.floor(props.visibleCount)))

const panels = computed(() =>
  props.items
    .slice(currentIndex.value, currentIndex.value + visibleCount.value)
    .map((item, pos) => ({
      item,
      pos,
      index: currentIndex.value + pos,
      active: pos === 0,
    })),
)

const frontItem = computed(() => panels.value[0]?.item)

/** Receding panels move up, so the stack reserves that much headroom. */
const reservedTop = computed(() =>
  Math.max(visibleCount.value - 1, 0) * props.offsetY,
)

function toTransform(pos: number) {
  const scale = Math.max(0.4, 1 - pos * props.scaleStep)
  return `translateY(${-pos * props.offsetY}px) translateZ(${-pos * props.depth}px) scale(${scale})`
}

function goTo(next: number) {
  const clamped = Math.min(Math.max(next, 0), lastIndex.value)

  if (clamped === currentIndex.value) {
    return
  }

  if (!isControlled.value) {
    internalIndex.value = clamped
  }

  emit('update:index', clamped)
  emit('change', clamped)
}

let wheelLocked = false
let wheelTimer: ReturnType<typeof setTimeout> | undefined

function handleWheel(event: WheelEvent) {
  if (Math.abs(event.deltaY) < WHEEL_THRESHOLD || wheelLocked) {
    return
  }

  const next = currentIndex.value + (event.deltaY > 0 ? FORWARD : BACKWARD)

  // At either end the wheel goes back to the page instead of being swallowed.
  if (next < 0 || next > lastIndex.value) {
    return
  }

  event.preventDefault()
  wheelLocked = true
  goTo(next)

  wheelTimer = setTimeout(() => {
    wheelLocked = false
    wheelTimer = undefined
  }, WHEEL_COOLDOWN_MS)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    goTo(currentIndex.value + FORWARD)
  }
  else if (event.key === 'ArrowUp') {
    event.preventDefault()
    goTo(currentIndex.value + BACKWARD)
  }
  else if (event.key === 'Home') {
    event.preventDefault()
    goTo(0)
  }
  else if (event.key === 'End') {
    event.preventDefault()
    goTo(lastIndex.value)
  }
}

let dragOrigin: number | null = null

function handlePointerDown(event: PointerEvent) {
  dragOrigin = event.clientY
}

function handlePointerUp(event: PointerEvent) {
  const origin = dragOrigin
  dragOrigin = null

  if (origin === null) {
    return
  }

  const delta = origin - event.clientY

  if (Math.abs(delta) < DRAG_THRESHOLD) {
    return
  }

  goTo(currentIndex.value + (delta > 0 ? FORWARD : BACKWARD))
}

function handlePointerCancel() {
  dragOrigin = null
}

onMounted(() => {
  listbox.value?.addEventListener('wheel', handleWheel, { passive: false })
})

onBeforeUnmount(() => {
  listbox.value?.removeEventListener('wheel', handleWheel)

  if (wheelTimer) {
    clearTimeout(wheelTimer)
  }
})
</script>

<template>
  <div :class="['flex w-full flex-col items-center gap-4', props.class]">
    <div
      :id="listboxId"
      ref="listbox"
      :aria-activedescendant="
        frontItem ? `${listboxId}-${frontItem.id}` : undefined
      "
      aria-label="Time machine stack"
      class="tm-listbox relative min-h-[14rem] w-full flex-1 touch-none rounded-2xl outline-none select-none focus-visible:ring-2 focus-visible:ring-primary"
      :style="{ perspective: `${props.perspective}px` }"
      tabindex="0"
      role="listbox"
      @keydown="handleKeydown"
      @pointercancel="handlePointerCancel"
      @pointerdown="handlePointerDown"
      @pointerup="handlePointerUp"
    >
      <TransitionGroup name="tm-panel">
        <div
          v-for="panel in panels"
          :id="`${listboxId}-${panel.item.id}`"
          :key="panel.item.id"
          :aria-selected="panel.active"
          :class="[
            'tm-panel absolute inset-x-0 bottom-0 overflow-hidden rounded-2xl border border-default bg-default shadow-[0_18px_45px_-20px_rgba(0,0,0,0.45)]',
            panel.active && 'is-front',
          ]"
          :style="{
            top: `${reservedTop}px`,
            zIndex: visibleCount - panel.pos,
            transform: toTransform(panel.pos),
          }"
          role="option"
        >
          <slot
            :active="panel.active"
            :index="panel.index"
            :item="panel.item"
          >
            <div class="p-6 text-sm text-muted">
              {{ panel.item.title ?? panel.item.id }}
            </div>
          </slot>
        </div>
      </TransitionGroup>
    </div>

    <div
      aria-live="polite"
      class="sr-only"
    >
      {{
        frontItem
          ? `Item ${currentIndex + 1} of ${props.items.length}`
          : 'No items'
      }}
    </div>
  </div>
</template>

<style scoped>
.tm-panel {
  transition:
    transform 250ms cubic-bezier(0.23, 1, 0.32, 1),
    opacity 250ms cubic-bezier(0.23, 1, 0.32, 1);
}

.tm-panel-enter-active,
.tm-panel-leave-active {
  transition:
    transform 250ms cubic-bezier(0.23, 1, 0.32, 1),
    opacity 250ms cubic-bezier(0.23, 1, 0.32, 1);
}

.tm-panel-enter-from,
.tm-panel-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .tm-listbox {
    perspective: none !important;
  }

  .tm-panel {
    top: 0 !important;
    transform: none !important;
    transition: none !important;
  }

  .tm-panel:not(.is-front) {
    opacity: 0 !important;
    pointer-events: none;
  }

  .tm-panel-enter-active,
  .tm-panel-leave-active {
    transition: none !important;
  }
}
</style>
