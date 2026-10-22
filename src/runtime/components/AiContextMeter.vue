<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <!--
      The trigger is a button only when there is something to open. A disabled
      button would do the same job with the keyboard, but it would also drop the
      label out of the tab order, and the whole point of the ring is that a
      screen reader gets the number without having to aim at it.
    -->
    <component
      :is="tag"
      :type="interactive ? 'button' : undefined"
      :role="interactive ? undefined : 'img'"
      :aria-label="description"
      :aria-expanded="interactive ? isOpen : undefined"
      :class="ui.trigger({ interactive, class: uiProps.ui?.trigger })"
      @click="toggle"
      @focus="open"
      @blur="close"
      @mouseenter="open"
      @mouseleave="close"
      @keydown.escape="close"
    >
      <svg
        :class="ui.ring({ class: uiProps.ui?.ring })"
        aria-hidden="true"
        viewBox="0 0 32 32"
      >
        <circle
          :class="ui.track({ class: uiProps.ui?.track })"
          cx="16"
          cy="16"
          fill="none"
          r="13"
          stroke="currentColor"
          stroke-width="3"
        />
        <!--
          `pathLength` normalises the circle to 1, so the dash pattern is simply
          the fraction and its remainder. Without it the arc would need the
          circumference, and a wrong radius would look like a wrong number.
        -->
        <circle
          :class="[ui.progress({ class: uiProps.ui?.progress }), tone]"
          cx="16"
          cy="16"
          fill="none"
          pathLength="1"
          r="13"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="3"
          :stroke-dasharray="dashArray"
        />
      </svg>

      <span :class="ui.text({ class: uiProps.ui?.text })">{{ readout }}</span>
    </component>

    <AnimatePresence>
      <motion.div
        v-if="isOpen && hasBreakdown"
        :class="ui.popover({ class: uiProps.ui?.popover })"
        :initial="popoverMotion.initial"
        :animate="popoverMotion.animate"
        :exit="popoverMotion.exit"
        :transition="popoverTransition"
        :style="{ transformOrigin: 'bottom left' }"
      >
        <ul :class="ui.list({ class: uiProps.ui?.list })">
          <li
            v-for="item in breakdown"
            :key="item.label"
            :class="ui.item({ class: uiProps.ui?.item })"
          >
            <span :class="ui.itemLabel({ class: uiProps.ui?.itemLabel })">{{ item.label }}</span>
            <span :class="ui.itemValue({ class: uiProps.ui?.itemValue })">{{ formatTokens(item.tokens) }}</span>
          </li>
        </ul>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import aiContextMeter from '../theme/ai-context-meter'
import { EASE_OUT } from '../utils/motion-tokens'

export interface AiContextBreakdownItem {
  label: string
  tokens: number
}

export interface AiContextMeterProps {
  /**
   * Tokens currently in the window. Clamped into `0..limit`; a meter that could
   * overflow its own ring would be telling two different stories at once.
   */
  used: number
  /** Total size of the window, in tokens. Zero renders an empty ring. */
  limit: number
  /** Optional split of what is filling the window, shown on hover or focus. */
  breakdown?: AiContextBreakdownItem[]
  /** Fraction at which the ring turns amber. */
  warningAt?: number
  /** Fraction at which the ring turns red. */
  dangerAt?: number
  class?: string
  ui?: Record<string, any>
}

/**
 * How much of the context window is gone.
 *
 * Crossing a threshold changes the **hue**, never the size. Growing the ring at
 * the warning point would read as progress - as something filling up nicely -
 * which is the opposite of the message. The geometry stays put and the colour
 * does the talking.
 */
const props = withDefaults(defineProps<AiContextMeterProps>(), {
  breakdown: undefined,
  warningAt: 0.8,
  dangerAt: 0.95,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiContextMeter', props, theme: aiContextMeter })

const reducedMotion = useReducedMotion()
const isOpen = ref(false)

const COMPACT_THRESHOLD = 1_000
const MILLION = 1_000_000
/**
 * Below ten thousand the decimal is the difference between "1.8k" and "2k", and
 * the second one is a lie the reader will eventually catch.
 */
const DECIMAL_BELOW = 10 * COMPACT_THRESHOLD

const finite = (value: unknown, fallback = 0): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const formatTokens = (tokens: number): string => {
  const value = Math.max(0, finite(tokens))
  if (value >= MILLION) return `${(value / MILLION).toFixed(1)}M`
  if (value >= DECIMAL_BELOW) return `${Math.round(value / COMPACT_THRESHOLD)}k`
  if (value >= COMPACT_THRESHOLD) return `${(value / COMPACT_THRESHOLD).toFixed(1)}k`
  return String(Math.round(value))
}

const limit = computed(() => Math.max(0, finite(props.limit)))
const used = computed(() => Math.min(limit.value, Math.max(0, finite(props.used))))

/** Clamped so a stray `warningAt: 2` cannot make the ring permanently amber. */
const threshold = (value: number, fallback: number): number => {
  const parsed = finite(value, fallback)
  return Math.min(1, Math.max(0, parsed))
}

const warningAt = computed(() => threshold(props.warningAt, 0.8))
const dangerAt = computed(() => threshold(props.dangerAt, 0.95))

const fraction = computed(() => (limit.value > 0 ? used.value / limit.value : 0))
const percent = computed(() => Math.round(fraction.value * 100))

const tone = computed(() => {
  if (fraction.value >= dangerAt.value) return 'text-error'
  if (fraction.value >= warningAt.value) return 'text-warning'
  return ''
})

const hasBreakdown = computed(() => Boolean(props.breakdown?.length))
const interactive = computed(() => hasBreakdown.value)
const tag = computed(() => (interactive.value ? 'button' : 'span'))

const readout = computed(() => `${formatTokens(used.value)}/${formatTokens(limit.value)}`)

/**
 * The one sentence the ring stands for. It repeats the visible readout on
 * purpose: the text next to the ring is a ratio, and a ratio without the word
 * "tokens" is a puzzle.
 */
const description = computed(
  () => `Context window ${percent.value}% used, ${formatTokens(used.value)} of ${formatTokens(limit.value)} tokens`,
)

const dashArray = computed(() => `${fraction.value} ${1 - fraction.value}`)

const popoverMotion = computed(() => {
  if (reducedMotion.value === true) {
    return { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0, transition: { duration: 0 } } }
  }
  return {
    initial: { opacity: 0, scale: 0.96, y: 4 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: 4 },
  }
})

const popoverTransition = computed(() => (reducedMotion.value === true ? { duration: 0 } : { duration: 0.18, ease: EASE_OUT }))

const open = (): void => {
  if (interactive.value) isOpen.value = true
}

const close = (): void => {
  isOpen.value = false
}

const toggle = (): void => {
  if (!interactive.value) return
  isOpen.value = !isOpen.value
}
</script>
