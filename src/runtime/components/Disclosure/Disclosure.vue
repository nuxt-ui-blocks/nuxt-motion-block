<template>
  <div :class="rootClasses">
    <slot
      :open="open"
      :toggle="toggle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { provideDisclosure } from './useDisclosure'

interface DisclosureProps {
  class?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  transition?: Record<string, any>
  variants?: { expanded: Record<string, any>, collapsed: Record<string, any> }
}

const props = withDefaults(defineProps<DisclosureProps>(), {
  class: undefined,
  open: undefined,
  defaultOpen: false,
  onOpenChange: undefined,
  transition: undefined,
  variants: undefined,
})

const internalOpen = ref(props.defaultOpen)

const open = computed(() => props.open ?? internalOpen.value)

const toggle = () => {
  const newOpen = !open.value
  if (props.onOpenChange) {
    props.onOpenChange(newOpen)
  }
  else {
    internalOpen.value = newOpen
  }
}

provideDisclosure({
  open,
  toggle,
  variants: props.variants,
})

const rootClasses = computed(() => {
  return [props.class].filter(Boolean).join(' ')
})
</script>
