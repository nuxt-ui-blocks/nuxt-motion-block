<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from 'motion-v'
import { useStaggeredReveal } from '../composables/useStaggeredReveal'

export interface DepthParallaxWordsProps {
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

const props = withDefaults(defineProps<DepthParallaxWordsProps>(), {
  delay: 0,
  stagger: 70,
  triggerOnView: false,
})

const DURATION_S = 0.7
const MS = 1000
const EASE = [0.22, 1, 0.36, 1] as const

const words = computed(() => props.text.split(' '))

/**
 * Module level so the objects keep one identity across renders. motion-v
 * compares `initial` against `animate` by reference, and a fresh literal would
 * make every word look like it re-animates on each update.
 *
 * The depth cue is three properties at once - blur, scale and a downward
 * offset - because any one of them alone reads as a fade or a slide rather than
 * as a word arriving from further back.
 */
const hiddenState = {
  filter: 'blur(3px)',
  opacity: 0,
  scale: 0.92,
  y: 18,
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
})

function wordTransition(index: number) {
  if (transitionCollapsed.value) {
    return { duration: 0 }
  }

  return {
    delay: (props.delay + index * props.stagger) / MS,
    duration: DURATION_S,
    ease: EASE,
  }
}
</script>

<template>
  <span
    ref="containerRef"
    :class="props.class"
  >
    <!--
      The readable copy lives here. An aria-label on the root would be ignored:
      a plain span has no role, so it exposes no accessible name. Every animated
      word is hidden so the string is announced once, in reading order.
    -->
    <span class="sr-only">{{ props.text }}</span>
    <!--
      No display style on the root: an inline box is what lets the sentence
      wrap at the width of its parent instead of forcing one long line.
    -->
    <template
      v-for="(word, index) in words"
      :key="index"
    >
      <Motion
        as="span"
        aria-hidden="true"
        :animate="animateState"
        :initial="initialState"
        :transition="wordTransition(index)"
        style="display: inline-block; white-space: pre; will-change: transform, opacity, filter"
      >{{ word }}</Motion>
      <span
        v-if="index < words.length - 1"
        aria-hidden="true"
        style="display: inline-block; white-space: pre;"
      >{{ ' ' }}</span>
    </template>
  </span>
</template>
