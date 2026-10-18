<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="option in directions"
        :key="option"
        size="sm"
        :variant="direction === option ? 'solid' : 'soft'"
        :color="direction === option ? 'primary' : 'neutral'"
        class="capitalize"
        @click="direction = option"
      >
        {{ option }}
      </UButton>

      <UButton
        size="sm"
        variant="soft"
        color="neutral"
        icon="i-lucide-plus"
        class="ml-auto"
        @click="add"
      >
        Add
      </UButton>
    </div>

    <MDynamicGroup
      :items="items"
      :direction="direction"
      :columns="3"
      key-field="id"
    >
      <template #default="{ item, remove }">
        <div class="flex items-center justify-between gap-3 rounded-lg border border-default bg-default px-3 py-2">
          <span class="text-sm font-medium">{{ item.label }}</span>
          <button
            type="button"
            class="text-dimmed transition-colors hover:text-highlighted"
            :aria-label="`Remove ${item.label}`"
            @click="remove()"
          >
            <UIcon
              name="i-lucide-x"
              class="size-4"
            />
          </button>
        </div>
      </template>
    </MDynamicGroup>

    <p class="text-xs text-dimmed">
      Switching <code>direction</code> re-lays-out the same items in place — the layout animation slides each one to its new spot.
    </p>
  </div>
</template>

<script setup lang="ts">
type Direction = 'grid' | 'row' | 'column'

interface Chip {
  id: number
  label: string
}

const directions: Direction[] = ['grid', 'row', 'column']
const direction = ref<Direction>('grid')

const pool: Chip[] = [
  { id: 1, label: 'Design' },
  { id: 2, label: 'Engineering' },
  { id: 3, label: 'Marketing' },
  { id: 4, label: 'Research' },
  { id: 5, label: 'Support' },
  { id: 6, label: 'Sales' },
]

const items = ref<Chip[]>(pool.slice(0, 4))

function add() {
  const next = pool.find(chip => !items.value.some(item => item.id === chip.id))
  if (next) {
    items.value = [...items.value, next]
  }
}
</script>
