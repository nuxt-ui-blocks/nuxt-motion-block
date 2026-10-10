<script setup lang="ts">
import { computed } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import notificationBadge from '../theme/notification-badge'

interface Props {
  class?: string
  count: number
  tooltip?: string
  max?: number
  color?: string
  badgeSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  tooltip: '',
  max: 99,
  color: 'error',
  badgeSize: 'sm',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'notificationBadge', props, theme: notificationBadge })

const displayText = computed(() => {
  if (props.count <= 0) return ''
  if (props.count > props.max) return `${props.max}+`
  return String(props.count)
})

const isVisible = computed(() => props.count > 0)
</script>

<template>
  <UTooltip :text="tooltip">
    <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
      <slot />
      <AnimatePresence>
        <motion.div
          v-if="isVisible"
          key="badge"
          :initial="{ scale: 0, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :exit="{ scale: 0, opacity: 0 }"
          :transition="{ type: 'spring', stiffness: 500, damping: 20 }"
          :class="ui.badge({ class: uiProps.ui?.badge })"
        >
          <UBadge
            :label="displayText"
            :color="color as any"
            variant="solid"
            :size="badgeSize"
            :class="ui.badgeContent({ class: uiProps.ui?.badgeContent })"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  </UTooltip>
</template>
