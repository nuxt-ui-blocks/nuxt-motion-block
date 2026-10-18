<template>
  <div class="flex justify-center p-6">
    <MDraggableCard class="w-full max-w-md">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
            Interactive Widget
          </h3>
          <UBadge
            color="primary"
            variant="soft"
          >
            Drag Me
          </UBadge>
        </div>
      </template>
      <div class="space-y-6">
        <p class="text-gray-600 dark:text-gray-400">
          This draggable card can be moved around the screen. Try dragging it to reposition it anywhere!
        </p>
        <div class="flex items-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <UIcon
            name="i-lucide-info"
            class="w-6 h-6 text-blue-500 dark:text-blue-400 mr-4"
          />
          <span class="text-sm text-blue-700 dark:text-blue-300">Release to snap back to position</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <UButton
            color="primary"
            variant="solid"
            size="sm"
            block
          >
            Action
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            size="sm"
            block
          >
            Options
          </UButton>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-500 dark:text-gray-400">Drag handle in top right</span>
          <UIcon
            name="i-lucide-move"
            class="w-5 h-5 text-gray-400"
          />
        </div>
      </template>
    </MDraggableCard>
  </div>
</template>
