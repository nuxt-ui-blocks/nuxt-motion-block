<template>
  <div class="p-4 space-y-4 flex flex-col">
    <MTextShimmerWave
      :key="waveKey"
      :text="waveText"
      class="text-xl font-bold"
    />
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      @click="triggerWave"
    >
      Replay Wave Animation
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const waveText = ref('Click Me')
const waveKey = ref(0)

const triggerWave = () => {
  waveKey.value++
}
</script>
