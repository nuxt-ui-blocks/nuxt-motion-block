<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'

export interface DigitRollProps {
  /** Extra classes for the outer wrapper. */
  class?: string
  /** Clamp a typed out-of-range value to `min`/`max` on blur instead of rejecting it. */
  clampOnBlur?: boolean
  /** Starting value when the component keeps its own state. */
  defaultValue?: number
  /** Disable the field, the steppers and the scrub gesture. */
  disabled?: boolean
  /** `Intl.NumberFormat` options used to render the value. */
  format?: Intl.NumberFormatOptions
  /** Visible label above the field. */
  label?: string
  /** Largest allowed value. */
  max?: number
  /** Smallest allowed value. */
  min?: number
  /** Controlled value. Leave it out to let the component keep its own. */
  modelValue?: number
  /** Number of decimal places the value is rounded to. */
  precision?: number
  /** Static text rendered before the value. */
  prefix?: string
  /** Drag horizontally to change the value. */
  scrub?: boolean
  /** Increment used by the arrows, the stepper buttons and scrubbing. */
  step?: number
  /** Render the minus and plus buttons. */
  stepper?: boolean
  /** Static text rendered after the value. */
  suffix?: string
}

const props = withDefaults(defineProps<DigitRollProps>(), {
  class: undefined,
  clampOnBlur: true,
  defaultValue: 0,
  disabled: false,
  format: undefined,
  label: undefined,
  max: Number.POSITIVE_INFINITY,
  min: Number.NEGATIVE_INFINITY,
  modelValue: undefined,
  precision: undefined,
  prefix: '',
  scrub: true,
  step: 1,
  stepper: false,
  suffix: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const LARGE_STEP_MULTIPLIER = 10
const SMALL_STEP_DIVISOR = 10
const SCRUB_THRESHOLD_PX = 4
const SCRUB_STEP_PX = 8
const ROLL_DISTANCE = 14
const SHAKE_DISTANCE = 6
const SHAKE_DURATION = 0.4
const DIGIT_SPRING = { bounce: 0.1, duration: 0.25, type: 'spring' as const }
const MOVEMENT_EASE = [0.645, 0.045, 0.355, 1] as const
const NON_NUMERIC_CHARS_REGEX = /[^\d.-]/g

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const inputId = `digit-roll-${useId().replace(/[^\w-]/g, '')}`

const internalValue = ref(props.defaultValue)
const isControlled = computed(() => props.modelValue !== undefined)
const value = computed(() => (isControlled.value ? props.modelValue! : internalValue.value))

const isEditing = ref(false)
const rawInputValue = ref('')
const direction = ref<1 | -1>(1)
const isInvalid = ref(false)
const isScrubbing = ref(false)

let shakeTimer: ReturnType<typeof setTimeout> | null = null

const formatter = computed(
  () =>
    new Intl.NumberFormat(undefined, {
      maximumFractionDigits: props.precision,
      minimumFractionDigits: props.precision,
      ...props.format,
    }),
)

const formattedText = computed(() => formatter.value.format(value.value))
const currentText = computed(() => (isEditing.value ? rawInputValue.value : formattedText.value))

const digitTransition = computed(() => (isReduced.value ? { duration: 0 } : DIGIT_SPRING))

const shakeAnimate = computed(() => {
  if (!isInvalid.value || isReduced.value) {
    return { x: 0 }
  }

  return {
    x: [0, -SHAKE_DISTANCE, SHAKE_DISTANCE, -SHAKE_DISTANCE / 2, 0],
  }
})

const shakeTransition = computed(() =>
  isInvalid.value
    ? { duration: SHAKE_DURATION, ease: MOVEMENT_EASE }
    : { duration: 0.2 },
)

watch(value, (next, previous) => {
  if (next === previous) {
    return
  }

  direction.value = next >= previous ? 1 : -1
})

watch(isInvalid, (invalid) => {
  if (!invalid) {
    return
  }

  if (isReduced.value) {
    isInvalid.value = false
    return
  }

  shakeTimer = setTimeout(() => {
    isInvalid.value = false
  }, SHAKE_DURATION * 1000)
})

function isDigitChar(char: string) {
  return /\d/.test(char)
}

function digitInitial(char: string) {
  if (isReduced.value) {
    return { opacity: 1, y: 0 }
  }

  return { opacity: 0, y: isDigitChar(char) ? direction.value * ROLL_DISTANCE : 0 }
}

function digitExit(char: string) {
  if (isReduced.value) {
    return { opacity: 0, transition: { duration: 0 } }
  }

  return { opacity: 0, y: isDigitChar(char) ? -direction.value * ROLL_DISTANCE : 0 }
}

function parseRawValue(text: string): number | null {
  let cleaned = text.trim()

  if (props.prefix && cleaned.startsWith(props.prefix)) {
    cleaned = cleaned.slice(props.prefix.length)
  }

  if (props.suffix && cleaned.endsWith(props.suffix)) {
    cleaned = cleaned.slice(0, cleaned.length - props.suffix.length)
  }

  cleaned = cleaned.replace(NON_NUMERIC_CHARS_REGEX, '')

  if (cleaned === '' || cleaned === '-') {
    return null
  }

  const parsed = Number(cleaned)
  return Number.isFinite(parsed) ? parsed : null
}

function clampValue(input: number) {
  return Math.min(props.max, Math.max(props.min, input))
}

function applyValue(next: number, options?: { clamp?: boolean }) {
  const shouldClamp = options?.clamp ?? true
  let nextValue = shouldClamp ? clampValue(next) : next

  if (props.precision !== undefined) {
    const factor = 10 ** props.precision
    nextValue = Math.round(nextValue * factor) / factor
  }

  direction.value = nextValue >= value.value ? 1 : -1

  if (!isControlled.value) {
    internalValue.value = nextValue
  }

  emit('update:modelValue', nextValue)
  isEditing.value = false
  isInvalid.value = false
}

function commitFromText() {
  if (!isEditing.value) {
    return
  }

  const parsed = parseRawValue(rawInputValue.value)

  if (parsed === null) {
    isInvalid.value = true
    isEditing.value = false
    rawInputValue.value = formattedText.value
    return
  }

  applyValue(parsed, { clamp: props.clampOnBlur })
}

function onFocus() {
  isEditing.value = true
  rawInputValue.value = formattedText.value
}

function onBlur() {
  commitFromText()
}

function onInput(event: Event) {
  isEditing.value = true
  rawInputValue.value = (event.target as HTMLInputElement).value
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) {
    return
  }

  const bigStep = props.step * LARGE_STEP_MULTIPLIER
  const smallStep = props.step / SMALL_STEP_DIVISOR

  let effectiveStep = props.step
  if (event.shiftKey) {
    effectiveStep = bigStep
  }
  else if (event.altKey) {
    effectiveStep = smallStep
  }

  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      applyValue(value.value + effectiveStep)
      break
    case 'ArrowDown':
      event.preventDefault()
      applyValue(value.value - effectiveStep)
      break
    case 'PageUp':
      event.preventDefault()
      applyValue(value.value + bigStep)
      break
    case 'PageDown':
      event.preventDefault()
      applyValue(value.value - bigStep)
      break
    case 'Home':
      if (Number.isFinite(props.min)) {
        event.preventDefault()
        applyValue(props.min)
      }
      break
    case 'End':
      if (Number.isFinite(props.max)) {
        event.preventDefault()
        applyValue(props.max)
      }
      break
    case 'Enter':
      event.preventDefault()
      commitFromText()
      break
    default:
      break
  }
}

