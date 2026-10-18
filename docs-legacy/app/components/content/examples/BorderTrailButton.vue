<template>
  <div class="flex flex-col items-center gap-6">
    <UButton
      color="neutral"
      variant="outline"
      size="lg"
      class="relative overflow-hidden"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <MBorderTrail
        v-if="isHovered"
        class="bg-white/30"
        :size="20"
        :transition="{ duration: 1.5, ease: 'easeInOut' }"
      />
      <span class="relative z-10">Hover Me</span>
    </UButton>

    <p class="text-gray-600 dark:text-gray-400 text-sm max-w-xs text-center">
      This button shows the border trail effect only on hover, creating a subtle interactive experience.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isHovered = ref(false)
</script>
