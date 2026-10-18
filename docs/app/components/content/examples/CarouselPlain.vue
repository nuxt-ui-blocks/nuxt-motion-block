<template>
  <div class="w-full max-w-md pb-8">
    <MCarousel
      v-slot="{ item }"
      :items="slides"
      :ui="{ item: 'w-full' }"
      :coverflow="false"
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
  { label: '01', class: 'bg-gradient-to-br from-slate-600 to-slate-800' },
  { label: '02', class: 'bg-gradient-to-br from-slate-600 to-slate-800' },
  { label: '03', class: 'bg-gradient-to-br from-slate-600 to-slate-800' },
  { label: '04', class: 'bg-gradient-to-br from-slate-600 to-slate-800' },
  { label: '05', class: 'bg-gradient-to-br from-slate-600 to-slate-800' },
]
</script>
