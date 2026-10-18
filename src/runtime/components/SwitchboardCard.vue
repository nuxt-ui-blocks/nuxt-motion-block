<template>
  <div
    v-bind="$attrs"
    :class="ui.wrapper({ class: uiProps.ui?.wrapper })"
    :style="{ perspective: '1000px' }"
  >
    <AnimatePresence mode="wait">
      <motion.div
        v-if="!flipped"
        key="front"
        :initial="{ rotateY: -90, opacity: 0 }"
        :animate="{ rotateY: 0, opacity: 1 }"
        :exit="{ rotateY: 90, opacity: 0 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 30, duration: flipDuration / 1000 }"
        :style="{ backfaceVisibility: 'hidden' }"
        :class="ui.front({ class: uiProps.ui?.front })"
      >
        <UCard
          :class="uiProps.class"
          :ui="{ ...uiProps.ui, root: ui.card({ class: [uiProps.ui?.root, uiProps.ui?.card] }) }"
        >
          <slot name="front" />
        </UCard>
      </motion.div>

      <motion.div
        v-else
        key="back"
        :initial="{ rotateY: -90, opacity: 0 }"
        :animate="{ rotateY: 0, opacity: 1 }"
        :exit="{ rotateY: 90, opacity: 0 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 30, duration: flipDuration / 1000 }"
        :style="{ backfaceVisibility: 'hidden' }"
        :class="ui.back({ class: uiProps.ui?.back })"
      >
        <UCard
          :class="uiProps.class"
          :ui="{ ...uiProps.ui, root: ui.card({ class: [uiProps.ui?.root, uiProps.ui?.card] }) }"
        >
          <slot name="back" />
        </UCard>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import switchboardCard from '../theme/switchboard-card'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: Record<string, any>
  flipped?: boolean
  flipDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  flipped: false,
  flipDuration: 600,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'switchboardCard', props, theme: switchboardCard })
</script>
