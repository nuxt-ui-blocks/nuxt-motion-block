<template>
  <div class="w-full max-w-lg space-y-3">
    <MScrollImageReveal
      :src="src"
      alt="Latched reveal"
      mask="wipe"
      once
      class="h-64"
    />
    <p class="text-sm text-muted">
      With <code>once</code> the image stays revealed after scrolling back up.
    </p>
  </div>
</template>

<script setup lang="ts">
const src = 'https://picsum.photos/seed/motion-once/900/600'
</script>
