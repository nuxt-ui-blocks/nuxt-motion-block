<template>
  <div class="flex flex-col items-center p-8">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
        Force Dot
      </h3>
      <p class="text-gray-600 dark:text-gray-400 max-w-md">
        Interactive physics-based dot that responds to cursor movements with realistic force simulations
      </p>
    </div>

    <div class="relative h-64 w-64 rounded-xl overflow-hidden border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <MForceDot class="w-full h-full" />
    </div>

    <div class="mt-6 flex gap-3">
      <UButton
        color="primary"
        variant="solid"
        size="sm"
      >
        <UIcon
          name="i-lucide-play"
          class="w-4 h-4 mr-2"
        />
        Start Simulation
      </UButton>
      <UButton
        color="gray"
        variant="outline"
        size="sm"
      >
        <UIcon
          name="i-lucide-rotate-ccw"
          class="w-4 h-4 mr-2"
        />
        Reset
      </UButton>
    </div>
  </div>
</template>
