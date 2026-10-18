<template>
  <div class="p-4 bg-elevated rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-highlighted">
      Pixelated Canvas
    </h3>
    <MPixelatedCanvas
      src="https://picsum.photos/400/300"
      :width="400"
      :height="300"
      :cell-size="8"
      class="rounded-lg"
    />
  </div>
</template>
