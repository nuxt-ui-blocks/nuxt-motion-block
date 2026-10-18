<template>
  <UChatReasoning
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :text="summary"
    :streaming="props.isStreaming"
    :duration="props.duration"
    :auto-close-delay="autoCloseDelay"
    :default-open="props.defaultOpen"
    :ui="reasoningUi"
  >
    <!--
      The rule doubles as the indent: the trace reads as an aside, not as part of
      the answer it is explaining.
    -->
    <div :class="ui.trace({ class: uiProps.ui?.trace })">
      <slot />
    </div>
  </UChatReasoning>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import aiReasoning from '../theme/ai-reasoning'

export interface AiReasoningProps {
  /**
   * Collapse itself once `isStreaming` goes false. The trace is scaffolding —
   * interesting while it happens, clutter once the answer has landed.
   */
  collapseWhenDone?: boolean
  /** Start expanded. Defaults to whatever `isStreaming` starts as. */
  defaultOpen?: boolean
  /** Seconds the model spent. Omit to have the component time it itself. */
  duration?: number
  isStreaming?: boolean
  class?: string
  ui?: Record<string, any>
}

/**
 * A model thinking out loud, collapsed behind a one-line summary.
 *
 * Built on Nuxt UI's `ChatReasoning`, which already does the parts that are easy
 * to get subtly wrong: it times the trace itself, opens the moment streaming
 * starts, auto-closes when the answer lands, and swaps its label for a shimmer
 * only while work is actually happening. All this component adds is the label —
 * seconds, to a decimal, in the module's own voice — and the left rule.
 */
const props = withDefaults(defineProps<AiReasoningProps>(), {
  collapseWhenDone: true,
  defaultOpen: undefined,
  duration: undefined,
  isStreaming: false,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiReasoning', props, theme: aiReasoning })

/**
 * A beat before auto-collapsing. Snapping shut the instant the trace finishes
 * makes it feel like the content was yanked away mid-read. Zero turns Nuxt UI's
 * auto-close off entirely, which is what `collapseWhenDone: false` asks for.
 */
const AUTO_COLLAPSE_DELAY_MS = 600
const MS_PER_SECOND = 1000

const autoCloseDelay = computed(() => (props.collapseWhenDone ? AUTO_COLLAPSE_DELAY_MS : 0))

const startedAt = ref<number | null>(null)
const measuredSeconds = ref<number | null>(null)

// `ChatReasoning` times the trace for its own sake; this is the same measurement
// again, kept only so the summary can say how long it took.
watch(
  () => props.isStreaming,
  (isStreaming, wasStreaming) => {
    if (isStreaming) {
      startedAt.value = Date.now()
      measuredSeconds.value = null
      return
    }
    if (wasStreaming && startedAt.value !== null) {
      measuredSeconds.value = (Date.now() - startedAt.value) / MS_PER_SECOND
      startedAt.value = null
    }
  },
  { immediate: true },
)

const seconds = computed(() => {
  const raw: unknown = props.duration ?? measuredSeconds.value
  if (raw === null || raw === undefined || raw === '') return null
  const value = Number(raw)
  return Number.isFinite(value) ? value : null
})

const summary = computed(() => {
  const value = seconds.value
  if (value !== null) {
    return `Thought for ${value.toFixed(1)}s`
  }
  return 'Reasoning'
})

/**
 * The trace is an aside, not a panel: no top gap, and the rule is what
 * separates it from the answer below.
 */
const reasoningUi = computed(() => ({
  body: ui.value.body({ class: uiProps.ui?.body }),
}))
</script>
