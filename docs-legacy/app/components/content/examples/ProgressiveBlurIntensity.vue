<template>
  <div class="relative h-64">
    <img
      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      alt="Beach"
      class="w-full h-full object-cover"
    >
    <MProgressiveBlur
      :blur-intensity="0.5"
      :blur-layers="12"
      class="absolute inset-0"
    />
  </div>
</template>
