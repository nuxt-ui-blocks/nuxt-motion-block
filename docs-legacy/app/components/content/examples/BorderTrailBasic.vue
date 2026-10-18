<template>
  <UCard class="relative overflow-hidden max-w-md mx-auto">
    <MBorderTrail
      class="bg-gradient-to-r from-green-500 to-teal-500"
      :size="40"
      :transition="{ duration: 3, ease: 'easeInOut' }"
    />
    <template #header>
      <div class="flex items-center">
        <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
          <UIcon
            name="i-lucide-bell"
            class="w-6 h-6 text-green-600 dark:text-green-400"
          />
        </div>
        <div>
          <h3 class="text-xl font-bold">
            Notification Center
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            You have new updates
          </p>
        </div>
      </div>
    </template>
    <div class="space-y-4">
      <div class="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4 flex-shrink-0">
          <UIcon
            name="i-lucide-mail"
            class="w-5 h-5 text-blue-600 dark:text-blue-400"
          />
        </div>
        <div>
          <p class="font-medium text-gray-900 dark:text-white">
            New message received
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            2 minutes ago
          </p>
        </div>
      </div>
      <div class="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <div class="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4 flex-shrink-0">
          <UIcon
            name="i-lucide-user-plus"
            class="w-5 h-5 text-purple-600 dark:text-purple-400"
          />
        </div>
        <div>
          <p class="font-medium text-gray-900 dark:text-white">
            Friend request
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            5 minutes ago
          </p>
        </div>
      </div>
      <div class="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <div class="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-4 flex-shrink-0">
          <UIcon
            name="i-lucide-heart"
            class="w-5 h-5 text-orange-600 dark:text-orange-400"
          />
        </div>
        <div>
          <p class="font-medium text-gray-900 dark:text-white">
            New like on your post
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            10 minutes ago
          </p>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex gap-3">
        <UButton
          color="primary"
          variant="solid"
          block
        >
          View All Notifications
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
        >
          Mark as Read
        </UButton>
      </div>
    </template>
  </UCard>
</template>
