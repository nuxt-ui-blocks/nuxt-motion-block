<template>
  <button
    ref="triggerRef"
    type="button"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :aria-label="`View ${alt || 'image'} at full size`"
    :disabled="disabled"
    @click="open"
  >
    <img
      :src="src"
      :alt="alt"
      :class="ui.image({ class: uiProps.ui?.image })"
    >
  </button>

  <Teleport to="body">
    <AnimatePresence>
      <Motion
        v-if="isOpen"
        key="zoomable-overlay"
        as="div"
        role="dialog"
        aria-modal="true"
        :aria-label="alt || 'Image preview'"
        :class="ui.overlay({ class: uiProps.ui?.overlay })"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.2 }"
        @click.self="close"
      >
        <Motion
          as="img"
          :src="src"
          :alt="alt"
          :class="ui.zoomed({ class: uiProps.ui?.zoomed })"
          :initial="{ scale: 0.85, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :exit="{ scale: 0.9, opacity: 0 }"
          :transition="shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 26 }"
          @click="close"
        />
        <button
          ref="closeRef"
          type="button"
          :class="ui.close({ class: uiProps.ui?.close })"
          aria-label="Close image"
          @click="close"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            class="size-4"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </Motion>
    </AnimatePresence>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { AnimatePresence, Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import zoomableImage from '../theme/zoomable-image'

export interface ZoomableImageProps {
  /** Alternative text. Also used as the label of the dialog. */
  alt?: string
  /** Extra classes for the thumbnail button. */
  class?: string
  /** Render the thumbnail without opening the overlay. */
  disabled?: boolean
  /** Image to show. */
  src: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<ZoomableImageProps>(), {
  alt: '',
  class: undefined,
  disabled: false,
  ui: undefined,
})

const emit = defineEmits<{
  close: []
  open: []
}>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'zoomableImage', props, theme: zoomableImage })

const shouldReduceMotion = useReducedMotion()

const isOpen = ref(false)
const triggerRef = ref<HTMLButtonElement | null>(null)
const closeRef = ref<HTMLButtonElement | null>(null)

let restoreOverflow = ''

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

const open = () => {
  if (props.disabled || isOpen.value) {
    return
  }

  isOpen.value = true
  emit('open')
}

const close = () => {
  if (!isOpen.value) {
    return
  }

  isOpen.value = false
  emit('close')
}

/**
 * The overlay covers the page, so the background stops scrolling while it is
 * open, Escape closes it, and focus lands on the close button and comes back
 * to the thumbnail afterwards.
 */
watch(isOpen, async (value) => {
  if (import.meta.server) {
    return
  }

  if (value) {
    restoreOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeydown)
    await nextTick()
    closeRef.value?.focus()
  }
  else {
    document.body.style.overflow = restoreOverflow
    window.removeEventListener('keydown', onKeydown)
    triggerRef.value?.focus()
  }
})

onBeforeUnmount(() => {
  if (import.meta.server) {
    return
  }

  window.removeEventListener('keydown', onKeydown)
  if (isOpen.value) {
    document.body.style.overflow = restoreOverflow
  }
})

defineExpose({ close, open })
</script>
