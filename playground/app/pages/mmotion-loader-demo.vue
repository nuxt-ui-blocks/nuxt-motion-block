<template>
  <div class="p-8 space-y-8">
    <h1 class="text-2xl font-bold text-highlighted">
      MotionLoader
    </h1>
    <p class="text-muted">
      12 animated loader variants with customizable size, speed, and color.
    </p>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          All Variants
        </h2>
      </template>
      <div class="grid grid-cols-3 gap-8 py-6">
        <div
          v-for="v in allVariants"
          :key="v"
          class="flex flex-col items-center gap-3"
        >
          <MMotionLoader
            :variant="v"
            :size="48"
          />
          <span class="text-xs text-muted">{{ v }}</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Interactive Switcher
        </h2>
      </template>
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="v in allVariants"
            :key="v"
            :label="v"
            :variant="activeVariant === v ? 'solid' : 'outline'"
            size="sm"
            @click="activeVariant = v"
          />
        </div>
        <div class="flex justify-center py-10">
          <MMotionLoader
            :variant="activeVariant"
            :size="64"
          />
        </div>
        <p class="text-center text-sm text-muted">
          Current: <code class="font-mono text-highlighted">{{ activeVariant }}</code>
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Size Comparison
        </h2>
      </template>
      <div class="flex gap-10 items-end justify-center py-6">
        <div
          v-for="s in sizePresets"
          :key="s.label"
          class="flex flex-col items-center gap-2"
        >
          <MMotionLoader
            :variant="activeVariant"
            :size="s.size"
          />
          <span class="text-xs text-muted">{{ s.label }}</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Speed Comparison
        </h2>
      </template>
      <div class="flex gap-10 items-end justify-center py-6">
        <div
          v-for="sp in speedPresets"
          :key="sp.label"
          class="flex flex-col items-center gap-2"
        >
          <MMotionLoader
            :variant="activeVariant"
            :speed="sp.speed"
            :size="48"
          />
          <span class="text-xs text-muted">{{ sp.label }}</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          Custom Color
        </h2>
      </template>
      <div class="flex gap-8 items-center justify-center py-6">
        <div
          v-for="c in customColors"
          :key="c.label"
          class="flex flex-col items-center gap-2"
        >
          <MMotionLoader
            :variant="activeVariant"
            :color="c.value"
            :size="48"
          />
          <span class="text-xs text-muted">{{ c.label }}</span>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold text-highlighted">
          In Context
        </h2>
      </template>
      <div class="space-y-4 py-4">
        <div
          v-for="item in contextExamples"
          :key="item.label"
          class="flex items-center gap-3"
        >
          <MMotionLoader :variant="item.variant" />
          <span class="text-sm text-muted">{{ item.label }}</span>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MotionLoaderVariant } from '../../../src/runtime/components/MotionLoader.vue'

const allVariants: MotionLoaderVariant[] = [
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

const activeVariant = ref<MotionLoaderVariant>('orbit')

const sizePresets = [
  { label: 'sm (24)', size: 24 },
  { label: 'md (40)', size: 40 },
  { label: 'lg (64)', size: 64 },
  { label: 'xl (96)', size: 96 },
]

const speedPresets = [
  { label: '0.5x', speed: 0.5 },
  { label: '1x', speed: 1 },
  { label: '2x', speed: 2 },
  { label: '3x', speed: 3 },
]

const customColors = [
  { label: 'Primary', value: 'var(--ui-primary)' },
  { label: 'Success', value: 'var(--ui-success)' },
  { label: 'Warning', value: 'var(--ui-warning)' },
  { label: 'Error', value: 'var(--ui-error)' },
  { label: 'Info', value: 'var(--ui-info)' },
]

const contextExamples = [
  { variant: 'orbit' as const, label: 'Loading data...' },
  { variant: 'wave-bars' as const, label: 'Processing request...' },
  { variant: 'dot-ring' as const, label: 'Syncing changes...' },
  { variant: 'breathing-glow' as const, label: 'Connecting to server...' },
  { variant: 'comet' as const, label: 'Analyzing results...' },
]
</script>
