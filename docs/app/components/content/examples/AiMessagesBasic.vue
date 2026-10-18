<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="flex items-center gap-2">
      <UButton
        v-for="value in states"
        :key="value"
        :color="state === value ? 'primary' : 'neutral'"
        :label="value"
        :variant="state === value ? 'solid' : 'outline'"
        size="sm"
        @click="state = value"
      />
    </div>

    <div class="rounded-2xl border border-default">
      <MAiMessages
        :messages="messages"
        :state="state"
        class="max-h-72"
      >
        <template #leading="{ role }">
          <MAgentAvatar
            v-if="role !== 'user'"
            :seed="role"
            :size="28"
          />
        </template>
      </MAiMessages>
    </div>
  </div>
</template>

<script setup lang="ts">
type ChatMessage = {
  id: string
  role: 'system' | 'user' | 'assistant'
  parts: { type: string, text?: string }[]
  metadata?: unknown
}

type DemoState = 'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'

const states: DemoState[] = ['idle', 'thinking', 'streaming', 'done', 'error']
const state = ref<DemoState>('idle')

const messages = ref<ChatMessage[]>([
  {
    id: 'm-1',
    role: 'user',
    parts: [{ type: 'text', text: 'Why does the token audit need a flag?' }],
  },
  {
    id: 'm-2',
    role: 'assistant',
    parts: [{
      type: 'text',
      text: 'It walks every theme token, so landing it cold produces a long tail of visual diffs that nobody has reviewed yet.',
    }],
  },
])
</script>
