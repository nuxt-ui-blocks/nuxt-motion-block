<script setup lang="ts">
defineProps<{
  name: string
  value?: string
  description?: string
}>()
</script>

<template>
  <div class="my-3 flex items-center gap-3 rounded-lg border border-default bg-elevated/40 px-3 py-2.5">
    <span
      class="size-9 shrink-0 rounded-md border border-default shadow-inner"
      :style="{ background: value ?? 'var(--ui-bg-elevated)' }"
    />
    <div class="min-w-0">
      <code class="font-mono text-[13px] font-medium text-highlighted">{{ name }}</code>
      <p
        v-if="description"
        class="mt-0.5 text-xs text-muted"
      >
        {{ description }}
      </p>
    </div>
    <code
      v-if="value"
      class="ml-auto shrink-0 font-mono text-xs text-dimmed"
    >{{ value }}</code>
  </div>
</template>
