<template>
  <MAnimatedDialog
    :variants="customVariants"
    :transition-options="customTransition"
  >
    <UButton
      label="Custom Animation"
      color="warning"
    />

    <template #body>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">
          Custom Animation
        </h3>
        <p>This dialog uses custom variants and transition props.</p>
      </div>
    </template>
  </MAnimatedDialog>
</template>

<script setup>
const customVariants = {
  initial: { opacity: 0, scale: 0.5, rotate: -15 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  exit: { opacity: 0, scale: 0.5, rotate: 15 },
}

const customTransition = {
  type: 'spring',
  bounce: 0.2,
  duration: 0.5,
}
</script>
