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
import { Motion } from 'motion-v'
import { computed } from 'vue'
import {
  FOCUS_BLUR_DURATION_S,
  FOCUS_BLUR_EASE,
  FOCUS_BLUR_START,
  FOCUS_BLUR_START_SCALE,
  FOCUS_BLUR_START_Y,
} from './constants'

import { useStaggeredReveal } from '../../composables/useStaggeredReveal'

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

const { containerRef, animateState, initialState, transitionCollapsed } = useStaggeredReveal({
  triggerOnView: () => props.triggerOnView,
  hiddenState,
  shownState,
  // FocusBlurResolve intentionally keeps its single element hidden until it is
  // scrolled into view even under reduced motion, so the wait is not skipped.
  skipWaitOnReducedMotion: false,
})

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
const transition = computed(() => transitionCollapsed.value
  ? { duration: 0 }
  : {
      delay: props.delay / 1000,
      duration: FOCUS_BLUR_DURATION_S,
      ease: FOCUS_BLUR_EASE,
    })
</script>
