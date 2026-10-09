<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      <MEmbossSurface
        v-for="variant in variants"
        :key="variant"
        :variant="variant"
        class="rounded-2xl p-6"
      >
        <p class="text-sm font-medium capitalize">
          {{ variant }}
        </p>
      </MEmbossSurface>
    </div>

    <MEmbossSurface
      variant="plaster"
      interactive
      class="flex h-32 items-center justify-center rounded-2xl"
    >
      <p class="text-sm text-muted">
        Move the pointer across this surface
      </p>
    </MEmbossSurface>
  </div>
</template>

<script setup lang="ts">
const variants = ['emboss', 'deboss', 'plaster', 'metal-stamp'] as const
</script>
