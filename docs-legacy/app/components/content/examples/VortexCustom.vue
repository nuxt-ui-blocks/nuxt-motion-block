<template>
  <MVortex
    :particle-count="500"
    :base-hue="300"
    :base-speed="0.5"
    :range-speed="1.0"
    :base-radius="2"
    :range-radius="4"
    background-color="transparent"
    class="rounded-xl h-64"
  >
    <div class="text-center space-y-4">
      <h2 class="text-2xl font-bold text-white">
        Purple Vortex
      </h2>
      <p class="text-gray-300">
        Custom purple color scheme
      </p>
    </div>
  </MVortex>
</template>
