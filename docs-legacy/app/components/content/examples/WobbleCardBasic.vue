<template>
  <div class="p-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Interactive Features
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Experience our unique interactive components with engaging effects
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MWobbleCard class="h-64">
          <template #header>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
                <UIcon
                  name="i-lucide-zap"
                  class="w-5 h-5 text-blue-400"
                />
              </div>
              <h3 class="text-lg font-semibold">
                Blazing quick
              </h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">
            Experience blazing performance with our optimized solution that delivers results instantly.
          </p>
          <template #footer>
            <UButton
              size="sm"
              color="primary"
            >
              Learn More
            </UButton>
          </template>
        </MWobbleCard>

        <MWobbleCard class="h-64">
          <template #header>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mr-3">
                <UIcon
                  name="i-lucide-sparkles"
                  class="w-5 h-5 text-purple-400"
                />
              </div>
              <h3 class="text-lg font-semibold">
                Beautiful Effects
              </h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">
            Stunning animations and visual effects that captivate your audience and enhance engagement.
          </p>
          <template #footer>
            <UButton
              size="sm"
              color="primary"
            >
              Learn More
            </UButton>
          </template>
        </MWobbleCard>

        <MWobbleCard class="h-64">
          <template #header>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
                <UIcon
                  name="i-lucide-code"
                  class="w-5 h-5 text-green-400"
                />
              </div>
              <h3 class="text-lg font-semibold">
                Plug-in ready
              </h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-400">
            Quick to add with clean documentation and well-structured APIs for quick adoption.
          </p>
          <template #footer>
            <UButton
              size="sm"
              color="primary"
            >
              Learn More
            </UButton>
          </template>
        </MWobbleCard>
      </div>
    </div>
  </div>
</template>
