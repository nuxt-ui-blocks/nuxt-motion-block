<template>
  <UButton
    variant="ghost"
    :size="size"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @click="cycle"
  >
    <AnimatePresence mode="wait">
      <motion.span
        :key="colorMode.preference"
        :initial="{ opacity: 0, scale: 0.6, rotate: -90 }"
        :animate="{ opacity: 1, scale: 1, rotate: 0 }"
        :exit="{ opacity: 0, scale: 0.6, rotate: 90 }"
        :transition="{ duration: 0.2 }"
        :class="ui.iconWrapper({ class: uiProps.ui?.iconWrapper })"
      >
        <UIcon
          :name="currentIcon"
          :class="ui.icon({ class: uiProps.ui?.icon })"
        />
      </motion.span>
    </AnimatePresence>
  </UButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '#imports'
import { motion, AnimatePresence } from 'motion-v'
import type { ButtonProps } from '#ui/components/Button.vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import themeToggle from '../theme/theme-toggle'

interface Props {
  size?: ButtonProps['size']
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'themeToggle',
  props,
  theme: themeToggle,
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
