<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import durationPicker from '../theme/duration-picker'

type DurationUnit = 'hours' | 'minutes' | 'seconds'

interface Props {
  modelValue?: number
  units?: DurationUnit[]
  min?: number
  max?: number
  step?: number
  label?: string
  disabled?: boolean
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  min: 0,
  max: 359_999,
  step: 1,
  label: '',
  disabled: false,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'durationPicker',
  props,
  theme: durationPicker,
})

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const UNIT_DIVISOR: Record<DurationUnit, number> = { hours: 3600, minutes: 60, seconds: 1 }
const UNIT_ORDER: DurationUnit[] = ['hours', 'minutes', 'seconds']
const TYPE_TIMEOUT = 600
const DRAG_THRESHOLD = 4

const sortedUnits = computed<DurationUnit[]>(() =>
  UNIT_ORDER.filter(u => (props.units ?? ['hours', 'minutes', 'seconds']).includes(u)),
)

const values = computed(() => {
  let remaining = Math.max(0, Math.trunc(props.modelValue))
  return sortedUnits.value.map((unit) => {
    const v = Math.floor(remaining / UNIT_DIVISOR[unit])
    remaining -= v * UNIT_DIVISOR[unit]
    return v
  })
})

const pad2 = (n: number) => String(n).padStart(2, '0')

const segmentMax = (index: number): number => {
  if (index === 0) return Math.floor(props.max / UNIT_DIVISOR[sortedUnits.value[0]])
  const higher = UNIT_DIVISOR[sortedUnits.value[index - 1]]
  const current = UNIT_DIVISOR[sortedUnits.value[index]]
  return Math.floor(higher / current) - 1
}

const setTotal = (next: number) => {
  const clamped = Math.min(Math.max(Math.round(next), props.min), props.max)
  emit('update:modelValue', clamped)
}

const commitSegment = (index: number, raw: number) => {
  const divisor = UNIT_DIVISOR[sortedUnits.value[index]]
  const current = values.value[index]
  setTotal(props.modelValue + (raw - current) * divisor)
}

const segmentRefs = ref<(HTMLDivElement | null)[]>([])
const focusSegment = (i: number) => segmentRefs.value[i]?.focus()

// ── Drag scrub ──
let dragStartY = 0
let dragAccum = 0
let dragIndex = -1
let dragging = false

const onDragStart = (e: MouseEvent, index: number) => {
  if (props.disabled) return
  e.preventDefault()
  dragStartY = e.clientY
  dragAccum = 0
  dragIndex = index
  dragging = true
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
}

const onDragMove = (e: MouseEvent) => {
  if (!dragging || dragIndex < 0) return
  const delta = dragStartY - e.clientY
  dragAccum += delta
  dragStartY = e.clientY

  const divisor = UNIT_DIVISOR[sortedUnits.value[dragIndex]]
  while (dragAccum >= DRAG_THRESHOLD) {
    dragAccum -= DRAG_THRESHOLD
    setTotal(props.modelValue + props.step * divisor)
  }
  while (dragAccum <= -DRAG_THRESHOLD) {
    dragAccum += DRAG_THRESHOLD
    setTotal(props.modelValue - props.step * divisor)
  }
}

const onDragEnd = () => {
  dragging = false
  dragIndex = -1
  dragAccum = 0
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
})

// ── Touch scrub ──
const onTouchStart = (e: TouchEvent, index: number) => {
  if (props.disabled) return
  const touch = e.touches[0]
  dragStartY = touch.clientY
  dragAccum = 0
  dragIndex = index
  dragging = true
  document.addEventListener('touchmove', onTouchMove, { passive: false })
  document.addEventListener('touchend', onTouchEnd)
}

const onTouchMove = (e: TouchEvent) => {
  if (!dragging || dragIndex < 0) return
  e.preventDefault()
  const touch = e.touches[0]
  const delta = dragStartY - touch.clientY
  dragAccum += delta
  dragStartY = touch.clientY

  const divisor = UNIT_DIVISOR[sortedUnits.value[dragIndex]]
  while (dragAccum >= DRAG_THRESHOLD) {
    dragAccum -= DRAG_THRESHOLD
    setTotal(props.modelValue + props.step * divisor)
  }
  while (dragAccum <= -DRAG_THRESHOLD) {
    dragAccum += DRAG_THRESHOLD
    setTotal(props.modelValue - props.step * divisor)
  }
}

