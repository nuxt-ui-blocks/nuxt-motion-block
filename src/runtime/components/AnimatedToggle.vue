<template>
  <motion.div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :animate="{ scale: modelValue ? [1, 1.2, 1] : 1 }"
    :transition="{ duration: 0.35 }"
  >
    <USwitch
      v-bind="$attrs"
      :model-value="modelValue"
      size="md"
      :ui="uiProps.ui"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </motion.div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedToggle from '../theme/animated-toggle'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: boolean
  class?: string
  ui?: Record<string, any>
}>(), {
  modelValue: false,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'animatedToggle', props, theme: animatedToggle })

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
