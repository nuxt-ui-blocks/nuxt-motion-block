<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="rootStyle"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <!-- Contact shadow: grows and softens as the folder opens. -->
    <motion.div
      aria-hidden="true"
      :class="ui.shadow({ class: uiProps.ui?.shadow })"
      :animate="shadowState"
      :initial="false"
      :transition="openTransition"
    />

    <!-- Back panel and tab, drawn as one path so the tab keeps clean joins. -->
    <svg
      aria-hidden="true"
      :class="ui.back({ class: uiProps.ui?.back })"
      fill="none"
      viewBox="0 0 320 250"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          :id="gradientId"
          x1="0"
          x2="0"
          y1="0"
          y2="1"
        >
          <stop
            offset="0%"
            :stop-color="skin.back"
          />
          <stop
            offset="100%"
            :stop-color="skin.backDeep"
          />
        </linearGradient>
      </defs>
      <path
        :d="BACK_PANEL_PATH"
        :fill="`url(#${gradientId})`"
      />
    </svg>

    <span
      aria-hidden="true"
      :class="ui.tabLabel({ class: uiProps.ui?.tabLabel })"
      :style="tabLabelStyle"
    >{{ label }}</span>

    <!-- The inner shadow the papers sit in. -->
    <div
      aria-hidden="true"
      :class="ui.well({ class: uiProps.ui?.well })"
      :style="{ top: `${height * RIM_RATIO}px` }"
    />

    <!-- Cards peek above the flap when closed and fan when open. -->
    <div
      :id="cardsId"
      :aria-hidden="open ? undefined : 'true'"
      :class="ui.cards({ class: uiProps.ui?.cards })"
      :style="{ bottom: `${height * CARD_BOTTOM_RATIO}px` }"
    >
      <motion.div
        v-for="(item, index) in items"
        :key="item.id"
        :class="ui.card({ class: uiProps.ui?.card })"
        :style="{
          backgroundColor: item.color,
          height: `${cardHeight}px`,
          width: `${cardWidth}px`,
          zIndex: index,
        }"
        :animate="cardState(item, index)"
        :initial="false"
        :transition="cardTransition(index)"
      >
        <slot
          name="card"
          :index="index"
          :item="item"
        >
          <span :class="ui.cardLabel({ class: uiProps.ui?.cardLabel })">{{ item.label }}</span>
        </slot>
      </motion.div>
    </div>

    <!-- Front flap. It overlaps the cards, which is what sells the illusion. -->
    <motion.button
      type="button"
      :aria-controls="cardsId"
      :aria-expanded="open"
      :aria-label="label"
      :class="ui.flap({ class: uiProps.ui?.flap })"
      :style="flapStyle"
      :animate="flapState"
      :initial="false"
      :transition="openTransition"
      @blur="onBlur"
      @click="onClick"
      @focus="onFocus"
      @keydown="onKeydown"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import folderReveal from '../theme/folder-reveal'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export type FolderRevealTrigger = 'hover' | 'click'
export type FolderRevealColor = 'manila' | 'rose' | 'blue' | 'green' | 'slate'

export interface FolderRevealItem {
  id: string
  /** Printed on the card when the `card` slot is not filled. */
  label: string
  /** Overrides the card surface. Defaults to `bg-default`. */
  color?: string
}

export interface FolderRevealProps {
  items: FolderRevealItem[]
  /** Printed on the folder's tab, and the flap's accessible name. */
  label?: string
  color?: FolderRevealColor
  /** `hover` on a mouse, tap on a touch screen. `click` everywhere. */
  trigger?: FolderRevealTrigger
  /** Folder width in pixels. Height follows the folder aspect ratio. */
  size?: number
  /** Horizontal spread between fanned cards, in pixels. */
  spread?: number
  /** Degrees of rotation applied per card as the fan spreads. */
  rotation?: number
  /** Start open. Ignored once `open` is bound. */
  defaultOpen?: boolean
  /** Controlled open state. Leave undefined to let the component own it. */
  open?: boolean
  class?: string
  ui?: Record<string, any>
}

/**
 * A folder that opens into its contents.
 *
 * The silhouette does the work: a raised tab on the back panel, a front flap
 * that tilts away on the X axis, and cards that fan out of the gap. None of it
 * is a card grid with a folder icon on top.
 *
 * `hover` is the default because reaching for a folder is a hover gesture - but
 * a touch screen has no hover, so a tap toggles there instead of leaving the
 * folder permanently shut.
 */
