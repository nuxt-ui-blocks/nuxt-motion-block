<script setup lang="ts">
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { computed, ref, watch } from 'vue'
import type { PinInputProps } from '#ui/components/PinInput.vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { useResolvedColor } from '../composables/useThemeColor'
import animatedOTPInput from '../theme/animated-otp-input'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    length?: number
    modelValue?: string
    successColor?: string
    disabled?: boolean
    placeholder?: string
    name?: string
    required?: boolean
    autofocus?: boolean
    autofocusDelay?: number
    variant?: PinInputProps['variant']
    size?: PinInputProps['size']
    color?: PinInputProps['color']
    class?: string
    ui?: Record<string, any>
  }>(),
  {
    length: 6,
    modelValue: '',
    successColor: 'var(--ui-success)',
    disabled: false,
    placeholder: undefined,
    name: undefined,
    required: false,
    autofocus: false,
    autofocusDelay: 0,
    variant: 'outline',
    size: 'lg',
    color: 'primary',
    class: undefined,
    ui: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'complete': [value: string]
}>()

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'animatedOTPInput',
  props,
  theme: animatedOTPInput,
})

const reduce = useReducedMotion()

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const
const DURATION_STANDARD = 0.2
const DURATION_MEDIUM = 0.15
const STAGGER_DELAY = 0.05
const SCALE_FILLED = 1.05
const INITIAL_SCALE = 0.8
const INITIAL_Y = 10
const GAP = 6
const DASH_HALF = 4

const rootRef = ref<HTMLElement | null>(null)
const glowColor = ref('transparent')
const activeCell = ref(-1)

const resolvedSuccessColor = useResolvedColor(() => props.successColor)

const innerValue = ref<string[]>(Array.from({ length: props.length }, () => ''))

const chars = computed(() =>
  Array.from({ length: props.length }, (_, index) => innerValue.value[index] ?? ''),
)

const merged = computed(() => innerValue.value.join(''))

function sanitize(input: string[]): string[] {
  const cleaned = input.map(char => (typeof char === 'string' ? char.replace(/\D/g, '') : ''))
  const cells = Array.from({ length: props.length }, (_, index) => cleaned[index] ?? '')
  let end = props.length
  while (end > 0 && !cells[end - 1]) {
    end -= 1
  }
  return cells
}

watch(
  () => props.modelValue,
  (value) => {
    const next = sanitize((value ?? '').split(''))
    if (next.join('') !== innerValue.value.join('')) {
      innerValue.value = next
    }
  },
  { immediate: true },
)

function onUnderlayChange(value: unknown) {
  const source = Array.isArray(value) ? value.map(char => String(char)) : []
  innerValue.value = sanitize(source)
  emit('update:modelValue', merged.value)
}

watch(
  innerValue,
  (cells) => {
    if (cells.filter(char => char).length === props.length) {
      emit('complete', merged.value)
      glowColor.value = 'transparent'
      requestAnimationFrame(() => {
        glowColor.value = resolvedSuccessColor.value ?? props.successColor
      })
      window.setTimeout(() => {
        glowColor.value = 'transparent'
      }, 1500)
    }
  },
  { deep: true },
)

function onFocusIn() {
  const inputs = Array.from(rootRef.value?.querySelectorAll('input[aria-label^="pin input"]') ?? [])
  const index = inputs.indexOf(document.activeElement as Element)
  activeCell.value = index >= 0 ? index : -1
}

function onFocusOut(event: FocusEvent) {
  const inputs = Array.from(rootRef.value?.querySelectorAll('input[aria-label^="pin input"]') ?? [])
  if (!(event.relatedTarget as Element | null) || !inputs.includes(event.relatedTarget as Element)) {
    activeCell.value = -1
  }
}

const cellPx = computed(() => {
  switch (props.size) {
    case 'xs':
      return 24
    case 'sm':
      return 28
    case 'md':
      return 32
    case 'xl':
      return 40
    default:
      return 36
  }
})

const separators = computed(() => {
  const dashes: Array<{ left: number, key: string }> = []
  let end = Math.min(3, props.length)
  while (end < props.length) {
    dashes.push({
      left: end * (cellPx.value + GAP) - GAP / 2 - DASH_HALF,
      key: `sep-${end}`,
    })
    end += Math.min(3, props.length - end)
  }
  return dashes
})

