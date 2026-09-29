<template>
  <div
    :class="rootClasses"
    :data-expanded="isExpanded ? '' : undefined"
    :data-closed="!isExpanded ? '' : undefined"
  >
    <slot
      :value="value"
      :expanded="isExpanded"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { injectAccordion, provideAccordionItem } from './useAccordion'

interface AccordionItemProps {
  value: string | number
  class?: string
}

const props = defineProps<AccordionItemProps>()

const { expandedValue } = injectAccordion()

const isExpanded = computed(() => expandedValue.value === props.value)

provideAccordionItem({
  value: props.value,
  isExpanded,
})

const rootClasses = computed(() => {
  return ['overflow-hidden', props.class].filter(Boolean).join(' ')
})
</script>
