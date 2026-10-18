<template>
  <div class="flex justify-center">
    <MMorphingPopover>
      <UButton
        color="primary"
        variant="outline"
      >
        Styled Popover
      </UButton>

      <template #content>
        <div class="p-6 w-80 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg">
          <h3 class="font-bold text-lg mb-2">
            Styled Popover
          </h3>
          <p class="mb-4 opacity-90">
            This popover has custom gradient styling.
          </p>
          <div class="flex space-x-2">
            <UButton
              color="primary"
              variant="solid"
              size="sm"
            >
              Action
            </UButton>
            <UButton
              color="primary"
              variant="outline"
              size="sm"
            >
              Cancel
            </UButton>
          </div>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>
