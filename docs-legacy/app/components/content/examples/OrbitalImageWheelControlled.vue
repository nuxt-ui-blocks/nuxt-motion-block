<template>
  <div class="flex flex-col items-center gap-4 py-6">
    <MOrbitalImageWheel
      :items="items"
      :rotation="rotation"
      snap
      @rotation-change="onRotationChange"
    />

    <p class="text-xs text-muted">
      rotation = <span class="font-medium">{{ rotation.toFixed(1) }}°</span> ·
      current =
      <span class="font-medium">{{ currentLabel }}</span>
    </p>

    <UButton
      color="neutral"
      label="Recenter"
      size="sm"
      variant="outline"
      @click="rotation = 0"
    />
  </div>
</template>

<script setup lang="ts">
const items = ['Ridge', 'Tide', 'Salt', 'Birch', 'Glacier', 'Arch'].map(
  (name, index) => ({
    alt: name,
    id: name.toLowerCase(),
    image: swatch(index),
  }),
)

// Controlled: the wheel never mutates its own rotation. It tweens, then
// *reports* the value through `rotationChange`; you decide whether to accept
// it. Drop the handler and the wheel turns but the tiles never move — which is
// the correct behaviour for an input you are not willing to accept.
const rotation = ref(0)

const onRotationChange = (next: number) => {
  rotation.value = next
}

const currentLabel = computed(() => {
  const step = 360 / items.length
  const normalized = ((rotation.value % 360) + 360) % 360
  let best = items[0]!.alt
  let bestDistance = Number.POSITIVE_INFINITY
  items.forEach((item, position) => {
    const angle = (position * step + normalized) % 360
    const distance = Math.min(angle, 360 - angle)
    if (distance < bestDistance) {
      bestDistance = distance
      best = item.alt
    }
  })
  return best
})

function swatch(index: number) {
  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">`
      + `<rect width="80" height="80" rx="40" fill="hsl(${(index * 40 + 24) % 360} 68% 54%)"/>`
      + `<circle cx="40" cy="30" r="11" fill="white" fill-opacity=".85"/>`
      + `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
</script>
