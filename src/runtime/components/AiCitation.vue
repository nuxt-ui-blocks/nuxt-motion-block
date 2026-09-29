<template>
  <span
    :class="['relative inline-block align-super', props.class]"
    @blur="scheduleClose"
    @focus="open"
    @mouseenter="open"
    @mouseleave="scheduleClose"
  >
    <a
      :aria-describedby="isOpen ? cardId : undefined"
      class="inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-border bg-muted px-1 font-medium text-[10px] text-muted no-underline transition-colors hover:border-accented hover:text-highlighted"
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
      :class="CARD_CLASS"
      :exit="shouldReduceMotion ? REDUCED_EXIT : EXIT_STATE"
      :initial="shouldReduceMotion ? RESTING_STATE : EXIT_STATE"
      :style="cardStyle"
      :transition="shouldReduceMotion ? NO_MOTION : SPRING_DEFAULT"
    >
      <span class="mb-1 flex items-center gap-1.5">
        <CitationMark :size="MARK_PX">
          <slot name="favicon" />
        </CitationMark>
        <span class="truncate text-muted text-xs">{{ host }}</span>
        <UIcon
          aria-hidden="true"
          class="ml-auto text-muted"
          name="i-lucide-arrow-up-right"
          size="12"
        />
      </span>

      <span class="block text-sm font-medium leading-snug text-highlighted">{{ props.title }}</span>

      <span
        v-if="props.description"
        class="mt-1 block text-xs leading-relaxed text-muted"
      >{{ props.description }}</span>
    </Motion>
  </span>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, onBeforeUnmount, ref, resolveComponent, watch } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export interface AiCitationProps {
  class?: string
  /** Excerpt or description shown in the card. */
  description?: string
  /** The number or short label shown in the pill. */
  label: number | string
  title: string
  url: string
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

/**
 * Centred with a negative margin rather than `translateX(-50%)`.
 *
 * Upstream centres the card with a hand-written `translateX: '-50%'` in `style`
 * while Motion animates `scale` and `y` on the same element — two systems
 * writing the `transform` property, where the winner depends on composition
 * order. A negative margin does the centring in layout instead, which leaves
 * the whole transform to the animation.
 */
// Written out in full rather than interpolated from `CARD_WIDTH_REM` /
// `CARD_CENTRE_REM`: Tailwind finds class names by scanning source text, so a
// `w-${n}` assembled at runtime produces no CSS at all and the card silently
// falls back to its content width. `w-72` is 18rem and `-ml-36` is 9rem, so the
// two constants and the two classes stay in step.
//
// The surface uses Nuxt UI's own tokens. Upstream is shadcn, where the class is
// `bg-background`; that name does not exist in Nuxt UI's scale, so it silently
// produces no CSS and the card opens as a transparent panel. `bg-elevated` is
// the floating-surface equivalent.
const CARD_CLASS = 'absolute bottom-full left-1/2 z-50 mb-1.5 block w-72 -ml-36 rounded-xl border border-border bg-elevated p-3 text-left align-baseline shadow-lg'

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
  class: '',
})

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
