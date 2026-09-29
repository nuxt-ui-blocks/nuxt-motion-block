<template>
  <button
    type="button"
    :aria-expanded="String(isExpanded)"
    :data-expanded="isExpanded ? '' : undefined"
    :data-closed="!isExpanded ? '' : undefined"
    :class="rootClasses"
    @click="toggleItem(value)"
  >
    <slot :expanded="isExpanded" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { injectAccordion, injectAccordionItem } from './useAccordion'

interface AccordionTriggerProps {
  class?: string
}

const props = defineProps<AccordionTriggerProps>()

const { toggleItem } = injectAccordion()
const { value, isExpanded } = injectAccordionItem()

const rootClasses = computed(() => {
  return ['group', props.class].filter(Boolean).join(' ')
})
</script>
