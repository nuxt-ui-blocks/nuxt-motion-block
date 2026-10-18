<template>
  <div class="flex flex-wrap items-center justify-center gap-12 py-6">
    <div
      v-for="preset in presets"
      :key="preset.name"
      class="flex flex-col items-center gap-3"
    >
      <MOrbitalImageWheel
        face-outward
        :items="preset.items"
        :radius="preset.radius"
        snap
      />
      <span class="text-xs text-muted">
        {{ preset.name }} · r={{ preset.radius }} ·
        {{ preset.items.length }} items
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
// `face-outward` rotates each thumbnail by its own angle, so the images tilt
// away from the centre like ferris-wheel gondolas. The wheel's box is always
// `radius * 2 + 80` — the fixed 80 is the thumbnail diameter, which is
// deliberately not configurable.
const presets = [
  { name: 'gondola', radius: 120, count: 6 },
  { name: 'tight ring', radius: 90, count: 10 },
  { name: 'single', radius: 100, count: 1 },
].map(preset => ({
  name: preset.name,
  radius: preset.radius,
  items: Array.from({ length: preset.count }, (_, index) => ({
    alt: `Item ${index + 1}`,
    id: `${preset.name}-${index}`,
    image: swatch(index, preset.radius),
  })),
}))

function swatch(index: number, radius: number) {
  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">`
      + `<rect width="80" height="80" fill="hsl(${(index * 61 + radius) % 360} 64% 52%)"/>`
      + `<path d="M20 60 L40 22 L60 60 Z" fill="white" fill-opacity=".82"/>`
      + `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
</script>
