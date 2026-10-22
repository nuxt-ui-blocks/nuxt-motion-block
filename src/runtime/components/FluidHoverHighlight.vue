<template>
  <div
    ref="hostRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @pointerleave="hide"
    @pointerover="onPointerOver"
  >
    <slot />

    <AnimatePresence :initial="false">
      <motion.div
        v-if="rect"
        aria-hidden="true"
        :class="ui.highlight({ class: uiProps.ui?.highlight })"
        :initial="initial"
        :animate="animate"
        :exit="exit"
        :transition="transition"
      />
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import fluidHoverHighlight from '../theme/fluid-hover-highlight'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export interface FluidHoverHighlightProps {
  /** Snap the highlight into place instead of springing to it. */
  snap?: boolean
  class?: string
  ui?: Record<string, any>
}

interface HighlightRect {
  height: number
  width: number
  x: number
  y: number
}

/**
 * One highlight that travels between the rows of a list.
 *
 * The rows keep their own hover styling; this is the plate underneath them.
 * Mark the rows with `data-fluid-item` and the component measures whichever one
 * the pointer or the keyboard lands on - no per-row refs, no index bookkeeping,
 * and it keeps working when the list reorders.
 *
 * It follows focus as well as the pointer. A highlight that only moves under the
 * mouse is a lie for anyone navigating with Tab.
 */
const props = withDefaults(defineProps<FluidHoverHighlightProps>(), {
  snap: false,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'fluidHoverHighlight', props, theme: fluidHoverHighlight })

const reducedMotion = useReducedMotion()
const hostRef = ref<HTMLElement | null>(null)
const rect = ref<HighlightRect | null>(null)
const activeItem = ref<HTMLElement | null>(null)

const ITEM_SELECTOR = '[data-fluid-item]'
const FADE_MS = 80

const measure = (item: HTMLElement): void => {
  const host = hostRef.value
  if (!host) return
  const hostRect = host.getBoundingClientRect()
  const itemRect = item.getBoundingClientRect()
  rect.value = {
    x: itemRect.left - hostRect.left,
    y: itemRect.top - hostRect.top,
    width: itemRect.width,
    height: itemRect.height,
  }
}

const show = (item: HTMLElement): void => {
  if (activeItem.value === item && rect.value) return
  activeItem.value = item
  measure(item)
}

const hide = (): void => {
  activeItem.value = null
  rect.value = null
}

/** The nearest marked row, but only one that actually lives in this list. */
const itemFrom = (event: Event): HTMLElement | null => {
  const target = event.target
  const host = hostRef.value
  if (!(target instanceof Element) || !host) return null
  const item = target.closest<HTMLElement>(ITEM_SELECTOR)
  return item && host.contains(item) ? item : null
}

const onPointerOver = (event: PointerEvent): void => {
  // Touch pointers fire a hover on contact that never ends; the plate would
  // stick to the last row the finger crossed.
  if (event.pointerType === 'touch') return
  const item = itemFrom(event)
  if (item) show(item)
}

const onFocusIn = (event: FocusEvent): void => {
  const item = itemFrom(event)
  if (item) show(item)
}

const onFocusOut = (event: FocusEvent): void => {
  const next = event.relatedTarget
  if (next instanceof Node && hostRef.value?.contains(next)) return
  hide()
}

const animate = computed(() => ({
  height: rect.value?.height ?? 0,
  opacity: 1,
  width: rect.value?.width ?? 0,
  x: rect.value?.x ?? 0,
  y: rect.value?.y ?? 0,
}))

/** A fresh plate fades in where it was summoned; a moving one slides. */
const initial = computed(() => ({
  height: rect.value?.height ?? 0,
  opacity: 0,
  width: rect.value?.width ?? 0,
  x: rect.value?.x ?? 0,
  y: rect.value?.y ?? 0,
}))

const exit = computed(() =>
  reducedMotion.value === true
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, transition: { duration: FADE_MS / 1000 } },
)

const transition = computed(() => {
  if (props.snap || reducedMotion.value === true) {
    return { duration: 0 }
  }
  // The fade is always short: a travelling highlight that also dissolves reads
  // as a rendering bug, while a plate that appears instantly reads as a jump.
  return { ...SPRING_DEFAULT, opacity: { duration: FADE_MS / 1000 } }
})

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    const item = activeItem.value
    if (!item || !item.isConnected) {
      // The measured row was removed while it was highlighted.
      if (item) hide()
      return
    }
    measure(item)
  })
  if (hostRef.value) resizeObserver.observe(hostRef.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>
