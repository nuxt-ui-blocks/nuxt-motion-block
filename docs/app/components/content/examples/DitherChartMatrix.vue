<template>
  <div class="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
    <MDitherChart
      v-for="order in orders"
      :key="order"
      :data="series"
      variant="line"
      :matrix="order"
      :label="`${order}×${order} Bayer`"
      :width="200"
      :height="130"
    />
  </div>
</template>

<script setup lang="ts">
const orders = [2, 4, 8] as const

const series = [
  {
    name: 'Sessions',
    points: [
      { label: 'Mon', value: 42 },
      { label: 'Tue', value: 118 },
      { label: 'Wed', value: 96 },
      { label: 'Thu', value: 61 },
      { label: 'Fri', value: 132 },
    ],
  },
]
</script>
