<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <div
      v-for="meter in meters"
      :key="meter.note"
      class="flex items-center gap-3"
    >
      <MAiContextMeter
        :used="meter.used"
        :limit="meter.limit"
        :breakdown="breakdownFor(meter.used)"
      />
      <span class="text-xs text-muted">{{ meter.note }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Three windows at increasing pressure. The fractions are what matter, not the
 * exact numbers: 33% is quiet, 84% is amber, 98% is red.
 */
const meters = [
  { note: 'A fresh conversation', used: 42_000, limit: 128_000 },
  { note: 'A long document', used: 108_000, limit: 128_000 },
  { note: 'A long document, still open', used: 126_000, limit: 128_000 },
]

/**
 * The split is illustrative, but it has to add up to `used` - a breakdown that
 * contradicts its own ring is the kind of detail that quietly teaches the wrong
 * thing.
 */
const breakdownFor = (used: number) => [
  { label: 'Conversation', tokens: Math.round(used * 0.55) },
  { label: 'Retrieved documents', tokens: Math.round(used * 0.3) },
  { label: 'System prompt', tokens: used - Math.round(used * 0.55) - Math.round(used * 0.3) },
]
</script>
