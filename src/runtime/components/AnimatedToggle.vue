<template>
  <motion.div
    class="inline-flex"
    :animate="{ scale: modelValue ? [1, 1.2, 1] : 1 }"
    :transition="{ type: 'spring', stiffness: 500, damping: 25 }"
  >
    <USwitch
      v-bind="$attrs"
      :model-value="modelValue"
      size="md"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </motion.div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{
  modelValue?: boolean
}>(), {
  modelValue: false,
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
