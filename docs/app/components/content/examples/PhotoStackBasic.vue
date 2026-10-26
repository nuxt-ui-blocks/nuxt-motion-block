<template>
  <div class="flex w-full items-center justify-center py-6">
    <MPhotoStack :photos="photos" />
  </div>
</template>

<script setup lang="ts">
const photos = [
  {
    id: 'mara',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=520&fit=crop',
    alt: 'Mara Okonkwo',
    name: 'Mara Okonkwo',
    role: 'Design engineer',
  },
  {
    id: 'noa',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=520&fit=crop',
    alt: 'Noa Bergström',
    name: 'Noa Bergström',
    role: 'Frontend lead',
  },
  {
    id: 'ines',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=520&fit=crop',
    alt: 'Ines Duarte',
    name: 'Ines Duarte',
    role: 'Solo founder',
  },
]
</script>
