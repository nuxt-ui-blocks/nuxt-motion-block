<template>
  <div class="relative h-48 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
    <MBoxesCore
      class="h-full w-full opacity-10"
      :rows="20"
      :cols="15"
      :colors="['#93c5fd', '#f9a8d4']"
      :skew="false"
      :show-plus-signs="false"
      border-color="border-default"
    />
    <div
      class="flex items-center justify-center"
    >
      <div class="text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 shadow-lg relative z-10">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Minimal Setup
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
          Simple configuration with default styling
        </p>
      </div>
    </div>
  </div>
</template>
