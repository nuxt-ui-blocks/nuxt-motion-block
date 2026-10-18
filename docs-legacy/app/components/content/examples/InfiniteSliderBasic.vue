<template>
  <div class="w-full overflow-hidden py-4">
    <MInfiniteSlider
      class-name="items-center gap-10"
      :duration="28"
    >
      <div
        v-for="logo in logos"
        :key="logo"
        class="flex shrink-0 items-center gap-2 text-dimmed"
      >
        <UIcon
          :name="logo"
          class="size-5"
        />
        <span class="text-sm font-semibold tracking-tight">
          {{ logo.replace('i-lucide-', '') }}
        </span>
      </div>
    </MInfiniteSlider>
  </div>
</template>

<script setup lang="ts">
const logos = [
  'i-lucide-rocket',
  'i-lucide-anchor',
  'i-lucide-orbit',
  'i-lucide-flame',
  'i-lucide-gem',
  'i-lucide-zap',
  'i-lucide-globe',
  'i-lucide-shield',
]
</script>
