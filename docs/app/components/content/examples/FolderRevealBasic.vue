<template>
  <div class="flex w-full flex-col items-center gap-6 py-4">
    <MFolderReveal
      label="Releases"
      :items="items"
    >
      <template #card="{ item }">
        <div class="flex h-full w-full flex-col gap-0.5 p-2">
          <span class="truncate text-[11px] font-semibold text-highlighted">{{ item.label }}</span>
          <span class="truncate text-[10px] leading-tight text-muted">{{ item.detail }}</span>
        </div>
      </template>
    </MFolderReveal>

    <p class="text-xs text-muted">
      Hover the folder, or Tab to it and press Enter.
    </p>
  </div>
</template>

<script setup lang="ts">
/**
 * Release notes are a natural fit: four sheets you would otherwise see as four
 * rows in a table, stacked into the object they actually belong to.
 */
const items = [
  { id: '2-4', label: 'v2.4', detail: 'Streams' },
  { id: '2-3', label: 'v2.3', detail: 'Rings' },
  { id: '2-2', label: 'v2.2', detail: 'Meter' },
  { id: '2-1', label: 'v2.1', detail: 'Branch' },
]
</script>
