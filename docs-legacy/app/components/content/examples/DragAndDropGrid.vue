<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Drag and Drop Grid
    </h3>
    <MDragAndDrop
      v-model:items="items"
      layout="grid"
      :columns="3"
      :gap="16"
      :animation-duration="0.3"
    >
      <template #default="{ item }">
        <div class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <div class="font-medium text-gray-900 dark:text-white">
            {{ item.name }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ item.category }}
          </div>
        </div>
      </template>
    </MDragAndDrop>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Project A', category: 'Development' },
  { id: 2, name: 'Project B', category: 'Design' },
  { id: 3, name: 'Project C', category: 'Marketing' },
  { id: 4, name: 'Project D', category: 'Development' },
  { id: 5, name: 'Project E', category: 'Design' },
  { id: 6, name: 'Project F', category: 'Marketing' },
])
</script>
