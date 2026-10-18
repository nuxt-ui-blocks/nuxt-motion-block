<template>
  <div class="flex justify-center">
    <MMorphingPopover>
      <UButton color="primary">
        Left Popover
      </UButton>

      <template #content>
        <div class="p-4 w-64">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-lg">
              Left Popover
            </h3>
            <UButton
              color="neutral"
              variant="ghost"
              size="xs"
              icon="i-lucide-x"
            />
          </div>
          <p class="text-gray-600 dark:text-gray-400">
            This popover appears to the left of the trigger.
          </p>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>
