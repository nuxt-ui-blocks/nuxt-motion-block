<template>
  <div class="w-full max-w-md pb-8">
    <MCarousel
      v-slot="{ item }"
      :items="slides"
      :ui="{ item: 'w-full' }"
      :inverted="true"
      :rotation="55"
      loop
      arrows
      dots
    >
      <div
        class="flex h-48 w-full items-center justify-center rounded-2xl"
        :class="item.class"
      >
        <span class="text-4xl font-semibold text-white">{{ item.label }}</span>
      </div>
    </MCarousel>
  </div>
</template>

<script setup lang="ts">
const slides = [
  { label: '01', class: 'bg-gradient-to-br from-sky-500 to-indigo-600' },
  { label: '02', class: 'bg-gradient-to-br from-violet-500 to-fuchsia-600' },
  { label: '03', class: 'bg-gradient-to-br from-rose-500 to-red-600' },
  { label: '04', class: 'bg-gradient-to-br from-amber-500 to-orange-600' },
  { label: '05', class: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
]
</script>
