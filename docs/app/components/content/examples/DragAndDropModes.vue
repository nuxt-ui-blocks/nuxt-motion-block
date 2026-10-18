<template>
  <div class="flex w-full flex-col gap-4">
    <div class="flex flex-wrap gap-2">
      <div class="flex gap-1 rounded-lg bg-elevated p-1">
        <UButton
          v-for="option in modes"
          :key="option"
          size="xs"
          :color="mode === option ? 'primary' : 'neutral'"
          :variant="mode === option ? 'solid' : 'ghost'"
          @click="mode = option"
        >
          {{ option }}
        </UButton>
      </div>

      <div class="flex gap-1 rounded-lg bg-elevated p-1">
        <UButton
          v-for="option in layouts"
          :key="option"
          size="xs"
          :color="layout === option ? 'primary' : 'neutral'"
          :variant="layout === option ? 'solid' : 'ghost'"
          @click="layout = option"
        >
          {{ option }}
        </UButton>
      </div>
    </div>

    <MDragAndDrop
      :items="items"
      :layout="layout"
      :mode="mode"
      :columns="3"
      :gap="16"
      class="min-h-40"
      @change="onChange"
    >
      <template #default="{ item, isDragging }">
        <div
          class="flex h-full flex-col justify-between gap-2 rounded-lg border border-default bg-default p-3"
          :class="isDragging ? 'opacity-60' : ''"
        >
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-grip-vertical"
              class="size-4 shrink-0 text-dimmed"
            />
            <span class="text-sm font-medium text-highlighted">{{ item.label }}</span>
          </div>
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
      <code>mode</code> = {{ mode }} · <code>layout</code> = {{ layout }}
      <template v-if="mode !== 'sort'">
        — drag onto one of the three zones to {{ mode === 'move' ? 'remove' : 'copy' }} the item.
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
type Mode = 'sort' | 'move' | 'copy'
type Layout = 'list' | 'grid' | 'masonry'

const modes: Mode[] = ['sort', 'move', 'copy']
const layouts: Layout[] = ['list', 'grid', 'masonry']

const mode = ref<Mode>('sort')
const layout = ref<Layout>('grid')

const items = ref([
  { id: 'design-tokens', label: 'Style tokens', owner: 'Ana' },
  { id: 'component-audit', label: 'Component audit', owner: 'Ben' },
  { id: 'motion-guidelines', label: 'Motion guidelines', owner: 'Chidi' },
  { id: 'accessibility-pass', label: 'Accessibility pass', owner: 'Dara' },
  { id: 'docs-rewrite', label: 'Docs rewrite', owner: 'Eli' },
  { id: 'release-notes', label: 'Release notes', owner: 'Fay' },
])

function onChange(next: { id: string, label: string, owner: string }[]) {
  items.value = [...next]
}
</script>
