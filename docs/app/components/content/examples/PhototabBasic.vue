<template>
  <div class="flex w-full justify-center py-6">
    <MPhototab
      default-tab="Coast"
      :height="420"
      :tabs="tabs"
    />
  </div>
</template>

<script setup lang="ts">
const tabs = [
  { name: 'Mountains', icon: 'i-lucide-mountain', image: 'https://picsum.photos/seed/mountains/800/800' },
  { name: 'Coast', icon: 'i-lucide-waves', image: 'https://picsum.photos/seed/coast/800/800' },
  { name: 'Forest', icon: 'i-lucide-trees', image: 'https://picsum.photos/seed/forest/800/800' },
  { name: 'City', icon: 'i-lucide-building-2', image: 'https://picsum.photos/seed/city/800/800' },
]
</script>
