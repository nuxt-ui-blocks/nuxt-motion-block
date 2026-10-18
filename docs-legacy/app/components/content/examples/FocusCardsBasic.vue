<template>
  <MFocusCards
    :cards="cards"
    class="max-w-4xl mx-auto"
  />
</template>

<script setup>
const cards = [
  {
    id: 1,
    title: 'Mountain Adventure',
    description: 'Experience breathtaking mountain landscapes and challenging trails with our expert guides',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Nature',
    author: 'Alex Explorer',
  },
  {
    id: 2,
    title: 'Ocean Sunset',
    description: 'Stunning ocean views with vibrant sunset colors over the horizon and peaceful waters',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Seascape',
    author: 'Sam Photographer',
  },
  {
    id: 3,
    title: 'Forest Path',
    description: 'Peaceful walking trail through ancient woodland with rich biodiversity and wildlife',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Wildlife',
    author: 'Jordan Naturalist',
  },
  {
    id: 4,
    title: 'Desert Dunes',
    description: 'Golden sand dunes stretching to the horizon under starry skies and desert wildlife',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Desert',
    author: 'Taylor Adventurer',
  },
  {
    id: 5,
    title: 'City Lights',
    description: 'Urban skyline illuminated at night with modern architectural marvels and city life',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Urban',
    author: 'Morgan Urbanist',
  },
  {
    id: 6,
    title: 'Northern Lights',
    description: 'Aurora borealis dancing across the night sky in vibrant greens and purples',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    category: 'Aurora',
    author: 'Casey Aurora',
  },
]
</script>
