<template>
  <div class="w-full py-6">
    <MCodeComparison
      before-label="Before"
      after-label="After"
      :before="before"
      :after="after"
    />
  </div>
</template>

<script setup lang="ts">
const before = `const total = items.filter(item => item.active).map(item => item.price)
const tax = total.reduce((sum, price) => sum + price * 0.2, 0)
const receipt = { total, tax, paid: total + tax, currency: 'USD' }`

const after = `const total = items.filter(({ active }) => active).map(({ price }) => price)
const tax = total.reduce((sum, price) => sum + price * 0.2, 0)
const receipt = { total, tax, paid: total + tax, currency: 'USD' }`
</script>
