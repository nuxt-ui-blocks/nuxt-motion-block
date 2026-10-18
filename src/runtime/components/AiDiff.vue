<template>
  <!--
    The flash lives on this wrapper rather than on the lines, so it washes over
    the whole proposal once and then settles. Anything more celebratory turns an
    ordinary code review into an event.
  -->
  <!-- @vue-ignore -->
  <Motion
    as="div"
    :animate="flashTarget"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :layout="!shouldReduceMotion"
    :transition="containerTransition"
  >
    <div :class="ui.header({ class: uiProps.ui?.header })">
      <span
        v-if="props.title"
        :class="ui.title({ class: uiProps.ui?.title })"
      >
        {{ props.title }}
      </span>
      <span :class="ui.stats({ class: uiProps.ui?.stats })">
        <span :class="ui.statAdded({ class: uiProps.ui?.statAdded })">+{{ addedCount }}</span>
        <span :class="ui.statRemoved({ class: uiProps.ui?.statRemoved })">-{{ removedCount }}</span>
      </span>
    </div>

    <!--
      Rejecting collapses the lines to zero height so the space is reclaimed. A
      rejected edit should stop occupying the page.
    -->
    <AnimatePresence :initial="false">
      <Motion
        v-if="!isRejected"
        as="div"
        :class="ui.body({ class: uiProps.ui?.body })"
        :exit="bodyExit"
        :transition="bodyTransition"
      >
        <CodeBlock
          bare
          variant="diff"
          :lines="props.lines"
        />
      </Motion>
    </AnimatePresence>

    <div
      v-if="showActions"
      :class="ui.actions({ class: uiProps.ui?.actions })"
    >
      <button
        v-if="props.onReject"
        :class="ui.reject({ class: uiProps.ui?.reject })"
        type="button"
        @click="reject"
      >
        Reject
      </button>
      <button
        v-if="props.onAccept"
        :class="ui.accept({ class: uiProps.ui?.accept })"
        type="button"
        @click="accept"
      >
        Accept
      </button>
    </div>

    <!-- @vue-ignore -->
    <Motion
      v-if="decision"
      as="p"
      :animate="{ opacity: 1 }"
      :class="[ui.decision({ class: uiProps.ui?.decision })]"
      :initial="shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }"
      :transition="shouldReduceMotion ? NO_MOTION : DECISION_TRANSITION"
    >
      {{ decision }}
    </Motion>
  </Motion>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { AnimatePresence, Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { aiDiff } from '../theme'
import { EASE_OUT, SPRING_DEFAULT } from '../utils/motion-tokens'
import CodeBlock from './CodeBlock.vue'

export type AiDiffLineKind = 'added' | 'removed' | 'context'

export interface AiDiffLine {
  content: string
  kind: AiDiffLineKind
  /** Line number in the file. Omit for tabular data rather than code. */
  number?: number
}

export type AiDiffDecision = 'accepted' | 'rejected'

export interface AiDiffProps {
  class?: string
  lines: AiDiffLine[]
  onAccept?: () => void
  onReject?: () => void
  /** File path or a description of what is being changed. */
  title?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<AiDiffProps>(), {
  class: '',
  onAccept: undefined,
  onReject: undefined,
  title: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiDiff', props, theme: aiDiff })

const FLASH_DURATION = 0.35
const SUCCESS_TINT = 'oklch(72% 0.17 150 / 0.14)'
const DANGER_TINT = 'oklch(63% 0.21 25 / 0.12)'
const CLEARED = 'rgb(0 0 0 / 0)'

const NO_MOTION = Object.freeze({ duration: 0 }) as unknown as (typeof SPRING_DEFAULT)
const DECISION_TRANSITION = Object.freeze({ duration: 0.2, ease: EASE_OUT })

/**
 * The verdict is local state, not a prop. A stored transcript is rendered by
 * remounting the card (a new `key`), which is what lets a fresh instance start
 * pending while a replayed one starts from the wipe again.
 */
const shouldReduceMotion = useReducedMotion()
const decision = ref<AiDiffDecision | null>(null)

const accept = () => {
  decision.value = 'accepted'
  props.onAccept?.()
}

const reject = () => {
  decision.value = 'rejected'
  props.onReject?.()
}

const addedCount = computed(() => props.lines.filter(line => line.kind === 'added').length)
const removedCount = computed(() => props.lines.filter(line => line.kind === 'removed').length)

const isRejected = computed(() => decision.value === 'rejected')
const showActions = computed(
  () => Boolean(props.onAccept || props.onReject) && !decision.value,
)

const flashTarget = computed(() =>
  decision.value && !shouldReduceMotion.value
    ? {
        backgroundColor: [
          decision.value === 'accepted' ? SUCCESS_TINT : DANGER_TINT,
          CLEARED,
        ],
      }
    : undefined,
)

const containerTransition = computed(() =>
  shouldReduceMotion.value
    ? { duration: 0 }
    : {
        backgroundColor: { duration: FLASH_DURATION, ease: EASE_OUT },
        layout: SPRING_DEFAULT,
      },
)

/**
 * The reject collapse is an `AnimatePresence` exit to `height: 0`, so the
 * element is measured on the way out and its space is reclaimed. Reduced motion
 * keeps the fade-free final state.
 */
const bodyExit = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 0, transition: { duration: 0 } }
    : { height: 0, opacity: 0 },
)

const bodyTransition = computed(() =>
  shouldReduceMotion.value ? { duration: 0 } : SPRING_DEFAULT,
)
</script>
