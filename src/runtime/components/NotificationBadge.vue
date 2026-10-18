<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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

const direction = ref(1)

watch(() => props.count, (next, prev) => {
  direction.value = next >= prev ? 1 : -1
})
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
            :color="color as any"
            variant="solid"
            :size="badgeSize"
            :class="ui.badgeContent({ class: uiProps.ui?.badgeContent })"
          >
            <span class="relative inline-flex justify-center overflow-hidden">
              <AnimatePresence
                :initial="false"
                mode="popLayout"
              >
                <motion.span
                  :key="props.count"
                  :initial="{ y: direction * 12, opacity: 0 }"
                  :animate="{ y: 0, opacity: 1 }"
                  :exit="{ y: -direction * 12, opacity: 0 }"
                  :transition="{ type: 'spring', bounce: 0.1, duration: 0.3 }"
                >
                  {{ displayText }}
                </motion.span>
              </AnimatePresence>
            </span>
          </UBadge>
        </motion.div>
      </AnimatePresence>
    </div>
  </UTooltip>
</template>
