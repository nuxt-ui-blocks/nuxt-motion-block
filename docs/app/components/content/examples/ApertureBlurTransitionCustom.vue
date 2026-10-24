<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MApertureBlurTransition
      :duration="duration"
      :transition-key="transitionKey"
      class="overflow-hidden rounded-2xl"
      @rest="rested = true"
    >
      <div
        class="relative flex h-44 flex-col justify-end gap-1 p-6"
        :style="{ backgroundImage: frame.gradient }"
      >
        <span class="text-xs font-medium tracking-widest text-white/70">
          {{ frame.stop }}
        </span>
        <span class="text-xl font-semibold text-white">{{ frame.label }}</span>
      </div>
    </MApertureBlurTransition>

    <div class="flex flex-wrap items-center gap-2">
      <UButton
        label="Next frame"
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
        @click="replay"
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
const frames = [
  {
    gradient: 'linear-gradient(135deg, #fb7185, #7c3aed 55%, #1e1b4b)',
    label: 'Wide open',
    stop: 'f/1.4',
  },
  {
    gradient: 'linear-gradient(135deg, #fbbf24, #f97316 50%, #7f1d1d)',
    label: 'Mid stop',
    stop: 'f/5.6',
  },
  {
    gradient: 'linear-gradient(135deg, #34d399, #0f766e 55%, #022c22)',
    label: 'Stopped down',
    stop: 'f/16',
  },
] as const

const presets = [
  { label: '280 ms', value: 280 },
  { label: '760 ms', value: 760 },
  { label: '1400 ms', value: 1400 },
]

const index = ref(0)
const duration = ref(760)
const transitionKey = ref(0)
const rested = ref(false)

const frame = computed(() => frames[index.value] ?? frames[0])

const status = computed(() => {
  if (transitionKey.value === 0) return 'idle'
  return rested.value ? `rested · ${duration.value} ms` : 'sweeping…'
})

function play() {
  rested.value = false
  transitionKey.value++
}

function next() {
  index.value = (index.value + 1) % frames.length
  play()
}

function replay() {
  play()
}

function setDuration(value: number) {
  duration.value = value
  play()
}
</script>
