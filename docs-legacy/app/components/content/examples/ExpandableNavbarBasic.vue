<template>
  <div class="w-full max-w-lg overflow-hidden rounded-2xl border border-default">
    <MExpandableNavbar
      title="Motion"
      :items="items"
    >
      <template #actions>
        <UButton
          size="xs"
          variant="outline"
          label="Sign in"
        />
      </template>
    </MExpandableNavbar>
    <div class="space-y-2 bg-muted/20 p-6">
      <p class="text-sm text-muted">
        The nav links collapse into the mobile panel and stagger in one after the
        other.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { label: 'Products', to: '#', icon: 'i-lucide-box' },
  { label: 'Pricing', to: '#', icon: 'i-lucide-tag' },
  { label: 'Docs', to: '#', icon: 'i-lucide-book-open' },
]
</script>
