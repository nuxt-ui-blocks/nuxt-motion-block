<template>
  <div class="flex w-full justify-center py-6">
    <div class="w-full max-w-md space-y-3">
      <MScrubber
        label="Volume"
        :default-value="0.65"
        @change="volume = $event"
      />
      <p class="text-xs text-muted">
        {{ volume.toFixed(2) }} — drag the track or use the arrow keys.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const volume = ref(0.65)
</script>
