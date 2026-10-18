<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Infinite Slider
    </h3>
    <MInfiniteSlider
      :duration="20"
      class="gap-4"
    >
      <div
        v-for="i in 10"
        :key="i"
        class="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl"
      >
        {{ i }}
      </div>
    </MInfiniteSlider>
  </div>
</template>
