<template>
  <MParallaxLayers
    class="h-64 rounded-xl border border-default"
    direction="horizontal"
    :layers="layers"
  >
    <template #layer="{ layer }">
      <div
        v-if="layer.id === 'left'"
        class="grid h-full w-1/2 place-items-center bg-gradient-to-r from-#dc2626 to-#7f1d1d"
      >
        <span class="text-sm font-semibold text-white">left panel</span>
      </div>
      <div
        v-else
        class="grid h-full w-1/2 place-items-center bg-gradient-to-r from-#1d4ed8 to-#172554"
      >
        <span class="text-sm font-semibold text-white">right panel</span>
      </div>
    </template>
  </MParallaxLayers>
</template>

<script setup lang="ts">
const layers = [
  { id: 'left', depth: 0.8 },
  { id: 'right', depth: 1.2 },
]
</script>
