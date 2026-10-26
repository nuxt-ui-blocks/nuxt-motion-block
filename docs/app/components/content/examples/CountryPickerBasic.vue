<template>
  <div class="flex w-full justify-center py-6">
    <div class="w-full max-w-sm space-y-3">
      <div>
        <p class="text-sm font-medium text-highlighted">
          Billing country
        </p>
        <p class="text-xs text-muted">
          Used for tax and invoice currency.
        </p>
      </div>

      <MCountryPicker
        v-model="country"
        label="Billing country"
        :recent="['DE', 'US']"
      />

      <p class="text-xs text-muted">
        Selected code: {{ country }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const country = ref('DE')
</script>
