<template>
  <div
    role="group"
    aria-label="Reactions"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <motion.button
      v-for="item in items"
      :key="item.id"
      type="button"
      :aria-label="`${item.label}, ${item.count} ${item.count === 1 ? 'reaction' : 'reactions'}`"
      :aria-pressed="item.reacted"
      :class="ui.button({ size: props.size, reacted: item.reacted, class: uiProps.ui?.button })"
      :while-press="shouldReduceMotion ? undefined : { scale: PRESS_SCALE }"
      @click="handleReactionClick(item.id)"
    >
      <span :class="ui.emojiWrap({ class: uiProps.ui?.emojiWrap })">
        <span
          :ref="(el) => setEmojiElement(item.id, el)"
          aria-hidden="true"
          :class="ui.emoji({ size: props.size, class: uiProps.ui?.emoji })"
        >{{ item.emoji }}</span>
        <span
          v-if="burstSeeds.get(item.id)"
          :key="`burst-${burstSeeds.get(item.id)}`"
          aria-hidden="true"
          :class="ui.burst({ class: uiProps.ui?.burst })"
        >
          <motion.span
            :class="ui.burstRing({ class: uiProps.ui?.burstRing })"
            :initial="{ opacity: 0.7, scale: 0.4 }"
            :animate="{ opacity: 0, scale: 1.9 }"
            :transition="{ duration: BURST_DURATION_S, ease: EASE_OUT }"
          />
          <motion.span
            v-for="particle in burstParticles.get(item.id) ?? []"
            :key="particle.id"
            :class="ui.burstParticle({ class: uiProps.ui?.burstParticle })"
            :initial="{ opacity: particle.opacity, scale: 1, x: 0, y: 0 }"
            :animate="{ opacity: 0, scale: 0.4, x: particle.x, y: particle.y }"
            :transition="{ duration: BURST_DURATION_S, ease: EASE_OUT }"
            :style="{ height: `${particle.size}px`, width: `${particle.size}px` }"
          />
        </span>
      </span>
      <span
        aria-hidden="true"
        :class="ui.countWrap({ class: uiProps.ui?.countWrap })"
      >
        <AnimatePresence
          :initial="false"
          :custom="item.direction"
          mode="popLayout"
        >
          <motion.span
            :key="item.count"
            :class="ui.count({ class: uiProps.ui?.count })"
            :custom="item.direction"
            initial="enter"
            animate="center"
            exit="exit"
            :transition="shouldReduceMotion ? INSTANT : SPRING"
            :variants="shouldReduceMotion ? DIGIT_VARIANTS_REDUCED : DIGIT_VARIANTS"
          >{{ item.count }}</motion.span>
        </AnimatePresence>
      </span>
    </motion.button>

    <div
      v-if="props.showPicker"
      :ref="setPickerContainer"
      :class="ui.pickerWrapper({ class: uiProps.ui?.pickerWrapper })"
      @mouseenter="handlePickerMouseEnter"
      @mouseleave="handlePickerMouseLeave"
    >
      <motion.button
        :ref="setPickerTrigger"
        type="button"
        :aria-expanded="isPickerOpen"
        aria-haspopup="menu"
        :aria-controls="menuId"
        aria-label="More reactions"
        :class="ui.trigger({ size: props.size, class: uiProps.ui?.trigger })"
        :while-press="shouldReduceMotion ? undefined : { scale: PRESS_SCALE }"
        @click="togglePicker"
        @keydown="handleTriggerKeydown"
      >
        <UIcon
          name="i-lucide-smile-plus"
          :class="ui.triggerIcon({ class: uiProps.ui?.triggerIcon })"
          aria-hidden="true"
        />
        <span :class="ui.srOnly({ class: uiProps.ui?.srOnly })">More reactions</span>
      </motion.button>

      <AnimatePresence>
        <span
          v-if="isPickerOpen"
          key="picker"
          :class="ui.pickerPanel({ class: uiProps.ui?.pickerPanel })"
        >
          <motion.div
            :id="menuId"
            role="menu"
            :class="ui.menu({ class: uiProps.ui?.menu })"
            :style="{ transformOrigin: 'bottom center' }"
            initial="closed"
            animate="open"
            exit="closed"
            :variants="shouldReduceMotion ? MENU_VARIANTS_REDUCED : MENU_VARIANTS"
          >
            <motion.button
              v-for="(emoji, index) in props.pickerEmojis"
              :key="emoji"
              :ref="(el) => setPickerItemElement(index, el)"
              type="button"
              role="menuitem"
              :aria-label="`React with ${emoji}`"
              :tabindex="activeIndex === index ? 0 : -1"
              :class="ui.menuItem({ class: uiProps.ui?.menuItem })"
              :variants="shouldReduceMotion ? MENU_ITEM_VARIANTS_REDUCED : MENU_ITEM_VARIANTS"
              @click="handlePickerItemClick(emoji)"
              @keydown="handlePickerItemKeydown($event, index)"
            >{{ emoji }}</motion.button>
          </motion.div>
        </span>
      </AnimatePresence>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { computed, onBeforeUnmount, onMounted, reactive, ref, useId, watch } from 'vue'
