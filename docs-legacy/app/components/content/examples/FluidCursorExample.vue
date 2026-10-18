<template>
  <div class="min-h-screen relative overflow-hidden">
    <canvas
      ref="canvasRef"
      class="absolute w-full h-full inset-0"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFluidCursor } from '#imports'

const canvasRef = ref()

useFluidCursor(canvasRef, { color: 'primary' })
</script>
