<template>
  <div class="flex w-full max-w-2xl gap-4">
    <div class="flex-1 space-y-2">
      <MScrollImageReveal
        :src="src"
        alt="Subtle parallax"
        :parallax="20"
        mask="wipe"
        class="h-64"
      />
      <p class="text-xs text-muted">
        parallax="20" — a gentle drift
      </p>
    </div>

    <div class="flex-1 space-y-2">
      <MScrollImageReveal
        :src="src"
        alt="Strong parallax"
        :parallax="140"
        mask="wipe"
        class="h-64"
      />
      <p class="text-xs text-muted">
        parallax="140" — a pronounced drift
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const src = 'https://picsum.photos/seed/motion-parallax/900/600'
</script>
