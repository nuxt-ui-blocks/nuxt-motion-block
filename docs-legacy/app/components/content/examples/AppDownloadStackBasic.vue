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
  { id: 1, name: 'Safari', icon: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=128&h=128&fit=crop&auto=format' },
  { id: 2, name: 'Photos', icon: 'https://images.unsplash.com/photo-1504812445817-cb3d4f235a14?w=128&h=128&fit=crop&auto=format' },
  { id: 3, name: 'Podcasts', icon: 'https://images.unsplash.com/photo-1593697820826-2e76c9720a99?w=128&h=128&fit=crop&auto=format' },
  { id: 4, name: 'Calendar', icon: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=128&h=128&fit=crop&auto=format' },
]
</script>
