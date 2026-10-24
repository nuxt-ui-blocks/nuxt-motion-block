<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from 'motion-v'
import { useStaggeredReveal } from '../composables/useStaggeredReveal'

export interface PerCharacterRiseProps {
  /** Extra classes for the root element. */
  class?: string
  /** Delay before the first character starts, in milliseconds. */
  delay?: number
  /** Per-character stagger, in milliseconds. */
  stagger?: number
  /** The text to reveal. Split into one animated element per character. */
  text: string
  /** Wait for the element to scroll into view before playing. */
  triggerOnView?: boolean
}

const props = withDefaults(defineProps<PerCharacterRiseProps>(), {
  delay: 0,
  stagger: 24,
  triggerOnView: false,
})

const DURATION_S = 0.7
const MS = 1000
const EASE = [0.2, 0.8, 0.2, 1] as const
const NO_BREAK_SPACE = '\u00A0'

/**
 * `Array.from` rather than `split('')`: splitting by code unit tears surrogate
 * pairs (emoji, rare CJK) into two broken halves.
 */
const characters = computed(() => Array.from(props.text))

const hiddenState = { opacity: 0, y: 32 }
const shownState = { opacity: 1, y: 0 }

const { containerRef, animateState, initialState, transitionCollapsed } = useStaggeredReveal({
  triggerOnView: () => props.triggerOnView,
  hiddenState,
  shownState,
})

function characterTransition(index: number) {
  if (transitionCollapsed.value) {
    return { duration: 0 }
  }

  return {
    delay: (props.delay + index * props.stagger) / MS,
    duration: DURATION_S,
    ease: EASE,
  }
}

/**
 * A plain space collapses inside an inline-block, which would close the gap
 * between two words. A no-break space keeps the gap and still lets the parent
 * wrap between characters.
 */
function glyph(character: string) {
  return character === ' ' ? NO_BREAK_SPACE : character
}
</script>

<template>
  <span
    ref="containerRef"
    :class="props.class"
  >
    <!-- The readable copy lives here; the animated glyphs are hidden. -->
    <span class="sr-only">{{ props.text }}</span>
    <Motion
      v-for="(character, index) in characters"
      :key="index"
      as="span"
      aria-hidden="true"
      :animate="animateState"
      :initial="initialState"
      :transition="characterTransition(index)"
      style="display: inline-block; white-space: pre; will-change: transform, opacity"
    >{{ glyph(character) }}</Motion>
  </span>
</template>