const groups = computed(() => {
  const out: Array<Array<number>> = []
  for (let i = 0; i < props.length; i += 3) {
    out.push(Array.from({ length: Math.min(3, props.length - i) }, (_, k) => i + k))
  }
  return out
})
</script>

<template>
  <motion.div
    v-bind="$attrs"
    :animate="{ boxShadow: glowColor }"
    :initial="false"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
  >
    <div
      ref="rootRef"
      :class="ui.underlay({ class: uiProps.ui?.underlay })"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
    >
      <UPinInput
        :length="length"
        :model-value="innerValue"
        :disabled="disabled"
        :name="name"
        :required="required"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :autofocus-delay="autofocusDelay"
        :variant="variant"
        :size="size"
        :color="color"
        @update:model-value="onUnderlayChange"
      />
    </div>

    <div :class="ui.overlay({ class: uiProps.ui?.overlay })">
      <template
        v-for="group in groups"
        :key="`group-${group[0]}`"
      >
        <motion.div
          v-for="index in group"
          :key="index"
          :class="ui.cell({ class: [activeCell === index && !chars[index] ? 'border-primary ring-[3px] ring-primary/50' : '', uiProps.ui?.cell] })"
          :animate="reduce ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: chars[index] ? SCALE_FILLED : 1, y: 0 }"
          :initial="reduce ? { opacity: 1 } : { opacity: 0, scale: INITIAL_SCALE, y: INITIAL_Y }"
          :transition="reduce ? { duration: 0 } : { delay: index * STAGGER_DELAY, duration: DURATION_STANDARD, ease: EASE_OUT_QUINT, scale: { duration: DURATION_MEDIUM, ease: EASE_OUT_QUINT } }"
        >
          <span :class="ui.cellText({ class: uiProps.ui?.cellText })">
            <AnimatePresence mode="wait">
              <motion.span
                :key="chars[index] || 'empty'"
                :initial="reduce ? { opacity: 1, scale: 1 } : { opacity: 0, rotateY: -90, scale: 0.5 }"
                :animate="reduce ? { opacity: 1, scale: 1 } : { opacity: 1, rotateY: 0, scale: 1 }"
                :exit="reduce ? undefined : { opacity: 0, rotateY: 90, scale: 0.5 }"
                :transition="reduce ? { duration: 0 } : { duration: DURATION_STANDARD, ease: EASE_OUT_QUINT }"
                :class="ui.glyph({ class: uiProps.ui?.glyph })"
              >
                {{ chars[index] }}
              </motion.span>
            </AnimatePresence>
          </span>

          <AnimatePresence>
            <motion.span
              v-if="!reduce && activeCell === index && !chars[index]"
              :class="ui.caret({ class: uiProps.ui?.caret })"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :exit="{ opacity: 0 }"
              :transition="{ duration: 0.1 }"
            >
              <motion.span
                :class="ui.caretBar({ class: uiProps.ui?.caretBar })"
                :animate="{ opacity: [0, 1, 0] }"
                :transition="{ duration: 1, ease: [0.645, 0.045, 0.355, 1], repeat: Infinity }"
              />
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </template>
    </div>

    <template
      v-for="separator in separators"
      :key="separator.key"
    >
      <motion.span
        :class="ui.separator({ class: uiProps.ui?.separator })"
        :style="{ left: separator.left + 'px', top: 'calc(50% - 0.5px)', width: '8px' }"
        :animate="reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }"
        :initial="reduce ? { opacity: 1 } : { opacity: 0, scale: INITIAL_SCALE }"
        :transition="reduce ? { duration: 0 } : { delay: 0.15, duration: 0.3, ease: EASE_OUT_QUINT }"
      >
        <span :class="ui.separatorLine({ class: uiProps.ui?.separatorLine })" />
      </motion.span>
    </template>
  </motion.div>
</template>

<style scoped>
.an-otp :deep(input) {
  color: transparent !important;
  caret-color: transparent;
  background: transparent;
  box-shadow: none;
  outline: none;
}

.an-otp :deep([data-slot="base"]) {
  background: transparent;
  box-shadow: none;
}
</style>
