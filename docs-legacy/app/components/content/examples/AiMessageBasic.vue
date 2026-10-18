<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="rounded-2xl border border-default p-4">
      <MAiMessage
        id="turn-1"
        :parts="[{ type: 'text', text: 'Ship the token audit behind a flag, or land it cold?' }]"
        role="user"
      />
    </div>

    <div class="rounded-2xl border border-default p-4">
      <MAiMessage
        id="turn-2"
        :actions="voteActions"
        :bubble="bubble"
        :parts="assistantParts"
        role="assistant"
      >
        <template #header>
          <span class="flex items-center gap-2 text-xs text-muted">
            <MAgentAvatar
              :seed="'reviewer'"
              :size="20"
            />
            Reviewer
          </span>
        </template>
      </MAiMessage>
    </div>

    <USwitch
      v-model="bubble"
      class="self-start"
      label="bubble"
    />
  </div>
</template>

<script setup lang="ts">
type MessageAction = {
  key: string
  icon: string
  label: string
  active?: boolean
  onClick: () => void
}

const bubble = ref(true)
const vote = ref<'up' | 'down' | null>(null)

const assistantParts = [
  { type: 'reasoning', text: 'Check blast radius, then pick a default.' },
  { type: 'text', text: 'Behind a flag. The audit walks every theme token, so landing it cold means a long tail of visual diffs nobody has reviewed yet.' },
]

const voteActions = computed<MessageAction[]>(() => [
  {
    key: 'up',
    icon: 'i-lucide-thumbs-up',
    label: 'good response',
    active: vote.value === 'up',
    onClick: () => vote.value = vote.value === 'up' ? null : 'up',
  },
  {
    key: 'down',
    icon: 'i-lucide-thumbs-down',
    label: 'bad response',
    active: vote.value === 'down',
    onClick: () => vote.value = vote.value === 'down' ? null : 'down',
  },
])
</script>
