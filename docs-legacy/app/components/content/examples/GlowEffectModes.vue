<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    <!-- Rotate Mode -->
    <div class="relative">
      <MGlowEffect
        mode="rotate"
        :colors="['#FF5733', '#33FF57', '#3357FF']"
        blur="medium"
        :scale="1.1"
        :duration="4"
      />
      <div class="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
        <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg mb-4" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Rotate Mode
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Conic gradient that rotates continuously
        </p>
      </div>
    </div>

    <!-- Pulse Mode -->
    <div class="relative">
      <MGlowEffect
        mode="pulse"
        :colors="['#EC4899']"
        blur="strong"
        :scale="1.1"
        :duration="2"
      />
      <div class="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
        <div class="w-12 h-12 bg-pink-500 rounded-lg mb-4" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Pulse Mode
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Pulsing radial gradient with scale animation
        </p>
      </div>
    </div>

    <!-- Breathe Mode -->
    <div class="relative">
      <MGlowEffect
        mode="breathe"
        :colors="['#10B981']"
        blur="medium"
        :scale="1.05"
        :duration="3"
      />
      <div class="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
        <div class="w-12 h-12 bg-emerald-500 rounded-lg mb-4" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Breathe Mode
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Subtle breathing effect with gentle scale changes
        </p>
      </div>
    </div>

    <!-- Color Shift Mode -->
    <div class="relative">
      <MGlowEffect
        mode="colorShift"
        :colors="['#8B5CF6', '#A855F7', '#C084FC']"
        blur="medium"
        :scale="1.05"
        :duration="5"
      />
      <div class="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
        <div class="w-12 h-12 bg-purple-500 rounded-lg mb-4" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Color Shift
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Smooth transitions between multiple colors
        </p>
      </div>
    </div>

    <!-- Flow Horizontal Mode -->
    <div class="relative">
      <MGlowEffect
        mode="flowHorizontal"
        :colors="['#0EA5E9', '#06B6D4']"
        blur="medium"
        :scale="1.05"
        :duration="4"
      />
      <div class="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
        <div class="w-12 h-12 bg-cyan-500 rounded-lg mb-4" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Flow Horizontal
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Horizontal linear gradient flow animation
        </p>
      </div>
    </div>

    <!-- Static Mode -->
    <div class="relative">
      <MGlowEffect
        mode="static"
        :colors="['#F59E0B', '#F97316']"
        blur="medium"
        :scale="1.05"
      />
      <div class="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
        <div class="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg mb-4" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Static Mode
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Fixed gradient without animation
        </p>
      </div>
    </div>
  </div>
</template>