import { AnimatePresence, motion, useAnimate, useReducedMotion } from 'motion-v'
import { useHoverCapable } from '../composables/useHoverCapable'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import emojiReaction from '../theme/emoji-reaction'

interface BurstParticle {
  id: string
  opacity: number
  size: number
  x: number
  y: number
}

const BURST_ANGLE_JITTER_DEG = 22
const BURST_DISTANCE_MIN_PX = 22
const BURST_DISTANCE_RANGE_PX = 18
const BURST_DURATION_S = 0.55
const BURST_DOT_MIN_PX = 3
const BURST_DOT_RANGE_PX = 3
const BURST_OPACITY_MIN = 0.45
const BURST_OPACITY_RANGE = 0.55
const ODOMETER_OFFSET_PX = 12
const CLOSE_DELAY_MS = 140
const STAGGER_S = 0.03
const PRESS_SCALE = 0.97
const POP_SCALE = 0.7
const POP_OFFSET_PX = 2
const EASE_OUT = [0.23, 1, 0.32, 1] as const
const LCG_MULTIPLIER = 1_664_525
const LCG_INCREMENT = 1_013_904_223
const UINT32_MAX = 0xFF_FF_FF_FF
const DEGREES_PER_TURN = 360
const DEGREES_TO_RADIANS = Math.PI / 180

const SPRING = { bounce: 0.1, duration: 0.25, type: 'spring' } as const
const POP_SPRING = { bounce: 0.4, duration: 0.4 } as const
const INSTANT = { duration: 0 }

const MENU_VARIANTS = {
  closed: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.15, ease: EASE_OUT },
    y: 6,
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: { ...SPRING, staggerChildren: STAGGER_S },
    y: 0,
  },
}

const MENU_VARIANTS_REDUCED = {
  closed: { opacity: 0, transition: INSTANT },
  open: { opacity: 1, transition: INSTANT },
}

const MENU_ITEM_VARIANTS = {
  closed: { opacity: 0, scale: 0.9 },
  open: { opacity: 1, scale: 1 },
}

const MENU_ITEM_VARIANTS_REDUCED = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
}

const DIGIT_VARIANTS = {
  center: { opacity: 1, y: 0 },
  enter: (custom: unknown) => ({
    opacity: 0,
    y: Number(custom) * ODOMETER_OFFSET_PX,
  }),
  exit: (custom: unknown) => ({
    opacity: 0,
    y: -Number(custom) * ODOMETER_OFFSET_PX,
  }),
}

const DIGIT_VARIANTS_REDUCED = {
  center: { opacity: 1 },
  enter: { opacity: 0 },
  exit: { opacity: 0 },
}

/** Deterministic seeded jitter — no `Math.random()`, called from the click handler. */
function createBurstParticles(count: number, seed: number): BurstParticle[] {
  let state = seed
  const next = () => {
    state = (state * LCG_MULTIPLIER + LCG_INCREMENT) >>> 0
    return state / UINT32_MAX
  }
  return Array.from({ length: count }, (_, index) => {
    const baseAngle = (DEGREES_PER_TURN / count) * index
    const jitter = (next() - 0.5) * BURST_ANGLE_JITTER_DEG
    const angle = (baseAngle + jitter) * DEGREES_TO_RADIANS
    const distance = BURST_DISTANCE_MIN_PX + next() * BURST_DISTANCE_RANGE_PX
    return {
      id: `${seed}-${index}`,
      opacity: BURST_OPACITY_MIN + next() * BURST_OPACITY_RANGE,
      size: BURST_DOT_MIN_PX + Math.round(next() * BURST_DOT_RANGE_PX),
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    }
  })
}

const props = withDefaults(defineProps<Props>(), {
  allowMultiple: false,
  burst: true,
  burstCount: DEFAULT_BURST_COUNT,
  class: undefined,
  defaultPickerOpen: false,
  pickerEmojis: () => [...DEFAULT_PICKER_EMOJIS],
  showPicker: false,
  size: 'md',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'emojiReaction',
  props,
  theme: emojiReaction,
})

const emit = defineEmits<{
  react: [id: string, reacted: boolean]
}>()

const shouldReduceMotion = useReducedMotion()

const [, animateEmoji] = useAnimate<HTMLElement>()
const emojiElements = new Map<string, HTMLElement | null>()
const burstSeeds = reactive(new Map<string, number>())

