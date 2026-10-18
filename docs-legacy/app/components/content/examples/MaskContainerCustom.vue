<template>
  <div class="space-y-4">
    <UButton
      :label="show ? 'Reveal' : 'Mask'"
      @click="show = !show"
    />

    <MMaskContainer
      :show="show"
      color="rgba(76, 29, 149, 0.75)"
      icon="i-lucide-lock"
      label="Members Only"
      class="relative min-h-96 rounded-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-slate-900 dark:to-slate-800"
    >
      <div class="flex min-h-96 flex-col items-center justify-center gap-4 p-8 text-center">
        <h3 class="text-3xl font-bold text-black dark:text-white">
          Custom Mask Colour
        </h3>
        <p class="max-w-md text-lg text-slate-600 dark:text-slate-300">
          The <code>color</code> prop tints the overlay. The mask falls back to an
          icon and label, so you only need the <code>mask</code> slot when you want
          something richer.
        </p>
      </div>
    </MMaskContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
</script>
