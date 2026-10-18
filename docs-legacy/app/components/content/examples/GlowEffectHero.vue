<template>
  <div class="relative w-full h-96 rounded-xl overflow-hidden flex items-center justify-center">
    <!-- Background with subtle pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />

    <!-- Glow effect for the main CTA -->
    <div class="relative">
      <MGlowEffect
        mode="rotate"
        :colors="['#8B5CF6', '#EC4899', '#F59E0B']"
        blur="strong"
        :scale="1.3"
        :duration="6"
      />
      <div class="relative z-10 text-center p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Transform Your UI
        </h1>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Create stunning interfaces with our collection of animated components and effects
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            size="lg"
            class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Get Started
          </UButton>
          <UButton
            size="lg"
            variant="outline"
            class="px-8 py-3 font-bold rounded-lg border-white text-white hover:bg-white/10"
          >
            View Demo
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
