<template>
  <div class="flex w-full flex-wrap items-center justify-center gap-8 py-6">
    <MCircularProgress
      v-for="ring in rings"
      :key="ring.caption"
      :value="ring.value"
      :size="ring.size"
      :caption="ring.caption"
    />
  </div>
</template>

<script setup lang="ts">
const rings = [
  { value: 72, size: 132, caption: 'Storage' },
  { value: 45, size: 108, caption: 'Memory' },
  { value: 91, size: 84, caption: 'CPU' },
]
</script>
