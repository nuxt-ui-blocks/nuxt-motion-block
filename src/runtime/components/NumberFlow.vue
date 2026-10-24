<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'

export interface NumberFlowProps {
  /** Extra classes for one stepper button. */
  buttonClass?: string
  /** Extra classes for the outer wrapper. */
  class?: string
  /** Extra classes for the row of digit cells. */
  digitClass?: string
  /** Largest allowed value. */
  max?: number
  /** Smallest allowed value. */
  min?: number
  /** Controlled value. Leave it out to let the component keep its own. */
  modelValue?: number
}

const props = withDefaults(defineProps<NumberFlowProps>(), {
  buttonClass: undefined,
  class: undefined,
  digitClass: undefined,
  max: 999,
  min: 0,
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const TENS_PLACE = 10
const HUNDREDS_PLACE = 100
const PLACES = [HUNDREDS_PLACE, TENS_PLACE, 1] as const
const FLOW_DURATION = 0.3
const FLOW_EASE = [0.22, 1, 0.36, 1] as const

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const internalValue = ref(0)
const isControlled = computed(() => props.modelValue !== undefined)
const value = computed(() => (isControlled.value ? props.modelValue! : internalValue.value))

const direction = ref<1 | -1>(1)
const committedValue = ref(value.value)

watch(value, (next, previous) => {
  committedValue.value = next
  if (next !== previous) {
    direction.value = next > previous ? 1 : -1
  }
})

function digitAt(place: number) {
  return ((Math.floor(value.value / place) % TENS_PLACE) + TENS_PLACE) % TENS_PLACE
}

function setValue(next: number) {
  committedValue.value = next
  direction.value = next > value.value ? 1 : -1

  if (!isControlled.value) {
    internalValue.value = next
  }

  emit('update:modelValue', next)
}

function add() {
  if (committedValue.value < props.max) {
    setValue(committedValue.value + 1)
  }
}

function subtract() {
  if (committedValue.value > props.min) {
    setValue(committedValue.value - 1)
  }
}

const digitTransition = computed(() =>
  isReduced.value ? { duration: 0 } : { duration: FLOW_DURATION, ease: FLOW_EASE },
)

function digitInitial() {
  if (isReduced.value) {
    return { opacity: 1, y: '0%' }
  }

  return { opacity: 0, y: direction.value === 1 ? '100%' : '-100%' }
}

function digitExit() {
  if (isReduced.value) {
    return { opacity: 0, transition: { duration: 0 } }
  }

  return { opacity: 0, y: direction.value === 1 ? '-100%' : '100%' }
}
</script>

<template>
  <div :class="['flex flex-col items-center justify-center gap-8', props.class]">
    <div class="flex items-center gap-2 rounded-xl border border-default bg-default p-4">
      <output
        aria-label="Current value"
        class="sr-only"
      >{{ value }}</output>

      <div
        aria-hidden="true"
        :class="['flex items-center gap-1', props.digitClass]"
      >
        <div
          v-for="place in PLACES"
          :key="place"
          class="relative h-16 w-12 overflow-hidden rounded-lg border border-default bg-primary"
        >
          <AnimatePresence
            :initial="false"
            mode="popLayout"
          >
            <motion.span
              :key="digitAt(place)"
              :animate="{ opacity: 1, y: '0%' }"
              class="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-inverted tabular-nums"
              :exit="digitExit()"
              :initial="digitInitial()"
              :transition="digitTransition"
            >
              {{ digitAt(place) }}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div class="flex flex-col gap-1 self-stretch">
        <UButton
          aria-label="Increase number"
          :class="['h-auto min-h-0 flex-1 overflow-hidden', props.buttonClass]"
          color="neutral"
          :disabled="value >= props.max"
          icon="i-lucide-plus"
          size="xs"
          variant="outline"
          @click="add"
        />
        <UButton
          aria-label="Decrease number"
          :class="['h-auto min-h-0 flex-1 overflow-hidden', props.buttonClass]"
          color="neutral"
          :disabled="value <= props.min"
          icon="i-lucide-minus"
          size="xs"
          variant="outline"
          @click="subtract"
        />
      </div>
    </div>
  </div>
</template>
