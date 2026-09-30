<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { computed, onBeforeUnmount, ref } from 'vue'
import type { AiMessageAction, AiMessagePart, AiMessageRole } from '../types/ai'
import { getAiMessageText } from '../utils/ai-chat'

interface Props {
  /** Stable identity for the turn. Required, because React keys messages on it. */
  id: string
  role: AiMessageRole
  /**
   * The turn's content, split into typed pieces.
   *
   * A plain structural array rather than the AI SDK's `UIMessage['parts']`:
   * `ai` is only an optional peer of Nuxt UI, so depending on its types here
   * would make every consumer of this module install the SDK just to typecheck.
   */
  parts: AiMessagePart[]
  metadata?: unknown
  side?: 'left' | 'right'
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'naked'
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  /**
   * Wrap the turn in a bubble. Defaults to `true`.
   *
   * Opt out when the turn already carries its own surfaces — a reasoning trace, a
   * tool call, a diff. A bubble around a stack of cards reads as a box inside a
   * box, and the double border is what makes chat UIs feel heavy.
   */
  bubble?: boolean
  /** Offer a copy action when the turn has text. Defaults to `true`. */
  copyable?: boolean
  /** Extra actions, rendered after the copy button. */
  actions?: AiMessageAction[]
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  bubble: true,
  class: '',
  copyable: true,
  metadata: undefined,
  side: undefined,
  variant: undefined,
  color: undefined,
  actions: () => [],
})

defineSlots<{
  actions?: (props: { actions: AiMessageAction[] }) => unknown
  body?: (props: { id: string, role: AiMessageRole, parts: AiMessagePart[], metadata: unknown }) => unknown
  content?: (props: { content?: string, id: string, role: AiMessageRole, parts: AiMessagePart[], metadata: unknown }) => unknown
  files?: (props: { id: string, role: AiMessageRole, parts: AiMessagePart[], metadata: unknown }) => unknown
  header?: (props: { id: string, role: AiMessageRole, parts: AiMessagePart[], metadata: unknown }) => unknown
  leading?: (props: { id: string, role: AiMessageRole, parts: AiMessagePart[], metadata: unknown }) => unknown
}>()

const COPIED_RESET_MS = 1600
const ACTION_STAGGER_MS = 30

const isUser = computed(() => props.role === 'user')

const side = computed(() => props.side ?? (isUser.value ? 'right' : 'left'))

/**
 * A user turn is the one thing that reads as a bubble by default — solid
 * inverted, the way a sent message reads everywhere. An assistant turn stays soft
 * so it does not fight the cards it usually contains.
 */
const variant = computed(() => props.variant ?? (props.bubble ? (isUser.value ? 'solid' : 'soft') : 'naked'))

const text = computed(() => getAiMessageText(props))
const { copy } = useClipboard()
const hasCopied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined

onBeforeUnmount(() => clearTimeout(copyTimer))

const copyMessage = async () => {
  try {
    await copy(text.value)
  }
  catch {
    // A refused clipboard is not worth interrupting the reader over.
    return
  }

  hasCopied.value = true
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    hasCopied.value = false
  }, COPIED_RESET_MS)
}

const actions = computed<AiMessageAction[]>(() => {
  if (!props.copyable || !text.value) return props.actions

  return [
    {
      key: 'copy',
      icon: hasCopied.value ? 'i-lucide-check' : 'i-lucide-copy',
      label: hasCopied.value ? 'copied' : 'copy message',
      onClick: copyMessage,
    },
    ...props.actions,
  ]
})
</script>

<template>
  <UChatMessage
    :id="props.id"
    class="ai-message-root"
    :role="props.role"
    :parts="props.parts"
    :metadata="props.metadata"
    :side="side"
    :variant="variant"
    :color="props.color"
    :class="props.class"
  >
    <template #header="slotProps">
      <slot
        name="header"
        v-bind="slotProps"
      />
    </template>

    <template #leading="slotProps">
      <slot
        name="leading"
        v-bind="slotProps"
      />
    </template>

    <template #files="slotProps">
      <slot
        name="files"
        v-bind="slotProps"
      />
    </template>

    <template #body="slotProps">
      <slot
        name="body"
        v-bind="slotProps"
      />
    </template>

    <template #content="slotProps">
      <slot
        name="content"
        v-bind="slotProps"
      />
    </template>

    <template #actions="slotProps">
      <slot
        name="actions"
        v-bind="slotProps"
      />

      <button
        v-for="(action, index) in actions"
        :key="action.key"
        type="button"
        :aria-label="action.label"
        :aria-pressed="action.active === true"
        class="ai-message-action cursor-pointer rounded-lg p-1.5 text-muted hover:bg-muted hover:text-default aria-pressed:bg-muted aria-pressed:text-default"
        :class="[isUser ? 'ai-message-action-user' : 'ai-message-action-agent', action.active ? 'text-default' : '']"
        :style="{ transitionDelay: `${index * ACTION_STAGGER_MS}ms` }"
        @click="action.onClick()"
      >
        <UIcon
          :key="action.key === 'copy' && hasCopied ? 'copied' : 'idle'"
          :name="action.icon"
          class="ai-message-pop"
          aria-hidden="true"
          size="14"
        />
      </button>
    </template>
  </UChatMessage>
</template>

<style scoped>
/*
 * Nuxt UI already fades the whole action row in on hover. This owns the second
 * half of the reveal: each button arrives on its own, sliding in from the side it
 * belongs to, one frame apart. One property per owner — the row owns opacity,
 * these own transform — so the two never fight over the same fade.
 */
@media (hover: hover) {
  .ai-message-action {
    transform: translateX(var(--ai-message-slide)) scale(0.9);
    transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1), background-color 150ms ease-out, color 150ms ease-out;
  }

  .ai-message-root:hover .ai-message-action,
  .ai-message-root:focus-within .ai-message-action {
    transform: translateX(0) scale(1);
  }
}

/* Buttons slide in from the side of the message they belong to. */
.ai-message-action-agent {
  --ai-message-slide: -6px;
}

.ai-message-action-user {
  --ai-message-slide: 6px;
}

/*
 * The row is hover-only by design, which would hide it from anyone tabbing
 * through the page. Focus counts as intent.
 */
.ai-message-root:focus-within :deep([data-slot='actions']) {
  opacity: 1;
}

.ai-message-pop {
  animation: ai-message-pop 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes ai-message-pop {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ai-message-action {
    transform: none;
    transition: none;
  }

  .ai-message-pop {
    animation: none;
  }
}
</style>
