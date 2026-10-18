<template>
  <div class="space-y-4">
    <div class="flex space-x-2">
      <UButton @click="open = true">
        Open
      </UButton>
      <UButton @click="open = false">
        Close
      </UButton>
    </div>

    <MMorphingPopover v-model:open="open">
      <UButton color="primary">
        Controlled Popover
      </UButton>

      <template #content="{ close }">
        <div class="p-4 w-80">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-lg">
              Controlled Popover
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              size="xs"
              icon="i-lucide-x"
              @click="close"
            />
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            This popover is controlled programmatically.
          </p>
          <UButton
            color="primary"
            variant="solid"
            size="sm"
            @click="open = false"
          >
            Close
          </UButton>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>
