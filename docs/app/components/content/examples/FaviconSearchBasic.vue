<template>
  <div class="flex w-full justify-center py-6">
    <div class="w-full max-w-md space-y-3">
      <MFaviconSearch
        :results="results"
        label="Search the docs"
        placeholder="Search documentation…"
        @select="selected = $event.title"
      />

      <p class="text-xs text-muted">
        {{ selected ? `Opening ${selected}` : 'Type to filter, then use the arrow keys.' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const results = [
  {
    id: 'vue',
    title: 'Vue.js',
    description: 'The progressive JavaScript framework',
    url: 'https://vuejs.org',
  },
  {
    id: 'nuxt',
    title: 'Nuxt',
    description: 'The full-stack Vue framework',
    url: 'https://nuxt.com',
  },
  {
    id: 'motion',
    title: 'Motion for Vue',
    description: 'A production-ready animation library',
    url: 'https://motion.dev',
  },
  {
    id: 'ui',
    title: 'Nuxt UI',
    description: 'A UI library for Nuxt applications',
    url: 'https://ui.nuxt.com',
  },
]

const selected = ref('')
</script>
