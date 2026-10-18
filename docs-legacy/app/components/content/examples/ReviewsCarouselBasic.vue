<template>
  <div class="flex w-full max-w-xl flex-col gap-4">
    <MReviewsCarousel :reviews="reviews" />

    <p class="text-center text-xs text-muted">
      Hover the strip to hold the auto-advance, or drag it and use the arrows
    </p>
  </div>
</template>

<script setup lang="ts">
const reviews = [
  {
    author: 'Amara Osei',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'We replaced three tools with this one. The onboarding alone paid for the migration in the first month.',
  },
  {
    author: 'Tomas Lindqvist',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'The transitions are the part nobody asked for and everybody mentions. Nothing feels sluggish, even on a laptop.',
  },
  {
    author: 'Priya Raman',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    content: 'Docs are honest about the limits, which is rare. Took an afternoon to get a production feel out of it.',
  },
  {
    author: 'Diego Ferreiro',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    content: 'Support answered inside the hour with an actual patch, not a workaround. We have not looked back.',
  },
]
</script>
