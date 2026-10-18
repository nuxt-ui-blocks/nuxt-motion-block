<template>
  <div class="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
    <MHolographicFoil
      v-for="material in materials"
      :key="material"
      class="h-40"
      :pattern="material"
    >
      <div class="flex h-full items-end p-4">
        <span class="text-sm font-semibold capitalize text-white/90">
          {{ material }}
        </span>
      </div>
    </MHolographicFoil>
  </div>
</template>

<script setup lang="ts">
const materials = ['prism', 'gold', 'aurora', 'oil'] as const
</script>
