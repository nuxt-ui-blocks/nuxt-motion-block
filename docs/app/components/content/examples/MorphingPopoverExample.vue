<template>
  <div class="flex justify-center">
    <MMorphingPopover>
      <UButton color="primary">
        Open Popover
      </UButton>

      <template #content>
        <div class="p-4 w-64">
          <h3 class="font-bold text-lg mb-2">
            Shape-shift popover
          </h3>
          <p class="text-muted mb-4">
            This is a popover with morphing animations.
          </p>
          <UButton
            color="primary"
            variant="solid"
            size="sm"
          >
            Action
          </UButton>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>
