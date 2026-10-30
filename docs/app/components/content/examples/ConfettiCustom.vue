<template>
  <div class="relative flex h-64 w-full flex-wrap items-center justify-center gap-3 overflow-hidden rounded-xl border border-default bg-default">
    <MConfetti
      ref="confetti"
      :ui="{ root: 'absolute inset-0 z-10' }"
    />
    <button
      v-for="preset in presets"
      :key="preset.label"
      class="rounded-lg border border-default bg-elevated px-4 py-2 text-sm font-medium text-highlighted transition hover:bg-elevated/70"
      @click="confetti?.fire(preset.options)"
    >
      {{ preset.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const confetti = ref<{ fire: (options?: Record<string, unknown>) => void } | null>(null)

const presets = [
  { label: 'Wide spray', options: { particleCount: 140, spread: 80 } },
  { label: 'Tight fountain', options: { particleCount: 60, spread: 20, duration: 3 } },
  { label: 'Left corner', options: { particleCount: 70, spread: 55, x: 40, y: 220 } },
]
</script>
