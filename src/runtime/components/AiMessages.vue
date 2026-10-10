<template>
  <UChatMessages
    :messages="props.messages"
    :status="status"
    :user="user"
    :assistant="assistant"
    :compact="props.compact"
    :should-auto-scroll="props.shouldAutoScroll"
    :should-scroll-to-bottom="props.shouldScrollToBottom"
    :spacing-offset="props.spacingOffset"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <!--
      Every slot is handed straight through, because `ChatMessages` forwards the
      ones it does not consume (`actions`, `body`, `content`, `header`,
      `leading`) into each message — and because a caller who passes a `default`
      slot means to draw the list themselves.
    -->
    <template
      v-for="name in forwarded"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData ?? {}"
      />
    </template>
  </UChatMessages>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { AIState } from '../composables/useAiState'
import { getAIChatStatus } from '../composables/useAiState'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import aiMessages from '../theme/ai-messages'
import type { AiUIMessage } from '../types/ai'

interface Props {
  messages: AiUIMessage[]
  /**
   * The conversation's state, in this module's six-value vocabulary.
   *
   * Chat components only speak four of those, so the mapping happens here rather
   * than asking every consumer to translate. Pass `null`/`undefined` for a
   * settled conversation.
   */
  state?: AIState
  /** Extra props for the `user` role, merged over this module's defaults. */
  user?: Record<string, unknown>
  /** Extra props for the `assistant` role, merged over this module's defaults. */
  assistant?: Record<string, unknown>
  compact?: boolean
  shouldAutoScroll?: boolean
  shouldScrollToBottom?: boolean
  spacingOffset?: number
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  assistant: () => ({}),
  class: undefined,
  compact: false,
  shouldAutoScroll: false,
  shouldScrollToBottom: true,
  spacingOffset: 0,
  state: undefined,
  ui: undefined,
  user: () => ({}),
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiMessages', props, theme: aiMessages })

const slots = useSlots()
const forwarded = computed(() => Object.keys(slots))

const status = computed(() => getAIChatStatus(props.state))

/**
 * A user turn is the one thing that reads as a bubble by default. Assistant turns
 * stay soft rather than solid, so a turn that carries its own surfaces — a
 * reasoning trace, a tool call — is not boxed twice.
 *
 * The defaults are `as const` on purpose: an object literal in a computed widens
 * `side`, `variant` and `color` to `string`, which no longer matches the union
 * `ChatMessage` expects.
 */
const USER_DEFAULTS = { side: 'right', variant: 'solid', color: 'neutral' } as const
const ASSISTANT_DEFAULTS = { side: 'left', variant: 'soft' } as const

const user = computed(() => ({ ...USER_DEFAULTS, ...props.user }))
const assistant = computed(() => ({ ...ASSISTANT_DEFAULTS, ...props.assistant }))
</script>
