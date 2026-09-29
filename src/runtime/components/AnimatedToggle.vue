<template>
  <div class="relative inline-flex items-center">
    <USwitch
      v-bind="$attrs"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <template #thumb>
        <motion.div
          class="w-4 h-4 rounded-full bg-white"
          :animate="{
            scale: modelValue ? [1, 1.2, 1] : 1,
            x: modelValue ? 16 : 0,
          }"
          :transition="{ type: 'spring', stiffness: 500, damping: 25 }"
        />
      </template>
    </USwitch>
  </div>
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
