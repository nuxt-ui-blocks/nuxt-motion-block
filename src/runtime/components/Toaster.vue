<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        v-bind="$attrs"
        :class="ui.viewport({ position: props.position, class: uiProps.class })"
        role="region"
        :aria-label="props.label"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
      >
        <AnimatePresence>
          <motion.div
            v-for="toast in items"
            :key="toast.id"
            :initial="toastInitial"
            :animate="toastAnimate"
            :exit="toastExit"
            :transition="toastTransition"
            :class="ui.root({ color: toast.color, class: uiProps.ui?.root })"
            :role="toast.color === 'error' ? 'alert' : 'status'"
            :aria-live="toast.color === 'error' ? 'assertive' : 'polite'"
          >
            <UIcon
              v-if="resolveIcon(toast)"
              :name="resolveIcon(toast)"
              :class="ui.icon({ color: toast.color, class: uiProps.ui?.icon })"
            />
            <div :class="ui.wrapper({ class: uiProps.ui?.wrapper })">
              <p
                v-if="toast.title"
                :class="ui.title({ class: uiProps.ui?.title })"
              >
                <component
                  :is="toast.title"
                  v-if="typeof toast.title !== 'string'"
                />
                <template v-else>
                  {{ toast.title }}
                </template>
              </p>
              <p
                v-if="toast.description"
                :class="ui.description({ class: uiProps.ui?.description })"
              >
                <component
                  :is="toast.description"
                  v-if="typeof toast.description !== 'string'"
                />
                <template v-else>
                  {{ toast.description }}
                </template>
              </p>
            </div>
            <button
              v-if="props.close !== false && toast.close !== false"
              type="button"
              aria-label="Dismiss notification"
              :class="ui.close({ class: uiProps.ui?.close })"
              @click="remove(toast.id)"
            >
              <UIcon
                name="i-lucide-x"
                :class="ui.closeIcon({ class: uiProps.ui?.closeIcon })"
              />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { useToast } from '#imports'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import toaster from '../theme/toaster'

export interface Props {
  class?: string
  ui?: Record<string, any>
  close?: boolean
  duration?: number
  label?: string
  position?: ToastPosition
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  close: true,
  duration: 5000,
  label: 'Notifications',
  position: 'top-right',
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'toaster', props, theme: toaster })

// The root is <ClientOnly>, which swallows fallthrough attributes without a warning, so
// data-testid / aria-* / id on <Toaster> would silently vanish. Opt out and spread them
// onto the teleported viewport ourselves.
defineOptions({ inheritAttrs: false })

const { toasts, remove } = useToast()

const items = computed(() => (toasts.value as ToastItem[]).filter(toast => toast.open !== false))

const iconMap: Record<string, string> = {
  error: 'i-lucide-circle-x',
  info: 'i-lucide-info',
  neutral: 'i-lucide-bell',
  primary: 'i-lucide-bell',
  success: 'i-lucide-circle-check',
  warning: 'i-lucide-circle-alert',
}

function resolveIcon(toast: ToastItem) {
  return toast.icon || iconMap[toast.color ?? 'neutral'] || 'i-lucide-bell'
}

const shouldReduceMotion = useReducedMotion()

const slideX = computed(() => (shouldReduceMotion.value ? 0 : props.position.endsWith('left') ? -50 : 50))

const toastInitial = computed(() => ({
  opacity: 0,
  scale: shouldReduceMotion.value ? 1 : 0.9,
  x: slideX.value,
}))
const toastAnimate = computed(() =>
  shouldReduceMotion.value ? { opacity: 1 } : { opacity: 1, scale: 1, x: 0 },
)
const toastExit = computed(() =>
  shouldReduceMotion.value
    ? { opacity: 0, transition: { duration: 0 } }
    : { opacity: 0, scale: 0.8, x: slideX.value, transition: { duration: 0.15 } },
)
const toastTransition = computed(() =>
  shouldReduceMotion.value ? { duration: 0 } : { type: 'spring' as const, duration: 0.25, bounce: 0.1 },
)

const paused = ref(false)
const timers = new Map<string, ReturnType<typeof setTimeout>>()
// Absolute time each live toast should dismiss, so a pause can work out how
// much of the duration is left instead of restarting the whole timer.
const deadlines = new Map<string, number>()
// Time left on a toast while it is paused; consumed on resume.
const remaining = new Map<string, number>()

function clearTimer(id: string) {
  const timer = timers.get(id)
  if (timer !== undefined) {
    clearTimeout(timer)
    timers.delete(id)
  }
  deadlines.delete(id)
  remaining.delete(id)
}

function clearTimers() {
  for (const timer of timers.values()) {
    clearTimeout(timer)
  }
  timers.clear()
  deadlines.clear()
  remaining.clear()
}

function schedule(toast: ToastItem, override?: number) {
  if (timers.has(toast.id)) {
    return
  }
  const duration = override ?? toast.duration ?? props.duration
  if (!(duration > 0)) {
    // A zero-duration toast is sticky, but one whose remaining time ran out
    // while paused should dismiss as soon as the pointer leaves.
    if (override !== undefined) {
      remove(toast.id)
    }
    return
  }
  deadlines.set(toast.id, Date.now() + duration)
  timers.set(toast.id, setTimeout(() => {
    timers.delete(toast.id)
    deadlines.delete(toast.id)
    remove(toast.id)
  }, duration))
}

function pauseTimers() {
  const now = Date.now()
  for (const [id, timer] of timers) {
    clearTimeout(timer)
    remaining.set(id, Math.max(0, (deadlines.get(id) ?? now) - now))
  }
  timers.clear()
  deadlines.clear()
}

function reconcile() {
  const live = new Set(items.value.map(toast => toast.id))
  for (const id of [...timers.keys()]) {
    if (!live.has(id)) {
      clearTimer(id)
    }
  }
  for (const id of [...remaining.keys()]) {
    if (!live.has(id)) {
      remaining.delete(id)
    }
  }
  if (paused.value) {
    return
  }
  for (const toast of items.value) {
    if (timers.has(toast.id)) {
      continue
    }
    const left = remaining.get(toast.id)
    if (left === undefined) {
      schedule(toast)
      continue
    }
    remaining.delete(toast.id)
    schedule(toast, left)
  }
}

if (import.meta.client) {
  watch(items, reconcile, { deep: true, immediate: true })
  watch(paused, value => value ? pauseTimers() : reconcile())
}

onBeforeUnmount(clearTimers)

defineExpose({ clear: clearTimers })
</script>

<script lang="ts">
export type ToastPosition
  = | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'

interface ToastItem {
  id: string
  open?: boolean
  title?: string | (() => unknown)
  description?: string | (() => unknown)
  icon?: string
  color?: string
  duration?: number
  close?: boolean
}
</script>
