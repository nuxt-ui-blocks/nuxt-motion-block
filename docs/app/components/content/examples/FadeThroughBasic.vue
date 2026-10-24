<template>
  <div class="flex w-full items-center justify-center py-12">
    <MFadeThrough
      class="text-center text-3xl font-semibold text-highlighted"
      :phrases="phrases"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * A fade-through is deliberately quieter than a slide: the old copy leaves
 * before the new one arrives, so the line never looks like two strings at once.
 */
const phrases = [
  'One line at a time.',
  'No overlap, no jitter.',
  'Quiet by default.',
]
</script>
