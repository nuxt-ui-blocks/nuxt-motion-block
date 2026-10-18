<template>
  <motion.button
    type="button"
    :layout-id="`dialog-${uniqueId}`"
    :class="triggerClasses"
    aria-haspopup="dialog"
    :aria-expanded="isOpen"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <slot :is-open="isOpen" />
  </motion.button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { motion } from 'motion-v'
import { injectMorphingDialog } from './useMorphingDialog'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const { isOpen, setIsOpen, uniqueId } = injectMorphingDialog()

const handleClick = () => {
  setIsOpen(!isOpen.value)
}

const triggerClasses = computed(() => {
  return [
    'relative cursor-pointer',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50',
    props.class,
  ].filter(Boolean).join(' ')
})
</script>
