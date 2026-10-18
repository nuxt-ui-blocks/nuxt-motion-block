<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MSpinningText
      children="DOUBLE-TURN"
      class="text-lg font-semibold text-secondary"
      :duration="6"
      :variants="variants"
      :transition="transition"
      :style="{ filter: 'drop-shadow(0 0 12px currentColor)' }"
    />
    <p class="max-w-xs text-center text-sm text-muted">
      `variants.container` replaces the 360° target with 720°, and
      `transition` switches the easing to ease-in-out for a softer start and stop at each cycle seam.
    </p>
  </div>
</template>

<script setup>
const variants = {
  container: {
    visible: { rotate: 720 },
  },
}
const transition = {
  ease: 'easeInOut',
}
</script>
