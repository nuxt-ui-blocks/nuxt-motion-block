<template>
  <span class="relative inline-flex items-center justify-center w-6 h-6">
    <AnimatePresence mode="wait">
      <motion.span
        :key="String(toggled)"
        :initial="{ scale: 0.8, rotate: -90 }"
        :animate="{ scale: 1.2, rotate: 0 }"
        :exit="{ scale: 0.8, rotate: 90 }"
        :transition="{ duration: 0.25, ease: 'easeInOut' }"
        class="absolute inset-0 flex items-center justify-center"
      >
        <UIcon
          :name="toggled ? icon2 : icon1"
          class="w-full h-full"
        />
      </motion.span>
    </AnimatePresence>
  </span>
</template>

<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'

withDefaults(defineProps<{
  icon1?: string
  icon2?: string
  toggled?: boolean
}>(), {
  icon1: 'i-lucide-menu',
  icon2: 'i-lucide-x',
  toggled: false,
})
</script>
