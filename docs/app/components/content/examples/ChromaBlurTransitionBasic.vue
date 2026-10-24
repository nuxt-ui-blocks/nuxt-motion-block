<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MChromaBlurTransition
      :transition-key="transitionKey"
      class="overflow-hidden rounded-2xl"
      @rest="rested = true"
    >
      <div
        class="flex h-44 flex-col justify-between p-6"
        :style="{ backgroundImage: grade.background }"
      >
        <div class="flex items-center gap-2">
          <span
            v-for="swatch in grade.swatches"
            :key="swatch"
            aria-hidden="true"
            class="size-4 rounded-full ring-1 ring-white/50"
            :style="{ backgroundColor: swatch }"
          />
        </div>
        <div>
          <p class="text-xs font-medium tracking-widest text-white/70 uppercase">
            {{ grade.temperature }}
          </p>
          <p class="text-xl font-semibold text-white">
            {{ grade.label }}
          </p>
        </div>
      </div>
    </MChromaBlurTransition>

    <div class="flex items-center gap-3">
      <UButton
        :label="warm ? 'Cool the grade' : 'Warm the grade'"
        icon="i-lucide-palette"
        @click="swap"
      />
      <span class="text-xs text-muted">{{ status }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const grades = [
  {
    background: 'linear-gradient(135deg, #f43f5e, #c026d3 55%, #f59e0b)',
    label: 'Rose, fuchsia, amber',
    swatches: ['#f43f5e', '#c026d3', '#f59e0b'],
    temperature: 'Warm grade',
  },
  {
    background: 'linear-gradient(135deg, #14b8a6, #0891b2 55%, #6ee7b7)',
    label: 'Teal, cyan, seafoam',
    swatches: ['#14b8a6', '#0891b2', '#6ee7b7'],
    temperature: 'Cool grade',
  },
] as const

const warm = ref(true)
const transitionKey = ref(0)
const rested = ref(false)

const grade = computed(() => (warm.value ? grades[0] : grades[1]))

const status = computed(() => {
  if (transitionKey.value === 0) return 'idle'
  return rested.value ? 'rested' : 'sweeping…'
})

function swap() {
  // The slot updates immediately; the cover that opens the sweep is fully
  // opaque on the first frame, so content and key change on the same tick.
  warm.value = !warm.value
  rested.value = false
  transitionKey.value++
}
</script>
