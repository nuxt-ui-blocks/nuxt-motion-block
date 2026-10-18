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
          :class="ui.root({ type: props.type, class: [uiProps.ui?.root, uiProps.class] })"
        >
          <div :class="ui.iconWrapper({ class: uiProps.ui?.iconWrapper })">
            <UIcon
              :name="typeIcons[props.type]"
              :class="ui.icon({ type: props.type, class: uiProps.ui?.icon })"
            />
            <span :class="ui.srLabel({ class: uiProps.ui?.srLabel })">{{ typeLabels[props.type] }}</span>
          </div>
          <p :class="ui.message({ class: uiProps.ui?.message })">
            {{ props.message }}
          </p>
          <button
            type="button"
            aria-label="Close notification"
            :class="ui.close({ class: uiProps.ui?.close })"
            @click="dismiss"
          >
            <UIcon
              name="i-lucide-x"
              :class="ui.closeIcon({ class: uiProps.ui?.closeIcon })"
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
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import basicToast from '../theme/basic-toast'

export interface Props {
  class?: string
  ui?: Record<string, any>
  duration?: number
  isVisible?: boolean
  message: string
  type?: ToastType
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  duration: 3000,
  isVisible: true,
  type: 'info',
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'basicToast', props, theme: basicToast })

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