let scrubState: { active: boolean, lastSteps: number, startValue: number, startX: number } | null = null

function onPointerDown(event: PointerEvent) {
  if (!props.scrub || props.disabled) {
    return
  }

  scrubState = {
    active: false,
    lastSteps: 0,
    startValue: value.value,
    startX: event.clientX,
  }
}

function onPointerMove(event: PointerEvent) {
  if (!props.scrub || !scrubState || props.disabled) {
    return
  }

  const deltaX = event.clientX - scrubState.startX

  if (!scrubState.active) {
    if (Math.abs(deltaX) < SCRUB_THRESHOLD_PX) {
      return
    }

    scrubState.active = true
    isScrubbing.value = true
    ;(event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId)
  }

  event.preventDefault()
  const steps = Math.trunc(deltaX / SCRUB_STEP_PX)

  if (steps === scrubState.lastSteps) {
    return
  }

  scrubState.lastSteps = steps
  applyValue(scrubState.startValue + steps * props.step)
}

function onPointerUp(event: PointerEvent) {
  if (scrubState?.active) {
    ;(event.currentTarget as HTMLElement | null)?.releasePointerCapture(event.pointerId)
    isScrubbing.value = false
  }

  scrubState = null
}

function stepBy(delta: number) {
  if (props.disabled) {
    return
  }

  applyValue(value.value + delta)
}

