<template>
  <div class="flex w-full flex-col items-center gap-4 px-6 py-10">
    <MPixelFlowField
      class="h-[340px] w-full max-w-2xl rounded-2xl border border-default bg-elevated"
      :paused="paused"
      :scatter="seed"
      :shape="shape"
      :speed="0.8"
      :text="word"
    />

    <div class="flex w-full max-w-2xl flex-wrap items-center justify-center gap-2">
      <UButton
        v-for="option in words"
        :key="option"
        :label="option"
        :color="option === word ? 'primary' : 'neutral'"
        :variant="option === word ? 'solid' : 'outline'"
        size="sm"
        @click="word = option"
      />
    </div>

    <div class="flex w-full max-w-2xl flex-wrap items-center justify-center gap-2">
      <UButton
        v-for="option in shapes"
        :key="option.value"
        :label="option.label"
        :color="option.value === shape ? 'primary' : 'neutral'"
        :variant="option.value === shape ? 'solid' : 'outline'"
        size="sm"
        @click="shape = option.value"
      />
    </div>

    <div class="flex flex-wrap items-center justify-center gap-3">
      <UButton
        label="Re-scatter"
        icon="i-lucide-sparkles"
        color="neutral"
        variant="outline"
        size="sm"
        @click="seed += 1"
      />
      <UButton
        :label="paused ? 'Resume' : 'Pause'"
        :icon="paused ? 'i-lucide-play' : 'i-lucide-pause'"
        color="neutral"
        variant="outline"
        size="sm"
        @click="paused = !paused"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Shape = 'square' | 'circle' | 'cross'

const words = ['motion', 'flow', 'pixel']
const shapes: { label: string, value: Shape }[] = [
  { label: 'Square', value: 'square' },
  { label: 'Circle', value: 'circle' },
  { label: 'Cross', value: 'cross' },
]

const word = ref('motion')
const shape = ref<Shape>('square')
const paused = ref(false)
const seed = ref(0)
</script>