const props = withDefaults(defineProps<FolderRevealProps>(), {
  label: 'Folder',
  color: 'manila',
  trigger: 'hover',
  size: 260,
  spread: 62,
  rotation: 7,
  defaultOpen: false,
  open: undefined,
  class: undefined,
  ui: undefined,
})

const emit = defineEmits<{
  'update:open': [open: boolean]
}>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'folderReveal', props, theme: folderReveal })

const reducedMotion = useReducedMotion()
const uid = useId().replace(/[^\w-]/g, '')
const gradientId = `${uid}-folder`
const cardsId = `${uid}-cards`

/** Real folders are wider than tall - this ratio is what sells the silhouette. */
const ASPECT = 0.78
const RIM_RATIO = 0.132
const FLAP_TOP_RATIO = 0.44
const CARD_WIDTH_RATIO = 0.6
const CARD_HEIGHT_RATIO = 0.5
const CARD_BOTTOM_RATIO = 0.16
const FAN_LIFT_RATIO = 0.36
const CLOSED_SCALE = 0.97
const FLAP_OPEN_ROTATE_X = -32
const STAGGER_STEP = 0.035
const CLOSE_STAGGER_STEP = 0.018
const PERSPECTIVE = 1000
const SHADOW_CLOSED_OPACITY = 0.28
const SHADOW_OPEN_OPACITY = 0.55
const SHADOW_CLOSED_SCALE = 0.88
const SHADOW_OPEN_SCALE = 1.06

/**
 * Back panel silhouette drawn as one path so the raised tab keeps crisp,
 * correctly-rounded joins at any size. viewBox is 320x250 (= ASPECT).
 */
const BACK_PANEL_PATH
  = 'M 0 14 Q 0 0 14 0 L 108 0 Q 118 0 124 8 L 137 25 Q 143 33 153 33 L 306 33 Q 320 33 320 47 L 320 236 Q 320 250 306 250 L 14 250 Q 0 250 0 236 Z'

interface FolderSkin {
  back: string
  backDeep: string
  edge: string
  flap: string
  flapDeep: string
  label: string
}

/**
 * Stock colours in oklch so each variant keeps one hue across its own ramp and
 * the front flap sits a consistent step lighter than the back panel - that
 * lightness gap is what separates the two planes.
 */
const FOLDER_SKINS: Record<FolderRevealColor, FolderSkin> = {
  blue: {
    back: 'oklch(0.56 0.13 250)',
    backDeep: 'oklch(0.49 0.14 250)',
    edge: 'oklch(0.84 0.07 252)',
    flap: 'oklch(0.64 0.14 251)',
    flapDeep: 'oklch(0.57 0.15 251)',
    label: 'oklch(0.98 0.01 250)',
  },
  green: {
    back: 'oklch(0.6 0.11 155)',
    backDeep: 'oklch(0.53 0.12 155)',
    edge: 'oklch(0.86 0.06 157)',
    flap: 'oklch(0.68 0.12 156)',
    flapDeep: 'oklch(0.61 0.13 156)',
    label: 'oklch(0.99 0.01 155)',
  },
  manila: {
    back: 'oklch(0.8 0.075 82)',
    backDeep: 'oklch(0.73 0.08 79)',
    edge: 'oklch(0.96 0.035 88)',
    flap: 'oklch(0.87 0.068 85)',
    flapDeep: 'oklch(0.8 0.074 83)',
    label: 'oklch(0.4 0.05 68)',
  },
  rose: {
    back: 'oklch(0.63 0.17 352)',
    backDeep: 'oklch(0.56 0.18 352)',
    edge: 'oklch(0.87 0.08 352)',
    flap: 'oklch(0.72 0.17 352)',
    flapDeep: 'oklch(0.65 0.18 352)',
    label: 'oklch(0.99 0.01 352)',
  },
  slate: {
    back: 'oklch(0.6 0.018 262)',
    backDeep: 'oklch(0.53 0.02 262)',
    edge: 'oklch(0.87 0.01 262)',
    flap: 'oklch(0.68 0.016 262)',
    flapDeep: 'oklch(0.61 0.018 262)',
    label: 'oklch(0.99 0 0)',
  },
}

const height = computed(() => props.size * ASPECT)
const flapHeight = computed(() => height.value * (1 - FLAP_TOP_RATIO))
const cardWidth = computed(() => props.size * CARD_WIDTH_RATIO)
const cardHeight = computed(() => height.value * CARD_HEIGHT_RATIO)
const skin = computed(() => FOLDER_SKINS[props.color])

