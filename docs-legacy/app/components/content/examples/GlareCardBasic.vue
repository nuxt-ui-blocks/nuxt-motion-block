<template>
  <div class="p-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Featured Products
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Discover our premium collection with interactive 3D cards
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MGlareCard
          class="w-full h-80 bg-gray-800"
          glare-color="rgba(59,130,246,0.8)"
          glare-color-inner="rgba(59,130,246,0.65)"
          glare-color-outer="rgba(59,130,246,0)"
        >
          <div class="text-center space-y-4 p-6">
            <div class="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto">
              <UIcon
                name="i-lucide-zap"
                class="w-8 h-8 text-blue-400"
              />
            </div>
            <h3 class="text-2xl font-bold text-white">
              Lightning Fast
            </h3>
            <p class="text-slate-400">
              Experience blazing performance with our optimized solution
            </p>
            <div class="mt-4">
              <UButton
                color="primary"
                size="sm"
              >
                Learn More
              </UButton>
            </div>
          </div>
        </MGlareCard>

        <MGlareCard
          class="w-full h-80 bg-gray-800"
          glare-color="rgba(139,92,246,0.8)"
          glare-color-inner="rgba(139,92,246,0.65)"
          glare-color-outer="rgba(139,92,246,0)"
        >
          <div class="text-center space-y-4 p-6">
            <div class="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto">
              <UIcon
                name="i-lucide-sparkles"
                class="w-8 h-8 text-purple-400"
              />
            </div>
            <h3 class="text-2xl font-bold text-white">
              Beautiful Effects
            </h3>
            <p class="text-slate-400">
              Stunning animations that captivate your audience
            </p>
            <div class="mt-4">
              <UButton
                color="primary"
                size="sm"
              >
                Learn More
              </UButton>
            </div>
          </div>
        </MGlareCard>

        <MGlareCard
          class="w-full h-80 bg-gray-800"
          glare-color="rgba(16,185,129,0.8)"
          glare-color-inner="rgba(16,185,129,0.65)"
          glare-color-outer="rgba(16,185,129,0)"
        >
          <div class="text-center space-y-4 p-6">
            <div class="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <UIcon
                name="i-lucide-code"
                class="w-8 h-8 text-green-400"
              />
            </div>
            <h3 class="text-2xl font-bold text-white">
              Easy Integration
            </h3>
            <p class="text-slate-400">
              Simple to implement with clean documentation
            </p>
            <div class="mt-4">
              <UButton
                color="primary"
                size="sm"
              >
                Learn More
              </UButton>
            </div>
          </div>
        </MGlareCard>
      </div>
    </div>
  </div>
</template>
