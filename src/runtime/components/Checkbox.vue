<template>
  <label class="inline-flex items-center gap-2 cursor-pointer select-none">
    <input
      type="checkbox"
      class="sr-only"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    >
    <motion.div
      class="relative flex items-center justify-center w-5 h-5 rounded border-2"
      :class="[
        modelValue
          ? 'bg-primary border-primary'
          : 'border-default hover:border-muted',
      ]"
      :animate="{
        scale: modelValue ? [1, 1.15, 1] : 1,
      }"
      :transition="{ duration: 0.25, ease: 'easeOut' }"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        class="w-3.5 h-3.5"
      >
        <motion.path
          d="M4 12.5L9.5 18L20 6"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          :initial="{ pathLength: 0 }"
          :animate="{ pathLength: modelValue ? 1 : 0, opacity: modelValue ? 1 : 0 }"
          :transition="{ duration: drawDuration, ease: 'easeOut' }"
        />
      </svg>
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
