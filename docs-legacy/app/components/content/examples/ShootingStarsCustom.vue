<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-purple-900 to-blue-900">
    <MShootingStars
      star-color="#FFD700"
      trail-color="#FF4500"
      :min-speed="5"
      :max-speed="20"
      :min-delay="800"
      :max-delay="2000"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="text-xl font-bold text-white mb-2">
        Custom Shooting Stars
      </h3>
      <p class="text-gray-300">
        Gold stars with orange trails
      </p>
    </div>
  </div>
</template>
