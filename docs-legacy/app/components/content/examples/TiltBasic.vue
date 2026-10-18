<template>
  <div class="p-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Interactive Cards
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Experience our 3D tilt effects that respond to your cursor movements
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MTilt>
          <UCard class="h-full">
            <div class="text-center p-6">
              <div class="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
                <UIcon
                  name="i-lucide-zap"
                  class="w-8 h-8 text-blue-600 dark:text-blue-400"
                />
              </div>
              <h3 class="text-lg font-semibold mb-2">
                Lightning Fast
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Experience blazing performance with our optimized solution
              </p>
            </div>
          </UCard>
        </MTilt>

        <MTilt>
          <UCard class="h-full">
            <div class="text-center p-6">
              <div class="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-4">
                <UIcon
                  name="i-lucide-sparkles"
                  class="w-8 h-8 text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 class="text-lg font-semibold mb-2">
                Beautiful Effects
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Stunning animations that captivate your audience
              </p>
            </div>
          </UCard>
        </MTilt>

        <MTilt>
          <UCard class="h-full">
            <div class="text-center p-6">
              <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
                <UIcon
                  name="i-lucide-code"
                  class="w-8 h-8 text-green-600 dark:text-green-400"
                />
              </div>
              <h3 class="text-lg font-semibold mb-2">
                Easy Integration
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Simple to implement with clean documentation
              </p>
            </div>
          </UCard>
        </MTilt>
      </div>
    </div>
  </div>
</template>
