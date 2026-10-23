<template>
  <div class="w-full">
    <MCursorFollow class="rounded-2xl border border-default bg-elevated/40">
      <div class="flex min-h-[320px] items-center justify-center p-10">
        <div class="grid max-w-md grid-cols-4 gap-3">
          <div
            v-for="swatch in swatches"
            :key="swatch.label"
            :data-cursor-text="swatch.label"
            class="aspect-square rounded-xl border border-default"
            :style="{ backgroundColor: swatch.color }"
          />
          <a
            class="col-span-4 mt-2 text-center text-sm font-medium text-primary underline-offset-4 hover:underline"
            data-cursor-text="Read the guide"
            href="https://nuxt.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Read the guide
          </a>
        </div>
      </div>
    </MCursorFollow>
  </div>
</template>

<script setup lang="ts">
const swatches = [
  { label: 'Copy hex', color: '#6366f1' },
  { label: 'Copy hex', color: '#0ea5e9' },
  { label: 'Copy hex', color: '#14b8a6' },
  { label: 'Copy hex', color: '#84cc16' },
  { label: 'Copy hex', color: '#f59e0b' },
  { label: 'Copy hex', color: '#ef4444' },
  { label: 'Copy hex', color: '#ec4899' },
  { label: 'Copy hex', color: '#8b5cf6' },
]
</script>
