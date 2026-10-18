<template>
  <div class="flex flex-col items-center space-y-10 p-10">
    <div class="text-center max-w-3xl">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Glitch Effect
      </h2>
      <p class="text-gray-600 dark:text-gray-400 text-lg mb-8">
        Add cyberpunk-style glitch effects to your text for a futuristic aesthetic
      </p>
    </div>

    <div class="flex justify-center">
      <MTextGlitch
        text="CYBERPUNK"
        class="text-6xl font-black"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
      <UCard class="text-center hover:shadow-xl transition-shadow">
        <UIcon
          name="i-lucide-zap"
          class="w-10 h-10 text-blue-500 mx-auto mb-4"
        />
        <h3 class="font-bold text-xl mb-2">
          High Energy
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Dynamic visual effects
        </p>
      </UCard>

      <UCard class="text-center hover:shadow-xl transition-shadow">
        <UIcon
          name="i-lucide-sparkles"
          class="w-10 h-10 text-purple-500 mx-auto mb-4"
        />
        <h3 class="font-bold text-xl mb-2">
          Futuristic
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Modern design aesthetic
        </p>
      </UCard>

      <UCard class="text-center hover:shadow-xl transition-shadow">
        <UIcon
          name="i-lucide-eye"
          class="w-10 h-10 text-green-500 mx-auto mb-4"
        />
        <h3 class="font-bold text-xl mb-2">
          Attention Grabbing
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Stand out from the crowd
        </p>
      </UCard>
    </div>

    <div class="mt-8">
      <UButton
        color="primary"
        variant="solid"
        size="lg"
      >
        <UIcon
          name="i-lucide-play"
          class="w-5 h-5 mr-2"
        />
        Try Glitch Effect
      </UButton>
    </div>
  </div>
</template>
