<template>
  <div class="relative h-96 w-full overflow-hidden rounded-xl border bg-background">
    <MAuroraBackground>
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
        <div class="mb-6">
          <div class="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mx-auto">
            <UIcon
              name="i-lucide-sparkles"
              class="w-10 h-10 text-white"
            />
          </div>
        </div>
        <h2 class="text-4xl font-bold text-white mb-4">
          Aurora Experience
        </h2>
        <p class="text-gray-300 max-w-md mb-8">
          Create mesmerizing backgrounds with our aurora effect that adds depth and visual interest to your interfaces
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <UButton
            color="primary"
            variant="solid"
            size="lg"
          >
            Get Started
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
    </MAuroraBackground>
  </div>
</template>

<script setup>
// This component will be registered globally in the documentation app
</script>
