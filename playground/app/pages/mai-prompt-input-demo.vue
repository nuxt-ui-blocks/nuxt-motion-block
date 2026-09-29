<template>
  <div class="space-y-12">
    <UPageHeader
      title="AiPromptInput"
      description="A composer that takes the shared state but spends almost none of it. A field that changed shape per state would fight the text the user is writing, so only done and error get to say anything, and they say it with a one-pixel ring."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          State
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Streaming swaps the submit button for a stop button, which is the one
        place the state earns its keep. Press streaming, type something, then
        press stop and watch the draft come back — the component keeps the
        text you were working on so you can edit it.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="option in states"
          :key="option"
          :label="option"
          :variant="state === option ? 'solid' : 'outline'"
          :data-testid="`state-${option}`"
          @click="state = option"
        />
      </div>

      <MAiPromptInput
        v-model="value"
        class="max-w-2xl"
        placeholder="Ask anything…"
        :state="state"
        aria-label="Prompt"
        data-testid="composer"
        @submit="onSubmit"
        @stop="onStop"
      />

      <p class="mt-6 text-sm text-muted">
        Last submit:
        <span class="font-mono">{{ lastSubmit || '—' }}</span>
      </p>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Attachments
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Attachments are controlled and optional. The component renders the
        names and sizes, but it does not know what a file is, so adding one is
        entirely the parent's job — press attach and one is appended to the
        list below.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="attachable"
          :variant="attachable ? 'solid' : 'outline'"
          data-testid="attachable-toggle"
          @click="attachable = !attachable"
        />
        <UButton
          label="removable"
          :variant="removable ? 'solid' : 'outline'"
          data-testid="removable-toggle"
          @click="removable = !removable"
        />
        <UButton
          label="add a file"
          variant="soft"
          data-testid="add-attachment"
          @click="addAttachment"
        />
        <UButton
          label="clear"
          variant="ghost"
          data-testid="clear-attachments"
          @click="attachments = []"
        />
      </div>

      <MAiPromptInput
        v-model="value"
        class="max-w-2xl"
        :attachable="attachable"
        :attachments="attachments"
        :removable="removable"
        placeholder="Ask anything with a file…"
        aria-label="Prompt with attachments"
        @attach="addAttachment"
        @remove-attachment="removeAttachment"
      />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Uncontrolled, with a counter
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Leave the model value off and the composer owns its own draft, which is
        the common case. The counter appears only once the draft passes 80% of
        the limit — a count that is always visible is a count that trains
        people to ignore the limit.
      </p>

      <MAiPromptInput
        class="max-w-2xl"
        :max-length="120"
        placeholder="Type a very long prompt…"
        aria-label="Uncontrolled prompt"
        @submit="onSubmit"
      />

      <div class="mt-8 space-y-2">
        <p class="text-sm font-medium">
          Disabled
        </p>
        <MAiPromptInput
          class="max-w-2xl"
          disabled
          model-value="This draft cannot be edited."
          aria-label="Disabled prompt"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { AIState, AIPromptAttachment } from '../../../src/runtime/composables/useAiState'

const states: AIState[] = ['idle', 'listening', 'thinking', 'streaming', 'done', 'error']

const state = ref<AIState>('idle')
const value = ref('')
const lastSubmit = ref('')
const attachable = ref(true)
const removable = ref(true)
const attachments = ref<AIPromptAttachment[]>([
  { id: 'a', name: 'screenshot.png', size: 284_912 },
  { id: 'b', name: 'trace.json', size: 91_004 },
])

function addAttachment() {
  attachments.value = [
    ...attachments.value,
    { id: `${attachments.value.length}-${Math.random().toString(36).slice(2, 8)}`, name: `notes-${attachments.value.length + 1}.md`, size: 4_096 },
  ]
}

function removeAttachment(id: string) {
  attachments.value = attachments.value.filter(attachment => attachment.id !== id)
}

function onSubmit(submitted: string) {
  lastSubmit.value = submitted
  state.value = 'streaming'
}

function onStop() {
  state.value = 'idle'
}
</script>
