<template>
  <div class="flex w-full flex-col items-center gap-5 px-6 py-10">
    <MArcadePixel
      animate="blink"
      class="rounded-lg bg-zinc-950 p-8 ring-1 ring-white/10"
      crt
      :glow="0.75"
      loop
      :palette="['transparent', 'var(--ui-error)', 'var(--ui-warning)']"
      :pixel-size="18"
      scanlines
      :sprite="heart"
    />

    <p class="text-xs text-muted">
      A sprite grid, a two-colour palette, scanlines and the CRT overlay.
    </p>
  </div>
</template>

<script setup lang="ts">
const heart = [
  [0, 1, 1, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 2, 1, 1, 1, 1, 1, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
]
</script>
