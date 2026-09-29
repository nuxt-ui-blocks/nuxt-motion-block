<template>
  <div
    :class="rootClasses"
    aria-orientation="vertical"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { provideAccordion } from './useAccordion'

interface AccordionProps {
  class?: string
  expandedValue?: string | number | null
  onValueChange?: (value: string | number | null) => void
  transition?: Record<string, any>
  variants?: { expanded: Record<string, any>, collapsed: Record<string, any> }
}

const props = withDefaults(defineProps<AccordionProps>(), {
  class: undefined,
  expandedValue: undefined,
  onValueChange: undefined,
  transition: undefined,
  variants: undefined,
})

const internalExpandedValue = ref<string | number | null>(null)

const expandedValue = computed(() => {
  return props.expandedValue !== undefined ? props.expandedValue : internalExpandedValue.value
})

const toggleItem = (value: string | number) => {
  const newValue = expandedValue.value === value ? null : value
  if (props.onValueChange) {
    props.onValueChange(newValue)
  }
  else {
    internalExpandedValue.value = newValue
  }
}

provideAccordion({
  expandedValue,
  toggleItem,
  variants: props.variants,
})

const rootClasses = computed(() => {
  return ['relative', props.class].filter(Boolean).join(' ')
})
</script>
