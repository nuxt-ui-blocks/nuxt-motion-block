<template>
  <div class="relative flex h-64 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-default bg-default">
    <MConfetti
      ref="confetti"
      :ui="{ root: 'absolute inset-0 z-10' }"
    />
    <p class="text-sm text-muted">
      Fire a burst from the middle of the card
    </p>
    <button
      class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-inverted transition hover:opacity-90"
      @click="burst"
    >
      Celebrate
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const confetti = ref<{ fire: (options?: Record<string, unknown>) => void } | null>(null)

const burst = () => {
  confetti.value?.fire({ particleCount: 120, spread: 70 })
}
</script>
