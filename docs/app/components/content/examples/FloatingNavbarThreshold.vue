<template>
  <div
    ref="box"
    class="relative h-72 w-full max-w-md overflow-y-auto rounded-2xl border border-default bg-muted/20"
  >
    <MFloatingNavbar
      :container="box"
      position="inline"
      :links="links"
      brand="Motion"
      :scroll-threshold="240"
      class="mx-auto mt-4 w-fit"
    />

    <div class="space-y-4 p-6">
      <h3 class="text-lg font-semibold">
        Custom threshold
      </h3>
      <p class="text-muted text-sm">
        With <code>:scroll-threshold="240"</code> the navbar stays visible until you
        have scrolled 240px down, then hides on the next downward scroll.
      </p>
      <div
        v-for="i in 8"
        :key="i"
        class="h-16 rounded-xl bg-default/80 shadow-sm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const box = ref<HTMLElement | null>(null)

const links = [
  { label: 'Features', to: '#' },
  { label: 'Pricing', to: '#' },
  { label: 'Docs', to: '#' },
]
</script>
