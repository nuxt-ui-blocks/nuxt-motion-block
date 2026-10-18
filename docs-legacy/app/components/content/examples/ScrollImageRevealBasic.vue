<template>
  <div class="w-full max-w-lg space-y-3">
    <MScrollImageReveal
      :src="src"
      :alt="alt"
      mask="circle"
      class="h-64"
    />
    <p class="text-muted text-sm">
      The frame is absolutely positioned inside, so it needs an explicit height.
    </p>
  </div>
</template>

<script setup lang="ts">
const src = 'https://picsum.photos/seed/motion-reveal/900/600'
const alt = 'A misty mountain ridge at sunrise'
</script>
