<template>
  <MFocusCards :cards="cards">
    <template #card="{ card }">
      <div class="p-4">
        <h3 class="text-xl font-bold mb-2">
          {{ card.title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          {{ card.description }}
        </p>
        <UButton
          color="primary"
          variant="solid"
          size="sm"
          class="mt-4"
        >
          Learn More
        </UButton>
      </div>
    </template>
  </MFocusCards>
</template>

<script setup>
const cards = [
  {
    id: 1,
    title: 'Custom Card 1',
    description: 'This card has custom content',
    src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Custom Card 2',
    description: 'Another card with custom styling',
    src: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
]
</script>
