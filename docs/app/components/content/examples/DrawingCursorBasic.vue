<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MDrawingCursor
      ref="cursor"
      :key="run"
      :color="color"
      :line-width="lineWidth"
      :decay="decay"
      :taper="taper"
      class="h-56 rounded-2xl border-2 border-dashed border-primary/40 bg-default"
    >
      <div class="flex h-full flex-col items-center justify-center gap-1 p-6 text-center">
        <span class="text-sm font-medium text-default">Draw across this box</span>
        <span class="text-xs text-muted">
          Strokes taper with speed and fade out on their own.
        </span>
      </div>
    </MDrawingCursor>

    <div class="grid grid-cols-2 gap-3">
      <USelect
        v-model="color"
        :items="['#6366f1', '#f43f5e', '#22c55e', '#f59e0b']"
      />
      <USelect
        v-model="decay"
        :items="decayItems"
      />
    </div>

    <div class="flex items-center justify-between gap-4">
      <UCheckbox
        v-model="taper"
        label="Taper"
      />
      <div class="flex gap-2">
        <UButton
          label="Clear"
          icon="i-lucide-eraser"
          size="xs"
          variant="outline"
          @click="cursor?.clear()"
        />
        <UButton
          label="Apply"
          icon="i-lucide-rotate-ccw"
          size="xs"
          variant="outline"
          @click="run++"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cursor = ref<{ clear: () => void } | null>(null)
const run = ref(0)
const color = ref('#6366f1')
const lineWidth = ref(3)
const decay = ref(1200)
const taper = ref(true)

const decayItems = [
  { label: 'Ink that lingers', value: 0 },
  { label: 'Slow fade', value: 1200 },
  { label: 'Quick fade', value: 400 },
]
</script>
