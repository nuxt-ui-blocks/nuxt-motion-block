<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6">
    <div class="flex h-40 w-full items-center justify-center rounded-2xl border border-dashed border-default text-sm text-muted">
      Last event: {{ lastEvent }}
    </div>

    <MToolbarDynamic
      @open="lastEvent = 'open'"
      @close="lastEvent = 'close'"
    >
      <UButton
        variant="ghost"
        size="sm"
        square
        icon="i-lucide-pen"
      />
      <template #expanded>
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium">Editing</span>
          <UButton
            variant="ghost"
            size="sm"
            square
            icon="i-lucide-trash-2"
          />
          <UButton
            variant="ghost"
            size="sm"
            square
            icon="i-lucide-share-2"
          />
        </div>
      </template>
    </MToolbarDynamic>
  </div>
</template>

<script setup lang="ts">
const lastEvent = ref('none')
</script>
