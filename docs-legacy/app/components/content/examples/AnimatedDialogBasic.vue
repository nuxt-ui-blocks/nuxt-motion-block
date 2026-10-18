<template>
  <div class="flex justify-center w-full h-full">
    <MAnimatedDialog>
      <UButton
        label="Open Dialog"
        color="primary"
      />

      <template #body>
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">
            Animated Dialog
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            This dialog opens with smooth motion-v animations.
          </p>
          <UButton
            label="Action"
            color="primary"
            variant="outline"
            size="sm"
          />
        </div>
      </template>
    </MAnimatedDialog>
  </div>
</template>
