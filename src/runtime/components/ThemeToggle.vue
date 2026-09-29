<template>
  <UButton
    variant="ghost"
    :size="size"
    @click="cycle"
  >
    <AnimatePresence mode="wait">
      <motion.span
        :key="colorMode.preference"
        :initial="{ opacity: 0, scale: 0.6, rotate: -90 }"
        :animate="{ opacity: 1, scale: 1, rotate: 0 }"
        :exit="{ opacity: 0, scale: 0.6, rotate: 90 }"
        :transition="{ duration: 0.2 }"
        class="inline-flex items-center justify-center"
      >
        <UIcon
          :name="currentIcon"
          class="w-5 h-5"
        />
      </motion.span>
    </AnimatePresence>
  </UButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { motion, AnimatePresence } from 'motion-v'

interface Props {
  size?: string
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})

const colorMode = useColorMode()

const preferences = ['light', 'dark', 'system'] as const

const icons: Record<string, string> = {
  light: 'i-lucide-sun',
  dark: 'i-lucide-moon',
  system: 'i-lucide-monitor',
}

const currentIcon = computed(() => icons[colorMode.preference] ?? icons.system)

function cycle() {
  const idx = preferences.indexOf(colorMode.preference as typeof preferences[number])
  const next = (idx + 1) % preferences.length
  colorMode.preference = preferences[next]
}
</script>
