<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div
      v-for="sample in samples"
      :key="sample.align"
      class="rounded-xl border border-default p-4"
    >
      <p class="mb-2 text-xs uppercase tracking-wide text-dimmed">
        align="{{ sample.align }}"
      </p>
      <MKineticTypeScroll
        :words="sample.words"
        :align="sample.align"
        class="text-2xl font-semibold"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const samples = [
  { align: 'start' as const, words: ['Left', 'aligned', 'wave'] },
  { align: 'center' as const, words: ['Centre', 'aligned', 'wave'] },
  { align: 'end' as const, words: ['Right', 'aligned', 'wave'] },
]
</script>
