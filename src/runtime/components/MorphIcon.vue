<template>
  <span :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <AnimatePresence mode="wait">
      <motion.span
        :key="String(toggled)"
        :initial="{ scale: 0.8, rotate: -90 }"
        :animate="{ scale: 1.2, rotate: 0 }"
        :exit="{ scale: 0.8, rotate: 90 }"
        :transition="{ duration: 0.25, ease: 'easeInOut' }"
        :class="ui.icon({ class: uiProps.ui?.icon })"
      >
        <UIcon
          :name="toggled ? icon2 : icon1"
          :class="ui.iconIcon({ class: uiProps.ui?.iconIcon })"
        />
      </motion.span>
    </AnimatePresence>
  </span>
</template>

<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import morphIcon from '../theme/morph-icon'

const props = withDefaults(defineProps<{
  icon1?: string
  icon2?: string
  toggled?: boolean
  class?: string
  ui?: Record<string, any>
}>(), {
  icon1: 'i-lucide-menu',
  icon2: 'i-lucide-x',
  toggled: false,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'morphIcon', props, theme: morphIcon })
</script>
