<template>
  <div class="flex flex-wrap items-center justify-center gap-8">
    <div
      v-for="preset in presets"
      :key="preset.name"
      class="flex flex-col items-center gap-2"
    >
      <MSiriOrb
        :colors="preset.colors"
        size="120px"
      />
      <span class="text-xs text-muted">{{ preset.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Partial palettes: any channel you leave out keeps the component default.
const presets = [
  { name: 'default', colors: undefined },
  { name: 'ember', colors: { c1: '#ff9d4d', c2: '#ff4d2e', c3: '#ffd18a' } },
  { name: 'mint', colors: { c1: '#6ee7c8', c2: '#22d3ee', c3: '#a7f3d0' } },
  { name: 'violet', colors: { c1: '#c4b5fd', c2: '#8b5cf6', c3: '#f0abfc' } },
]
</script>
