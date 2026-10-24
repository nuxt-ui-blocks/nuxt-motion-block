<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <p
      v-if="label"
      :id="labelId"
      :class="ui.label({ class: uiProps.ui?.label })"
    >
      {{ label }}
    </p>

    <ul
      :class="ui.list({ class: uiProps.ui?.list })"
      :aria-labelledby="label ? labelId : undefined"
    >
      <AnimatePresence>
        <motion.li
          v-for="(suggestion, index) in suggestions"
          :key="suggestion.id"
          :class="ui.item({ class: uiProps.ui?.item })"
          :initial="enterFrom"
          :animate="enterTo"
          :exit="exitTo"
          :transition="transitions[index]"
          :layout="reducedMotion !== true"
        >
          <UButton
            :class="ui.chip({ class: uiProps.ui?.chip })"
            color="neutral"
            :label="suggestion.label"
            size="sm"
            variant="outline"
            @click="emit('select', suggestion)"
          />
        </motion.li>
      </AnimatePresence>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import aiSuggestions from '../theme/ai-suggestions'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export interface AiSuggestion {
  id: string
  label: string
}

export interface AiSuggestionsProps {
  suggestions: AiSuggestion[]
  /** Optional heading - "Follow-ups" is the usual one. */
  label?: string
  class?: string
  ui?: Record<string, any>
}

/**
 * Prompt suggestion chips.
 *
 * Chips are the empty state of a chat and the follow-up row after an answer, so
 * they need to arrive without feeling like a notification. They radiate out
 * from the middle of the row rather than sweeping left to right: a left-to-right
 * sweep implies reading order and priority, and these are alternatives of equal
 * weight.
 */
const props = withDefaults(defineProps<AiSuggestionsProps>(), {
  label: undefined,
  class: undefined,
  ui: undefined,
})

const emit = defineEmits<{ select: [suggestion: AiSuggestion] }>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiSuggestions', props, theme: aiSuggestions })

const reducedMotion = useReducedMotion()
const labelId = useId()

const STAGGER_SECONDS = 0.045

/**
 * Distance from the middle of the row, in chips, so the delay is symmetric.
 * With an even count the two middle chips share the shortest delay, which is
 * the closest a discrete row can get to "from the centre".
 */
const delayOf = (index: number, count: number): number =>
  Math.abs(index - (count - 1) / 2) * STAGGER_SECONDS

/**
 * Built once per change to the list rather than per render: a fresh transition
 * object would restart every chip's spring on any parent re-render.
 */
const transitions = computed(() =>
  props.suggestions.map((_, index) =>
    reducedMotion.value === true
      ? { duration: 0 }
      : { ...SPRING_DEFAULT, delay: delayOf(index, props.suggestions.length) },
  ),
)

const enterFrom = computed(() =>
  reducedMotion.value === true ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 6 },
)

const enterTo = { opacity: 1, scale: 1, y: 0 }

const exitTo = computed(() =>
  reducedMotion.value === true
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, scale: 0.94 },
)
</script>