const burstParticles = computed(() => {
  const particles = new Map<string, BurstParticle[]>()
  for (const [id, seed] of burstSeeds) {
    particles.set(id, createBurstParticles(props.burstCount, seed))
  }
  return particles
})

function setEmojiElement(id: string, el: Element | ComponentPublicInstance | null): void {
  emojiElements.set(id, resolveElement(el))
}

const burstTimers = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * The layer is unmounted on a timer rather than on the ring's animation
 * completion: motion-v re-runs `animateUpdates` on every re-render and resolves
 * immediately when the target is unchanged, so `onAnimationComplete` would
 * unmount the burst before it is ever visible (React's framer-motion skips
 * re-animating an unchanged target).
 */
function clearBurst(id: string): void {
  const timer = burstTimers.get(id)
  if (timer !== undefined) {
    clearTimeout(timer)
    burstTimers.delete(id)
  }
  burstSeeds.delete(id)
}

function startBurst(id: string): void {
  burstSeeds.set(id, (burstSeeds.get(id) ?? 0) + 1)
  const pending = burstTimers.get(id)
  if (pending !== undefined) {
    clearTimeout(pending)
  }
  burstTimers.set(id, setTimeout(() => clearBurst(id), BURST_DURATION_S * 1000))
}

function clearAllBursts(): void {
  for (const timer of burstTimers.values()) {
    clearTimeout(timer)
  }
  burstTimers.clear()
}

const digitDirections = reactive(new Map<string, number>())
const previousCounts = new Map<string, number>()

watch(
  () => props.reactions.map(reaction => `${reaction.id}:${reaction.count ?? 0}`),
  () => {
    for (const reaction of props.reactions) {
      const count = reaction.count ?? 0
      const previous = previousCounts.get(reaction.id)
      digitDirections.set(reaction.id, previous !== undefined && count < previous ? -1 : 1)
      previousCounts.set(reaction.id, count)
    }
  },
  { immediate: true },
)

const items = computed(() => props.reactions.map(reaction => ({
  count: reaction.count ?? 0,
  direction: digitDirections.get(reaction.id) ?? 1,
  emoji: reaction.emoji,
  id: reaction.id,
  label: reaction.label,
  reacted: Boolean(reaction.reacted),
})))

function handleReact(id: string): void {
  const target = props.reactions.find(reaction => reaction.id === id)
  if (!target) {
    return
  }
  const nextReacted = !target.reacted
  if (!props.allowMultiple && nextReacted) {
    for (const other of props.reactions) {
      if (other.id !== id && other.reacted) {
        emit('react', other.id, false)
      }
    }
  }
  emit('react', id, nextReacted)
}

function handleReactionClick(id: string): void {
  const reacted = items.value.find(item => item.id === id)?.reacted
  if (reacted === undefined) {
    return
  }
  const nextReacted = !reacted
  handleReact(id)
  if (!nextReacted) {
    return
  }
  // The pop is driven imperatively so a press animates the one emoji element
  // that already exists. Remounting it on every press (via a changing `key`)
  // left the previous node stranded in the DOM.
  const emoji = emojiElements.get(id)
  if (!shouldReduceMotion.value && emoji) {
    animateEmoji(emoji, { scale: [POP_SCALE, 1], y: [POP_OFFSET_PX, 0] }, { ...POP_SPRING })
  }
  if (props.burst && !shouldReduceMotion.value) {
    startBurst(id)
  }
}

/**
 * A picked emoji that already exists in the bar toggles that reaction so the
 * exclusivity rule still applies; anything else is reported as new.
 */
function handlePickerSelect(emoji: string): void {
  const existing = props.reactions.find(reaction => reaction.id === emoji || reaction.emoji === emoji)
  if (existing) {
    if (!existing.reacted) {
      handleReact(existing.id)
    }
    return
  }
  emit('react', emoji, true)
}

const menuId = useId()
const isPickerOpen = ref(props.defaultPickerOpen)
const activeIndex = ref(0)
const isHoverCapable = useHoverCapable()
const pickerContainer = ref<HTMLElement | null>(null)
const pickerTrigger = ref<HTMLElement | null>(null)
const pickerItemElements: (HTMLElement | null)[] = []
let closeTimer: ReturnType<typeof setTimeout> | null = null
let shouldFocusAfterOpen = false

/**
 * `motion.*` components hand function refs a component instance, so the DOM
 * node has to be pulled off `$el` before it can be focused or animated.
 */
function resolveElement(el: Element | ComponentPublicInstance | null): HTMLElement | null {
  if (!el) {
    return null
  }
  if (el instanceof HTMLElement) {
    return el
  }
  const root = (el as ComponentPublicInstance).$el
  return root instanceof HTMLElement ? root : null
}

