<template>
  <div class="space-y-4">
    <UButton
      :label="show ? 'Reveal' : 'Mask'"
      @click="show = !show"
    />

    <MMaskContainer
      :show="show"
      icon="i-lucide-eye"
      label="Interactive Reveal"
      class="relative h-64 rounded-xl border bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div class="flex h-full items-center justify-center">
        <span class="text-3xl font-bold text-primary">Masked Content</span>
      </div>
    </MMaskContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
</script>
