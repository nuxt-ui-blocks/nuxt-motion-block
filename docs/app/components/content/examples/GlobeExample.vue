<template>
  <div class="flex w-full justify-center">
    <MGlobe :data="markers" />
  </div>
</template>

<script setup lang="ts">
const markers = [
  { lat: 14.5995, lng: 120.9842, size: 0.03, label: 'Manila' },
  { lat: 19.076, lng: 72.8777, size: 0.1, label: 'Mumbai' },
  { lat: 23.8103, lng: 90.4125, size: 0.05, label: 'Dhaka' },
  { lat: 30.0444, lng: 31.2357, size: 0.07, label: 'Cairo' },
  { lat: 39.9042, lng: 116.4074, size: 0.08, label: 'Beijing' },
  { lat: -23.5505, lng: -46.6333, size: 0.1, label: 'Sao Paulo' },
  { lat: 19.4326, lng: -99.1332, size: 0.1, label: 'Mexico City' },
  { lat: 40.7128, lng: -74.006, size: 0.1, label: 'New York' },
  { lat: 34.6937, lng: 135.5022, size: 0.05, label: 'Osaka' },
  { lat: 41.0082, lng: 28.9784, size: 0.06, label: 'Istanbul' },
]
</script>
