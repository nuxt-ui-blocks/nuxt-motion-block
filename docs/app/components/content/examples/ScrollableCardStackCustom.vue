<template>
  <div class="flex w-full flex-col items-center gap-4">
    <MScrollableCardStack
      :items="people"
      :card-height="320"
      :perspective="1400"
      :transition-duration="260"
    />

    <p class="max-w-sm text-center text-xs text-muted">
      A shallower card, a deeper perspective and a slower transform. Scroll,
      swipe or use the arrow keys to move through the stack.
    </p>
  </div>
</template>

<script setup lang="ts">
const people = [
  {
    id: 'mira',
    name: 'Mira Sol',
    handle: '@mirasol',
    href: 'https://example.com/people/mira-sol',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    imageAlt: 'A laptop showing a brightly lit analytics dashboard',
  },
  {
    id: 'tomas',
    name: 'Tomás Vega',
    handle: '@tomasvega',
    href: 'https://example.com/people/tomas-vega',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=500&fit=crop',
    imageAlt: 'A sculpture gallery with tall white walls',
  },
  {
    id: 'ines',
    name: 'Inês Duarte',
    handle: '@inesduarte',
    href: 'https://example.com/people/ines-duarte',
    avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=500&fit=crop',
    imageAlt: 'A quiet reading room with books and soft daylight',
  },
  {
    id: 'noor',
    name: 'Noor Haddad',
    handle: '@noorhaddad',
    href: 'https://example.com/people/noor-haddad',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=500&fit=crop',
    imageAlt: 'A plant-filled office with a long shared desk',
  },
]
</script>
