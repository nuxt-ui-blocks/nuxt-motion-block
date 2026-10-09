<template>
  <span
    ref="containerRef"
    :class="props.class"
    :aria-label="props.text"
    style="display: inline-block"
  >
    <Motion
      as="span"
      aria-hidden="true"
      :initial="initialState"
      :animate="animateState"
      :transition="transition"
    >
      {{ props.text }}
    </Motion>
  </span>
</template>

<script setup lang="ts">
import { Motion, useInView, useReducedMotion } from 'motion-v'
import { computed, ref } from 'vue'
import {
  FOCUS_BLUR_DURATION_S,
  FOCUS_BLUR_EASE,
  FOCUS_BLUR_START,
  FOCUS_BLUR_START_SCALE,
  FOCUS_BLUR_START_Y,
} from './constants'

/**
 * Props for FocusBlurResolve.
 *
 * `text` is a string rather than a slot so the component can put a single
 * `aria-label` on the wrapper while marking the animated copy `aria-hidden` —
 * otherwise the character of the effect (or simply the wrapper) is announced
 * alongside the text and screen readers read the string twice.
 */
export interface FocusBlurResolveProps {
  /** Class applied to the wrapper element. */
  class?: string
  /** Milliseconds to wait before the resolve begins. */
  delay?: number
  /** The text to resolve. */
  text: string
  /** Wait until the element scrolls into view before resolving. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<FocusBlurResolveProps>(), {
  delay: 0,
  triggerOnView: false,
})

const shouldReduceMotion = useReducedMotion()

const containerRef = ref<HTMLElement | null>(null)

// Observing is unconditional rather than gated on `triggerOnView`. A hook has
// to be called on every render, and the observer is idle until something
// actually scrolls, so gating it would save nothing but add a branch.
const inView = useInView(containerRef, { once: true })

// These are module constants rather than computeds so their object identity is
// stable. motion-v compares `initial` against `animate` by reference
// (`state/animation-state.mjs`: `props.initial === props.animate`) to decide
// whether there is anything to animate at all, and fresh object literals each
// render would defeat that check.
const hiddenState = {
  filter: `blur(${FOCUS_BLUR_START}px)`,
  opacity: 0,
  scale: FOCUS_BLUR_START_SCALE,
  y: FOCUS_BLUR_START_Y,
}

const shownState = {
  filter: 'blur(0px)',
  opacity: 1,
  scale: 1,
  y: 0,
}

// `initial` is always the hidden state, on the server and on the client alike.
// Two earlier approaches tried to re-derive it per motion preference and both
// were wrong: the server cannot know the user's preference, so SSR baked the
// hidden styles into the HTML, and `initial` is only read once when the visual
// element is created — so a client that decided "actually, show it resolved"
// could never clear them. Reduced-motion users ended up staring at invisible
// text. Leaving `initial` alone and suppressing the *transition* instead gives
// one identical server and client tree, with no hydration mismatch, and still
// lands on the resolved state.
const initialState = hiddenState

// With `triggerOnView` the animate target stays on the hidden state until the
// element is seen, then flips to the resolved state and the ramp plays from
// there. Referencing the same object as `initial` is intentional: motion-v
// skips the animation entirely when the two match, which is exactly the
// "waiting" case.
const waitingForView = computed(() => props.triggerOnView && !inView.value)

// The wrapper's `aria-label` is what keeps the string available to assistive
// technology while the visual copy is still hidden.
const animateState = computed(() => waitingForView.value ? hiddenState : shownState)

// `will-change` is deliberately not declared here. motion-v sets and clears it
// itself for whichever values it animates, and an inline `will-change` from Vue
// only competes with that write — under reduced motion the element still
// reported `filter, opacity, transform` because motion-v had already claimed
// the property. Adding it buys nothing and makes the reduced-motion state look
// controllable when it is not.

// Zero duration rather than no animation at all. It is tempting to drop
// `animate` for reduced motion, but motion-v treats "nothing to animate" as
// "write nothing", which is what left the hidden styles stranded in the first
// place. A zero-length transition still runs and still commits the resolved
// values — it just does it within one frame, with no interpolation to watch.
const transition = computed(() => shouldReduceMotion.value
  ? { duration: 0 }
  : {
      delay: props.delay / 1000,
      duration: FOCUS_BLUR_DURATION_S,
      ease: FOCUS_BLUR_EASE,
    })
</script>
