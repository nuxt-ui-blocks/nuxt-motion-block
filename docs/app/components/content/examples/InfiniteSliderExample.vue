<template>
  <div class="rounded-lg bg-elevated p-6">
    <h3 class="mb-4 text-lg font-bold text-highlighted">
      Infinite Slider
    </h3>
    <MInfiniteSlider
      :duration="20"
      class-name="gap-4"
    >
      <div
        v-for="i in 10"
        :key="i"
        class="flex h-32 w-32 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 text-xl font-bold text-white"
      >
        {{ i }}
      </div>
    </MInfiniteSlider>
  </div>
</template>
