<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MRadioGroup
      v-model="plan"
      :items="plans"
      legend="Deployment target"
      :ui="{ label: 'font-medium' }"
    />

    <div class="flex items-center justify-between rounded-lg bg-elevated px-4 py-3 text-sm">
      <span class="text-muted">Selected</span>
      <span class="font-semibold capitalize text-highlighted">{{ plan }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const plan = ref('edge')

const plans = [
  { value: 'edge', label: 'Edge', description: 'Closest to your visitors' },
  { value: 'regional', label: 'Regional', description: 'Single data centre' },
  { value: 'self', label: 'Self-hosted', description: 'Your own hardware' },
]
</script>
