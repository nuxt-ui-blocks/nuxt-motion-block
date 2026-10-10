<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { motion, useReducedMotion, type PanInfo, type VariantType } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import coverflowCarousel from '../theme/coverflow-carousel'

defineOptions({ inheritAttrs: false })

interface CoverflowItem {
  alt?: string
  content?: string
  id: string
  image?: string
}

const props = withDefaults(defineProps<{
  autoplay?: boolean
  autoplayDelay?: number
  class?: string
  ui?: Record<string, any>
  depth?: number
  index?: number
  inverted?: boolean
  items?: CoverflowItem[]
  loop?: boolean
  rotation?: number
  scaleStep?: number
  spacing?: number
}>(), {
  autoplay: false,
  autoplayDelay: 4000,
  class: undefined,
  ui: undefined,
  depth: 180,
  inverted: false,
  items: () => [],
  loop: false,
  rotation: 45,
  scaleStep: 0.15,
  spacing: 220,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'coverflowCarousel',
  props,
  theme: coverflowCarousel,
})

const emit = defineEmits<{
  'update:index': [index: number]
}>()

const MAX_VISIBLE_OFFSET = 3
const MIN_SCALE = 0.4
const SWIPE_VELOCITY_THRESHOLD = 500
const SWIPE_DISTANCE_THRESHOLD = 80

const reducedMotion = useReducedMotion()

const total = computed(() => props.items.length)
const isControlled = computed(() => props.index !== undefined)
const internalIndex = ref(0)
const activeIndex = computed(() => (isControlled.value ? (props.index ?? 0) : internalIndex.value))
const isPaused = ref(false)

const regionRef = ref<HTMLElement | null>(null)

function goTo(next: number) {
  if (!total.value) {
    return
  }
  let clamped = next
  if (props.loop) {
    clamped = ((next % total.value) + total.value) % total.value
  }
  else {
    clamped = Math.min(Math.max(next, 0), total.value - 1)
  }
  if (!isControlled.value) {
    internalIndex.value = clamped
  }
  emit('update:index', clamped)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    goTo(activeIndex.value - 1)
  }
  else if (event.key === 'ArrowRight') {
    event.preventDefault()
    goTo(activeIndex.value + 1)
  }
}

function onDragEnd(_event: PointerEvent, info: PanInfo) {
  if (info.offset.x < -SWIPE_DISTANCE_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
    goTo(activeIndex.value + 1)
  }
  else if (info.offset.x > SWIPE_DISTANCE_THRESHOLD || info.velocity.x > SWIPE_VELOCITY_THRESHOLD) {
    goTo(activeIndex.value - 1)
  }
}

function onVisibilityChange() {
  isPaused.value = document.hidden
}

let autoplayTimer: ReturnType<typeof setInterval> | null = null

function clearAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function setupAutoplay() {
  clearAutoplay()
  if (import.meta.server) {
    return
  }
  if (props.autoplay && !reducedMotion.value && !isPaused.value && total.value > 1) {
    autoplayTimer = setInterval(() => goTo(activeIndex.value + 1), props.autoplayDelay)
  }
}

watch([() => props.autoplay, () => props.autoplayDelay, reducedMotion, isPaused, activeIndex], setupAutoplay, { immediate: true })
watch(() => props.loop, () => setupAutoplay())

onBeforeUnmount(() => {
  clearAutoplay()
  document.removeEventListener('visibilitychange', onVisibilityChange)
})

watch(regionRef, (node) => {
  if (node) {
    document.addEventListener('visibilitychange', onVisibilityChange)
  }
}, { flush: 'post' })

function getOffset(index: number) {
  return index - activeIndex.value
}

function isActive(index: number) {
  return getOffset(index) === 0
}

function isVisible(index: number) {
  return Math.abs(getOffset(index)) <= MAX_VISIBLE_OFFSET
}

function slideAnimate(index: number): VariantType {
  const offset = getOffset(index)
  const direction = props.inverted ? -1 : 1
  const x = offset * props.spacing
  if (reducedMotion.value) {
    return { opacity: offset === 0 ? 1 : 0, x, transition: { duration: 0 } }
  }
  const abs = Math.abs(offset)
  return {
    opacity: 1,
    rotateY: direction * -offset * props.rotation,
    scale: Math.max(1 - abs * props.scaleStep, MIN_SCALE),
    x,
    z: -abs * props.depth,
    transition: { type: 'spring', bounce: 0.1, duration: 0.25 },
  }
}
</script>

<template>
  <div
    ref="regionRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    role="region"
    aria-label="Coverflow carousel"
    aria-roledescription="carousel"
    :style="{ perspective: reducedMotion ? undefined : '1200px' }"
    :tabindex="0"
    @blur="isPaused = false"
    @focus="isPaused = true"
    @keydown="onKeydown"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <motion.div
      :class="ui.stage({ class: uiProps.ui?.stage })"
      :drag="total > 1 && !reducedMotion ? 'x' : false"
      :drag-constraints="{ left: 0, right: 0 }"
      :drag-elastic="0.12"
      style="transform-style: preserve-3d;"
      @drag-end="onDragEnd"
    >
      <motion.div
        v-for="(item, i) in props.items"
        v-show="isVisible(i)"
        :key="item.id"
        :class="ui.card({ class: uiProps.ui?.card })"
        :aria-hidden="!isActive(i)"
        :style="{ transformStyle: 'preserve-3d', zIndex: total - Math.abs(getOffset(i)) }"
        :animate="slideAnimate(i)"
      >
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.alt ?? ''"
          :class="ui.image({ class: uiProps.ui?.image })"
          draggable="false"
        >
        <div
          v-else
          :class="ui.content({ class: uiProps.ui?.content })"
        >
          {{ item.content }}
        </div>
      </motion.div>
    </motion.div>

    <div :class="ui.controls({ class: uiProps.ui?.controls })">
      <button
        type="button"
        :class="ui.button({ class: uiProps.ui?.button })"
        :disabled="!props.loop && activeIndex === 0"
        aria-label="Previous slide"
        @click="goTo(activeIndex - 1)"
      >
        Prev
      </button>
      <button
        type="button"
        :class="ui.button({ class: uiProps.ui?.button })"
        :disabled="!props.loop && activeIndex === total - 1"
        aria-label="Next slide"
        @click="goTo(activeIndex + 1)"
      >
        Next
      </button>
    </div>

    <div
      :class="ui.status({ class: uiProps.ui?.status })"
      aria-live="polite"
    >
      Slide {{ activeIndex + 1 }} of {{ total }}
    </div>
  </div>
</template>
