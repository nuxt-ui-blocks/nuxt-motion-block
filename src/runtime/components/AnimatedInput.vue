<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useId } from 'vue'
import { motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedInput from '../theme/animated-input'

const props = withDefaults(defineProps<{
  modelValue?: string
  defaultValue?: string
  disabled?: boolean
  icon?: string
  label: string
  placeholder?: string
  class?: string
  ui?: Record<string, any>
  inputClassName?: string
  labelClassName?: string
}>(), {
  modelValue: undefined,
  defaultValue: '',
  disabled: false,
  icon: undefined,
  placeholder: '',
  class: undefined,
  ui: undefined,
  inputClassName: '',
  labelClassName: '',
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

defineOptions({ inheritAttrs: false })

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'animatedInput',
  props,
  theme: animatedInput,
})

const internalValue = ref(props.defaultValue)
const isControlled = computed(() => props.modelValue !== undefined)
const val = computed(() => (isControlled.value ? props.modelValue : internalValue.value))

const isFocused = ref(false)
const isFloating = computed(() => !!val.value || isFocused.value)

const shouldReduceMotion = ref(false)
let motionQuery: MediaQueryList | undefined

const uid = useId()
const inputId = `animated-input-${uid.replace(/:/g, '')}`

const labelAnimation = computed(() => {
  if (shouldReduceMotion.value) return {}
  if (isFloating.value) {
    return { borderColor: 'var(--ui-primary)', color: 'var(--ui-primary)', scale: 0.85, y: -24 }
  }
  return { color: 'var(--ui-text-dimmed)', scale: 1, y: 0 }
})

const labelStaticStyle = computed(() => {
  if (isFloating.value) {
    return { borderColor: 'var(--ui-primary)', color: 'var(--ui-primary)', transform: 'translateY(-24px) scale(0.85)' }
  }
  return { color: 'var(--ui-text-dimmed)', transform: 'translateY(0) scale(1)' }
})

const labelStyle = computed(() => (
  shouldReduceMotion.value
    ? { zIndex: 2, ...labelStaticStyle.value }
    : { zIndex: 2 }
))

const labelTransition = computed(() => (
  shouldReduceMotion.value
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.4, 0, 0.2, 1] }
))

function onMotionChange() {
  shouldReduceMotion.value = motionQuery?.matches ?? false
}

function onFocus() {
  isFocused.value = true
}

function onBlur() {
  isFocused.value = false
}

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  if (!isControlled.value) internalValue.value = value
  emit('update:modelValue', value)
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  shouldReduceMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', onMotionChange)
})

onUnmounted(() => {
  motionQuery?.removeEventListener('change', onMotionChange)
})
</script>

<template>
  <div
    v-bind="$attrs"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <span
      v-if="icon || $slots.icon"
      aria-hidden="true"
      :class="ui.icon({ class: uiProps.ui?.icon })"
    >
      <UIcon
        v-if="icon"
        :name="icon"
        :class="ui.iconGlyph({ class: uiProps.ui?.iconGlyph })"
      />
      <slot
        v-else
        name="icon"
      />
    </span>

    <input
      :id="inputId"
      :aria-label="label"
      type="text"
      :class="ui.input({ class: [{ 'pl-10': !!icon || !!$slots.icon }, inputClassName, uiProps.ui?.input] })"
      :placeholder="isFloating ? placeholder : ''"
      :disabled="disabled"
      :value="val"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    >

    <motion.label
      :for="inputId"
      aria-hidden="true"
      :initial="false"
      :animate="labelAnimation"
      :style="labelStyle"
      :transition="labelTransition"
      :class="ui.label({ class: [labelClassName, uiProps.ui?.label] })"
    >
      {{ label }}
    </motion.label>
  </div>
</template>
