<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'
import {
  SPRING_SCALE_IN_DEFAULT_DELAY,
  SPRING_SCALE_IN_DEFAULT_STAGGER,
  SPRING_SCALE_IN_DURATION_S,
  SPRING_SCALE_IN_EASE,
  SPRING_SCALE_IN_MS,
  SPRING_SCALE_IN_SEPARATOR,
  SPRING_SCALE_IN_START_SCALE,
} from './constants'

import { useStaggeredReveal } from '../../composables/useStaggeredReveal'

export interface SpringScaleInProps {
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

const props = withDefaults(defineProps<SpringScaleInProps>(), {
  delay: SPRING_SCALE_IN_DEFAULT_DELAY,
  stagger: SPRING_SCALE_IN_DEFAULT_STAGGER,
  triggerOnView: false,
})

const words = computed(() => {
  return props.text.split(SPRING_SCALE_IN_SEPARATOR)
})

// Module level so the object identity is stable. motion-v compares `initial`
// against `animate` by reference, so a fresh literal per render would make it
// think every element re-animates on each update.
const hiddenState = {
  opacity: 0,
  scale: SPRING_SCALE_IN_START_SCALE,
}

const shownState = {
  opacity: 1,
  scale: 1,
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
    delay: (props.delay + index * props.stagger) / SPRING_SCALE_IN_MS,
    duration: SPRING_SCALE_IN_DURATION_S,
    ease: SPRING_SCALE_IN_EASE,
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
