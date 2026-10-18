<template>
  <div class="relative h-96 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-900 to-black">
    <MBackgroundBeams
      class="h-full w-full"
      :num-paths="15"
      :stroke-opacity="0.7"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
      <div class="mb-6">
        <div class="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-zap"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <h2 class="text-4xl font-bold text-white mb-4">
        Beam Network
      </h2>
      <p class="text-gray-300 max-w-md mb-8">
        Connect your interface with dynamic beam effects that create a futuristic and engaging user experience
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Explore Features
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          size="lg"
        >
          View Documentation
        </UButton>
      </div>
    </div>
  </div>
</template>
