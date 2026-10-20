<template>
  <div class="flex w-full max-w-lg flex-col gap-6">
    <div class="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-default p-8">
      <MAiOrbFaceMouth
        :mood="mood"
        aria-label="Assistant"
      />
      <MAiOrbFaceMouth
        :colors="orbFaceColors"
        :mood="mood"
        :size="96"
        talking
        aria-label="Assistant, talking"
      />
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="value in moods"
        :key="value"
        :color="mood === value ? 'primary' : 'neutral'"
        :label="value"
        size="sm"
        :variant="mood === value ? 'solid' : 'outline'"
        @click="mood = value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type DemoMood = 'idle' | 'happy' | 'excited' | 'thinking' | 'surprised' | 'sleeping' | 'sad' | 'confused' | 'talking'

const moods: DemoMood[] = ['idle', 'happy', 'excited', 'thinking', 'surprised', 'sleeping', 'sad', 'confused', 'talking']
const mood = ref<DemoMood>('happy')

const orbFaceColors = {
  body: 'secondary',
  bodyEdge: 'color-mix(in oklab, var(--ui-secondary), white 78%)',
  feature: 'color-mix(in oklab, var(--ui-secondary), black 82%)',
}
</script>
