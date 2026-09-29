<template>
  <p
    :class="[
      'text-pretty text-default text-sm leading-relaxed',
      props.class,
    ]"
  >
    <template
      v-for="(token, index) in tokens"
      :key="index"
    >
      <!--
        Whitespace and bare punctuation stay as plain text. Wrapping a comma in
        its own inline-block would let the line break between a word and the
        punctuation that belongs to it.
      -->
      <template v-if="isPlain(token.value, token.citation)">
        {{ token.value }}
      </template>

      <!-- @vue-ignore -->
      <Motion
        :is="token.citation.url ? 'a' : 'span'"
        v-else-if="token.citation"
        :animate="{ opacity: 1, scale: 1 }"
        class="mr-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-border bg-muted px-1 align-super font-medium text-[10px] text-muted no-underline"
        :class="token.citation.url ? 'transition-colors hover:border-accented hover:text-highlighted' : undefined"
        :href="token.citation.url"
        :initial="isNew(index) && !shouldReduceMotion ? { opacity: 0, scale: 0.6 } : false"
        :rel="token.citation.url ? 'noopener noreferrer' : undefined"
        :target="token.citation.url ? '_blank' : undefined"
        :title="token.citation.title"
        :transition="shouldReduceMotion ? NO_MOTION : PILL_TRANSITION"
      >
        {{ token.citation.index }}
      </Motion>

      <!-- @vue-ignore -->
      <Motion
        v-else
        :animate="{ filter: 'blur(0px)', opacity: 1, y: 0 }"
        class="inline-block"
        :initial="isNew(index) && !shouldReduceMotion ? { filter: `blur(${WORD_BLUR_PX}px)`, opacity: 0, y: 2 } : false"
        :transition="shouldReduceMotion ? NO_MOTION : WORD_TRANSITION"
      >
        {{ token.value }}
      </Motion>
    </template>

    <!--
      Inline rather than absolutely positioned, so the caret rides the last glyph
      for free and never has to be told where the text ended.
    -->
    <!-- @vue-ignore -->
    <Motion
      v-if="props.isStreaming"
      :animate="shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0.15, 1] }"
      aria-hidden="true"
      class="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] rounded-full bg-current align-baseline"
      :transition="shouldReduceMotion ? NO_MOTION : CARET_TRANSITION"
    />
  </p>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { EASE_OUT, SPRING_DEFAULT } from '../utils/motion-tokens'

export interface AIResponseCitation {
  id: string
  /** The number shown in the pill, matching the `[n]` marker in the text. */
  index: number
  title: string
  /**
   * Where the source lives, when it lives anywhere.
   *
   * Optional on purpose: most retrieval is over internal documents that have no
   * public URL, and a required field there just pushes people into inventing
   * `example.com` links that go nowhere. Without a url the pill renders as plain
   * text instead of a dead link.
   */
  url?: string
}

export interface AIResponseProps {
  /** Sources referenced by `[n]` markers in the text. */
  citations?: AIResponseCitation[]
  class?: string
  /** Shows a caret after the last word. */
  isStreaming?: boolean
  /** The response so far. Re-render it as it grows. */
  text: string
}

// `text` is deliberately absent from the defaults: upstream makes it required,
// and giving it a default would also make it optional here, which is wrong.
const props = withDefaults(defineProps<AIResponseProps>(), {
  citations: () => [],
  class: '',
  isStreaming: false,
})

const WORD_BLUR_PX = 4
/** `[1]` style markers become citation pills. */
const CITATION_MARKER = /^\[(\d+)\]$/
/**
 * Split on whitespace *and* on markers, so a marker is its own token even when
 * punctuation is glued to it — `compute [1],` has to yield `[1]` and `,`
 * separately or the pill never matches.
 */
const TOKEN_SPLIT = /(\s+|\[\d+\])/
/** Anything without a letter or digit is punctuation and is not animated. */
const HAS_WORD_CHARACTER = /[\p{L}\p{N}]/u
const WHITESPACE_ONLY = /^\s+$/

/**
 * Frozen and hoisted. Motion restarts an animation whenever the transition it is
 * given changes identity, and this component re-renders on every token — so the
 * same object has to be handed over every time.
 */
const WORD_TRANSITION = Object.freeze({ duration: 0.22, ease: EASE_OUT })
const PILL_TRANSITION = SPRING_DEFAULT
const CARET_TRANSITION = Object.freeze({
  duration: 1,
  ease: 'linear',
  repeat: Number.POSITIVE_INFINITY,
})
const NO_MOTION = Object.freeze({ duration: 0 })

interface Token {
  citation?: AIResponseCitation
  value: string
}

const shouldReduceMotion = useReducedMotion()

const tokens = computed<Token[]>(() =>
  props.text
    .split(TOKEN_SPLIT)
    .filter(value => value !== '')
    .map((value) => {
      const match = value.match(CITATION_MARKER)
      if (!match) {
        return { value }
      }
      const citation = props.citations.find(entry => entry.index === Number(match[1]))
      return citation ? { citation, value } : { value }
    }),
)

/**
 * Words animate in as they *arrive*, not on a fixed timer — the component
 * remembers how many tokens it had on the last render and only animates the new
 * ones. A timer-driven typewriter drifts out of step with the real stream and
 * starts lying about how fast the model is answering.
 */
const paintedCount = ref(0)

watch(
  () => tokens.value.length,
  (length) => {
    paintedCount.value = length
  },
  { flush: 'post' },
)

const isNew = (index: number) => index >= paintedCount.value

const isPlain = (value: string, citation?: AIResponseCitation) =>
  WHITESPACE_ONLY.test(value) || !(citation || HAS_WORD_CHARACTER.test(value))
</script>
