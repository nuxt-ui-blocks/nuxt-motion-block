<template>
  <div class="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
    <figure
      v-for="sample in samples"
      :key="sample.label"
      class="space-y-2"
    >
      <MScrollImageReveal
        :src="sample.src"
        :alt="sample.label"
        :mask="sample.mask"
        :direction="sample.direction"
        rounded="rounded-xl"
        class="h-40"
      />
      <figcaption class="text-xs text-muted">
        mask="{{ sample.mask }}" · direction="{{ sample.direction }}"
      </figcaption>
    </figure>
  </div>
</template>

<script setup lang="ts">
const samples = [
  { label: 'Wipe from the right', mask: 'wipe' as const, direction: 'right' as const, src: 'https://picsum.photos/seed/reveal-wipe/640/420' },
  { label: 'Curtain from the bottom', mask: 'curtain' as const, direction: 'up' as const, src: 'https://picsum.photos/seed/reveal-curtain/640/420' },
  { label: 'Blinds from the left', mask: 'blinds' as const, direction: 'left' as const, src: 'https://picsum.photos/seed/reveal-blinds/640/420' },
  { label: 'Scale up', mask: 'scale' as const, direction: 'left' as const, src: 'https://picsum.photos/seed/reveal-scale/640/420' },
]
</script>
