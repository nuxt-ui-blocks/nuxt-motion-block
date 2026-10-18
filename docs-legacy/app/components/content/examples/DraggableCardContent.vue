<template>
  <MDraggableCard>
    <template #header>
      <div class="flex items-center space-x-2">
        <UIcon
          name="i-lucide-image"
          class="w-5 h-5"
        />
        <h3 class="text-lg font-semibold">
          Media Card
        </h3>
      </div>
    </template>
    <div class="space-y-2">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        alt="Mountain"
        class="w-full h-32 object-cover rounded"
      >
      <p class="text-gray-600 dark:text-gray-400">
        Beautiful mountain landscape
      </p>
    </div>
  </MDraggableCard>
</template>
