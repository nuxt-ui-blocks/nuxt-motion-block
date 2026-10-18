<template>
  <div class="p-8">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Discover
        <MTextRoll
          children="Amazing Features"
          class="text-blue-600 dark:text-blue-400"
        />
      </h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Our platform offers
        <MTextRoll
          children="cutting-edge solutions"
          class="text-purple-600 dark:text-purple-400 font-semibold"
        />
        that help you achieve your goals faster.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <UCard class="text-center">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <UIcon
                name="i-lucide-zap"
                class="w-8 h-8 text-blue-600 dark:text-blue-400"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-2">
            <MTextRoll
              children="Lightning Fast"
              class="text-blue-600 dark:text-blue-400"
            />
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Optimized for performance with minimal load times
          </p>
        </UCard>

        <UCard class="text-center">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <UIcon
                name="i-lucide-sparkles"
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-2">
            <MTextRoll
              children="Beautiful Effects"
              class="text-purple-600 dark:text-purple-400"
            />
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Stunning animations that captivate your audience
          </p>
        </UCard>

        <UCard class="text-center">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <UIcon
                name="i-lucide-code"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-2">
            <MTextRoll
              children="Easy Integration"
              class="text-green-600 dark:text-green-400"
            />
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Simple to implement with clean, well-documented code
          </p>
        </UCard>
      </div>

      <div class="mt-12">
        <UButton
          size="lg"
          color="primary"
          class="px-8 py-3 text-lg"
        >
          Explore Features
        </UButton>
      </div>
    </div>
  </div>
</template>
