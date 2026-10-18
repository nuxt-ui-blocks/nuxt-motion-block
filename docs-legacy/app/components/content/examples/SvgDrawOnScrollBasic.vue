<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <p class="text-sm text-muted">
      Scroll the panel — the four paths are drawn in sequence as it moves.
    </p>

    <div
      ref="panel"
      class="relative h-64 overflow-y-auto overscroll-contain rounded-2xl border border-default bg-default"
    >
      <div class="h-48" />

      <MSvgDrawOnScroll
        :container="() => panel"
        :offset="['start 0.75', 'end 0.25']"
        :paths="paths"
        viewBox="0 0 100 100"
        :stroke-width="1.4"
        stroke="var(--ui-primary)"
        class="mx-auto h-40 w-40"
      >
        <template #marker>
          <span class="block size-3 rounded-full bg-primary ring-4 ring-primary/20" />
        </template>
      </MSvgDrawOnScroll>

      <div class="h-48" />
    </div>
  </div>
</template>

<script setup lang="ts">
const panel = ref<HTMLElement | null>(null)

const paths = [
  'M12 78 C 26 40, 40 62, 50 38 C 60 14, 74 44, 88 22',
  'M14 22 L 50 50 L 86 22',
  'M50 8 L 50 92',
  'M10 50 L 90 50',
]
</script>
