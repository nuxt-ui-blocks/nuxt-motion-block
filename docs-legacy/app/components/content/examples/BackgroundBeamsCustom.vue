<template>
  <div class="relative h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
    <MBackgroundBeams
      class="h-full w-full"
      :num-paths="35"
      :stroke-opacity="0.9"
      :gradient-colors="['#ff0000', '#ff0000', '#00ff00', '#0000ff']"
    />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">
        Custom Background Beams
      </h3>
    </div>
  </div>
</template>
