<template>
  <div class="relative h-96 rounded-xl overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900">
    <MBackgroundRippleEffect
      :rows="6"
      :cols="12"
      :cell-size="30"
      class="absolute inset-0"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
      <div class="mb-6">
        <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-waveform"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <h2 class="text-4xl font-bold text-white mb-4">
        Ripple Effect
      </h2>
      <p class="text-blue-200 max-w-md mb-8">
        Create interactive water-like ripples that respond to user movements for an engaging tactile experience
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Try It Out
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          size="lg"
        >
          See Demo
        </UButton>
      </div>
    </div>
  </div>
</template>
