<template>
  <div class="p-4">
    <MTilt :rotation-factor="10">
      <div class="max-w-sm bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
        <div class="bg-gradient-to-r from-[#0d9488] to-[#14b8a6] h-48 flex items-center justify-center">
          <span class="text-white text-2xl font-bold">TEAL GRADIENT</span>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">
            Theme-Aligned Tilt
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            This card uses theme-consistent teal colors with a subtle tilt effect.
          </p>
          <button class="px-4 py-2 bg-[#0d9488] text-white rounded-lg hover:bg-[#14b8a6] transition-colors">
            Click Me
          </button>
        </div>
      </div>
    </MTilt>
  </div>
</template>
