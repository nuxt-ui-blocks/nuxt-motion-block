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
    <div
      v-if="!isRejected"
      :class="ui.body({ class: uiProps.ui?.body })"
      :style="bodyStyle"
    >
      <pre :class="ui.pre({ class: uiProps.ui?.pre })">
        <Motion
          v-for="(line, index) in props.lines"
          :key="index"
          as="div"
          :animate="lineTransition(line, index)"
          :class="ui.line({ kind: line.kind, class: uiProps.ui?.line })"
          :initial="lineInitial(line)"
          :style="bodyStyle"
        >
          <span
            v-if="line.number !== undefined"
            :class="ui.lineNumber({ class: uiProps.ui?.lineNumber })"
          >
            {{ line.number }}
          </span>
          <span
            :class="ui.linePrefix({ kind: line.kind, class: uiProps.ui?.linePrefix })"
          >
            {{ PREFIX[line.kind] }}
          </span>
          <span :class="ui.lineContent({ class: uiProps.ui?.lineContent })">{{ line.content }}</span>
        </Motion>
      </pre>
    </div>

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
      :class="[ui.decision({ class: uiProps.ui?.decision }), bodyStyle]"
      :initial="shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }"
      :transition="shouldReduceMotion ? NO_MOTION : DECISION_TRANSITION"
    >
      {{ decision }}
    </Motion>
  </Motion>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { aiDiff } from '../theme'
import { EASE_OUT, SPRING_DEFAULT } from '../utils/motion-tokens'

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
  /**
   * Seeds the decision. Upstream keeps it in local state with no way to set it,
   * which makes a stored transcript unrenderable — the same component always
   * starts out pending. Seed it and the decision clears when `lines` changes.
   */
  decision?: AiDiffDecision | null
  lines: AiDiffLine[]
  onAccept?: () => void
  onReject?: () => void
  /** File path or a description of what is being changed. */
  title?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<AiDiffProps>(), {
  class: '',
  decision: null,
  onAccept: undefined,
  onReject: undefined,
  title: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiDiff', props, theme: aiDiff })

const LINE_STAGGER = 0.02
const WIPE_DURATION = 0.28
const FLASH_DURATION = 0.35
const SUCCESS_TINT = 'oklch(72% 0.17 150 / 0.14)'
const DANGER_TINT = 'oklch(63% 0.21 25 / 0.12)'
const CLEARED = 'rgb(0 0 0 / 0)'

const NO_MOTION = Object.freeze({ duration: 0 }) as unknown as (typeof SPRING_DEFAULT)
const DECISION_TRANSITION = Object.freeze({ duration: 0.2, ease: EASE_OUT })

const PREFIX: Record<AiDiffLineKind, string> = {
  added: '+',
  context: ' ',
  removed: '-',
}

const shouldReduceMotion = useReducedMotion()
const decision = ref<AiDiffDecision | null>(props.decision)

watch(() => props.decision, (latest) => {
  decision.value = latest
})

// A different diff is a different question, so the previous answer is dropped.
watch(() => props.lines, () => {
  decision.value = null
})

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
 * React drives the collapse through `AnimatePresence` exit on a `height: 0`
 * target, which needs a measured value. A CSS `max-height` transition from a
 * generous fixed value is the equivalent that needs no measurement and cannot
 * clip a tall diff.
 */
const BODY_MAX_HEIGHT = '60rem'
const COLLAPSE_SECONDS = 0.25
const bodyStyle = computed(() =>
  shouldReduceMotion.value
    ? {}
    : {
        maxHeight: isRejected.value ? '0rem' : BODY_MAX_HEIGHT,
        transition: `max-height ${COLLAPSE_SECONDS}s ease, opacity ${COLLAPSE_SECONDS}s ease`,
      },
)

// Only the added lines wipe. Context lines were already there, so animating them
// would misrepresent the change.
const lineInitial = (line: AiDiffLine) =>
  line.kind === 'added' && !shouldReduceMotion.value
    ? { clipPath: 'inset(0 100% 0 0)' }
    : false

const lineTransition = (line: AiDiffLine, index: number) =>
  shouldReduceMotion.value
    ? undefined
    : {
        clipPath: 'inset(0 0% 0 0)',
        transition: { delay: index * LINE_STAGGER, duration: WIPE_DURATION, ease: EASE_OUT },
      }
</script>
