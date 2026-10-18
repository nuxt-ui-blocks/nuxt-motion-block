<template>
  <div class="flex w-full max-w-md flex-col gap-5">
    <MAnimatedProgressBar
      :value="progress"
      :max="100"
      label="Uploading assets"
      status
      shimmer
      color="primary"
    />

    <div class="flex items-center gap-3">
      <UButton
        size="sm"
        label="Advance"
        icon="i-lucide-play"
        @click="advance"
      />
      <UButton
        size="sm"
        label="Reset"
        variant="outline"
        color="neutral"
        @click="progress = 0"
      />
      <span class="text-xs tabular-nums text-muted">{{ progress }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const progress = ref(18)

function advance() {
  progress.value = progress.value >= 100 ? 0 : Math.min(100, progress.value + 24)
}
</script>
