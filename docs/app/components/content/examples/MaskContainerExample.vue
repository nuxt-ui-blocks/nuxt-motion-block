<template>
  <div class="space-y-4">
    <UButton
      :label="show ? 'Hide mask' : 'Show mask'"
      @click="show = !show"
    />

    <MMaskContainer
      :show="show"
      class="relative rounded-lg border bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800"
    >
      <div class="flex h-96 flex-col items-center justify-center gap-4 p-8 text-center">
        <h2 class="text-3xl font-bold text-black dark:text-white">
          Mask Reveal Effect
        </h2>
        <p class="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Drive the mask with the <code>show</code> prop. The overlay fades and scales
          itself away, so the content underneath is always in the DOM.
        </p>
      </div>

      <template #mask>
        <div class="text-center">
          <h2 class="text-5xl font-bold text-white mb-6">
            Masked
          </h2>
          <p class="text-lg text-white/80">
            The content behind is dimmed.
          </p>
        </div>
      </template>
    </MMaskContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
</script>
