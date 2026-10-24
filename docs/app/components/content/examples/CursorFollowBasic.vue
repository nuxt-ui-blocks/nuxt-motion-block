<template>
  <div class="w-full">
    <MCursorFollow class="rounded-2xl border border-default">
      <div class="flex min-h-[320px] flex-wrap items-center justify-center gap-4 p-10">
        <button
          v-for="tile in tiles"
          :key="tile.label"
          :data-cursor-text="tile.label"
          class="rounded-xl border border-default bg-elevated px-6 py-4 text-sm font-medium text-highlighted transition-colors hover:bg-muted"
          type="button"
        >
          {{ tile.title }}
        </button>
      </div>
    </MCursorFollow>
  </div>
</template>

<script setup lang="ts">
const tiles = [
  { label: 'Open', title: 'Open project' },
  { label: 'Duplicate', title: 'Duplicate' },
  { label: 'Archive', title: 'Archive' },
  { label: 'Delete', title: 'Delete' },
]
</script>
