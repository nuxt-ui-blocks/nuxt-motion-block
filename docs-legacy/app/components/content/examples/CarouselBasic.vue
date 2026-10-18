<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MCarousel
      v-slot="{ item }"
      :items="items"
      :ui="{ item: 'w-full' }"
      class="rounded-2xl"
      loop
      arrows
      dots
      @select="active = $event"
    >
      <div class="relative h-56 w-full overflow-hidden rounded-2xl">
        <img
          :src="item.image"
          :alt="item.title"
          class="h-full w-full object-cover"
        >
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-white">
          <p class="text-xs uppercase tracking-widest text-white/70">
            {{ item.tag }}
          </p>
          <p class="text-lg font-semibold">
            {{ item.title }}
          </p>
        </div>
      </div>
    </MCarousel>

    <p class="text-center text-xs text-muted">
      Slide {{ active + 1 }} of {{ items.length }} · the three on each side fan away in 3D
    </p>
  </div>
</template>

<script setup lang="ts">
const active = ref(0)

const items = [
  { title: 'Iceland', tag: 'North', image: 'https://picsum.photos/seed/carousel-1/800/600' },
  { title: 'Kyoto', tag: 'East', image: 'https://picsum.photos/seed/carousel-2/800/600' },
  { title: 'Patagonia', tag: 'South', image: 'https://picsum.photos/seed/carousel-3/800/600' },
  { title: 'Dolomites', tag: 'Alps', image: 'https://picsum.photos/seed/carousel-4/800/600' },
  { title: 'Namibia', tag: 'Desert', image: 'https://picsum.photos/seed/carousel-5/800/600' },
]
</script>
