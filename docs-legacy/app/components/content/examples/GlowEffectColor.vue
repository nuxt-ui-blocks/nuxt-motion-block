<template>
  <div class="flex flex-col items-center p-8">
    <div class="relative">
      <MGlowEffect
        mode="colorShift"
        blur="soft"
        :duration="3"
        :scale="0.9"
      />
      <div class="relative z-10 p-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow-lg">
        <h3 class="text-xl font-bold mb-2">
          Color Shifting Glow
        </h3>
        <p class="text-blue-100">
          Watch the colors transition smoothly
        </p>
      </div>
    </div>
  </div>
</template>
