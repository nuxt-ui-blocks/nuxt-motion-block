<template>
  <div class="relative h-72 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MDottedMap
      :markers="markers"
      :pulse="true"
      :dot-radius="0.22"
      class="p-6"
    >
      <template #marker="{ marker, x, y, r }">
        <text
          :x="x + r * 2.2"
          :y="y + r * 0.4"
          :font-size="r * 1.2"
          fill="currentColor"
          class="font-medium"
        >
          {{ String(marker.label) }}
        </text>
      </template>
    </MDottedMap>
  </div>
</template>

<script setup lang="ts">
const markers = [
  { lat: 37.5665, lng: 126.978, size: 2.4, label: 'Seoul' },
  { lat: 40.7128, lng: -74.006, size: 2.4, label: 'New York' },
]
</script>
