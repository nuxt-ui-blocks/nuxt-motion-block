<template>
  <div
    ref="box"
    class="relative h-72 w-full max-w-lg overflow-y-auto rounded-2xl border border-default bg-muted/20"
  >
    <MFloatingNavbar
      :container="box"
      position="inline"
      :links="links"
      brand="Motion"
      class="mx-auto mt-4 w-fit"
    >
      <template #right>
        <UButton
          size="xs"
          label="Get Started"
        />
      </template>
    </MFloatingNavbar>

    <div class="space-y-4 p-6">
      <h3 class="text-lg font-semibold">
        Floating Navbar
      </h3>
      <p class="text-muted text-sm">
        Scroll down to see the navbar hide, scroll up to see it reappear.
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
