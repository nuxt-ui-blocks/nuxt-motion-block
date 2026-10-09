<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'
import {
  BLUR_OUT_UP_DEFAULT_DELAY,
  BLUR_OUT_UP_DEFAULT_STAGGER,
  BLUR_OUT_UP_DURATION_S,
  BLUR_OUT_UP_EASE,
  BLUR_OUT_UP_MS,
  BLUR_OUT_UP_SEPARATOR,
  BLUR_OUT_UP_START_BLUR,
  BLUR_OUT_UP_START_Y,
} from './constants'

import { useStaggeredReveal } from '../../composables/useStaggeredReveal'

export interface BlurOutUpProps {
  /** Extra classes for the root element. */
  class?: string
  /** Delay before the first word starts, in milliseconds. */
  delay?: number
  /** Per-word stagger, in milliseconds. */
  stagger?: number
  /** The text to reveal. Split into one animated element per word. */
  text: string
  /** Wait for the element to scroll into view before playing. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<BlurOutUpProps>(), {
  delay: BLUR_OUT_UP_DEFAULT_DELAY,
  stagger: BLUR_OUT_UP_DEFAULT_STAGGER,
  triggerOnView: false,
})

const words = computed(() => {
  return props.text.split(BLUR_OUT_UP_SEPARATOR)
})

// Module level so the object identity is stable. motion-v compares `initial`
// against `animate` by reference, so a fresh literal per render would make it
// think every element re-animates on each update.
const hiddenState = {
  filter: `blur(${BLUR_OUT_UP_START_BLUR}px)`,
  opacity: 0,
  y: BLUR_OUT_UP_START_Y,
}

const shownState = {
  filter: 'blur(0px)',
  opacity: 1,
  y: 0,
}

const { containerRef, animateState, initialState, transitionCollapsed } = useStaggeredReveal({
  triggerOnView: () => props.triggerOnView,
  hiddenState,
  shownState,
})

function wordTransition(index: number) {
  if (transitionCollapsed.value) {
    return { duration: 0 }
  }

  return {
    delay: (props.delay + index * props.stagger) / BLUR_OUT_UP_MS,
    duration: BLUR_OUT_UP_DURATION_S,
    ease: BLUR_OUT_UP_EASE,
  }
}
</script>

<template>
  <span
    ref="containerRef"
    :class="props.class"
    :aria-label="props.text"
  >
    <!--
      No display style on the root: leaving it as an inline box is what lets the
      text wrap at whatever line width the parent gives it.
    -->
    <template
      v-for="(word, index) in words"
      :key="index"
    >
      <Motion
        as="span"
        aria-hidden="true"
        :initial="initialState"
        :animate="animateState"
        :transition="wordTransition(index)"
        style="display: inline-block; white-space: pre;"
      >{{ word }}</Motion>
      <span
        v-if="index < words.length - 1"
        aria-hidden="true"
        style="display: inline-block; white-space: pre;"
      >{{ ' ' }}</span>
    </template>
  </span>
</template>
