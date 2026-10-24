<template>
  <div class="flex w-full justify-center py-4">
    <MHoverExpand :items="items" class="max-w-3xl" />
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    id: 'lakeside',
    title: 'Lakeside',
    description: 'Still water at first light',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&h=700&fit=crop',
    alt: 'A lake between mountains at sunrise',
  },
  {
    id: 'desert',
    title: 'Desert',
    description: 'Dunes after the wind',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&h=700&fit=crop',
    alt: 'Rippled sand dunes',
  },
  {
    id: 'forest',
    title: 'Forest',
    description: 'Fog between the trunks',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&h=700&fit=crop',
    alt: 'Sunlight through a dense forest',
  },
  {
    id: 'coast',
    title: 'Coast',
    description: 'Low tide on black rock',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=700&fit=crop',
    alt: 'A sandy beach meeting turquoise water',
  },
]
</script>
