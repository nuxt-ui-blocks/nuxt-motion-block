<template>
  <div class="flex w-full flex-col items-center gap-4">
    <UButtonGroup size="sm">
      <UButton
        label="Monthly"
        :color="yearly ? 'neutral' : 'primary'"
        :variant="yearly ? 'outline' : 'solid'"
        @click="yearly = false"
      />
      <UButton
        label="Yearly"
        :color="yearly ? 'primary' : 'neutral'"
        :variant="yearly ? 'solid' : 'outline'"
        @click="yearly = true"
      />
    </UButtonGroup>

    <div class="flex flex-col items-center gap-1">
      <MPriceFlow :value="yearly ? 229 : 19" />
      <p class="text-xs text-muted">
        Pro plan · billed {{ yearly ? 'annually' : 'monthly' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const yearly = ref(false)
</script>
