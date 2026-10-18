<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <MHolographicFoil
      class="h-48"
      :intensity="intensity"
      :glare="glare"
      :sheen-speed="sheenSpeed"
    >
      <div class="flex h-full items-center justify-center p-6">
        <span class="text-sm font-semibold text-white/80">
          intensity {{ intensity.toFixed(2) }}
        </span>
      </div>
    </MHolographicFoil>

    <div class="flex flex-col gap-3">
      <label class="flex items-center gap-3 text-xs text-muted">
        <span class="w-16">intensity</span>
        <USlider
          v-model="intensity"
          :min="0"
          :max="1"
          :step="0.05"
          class="flex-1"
        />
      </label>
      <label class="flex items-center gap-3 text-xs text-muted">
        <span class="w-16">glare</span>
        <USlider
          v-model="glare"
          :min="0"
          :max="1"
          :step="0.05"
          class="flex-1"
        />
      </label>
      <label class="flex items-center gap-3 text-xs text-muted">
        <span class="w-16">sheen</span>
        <USlider
          v-model="sheenSpeed"
          :min="0.2"
          :max="3"
          :step="0.1"
          class="flex-1"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const intensity = ref(0.6)
const glare = ref(0.5)
const sheenSpeed = ref(1)
</script>
