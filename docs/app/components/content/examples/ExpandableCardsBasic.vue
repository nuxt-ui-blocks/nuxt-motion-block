<template>
  <div class="w-full max-w-md">
    <MExpandableCards
      :items="items"
    />
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    title: 'What is Nuxt?',
    content: 'Nuxt is an open source framework that makes web development intuitive and powerful. Build performant and production-grade full-stack web apps and websites with confidence.',
  },
  {
    title: 'What is Nuxt Motion Block?',
    content: 'A collection of ready-to-use animated components built with motion-v and Nuxt. Copy, paste, and customize to add motion to your Nuxt apps.',
  },
  {
    title: 'Is it free to use?',
    content: 'Yes, Nuxt Motion Block is open source and free to use in your personal and commercial projects.',
  },
]
</script>
