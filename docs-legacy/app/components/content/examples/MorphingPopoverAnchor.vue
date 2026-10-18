<template>
  <div class="flex justify-center min-h-48 items-center">
    <MMorphingPopover>
      <template #anchor>
        <UInput placeholder="Focus to open popover" />
      </template>

      <template #content>
        <div class="p-4 w-64">
          <h3 class="font-bold text-lg mb-2">
            Anchor Slot
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            This popover uses the anchor slot.
          </p>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>
