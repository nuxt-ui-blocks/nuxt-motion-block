<template>
  <div class="relative h-80 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MGlobe
      class="h-full w-full"
      :data="markers"
      :rotate-speed="0.4"
      atmosphere-color="#3a228a"
      :show-graticules="true"
    />
  </div>
</template>

<script setup lang="ts">
const markers = [
  { lat: 40.71, lng: -74.01, size: 0.06, label: 'New York' },
  { lat: 51.51, lng: -0.13, size: 0.06, label: 'London' },
  { lat: 35.68, lng: 139.69, size: 0.06, label: 'Tokyo' },
  { lat: -33.87, lng: 151.21, size: 0.06, label: 'Sydney' },
  { lat: -23.55, lng: -46.63, size: 0.06, label: 'Sao Paulo' },
  { lat: 1.35, lng: 103.82, size: 0.06, label: 'Singapore' },
]
</script>
