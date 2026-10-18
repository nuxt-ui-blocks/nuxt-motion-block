<template>
  <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl max-w-2xl mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
        Pixelated Canvas
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Retro-style pixelated images with customizable pixel sizes for nostalgic effects
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow flex justify-center">
      <MPixelatedCanvas
        src="https://picsum.photos/400/300"
        :width="400"
        :height="300"
        :cell-size="6"
        class="rounded-lg"
      />
    </div>

    <div class="mt-6 grid grid-cols-3 gap-3">
      <UButton
        v-for="size in [2, 4, 6]"
        :key="size"
        :color="size === 6 ? 'primary' : 'gray'"
        variant="solid"
        size="sm"
        @click="updatePixelSize(size)"
      >
        {{ size }}px Pixels
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pixelSize = ref(6)

const updatePixelSize = (size) => {
  pixelSize.value = size
}
</script>
