<template>
  <SwitchRoot
    v-bind="$attrs"
    :model-value="modelValue"
    class="inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent transition-[background] duration-200 ease-out data-[state=checked]:bg-primary data-[state=unchecked]:bg-accented"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="flex items-center">
      <SwitchThumb class="flex size-4 items-center justify-center rounded-full">
        <motion.div
          class="size-4 rounded-full bg-white shadow-lg"
          :animate="{
            scale: modelValue ? [1, 1.2, 1] : 1,
            x: modelValue ? 16 : 0,
          }"
          :transition="{ type: 'spring', stiffness: 500, damping: 25 }"
        />
      </SwitchThumb>
    </div>
  </SwitchRoot>
</template>

<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'
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
