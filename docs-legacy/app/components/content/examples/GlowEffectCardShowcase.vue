<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
    <!-- Feature Card 1 -->
    <div class="relative">
      <MGlowEffect
        mode="colorShift"
        :colors="['#0EA5E9', '#06B6D4', '#14B8A6']"
        blur="medium"
        :scale="1.05"
        :duration="5"
      />
      <div class="relative z-10 h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mb-4">
          <UIcon
            name="i-heroicons-lightning-bolt"
            class="w-6 h-6 text-white"
          />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Lightning Fast
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Experience blazing fast performance with our optimized solutions.
        </p>
      </div>
    </div>

    <!-- Feature Card 2 -->
    <div class="relative">
      <MGlowEffect
        mode="flowHorizontal"
        :colors="['#8B5CF6', '#A855F7', '#C084FC']"
        blur="medium"
        :scale="1.05"
        :duration="6"
      />
      <div class="relative z-10 h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
          <UIcon
            name="i-heroicons-sparkles"
            class="w-6 h-6 text-white"
          />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Magical UI
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Create stunning interfaces with our collection of animated components.
        </p>
      </div>
    </div>

    <!-- Feature Card 3 -->
    <div class="relative">
      <MGlowEffect
        mode="breathe"
        :colors="['#10B981', '#34D399', '#6EE7B7']"
        blur="medium"
        :scale="1.05"
        :duration="4"
      />
      <div class="relative z-10 h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div class="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
          <UIcon
            name="i-heroicons-check-circle"
            class="w-6 h-6 text-white"
          />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Reliable
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Built with reliability and stability as our top priorities.
        </p>
      </div>
    </div>
  </div>
</template>
