<template>
  <label :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <motion.div
      :class="ui.checkbox({ class: uiProps.ui?.checkbox })"
      :animate="{ scale: modelValue ? [1, 1.15, 1] : 1 }"
      :transition="{ duration: drawDuration, ease: 'easeOut' }"
    >
      <UCheckbox
        :model-value="modelValue"
        size="xl"
        @update:model-value="$emit('update:modelValue', $event === true)"
      />
    </motion.div>
    <span
      v-if="label"
      :class="ui.label({ class: uiProps.ui?.label })"
    >{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import checkbox from '../theme/checkbox'

interface Props {
  modelValue?: boolean
  label?: string
  drawDuration?: number
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
  drawDuration: 0.3,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'checkbox', props, theme: checkbox })

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
