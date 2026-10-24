<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { motion, useReducedMotion } from 'motion-v'

export interface FloatInputProps {
  /** Extra classes for the wrapper. */
  class?: string
  /** Starting value when the component keeps its own state. */
  defaultValue?: string
  /** Disable the field. */
  disabled?: boolean
  /** Icon name shown at the start of the field. */
  icon?: string
  /** Extra classes for the input itself. */
  inputClass?: string
  /** Visible label, also used as the accessible name. */
  label: string
  /** Extra classes for the floating label. */
  labelClass?: string
  /** Controlled value. Leave it out to let the component keep its own. */
  modelValue?: string
  /** Placeholder shown once the label has floated away. */
  placeholder?: string
}

const props = withDefaults(defineProps<FloatInputProps>(), {
  class: undefined,
  defaultValue: '',
  disabled: false,
  icon: undefined,
  inputClass: undefined,
  labelClass: undefined,
  modelValue: undefined,
  placeholder: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const LABEL_TRANSITION = { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const }

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const inputId = `float-input-${useId().replace(/[^\w-]/g, '')}`

const internalValue = ref(props.defaultValue)
const isControlled = computed(() => props.modelValue !== undefined)
const value = computed(() => (isControlled.value ? props.modelValue! : internalValue.value))

const isFocused = ref(false)
const isFloating = computed(() => value.value.length > 0 || isFocused.value)

const labelAnimate = computed(() => (isFloating.value ? { scale: 0.85, y: -34 } : { scale: 1, y: -10 }))

const labelTransition = computed(() => (isReduced.value ? { duration: 0 } : LABEL_TRANSITION))

function onInput(event: Event) {
  const next = (event.target as HTMLInputElement).value

  if (!isControlled.value) {
    internalValue.value = next
  }

  emit('update:modelValue', next)
}
</script>

<template>
  <div :class="['relative flex items-center', props.class]">
    <span
      v-if="props.icon || $slots.icon"
      aria-hidden="true"
      class="absolute top-1/2 left-3 -translate-y-1/2 text-muted"
    >
      <slot name="icon">
        <UIcon
          :name="props.icon"
          class="size-4"
        />
      </slot>
    </span>

    <input
      :id="inputId"
      :aria-label="props.label"
      :class="[
        'w-full rounded-sm border border-default bg-default px-3 py-2 text-sm text-highlighted outline-none transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default disabled:cursor-not-allowed disabled:opacity-50',
        props.icon ? 'pl-10' : '',
        props.inputClass,
      ]"
      :disabled="props.disabled"
      :placeholder="isFloating ? props.placeholder : ''"
      type="text"
      :value="value"
      @blur="isFocused = false"
      @focus="isFocused = true"
      @input="onInput"
    >

    <motion.label
      :animate="labelAnimate"
      :class="[
        'pointer-events-none absolute left-3 origin-left rounded-sm border border-transparent bg-default px-1 text-sm transition-colors duration-200 motion-reduce:transition-none',
        isFloating ? 'text-primary' : 'text-muted',
        props.labelClass,
      ]"
      :for="inputId"
      :initial="false"
      :transition="labelTransition"
      style="top: 50%; z-index: 2"
    >
      {{ props.label }}
    </motion.label>
  </div>
</template>
