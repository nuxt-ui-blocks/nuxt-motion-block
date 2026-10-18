<template>
  <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl max-w-2xl mx-auto">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
        Proximity Effect
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Interactive text that responds to cursor proximity for engaging user experiences
      </p>
    </div>

    <link
      rel="stylesheet"
      href="https://rsms.me/inter/inter.css"
    >
    <div
      ref="containerRef"
      class="relative p-8 bg-white dark:bg-gray-800 rounded-lg shadow"
      style="font-family: 'Inter var', 'Inter', sans-serif;"
    >
      <MVariableProximity
        label="Hover Over Me"
        class="text-4xl font-bold text-center"
        :radius="100"
      />

      <div class="mt-6 text-center">
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          Move your cursor around the text to see the proximity effect in action
        </p>
      </div>
    </div>

    <div class="mt-6 flex justify-center">
      <UButton
        color="primary"
        variant="solid"
      >
        <UIcon
          name="i-lucide-mouse-pointer"
          class="w-4 h-4 mr-2"
        />
        Try It Yourself
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const containerRef = ref(null)
</script>
