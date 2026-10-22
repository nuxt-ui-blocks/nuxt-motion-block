<template>
  <motion.div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    role="group"
    :aria-labelledby="questionId"
    :aria-describedby="slots.default ? detailId : undefined"
    :layout="reducedMotion !== true"
    :transition="layoutTransition"
  >
    <motion.div :layout="reducedMotion !== true">
      <p
        :id="questionId"
        :class="ui.question({ class: uiProps.ui?.question })"
      >
        {{ question }}
      </p>
      <div
        v-if="slots.default"
        :id="detailId"
        :class="ui.detail({ class: uiProps.ui?.detail })"
      >
        <slot />
      </div>
    </motion.div>

    <div :class="ui.body({ class: uiProps.ui?.body })">
      <AnimatePresence
        :initial="false"
        mode="popLayout"
      >
        <!--
          The decision replaces the options rather than greying them out. Leaving
          the rejected choices on screen invites a second look at something that
          already happened.
        -->
        <motion.div
          v-if="chosen"
          key="resolved"
          role="status"
          :class="ui.resolved({ tone: chosen.destructive === true ? 'destructive' : 'neutral', class: uiProps.ui?.resolved })"
          :initial="resolvedFrom"
          :animate="resolvedTo"
          :transition="resolvedTransition"
        >
          <span :class="ui.resolvedIcon({ class: uiProps.ui?.resolvedIcon })">
            <UIcon
              aria-hidden="true"
              class="size-3.5"
              name="i-lucide-check"
            />
          </span>
          <span class="sr-only">Decision:</span>
          <span :class="ui.resolvedLabel({ class: uiProps.ui?.resolvedLabel })">{{ chosen.label }}</span>
          <span
            v-if="chosen.detail"
            :class="ui.resolvedDetail({ class: uiProps.ui?.resolvedDetail })"
          >{{ chosen.detail }}</span>
        </motion.div>

        <motion.div
          v-else
          key="options"
          :class="ui.options({ class: uiProps.ui?.options })"
          :exit="optionsExit"
          :transition="optionsTransition"
        >
          <motion.button
            v-for="(option, index) in options"
            :key="option.id"
            type="button"
            :class="ui.option({ destructive: option.destructive === true, class: uiProps.ui?.option })"
            :initial="optionFrom"
            :animate="optionTo"
            :transition="optionTransitions[index]"
            :while-tap="reducedMotion === true ? undefined : { scale: 0.99 }"
            @click="decide(option)"
          >
            <span :class="ui.optionLabel({ class: uiProps.ui?.optionLabel })">{{ option.label }}</span>
            <span
              v-if="option.detail"
              :class="ui.optionDetail({ destructive: option.destructive === true, class: uiProps.ui?.optionDetail })"
            >{{ option.detail }}</span>
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  </motion.div>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import aiApproval from '../theme/ai-approval'
import { EASE_OUT, SPRING_DEFAULT } from '../utils/motion-tokens'

export interface AiApprovalOption {
  id: string
  label: string
  /** Secondary line under the label. */
  detail?: string
  /** Marks the option as the one that costs something, e.g. "Delete everything". */
  destructive?: boolean
}

export interface AiApprovalProps {
  /** What the agent needs a human to settle. */
  question: string
  options: AiApprovalOption[]
  /** Render already resolved, e.g. when replaying a transcript. */
  resolvedId?: string
  class?: string
  ui?: Record<string, any>
}

/**
 * The card an agent puts up before it acts.
 *
 * Choosing is not a radio button being ticked: the chosen option expands to
 * fill the card and the alternatives collapse out of existence. The decision
 * should look as irreversible as it is.
 */
const props = withDefaults(defineProps<AiApprovalProps>(), {
  resolvedId: undefined,
  class: undefined,
  ui: undefined,
})

const emit = defineEmits<{ decide: [option: AiApprovalOption] }>()

const slots = defineSlots<{ default?: () => unknown }>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiApproval', props, theme: aiApproval })

const reducedMotion = useReducedMotion()
const questionId = useId()
const detailId = useId()

const CHOSEN_NONE = null
const chosenId = ref<string | null>(props.resolvedId ?? CHOSEN_NONE)

/**
 * A transcript replays decisions, so the prop wins whenever the parent changes
 * it. Passing `undefined` resets the card to its options.
 */
watch(
  () => props.resolvedId,
  (value) => {
    chosenId.value = value ?? CHOSEN_NONE
  },
)

const chosen = computed(() => props.options.find(option => option.id === chosenId.value) ?? null)

const decide = (option: AiApprovalOption): void => {
  if (chosenId.value) return
  chosenId.value = option.id
  emit('decide', option)
}

const layoutTransition = computed(() => (reducedMotion.value === true ? { duration: 0 } : SPRING_DEFAULT))

const resolvedFrom = computed(() =>
  reducedMotion.value === true ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 },
)

const resolvedTo = { opacity: 1, scale: 1 }

const resolvedTransition = computed(() => (reducedMotion.value === true ? { duration: 0 } : SPRING_DEFAULT))

const optionsExit = computed(() =>
  reducedMotion.value === true ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.98 },
)

const optionsTransition = computed(() =>
  reducedMotion.value === true ? { duration: 0 } : { duration: 0.16, ease: EASE_OUT },
)

const optionFrom = computed(() =>
  reducedMotion.value === true ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 },
)

const optionTo = { opacity: 1, y: 0 }

const CHOICE_STAGGER = 0.03

/**
 * Built once per change to the options rather than per render: a fresh
 * transition object restarts the spring for every option on any parent
 * re-render, which a live transcript triggers constantly.
 */
const optionTransitions = computed(() =>
  props.options.map((_, index) =>
    reducedMotion.value === true
      ? { duration: 0 }
      : { ...SPRING_DEFAULT, delay: index * CHOICE_STAGGER },
  ),
)
</script>
