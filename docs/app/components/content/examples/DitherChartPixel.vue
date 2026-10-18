<template>
  <div class="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
    <MDitherChart
      v-for="size in sizes"
      :key="size"
      :data="series"
      variant="heatmap"
      :pixel-size="size"
      :label="`${size}px pitch`"
      :width="200"
      :height="130"
    />
  </div>
</template>

<script setup lang="ts">
const sizes = [1, 3, 6] as const

const series = [
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
  {
    name: 'Wed',
    points: [
      { label: '6am', value: 74 },
      { label: 'Noon', value: 101 },
      { label: '6pm', value: 138 },
      { label: 'Midnight', value: 52 },
    ],
  },
]
</script>
