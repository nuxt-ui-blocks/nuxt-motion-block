<template>
  <div class="flex w-full justify-center">
    <MScrollableCardStack :items="people" />
  </div>
</template>

<script setup lang="ts">
const people = [
  {
    id: 'ana',
    name: 'Ana Ruiz',
    handle: '@anaruiz',
    href: 'https://example.com/people/ana-ruiz',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=500&fit=crop',
    imageAlt: 'A studio desk with a notebook and a warm lamp',
  },
  {
    id: 'ben',
    name: 'Ben Osei',
    handle: '@bosei',
    href: 'https://example.com/people/ben-osei',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop',
    imageAlt: 'A speaker on stage in front of a full auditorium',
  },
  {
    id: 'cleo',
    name: 'Cleo Park',
    handle: '@cleopark',
    href: 'https://example.com/people/cleo-park',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
    imageAlt: 'A long communal table in a bright restaurant',
  },
  {
    id: 'dmitri',
    name: 'Dmitri Ilves',
    handle: '@dmitri',
    href: 'https://example.com/people/dmitri-ilves',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    imageAlt: 'A dark editor window filled with code',
  },
  {
    id: 'elin',
    name: 'Elin Haugen',
    handle: '@elin',
    href: 'https://example.com/people/elin-haugen',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=500&fit=crop',
    imageAlt: 'Mist drifting through a stand of tall pine trees',
  },
]
</script>
