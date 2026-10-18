<template>
  <div class="relative h-72 w-full max-w-md overflow-y-auto rounded-2xl border border-default bg-muted/20">
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
        class="h-16 rounded-xl bg-background/80 shadow-sm"
      />
    </div>

    <MFloatingNavbar
      :links="links"
      brand="Motion"
      blur
    >
      <template #right>
        <UButton
          size="xs"
          label="Get Started"
        />
      </template>
    </MFloatingNavbar>
  </div>
</template>

<script setup lang="ts">
const links = [
  { label: 'Features', to: '#' },
  { label: 'Pricing', to: '#' },
  { label: 'Docs', to: '#' },
]
</script>
