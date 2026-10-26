<script setup lang="ts">
import { computed, ref } from 'vue'
import { motion, useReducedMotion } from 'motion-v'

export interface PhotoStackPhoto {
  /** Accessible description of the photo. */
  alt: string
  /** Stable key. Used as the `v-for` key and in the `cycle` payload. */
  id: string
  /** Optional caption shown over the front card. */
  name?: string
  /** Optional second caption line, e.g. a role. */
  role?: string
  /** Image URL. */
  src: string
}

export interface PhotoStackProps {
  /** Extra classes for the stack wrapper. */
  class?: string
  /** Cards to stack. The first item starts on top. */
  photos: PhotoStackPhoto[]
}

const props = withDefaults(defineProps<PhotoStackProps>(), {
  class: undefined,
})

const emit = defineEmits<{
  /** Fired after the top card is sent to the back, with the new id order. */
  cycle: [order: string[]]
}>()

// Resting offset/scale per stack position (0 = front).
const POSITIONS = [
  { scale: 1, x: 0, y: 0 },
  { scale: 0.95, x: 16, y: 12 },
  { scale: 0.9, x: 32, y: 24 },
]

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const order = ref<number[]>(props.photos.map((_, index) => index))
// A real drag fires both `drag-end` and a trailing click. Without this guard a
// short drag would cycle twice and land the card in second place, not last.
let justDragged = false

const frontPhoto = computed(() => props.photos[order.value[0]])

function cycle() {
  const next = [...order.value.slice(1), order.value[0]]
  order.value = next
  emit('cycle', next.map(index => props.photos[index]!.id))
}

function onDragEnd() {
  // Any drag release sends the dragged (front) card to the back.
  justDragged = true
  cycle()
}

function onCardClick(position: number) {
  if (position !== 0) {
    return
  }

  // Swallow the click that trails a drag so it does not double-cycle.
  if (justDragged) {
    justDragged = false
    return
  }

  cycle()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    cycle()
  }
}

function positionFor(position: number) {
  return POSITIONS[Math.min(position, POSITIONS.length - 1)]!
}
</script>

<template>
  <div :class="['relative h-72 w-56 select-none', props.class]">
    <p
      class="sr-only"
      aria-live="polite"
    >
      {{ frontPhoto?.name ?? frontPhoto?.alt }} is on top. Activate to cycle the deck.
    </p>

    <motion.div
      v-for="(photoIndex, position) in order"
      :key="props.photos[photoIndex]!.id"
      :animate="{
        rotate: 0,
        scale: positionFor(position).scale,
        x: positionFor(position).x,
        y: positionFor(position).y,
      }"
      :aria-hidden="position > 0 || undefined"
      :aria-label="position === 0 ? `${props.photos[photoIndex]!.name ?? props.photos[photoIndex]!.alt} — next` : undefined"
      :class="[
        'absolute inset-0 overflow-hidden rounded-2xl border border-default bg-default shadow-[0_1px_2px_rgba(0,0,0,0.06),0_14px_32px_rgba(0,0,0,0.14)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default',
      ]"
      :drag="position === 0 && !isReduced ? 'x' : false"
      :role="position === 0 ? 'button' : undefined"
      :style="{ cursor: position === 0 ? 'grab' : 'default', zIndex: props.photos.length - position }"
      :tabindex="position === 0 ? 0 : -1"
      :transition="isReduced ? { duration: 0 } : { damping: 30, stiffness: 320, type: 'spring' }"
      drag-snap-to-origin
      @click="onCardClick(position)"
      @drag-end="onDragEnd"
      @keydown="position === 0 && onKeydown($event)"
    >
      <img
        :alt="props.photos[photoIndex]!.alt"
        class="h-full w-full object-cover object-top"
        draggable="false"
        :src="props.photos[photoIndex]!.src"
      >

      <figcaption
        v-if="props.photos[photoIndex]!.name || props.photos[photoIndex]!.role"
        :class="[
          'absolute inset-x-0 bottom-0 flex flex-col gap-px bg-linear-to-t from-black/60 to-transparent p-3.5 text-white transition-opacity',
          position > 0 && 'opacity-0',
        ]"
      >
        <span
          v-if="props.photos[photoIndex]!.name"
          class="text-sm font-semibold"
        >
          {{ props.photos[photoIndex]!.name }}
        </span>
        <span
          v-if="props.photos[photoIndex]!.role"
          class="text-xs opacity-85"
        >
          {{ props.photos[photoIndex]!.role }}
        </span>
      </figcaption>

      <span
        v-if="position > 0"
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-default"
        :style="{ opacity: position === 1 ? 0.2 : 0.36 }"
      />
    </motion.div>
  </div>
</template>
