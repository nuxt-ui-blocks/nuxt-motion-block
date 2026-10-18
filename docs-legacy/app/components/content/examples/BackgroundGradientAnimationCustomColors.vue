<template>
  <div class="h-64 w-full rounded-lg overflow-hidden relative">
    <MBackgroundGradientAnimation
      gradient-background-start="rgb(255, 110, 110)"
      gradient-background-end="rgb(0, 17, 82)"
      first-color="255, 100, 100"
      second-color="100, 255, 200"
      third-color="200, 100, 255"
      :interactive="true"
    >
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-white space-y-4">
        <h3 class="text-2xl font-bold">
          Custom Colors
        </h3>
        <p class="text-center max-w-md">
          Gradient animation with custom color scheme
        </p>
      </div>
    </MBackgroundGradientAnimation>
  </div>
</template>

<script setup>
// This component will be registered globally in the documentation app
</script>
