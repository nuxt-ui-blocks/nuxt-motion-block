<template>
  <div class="relative h-64 rounded-lg overflow-hidden">
    <MDottedGlowBackground
      :gap="20"
      :radius="3"
      :opacity="0.8"
      glow-color="rgba(236, 72, 153, 0.85)"
      class="background"
    />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">
        Custom Dotted Glow
      </h3>
    </div>
  </div>
</template>
