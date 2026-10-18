<template>
  <MDitherChart
    :data="series"
    variant="stacked"
    :palette="palette"
    label="Sessions by channel"
    caption="Custom palette — each series dyed with its own anchor colour."
    :width="360"
    :height="180"
  />
</template>

<script setup lang="ts">
const palette = ['#f97316', '#22c55e', '#6366f1']

const series = [
  {
    name: 'Search',
    points: [
      { label: 'Mon', value: 48 },
      { label: 'Tue', value: 62 },
      { label: 'Wed', value: 39 },
      { label: 'Thu', value: 71 },
    ],
  },
  {
    name: 'Direct',
    points: [
      { label: 'Mon', value: 34 },
      { label: 'Tue', value: 28 },
      { label: 'Wed', value: 45 },
      { label: 'Thu', value: 22 },
    ],
  },
  {
    name: 'Social',
    points: [
      { label: 'Mon', value: 21 },
      { label: 'Tue', value: 37 },
      { label: 'Wed', value: 54 },
      { label: 'Thu', value: 43 },
    ],
  },
]
</script>
