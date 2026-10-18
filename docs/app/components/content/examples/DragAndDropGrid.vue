<template>
  <div class="flex w-full flex-col gap-4">
    <MDragAndDrop
      :items="items"
      layout="grid"
      :columns="3"
      :gap="16"
      @change="onChange"
    >
      <template #default="{ item, isDragging }">
        <div
          class="flex h-full flex-col items-center gap-1 rounded-lg border border-default bg-default p-4 text-center"
          :class="isDragging ? 'opacity-60' : ''"
        >
          <span class="text-sm font-medium text-highlighted">{{ item.name }}</span>
          <span class="text-xs text-muted">{{ item.category }}</span>
        </div>
      </template>
    </MDragAndDrop>

    <p class="text-xs text-muted">
      Drag a card onto another to reorder the grid.
    </p>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  { id: 'project-a', name: 'Project A', category: 'Development' },
  { id: 'project-beta', name: 'Project Beta', category: 'Design' },
  { id: 'project-gamma', name: 'Project Gamma', category: 'Marketing' },
  { id: 'project-d', name: 'Project D', category: 'Development' },
  { id: 'project-delta', name: 'Project Delta', category: 'Design' },
  { id: 'project-omega', name: 'Project Omega', category: 'Marketing' },
])

function onChange(next: { id: string, name: string, category: string }[]) {
  items.value = [...next]
}
</script>
