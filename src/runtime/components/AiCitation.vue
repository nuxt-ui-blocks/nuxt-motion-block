<template>
  <span
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @blur="scheduleClose"
    @focus="open"
    @mouseenter="open"
    @mouseleave="scheduleClose"
  >
    <a
      :aria-describedby="isOpen ? cardId : undefined"
      :class="ui.pill({ class: uiProps.ui?.pill })"
      :href="props.url"
      rel="noopener noreferrer"
      target="_blank"
    >{{ props.label }}</a>

    <!-- @vue-ignore -->
    <Motion
      v-if="isOpen"
      :id="cardId"
      :key="cardId"
      as="span"
      :animate="{ opacity: 1, scale: 1, y: 0 }"
      :class="ui.card({ class: uiProps.ui?.card })"
      :exit="shouldReduceMotion ? REDUCED_EXIT : EXIT_STATE"
      :initial="shouldReduceMotion ? RESTING_STATE : EXIT_STATE"
      :style="cardStyle"
      :transition="shouldReduceMotion ? NO_MOTION : SPRING_DEFAULT"
    >
      <span :class="ui.header({ class: uiProps.ui?.header })">
        <CitationMark :size="MARK_PX">
          <slot name="favicon" />
        </CitationMark>
        <span :class="ui.host({ class: uiProps.ui?.host })">{{ host }}</span>
        <UIcon
          aria-hidden="true"
          :class="ui.icon({ class: uiProps.ui?.icon })"
          name="i-lucide-arrow-up-right"
          size="12"
        />
      </span>

      <span :class="ui.title({ class: uiProps.ui?.title })">{{ props.title }}</span>

      <span
        v-if="props.description"
        :class="ui.description({ class: uiProps.ui?.description })"
      >{{ props.description }}</span>
    </Motion>
  </span>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, onBeforeUnmount, ref, resolveComponent, watch } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import aiCitation from '../theme/ai-citation'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export interface AiCitationProps {
  class?: string
  /** Excerpt or description shown in the card. */
  description?: string
  /** The number or short label shown in the pill. */
  label: number | string
  title: string
  url: string
  ui?: Record<string, any>
}

/** Grace period so the pointer can cross the gap between pill and card. */
const CLOSE_DELAY_MS = 120
const CARD_WIDTH_REM = 18
/** Half the card, used to centre it without touching the transform. */
const CARD_CENTRE_REM = 9
const CARD_WIDTH_PX = CARD_WIDTH_REM * 16
const CARD_CENTRE_PX = CARD_CENTRE_REM * 16
const MARK_PX = 14
const FALLBACK_ICON_PX = 11
const NO_MOTION = { duration: 0 }
/** Resting state. The card is grown open, not faded in, at the end of its travel. */
const RESTING_STATE = { opacity: 1, scale: 1, y: 0 }
/** Collapsed state, shared by the enter initial and the exit target. */
const EXIT_STATE = { opacity: 0, scale: 0.94, y: 4 }
/** Reduced motion keeps the exit as a plain fade with no travel. */
const REDUCED_EXIT = { opacity: 0, transition: { duration: 0 } }

const hostOf = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./u, '')
  }
  catch {
    return url
  }
}

/**
 * The mark is a node rather than a URL so a brand's own SVG can be passed
 * straight in. Sized here so any mark fits — an `<img>` from a logo service, or
 * a repo isotype SVG that ships `fill="none"` and expects the host to pick the
 * colour. When none is given we draw a neutral globe rather than fabricate a
 * one-letter badge: an honest "unknown host" beats a convincing wrong answer.
 */
const CitationMark = defineComponent({
  name: 'CitationMark',
  props: { size: { type: Number, required: true } },
  setup(markProps, { slots }) {
    return () =>
      h(
        'span',
        {
          'aria-hidden': 'true',
          'class': 'flex shrink-0 items-center justify-center overflow-hidden rounded-sm text-muted *:size-full *:fill-foreground *:object-cover',
          'style': {
            height: `${markProps.size}px`,
            width: `${markProps.size}px`,
          },
        },
        slots.default
          ? [slots.default()]
          : [
              h(resolveComponent('UIcon'), {
                name: 'i-lucide-globe',
                size: FALLBACK_ICON_PX,
              }),
            ],
      )
  },
})

/**
 * An inline citation that can be peeked at.
 *
 * The card scales up **from the pill** rather than fading in centred: with a
 * transform origin at the bottom of the marker, the growth points back at what
 * was clicked, so the pointer never loses the thread. It opens on hover and on
 * focus, and closes on Escape — a hover-only preview is unreachable by keyboard
 * and unusable on touch.
 */
const props = withDefaults(defineProps<AiCitationProps>(), {
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiCitation', props, theme: aiCitation })

const shouldReduceMotion = useReducedMotion()
const isOpen = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | null = null

const cardId = computed(() => `${props.url}-card`)
const host = computed(() => hostOf(props.url))
const cardStyle = computed(() => ({
  transformOrigin: 'bottom center',
  width: `${CARD_WIDTH_PX}px`,
  marginLeft: `${-CARD_CENTRE_PX}px`,
}))

const open = () => {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  isOpen.value = true
}

const scheduleClose = () => {
  if (closeTimer) {
    clearTimeout(closeTimer)
  }
  closeTimer = setTimeout(() => {
    isOpen.value = false
    closeTimer = null
  }, CLOSE_DELAY_MS)
}

// Escape is bound only while the card is showing, so a closed transcript never
// intercepts the key.
watch(isOpen, (open_) => {
  if (!open_) {
    return
  }
  const handle = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      isOpen.value = false
    }
  }
  window.addEventListener('keydown', handle)
  return () => window.removeEventListener('keydown', handle)
})

onBeforeUnmount(() => {
  if (closeTimer) {
    clearTimeout(closeTimer)
  }
})
</script>
