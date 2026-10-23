<template>
  <div class="flex w-full max-w-sm flex-col gap-4 py-6">
    <MContentSkeleton :loading="loading">
      <div class="rounded-xl border border-default bg-elevated p-5">
        <h3 class="text-base font-semibold text-highlighted">
          Quarterly report
        </h3>
        <p class="mt-2 text-sm text-muted">
          Revenue grew 18% against a flat headcount, and churn held below two
          percent for the third quarter running.
        </p>
      </div>
    </MContentSkeleton>

    <div class="flex items-center gap-3">
      <MContentSkeleton class="size-10 rounded-full" />
      <div class="flex flex-1 flex-col gap-2">
        <MContentSkeleton class="h-3 w-2/3" />
        <MContentSkeleton class="h-3 w-1/2" />
      </div>
    </div>

    <UButton
      class="self-start"
      color="neutral"
      variant="outline"
      @click="loading = !loading"
    >
      {{ loading ? 'Show content' : 'Reload' }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
