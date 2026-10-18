<template>
  <div class="w-full max-w-sm">
    <MPinnedList
      :items="items"
      :pinned-ids="pinnedIds"
      @update:pinned="pinnedIds = $event"
    />
  </div>
</template>

<script setup lang="ts">
const pinnedIds = ref(['nuxt', 'ui'])
const items = [
  { id: 'nuxt', title: 'Nuxt', meta: 'The Intuitive Vue Framework', icon: 'i-lucide-nuxt' },
  { id: 'ui', title: 'Nuxt UI', meta: 'A UI Library for Modern Web Apps', icon: 'i-lucide-layout-grid' },
  { id: 'content', title: 'Nuxt Content', meta: 'File-based CMS', icon: 'i-lucide-file-text' },
  { id: 'devtools', title: 'Nuxt DevTools', meta: 'Enhance your development experience', icon: 'i-lucide-wrench' },
  { id: 'image', title: 'Nuxt Image', meta: 'Optimized images for Nuxt', icon: 'i-lucide-image' },
]
</script>
