<template>
  <div class="relative h-64 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
    <MBoxesCore
      class="h-full w-full"
      :rows="50"
      :cols="30"
      :skew="true"
      :colors="['#93c5fd', '#f9a8d4', '#86efac', '#fde047', '#fca5a5', '#d8b4fe']"
      :show-plus-signs="true"
      border-color="border-blue-200 dark:border-blue-800"
    />
    <div
      class="relative z-10 flex flex-col items-center justify-center p-4"
      style="height: 100%;"
    >
      <div class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 shadow-lg text-center">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">
          Boxes Core Test
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mt-1 text-sm">
          Hover over the grid to see animations
        </p>
      </div>
    </div>
  </div>
</template>
