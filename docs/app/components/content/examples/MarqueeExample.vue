<template>
  <div class="w-full py-6">
    <MMarquee
      :duration="22"
      :gap="12"
      pause-on-hover
    >
      <div
        v-for="item in items"
        :key="item"
        class="flex h-12 shrink-0 items-center gap-2 rounded-lg border border-default bg-elevated px-5 text-sm font-medium text-muted"
      >
        <span class="size-1.5 rounded-full bg-primary" />
        {{ item }}
      </div>
    </MMarquee>
  </div>
</template>

<script setup lang="ts">
const items = [
  'Motion',
  'Nuxt UI',
  'Tailwind',
  'TypeScript',
  'Vite',
  'VueUse',
  'Pinia',
]
</script>
