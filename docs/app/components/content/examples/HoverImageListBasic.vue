<template>
  <div class="flex w-full justify-center py-4">
    <MHoverImageList :items="items" class="max-w-xl" />
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    id: 'nuxt',
    title: 'Nuxt',
    meta: 'The full-stack Vue framework',
    href: 'https://nuxt.com',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=600&fit=crop',
    alt: 'Code on a dark screen',
  },
  {
    id: 'motion',
    title: 'Motion for Vue',
    meta: 'A production-ready animation library',
    href: 'https://motion.dev',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop',
    alt: 'Retro computer hardware',
  },
  {
    id: 'nuxt-ui',
    title: 'Nuxt UI',
    meta: 'A UI library for Nuxt applications',
    href: 'https://ui.nuxt.com',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=600&fit=crop',
    alt: 'A designer working on an interface',
  },
  {
    id: 'docus',
    title: 'Docus',
    meta: 'Documentation that writes itself',
    href: 'https://docus.dev',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=600&fit=crop',
    alt: 'An open notebook and pen',
  },
]
</script>
