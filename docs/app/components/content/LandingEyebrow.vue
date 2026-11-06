<script setup lang="ts">
withDefaults(defineProps<{
  index?: string
  label: string
}>(), {
  index: undefined,
})
</script>

<template>
  <p class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dimmed">
    <span
      v-if="index"
      class="text-primary"
    >{{ index }}</span>
    <span
      v-if="index"
      aria-hidden="true"
      class="h-px w-6 bg-default"
    />
    <span>{{ label }}</span>
  </p>
</template>
