<template>
  <div class="p-4 space-y-4 flex flex-col">
    <MTextGlitch
      ref="glitchRef"
      text="MANUAL"
      trigger="manual"
    />
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      @click="triggerGlitch"
    >
      Trigger Glitch
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const glitchRef = ref(null)

const triggerGlitch = () => {
  if (glitchRef.value) {
    glitchRef.value.trigger()
  }
}
</script>
