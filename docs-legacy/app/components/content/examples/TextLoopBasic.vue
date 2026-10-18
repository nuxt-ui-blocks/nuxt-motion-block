<template>
  <div class="p-8">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Build
        <MTextLoop
          :items="['Modern', 'Innovative', 'Beautiful', 'Interactive']"
          class="text-blue-600 dark:text-blue-400"
        />
        Experiences
      </h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Create stunning interfaces with our collection of animated components that
        <MTextLoop
          :items="['transform', 'enhance', 'revolutionize', 'elevate']"
          class="text-purple-600 dark:text-purple-400 font-semibold"
        />
        the way users interact with your applications.
      </p>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex-1 text-center md:text-left">
            <h3 class="text-lg font-semibold mb-2">
              Real-time Preview
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              See changes instantly as you type with our live preview feature
            </p>
          </div>
          <MTextLoop
            :items="['99.9%', '10x', '50ms', '24/7']"
            class="text-3xl font-bold text-green-600 dark:text-green-400"
          />
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <UButton
          size="lg"
          color="primary"
        >
          Get Started
        </UButton>
        <UButton
          size="lg"
          variant="outline"
        >
          View Documentation
        </UButton>
      </div>
    </div>
  </div>
</template>
