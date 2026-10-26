<script setup lang="ts">
import { computed, ref } from 'vue'
import { useScroll } from 'motion-v'
import ScrollRevealParagraphWord from './ScrollRevealParagraphWord.vue'

export interface ScrollRevealParagraphProps {
  /** Extra classes for the paragraph element. */
  class?: string
  /** The copy to reveal. Split into one word per scroll step. */
  paragraph: string
}

const props = withDefaults(defineProps<ScrollRevealParagraphProps>(), {})

const containerRef = ref<HTMLElement | null>(null)

/**
 * The range starts when the top of the paragraph reaches 90% of the viewport
 * and finishes when it reaches 25%, so the reveal is tied to the paragraph
 * itself rather than to the page. A window that starts later leaves the first
 * line dim for a scroll the reader has already made.
 */
const { scrollYProgress } = useScroll({
  offset: ['start 0.9', 'start 0.25'],
  target: containerRef,
})

const words = computed(() => props.paragraph.split(' ').filter(Boolean))

/**
 * Each word owns a slice of the same progress value. Overlapping the slices
 * would make two words brighten at once, which reads as a flicker; a gap would
 * leave a word dim after its neighbour is already lit.
 *
 * Words and ranges are zipped into one list so the template never indexes a
 * second array - with `noUncheckedIndexedAccess` that lookup is `undefined`
 * for the compiler even when the two lengths are guaranteed to match.
 */
const items = computed(() => {
  const list = words.value
  const count = list.length

  return list.map((word, index) => ({
    range: [index / count, (index + 1) / count] as [number, number],
    word,
  }))
})
</script>

<template>
  <p
    ref="containerRef"
    :class="props.class"
    class="text-lg leading-relaxed"
  >
    <ScrollRevealParagraphWord
      v-for="(item, index) in items"
      :key="`${index}-${item.word.slice(0, 3)}`"
      :progress="scrollYProgress"
      :range="item.range"
      :word="item.word"
    />
  </p>
</template>
