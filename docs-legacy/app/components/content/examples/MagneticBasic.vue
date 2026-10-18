<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <div class="text-center max-w-2xl">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Interactive Experience
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        Move your cursor around to feel the magnetic attraction effect on these interactive elements.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      <MMagnetic
        :intensity="0.8"
        :range="120"
      >
        <UCard class="h-full cursor-pointer hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon
                name="i-lucide-zap"
                class="w-8 h-8 text-blue-600 dark:text-blue-400"
              />
            </div>
            <h3 class="text-xl font-semibold mb-2">
              Lightning Fast
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Experience blazing fast performance with our optimized solutions.
            </p>
          </div>
        </UCard>
      </MMagnetic>

      <MMagnetic
        :intensity="1.2"
        :range="150"
      >
        <UCard class="h-full cursor-pointer hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon
                name="i-lucide-sparkles"
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
              />
            </div>
            <h3 class="text-xl font-semibold mb-2">
              Beautiful Effects
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Create stunning interfaces with our collection of animated components.
            </p>
          </div>
        </UCard>
      </MMagnetic>

      <MMagnetic
        :intensity="0.6"
        :range="100"
      >
        <UCard class="h-full cursor-pointer hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon
                name="i-lucide-code"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
            <h3 class="text-xl font-semibold mb-2">
              Easy Integration
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Simple to implement with clean, well-documented code.
            </p>
          </div>
        </UCard>
      </MMagnetic>
    </div>

    <div class="mt-8">
      <MMagnetic
        :intensity="1.5"
        :range="200"
      >
        <UButton
          size="lg"
          color="primary"
          class="px-8 py-3 text-lg font-semibold"
        >
          Get Started Now
        </UButton>
      </MMagnetic>
    </div>
  </div>
</template>
