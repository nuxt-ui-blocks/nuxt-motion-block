<template>
  <div class="relative h-96 w-full overflow-hidden rounded-xl border bg-gray-900">
    <MBackgroundLines>
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
        <div class="mb-6">
          <div class="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mx-auto">
            <UIcon
              name="i-lucide-grid-3x3"
              class="w-10 h-10 text-white"
            />
          </div>
        </div>
        <h2 class="text-4xl font-bold text-white mb-4">
          Grid System
        </h2>
        <p class="text-gray-300 max-w-md mb-8">
          Enhance your layouts with dynamic grid lines that create structure and visual rhythm in your designs
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <UButton
            color="primary"
            variant="solid"
            size="lg"
          >
            Learn More
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            size="lg"
          >
            View Demo
          </UButton>
        </div>
      </div>
    </MBackgroundLines>
  </div>
</template>
