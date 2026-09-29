<template>
  <div :class="rootClass">
    <div
      v-if="slots.avatar"
      class="mt-0.5 shrink-0"
    >
      <slot name="avatar" />
    </div>

    <div :class="columnClass">
      <!--
        `bubble` is opt-out on purpose: an assistant turn that already carries
        its own surfaces (a reasoning trace, a tool call, a diff) should not be
        wrapped again, because a bubble around a stack of cards reads as a box
        inside a box.
      -->
      <div :class="bubbleClass">
        <slot />
      </div>

      <!--
        The action row is always mounted and only faded. Mounting it on hover
        changed this row's height, which made every message below it jump as the
        pointer travelled down a thread.
      -->
      <div :class="actionRowClass">
        <span
          v-if="props.timestamp"
          class="text-muted text-xs tabular-nums"
        >
          {{ props.timestamp }}
        </span>

        <button
          v-for="(action, index) in actions"
          :key="action.key"
          :aria-label="action.label"
          :aria-pressed="action.active"
          :class="[
            'ai-message-action cursor-pointer rounded-lg p-1.5',
            isUser ? 'ai-message-action-user' : 'ai-message-action-agent',
            action.active
              ? 'text-default'
              : 'text-muted hover:bg-muted hover:text-default',
          ]"
          :style="{ transitionDelay: `${index * ACTION_STAGGER_MS}ms` }"
          type="button"
          @click="action.onClick"
        >
          <!-- The key flip is what re-runs the pop keyframe on every copy. -->
          <UIcon
            :key="action.key === 'copy' && hasCopied ? 'copied' : 'idle'"
            :class="action.key === 'copy' && hasCopied ? 'ai-message-pop' : undefined"
            :name="action.icon"
            aria-hidden="true"
            size="14"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useSlots } from 'vue'
import { useClipboard } from '@vueuse/core'

export type AiMessageVote = 'up' | 'down'

export interface AiMessageProps {
  /**
   * `from`, not `role` — `role` is an ARIA attribute, and overloading it would
   * put a presentational value into the accessibility tree.
   */
  from?: 'user' | 'assistant'
  bubble?: boolean
  class?: string
  /** Omit to hide the copy action entirely. */
  copyText?: string
  onRetry?: () => void
  onVote?: (vote: AiMessageVote) => void
  timestamp?: string
}

const props = withDefaults(defineProps<AiMessageProps>(), {
  bubble: true,
  class: '',
  copyText: '',
  from: 'assistant',
  timestamp: '',
})

const COPIED_RESET_MS = 1600
const ACTION_STAGGER_MS = 30

interface Action {
  active: boolean
  icon: string
  key: string
  label: string
  onClick: () => void
}

const slots = useSlots()
const isUser = computed(() => props.from === 'user')
const hasCopied = ref(false)
const vote = ref<AiMessageVote | null>(null)

const { copy } = useClipboard()

let copyTimer: ReturnType<typeof setTimeout> | null = null
onBeforeUnmount(() => {
  if (copyTimer) {
    clearTimeout(copyTimer)
  }
})

const copyMessage = async () => {
  try {
    await copy(props.copyText)
  }
  catch {
    // A blocked or denied clipboard is not worth interrupting a conversation
    // over, so the acknowledgement is simply withheld.
    return
  }
  hasCopied.value = true
  if (copyTimer) {
    clearTimeout(copyTimer)
  }
  copyTimer = setTimeout(() => {
    hasCopied.value = false
  }, COPIED_RESET_MS)
}

const actions = computed<Action[]>(() => {
  const list: Action[] = []

  if (props.copyText) {
    list.push({
      active: hasCopied.value,
      icon: hasCopied.value ? 'i-lucide-check' : 'i-lucide-copy',
      key: 'copy',
      label: 'Copy message',
      onClick: copyMessage,
    })
  }

  if (props.onRetry) {
    list.push({
      active: false,
      icon: 'i-lucide-rotate-ccw',
      key: 'retry',
      label: 'Retry',
      onClick: () => props.onRetry?.(),
    })
  }

  // Voting on your own message makes no sense.
  if (props.onVote && !isUser.value) {
    list.push({
      active: vote.value === 'up',
      icon: 'i-lucide-thumbs-up',
      key: 'up',
      label: 'Good response',
      onClick: () => {
        vote.value = 'up'
        props.onVote?.('up')
      },
    })
    list.push({
      active: vote.value === 'down',
      icon: 'i-lucide-thumbs-down',
      key: 'down',
      label: 'Bad response',
      onClick: () => {
        vote.value = 'down'
        props.onVote?.('down')
      },
    })
  }

  return list
})

const rootClass = computed(() => [
  'ai-message-root flex w-full gap-2.5',
  isUser.value ? 'flex-row-reverse' : 'flex-row',
  props.class,
])

const columnClass = computed(() => [
  'flex min-w-0 flex-col gap-1',
  isUser.value && 'items-end',
])

const bubbleClass = computed(() => {
  const classes = ['w-fit max-w-prose text-sm leading-relaxed']
  if (props.bubble) {
    classes.push('rounded-2xl px-3.5 py-2.5')
    classes.push(isUser.value
      ? 'rounded-br-md bg-foreground text-background'
      : 'rounded-bl-md bg-muted text-default')
  }
  else {
    classes.push('text-default')
  }
  return classes
})

const actionRowClass = computed(() => [
  'flex items-center gap-1 px-1',
  isUser.value ? 'flex-row-reverse' : 'flex-row',
])
</script>

<style scoped>
/*
 * The whole reveal is CSS. The row is always in the document, so there is no
 * state to keep in sync, no listeners to leak, and no way for the row to be
 * stranded half-revealed. The selector is scoped to `.ai-message-root` rather
 * than a Tailwind `group`, so an unrelated `group` ancestor cannot reveal every
 * row on the page at once.
 */
.ai-message-action {
  opacity: 0;
  transform: translateX(var(--ai-message-slide)) scale(0.9);
  transition:
    opacity 200ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 200ms cubic-bezier(0.23, 1, 0.32, 1),
    background-color 150ms ease,
    color 150ms ease;
}

/* The actions slide out of the edge the bubble is anchored to. */
.ai-message-action-agent {
  --ai-message-slide: -6px;
}

.ai-message-action-user {
  --ai-message-slide: 6px;
}

.ai-message-root:hover .ai-message-action,
.ai-message-root:focus-within .ai-message-action {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.ai-message-pop {
  animation: ai-message-pop 250ms cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes ai-message-pop {
  0% { scale: 1; }
  45% { scale: 1.25; }
  100% { scale: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .ai-message-action {
    transition-duration: 0ms;
    transition-delay: 0ms !important;
    transform: none;
  }

  .ai-message-pop {
    animation: none;
  }
}
</style>