function setPickerContainer(el: Element | ComponentPublicInstance | null): void {
  pickerContainer.value = resolveElement(el)
}

function setPickerTrigger(el: Element | ComponentPublicInstance | null): void {
  pickerTrigger.value = resolveElement(el)
}

function setPickerItemElement(index: number, el: Element | ComponentPublicInstance | null): void {
  pickerItemElements[index] = resolveElement(el)
}

function clearCloseTimer(): void {
  if (closeTimer !== null) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

function openPicker(withFocus: boolean): void {
  clearCloseTimer()
  shouldFocusAfterOpen = withFocus
  isPickerOpen.value = true
}

function closePicker(returnFocus: boolean): void {
  clearCloseTimer()
  isPickerOpen.value = false
  if (returnFocus) {
    pickerTrigger.value?.focus()
  }
}

/**
 * A delayed close keeps the popover alive while the pointer crosses the gap
 * between the trigger and the card, which is what causes flicker.
 */
function scheduleClose(): void {
  clearCloseTimer()
  closeTimer = setTimeout(() => {
    isPickerOpen.value = false
  }, CLOSE_DELAY_MS)
}

function togglePicker(): void {
  if (isPickerOpen.value) {
    closePicker(false)
    return
  }
  openPicker(true)
}

function handlePickerMouseEnter(): void {
  if (isHoverCapable.value) {
    openPicker(false)
  }
}

function handlePickerMouseLeave(): void {
  if (isHoverCapable.value) {
    scheduleClose()
  }
}

function handleTriggerKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    openPicker(true)
  }
}

function focusItem(index: number): void {
  activeIndex.value = index
  pickerItemElements[index]?.focus()
}

function handlePickerItemKeydown(event: KeyboardEvent, index: number): void {
  const total = props.pickerEmojis.length
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    focusItem((index + 1) % total)
    return
  }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    focusItem((index - 1 + total) % total)
    return
  }
  if (event.key === 'Escape') {
    closePicker(true)
    return
  }
  if (event.key === 'Tab') {
    closePicker(false)
  }
}

function handlePickerItemClick(emoji: string): void {
  handlePickerSelect(emoji)
  closePicker(true)
}

/** Only a keyboard or click open moves focus — hovering must never steal it. */
watch(isPickerOpen, (isOpen) => {
  if (!isOpen || !shouldFocusAfterOpen) {
    return
  }
  shouldFocusAfterOpen = false
  focusItem(0)
}, { flush: 'post' })

function handleDocumentPointerDown(event: PointerEvent): void {
  if (!pickerContainer.value?.contains(event.target as Node)) {
    closePicker(false)
  }
}

function handleDocumentKeydown(event: globalThis.KeyboardEvent): void {
  if (event.key === 'Escape') {
    closePicker(true)
  }
}

function addDocumentListeners(): void {
  document.addEventListener('pointerdown', handleDocumentPointerDown)
  document.addEventListener('keydown', handleDocumentKeydown)
}

function removeDocumentListeners(): void {
  document.removeEventListener('pointerdown', handleDocumentPointerDown)
  document.removeEventListener('keydown', handleDocumentKeydown)
}

function syncDocumentListeners(): void {
  if (isPickerOpen.value) {
    addDocumentListeners()
    return
  }
  removeDocumentListeners()
}

watch(isPickerOpen, syncDocumentListeners)

onMounted(() => {
  syncDocumentListeners()
})

onBeforeUnmount(() => {
  clearCloseTimer()
  clearAllBursts()
  removeDocumentListeners()
})
</script>

<script lang="ts">
// Kept in a normal script so the hoisted `defineProps()` defaults can reference
// these module-scope constants, and so consumers can import the public types.
const DEFAULT_BURST_COUNT = 10
const DEFAULT_PICKER_EMOJIS = ['🎉', '🔥', '😍', '👀', '🚀', '💯']

export type EmojiReactionSize = 'sm' | 'md' | 'lg'

export type EmojiReactionItem = {
  count?: number
  emoji: string
  id: string
  label: string
  reacted?: boolean
}

export interface Props {
  /** When false (default), reacting to one item clears any other active reaction. */
  allowMultiple?: boolean
  /** Emits a particle burst when a reaction is selected. */
  burst?: boolean
  burstCount?: number
  class?: string
  /** Renders the picker popover already open. Useful for docs and screenshots. */
  defaultPickerOpen?: boolean
  /** Extra emojis offered by the picker popover. */
  pickerEmojis?: string[]
  reactions: EmojiReactionItem[]
  /** Shows a hover/focus popover with extra reaction options. */
  showPicker?: boolean
  size?: EmojiReactionSize
  ui?: Record<string, any>
}
</script>
