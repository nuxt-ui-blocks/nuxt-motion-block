<template>
  <div class="flex flex-col items-center p-8">
    <div class="relative">
      <MGlowEffect
        blur="strong"
        :scale="1.2"
      />
      <div class="relative z-10 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg">
        <h3 class="text-xl font-bold mb-2">
          Strong Blur Effect
        </h3>
        <p class="text-purple-100">
          Notice the intense glow around this element
        </p>
      </div>
    </div>
  </div>
</template>
