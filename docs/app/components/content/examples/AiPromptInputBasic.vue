<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="value in states"
        :key="value"
        :color="state === value ? 'primary' : 'neutral'"
        :label="value"
        size="sm"
        :variant="state === value ? 'solid' : 'outline'"
        @click="state = value"
      />
    </div>

    <MAiPromptInput
      v-model="draft"
      :attachments="attachments"
      attachable
      :max-length="180"
      placeholder="Ask anything…"
      removable
      :state="state"
      @attach="onAttach"
      @remove-attachment="onRemoveAttachment"
      @submit="onSubmit"
      @stop="state = 'idle'"
    >
      <UButton
        color="neutral"
        icon="i-lucide-globe"
        size="xs"
        variant="ghost"
      />
    </MAiPromptInput>

    <p class="text-xs text-muted">
      {{ draft ? `last submit: "${submitted}"` : 'type something, or attach a file' }}
    </p>
  </div>
</template>

<script setup lang="ts">
type Attachment = {
  id: string
  name: string
  size?: number
}

type DemoState = 'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'

const states: DemoState[] = ['idle', 'thinking', 'streaming', 'done', 'error']

const draft = ref('')
const submitted = ref('')
const state = ref<DemoState>('idle')
const attachments = ref<Attachment[]>([])

const onAttach = () => {
  attachments.value = [
    ...attachments.value,
    { id: `f-${attachments.value.length + 1}`, name: 'token-audit.md', size: 18_432 },
  ]
}

const onRemoveAttachment = (id: string) => {
  attachments.value = attachments.value.filter(file => file.id !== id)
}

const onSubmit = (value: string) => {
  submitted.value = value
  attachments.value = []
  state.value = 'streaming'
}
</script>
