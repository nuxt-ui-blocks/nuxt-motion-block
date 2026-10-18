<template>
  <div class="flex w-full flex-col gap-4">
    <div class="flex items-center gap-2">
      <UButton
        size="sm"
        color="neutral"
        variant="subtle"
        @click="selectAll"
      >
        Select all
      </UButton>
      <UButton
        size="sm"
        color="neutral"
        variant="subtle"
        @click="clearSelection"
      >
        Clear
      </UButton>
      <span class="text-xs text-muted">{{ selected.length }} selected</span>
    </div>

    <MDragAndDrop
      ref="dragDropRef"
      :items="items"
      :allow-multi-select="true"
      @select="onSelect"
    >
      <template #default="{ item, isSelected, isDragging }">
        <div
          class="flex items-center gap-3 rounded-lg border border-default bg-default px-3 py-2.5"
          :class="isDragging ? 'opacity-60' : ''"
        >
          <span
            class="flex size-4 shrink-0 items-center justify-center rounded border transition-colors"
            :class="isSelected ? 'border-primary bg-primary text-inverted' : 'border-accented'"
          >
            <UIcon
              v-if="isSelected"
              name="i-lucide-check"
              class="size-3"
            />
          </span>
          <UIcon
            name="i-lucide-grip-vertical"
            class="size-4 shrink-0 text-dimmed"
          />
          <div class="min-w-0">
            <div class="text-sm font-medium text-highlighted">
              {{ item.name }}
            </div>
            <div class="text-xs text-muted">
              {{ item.status }}
            </div>
          </div>
        </div>
      </template>
    </MDragAndDrop>

    <p class="text-xs text-muted">
      Click a row to toggle it; ctrl/cmd-click to select several. The exposed
      <code>selectAll</code> and <code>clearSelection</code> methods drive the buttons.
    </p>
  </div>
</template>

<script setup lang="ts">
const dragDropRef = ref<{ clearSelection: () => void, selectAll: () => void }>()

const items = ref([
  { id: 'stage-1', name: 'Stage 1', status: 'In Progress' },
  { id: 'stage-2', name: 'Stage 2', status: 'Completed' },
  { id: 'stage-3', name: 'Stage 3', status: 'Pending' },
  { id: 'stage-4', name: 'Stage 4', status: 'In Progress' },
])

const selected = ref<string[]>([])

function onSelect(item: { id: string, name: string, status: string }, isSelected: boolean) {
  selected.value = isSelected
    ? [...selected.value, item.id]
    : selected.value.filter(id => id !== item.id)
}

function clearSelection() {
  dragDropRef.value?.clearSelection()
  selected.value = []
}

function selectAll() {
  dragDropRef.value?.selectAll()
  selected.value = items.value.map(item => item.id)
}
</script>
