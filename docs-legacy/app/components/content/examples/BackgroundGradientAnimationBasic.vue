<template>
  <div class="h-96 w-full rounded-xl overflow-hidden relative">
    <MBackgroundGradientAnimation>
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
        <div class="mb-6">
          <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto">
            <UIcon
              name="i-lucide-paintbrush"
              class="w-10 h-10 text-white"
            />
          </div>
        </div>
        <h2 class="text-4xl font-bold text-white mb-4">
          Gradient Magic
        </h2>
        <p class="text-gray-200 max-w-md mb-8">
          Bring your interfaces to life with smoothly animated gradient backgrounds that captivate and engage users
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <UButton
            color="primary"
            variant="solid"
            size="lg"
          >
            Start Creating
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            size="lg"
          >
            View Examples
          </UButton>
        </div>
      </div>
    </MBackgroundGradientAnimation>
  </div>
</template>

<script setup>
// This component will be registered globally in the documentation app
</script>
