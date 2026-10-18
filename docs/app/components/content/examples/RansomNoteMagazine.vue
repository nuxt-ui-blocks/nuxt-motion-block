<template>
  <div class="flex flex-col items-center gap-6">
    <MRansomNote
      text="MEET ME AT NOON"
      animate="jitter"
      :intensity="0.9"
      :palette="palette"
      :fonts="fonts"
    />
    <p class="max-w-sm text-center text-sm text-muted">
      A custom paper stack and typeface pile, held in jitter mode. The scraps
      never settle — each one trembles on its own cycle, which is why the
      collage reads as paper that was never glued down.
    </p>
  </div>
</template>

<script setup>
const palette = ['#fffdf7', '#fdf1d0', '#f6e7c1', '#efe0be', '#e8d5ae']
const fonts = [
  'Georgia, serif',
  'Impact, sans-serif',
  '"Courier New", monospace',
  '"Comic Sans MS", cursive',
]
</script>
