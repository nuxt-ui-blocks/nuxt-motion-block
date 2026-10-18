<template>
  <div class="p-8 space-y-8">
    <h1 class="text-2xl font-bold text-highlighted">
      GridLoader
    </h1>
    <p class="text-muted">
      60+ preset patterns with pulse, sequence, and stagger animation modes.
    </p>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Pattern Gallery
        </h2>
      </template>
      <div class="grid grid-cols-5 gap-4 py-4">
        <div
          v-for="p in patternGallery"
          :key="p"
          class="flex flex-col items-center gap-2"
        >
          <MGridLoader
            :pattern="p"
            :size="32"
          />
          <span class="text-xs text-muted">{{ p }}</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Animation Modes
        </h2>
      </template>
      <div class="flex gap-12 items-start justify-center py-4">
        <div class="flex flex-col items-center gap-3">
          <MGridLoader
            mode="pulse"
            pattern="cross"
            color="blue"
            :size="48"
          />
          <span class="text-xs text-muted font-medium">Pulse</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <MGridLoader
            mode="sequence"
            color="green"
            :size="48"
            :sequence="['plus-hollow', 'cross', 'diamond', 'checkerboard']"
          />
          <span class="text-xs text-muted font-medium">Sequence</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <MGridLoader
            mode="stagger"
            pattern="frame"
            color="amber"
            :size="48"
          />
          <span class="text-xs text-muted font-medium">Stagger</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Color Presets
        </h2>
      </template>
      <div class="flex gap-8 items-center justify-center py-4">
        <div
          v-for="c in colorPresets"
          :key="c.name"
          class="flex flex-col items-center gap-2"
        >
          <MGridLoader
            :color="c.value"
            :size="32"
            pattern="plus-full"
          />
          <span class="text-xs text-muted">{{ c.name }}</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <MGridLoader
            :size="32"
            pattern="plus-full"
          />
          <span class="text-xs text-muted">Default</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <MGridLoader
            color="#a855f7"
            :size="32"
            pattern="plus-full"
          />
          <span class="text-xs text-muted">Custom</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Size Presets
        </h2>
      </template>
      <div class="flex gap-8 items-end justify-center py-4">
        <div
          v-for="s in sizePresets"
          :key="s.name"
          class="flex flex-col items-center gap-2"
        >
          <MGridLoader
            :size="s.value"
            pattern="plus-full"
          />
          <span class="text-xs text-muted">{{ s.name }} ({{ s.value }}px)</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Speed Presets
        </h2>
      </template>
      <div class="flex gap-8 items-center justify-center py-4">
        <div
          v-for="sp in speedPresets"
          :key="sp.name"
          class="flex flex-col items-center gap-2"
        >
          <MGridLoader
            :speed="sp.value"
            color="blue"
            :size="32"
            pattern="cross"
          />
          <span class="text-xs text-muted">{{ sp.name }}</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Rounded vs Square
        </h2>
      </template>
      <div class="flex gap-12 items-center justify-center py-4">
        <div class="flex flex-col items-center gap-2">
          <MGridLoader
            :rounded="false"
            color="red"
            :size="48"
            pattern="plus-full"
          />
          <span class="text-xs text-muted">Square</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <MGridLoader
            :rounded="true"
            color="red"
            :size="48"
            pattern="plus-full"
          />
          <span class="text-xs text-muted">Rounded</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Blur / Glow Effect
        </h2>
      </template>
      <div class="flex gap-12 items-center justify-center py-4">
        <div
          v-for="b in blurLevels"
          :key="b.level"
          class="flex flex-col items-center gap-2"
        >
          <MGridLoader
            :blur="b.level"
            color="green"
            :size="48"
            pattern="frame"
          />
          <span class="text-xs text-muted">{{ b.label }}</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Sequence Mode
        </h2>
      </template>
      <div class="flex gap-8 items-center justify-center py-4">
        <div class="flex flex-col items-center gap-3">
          <MGridLoader
            mode="sequence"
            color="amber"
            :size="56"
            speed="normal"
            :sequence="['solo-tl', 'solo-tr', 'solo-br', 'solo-bl']"
          />
          <span class="text-xs text-muted">Corner rotation</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <MGridLoader
            mode="sequence"
            color="red"
            :size="56"
            speed="fast"
            :sequence="['line-h-top', 'line-h-mid', 'line-h-bot', 'line-h-mid']"
          />
          <span class="text-xs text-muted">Line sweep</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <MGridLoader
            mode="sequence"
            color="blue"
            :size="56"
            speed="slow"
            :sequence="['ripple-out', 'ripple-in', 'border']"
          />
          <span class="text-xs text-muted">Ripple + border</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Static Mode
        </h2>
      </template>
      <div class="flex gap-8 items-center justify-center py-4">
        <div
          v-for="p in staticPatterns"
          :key="p"
          class="flex flex-col items-center gap-2"
        >
          <MGridLoader
            :static="true"
            :pattern="p"
            :size="32"
          />
          <span class="text-xs text-muted">{{ p }}</span>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const patternGallery = [
  'solo-center', 'plus-hollow', 'plus-full', 'cross', 'diamond',
  'checkerboard', 'frame', 'border', 'stripes-h', 'stripes-v',
  'line-h-mid', 'line-v-mid', 'line-diag-1', 'line-diag-2', 'x-shape',
  'T-top', 'L-tl', 'corners', 'spiral-cw', 'wave-lr',
] as const

const colorPresets = [
  { name: 'Primary', value: 'primary' as const },
  { name: 'Secondary', value: 'secondary' as const },
  { name: 'Success', value: 'success' as const },
  { name: 'Warning', value: 'warning' as const },
  { name: 'Error', value: 'error' as const },
  { name: 'Info', value: 'info' as const },
  { name: 'Neutral', value: 'neutral' as const },
]

const sizePresets = [
  { name: 'sm', value: 24 },
  { name: 'md', value: 32 },
  { name: 'lg', value: 48 },
  { name: 'xl', value: 64 },
]

const speedPresets = [
  { name: 'Fast', value: 'fast' as const },
  { name: 'Normal', value: 'normal' as const },
  { name: 'Slow', value: 'slow' as const },
]

const blurLevels = [
  { level: 0, label: 'None' },
  { level: 1, label: '1px' },
  { level: 2, label: '2px' },
  { level: 3, label: '3px' },
]

const staticPatterns = [
  'cross', 'diamond', 'frame', 'border', 'checkerboard',
] as const
</script>
