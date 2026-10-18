<template>
  <MParallaxLayers
    class="h-72 rounded-xl border border-default"
    :layers="layers"
    :range="140"
  >
    <template #layer="{ layer }">
      <div
        v-if="layer.id === 'far'"
        class="grid h-full place-items-center bg-#334155"
      >
        <span class="text-sm font-semibold text-white/70">
          far · depth 0.3 · blur 6px · opacity 0.5
        </span>
      </div>
      <div
        v-else-if="layer.id === 'mid'"
        class="grid h-full place-items-center bg-#0d9488/70"
      >
        <span class="text-sm font-semibold text-white/90">
          mid · depth 0.7 · blur 2px
        </span>
      </div>
      <div
        v-else
        class="grid h-full place-items-center bg-#f59e0b/80"
      >
        <span class="text-sm font-semibold text-white">near · depth 1.4</span>
      </div>
    </template>
  </MParallaxLayers>
</template>

<script setup lang="ts">
const layers = [
  { id: 'far', depth: 0.3, blur: 6, opacity: 0.5 },
  { id: 'mid', depth: 0.7, blur: 2 },
  { id: 'near', depth: 1.4 },
]
</script>
