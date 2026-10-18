<template>
  <div class="w-full max-w-lg">
    <MGlowHoverCards
      :items="items"
      glow-color="var(--ui-primary)"
    >
      <template #header="{ card }">
        <UIcon
          :name="card.icon"
          class="size-5 text-primary"
        />
      </template>

      <template #default="{ card }">
        <div class="space-y-1">
          <h3 class="text-sm font-semibold text-highlighted">
            {{ card.title }}
          </h3>
          <p class="text-sm text-muted">
            {{ card.description }}
          </p>
        </div>
      </template>
    </MGlowHoverCards>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    title: 'Streaming ingest',
    description: 'Events land in the warehouse in under a second.',
    icon: 'i-lucide-zap',
  },
  {
    title: 'Columnar store',
    description: 'Point queries over a trillion rows stay sub-second.',
    icon: 'i-lucide-database',
  },
  {
    title: 'Row policies',
    description: 'One policy engine, enforced per request.',
    icon: 'i-lucide-shield-check',
  },
]
</script>
