<template>
  <div class="flex flex-col items-center space-y-6 p-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Welcome to Our Platform
      </h2>
      <MTypingText
        text="Discover amazing features and boost your productivity"
        class="text-lg text-gray-600 dark:text-gray-300"
      />
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-md w-full">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-3 h-3 bg-red-500 rounded-full" />
        <div class="w-3 h-3 bg-yellow-500 rounded-full" />
        <div class="w-3 h-3 bg-green-500 rounded-full" />
      </div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>
    </div>
  </div>
</template>
