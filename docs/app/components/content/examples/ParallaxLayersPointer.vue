<template>
  <MParallaxLayers
    class="h-64 rounded-xl border border-default"
    direction="both"
    pointer-parallax
    :layers="layers"
  >
    <template #layer="{ layer }">
      <div
        v-if="layer.id === 'back'"
        class="grid h-full place-items-center bg-gradient-to-br from-#312e81 to-#0f172a"
      >
        <span class="text-sm font-semibold text-white/80">back · depth 0.2</span>
      </div>
      <div
        v-else-if="layer.id === 'mid'"
        class="grid h-full place-items-center bg-#7c3aed/60"
      >
        <span class="text-sm font-semibold text-white/90">mid · depth 0.6</span>
      </div>
      <div
        v-else
        class="grid h-full place-items-center bg-#f472b6/70"
      >
        <span class="text-sm font-semibold text-white">front · depth 1</span>
      </div>
    </template>
  </MParallaxLayers>
</template>

<script setup lang="ts">
const layers = [
  { id: 'back', depth: 0.2 },
  { id: 'mid', depth: 0.6 },
  { id: 'front', depth: 1 },
]
</script>
