<template>
  <div class="flex w-full max-w-md flex-col items-center gap-5">
    <div class="flex items-baseline justify-center gap-2">
      <span class="text-sm text-muted">Loved by</span>
      <MTextLoop
        :items="stats"
        class="text-xl font-bold text-primary"
        class-name="tabular-nums"
        :interval="1.6"
        :transition="{ type: 'spring', stiffness: 220, damping: 26 }"
        :variants="{
          initial: { y: -16, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: 16, opacity: 0 },
        }"
        :trigger="playing"
        @index-change="index = $event"
      />
      <span class="text-sm text-muted">teams</span>
    </div>

    <div class="flex items-center gap-3">
      <UButton
        :label="playing ? 'Pause' : 'Resume'"
        :icon="playing ? 'i-lucide-pause' : 'i-lucide-play'"
        variant="outline"
        @click="playing = !playing"
      />
      <span class="text-xs text-dimmed">#{{ index + 1 }} of {{ stats.length }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = ['12,000+', '8,500+', '23,000+', '4,200+']
const playing = ref(true)
const index = ref(0)
</script>
