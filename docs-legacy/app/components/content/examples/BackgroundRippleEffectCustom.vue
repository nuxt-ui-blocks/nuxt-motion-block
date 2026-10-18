<template>
  <div class="relative h-64 rounded-lg overflow-hidden">
    <MBackgroundRippleEffect
      :rows="15"
      :cols="25"
      :cell-size="20"
    />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">
        Custom Ripple Effect
      </h3>
    </div>
  </div>
</template>
