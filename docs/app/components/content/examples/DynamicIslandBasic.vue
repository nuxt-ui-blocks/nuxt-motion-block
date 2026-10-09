<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="overflow-hidden rounded-3xl bg-neutral-950 dark:bg-black">
      <MDynamicIsland
        :view="view"
        @update:view="selected = $event"
      />
    </div>

    <div class="flex items-center justify-between gap-3">
      <p class="text-xs text-muted">
        Switch views with the pill below it, or take control from here.
      </p>
      <USelect
        v-model="selected"
        :items="options"
        size="sm"
        class="w-36"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type IslandView = 'idle' | 'ring' | 'timer' | 'notification' | 'music'

const options = [
  { label: 'Self-driven', value: 'self-driven' },
  { label: 'Idle', value: 'idle' },
  { label: 'Ring', value: 'ring' },
  { label: 'Timer', value: 'timer' },
  { label: 'Notification', value: 'notification' },
  { label: 'Music', value: 'music' },
]

const selected = ref('self-driven')

// Leaving `view` undefined hands control back to the island's own switcher.
const view = computed<IslandView | undefined>(() =>
  selected.value === 'self-driven' ? undefined : (selected.value as IslandView),
)
</script>
