<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Variable Proximity
    </h3>
    <link
      rel="stylesheet"
      href="https://rsms.me/inter/inter.css"
    >
    <div
      ref="containerRef"
      class="relative"
      style="font-family: 'Inter var', 'Inter', sans-serif;"
    >
      <MVariableProximity
        label="Hover me! Nuxt Motion Block"
        class="text-4xl"
        from-font-variation-settings="'wght' 400, 'opsz' 9"
        to-font-variation-settings="'wght' 1000, 'opsz' 40"
        :radius="120"
        falloff="linear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const containerRef = ref(null)
</script>
