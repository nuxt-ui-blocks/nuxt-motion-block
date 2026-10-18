<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <!-- Notification Badge -->
    <div class="relative">
      <MGlowEffect
        mode="pulse"
        :colors="['#EF4444']"
        blur="strong"
        :scale="1.1"
        :duration="2"
      />
      <div class="relative z-10">
        <div class="relative">
          <div class="w-3 h-3 bg-red-500 rounded-full" />
          <div class="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        </div>
      </div>
    </div>
    <p class="text-gray-600 dark:text-gray-400">
      Notification Badge
    </p>

    <!-- Notification Card -->
    <div class="relative">
      <MGlowEffect
        mode="breathe"
        :colors="['#3B82F6', '#60A5FA']"
        blur="medium"
        :scale="1.05"
        :duration="3"
      />
      <div class="relative z-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-64">
        <div class="flex items-start space-x-3">
          <div class="w-2 h-2 bg-blue-500 rounded-full mt-2" />
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white">
              New Message
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              You have a new message from Alex
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
              2 min ago
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
