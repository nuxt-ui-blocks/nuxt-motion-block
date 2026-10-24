<template>
  <div class="flex w-full items-center justify-center py-8 text-center">
    <p class="text-2xl font-semibold text-highlighted">
      <span class="text-muted">Motion built for </span>
      <MSharedAxis
        :phrases="phrases"
        axis="x"
      />
    </p>
  </div>
</template>

<script setup lang="ts">
/**
 * One axis, one line. The phrase changes direction as it leaves and arrives,
 * so the swap reads as a move rather than as a crossfade.
 */
const phrases = [
  'product tours.',
  'data dashboards.',
  'release notes.',
]
</script>
