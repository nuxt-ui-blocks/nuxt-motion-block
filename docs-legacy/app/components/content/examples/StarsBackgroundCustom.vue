<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-blue-900 to-purple-900">
    <MStarsBackground
      :star-density="0.0003"
      :twinkle-probability="0.9"
      :min-twinkle-speed="0.2"
      :max-twinkle-speed="0.8"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="text-xl font-bold text-white mb-2">
        Dense Twinkling Stars
      </h3>
      <p class="text-gray-300">
        More stars with faster twinkling
      </p>
    </div>
  </div>
</template>
