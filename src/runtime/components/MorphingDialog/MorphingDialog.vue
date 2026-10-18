<template>
  <slot :is-open="isOpen" />

  <Teleport
    :to="teleportTarget"
    :disabled="!usePortal"
  >
    <AnimatePresence :initial="false">
      <motion.div
        v-if="isOpen"
        key="morphing-dialog"
        ref="wrapperRef"
        :class="wrapperClasses"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        :transition="{ duration: 0 }"
        @click="handleWrapperClick"
      >
        <motion.div
          v-if="overlay"
          key="overlay"
          class="absolute inset-0 bg-inverted/40 backdrop-blur-sm"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="overlayTransition"
          @click="handleOverlayClick"
        />

        <motion.div
          ref="contentRef"
          :layout-id="layoutId ? `dialog-${uniqueId}` : undefined"
          :class="contentClasses"
          :initial="contentInitial"
          :animate="contentAnimate"
          :exit="contentExit"
          :transition="contentTransition"
          @click.stop
        >
          <div
            v-if="title || description"
            class="flex flex-col gap-1 border-b border-default p-6"
          >
            <h2
              v-if="title"
              class="text-lg font-semibold text-highlighted"
            >
              {{ title }}
            </h2>
            <p
              v-if="description"
              class="text-sm text-muted"
            >
              {{ description }}
            </p>
          </div>

          <slot
            name="content"
            :close="close"
            :is-open="isOpen"
          />

          <button
            v-if="closeIcon"
            type="button"
            aria-label="Close dialog"
            class="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-muted hover:text-highlighted"
            @click="close"
          >
            <UIcon
              :name="closeIcon"
              class="size-5"
            />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import type { Variant, Transition } from 'motion-v'
import { provideMorphingDialog } from './useMorphingDialog'

interface Variants {
  initial?: Variant
  animate?: Variant
  exit?: Variant
}

interface Props {
  open?: boolean
  defaultOpen?: boolean
  layoutId?: boolean
  title?: string
  description?: string
  overlay?: boolean
  scrollable?: boolean
  fullscreen?: boolean
  portal?: string | boolean
  dismissible?: boolean
  closeIcon?: string
  modal?: boolean
  class?: string
  ui?: Record<string, any>
  scale?: number
  variants?: Variants
  transition?: Transition
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: false,
  layoutId: true,
  title: undefined,
  description: undefined,
  overlay: true,
  scrollable: false,
  fullscreen: false,
  portal: true,
  dismissible: true,
  closeIcon: undefined,
  modal: true,
  class: undefined,
  ui: undefined,
  scale: 0.95,
  variants: () => ({}),
  transition: () => ({ type: 'spring', bounce: 0.15, duration: 0.4 }),
})

const emit = defineEmits<{
  'update:open': [open: boolean]
  'enter': []
  'after:enter': []
  'leave': []
  'after:leave': []
  'close:prevent': []
}>()

const uniqueId = useId()
const isOpen = ref(props.defaultOpen)

const usePortal = computed(() => props.portal !== false)
const teleportTarget = computed(() => (typeof props.portal === 'string' ? props.portal : 'body'))

const setIsOpen = (value: boolean) => {
  isOpen.value = value
  emit('update:open', value)
}

const close = () => setIsOpen(false)

provideMorphingDialog({ isOpen, setIsOpen, uniqueId })

const wrapperRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

const wrapperClasses = computed(() => [
  'fixed inset-0 z-50 flex gap-4 p-4',
  props.fullscreen ? 'items-stretch p-0' : 'items-center justify-center',
  props.scrollable && !props.fullscreen ? 'overflow-y-auto' : '',
  props.ui?.wrapper,
])

const contentClasses = computed(() => [
  'relative z-10 overflow-hidden bg-default shadow-xl outline-none',
  props.fullscreen ? 'h-full w-full' : 'w-full max-w-lg rounded-2xl ring-1 ring-default',
  props.class,
  props.ui?.content,
])

const overlayTransition = computed(() => ({ duration: 0.2 }))

const defaultContentVariants = computed(() => ({
  initial: {
    opacity: 0,
    ...(props.layoutId ? {} : { scale: props.scale }),
  },
  animate: {
    opacity: 1,
    ...(props.layoutId ? {} : { scale: 1 }),
  },
  exit: {
    opacity: 0,
    ...(props.layoutId ? {} : { scale: props.scale }),
  },
}))

const contentInitial = computed(() => ({ ...defaultContentVariants.value.initial, ...props.variants?.initial }))
const contentAnimate = computed(() => ({ ...defaultContentVariants.value.animate, ...props.variants?.animate }))
const contentExit = computed(() => ({ ...defaultContentVariants.value.exit, ...props.variants?.exit }))
const contentTransition = computed(() => props.transition)

watch(() => props.open, (value) => {
  if (value !== undefined) isOpen.value = value
}, { immediate: true })

const focusableSelector = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.dismissible) {
    event.preventDefault()
    close()
  }
}

let timer: ReturnType<typeof setTimeout> | undefined

watch(isOpen, async (value) => {
  if (value) {
    emit('enter')
  }
  else {
    emit('leave')
  }
  clearTimeout(timer)
  const duration = typeof props.transition?.duration === 'number' ? props.transition.duration * 1000 : 400
  timer = setTimeout(() => {
    if (value) {
      emit('after:enter')
    }
    else {
      emit('after:leave')
    }
  }, duration)

  if (value) {
    previouslyFocused = document.activeElement as HTMLElement | null
    if (props.modal !== false) document.body.classList.add('overflow-hidden')
    document.addEventListener('keydown', handleKeydown)
    await nextTick()
    const el = contentRef.value as unknown as HTMLElement | null
    const first = el && typeof el.querySelector === 'function'
      ? (el.querySelector<HTMLElement>(focusableSelector) ?? el)
      : el
    first?.focus?.()
  }
  else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.classList.remove('overflow-hidden')
    previouslyFocused?.focus?.()
  }
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  document.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('overflow-hidden')
})

function handleWrapperClick(event: MouseEvent) {
  if (props.dismissible && event.target === event.currentTarget) {
    close()
  }
}

function handleOverlayClick() {
  if (props.dismissible) close()
}
</script>
