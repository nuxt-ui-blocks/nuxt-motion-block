<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
    <MDirectionalLight
      class="left-0 top-0"
      fill="#3B82F6"
    />
    <MDirectionalLight
      class="left-1/3 top-1/4"
      fill="#8B5CF6"
    />
    <MDirectionalLight
      class="left-2/3 top-1/2"
      fill="#EF4444"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Directional Light
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Multiple directional lights with different colors and positions
      </p>
    </div>
  </div>
</template>
