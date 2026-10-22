<template>
  <div class="flex w-full flex-col items-center gap-4">
    <MPowerOffSlide @power-off="handlePowerOff" />
    <p class="text-xs text-muted">
      {{ count === 0
        ? 'Drag the handle, or focus it and press Enter.'
        : `Powered off ${count} ${count === 1 ? 'time' : 'times'}.` }}
    </p>
  </div>
</template>

<script setup lang="ts">
const count = ref(0)

function handlePowerOff() {
  count.value += 1
}
</script>
