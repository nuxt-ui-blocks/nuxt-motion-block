<template>
  <div class="flex w-full max-w-md flex-col items-center gap-3">
    <MExposureSlider
      class="w-full"
      label="ISO"
      accent-color="#a3e635"
      :disabled="locked"
    />
    <UButton
      size="sm"
      variant="subtle"
      @click="locked = !locked"
    >
      {{ locked ? 'Unlock' : 'Lock' }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
// A disabled slider keeps `aria-disabled="true"` and ignores both the pointer
// and the keyboard, so it stays reachable by screen readers without accepting
// input.
const locked = ref(true)
</script>
