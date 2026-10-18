<template>
  <MAnimatedAvatarGroup
    :avatars="avatars"
    :max="4"
    size="lg"
    :overlap="0.35"
  />
</template>

<script setup lang="ts">
const avatars = [
  { src: 'https://randomuser.me/api/portraits/women/44.jpg', alt: 'Ana Ruiz' },
  { src: 'https://randomuser.me/api/portraits/men/32.jpg', alt: 'Ben Osei' },
  { src: 'https://randomuser.me/api/portraits/women/68.jpg', alt: 'Cleo Park' },
  { src: 'https://randomuser.me/api/portraits/men/75.jpg', alt: 'Dmitri Ilves' },
  { src: 'https://randomuser.me/api/portraits/women/90.jpg', alt: 'Elin Haugen' },
]
</script>
