<template>
  <div class="flex justify-center items-center">
    <MMorphingPopover>
      <UButton
        color="primary"
        size="lg"
      >
        <UIcon
          name="i-lucide-help-circle"
          class="w-5 h-5 mr-2"
        />
        Help Center
      </UButton>

      <template #content>
        <div class="p-8 w-96">
          <div class="flex items-start mb-6">
            <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4 flex-shrink-0">
              <UIcon
                name="i-lucide-help-circle"
                class="w-6 h-6 text-blue-600 dark:text-blue-400"
              />
            </div>
            <div>
              <h3 class="font-bold text-xl mb-2 text-gray-900 dark:text-white">
                Need Help?
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Get assistance with our platform features
              </p>
            </div>
          </div>

          <div class="space-y-4 mb-8">
            <div class="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
              <UIcon
                name="i-lucide-book-open"
                class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-4"
              />
              <div>
                <div class="font-medium text-gray-900 dark:text-white">
                  Documentation
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Comprehensive guides and tutorials
                </div>
              </div>
            </div>
            <div class="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
              <UIcon
                name="i-lucide-message-circle"
                class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-4"
              />
              <div>
                <div class="font-medium text-gray-900 dark:text-white">
                  Contact Support
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  24/7 support team ready to help
                </div>
              </div>
            </div>
            <div class="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
              <UIcon
                name="i-lucide-youtube"
                class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-4"
              />
              <div>
                <div class="font-medium text-gray-900 dark:text-white">
                  Video Tutorials
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Step-by-step video guides
                </div>
              </div>
            </div>
          </div>

          <UButton
            color="primary"
            variant="solid"
            block
            size="lg"
          >
            Visit Help Center
          </UButton>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>
