<template>
  <div class="flex h-80 w-full items-center justify-center">
    <MAppDownloadStack
      title="My Apps"
      :apps="apps"
    />
  </div>
</template>

<script setup lang="ts">
const apps = [
  { id: 1, name: 'Safari', icon: 'i-lucide-compass' },
  { id: 2, name: 'Photos', icon: 'i-lucide-image' },
  { id: 3, name: 'Podcasts', icon: 'i-lucide-mic' },
  { id: 4, name: 'Calendar', icon: 'i-lucide-calendar-days' },
]
</script>
