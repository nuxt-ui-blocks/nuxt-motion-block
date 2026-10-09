<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'
import {
  MASK_REVEAL_UP_DEFAULT_DELAY,
  MASK_REVEAL_UP_DEFAULT_STAGGER,
  MASK_REVEAL_UP_DURATION_S,
  MASK_REVEAL_UP_EASE,
  MASK_REVEAL_UP_MS,
  MASK_REVEAL_UP_SEPARATOR,
  MASK_REVEAL_UP_START_BLUR,
  MASK_REVEAL_UP_START_Y,
} from './constants'

import { useStaggeredReveal } from '../../composables/useStaggeredReveal'

export interface MaskRevealUpProps {
  /** Extra classes for the root element. */
  class?: string
  /** Delay before the first line starts, in milliseconds. */
  delay?: number
  /**
   * Supply the lines directly instead of letting `text` be split. Takes
   * precedence over `text`, which is still required so the accessible label is
   * never empty.
   */
  lines?: string[]
  /** Per-line stagger, in milliseconds. */
  stagger?: number
  /** The text to reveal, split on newlines unless `lines` is supplied. */
  text: string
  /** Wait for the element to scroll into view before playing. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<MaskRevealUpProps>(), {
  delay: MASK_REVEAL_UP_DEFAULT_DELAY,
  stagger: MASK_REVEAL_UP_DEFAULT_STAGGER,
  triggerOnView: false,
})

const resolvedLines = computed(() => {
  if (props.lines) {
    return props.lines
  }

  return props.text.split(MASK_REVEAL_UP_SEPARATOR)
})

const label = computed(() => {
  // Screen readers would otherwise pause between the block-level children. A
  // space is what the line break meant.
  return resolvedLines.value.join(' ')
})

// Module level so the object identity is stable. motion-v compares `initial`
// against `animate` by reference, so a fresh literal per render would make it
// think every element re-animates on each update.
const hiddenState = {
  filter: `blur(${MASK_REVEAL_UP_START_BLUR}px)`,
  opacity: 0,
  y: MASK_REVEAL_UP_START_Y,
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

function lineTransition(index: number) {
  if (transitionCollapsed.value) {
    return { duration: 0 }
  }

  return {
    delay: (props.delay + index * props.stagger) / MASK_REVEAL_UP_MS,
    duration: MASK_REVEAL_UP_DURATION_S,
    ease: MASK_REVEAL_UP_EASE,
  }
}
</script>

<template>
  <span
    ref="containerRef"
    :class="props.class"
    :aria-label="label"
    style="display: block;"
  >
    <span
      v-for="(line, index) in resolvedLines"
      :key="index"
      style="display: block; overflow: hidden;"
    >
      <Motion
        as="span"
        aria-hidden="true"
        :initial="initialState"
        :animate="animateState"
        :transition="lineTransition(index)"
        style="display: block;"
      >{{ line }}</Motion>
    </span>
  </span>
</template>
