<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion-v'
import { useMediaQuery } from '@vueuse/core'

export interface HoverImageListItem {
  /** Accessible description of the preview image. */
  alt: string
  /** Turns the row into a link instead of a button. */
  href?: string
  /** Stable key and the key used to crossfade previews. */
  id: string
  /** Preview image URL. */
  image: string
  /** Optional second line under the title. */
  meta?: string
  /** Visible row label. */
  title: string
}

export type HoverImageListRevealMode = 'cursor' | 'fixed'

export interface HoverImageListProps {
  /** Extra classes for the list wrapper. */
  class?: string
  /** Let the preview follow the pointer. When `false` it stays where it was first shown. */
  follow?: boolean
  /** Edge length of the preview in pixels. */
  imageSize?: number
  /** Rows to render. */
  items: HoverImageListItem[]
  /** `cursor` follows the pointer, `fixed` pins the preview to the right edge. */
  revealMode?: HoverImageListRevealMode
}

const props = withDefaults(defineProps<HoverImageListProps>(), {
  class: undefined,
  follow: true,
  imageSize: 240,
  revealMode: 'cursor',
})

const SPRING_CONFIG = { damping: 26, stiffness: 260 }
const SKEW_SPRING_CONFIG = { damping: 18, stiffness: 220 }
const MAX_SKEW = 8
const SKEW_FACTOR = 0.12
const MAX_FRAME_DELTA_MS = 50

type ActivationSource = 'focus' | 'pointer' | null

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)
const isHoverDevice = useMediaQuery('(hover: hover) and (pointer: fine)')

const activeIndex = ref<number | null>(null)
const activationSource = ref<ActivationSource>(null)
const containerRef = ref<HTMLElement | null>(null)

const x = useMotionValue(0)
const y = useMotionValue(0)
const skew = useMotionValue(0)
const springX = useSpring(x, SPRING_CONFIG)
const springY = useSpring(y, SPRING_CONFIG)
const springSkew = useSpring(skew, SKEW_SPRING_CONFIG)

const lastPointer = ref<{ t: number, x: number, y: number } | null>(null)
let pendingPointer: { x: number, y: number } | null = null
let frameRequested = false
let rafId: number | null = null

const isFixedPosition = computed(
  () =>
    isReduced.value
    || !isHoverDevice.value
    || activationSource.value === 'focus'
    || props.revealMode === 'fixed',
)

const activeItem = computed(() =>
  activeIndex.value === null ? null : props.items[activeIndex.value] ?? null,
)

function activateRow(index: number, source: ActivationSource) {
  activeIndex.value = index
  activationSource.value = source
}

function deactivateRow(source: ActivationSource) {
  activeIndex.value = null
  if (activationSource.value === source) {
    activationSource.value = null
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function onPointerMove(event: PointerEvent) {
  if (isFixedPosition.value) {
    return
  }

  pendingPointer = { x: event.clientX, y: event.clientY }

  if (frameRequested) {
    return
  }

  frameRequested = true
  rafId = requestAnimationFrame((now) => {
    frameRequested = false
    const pending = pendingPointer
    const container = containerRef.value
    if (!pending || !container) {
      return
    }

    const rect = container.getBoundingClientRect()
    const localX = pending.x - rect.left
    const localY = pending.y - rect.top

    if (props.follow) {
      let vx = 0
      if (lastPointer.value) {
        const dt = Math.min(now - lastPointer.value.t, MAX_FRAME_DELTA_MS)
        if (dt > 0) {
          vx = (localX - lastPointer.value.x) / dt
        }
      }
      lastPointer.value = { t: now, x: localX, y: localY }
      skew.set(clamp(vx * SKEW_FACTOR, -MAX_SKEW, MAX_SKEW))
    }

    x.set(localX - props.imageSize / 2)
    y.set(localY - props.imageSize / 2)
  })
}

function onListPointerLeave() {
  deactivateRow('pointer')
  lastPointer.value = null
}

function onListBlur(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (activationSource.value === 'focus' && !containerRef.value?.contains(next)) {
    deactivateRow('focus')
  }
}

const previewStyle = computed(() =>
  isFixedPosition.value
    ? { height: `${props.imageSize}px`, width: `${props.imageSize}px` }
    : {
        height: `${props.imageSize}px`,
        left: '0px',
        top: '0px',
        width: `${props.imageSize}px`,
        x: props.follow ? springX : x,
        y: props.follow ? springY : y,
      },
)

const previewSkew = computed(() => (isReduced.value || isFixedPosition.value ? 0 : springSkew))

const previewTransition = computed(() =>
  isReduced.value ? { duration: 0 } : { bounce: 0.1, duration: 0.25, type: 'spring' as const },
)

watch(
  () => props.items.length,
  () => {
    activeIndex.value = null
    activationSource.value = null
  },
)

onBeforeUnmount(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
})
</script>

<template>
  <div
    ref="containerRef"
    :class="['relative', props.class]"
    @blur="onListBlur"
    @pointerleave="onListPointerLeave"
    @pointermove="onPointerMove"
  >
    <ul class="flex flex-col">
      <li
        v-for="(item, index) in props.items"
        :key="item.id"
        class="border-b border-default last:border-b-0"
      >
        <component
          :is="item.href ? 'a' : 'button'"
          :href="item.href"
          :type="item.href ? undefined : 'button'"
          class="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200"
          @focus="activateRow(index, 'focus')"
          @mouseenter="isHoverDevice && activateRow(index, 'pointer')"
        >
          <span class="flex flex-col gap-1">
            <span
              class="text-lg font-medium text-highlighted transition-colors duration-200 group-hover:text-primary"
            >
              {{ item.title }}
            </span>
            <span
              v-if="item.meta"
              class="text-sm text-muted"
            >
              {{ item.meta }}
            </span>
          </span>
          <UIcon
            aria-hidden="true"
            class="size-4 shrink-0 text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            name="i-lucide-arrow-up-right"
          />
        </component>
      </li>
    </ul>

    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        :animate="{
          opacity: activeItem ? 1 : 0,
          scale: activeItem || isReduced ? 1 : 0.94,
        }"
        :class="[
          'absolute overflow-hidden rounded-2xl shadow-xl',
          isFixedPosition && 'top-1/2 right-6 -translate-y-1/2',
        ]"
        :initial="{ opacity: 0, scale: isReduced ? 1 : 0.94 }"
        :style="{ ...previewStyle, skewX: previewSkew }"
        :transition="previewTransition"
      >
        <AnimatePresence :initial="false">
          <motion.img
            v-if="activeItem"
            :key="activeItem.id"
            :alt="activeItem.alt"
            :animate="isReduced ? { opacity: 1 } : { opacity: 1, scale: 1 }"
            class="absolute inset-0 h-full w-full object-cover"
            :exit="isReduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.96 }"
            :initial="isReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }"
            :src="activeItem.image"
            :transition="previewTransition"
          />
        </AnimatePresence>
      </motion.div>
    </div>
  </div>
</template>
