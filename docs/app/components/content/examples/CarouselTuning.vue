<template>
  <div class="flex w-full max-w-md flex-col gap-10 pb-2">
    <section>
      <p class="mb-6 text-xs font-medium uppercase tracking-wide text-muted">
        Subtle · rotation 25 · depth 80 · scaleStep 0.1
      </p>
      <MCarousel
        v-slot="{ item }"
        :items="slides"
        :ui="{ item: 'w-full' }"
        :rotation="25"
        :depth="80"
        :scale-step="0.1"
        loop
        arrows
      >
        <div
          class="flex h-40 w-full items-center justify-center rounded-2xl"
          :class="item.class"
        >
          <span class="text-3xl font-semibold text-white">{{ item.label }}</span>
        </div>
      </MCarousel>
    </section>

    <section>
      <p class="mb-6 text-xs font-medium uppercase tracking-wide text-muted">
        Dramatic · rotation 60 · depth 260 · scaleStep 0.18
      </p>
      <MCarousel
        v-slot="{ item }"
        :items="slides"
        :ui="{ item: 'w-full' }"
        :rotation="60"
        :depth="260"
        :scale-step="0.18"
        loop
        arrows
      >
        <div
          class="flex h-40 w-full items-center justify-center rounded-2xl"
          :class="item.class"
        >
          <span class="text-3xl font-semibold text-white">{{ item.label }}</span>
        </div>
      </MCarousel>
    </section>
  </div>
</template>

<script setup lang="ts">
const slides = [
  { label: '01', class: 'bg-gradient-to-br from-indigo-500 to-violet-600' },
  { label: '02', class: 'bg-gradient-to-br from-sky-500 to-cyan-500' },
  { label: '03', class: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
  { label: '04', class: 'bg-gradient-to-br from-amber-500 to-orange-600' },
  { label: '05', class: 'bg-gradient-to-br from-rose-500 to-pink-600' },
]
</script>
