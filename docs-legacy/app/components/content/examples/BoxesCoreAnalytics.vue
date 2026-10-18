<template>
  <div class="relative h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <MBoxesCore
      class="h-full w-full opacity-30"
      :rows="40"
      :cols="30"
      :colors="['#86efac', '#22c55e', '#16a34a']"
      :skew="true"
      :show-plus-signs="false"
      border-color="border-emerald-200 dark:border-emerald-800"
    />
    <div class="flex flex-col items-center justify-center p-8">
      <div class="p-8 text-center max-w-2xl relative z-10">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-emerald-600 dark:text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Analytics Dashboard
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Real-time insights with interactive data visualizations. Hover over the background to see dynamic animations.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              24.8%
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              Conversion Rate
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              1.2K
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              Active Users
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">
              89.3%
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              Retention
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
