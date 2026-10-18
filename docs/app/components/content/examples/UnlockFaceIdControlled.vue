<template>
  <div class="flex w-full max-w-sm flex-col items-center gap-6 py-4">
    <div class="relative">
      <MUnlockFaceId
        :error-message="'Not recognized. Try again.'"
        :status="status"
        size="128px"
      />

      <UButton
        :disabled="status === 'scanning'"
        :label="status === 'error' ? 'Try again' : 'Run scan'"
        color="neutral"
        size="sm"
        variant="outline"
        @click="advance"
      />
    </div>

    <div class="flex flex-wrap items-center justify-center gap-2">
      <UButton
        v-for="value in statuses"
        :key="value"
        :label="value"
        :variant="status === value ? 'solid' : 'ghost'"
        :color="status === value ? 'primary' : 'neutral'"
        size="xs"
        @click="status = value"
      />
    </div>

    <p class="text-xs text-muted">
      status = <span class="font-medium">{{ status }}</span> · controlled, so
      the component never resolves its own scan
    </p>
  </div>
</template>

<script setup lang="ts">
const statuses = ['idle', 'scanning', 'success', 'error'] as const

const status = ref<(typeof statuses)[number]>('idle')

function advance() {
  status.value
    = status.value === 'idle' || status.value === 'error'
      ? 'scanning'
      : 'success'
}
</script>
