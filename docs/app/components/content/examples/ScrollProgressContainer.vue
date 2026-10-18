<template>
  <div class="w-full max-w-lg space-y-3">
    <div
      ref="panelRef"
      class="relative h-64 overflow-y-auto rounded-2xl border border-default"
    >
      <MScrollProgress
        :container-ref="() => panelRef"
        class="sticky top-0 h-1 w-full bg-primary"
      />
      <div class="space-y-4 p-6">
        <p
          v-for="i in 12"
          :key="i"
          class="text-muted"
        >
          Panel content line {{ i }}
        </p>
      </div>
    </div>
    <p class="text-sm text-muted">
      The bar tracks the panel's own scroll, not the page.
    </p>
  </div>
</template>

<script setup lang="ts">
const panelRef = ref<HTMLElement | null>(null)
</script>
