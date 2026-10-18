<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gray-900">
    <MBackgroundLines
      :colors="['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6']"
      :svg-options="{ duration: 15 }"
    >
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-white space-y-4">
        <h3 class="text-2xl font-bold">
          Custom Colors
        </h3>
        <p class="text-center max-w-md text-gray-300">
          Lines with custom colors and animation duration
        </p>
      </div>
    </MBackgroundLines>
  </div>
</template>

<script setup>
// This component will be registered globally in the documentation app
</script>
