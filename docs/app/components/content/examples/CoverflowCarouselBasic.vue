<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <MCoverflowCarousel
      :items="items"
      :autoplay="autoplay"
      :autoplay-delay="3000"
      class="rounded-2xl bg-gradient-to-b from-violet-50 to-white p-4 dark:from-violet-950/40 dark:to-transparent"
    />

    <div class="flex items-center justify-center gap-3">
      <USwitch
        v-model="autoplay"
        label="Autoplay"
      />
      <span class="text-xs text-muted">
        Drags past 80px or flicks past 500px/s also move it
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const autoplay = ref(true)

const items = [
  { id: 'reykjavik', alt: 'Reykjavik skyline', image: 'https://picsum.photos/seed/cover-1/560/440' },
  { id: 'kyoto', alt: 'Kyoto alley', image: 'https://picsum.photos/seed/cover-2/560/440' },
  { id: 'lofoten', alt: 'Lofoten islands', image: 'https://picsum.photos/seed/cover-3/560/440' },
  { id: 'oaxaca', alt: 'Oaxaca street', image: 'https://picsum.photos/seed/cover-4/560/440' },
  { id: 'queensland', alt: 'Queensland coast', image: 'https://picsum.photos/seed/cover-5/560/440' },
  { id: 'cappadocia', alt: 'Cappadocia balloons', image: 'https://picsum.photos/seed/cover-6/560/440' },
  { id: 'faroe', alt: 'Faroe cliffs', image: 'https://picsum.photos/seed/cover-7/560/440' },
]
</script>
