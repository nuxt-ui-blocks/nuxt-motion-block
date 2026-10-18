<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MDitherChart
      :key="run"
      :data="data"
      variant="line"
      label="Sessions per day"
      caption="Two weeks of traffic, dithered through a 4×4 Bayer matrix."
      :width="320"
      :height="160"
    />

    <UButton
      label="Replay draw-in"
      icon="i-lucide-rotate-ccw"
      variant="outline"
      class="justify-center"
      @click="run++"
    />
  </div>
</template>

<script setup lang="ts">
const run = ref(0)

const data = [
  {
    name: 'Mon',
    points: [
      { label: '6am', value: 42 },
      { label: 'Noon', value: 118 },
      { label: '6pm', value: 96 },
      { label: 'Midnight', value: 31 },
    ],
  },
  {
    name: 'Tue',
    points: [
      { label: '6am', value: 58 },
      { label: 'Noon', value: 142 },
      { label: '6pm', value: 121 },
      { label: 'Midnight', value: 47 },
    ],
  },
]
</script>
