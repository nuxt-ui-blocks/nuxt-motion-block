<template>
  <div :class="['w-full', props.class]">
    <button
      :aria-expanded="isOpen"
      class="flex w-full cursor-pointer items-center gap-1.5 rounded-lg py-1 text-left text-muted text-sm transition-colors hover:text-default"
      type="button"
      @click="toggle"
    >
      <!-- @vue-ignore -->
      <Motion
        :animate="{ rotate: isOpen ? 90 : 0 }"
        :transition="shouldReduceMotion ? NO_MOTION : SPRING_DEFAULT"
        class="flex size-4 items-center justify-center"
      >
        <UIcon
          aria-hidden="true"
          name="i-lucide-chevron-right"
          size="14"
        />
      </Motion>

      <!-- The shimmer is the "still working" signal, so it exists only while
           streaming. A permanently shimmering label is just decoration. -->
      <span
        v-if="isShimmering"
        class="ai-reasoning-shimmer"
      >
        {{ summary }}
      </span>
      <span v-else>{{ summary }}</span>
    </button>

    <div
      class="ai-reasoning-body"
      :class="isOpen ? 'is-open' : ''"
      :inert="!isOpen"
    >
      <!-- The rule doubles as a margin: the trace reads as an aside, not as
           part of the answer. -->
      <div class="mt-1 ml-[7px] border-border border-l pl-4 text-muted text-sm leading-relaxed">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { EASE_OUT, SPRING_DEFAULT } from '../utils/motion-tokens'

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
}

const props = withDefaults(defineProps<AiReasoningProps>(), {
  collapseWhenDone: true,
  isStreaming: false,
  class: '',
})

/**
 * A beat before auto-collapsing. Snapping shut the instant the trace finishes
 * makes it feel like the content was yanked away mid-read.
 */
const AUTO_COLLAPSE_DELAY_MS = 600
const MS_PER_SECOND = 1000
const SHIMMER_SECONDS = 1.8
const NO_MOTION = { duration: 0 }
const REDUCED_BODY_TRANSITION = 'none'
const BODY_TRANSITION = `grid-template-rows ${EASE_OUT.join(', ')}, opacity 180ms cubic-bezier(${EASE_OUT.join(', ')})`

const shouldReduceMotion = useReducedMotion()

const isOpen = ref(props.defaultOpen ?? props.isStreaming)
// Once someone opens or closes it by hand, stop deciding for them.
const isUserControlled = ref(false)
const startedAt = ref<number | null>(null)
const measuredSeconds = ref<number | null>(null)

let collapseTimer: ReturnType<typeof setTimeout> | null = null
onBeforeUnmount(() => {
  if (collapseTimer) {
    clearTimeout(collapseTimer)
  }
})

const toggle = () => {
  isUserControlled.value = true
  isOpen.value = !isOpen.value
}

watch(
  () => [props.isStreaming, isUserControlled.value] as const,
  ([isStreaming]) => {
    if (isStreaming) {
      startedAt.value = Date.now()
      measuredSeconds.value = null
      if (!isUserControlled.value) {
        isOpen.value = true
      }
      return
    }
    if (startedAt.value !== null) {
      measuredSeconds.value = (Date.now() - startedAt.value) / MS_PER_SECOND
      startedAt.value = null
    }
  },
)

watch(
  () => [props.collapseWhenDone, props.isStreaming, isUserControlled.value] as const,
  ([collapseWhenDone, isStreaming]) => {
    if (collapseTimer) {
      clearTimeout(collapseTimer)
      collapseTimer = null
    }
    if (isStreaming || !collapseWhenDone || isUserControlled.value) {
      return
    }
    collapseTimer = setTimeout(() => {
      isOpen.value = false
    }, AUTO_COLLAPSE_DELAY_MS)
  },
)

const seconds = computed(() => props.duration ?? measuredSeconds.value)

const summary = computed(() => {
  if (props.isStreaming) {
    return 'Thinking'
  }
  if (seconds.value !== null && seconds.value !== undefined) {
    return `Thought for ${seconds.value.toFixed(1)}s`
  }
  return 'Reasoning'
})

const isShimmering = computed(() => props.isStreaming && !shouldReduceMotion.value)
</script>

<style scoped>
/**
 * The disclosure is a `grid-template-rows: 0fr → 1fr` transition rather than an
 * animated `height`. Motion can interpolate `height: auto`, but only by
 * measuring first, and the measurement is a layout read on every frame of the
 * open. The grid track interpolates on the compositor and needs no measurement:
 * `1fr` resolves to the content's natural height, and `min-height: 0` is what
 * lets a `fr` track shrink below its content's size.
 */
.ai-reasoning-body {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: v-bind(REDUCED_BODY_TRANSITION);
}

.ai-reasoning-body.is-open {
  grid-template-rows: 1fr;
  opacity: 1;
  transition: v-bind(BODY_TRANSITION);
}

.ai-reasoning-body > * {
  min-height: 0;
  overflow: hidden;
}

.ai-reasoning-shimmer {
  background-image: linear-gradient(
    90deg,
    currentColor 0%,
    currentColor 35%,
    color-mix(in oklab, currentColor 25%, transparent) 50%,
    currentColor 65%,
    currentColor 100%
  );
  background-clip: text;
  background-size: 200% 100%;
  color: transparent;
  animation: ai-reasoning-shimmer v-bind(SHIMMER_SECONDS) linear infinite;
}

@keyframes ai-reasoning-shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ai-reasoning-shimmer {
    animation: none;
  }
}
</style>
