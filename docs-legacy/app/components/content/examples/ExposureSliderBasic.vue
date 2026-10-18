<template>
  <div class="flex w-full max-w-md flex-col items-center gap-3">
    <MExposureSlider
      class="w-full"
      label="Exposure"
      @change="value = $event"
    />
    <p class="text-sm text-muted">
      {{ value > 0 ? `+${value}` : value }} EV
    </p>
  </div>
</template>

<script setup lang="ts">
// The slider is uncontrolled: it owns the selection and only reports changes.
// Keep your own copy of the value if you need to display it.
const value = ref(0)
</script>
