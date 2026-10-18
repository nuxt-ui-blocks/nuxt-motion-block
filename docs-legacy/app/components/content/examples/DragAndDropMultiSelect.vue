<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Multi-Select Drag and Drop
    </h3>
    <div class="mb-4 flex gap-2">
      <UButton
        size="sm"
        @click="clearSelection"
      >
        Clear Selection
      </UButton>
      <UButton
        size="sm"
        @click="selectAll"
      >
        Select All
      </UButton>
    </div>
    <MDragAndDrop
      ref="dragDropRef"
      v-model:items="items"
      layout="list"
      :allow-multi-select="true"
      :animation-duration="0.3"
      @select="handleSelect"
    >
      <template #default="{ item, isSelected }">
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center">
          <UCheckbox
            :model-value="isSelected"
            class="mr-3"
            @update:model-value="() => {}"
          />
          <UIcon
            name="i-lucide-grip-vertical"
            class="w-4 h-4 text-gray-400 mr-2"
          />
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              {{ item.name }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ item.status }}
            </div>
          </div>
        </div>
      </template>
    </MDragAndDrop>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dragDropRef = ref()
const items = ref([
  { id: 1, name: 'Task 1', status: 'In Progress' },
  { id: 2, name: 'Task 2', status: 'Completed' },
  { id: 3, name: 'Task 3', status: 'Pending' },
  { id: 4, name: 'Task 4', status: 'In Progress' },
])

const handleSelect = (item, selected) => {
  console.log(`Item ${item.name} ${selected ? 'selected' : 'deselected'}`)
}

const clearSelection = () => {
  dragDropRef.value?.clearSelection()
}

const selectAll = () => {
  dragDropRef.value?.selectAll()
}
</script>
