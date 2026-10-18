<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <MAiDiff
      :decision="decision"
      :lines="lines"
      :on-accept="() => decision = 'accepted'"
      :on-reject="() => decision = 'rejected'"
      title="src/runtime/composables/useAiState.ts"
    />

    <UButton
      class="self-start"
      label="Propose another patch"
      size="sm"
      variant="soft"
      @click="replay"
    />
  </div>
</template>

<script setup lang="ts">
type DiffLine = {
  content: string
  kind: 'added' | 'removed' | 'context'
  number?: number
}

const lines = ref<DiffLine[]>([
  { content: 'export type AIState =', kind: 'context', number: 4 },
  { content: '  | \'idle\'', kind: 'removed', number: 5 },
  { content: '  | \'listening\'', kind: 'removed', number: 6 },
  { content: '  | \'thinking\'', kind: 'context', number: 7 },
  { content: '  | \'streaming\'', kind: 'added', number: 8 },
  { content: '  | \'done\'', kind: 'context', number: 9 },
  { content: '  | \'error\'', kind: 'context', number: 10 },
])

const decision = ref<'accepted' | 'rejected' | null>(null)

const replay = () => {
  // A new array identity clears the decision and replays the wipe.
  lines.value = [...lines.value]
  decision.value = null
}
</script>
