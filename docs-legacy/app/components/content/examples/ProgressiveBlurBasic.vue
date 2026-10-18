<template>
  <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl max-w-2xl mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
        Progressive Blur
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Create depth and focus effects with progressive blur that intensifies towards the edges
      </p>
    </div>

    <div class="relative h-80 rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        alt="Mountain Landscape"
        class="w-full h-full object-cover"
      >
      <MProgressiveBlur
        class="absolute inset-0"
        :intensity="20"
      />

      <div class="absolute bottom-4 left-4 right-4">
        <div class="bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <h4 class="font-bold text-white">
            Mountain Landscape
          </h4>
          <p class="text-gray-300 text-sm">
            Focus effect with progressive blur
          </p>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-center">
      <UButton
        color="primary"
        variant="solid"
        size="sm"
      >
        <UIcon
          name="i-lucide-sliders"
          class="w-4 h-4 mr-2"
        />
        Adjust Blur
      </UButton>
    </div>
  </div>
</template>