const isControlled = computed(() => props.open !== undefined)
const internalOpen = ref(props.defaultOpen)

const open = computed<boolean>({
  get: () => props.open ?? internalOpen.value,
  set: (next) => {
    if (!isControlled.value) internalOpen.value = next
    emit('update:open', next)
  },
})

const toggle = (): void => {
  open.value = !open.value
}

const rootStyle = computed(() => ({
  height: `${height.value}px`,
  perspective: reducedMotion.value === true ? undefined : `${PERSPECTIVE}px`,
  width: `${props.size}px`,
}))

const tabLabelStyle = computed(() => ({
  color: skin.value.label,
  height: `${height.value * RIM_RATIO}px`,
  maxWidth: `${props.size * 0.34}px`,
}))

const flapStyle = computed(() => ({
  backgroundImage: `linear-gradient(to bottom, ${skin.value.flap}, ${skin.value.flapDeep})`,
  boxShadow: `inset 0 1px 0 ${skin.value.edge}, 0 -2px 6px -2px rgba(0,0,0,0.18), 0 10px 22px -12px rgba(0,0,0,0.4)`,
  height: `${flapHeight.value}px`,
  transformOrigin: 'bottom',
  transformStyle: 'preserve-3d' as const,
  zIndex: 20,
}))

const shadowState = computed(() => ({
  opacity: open.value ? SHADOW_OPEN_OPACITY : SHADOW_CLOSED_OPACITY,
  scaleX: open.value ? SHADOW_OPEN_SCALE : SHADOW_CLOSED_SCALE,
}))

const flapState = computed(() => ({
  rotateX: reducedMotion.value === true ? 0 : open.value ? FLAP_OPEN_ROTATE_X : 0,
}))

const openTransition = computed(() => (reducedMotion.value === true ? { duration: 0 } : SPRING_DEFAULT))

const isTopCard = (item: FolderRevealItem): boolean => lastId.value === item.id
const lastId = computed(() => props.items[props.items.length - 1]?.id)

const cardState = (item: FolderRevealItem, index: number) => {
  const offset = index - (props.items.length - 1) / 2
  if (open.value) {
    return {
      opacity: 1,
      rotate: reducedMotion.value === true ? 0 : offset * props.rotation,
      scale: 1,
      x: reducedMotion.value === true ? 0 : offset * props.spread,
      y: reducedMotion.value === true ? 0 : -height.value * FAN_LIFT_RATIO,
    }
  }
  return {
    opacity: isTopCard(item) || reducedMotion.value === true ? 1 : 0,
    rotate: 0,
    scale: CLOSED_SCALE,
    x: 0,
    y: 0,
  }
}

const cardTransition = (index: number) => {
  if (reducedMotion.value === true) return { duration: 0 }
  const delay = open.value
    ? index * STAGGER_STEP
    : (props.items.length - 1 - index) * CLOSE_STAGGER_STEP
  return { ...SPRING_DEFAULT, delay }
}

/**
 * `hovered` records a real mouse hover. A tap on a touch screen never sets it,
 * so the click handler knows to toggle instead of assuming hover already did.
 */
const hovered = ref(false)

const onPointerEnter = (event: PointerEvent): void => {
  if (props.trigger !== 'hover' || event.pointerType !== 'mouse') return
  hovered.value = true
  open.value = true
}

const onPointerLeave = (event: PointerEvent): void => {
  if (props.trigger !== 'hover' || event.pointerType !== 'mouse') return
  hovered.value = false
  open.value = false
}

const onClick = (): void => {
  if (props.trigger === 'click' || !hovered.value) toggle()
}

const onFocus = (event: FocusEvent): void => {
  // Only keyboard focus opens it. A tap also focuses the flap, and opening there
  // would make the tap's own click close the folder again.
  if (props.trigger !== 'hover') return
  if (!(event.currentTarget instanceof HTMLElement) || !event.currentTarget.matches(':focus-visible')) return
  open.value = true
}

const onBlur = (): void => {
  if (props.trigger === 'hover') open.value = false
}

const onKeydown = (event: KeyboardEvent): void => {
  if (props.trigger !== 'hover') return
  if (event.key !== 'Enter' && event.key !== ' ') return
  // Prevented so the button does not also fire a click and toggle straight back.
  event.preventDefault()
  toggle()
}
</script>
