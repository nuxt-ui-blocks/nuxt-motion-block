<template>
  <div class="flex justify-center items-center">
    <MMorphingPopover
      :variants="customVariants"
      :transition="customTransition"
    >
      <UButton color="tertiary">
        Custom Animation
      </UButton>

      <template #content>
        <div class="p-4 w-64">
          <h3 class="font-bold text-lg mb-2">
            Custom Animation
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            This popover has custom morphing animations.
          </p>
        </div>
      </template>
    </MMorphingPopover>
  </div>
</template>

<script setup>
const customVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    rotate: -15,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    rotate: 15,
  },
}

const customTransition = {
  type: 'spring',
  bounce: 0.2,
  duration: 0.5,
}
</script>
