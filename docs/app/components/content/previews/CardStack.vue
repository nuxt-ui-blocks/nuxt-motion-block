<script setup lang="ts">
const items = [
  { id: 1, title: 'Card', content: 'One of three stacked cards.', name: 'Ada', designation: 'Designer' },
  { id: 2, title: 'Card', content: 'They swap on a spring.', name: 'Linus', designation: 'Engineer' },
  { id: 3, title: 'Card', content: 'Hover to bring one forward.', name: 'Grace', designation: 'Product' },
]
</script>

<template>
  <div class="grid h-full w-full place-items-center">
    <MCardStack :items="items" />
  </div>
</template>
