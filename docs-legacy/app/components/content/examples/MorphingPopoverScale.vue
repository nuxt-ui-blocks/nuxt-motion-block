<template>
  <div class="flex justify-center items-center">
    <MMorphingPopover :scale="0.9">
      <UButton color="secondary">
        Strong Morph
      </UButton>

      <template #content>
        <div class="p-4 w-64">
          <h3 class="font-bold text-lg mb-2">
            Strong Morphing
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            This popover uses a stronger morphing effect with scale 0.9.
          </p>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>
