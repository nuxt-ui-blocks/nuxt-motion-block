<template>
  <div class="flex items-center justify-center gap-10 py-8">
    <div
      v-for="size in sizes"
      :key="size"
      class="flex flex-col items-center gap-2"
    >
      <MUnlockFaceId :size="size">
        <div class="flex h-full w-full items-center justify-center text-xs text-muted">
          {{ size }}
        </div>
      </MUnlockFaceId>
      <span class="text-[10px] text-muted">{{ size }}px</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const sizes = [64, 96, 128]
</script>
