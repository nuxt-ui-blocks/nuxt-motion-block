<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div class="flex min-h-40 items-center justify-center">
      <MSiriOrb
        :amplitude="amplitude"
        :size="'140px'"
        :state="state"
      />
    </div>

    <div class="flex flex-col gap-3">
      <label class="flex items-center gap-3 text-xs text-muted">
        <span class="w-16">amplitude</span>
        <USlider
          v-model="amplitude"
          :min="0"
          :max="1"
          :step="0.01"
          class="flex-1"
        />
      </label>
      <USelect
        v-model="state"
        :items="states"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const amplitude = ref(0)
const state = ref('idle')

const states = [
  { label: 'idle', value: 'idle' },
  { label: 'listening', value: 'listening' },
  { label: 'thinking', value: 'thinking' },
  { label: 'speaking', value: 'speaking' },
  { label: 'error', value: 'error' },
]

// A slow synthetic level, standing in for a real microphone. Feed
// `amplitude` a MotionValue from `useAudioAmplitude` for live input.
let raf = 0
let t = 0
const tick = () => {
  t += 0.02
  amplitude.value = 0.5 + 0.5 * Math.sin(t) * Math.sin(t * 0.37)
  raf = requestAnimationFrame(tick)
}
onMounted(() => {
  raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>
