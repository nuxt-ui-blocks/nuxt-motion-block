<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Interactive Pixelated Canvas
    </h3>
    <MPixelatedCanvas
      src="https://picsum.photos/400/300?random=1"
      :width="400"
      :height="300"
      :cell-size="6"
      :distortion-strength="5"
      :distortion-radius="100"
      distortion-mode="swirl"
      :jitter-strength="3"
      class="rounded-lg border border-gray-200 dark:border-gray-700"
    />
  </div>
</template>