const rootClass = computed(() =>
  [
    'relative flex h-10 items-center overflow-hidden rounded-lg border bg-default transition-colors',
    isInvalid.value ? 'border-error' : 'border-default',
    'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-default',
    props.disabled && 'cursor-not-allowed opacity-50',
    props.scrub && !props.disabled && 'cursor-ew-resize',
  ],
)

onBeforeUnmount(() => {
  if (shakeTimer) {
    clearTimeout(shakeTimer)
  }
})
</script>

<template>
  <div :class="['inline-flex flex-col gap-1.5', props.class]">
    <label
      v-if="props.label"
      class="text-sm font-medium text-highlighted"
      :for="inputId"
    >
      {{ props.label }}
    </label>

    <motion.div
      :animate="shakeAnimate"
      :class="rootClass"
      :transition="shakeTransition"
    >
      <div
        aria-hidden="true"
        class="pointer-events-none flex flex-1 items-center px-3 text-sm font-medium text-highlighted select-none"
      >
        <span
          v-if="props.prefix"
          class="mr-0.5 inline-block"
        >{{ props.prefix }}</span>

        <span
          v-for="(char, index) in currentText"
          :key="index"
          class="relative inline-block h-[1.2em] w-[0.62em] overflow-hidden text-center align-bottom tabular-nums"
        >
          <AnimatePresence
            :initial="false"
            mode="popLayout"
          >
            <motion.span
              :key="char"
              :animate="{ opacity: 1, y: 0 }"
              class="absolute inset-0 flex items-center justify-center"
              :exit="digitExit(char)"
              :initial="digitInitial(char)"
              :transition="digitTransition"
            >
              {{ char }}
            </motion.span>
          </AnimatePresence>
        </span>

        <span
          v-if="props.suffix"
          class="ml-0.5 inline-block"
        >{{ props.suffix }}</span>
      </div>

      <input
        :id="inputId"
        :aria-invalid="isInvalid"
        :aria-label="props.label ?? 'Number input'"
        :aria-valuemax="Number.isFinite(props.max) ? props.max : undefined"
        :aria-valuemin="Number.isFinite(props.min) ? props.min : undefined"
        :aria-valuenow="value"
        :aria-valuetext="formattedText"
        class="absolute inset-0 h-full w-full bg-transparent px-3 text-transparent outline-none disabled:cursor-not-allowed"
        :disabled="props.disabled"
        inputmode="decimal"
        role="spinbutton"
        style="caret-color: var(--ui-text-highlighted)"
        type="text"
        :value="currentText"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @keydown="onKeydown"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
      >

      <div
        v-if="props.stepper"
        class="relative z-10 mr-1 flex items-center gap-0.5"
      >
        <UButton
          aria-label="Decrease value"
          color="neutral"
          :disabled="props.disabled || value <= props.min"
          icon="i-lucide-minus"
          size="xs"
          square
          variant="ghost"
          @click="stepBy(-props.step)"
        />
        <UButton
          aria-label="Increase value"
          color="neutral"
          :disabled="props.disabled || value >= props.max"
          icon="i-lucide-plus"
          size="xs"
          square
          variant="ghost"
          @click="stepBy(props.step)"
        />
      </div>
    </motion.div>
  </div>
</template>
