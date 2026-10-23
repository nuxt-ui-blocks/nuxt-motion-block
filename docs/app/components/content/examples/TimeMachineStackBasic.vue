<template>
  <div class="flex w-full flex-col items-center gap-4 p-6">
    <MTimeMachineStack
      :items="items"
      class="h-[20rem] w-full max-w-sm"
    >
      <template #item="{ item, active }">
        <div class="flex h-full flex-col justify-between gap-3 p-4">
          <div class="flex items-center justify-between text-xs text-muted">
            <span>{{ item.year }}</span>
            <span v-if="active">Now showing</span>
          </div>

          <div>
            <p class="text-lg font-semibold text-highlighted">
              {{ item.title }}
            </p>
            <p class="text-sm text-muted">
              {{ item.description }}
            </p>
          </div>
        </div>
      </template>
    </MTimeMachineStack>

    <p class="text-xs text-muted">
      Scroll, drag or use the arrow keys.
    </p>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    id: 'studio',
    year: 2026,
    title: 'The studio',
    description: 'A small team, a short list of clients, one shared room.',
  },
  {
    id: 'archive',
    year: 2024,
    title: 'The archive',
    description: 'Every project we shipped, filed by year and season.',
  },
  {
    id: 'workshop',
    year: 2022,
    title: 'The workshop',
    description: 'Prototypes that never left the building, kept anyway.',
  },
  {
    id: 'origin',
    year: 2019,
    title: 'The origin',
    description: 'Two desks, a borrowed projector and a first invoice.',
  },
]
</script>
