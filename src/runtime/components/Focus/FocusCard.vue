<!-- components/FocusCard.vue -->
<template>
  <UCard
    :ui="{
      root: [
        'relative overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer group',
        'bg-gray-100 dark:bg-neutral-900',
        hovered !== null && hovered !== index && 'blur-sm scale-[0.98]',
      ],
      body: 'p-0 h-full',
      header: 'absolute top-0 left-0 right-0 z-20 bg-transparent border-0',
      footer: 'absolute bottom-0 left-0 right-0 z-20 bg-transparent border-0',
    }"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <!-- Background Image -->
    <img
      :src="card.src"
      :alt="card.title"
      class="object-cover absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
    >

    <!-- Overlay Content -->
    <div
      :class="[
        'absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent',
        'flex items-end py-8 px-4 transition-all duration-300',
        hovered === index ? 'opacity-100' : 'opacity-0',
      ]"
    >
      <div class="text-white space-y-2">
        <h3 class="text-xl md:text-2xl font-medium">
          {{ card.title }}
        </h3>
        <p
          v-if="card.description"
          class="text-gray-200 text-sm md:text-base"
        >
          {{ card.description }}
        </p>
      </div>
    </div>

    <!-- Default slot for additional content -->
    <slot />
  </UCard>
</template>

<script setup lang="ts">
import type { CardProps } from '#ui/components/Card.vue'

interface Card {
  title: string
  src: string
  description?: string
}

interface Props {
  card: Card
  index: number
  hovered: number | null
  ui?: CardProps['ui']
}

defineProps<Props>()
defineEmits<{
  mouseenter: []
  mouseleave: []
}>()
</script>
