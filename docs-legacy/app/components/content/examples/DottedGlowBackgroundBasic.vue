<template>
  <div class="relative h-80 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
    <MDottedGlowBackground
      :gap="15"
      :radius="2"
      class="background absolute inset-0"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
      <div class="mb-6">
        <div class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-sparkles"
            class="w-8 h-8 text-white"
          />
        </div>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Dotted Glow
      </h2>
      <p class="text-gray-700 dark:text-gray-300 max-w-md mb-6">
        Subtle glowing dot patterns that create depth and visual interest in your backgrounds
      </p>
      <UButton
        color="primary"
        variant="solid"
        size="md"
      >
        Customize Pattern
      </UButton>
    </div>
  </div>
</template>
