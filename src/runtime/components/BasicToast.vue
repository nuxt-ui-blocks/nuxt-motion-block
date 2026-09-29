<template>
  <ClientOnly>
    <Teleport to="body">
      <AnimatePresence>
        <motion.div
          v-if="visible"
          :initial="toastInitial"
          :animate="toastAnimate"
          :exit="toastExit"
          :transition="toastTransition"
          v-bind="$attrs"
          :class="[
            'm-toast fixed top-4 right-4 z-50 flex w-80 items-center gap-3 rounded-lg border p-4 shadow-lg',
            typeClasses[props.type],
            props.class,
          ]"
        >
          <div class="shrink-0">
            <UIcon
              :name="typeIcons[props.type]"
              :class="['h-5 w-5', typeIconColors[props.type]]"
            />
            <span class="sr-only">{{ typeLabels[props.type] }}</span>
          </div>
          <p class="flex-1 text-sm">
            {{ props.message }}
          </p>
          <button
            type="button"
            aria-label="Close notification"
            class="shrink-0 cursor-pointer rounded-full p-1 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            @click="dismiss"
          >
            <UIcon
              name="i-lucide-x"
              class="h-4 w-4"
            />
          </button>
        </motion.div>
      </AnimatePresence>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'

interface Props {
  class?: string
  duration?: number
  isVisible?: boolean
  message: string
  type?: ToastType
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  duration: 3000,
  isVisible: true,
  type: 'info',
})

// The root is <ClientOnly>, which swallows fallthrough attributes without a warning, so
// data-testid / aria-* / id on <BasicToast> would silently vanish. Opt out and spread them
// onto the teleported panel ourselves.
defineOptions({ inheritAttrs: false })

const emit = defineEmits<{
  'close': []
  'update:isVisible': [value: boolean]
}>()

const TOAST_SPRING = { type: 'spring' as const, duration: 0.25, bounce: 0.1 }
const INSTANT = { duration: 0 }
const EXIT = { duration: 0.15 }

const typeIcons = {
  error: 'i-lucide-circle-x',
  info: 'i-lucide-info',
  success: 'i-lucide-circle-check',
  warning: 'i-lucide-circle-alert',
} as const

const typeIconColors = {
  error: 'text-error',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
} as const

const typeClasses = {
  error: 'border-error/20 bg-error/10',
  info: 'border-info/20 bg-info/10',
  success: 'border-success/20 bg-success/10',
  warning: 'border-warning/20 bg-warning/10',
} as const

const typeLabels = {
  error: 'Error',
  info: 'Information',
  success: 'Success',
  warning: 'Warning',
} as const

const visible = ref(props.isVisible)

const shouldReduceMotion = useReducedMotion()

const toastInitial = computed(() =>
  shouldReduceMotion.value ? { opacity: 1 } : { opacity: 0, scale: 0.8, x: 50 },
)
const toastAnimate = computed(() =>
  shouldReduceMotion.value ? { opacity: 1 } : { opacity: 1, scale: 1, x: 0 },
)
const toastExit = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 0, transition: INSTANT }
    : { opacity: 0, scale: 0.8, x: 50, transition: EXIT },
)
const toastTransition = computed(() => (shouldReduceMotion.value ? INSTANT : TOAST_SPRING))

let timer: ReturnType<typeof setTimeout> | undefined

function clearTimer() {
  if (timer !== undefined) {
    clearTimeout(timer)
    timer = undefined
  }
}

function startTimer() {
  clearTimer()
  if (visible.value && props.duration > 0) {
    timer = setTimeout(() => {
      timer = undefined
      hide()
    }, props.duration)
  }
}

function hide() {
  if (!visible.value) {
    return
  }
  visible.value = false
  emit('close')
  emit('update:isVisible', false)
}

function dismiss() {
  clearTimer()
  hide()
}

watch(() => props.isVisible, (value) => {
  visible.value = value
})

watch([visible, () => props.duration], startTimer)

onMounted(startTimer)

onUnmounted(clearTimer)

defineExpose({ dismiss })
</script>

<script lang="ts">
export type ToastType = 'success' | 'error' | 'info' | 'warning'
</script>
