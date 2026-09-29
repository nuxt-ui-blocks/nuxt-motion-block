<template>
  <div :class="overflowClasses">
    <AnimatePresence :initial="false">
      <motion.div
        v-if="open"
        key="disclosure-content"
        initial="collapsed"
        animate="expanded"
        exit="collapsed"
        :variants="combinedVariants"
        role="region"
      >
        <slot />
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { injectDisclosure } from './useDisclosure'

interface DisclosureContentProps {
  class?: string
}

const props = defineProps<DisclosureContentProps>()

const { open, variants } = injectDisclosure()

const BASE_VARIANTS = {
  expanded: { height: 'auto', opacity: 1 },
  collapsed: { height: 0, opacity: 0 },
}

const combinedVariants = computed(() => ({
  expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
  collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
}))

const overflowClasses = computed(() => {
  return ['overflow-hidden', props.class].filter(Boolean).join(' ')
})
</script>
