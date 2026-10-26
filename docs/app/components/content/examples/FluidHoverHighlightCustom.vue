<template>
  <div class="w-full max-w-md">
    <MFluidHoverHighlight class="grid grid-cols-3 gap-2">
      <div
        v-for="tile in tiles"
        :key="tile"
        data-fluid-item
        class="flex h-20 items-center justify-center rounded-lg border border-default bg-default px-2 text-center text-xs font-medium text-muted"
      >
        {{ tile }}
      </div>
    </MFluidHoverHighlight>
  </div>
</template>

<script setup lang="ts">
/**
 * Nothing about the component assumes a list. It measures whatever the pointer
 * lands on, so the same plate walks a grid - including across rows, where a
 * height-only animation would jump.
 */
const tiles = ['Overview', 'Traffic', 'Revenue', 'Audience', 'Retention', 'Settings']
</script>
