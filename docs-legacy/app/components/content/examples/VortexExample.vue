<template>
  <MVortex
    :particle-count="1000"
    :base-hue="200"
    :base-speed="0.1"
    :range-speed="2.0"
    :base-radius="1"
    :range-radius="3"
    background-color="transparent"
    class="rounded-xl h-64"
  >
    <div class="text-center space-y-4">
      <h2 class="text-3xl font-bold text-white">
        Vortex Effect
      </h2>
      <p class="text-lg text-gray-300">
        Animated particle vortex with customizable parameters
      </p>
    </div>
  </MVortex>
</template>
