<template>
  <label class="inline-flex cursor-pointer select-none items-center gap-2">
    <motion.div
      class="inline-flex"
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
      class="text-sm"
    >{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

interface Props {
  modelValue?: boolean
  label?: string
  drawDuration?: number
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
  drawDuration: 0.3,
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
