<template>
  <div
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @focusout="onFocusOut"
  >
    <p :class="ui.text({ class: uiProps.ui?.text })">
      <template
        v-for="(segment, index) in segments"
        :key="`${segment.type}-${index}`"
      >
        <template v-if="segment.type === 'text'">
          {{ segment.value }}
        </template>

        <button
          v-else-if="testimonialFor(segment.id)"
          :id="triggerId(segment.id)"
          :ref="el => setTrigger(segment.id, el)"
          type="button"
          :aria-controls="cardId(segment.id)"
          :aria-expanded="activeId === segment.id"
          :class="ui.trigger({ class: uiProps.ui?.trigger })"
          @blur="onTriggerBlur"
          @click="onTriggerClick(segment.id)"
          @focus="onTriggerFocus($event, segment.id)"
          @pointerenter="onTriggerEnter($event, segment.id)"
          @pointerleave="onTriggerLeave"
        >
          <img
            v-if="testimonialFor(segment.id)?.avatar"
            alt=""
            :class="ui.avatar({ class: [activeId === segment.id && 'ring-primary', uiProps.ui?.avatar] })"
            :height="avatarSize"
            :src="testimonialFor(segment.id)?.avatar"
            :style="{ height: `${avatarSize}px`, width: `${avatarSize}px` }"
            :width="avatarSize"
          >
          <span
            v-else
            aria-hidden="true"
            :class="ui.initials({ class: [activeId === segment.id && 'ring-primary', uiProps.ui?.initials] })"
            :style="{ fontSize: `${Math.round(avatarSize * 0.4)}px`, height: `${avatarSize}px`, width: `${avatarSize}px` }"
          >{{ initials(testimonialFor(segment.id)?.name ?? '') }}</span>

          <span :class="ui.name({ class: [activeId === segment.id && 'border-primary', uiProps.ui?.name] })">
            {{ testimonialFor(segment.id)?.name }}
          </span>
        </button>
      </template>
    </p>

    <AnimatePresence :initial="false">
      <motion.div
        v-if="activeTestimonial && position"
        :key="'inline-testimonial-popover'"
        :class="[ui.cardWrapper({ class: uiProps.ui?.cardWrapper }), flipUp ? 'pb-2' : 'pt-2']"
        :style="popoverStyle"
        :initial="popoverFrom"
        :animate="popoverTo"
        :exit="popoverExit"
        :transition="popoverTransition"
        @pointerenter="clearCloseTimer"
        @pointerleave="scheduleClose"
      >
        <div
          :id="cardId(activeId ?? '')"
          ref="cardRef"
          :class="ui.card({ class: uiProps.ui?.card })"
        >
          <div :class="ui.cardHead({ class: uiProps.ui?.cardHead })">
            <img
              v-if="activeTestimonial.avatar"
              alt=""
              :class="ui.avatar({ class: ['ring-primary', uiProps.ui?.avatar] })"
              :src="activeTestimonial.avatar"
              :style="{ height: `${avatarSize * 2}px`, width: `${avatarSize * 2}px` }"
            >
            <span
              v-else
              aria-hidden="true"
              :class="ui.initials({ class: uiProps.ui?.initials })"
              :style="{ fontSize: `${avatarSize * 0.7}px`, height: `${avatarSize * 2}px`, width: `${avatarSize * 2}px` }"
            >{{ initials(activeTestimonial.name) }}</span>

            <div class="min-w-0">
              <p :class="ui.cardName({ class: uiProps.ui?.cardName })">
                {{ activeTestimonial.name }}
              </p>
              <p :class="ui.cardRole({ class: uiProps.ui?.cardRole })">
                {{ activeTestimonial.role }}
              </p>
            </div>
          </div>

          <blockquote :class="ui.quote({ class: uiProps.ui?.quote })">
            {{ activeTestimonial.quote }}
          </blockquote>

          <div
            v-if="activeTestimonial.rating"
            role="img"
            :aria-label="`Rated ${activeTestimonial.rating} out of 5`"
            :class="ui.rating({ class: uiProps.ui?.rating })"
          >
            <!--
              The glyph swaps rather than the fill: mask-based icons ignore
              `fill-current`, so a solid star has to be a solid icon name.
            -->
            <UIcon
              v-for="star in STAR_COUNT"
              :key="star"
              aria-hidden="true"
              :name="star <= Math.round(activeTestimonial.rating) ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
              :class="[
                ui.star({ class: uiProps.ui?.star }),
                star <= Math.round(activeTestimonial.rating)
                  ? 'text-warning'
                  : 'text-muted/40',
              ]"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import inlineTestimonials from '../theme/inline-testimonials'
