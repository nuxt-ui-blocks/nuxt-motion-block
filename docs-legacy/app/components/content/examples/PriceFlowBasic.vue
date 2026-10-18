<template>
  <div class="flex h-24 w-full items-center justify-center">
    <MPriceFlow
      :value="price"
      prefix="Total:"
      class="cursor-pointer"
      @click="price = price === 29.99 ? 49.99 : 29.99"
    />
  </div>
</template>

<script setup lang="ts">
const price = ref(29.99)
</script>
