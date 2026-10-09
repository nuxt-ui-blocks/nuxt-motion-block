<template>
  <div class="flex w-full max-w-lg flex-col gap-6">
    <div class="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-default p-8">
      <MAiOrbFace
        :state="state"
        aria-label="Assistant"
      />
      <MAiOrbFace
        :state="'streaming'"
        :colors="{ body: 'oklch(72% 0.16 220)', bodyEdge: 'oklch(97% 0.02 220)' }"
        size="96"
      />
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="value in states"
        :key="value"
        :color="state === value ? 'primary' : 'neutral'"
        :label="value"
        size="sm"
        :variant="state === value ? 'solid' : 'outline'"
        @click="state = value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type DemoState = 'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'

const states: DemoState[] = ['idle', 'listening', 'thinking', 'streaming', 'done', 'error']
const state = ref<DemoState>('idle')
</script>
