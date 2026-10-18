<template>
  <div class="relative h-96 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-xl overflow-hidden">
    <MSpotlight />
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
      <div class="mb-8">
        <div class="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-search"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <h3 class="text-4xl font-bold text-white mb-6">
        Spotlight Effect
      </h3>
      <p class="text-gray-300 max-w-md mb-8 text-lg">
        Focus attention on key elements with our spotlight effect that guides users through your interface
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
          Learn More
        </UButton>
      </div>
    </div>
  </div>
</template>
