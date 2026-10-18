<template>
  <MFocusCards
    :cards="cards"
    overlay-class="bg-gradient-to-t from-black/80 to-transparent"
  />
</template>

<script setup>
const cards = [
  {
    id: 1,
    title: 'Gradient Overlay',
    description: 'Cards with gradient overlay effect',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Dark Overlay',
    description: 'Enhanced text visibility with dark overlay',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
]
</script>
