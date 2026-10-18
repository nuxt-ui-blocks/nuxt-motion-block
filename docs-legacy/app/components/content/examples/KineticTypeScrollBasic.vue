<template>
  <div
    ref="panelRef"
    class="h-72 w-full max-w-md overflow-y-auto rounded-2xl border border-default bg-muted/20"
  >
    <div class="flex h-96 items-center">
      <MKineticTypeScroll
        :container="() => panelRef"
        :words="words"
        class="px-6 text-3xl font-semibold"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const panelRef = ref<HTMLElement | null>(null)
const words = ['Scroll', 'to', 'set', 'the', 'phrase', 'in', 'motion']
</script>
