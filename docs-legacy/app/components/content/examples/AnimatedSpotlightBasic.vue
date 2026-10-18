<template>
  <div class="relative h-96 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    <MAnimatedSpotlight
      :translate-y="-200"
      :width="400"
      :height="1000"
      class="absolute inset-0"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
      <div class="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
        <UIcon
          name="i-lucide-search"
          class="w-10 h-10 text-white"
        />
      </div>
      <h3 class="text-3xl font-bold text-white mb-4">
        Spotlight Search
      </h3>
      <p class="text-gray-300 max-w-md mb-8">
        Focus attention on key elements with our animated spotlight effect that guides users through your interface
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Try It Now
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          size="lg"
        >
          View Demo
        </UButton>
      </div>
    </div>
  </div>
</template>