import { EASE_OUT, SPRING_DEFAULT } from '../utils/motion-tokens'

export interface InlineTestimonial {
  id: string
  name: string
  role: string
  quote: string
  /** Image URL. Falls back to initials, which is what most data actually has. */
  avatar?: string
  rating?: number
}

export interface InlineTestimonialsProps {
  /** Prose containing `{{id}}` tokens, one per testimonial. */
  text: string
  testimonials: InlineTestimonial[]
  avatarSize?: number
  /** Controlled open card. Leave undefined to let the component own it. */
  openId?: string | null
  class?: string
  ui?: Record<string, any>
}

/**
 * Testimonials that live inside the sentence that cites them.
 *
 * A name in the copy that opens the quote is a much smaller claim than a
 * testimonial wall - it is the difference between "this person said this" and
 * "look how many people said things". The trade is density: one card at a time,
 * anchored to the word, never a grid.
 *
 * The card is positioned against live measurements rather than a tooltip
 * library: it is clamped inside the paragraph, and flips above the trigger when
 * the viewport runs out of room below.
 */
const props = withDefaults(defineProps<InlineTestimonialsProps>(), {
  avatarSize: 22,
  openId: undefined,
  class: undefined,
  ui: undefined,
})

const emit = defineEmits<{
  'update:openId': [id: string | null]
}>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'inlineTestimonials', props, theme: inlineTestimonials })

const reducedMotion = useReducedMotion()

const TOKEN_PATTERN = /\{\{([\w-]+)\}\}/g
const STAR_COUNT = 5
const CARD_WIDTH_PX = 288
const EDGE_PADDING_PX = 8
const CARD_GAP_PX = 8
const ENTER_OFFSET_PX = 4
const CLOSE_DELAY_MS = 140

type TextSegment
  = | { type: 'text', value: string }
    | { type: 'token', id: string }

interface CardPosition {
  left: number
  originX: number
  spaceAbove: number
  spaceBelow: number
  triggerBottom: number
  triggerTop: number
  width: number
}

const rootRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const triggers = new Map<string, HTMLButtonElement>()
const isControlled = computed(() => props.openId !== undefined)
const internalOpenId = ref<string | null>(null)
const position = ref<CardPosition | null>(null)
const cardHeight = ref(0)

const segments = computed<TextSegment[]>(() => {
  const out: TextSegment[] = []
  let lastIndex = 0
  for (const match of props.text.matchAll(TOKEN_PATTERN)) {
    const [full, id] = match
    const index = match.index ?? 0
    if (index > lastIndex) out.push({ type: 'text', value: props.text.slice(lastIndex, index) })
    out.push({ type: 'token', id: id ?? '' })
    lastIndex = index + full.length
  }
  if (lastIndex < props.text.length) out.push({ type: 'text', value: props.text.slice(lastIndex) })
  return out
})

const activeId = computed<string | null>({
  get: () => props.openId ?? internalOpenId.value,
  set: (next) => {
    if (!isControlled.value) internalOpenId.value = next
    emit('update:openId', next)
  },
})

const byId = computed(() => new Map(props.testimonials.map(entry => [entry.id, entry])))
const testimonialFor = (id: string): InlineTestimonial | undefined => byId.value.get(id)
const activeTestimonial = computed(() => (activeId.value ? testimonialFor(activeId.value) : undefined))

const triggerId = (id: string): string => `inline-testimonial-trigger-${id}`
const cardId = (id: string): string => `inline-testimonial-card-${id}`

const initials = (name: string): string => name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(part => part[0]?.toUpperCase() ?? '')
  .join('')

const setTrigger = (id: string, el: unknown): void => {
  if (el instanceof HTMLButtonElement) triggers.set(id, el)
  else triggers.delete(id)
}

let closeTimer: ReturnType<typeof setTimeout> | undefined

const clearCloseTimer = (): void => {
  clearTimeout(closeTimer)
  closeTimer = undefined
}

/**
 * A delayed close keeps the card alive while the pointer crosses the gap
 * between the trigger and the card - the usual source of popover flicker.
 */
const scheduleClose = (): void => {
  clearCloseTimer()
  closeTimer = setTimeout(() => {
    activeId.value = null
  }, CLOSE_DELAY_MS)
}

