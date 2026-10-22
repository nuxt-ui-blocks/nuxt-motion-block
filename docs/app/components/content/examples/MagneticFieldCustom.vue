<template>
  <div class="grid w-full max-w-lg gap-4 sm:grid-cols-2">
    <div
      v-for="panel in panels"
      :key="panel.mode"
      class="rounded-xl border border-default bg-default p-4"
    >
      <p class="mb-3 text-xs font-medium text-highlighted">
        {{ panel.title }}
      </p>
      <MMagneticField
        :mode="panel.mode"
        :radius="140"
        rotate
        class="flex flex-wrap gap-2"
      >
        <span
          v-for="cell in 4"
          :key="cell"
          data-magnetic
          class="flex size-10 items-center justify-center rounded-lg bg-elevated text-xs text-muted"
        >{{ cell }}</span>
      </MMagneticField>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * The two modes side by side, because the difference between them is a feeling
 * rather than a description: one gathers, the other scatters.
 */
const panels = [
  { mode: 'attract', title: 'Attract' },
  { mode: 'repel', title: 'Repel' },
] as const
</script>
