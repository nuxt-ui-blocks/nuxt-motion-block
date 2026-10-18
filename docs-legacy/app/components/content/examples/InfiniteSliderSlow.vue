<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Slow Infinite Slider
    </h3>
    <MInfiniteSlider
      :duration="60"
      class="gap-6"
    >
      <div
        v-for="i in 8"
        :key="i"
        class="flex-shrink-0 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
      >
        {{ i }}
      </div>
    </MInfiniteSlider>
  </div>
</template>
