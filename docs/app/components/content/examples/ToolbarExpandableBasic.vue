<template>
  <div class="flex w-full max-w-md justify-center py-4">
    <MToolbarExpandable
      :items="items"
      @select="selected = $event.label"
    >
      <template #item-icon="{ item }">
        <UIcon
          :name="item.icon"
          class="size-5"
        />
      </template>
      <template #item-content="{ item }">
        <div class="flex items-center gap-3">
          <img
            :src="`https://picsum.photos/seed/${item.id}/80/80`"
            :alt="item.label"
            class="size-12 rounded-xl object-cover"
          >
          <div class="space-y-0.5">
            <p class="text-sm font-semibold">
              {{ item.label }}
            </p>
            <p class="text-xs text-muted">
              {{ item.content }}
            </p>
          </div>
        </div>
      </template>
    </MToolbarExpandable>
  </div>
</template>

<script setup lang="ts">
const selected = ref('none')

const items = [
  { id: 'ada', label: 'Ada', icon: 'i-lucide-user', content: 'Analytical engine notes' },
  { id: 'linus', label: 'Linus', icon: 'i-lucide-terminal', content: 'Kernel patch series' },
  { id: 'grace', label: 'Grace', icon: 'i-lucide-ship', content: 'Compiler design notes' },
]
</script>
