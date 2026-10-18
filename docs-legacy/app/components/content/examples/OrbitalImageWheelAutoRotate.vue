<template>
  <div class="flex flex-col items-center gap-4 py-6">
    <MOrbitalImageWheel
      auto-rotate
      :auto-rotate-speed="speed"
      :items="items"
      snap
    />

    <div class="flex w-full max-w-xs flex-col gap-3">
      <label class="flex items-center gap-3 text-xs text-muted">
        <span class="w-28">speed {{ speed }}°/s</span>
        <USlider
          v-model="speed"
          :min="-90"
          :max="90"
          :step="6"
          class="flex-1"
        />
      </label>
      <p class="text-xs text-muted">
        Auto-rotate pauses while the pointer is over the wheel, while focus is
        inside it, and while the tab is hidden.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const speed = ref(18)

const items = ['Ridge', 'Tide', 'Salt', 'Birch', 'Glacier', 'Arch'].map(
  (name, index) => ({
    alt: name,
    id: name.toLowerCase(),
    image: swatch(index),
  }),
)

function swatch(index: number) {
  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">`
      + `<circle cx="40" cy="40" r="34" fill="hsl(${(index * 58 + 196) % 360} 72% 58%)"/>`
      + `<text x="40" y="50" font-family="system-ui,sans-serif" font-size="28"`
      + ` font-weight="600" fill="white" fill-opacity=".92" text-anchor="middle">${index + 1}</text>`
      + `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
</script>
