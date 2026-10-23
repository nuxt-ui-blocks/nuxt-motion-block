<template>
  <div class="flex w-full flex-col items-center gap-3 py-6">
    <p class="text-sm text-muted">
      Orders shipped
    </p>
    <MNumberFlow
      v-model="count"
      :max="999"
      :min="0"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(128)
</script>
