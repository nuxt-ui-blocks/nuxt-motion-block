<template>
  <AnimatePresence :initial="false">
    <motion.div
      v-if="isExpanded"
      key="accordion-content"
      initial="collapsed"
      animate="expanded"
      exit="collapsed"
      :variants="combinedVariants"
      :class="rootClasses"
    >
      <slot />
    </motion.div>
  </AnimatePresence>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { injectAccordion, injectAccordionItem } from './useAccordion'

interface AccordionContentProps {
  class?: string
}

const props = defineProps<AccordionContentProps>()

const { variants } = injectAccordion()
const { isExpanded } = injectAccordionItem()

const BASE_VARIANTS = {
  expanded: { height: 'auto', opacity: 1 },
  collapsed: { height: 0, opacity: 0 },
}

const combinedVariants = computed(() => ({
  expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
  collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
}))

const rootClasses = computed(() => {
  return [props.class].filter(Boolean).join(' ')
})
</script>
