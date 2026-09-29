<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useId } from 'vue'
import { motion } from 'motion-v'

const props = withDefaults(defineProps<{
  modelValue?: string
  defaultValue?: string
  disabled?: boolean
  icon?: string
  label: string
  placeholder?: string
  inputClassName?: string
  labelClassName?: string
}>(), {
  modelValue: undefined,
  defaultValue: '',
  disabled: false,
  icon: undefined,
  placeholder: '',
  inputClassName: '',
  labelClassName: '',
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

defineOptions({ inheritAttrs: false })

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
    class="relative flex items-center"
  >
    <span
      v-if="icon || $slots.icon"
      aria-hidden="true"
      class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-dimmed"
    >
      <UIcon
        v-if="icon"
        :name="icon"
        class="h-4 w-4"
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
      :class="[
        'peer w-full rounded-md border-0 appearance-none placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75 transition-colors px-2.5 py-1.5 text-base/5 md:text-sm gap-1.5 text-highlighted bg-default ring ring-inset ring-accented outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary',
        { 'pl-10': !!icon || !!$slots.icon },
        inputClassName,
      ]"
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
      :class="[
        'pointer-events-none absolute top-1/2 left-3 origin-left -translate-y-1/2 rounded-md border border-transparent bg-default px-1 transition-colors',
        labelClassName,
      ]"
    >
      {{ label }}
    </motion.label>
  </div>
</template>
