<template>
  <div class="w-full max-w-lg overflow-hidden rounded-2xl border border-default">
    <MExpandableNavbar
      title="Acme"
      :items="items"
    >
      <template #actions>
        <UButton
          size="xs"
          color="neutral"
          variant="ghost"
          icon="i-lucide-bell"
        />
        <UButton
          size="xs"
          variant="outline"
          label="Sign in"
        />
      </template>
    </MExpandableNavbar>
    <div class="grid grid-cols-2 gap-3 bg-muted/20 p-6">
      <div class="rounded-xl border border-default bg-default/50 p-4">
        <p class="text-sm font-medium">
          Dashboard
        </p>
        <p class="text-xs text-muted">
          Revenue is up 12% today.
        </p>
      </div>
      <div class="rounded-xl border border-default bg-default/50 p-4">
        <p class="text-sm font-medium">
          Orders
        </p>
        <p class="text-xs text-muted">
          14 orders to review.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { label: 'Dashboard', to: '#', icon: 'i-lucide-layout-dashboard' },
  { label: 'Orders', to: '#', icon: 'i-lucide-shopping-cart' },
  { label: 'Customers', to: '#', icon: 'i-lucide-users' },
  { label: 'Settings', to: '#', icon: 'i-lucide-settings' },
]
</script>
