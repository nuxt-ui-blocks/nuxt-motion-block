<template>
  <div class="relative h-96 w-full overflow-hidden rounded-lg border bg-accented">
    <MBackgroundLines
      class="h-full"
      :colors="['primary', 'secondary', 'error']"
    >
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-highlighted">
        <h2 class="text-3xl font-bold mb-4">
          Background Lines
        </h2>
        <p class="text-lg mb-6 text-center max-w-md text-dimmed">
          Animated SVG lines with customizable colors
        </p>
        <button class="px-6 py-3 bg-default/10 backdrop-blur-sm rounded-full hover:bg-default/20 transition-colors">
          Explore
        </button>
      </div>
    </MBackgroundLines>
  </div>
</template>

<script setup>
// This component will be registered globally in the documentation app
</script>
