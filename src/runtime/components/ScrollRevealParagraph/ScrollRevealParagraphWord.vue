<script setup lang="ts">
import type { MotionValue } from 'motion-v'
import { onMounted } from 'vue'
import { Motion, useTransform } from 'motion-v'

export interface ScrollRevealParagraphWordProps {
  /** The parent paragraph's scroll progress, shared by every word. */
  progress: MotionValue<number>
  /** The slice of progress this word fades over. */
  range: [number, number]
  word: string
}

const props = defineProps<ScrollRevealParagraphWordProps>()

/**
 * One transform per word, driven by the shared progress value. The transform
 * runs outside Vue's render loop, so a scroll frame updates every word without
 * re-rendering the paragraph.
 */
const opacity = useTransform(props.progress, props.range, [0, 1])

/**
 * A derived value only recomputes when its input changes. A word that mounts
 * after the page has already been scrolled - a reload part-way down the page,
 * or hydration that lands after the reader moved - would otherwise keep
 * whatever value the transform was created with. One sync on mount puts the
 * first frame back in step; every later frame comes from the subscription.
 */
onMounted(() => {
  const [from, to] = props.range
  const current = props.progress.get()
  const value = (current - from) / (to - from)

  opacity.set(Math.min(1, Math.max(0, value)))
})
</script>

<template>
  <span class="relative mr-2 inline-block">
    <!--
      The dim copy is always present, so the paragraph keeps its exact line
      breaks while the bright copy fades in over it. Both copies are in the same
      box; the overlay is absolutely positioned and never affects layout.
    -->
    <span
      aria-hidden="true"
      class="text-highlighted/15"
    >{{ props.word }}</span>
    <Motion
      as="span"
      class="scroll-reveal-overlay absolute inset-0"
      :style="{ opacity }"
      style="will-change: opacity"
    >
      {{ props.word }}
    </Motion>
  </span>
</template>

<style scoped>
/*
 * Reduced motion pins the bright copy instead of revealing it. This lives in
 * CSS rather than in the scroll calculation so it also holds before hydration:
 * a reader who never scrolls gets the whole paragraph, not a row of dim words.
 * `!important` is required because the opacity itself is an inline style
 * written by the animation library on every scroll frame.
 */
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal-overlay {
    opacity: 1 !important;
  }
}
</style>
