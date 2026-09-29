<script setup lang="ts">
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { onMounted } from 'vue'

defineOptions({ inheritAttrs: false })

interface StepItem {
  label?: string
  title?: string
  description?: string
  icon?: string
  disabled?: boolean
  content?: string
}

interface Props {
  modelValue?: number
  defaultValue?: number
  items: StepItem[]
  ui?: Record<string, any>
}
const props = withDefaults(defineProps<Props>(), { modelValue: 0 })

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

const SPRING = { damping: 25, stiffness: 300, type: 'spring' as const }
const REDUCED_TRANSITION = { duration: 0 }

const direction = ref(1)
const reduce = useReducedMotion()
const isMounted = ref(false)
const shouldReduce = computed(() => isMounted.value && Boolean(unref(reduce)))

const stepperItems = computed(() =>
  props.items.map(item => ({ ...item, title: item.title ?? item.label })),
)

const currentIndex = computed(() => {
  const value = Number(props.modelValue ?? props.defaultValue ?? 0)
  const last = Math.max(props.items.length - 1, 0)
  return Number.isFinite(value) ? Math.min(Math.max(Math.trunc(value), 0), last) : 0
})

function handleUpdate(value: number) {
  emit('update:modelValue', value)
}

watch(
  () => props.modelValue,
  (value, previous) => {
    direction.value = value > (previous ?? 0) ? 1 : -1
  },
  { flush: 'sync' },
)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <div>
    <!-- @ts-ignore -->
    <UStepper
      :items="stepperItems"
      :model-value="props.modelValue"
      :default-value="props.defaultValue"
      :ui="props.ui"
      v-bind="$attrs"
      @update:model-value="(v: number) => handleUpdate(v)"
    >
      <template #content="{ item }">
        <AnimatePresence mode="wait">
          <motion.div
            :key="currentIndex"
            :initial="shouldReduce ? { opacity: 1 } : { x: direction * 20, opacity: 0 }"
            :animate="shouldReduce ? { opacity: 1 } : { x: 0, opacity: 1 }"
            :exit="shouldReduce ? { opacity: 0 } : { x: direction * -20, opacity: 0 }"
            :transition="shouldReduce ? REDUCED_TRANSITION : SPRING"
          >
            <slot :name="`step-${currentIndex}`">
              {{ item.content }}
            </slot>
          </motion.div>
        </AnimatePresence>
      </template>
    </UStepper>
  </div>
</template>
