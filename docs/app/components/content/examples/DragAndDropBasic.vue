<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MDragAndDrop
      :items="items"
      item-class="cursor-grab"
      class="rounded-xl border border-dashed border-default p-3"
      @change="onChange"
    >
      <template #default="{ item, isDragging }">
        <div
          class="flex items-center gap-3 rounded-lg border border-default bg-default px-3 py-2.5"
          :class="isDragging ? 'opacity-60' : ''"
        >
          <UIcon
            name="i-lucide-grip-vertical"
            class="size-4 shrink-0 text-dimmed"
          />
          <span class="flex-1 text-sm font-medium">
            {{ item.label }}
          </span>
          <UBadge
            size="sm"
            variant="subtle"
          >
            {{ item.owner }}
          </UBadge>
        </div>
      </template>
    </MDragAndDrop>

    <p class="text-xs text-muted">
      Drag a row onto another to reorder it — the new order is emitted, not applied
      to your source array.
    </p>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  { id: 'design-tokens', label: 'Style tokens', owner: 'Ana' },
  { id: 'component-audit', label: 'Component audit', owner: 'Ben' },
  { id: 'motion-guidelines', label: 'Motion guidelines', owner: 'Chidi' },
  { id: 'accessibility-pass', label: 'Accessibility pass', owner: 'Dara' },
  { id: 'docs-rewrite', label: 'Docs rewrite', owner: 'Eli' },
])

function onChange(next: { id: string, label: string, owner: string }[]) {
  items.value = [...next]
}
</script>
