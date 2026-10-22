<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    role="group"
    aria-label="Response branches"
  >
    <div :class="ui.message({ class: uiProps.ui?.message })">
      <div :class="ui.bubbleUser({ class: uiProps.ui?.bubbleUser })">
        {{ current.userMessage }}
      </div>

      <!-- One branch is not a choice, so the controls stay out of the way. -->
      <div
        v-if="branches.length > 1"
        :class="ui.controls({ class: uiProps.ui?.controls })"
        @keydown.left.prevent="previous"
        @keydown.right.prevent="next"
      >
        <UButton
          square
          aria-label="Previous branch"
          color="neutral"
          icon="i-lucide-chevron-left"
          size="xs"
          variant="ghost"
          :class="ui.control({ class: uiProps.ui?.control })"
          @click="previous"
        />
        <span
          :class="ui.page({ class: uiProps.ui?.page })"
          aria-live="polite"
        >{{ index + 1 }} of {{ branches.length }}</span>
        <UButton
          square
          aria-label="Next branch"
          color="neutral"
          icon="i-lucide-chevron-right"
          size="xs"
          variant="ghost"
          :class="ui.control({ class: uiProps.ui?.control })"
          @click="next"
        />
      </div>
    </div>

    <AnimatePresence
      :initial="false"
      mode="wait"
    >
      <motion.div
        :key="current.id"
        :class="ui.response({ class: uiProps.ui?.response })"
        :initial="responseFrom"
        :animate="responseTo"
        :exit="responseExit"
        :transition="responseTransition"
      >
        <slot
          name="response"
          :branch="current"
          :index="index"
        >
          <div :class="ui.bubbleAssistant({ class: uiProps.ui?.bubbleAssistant })">
            {{ current.aiResponse }}
          </div>
        </slot>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import aiBranch from '../theme/ai-branch'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export interface AiBranchData {
  id: string
  userMessage: string
  aiResponse: string
}

export interface AiBranchProps {
  /** The alternative answers to one message, in the order they were generated. */
  branches: AiBranchData[]
  /** Which branch to start on. Ignored once `modelValue` is bound. */
  defaultBranch?: number
  /** Controlled branch index. Leave undefined to let the component own it. */
  modelValue?: number
  class?: string
  ui?: Record<string, any>
}

/**
 * Several answers to the same question, one at a time.
 *
 * The user's message is the anchor and does not change; only the response does.
 * Swapping the whole pair would make it look like a different conversation each
 * time, when what actually changed is which draft of the reply you are reading.
 */
const props = withDefaults(defineProps<AiBranchProps>(), {
  defaultBranch: 0,
  modelValue: undefined,
  class: undefined,
  ui: undefined,
})

const emit = defineEmits<{
  select: [branch: AiBranchData, index: number]
  'update:modelValue': [index: number]
}>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiBranch', props, theme: aiBranch })

const reducedMotion = useReducedMotion()
const internalIndex = ref(props.defaultBranch)

const isControlled = computed(() => props.modelValue !== undefined)

/** Clamped on read: a stale controlled value must not index off the end. */
const index = computed<number>({
  get: () => {
    const last = Math.max(0, props.branches.length - 1)
    const requested = props.modelValue ?? internalIndex.value
    return Math.min(last, Math.max(0, requested))
  },
  set: (next) => {
    if (!isControlled.value) internalIndex.value = next
    const branch = props.branches[next]
    if (branch) emit('select', branch, next)
    emit('update:modelValue', next)
  },
})

const current = computed<AiBranchData>(
  () => props.branches[index.value] ?? { id: 'empty', userMessage: '', aiResponse: '' },
)

/**
 * Both ends wrap. A branch list is a small closed set, and a disabled arrow at
 * the edge would suggest the other direction matters less.
 */
const previous = (): void => {
  const count = props.branches.length
  if (count <= 1) return
  index.value = (index.value - 1 + count) % count
}

const next = (): void => {
  const count = props.branches.length
  if (count <= 1) return
  index.value = (index.value + 1) % count
}

const responseFrom = computed(() =>
  reducedMotion.value === true ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
)

const responseTo = { opacity: 1, y: 0 }

const responseExit = computed(() =>
  reducedMotion.value === true
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, y: -6 },
)

const responseTransition = computed(() => (reducedMotion.value === true ? { duration: 0 } : SPRING_DEFAULT))
</script>
