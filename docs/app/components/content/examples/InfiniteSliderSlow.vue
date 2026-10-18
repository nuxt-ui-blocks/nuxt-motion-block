<template>
  <div class="rounded-lg bg-elevated p-4">
    <h3 class="mb-4 text-lg font-bold text-highlighted">
      Slow Infinite Slider
    </h3>
    <MInfiniteSlider
      :duration="60"
      class-name="gap-6"
    >
      <div
        v-for="i in 8"
        :key="i"
        class="flex h-40 w-40 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-2xl font-bold text-white"
      >
        {{ i }}
      </div>
    </MInfiniteSlider>
  </div>
</template>
