<template>
  <div class="p-4 space-y-4">
    <MTilt
      :key="tiltKey"
      :rotation-factor="rotationFactor"
    >
      <div class="p-6 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] text-white rounded-xl shadow-xl">
        <h3 class="text-xl font-bold mb-2">
          Manual Tilt
        </h3>
        <p>Click the button to reset the tilt effect</p>
      </div>
    </MTilt>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      @click="resetTilt"
    >
      Reset Tilt
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const rotationFactor = ref(15)
const tiltKey = ref(0)

const resetTilt = () => {
  tiltKey.value++
}
</script>
