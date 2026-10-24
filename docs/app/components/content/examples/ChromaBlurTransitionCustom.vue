<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MChromaBlurTransition
      :duration="duration"
      :transition-key="transitionKey"
      class="overflow-hidden rounded-2xl"
      @rest="rested = true"
    >
      <div
        class="relative flex h-44 flex-col justify-end gap-2 overflow-hidden p-6"
        :style="{ backgroundImage: stock.background }"
      >
        <span
          aria-hidden="true"
          class="absolute inset-0 opacity-30"
          :style="{ backgroundImage: stock.fringe }"
        />
        <div class="relative flex items-center gap-1.5">
          <span
            v-for="swatch in stock.swatches"
            :key="swatch"
            aria-hidden="true"
            class="size-3 rounded-full ring-1 ring-white/50"
            :style="{ backgroundColor: swatch }"
          />
        </div>
        <div class="relative">
          <p class="text-xs font-medium tracking-widest text-white/70 uppercase">
            Stock {{ index + 1 }} of {{ stocks.length }} · {{ duration }} ms
          </p>
          <p class="text-xl font-semibold text-white">
            {{ stock.label }}
          </p>
        </div>
      </div>
    </MChromaBlurTransition>

    <div class="flex flex-wrap items-center gap-2">
      <UButton
        label="Next stock"
        icon="i-lucide-arrow-right"
        size="sm"
        @click="next"
      />
      <UButton
        label="Replay"
        icon="i-lucide-rotate-ccw"
        size="sm"
        color="neutral"
        variant="outline"
        @click="play"
      />
      <span class="text-xs text-muted">{{ status }}</span>
    </div>

    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="preset in presets"
        :key="preset.value"
        :label="preset.label"
        size="sm"
        color="neutral"
        :variant="duration === preset.value ? 'solid' : 'outline'"
        @click="setDuration(preset.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const stocks = [
  {
    background: 'linear-gradient(135deg, #1e1b4b, #be185d 58%, #fbbf24)',
    fringe: 'linear-gradient(112deg, transparent 38%, #22d3ee 46%, transparent 54%)',
    label: 'Neon dusk',
    swatches: ['#1e1b4b', '#be185d', '#fbbf24'],
  },
  {
    background: 'linear-gradient(135deg, #042f2e, #0d9488 55%, #a7f3d0)',
    fringe: 'linear-gradient(112deg, transparent 38%, #f472b6 46%, transparent 54%)',
    label: 'Cold seafoam',
    swatches: ['#042f2e', '#0d9488', '#a7f3d0'],
  },
  {
    background: 'linear-gradient(135deg, #431407, #b45309 55%, #fde68a)',
    fringe: 'linear-gradient(112deg, transparent 38%, #818cf8 46%, transparent 54%)',
    label: 'Amber print',
    swatches: ['#431407', '#b45309', '#fde68a'],
  },
] as const

const presets = [
  { label: '320 ms', value: 320 },
  { label: '1040 ms', value: 1040 },
  { label: '1600 ms', value: 1600 },
]

const index = ref(0)
const duration = ref(1040)
const transitionKey = ref(0)
const rested = ref(false)

const stock = computed(() => stocks[index.value] ?? stocks[0])

const status = computed(() => {
  if (transitionKey.value === 0) return 'idle'
  return rested.value ? `rested · ${duration.value} ms` : 'sweeping…'
})

function play() {
  rested.value = false
  transitionKey.value++
}

function next() {
  index.value = (index.value + 1) % stocks.length
  play()
}

function setDuration(value: number) {
  duration.value = value
  play()
}
</script>
