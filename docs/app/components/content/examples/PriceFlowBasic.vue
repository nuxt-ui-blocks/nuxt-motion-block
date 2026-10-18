<template>
  <div class="flex w-full flex-col items-center gap-6">
    <MPriceFlow
      :value="total"
      prefix="Total:"
    />

    <div class="flex items-center gap-2">
      <UButton
        icon="i-lucide-minus"
        color="neutral"
        variant="outline"
        size="sm"
        aria-label="Decrease total"
        :disabled="step === 0"
        @click="step = step - 1"
      />
      <UButton
        icon="i-lucide-plus"
        color="neutral"
        variant="outline"
        size="sm"
        aria-label="Increase total"
        @click="step = step + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const base = 24
const step = ref(0)
const total = computed(() => base + step.value)
</script>
