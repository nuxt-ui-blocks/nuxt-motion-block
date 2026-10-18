<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div class="flex min-h-32 items-center justify-center rounded-xl bg-black/5 p-6">
      <MSiriOrb
        :state="state"
        size="120px"
      />
    </div>

    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="value in states"
        :key="value"
        :label="value"
        :variant="state === value ? 'solid' : 'outline'"
        :color="state === value ? 'primary' : 'neutral'"
        @click="state = value"
      />
    </div>

    <p class="text-xs text-muted">
      state = <span class="font-medium">{{ state }}</span> · rotation period
      {{ period }}s
    </p>
  </div>
</template>

<script setup lang="ts">
const state = ref('idle')
const states = ['idle', 'listening', 'thinking', 'speaking', 'error']

// `thinking` runs the ambient gradient 2.4x faster than `idle`; every other
// state uses animationDuration as-is.
const period = computed(() =>
  state.value === 'thinking' ? (20 / 2.4).toFixed(1) : '20',
)
</script>
