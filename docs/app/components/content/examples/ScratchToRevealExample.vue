<template>
  <div class="flex w-full flex-col items-center gap-3 py-6">
    <MScratchToReveal
      :width="320"
      :height="200"
      :threshold="45"
      class="border border-default"
      @complete="revealed = true"
    >
      <div class="flex flex-col items-center gap-1 text-center">
        <p class="text-xs uppercase tracking-widest text-muted">
          You won
        </p>
        <p class="text-3xl font-bold text-highlighted">
          20% off
        </p>
        <p class="text-xs text-muted">
          Code SCRATCH20
        </p>
      </div>
    </MScratchToReveal>
    <p class="text-xs text-muted">
      {{ revealed ? 'Cover lifted.' : 'Drag across the card to scratch it off.' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const revealed = ref(false)
</script>
