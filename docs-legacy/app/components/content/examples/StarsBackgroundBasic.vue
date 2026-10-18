<template>
  <div class="relative h-96 w-full overflow-hidden rounded-xl border bg-gradient-to-br from-gray-900 to-black">
    <MStarsBackground />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
      <div class="mb-8">
        <div class="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-sparkles"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <h2 class="text-4xl font-bold text-white mb-6">
        Starfield Background
      </h2>
      <p class="text-gray-300 max-w-md mb-8 text-lg">
        Create an immersive starfield background with twinkling stars for a cosmic user experience
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Explore Universe
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