const onTouchEnd = () => {
  dragging = false
  dragIndex = -1
  dragAccum = 0
  document.removeEventListener('touchmove', onTouchMove)
  document.removeEventListener('touchend', onTouchEnd)
}

onUnmounted(() => {
  document.removeEventListener('touchmove', onTouchMove)
  document.removeEventListener('touchend', onTouchEnd)
})

// ── Keyboard ──
const typingState = ref<{ index: number, text: string } | null>(null)
let typingTimer: ReturnType<typeof setTimeout> | undefined

const commitTyped = (index: number, text: string) => {
  commitSegment(index, Number.parseInt(text, 10))
  typingState.value = null
  clearTimeout(typingTimer!)
}

const handleDigit = (index: number, digit: string) => {
  clearTimeout(typingTimer!)
  const cur = typingState.value
  const isLast = index === sortedUnits.value.length - 1

  if (cur?.index === index && cur.text.length === 1) {
    commitTyped(index, cur.text + digit)
    if (!isLast) focusSegment(index + 1)
    return
  }

  typingState.value = { index, text: digit }
  commitSegment(index, Number.parseInt(digit, 10))
  typingTimer = setTimeout(() => {
    if (typingState.value?.index === index) {
      commitTyped(index, digit)
      if (!isLast) focusSegment(index + 1)
    }
  }, TYPE_TIMEOUT)
}

const handleKeyDown = (e: KeyboardEvent, index: number) => {
  if (props.disabled) return
  const unit = sortedUnits.value[index]
  const divisor = UNIT_DIVISOR[unit]
  const mult = e.shiftKey ? 10 : 1

  if (/^\d$/.test(e.key)) {
    e.preventDefault()
    handleDigit(index, e.key)
    return
  }

  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault()
      setTotal(props.modelValue + props.step * mult * divisor)
      break
    case 'ArrowDown':
      e.preventDefault()
      setTotal(props.modelValue - props.step * mult * divisor)
      break
    case 'PageUp':
      e.preventDefault()
      setTotal(props.modelValue + props.step * 5 * divisor)
      break
    case 'PageDown':
      e.preventDefault()
      setTotal(props.modelValue - props.step * 5 * divisor)
      break
    case 'Home':
      e.preventDefault()
      commitSegment(index, 0)
      break
    case 'End':
      e.preventDefault()
      commitSegment(index, segmentMax(index))
      break
    case 'ArrowRight':
      e.preventDefault()
      focusSegment(index + 1)
      break
    case 'ArrowLeft':
      e.preventDefault()
      focusSegment(index - 1)
      break
  }
}

const handleBlur = (index: number) => {
  if (typingState.value?.index === index) {
    clearTimeout(typingTimer!)
    typingState.value = null
  }
}
</script>

<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <span
      v-if="label"
      :class="ui.label({ class: uiProps.ui?.label })"
    >{{ label }}</span>
    <div
      role="group"
      aria-label="Duration"
      :class="ui.group({ class: [disabled && 'opacity-50', uiProps.ui?.group] })"
    >
      <template
        v-for="(unit, index) in sortedUnits"
        :key="unit"
      >
        <span
          v-if="index > 0"
          aria-hidden="true"
          :class="ui.separator({ class: uiProps.ui?.separator })"
        >:</span>
        <div
          :ref="el => { segmentRefs[index] = el as HTMLDivElement }"
          role="spinbutton"
          :aria-label="unit"
          :aria-valuemin="0"
          :aria-valuemax="segmentMax(index)"
          :aria-valuenow="values[index]"
          :tabindex="disabled ? -1 : 0"
          :class="ui.segment({ class: [disabled && 'pointer-events-none', uiProps.ui?.segment] })"
          style="font-size: 18px; touch-action: none; user-select: none"
          @keydown="handleKeyDown($event, index)"
          @blur="handleBlur(index)"
          @mousedown="onDragStart($event, index)"
          @touchstart.passive="onTouchStart($event, index)"
        >
          <span
            v-for="(char, ci) in pad2(values[index]).split('')"
            :key="`${unit}-${ci}`"
            :class="ui.digit({ class: uiProps.ui?.digit })"
            :style="{ height: '24px', width: '0.62em' }"
          >
            <AnimatePresence :initial="false">
              <motion.span
                :key="`${unit}-${ci}-${char}`"
                :class="ui.digitChar({ class: uiProps.ui?.digitChar })"
                :initial="{ opacity: 0, y: -14 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: 14 }"
                :transition="{ type: 'spring', stiffness: 600, damping: 30, mass: 0.6 }"
              >
                {{ char }}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
