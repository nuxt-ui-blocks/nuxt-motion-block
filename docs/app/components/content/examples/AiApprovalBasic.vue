<template>
  <div class="w-full max-w-md space-y-3">
    <MAiApproval
      :options="options"
      :question="question"
      :resolved-id="resolvedId"
      @decide="onDecide"
    >
      This deletes 4 branches and 18 commits. The backup ref stays for 30 days,
      and nothing here is reachable from `main`.
    </MAiApproval>

    <UButton
      v-if="resolvedId"
      color="neutral"
      size="xs"
      variant="ghost"
      @click="resolvedId = undefined"
    >
      Replay the decision
    </UButton>
  </div>
</template>

<script setup lang="ts">
type Option = { id: string, label: string, detail?: string, destructive?: boolean }

const question = 'Delete the stale branches?'

const options: Option[] = [
  { id: 'keep', label: 'Keep them', detail: 'No change' },
  { id: 'archive', label: 'Archive to a backup ref', detail: '4 branches' },
  { id: 'delete', label: 'Delete everything', detail: '18 commits', destructive: true },
]

/**
 * Held here only so the demo can be replayed; the card resolves itself without
 * it. In a real transcript this is the id that came back from the server.
 */
const resolvedId = ref<string | undefined>(undefined)

const onDecide = (option: Option) => {
  resolvedId.value = option.id
}
</script>
