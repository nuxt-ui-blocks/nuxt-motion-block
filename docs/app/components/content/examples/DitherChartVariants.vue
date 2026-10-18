<template>
  <div class="grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
    <MDitherChart
      v-for="item in variants"
      :key="item.variant"
      :data="series"
      :variant="item.variant"
      :label="item.label"
      :width="220"
      :height="140"
    />
  </div>
</template>

<script setup lang="ts">
const series = [
  {
    name: 'This week',
    points: [
      { label: 'Mon', value: 88 },
      { label: 'Tue', value: 64 },
      { label: 'Wed', value: 47 },
      { label: 'Thu', value: 29 },
    ],
  },
  {
    name: 'Last week',
    points: [
      { label: 'Mon', value: 55 },
      { label: 'Tue', value: 79 },
      { label: 'Wed', value: 38 },
      { label: 'Thu', value: 61 },
    ],
  },
]

const variants = [
  { variant: 'line', label: 'Line' },
  { variant: 'bar', label: 'Bar' },
  { variant: 'stacked', label: 'Stacked' },
  { variant: 'bubbles', label: 'Bubbles' },
  { variant: 'heatmap', label: 'Heatmap' },
  { variant: 'donut', label: 'Donut' },
  { variant: 'gauge', label: 'Gauge' },
  { variant: 'funnel', label: 'Funnel' },
] as const
</script>
