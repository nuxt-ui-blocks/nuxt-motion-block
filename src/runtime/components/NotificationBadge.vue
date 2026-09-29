<script setup lang="ts">
import { computed } from 'vue'
import { motion, AnimatePresence } from 'motion-v'

interface Props {
  count: number
  tooltip?: string
  max?: number
  color?: string
  badgeSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  tooltip: '',
  max: 99,
  color: 'error',
  badgeSize: 'sm',
})

const displayText = computed(() => {
  if (props.count <= 0) return ''
  if (props.count > props.max) return `${props.max}+`
  return String(props.count)
})

const isVisible = computed(() => props.count > 0)
</script>

<template>
  <UTooltip :text="tooltip">
    <div class="relative inline-flex">
      <slot />
      <AnimatePresence>
        <motion.div
          v-if="isVisible"
          key="badge"
          :initial="{ scale: 0, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :exit="{ scale: 0, opacity: 0 }"
          :transition="{ type: 'spring', stiffness: 500, damping: 20 }"
          class="absolute -top-2 -right-2 z-10"
        >
          <UBadge
            :label="displayText"
            :color="color as any"
            variant="solid"
            :size="badgeSize"
            class="rounded-full px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  </UTooltip>
</template>
