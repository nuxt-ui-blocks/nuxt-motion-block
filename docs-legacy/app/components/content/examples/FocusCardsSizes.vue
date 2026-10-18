<template>
  <MFocusCards
    :cards="cards"
    class="h-96"
  />
</template>

<script setup>
const cards = [
  {
    id: 1,
    title: 'Large Card',
    description: 'This card has a larger height',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Another Large Card',
    description: 'Consistent sizing across all cards',
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
]
</script>
