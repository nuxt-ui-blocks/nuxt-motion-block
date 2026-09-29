<template>
  <div
    v-bind="$attrs"
    class="relative"
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
        class="w-full"
      >
        <UCard
          :class="props.class"
          :ui="props.ui"
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
        class="w-full"
      >
        <UCard
          :class="props.class"
          :ui="props.ui"
        >
          <slot name="back" />
        </UCard>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import type { UCardProps } from '#ui/types'
import { motion, AnimatePresence } from 'motion-v'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: UCardProps['ui']
  flipped?: boolean
  flipDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  flipped: false,
  flipDuration: 600,
})
</script>
