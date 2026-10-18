<template>
  <div class="flex justify-center items-center">
    <MMorphingPopover :arrow="true">
      <UButton color="warning">
        With Arrow
      </UButton>

      <template #content>
        <div class="p-4 w-64">
          <h3 class="font-bold text-lg mb-2">
            Arrow Indicator
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            This popover shows an arrow indicator pointing to the trigger.
          </p>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>
