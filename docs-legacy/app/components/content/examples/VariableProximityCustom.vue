<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">
      Custom Variable Proximity
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
        label="Custom Proximity"
        class="text-5xl font-bold"
        from-font-variation-settings="'wght' 300, 'opsz' 12"
        to-font-variation-settings="'wght' 800, 'opsz' 36"
        :radius="150"
        falloff="linear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const containerRef = ref(null)
</script>
