<template>
  <div class="w-full h-full relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl">
    <MBoxesCore
      class="h-[500px] w-full opacity-20"
      :rows="50"
      :cols="40"
      :colors="['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']"
      :skew="true"
      :show-plus-signs="true"
      border-color="border-gray-200 dark:border-gray-700"
    />
    <div class="flex items-center justify-center p-4">
      <div class="text-center p-10 relative z-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
          <UIcon
            name="i-lucide-sparkles"
            class="w-5 h-5 text-blue-600 dark:text-blue-400"
          />
          <span class="text-blue-700 dark:text-blue-300 font-medium">Next-Gen UI</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Transform Your Digital Experience
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Create stunning interfaces with our collection of animated components that enhance user engagement and drive results.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <UButton
            size="lg"
            color="primary"
            class="px-8 py-3"
          >
            <UIcon
              name="i-lucide-rocket"
              class="w-5 h-5 mr-2"
            />
            Get Started
          </UButton>
          <UButton
            size="lg"
            variant="outline"
            class="px-8 py-3"
          >
            <UIcon
              name="i-lucide-play"
              class="w-5 h-5 mr-2"
            />
            Watch Demo
          </UButton>
        </div>
        <div class="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center">
            <UIcon
              name="i-lucide-check-circle"
              class="w-4 h-4 text-green-500 mr-2"
            />
            <span>No credit card required</span>
          </div>
          <div class="flex items-center">
            <UIcon
              name="i-lucide-check-circle"
              class="w-4 h-4 text-green-500 mr-2"
            />
            <span>14-day free trial</span>
          </div>
          <div class="flex items-center">
            <UIcon
              name="i-lucide-check-circle"
              class="w-4 h-4 text-green-500 mr-2"
            />
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
