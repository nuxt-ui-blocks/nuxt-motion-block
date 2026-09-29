<template>
  <div class="space-y-12">
    <UPageHeader
      title="ReviewsCarousel"
      description="Horizontal snap scroll carousel with staggered card entrance and auto-scroll."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Auto-Scrolling Reviews
        </p>
      </template>
      <MReviewsCarousel :reviews="reviews" />
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Three Reviews
        </p>
      </template>
      <MReviewsCarousel :reviews="reviews.slice(0, 3)" />
    </UCard>
  </div>
</template>

<script setup lang="ts">
const reviews = [
  {
    author: 'Emily Watson',
    rating: 5,
    content: 'Absolutely incredible experience! The attention to detail and smooth animations make this a joy to use.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    author: 'Marcus Johnson',
    rating: 4,
    content: 'Great product with some minor room for improvement. The core functionality is solid.',
    avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
  },
  {
    author: 'Aisha Patel',
    rating: 5,
    content: 'This changed the way I work. Highly recommend to anyone looking for a polished solution.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    author: 'Tom Bradley',
    rating: 5,
    content: 'The best tool I have used this year. Everything just works perfectly.',
    avatar: 'https://i.pravatar.cc/150?u=a04258111e29026704d',
  },
  {
    author: 'Nina Kowalski',
    rating: 4,
    content: 'Very impressed with the design quality. Clean, modern, and intuitive interface.',
    avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826024d',
  },
]
</script>
