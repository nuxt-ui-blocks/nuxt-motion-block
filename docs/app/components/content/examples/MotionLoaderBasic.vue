<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <div class="flex items-center justify-center gap-6 rounded-2xl border border-default bg-default py-10">
      <MMotionLoader
        :variant="variant"
        :size="56"
        :speed="speed"
        color="var(--ui-primary)"
      />
      <span class="text-sm text-muted">
        {{ variant }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <USelect
        v-model="variant"
        :items="variants"
      />
      <USelect
        v-model="speed"
        :items="speedItems"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const variant = ref('orbit')
const speed = ref(1)

const variants = [
  'orbit',
  'newton-cradle',
  'pendulum',
  'hourglass',
  'morph-ring',
  'square-snake',
  'comet',
  'radar',
  'cube-flip',
  'wave-bars',
  'breathing-glow',
  'dot-ring',
]

const speedItems = [
  { label: '0.5×', value: 0.5 },
  { label: '1×', value: 1 },
  { label: '2×', value: 2 },
]
</script>
