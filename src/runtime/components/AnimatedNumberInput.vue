<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useId, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedNumberInput from '../theme/animated-number-input'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  defaultValue?: number
  disabled?: boolean
  formatOptions?: Intl.NumberFormatOptions
  id?: string
  increment?: boolean | object
  decrement?: boolean | object
  label?: string
  max?: number
  min?: number
  name?: string
  placeholder?: string
  required?: boolean
  step?: number
  modelValue?: number
  class?: string
  ui?: Record<string, any>
}>(), {
  defaultValue: 0,
  disabled: false,
  formatOptions: undefined,
  id: undefined,
  increment: true,
  decrement: true,
  label: '',
  max: Number.POSITIVE_INFINITY,
  min: Number.NEGATIVE_INFINITY,
  name: undefined,
  placeholder: undefined,
  required: false,
  step: 1,
  modelValue: undefined,
  class: undefined,
  ui: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'blur': [event: FocusEvent]
  'change': [event: Event]
}>()

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'animatedNumberInput',
  props,
  theme: animatedNumberInput,
})

const ROLL_DISTANCE = 14
const DIGIT_SPRING = { bounce: 0.1, type: 'spring', duration: 0.25 } as const

const reducedMotion = useReducedMotion()
const uid = useId()
const inputId = props.id || `animated-number-input-${uid.replace(/:/g, '')}`

const finiteMin = Number.isFinite(props.min) ? props.min : undefined
const finiteMax = Number.isFinite(props.max) ? props.max : undefined

const fieldRef = ref<HTMLElement>()
const isControlled = computed(() => props.modelValue !== undefined)
const internalValue = ref(props.defaultValue)
const currentValue = computed(() => (isControlled.value ? props.modelValue : internalValue.value))

const formatter = computed(() => new Intl.NumberFormat(undefined, { ...(props.formatOptions || {}) }))
const displayText = computed(() => {
  const v = currentValue.value
  if (v === undefined || v === null || Number.isNaN(v)) return '0'
  return formatter.value.format(v)
})

const isEditing = ref(false)
const rawInput = ref('')

const pressPointerId = ref<number | null>(null)
let pressFirstUpdate = true

function onStepperPointerDown(e: PointerEvent) {
  const el = e.target as HTMLElement
  if (el.closest('[data-slot="increment"], [data-slot="decrement"]')) {
    pressPointerId.value = e.pointerId
    pressFirstUpdate = true
  }
}

function onPressEnd(e: PointerEvent) {
  if (pressPointerId.value !== null && pressPointerId.value === e.pointerId) {
    pressPointerId.value = null
    pressFirstUpdate = true
  }
}

function readInputValue() {
  const input = fieldRef.value?.querySelector('input')
  return input ? (input as HTMLInputElement).value : ''
}

function onInputCapture(e: Event) {
  rawInput.value = (e.target as HTMLInputElement).value
}

function onFieldFocusIn(e: FocusEvent) {
  const target = e.target as HTMLElement
  if (target && typeof target.matches === 'function' && target.matches('input')) {
    isEditing.value = true
    rawInput.value = readInputValue()
  }
}

function onFieldFocusOut(e: FocusEvent) {
  const target = e.target as HTMLElement
  if (target && typeof target.matches === 'function' && target.matches('input')) isEditing.value = false
}

const overlayText = computed(() => (isEditing.value ? rawInput.value : displayText.value))

const direction = ref(1)
watch(currentValue, (v, prev) => {
  if (prev === undefined || v === undefined) return
  direction.value = v >= prev ? 1 : -1
})

const digitTransition = computed(() => (reducedMotion.value ? { duration: 0 } : DIGIT_SPRING))

function digitInitial(char: string) {
  if (reducedMotion.value) return { opacity: 1, y: 0 }
  const rolling = /\d/.test(char)
  return { opacity: 0, y: rolling ? direction.value * ROLL_DISTANCE : 0 }
}

function digitExit(char: string) {
  if (reducedMotion.value) return { opacity: 0, transition: { duration: 0 } }
  const rolling = /\d/.test(char)
  return { opacity: 0, y: rolling ? -direction.value * ROLL_DISTANCE : 0 }
}

const overlayAlign = computed(() => {
  if (props.decrement === false) {
    return `justify-start pl-2.5 ${props.increment ? 'pr-9' : 'pr-2.5'}`
  }
  return 'justify-center'
})

function onUpdate(value: number) {
  if (pressPointerId.value !== null) {
    if (!pressFirstUpdate) return
    pressFirstUpdate = false
  }
  internalValue.value = value
  emit('update:modelValue', value)
  isEditing.value = false
}

onMounted(() => {
  fieldRef.value?.addEventListener('input', onInputCapture, true)
  fieldRef.value?.addEventListener('pointerdown', onStepperPointerDown, true)
  window.addEventListener('pointerup', onPressEnd)
  window.addEventListener('pointercancel', onPressEnd)
})

onUnmounted(() => {
  fieldRef.value?.removeEventListener('input', onInputCapture, true)
  fieldRef.value?.removeEventListener('pointerdown', onStepperPointerDown, true)
  window.removeEventListener('pointerup', onPressEnd)
  window.removeEventListener('pointercancel', onPressEnd)
})
</script>

<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <label
      v-if="label"
      :for="inputId"
      :class="ui.label({ class: uiProps.ui?.label })"
    >{{ label }}</label>

    <div
      ref="fieldRef"
      :class="ui.field({ class: uiProps.ui?.field })"
      @focusin="onFieldFocusIn"
      @focusout="onFieldFocusOut"
    >
      <UInputNumber
        v-bind="$attrs"
        :id="inputId"
        :model-value="modelValue"
        :default-value="defaultValue"
        :min="finiteMin"
        :max="finiteMax"
        :step="step"
        :format-options="formatOptions"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :name="name"
        :increment="increment"
        :decrement="decrement"
        :class="ui.input({ class: uiProps.ui?.input })"
        @update:model-value="onUpdate"
        @blur="emit('blur', $event)"
        @change="emit('change', $event)"
      />

      <div
        aria-hidden
        :class="ui.overlay({ class: [overlayAlign, uiProps.ui?.overlay] })"
      >
        <span
          v-for="(char, index) in overlayText"
          :key="index"
          :class="ui.digit({ class: uiProps.ui?.digit })"
        >
          <AnimatePresence
            :initial="false"
            mode="popLayout"
          >
            <motion.span
              :key="char"
              :class="ui.char({ class: uiProps.ui?.char })"
              :initial="digitInitial(char)"
              :animate="{ opacity: 1, y: 0 }"
              :exit="digitExit(char)"
              :transition="digitTransition"
            >{{ char }}</motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animated-number-input-hide :deep(input) {
  color: transparent !important;
  caret-color: var(--ui-text-highlighted);
}
</style>
