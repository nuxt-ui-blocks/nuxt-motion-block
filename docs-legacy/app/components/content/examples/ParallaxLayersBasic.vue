<template>
  <MParallaxLayers
    class="h-64 rounded-xl border border-default"
    :layers="layers"
  >
    <template #layer="{ layer }">
      <div
        v-if="layer.id === 'sky'"
        class="grid h-full place-items-center bg-gradient-to-b from-#1e293b to-#0f172a"
      >
        <span class="text-3xl font-bold text-white">Sky · depth 0</span>
      </div>
      <div
        v-else-if="layer.id === 'hills'"
        class="grid h-full place-items-center bg-#1e40af/70"
      >
        <span class="text-2xl font-bold text-white">Hills · depth 0.5</span>
      </div>
      <div
        v-else
        class="grid h-full place-items-center bg-#0ea5e9/80"
      >
        <span class="text-xl font-bold text-white">Foreground · depth 1</span>
      </div>
    </template>
  </MParallaxLayers>
</template>

<script setup lang="ts">
// No type import needed: the layer config is a plain structural type, so a
// literal is enough. Import `ParallaxLayerConfig` only when you want the
// compiler to check the shape.
const layers = [
  { id: 'sky', depth: 0 },
  { id: 'hills', depth: 0.5 },
  { id: 'foreground', depth: 1 },
]
</script>
