<template>
  <div class="flex justify-center items-center">
    <MMorphingPopover
      mode="hover"
      :open-delay="300"
      :close-delay="200"
    >
      <UButton color="secondary">
        Hover Popover
      </UButton>

      <template #content>
        <div class="p-4 w-64">
          <h3 class="font-bold text-lg mb-2">
            Hover Popover
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            This popover opens on hover with custom delays.
          </p>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>
