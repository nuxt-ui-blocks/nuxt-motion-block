<template>
  <div class="w-full max-w-xl">
    <MInlineTestimonials
      :text="text"
      :testimonials="testimonials"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * The names are the citation. Hovering, tapping or tabbing to one opens the
 * quote in place, so the claim and its evidence are never two screens apart.
 */
const text = 'The migration shipped on a Friday, which nobody wanted. {{maya}} rewrote the scheduler over two nights and {{theo}} caught the timezone bug that would have doubled every billing cycle. We have not had a missed run since.'

const testimonials = [
  {
    id: 'maya',
    name: 'Maya Okafor',
    role: 'Staff engineer, Platform',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    quote: 'The scariest part was not the migration itself, it was that nobody could tell me what still depended on the old scheduler. Writing that inventory first is what made the cutover boring.',
  },
  {
    id: 'theo',
    name: 'Theo Lindqvist',
    role: 'Backend engineer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
    quote: 'I only found the offset bug because a fixture used a negative UTC offset. Every production record looked perfect, which is exactly why it would have shipped.',
  },
]
</script>
