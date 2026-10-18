<template>
  <div class="flex w-full max-w-md flex-col gap-6 py-6">
    <div class="flex min-h-32 items-center justify-center gap-4">
      <MMagneticButton :strength="strength">
        <UIcon name="i-lucide-magnet" />
        Pull me
      </MMagneticButton>
      <MMagneticButton
        variant="outline"
        size="icon"
        aria-label="Favourite"
      >
        <UIcon name="i-lucide-heart" />
      </MMagneticButton>
    </div>

    <div class="flex flex-col gap-1.5">
      <USlider
        v-model="strength"
        :min="0"
        :max="1"
        :step="0.05"
        aria-label="Magnet strength"
      />
      <span class="text-xs text-muted">
        strength = {{ strength.toFixed(2) }} · radius stays at 150px
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const strength = ref(0.3)
</script>
