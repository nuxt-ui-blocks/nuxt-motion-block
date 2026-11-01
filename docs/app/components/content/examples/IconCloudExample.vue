<template>
  <div class="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-xl border border-default bg-default">
    <MIconCloud
      class="h-full w-full"
      :images="icons"
      :icon-size="40"
      :speed="0.2"
    />
  </div>
</template>

<script setup lang="ts">
const icons = [
  'https://cdn.simpleicons.org/vuedotjs/42b883',
  'https://cdn.simpleicons.org/nuxt/00DC82',
  'https://cdn.simpleicons.org/typescript/3178C6',
  'https://cdn.simpleicons.org/tailwindcss/06B6D4',
  'https://cdn.simpleicons.org/vite/646CFF',
  'https://cdn.simpleicons.org/eslint/4B32C3',
  'https://cdn.simpleicons.org/prettier/F7B93E',
  'https://cdn.simpleicons.org/pnpm/F69220',
  'https://cdn.simpleicons.org/git/F05032',
  'https://cdn.simpleicons.org/github/ffffff',
  'https://cdn.simpleicons.org/nodedotjs/5FA04E',
  'https://cdn.simpleicons.org/vercel/ffffff',
]
</script>
