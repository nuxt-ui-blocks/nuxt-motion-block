<template>
  <div class="flex w-full max-w-md flex-col gap-5">
    <MAnimatedNumberInput
      v-model="seats"
      label="Seats"
      :min="1"
      :max="12"
      :step="1"
    />

    <MAnimatedNumberInput
      v-model="budget"
      label="Monthly budget"
      :decrement="false"
      :min="0"
      :step="500"
      :format-options="currency"
    />

    <div class="flex items-center justify-between rounded-lg bg-elevated px-4 py-3 text-sm">
      <span class="text-muted">Projected monthly total</span>
      <span class="font-semibold tabular-nums text-highlighted">{{ total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const seats = ref(4)
const budget = ref(2500)

const currency = { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }

const total = computed(() => new Intl.NumberFormat('en-US', currency).format(seats.value * budget.value))
</script>
