<template>
  <label :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <motion.div
      :class="ui.checkbox({ class: uiProps.ui?.checkbox })"
      :animate="{ scale: modelValue ? [1, 1.15, 1] : 1 }"
      :transition="{ duration: 0.25 }"
    >
      <UCheckbox
        :model-value="modelValue"
        size="xl"
        @update:model-value="$emit('update:modelValue', $event === true)"
      />
      <svg
        class="pointer-events-none absolute inset-0 m-auto size-3.5 text-inverted"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <AnimatePresence>
          <motion.path
            v-if="modelValue"
            d="M20 6 9 17l-5-5"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            :initial="{ pathLength: 0 }"
            :animate="{ pathLength: 1 }"
            :exit="{ pathLength: 0 }"
            :transition="{ duration: drawDuration }"
          />
        </AnimatePresence>
      </svg>
    </motion.div>
    <span
      v-if="label"
      :class="ui.label({ class: uiProps.ui?.label })"
    >{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
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
