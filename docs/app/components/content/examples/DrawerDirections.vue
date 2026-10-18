<template>
  <div class="flex w-full flex-col items-center gap-4">
    <div class="flex flex-wrap justify-center gap-3">
      <UButton
        v-for="item in directions"
        :key="item.value"
        :label="item.label"
        color="neutral"
        variant="soft"
        @click="openFrom(item.value)"
      />
    </div>

    <MDrawer
      v-model:open="open"
      :direction="direction"
      :title="`${activeLabel} drawer`"
      :description="`This panel slides in from the ${direction}.`"
    >
      <template #body>
        <div class="flex flex-col gap-3">
          <p class="text-sm text-muted">
            One component, four directions. Choose another button to watch the
            panel slide in from a different edge.
          </p>
          <UButton
            label="Close"
            color="neutral"
            variant="soft"
            @click="open = false"
          />
        </div>
      </template>
    </MDrawer>
  </div>
</template>

<script setup lang="ts">
type Direction = 'bottom' | 'top' | 'left' | 'right'

const directions = [
  { label: 'Bottom', value: 'bottom' as Direction },
  { label: 'Top', value: 'top' as Direction },
  { label: 'Left', value: 'left' as Direction },
  { label: 'Right', value: 'right' as Direction },
]

const open = ref(false)
const direction = ref<Direction>('bottom')

const activeLabel = computed(
  () => directions.find(item => item.value === direction.value)?.label ?? '',
)

const openFrom = (value: Direction) => {
  direction.value = value
  open.value = true
}
</script>