const measure = (id: string): void => {
  const root = rootRef.value
  const trigger = triggers.get(id)
  if (!root || !trigger) return

  const rootRect = root.getBoundingClientRect()
  const triggerRect = trigger.getBoundingClientRect()
  const width = Math.min(CARD_WIDTH_PX, Math.max(rootRect.width - EDGE_PADDING_PX * 2, 0))
  const center = triggerRect.left - rootRect.left + triggerRect.width / 2
  const maxLeft = Math.max(rootRect.width - width - EDGE_PADDING_PX, EDGE_PADDING_PX)
  const left = Math.min(Math.max(center - width / 2, EDGE_PADDING_PX), maxLeft)

  position.value = {
    left,
    originX: center - left,
    // Vertical room is measured against the viewport, not the paragraph: the
    // paragraph is a few lines tall, so the card would always "not fit" below.
    spaceAbove: triggerRect.top,
    spaceBelow: window.innerHeight - triggerRect.bottom,
    triggerBottom: triggerRect.bottom - rootRect.top,
    triggerTop: triggerRect.top - rootRect.top,
    width,
  }
}

const open = (id: string): void => {
  clearCloseTimer()
  activeId.value = id
  measure(id)
}

const close = (restoreFocus = false): void => {
  const previous = activeId.value
  clearCloseTimer()
  activeId.value = null
  if (restoreFocus && previous) {
    nextTick(() => triggers.get(previous)?.focus())
  }
}

const onTriggerClick = (id: string): void => {
  if (activeId.value === id) close()
  else open(id)
}

/**
 * Only keyboard focus opens the card. A mouse click focuses the button too, and
 * opening there would fight the click that follows it.
 */
const onTriggerFocus = (event: FocusEvent, id: string): void => {
  const target = event.currentTarget
  if (!(target instanceof HTMLElement) || !target.matches(':focus-visible')) return
  open(id)
}

const onTriggerBlur = (): void => {
  // Focus moving inside the trigger is not leaving; the card is not focusable,
  // so a real blur means the reader has moved on.
  scheduleClose()
}

const onTriggerEnter = (event: PointerEvent, id: string): void => {
  if (event.pointerType !== 'mouse') return
  open(id)
}

const onTriggerLeave = (): void => {
  scheduleClose()
}

const onFocusOut = (event: FocusEvent): void => {
  const next = event.relatedTarget
  if (next instanceof Node && rootRef.value?.contains(next)) return
  close()
}

const flipUp = computed(() => {
  const current = position.value
  if (!current || cardHeight.value === 0) return false
  const required = cardHeight.value + EDGE_PADDING_PX
  return current.spaceBelow < required && current.spaceAbove >= required
})

/** Enter and exit travel in the same direction, so the motion reads as one. */
const enterOffset = computed(() => (flipUp.value ? ENTER_OFFSET_PX : -ENTER_OFFSET_PX))

const popoverStyle = computed(() => {
  const current = position.value
  if (!current) return {}
  return {
    left: `${current.left}px`,
    top: `${flipUp.value ? current.triggerTop - cardHeight.value : current.triggerBottom}px`,
    transformOrigin: `${current.originX}px ${
      flipUp.value ? `${cardHeight.value - CARD_GAP_PX}px` : `${CARD_GAP_PX}px`
    }`,
    width: `${current.width}px`,
  }
})

const popoverFrom = computed(() =>
  reducedMotion.value === true
    ? { opacity: 1 }
    : { opacity: 0, scale: 0.97, y: enterOffset.value },
)

const popoverTo = { opacity: 1, scale: 1, y: 0 }

const popoverExit = computed(() =>
  reducedMotion.value === true
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, scale: 0.97, transition: { duration: 0.15, ease: EASE_OUT }, y: enterOffset.value },
)

const popoverTransition = computed(() =>
  reducedMotion.value === true ? { duration: 0 } : { ...SPRING_DEFAULT, opacity: { duration: 0.15 } },
)

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key !== 'Escape' || !activeId.value) return
  event.preventDefault()
  close(true)
}

const onReposition = (): void => {
  if (activeId.value) measure(activeId.value)
}

const onDocumentPointerDown = (event: PointerEvent): void => {
  const target = event.target
  if (!activeId.value || !(target instanceof Node)) return
  if (rootRef.value?.contains(target)) return
  close()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onDocumentPointerDown, true)
  window.addEventListener('resize', onReposition)
  window.addEventListener('scroll', onReposition, true)
})

onBeforeUnmount(() => {
  clearCloseTimer()
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onDocumentPointerDown, true)
  window.removeEventListener('resize', onReposition)
  window.removeEventListener('scroll', onReposition, true)
})

/**
 * The rendered card's own height decides whether it still fits below, and the
 * popover is only measurable once it is in the DOM.
 *
 * `flush: 'post'` runs after the card has been patched, so `offsetHeight` is the
 * height of the card that is actually on screen.
 */
watch(
  [activeId, position],
  () => {
    cardHeight.value = cardRef.value?.offsetHeight ?? 0
  },
  { flush: 'post' },
)
</script>
