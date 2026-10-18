<template>
  <div class="relative h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <MBoxesCore
      class="h-full w-full opacity-30"
      :rows="50"
      :cols="30"
      :skew="true"
      :colors="['#93c5fd', '#f9a8d4', '#86efac', '#fde047', '#fca5a5', '#d8b4fe']"
      :show-plus-signs="true"
      border-color="border-blue-200 dark:border-blue-800"
    />
    <div
      class="flex flex-col items-center justify-center text-center p-6"
    >
      <div class="p-6 max-w-md relative z-10">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Interactive Dashboard
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Hover over the grid to see interactive animations. This background effect enhances data visualization interfaces.
        </p>
        <UButton
          color="primary"
          size="lg"
        >
          Get Started
        </UButton>
      </div>
    </div>
  </div>
</template>
