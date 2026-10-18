<template>
  <UModal
    v-model:open="isOpen"
    :title="title"
    :description="description"
    :content="contentProps"
    :overlay="overlay"
    :scrollable="scrollable"
    :transition="false"
    :fullscreen="fullscreen"
    :portal="portal"
    :close="close"
    :close-icon="closeIcon"
    :dismissible="dismissible"
    :unmount-on-hide="unmountOnHide"
    :ui="uiProps.ui"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :modal="modal"
    @update:open="handleOpenChange"
  >
    <template #default>
      <slot />
    </template>

    <!--  eslint-disable-next-line vue/no-template-shadow -->
    <template #content="{ close }">
      <AnimatePresence>
        <motion.div
          v-if="isOpen"
          :class="ui.content({ class: uiProps.ui?.content })"
          :initial="contentInitial"
          :animate="contentAnimate"
          :exit="contentExit"
          :transition="contentTransition"
        >
          <!-- Custom header slot -->
          <slot
            v-if="$slots.header"
            name="header"
            :close="close"
          />

          <!-- Body -->
          <div :class="ui.body({ class: uiProps.ui?.body })">
            <slot name="body" />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            :class="ui.footer({ class: uiProps.ui?.footer })"
          >
            <slot
              name="footer"
              :close="close"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </template>

    <template
      v-if="$slots.title"
      #title
    >
      <slot name="title" />
    </template>

    <template
      v-if="$slots.description"
      #description
    >
      <slot name="description" />
    </template>

    <template
      v-if="$slots.close"
      #close="{ ui: closeUi }"
    >
      <slot
        name="close"
        :ui="closeUi"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import type { Variant, Transition } from 'motion-v'
import type { ButtonProps } from '#ui/components/Button.vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedDialog from '../theme/animated-dialog'

interface Variants {
  initial?: Variant
  animate?: Variant
  exit?: Variant
}

interface Props {
  // UModal props
  title?: string
  description?: string
  content?: object
  overlay?: boolean
  scrollable?: boolean
  fullscreen?: boolean
  portal?: string | boolean | HTMLElement
  close?: boolean | Partial<ButtonProps>
  closeIcon?: string
  dismissible?: boolean
  unmountOnHide?: boolean
  ui?: Record<string, any>
  class?: string
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean

  // Animation props
  scale?: number
  variants?: Variants
  transitionOptions?: Transition
}

const props = withDefaults(defineProps<Props>(), {
  overlay: true,
  scrollable: false,
  fullscreen: false,
  portal: true,
  close: true,
  dismissible: true,
  unmountOnHide: true,
  ui: undefined,
  class: undefined,
  defaultOpen: false,
  modal: true,
  scale: 0.96,
  variants: () => ({}),
  transitionOptions: () => ({}),
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'animatedDialog', props, theme: animatedDialog })

const emit = defineEmits<{
  'update:open': [open: boolean]
}>()

// internal open state
const isOpen = ref(props.defaultOpen)

// sync with controlled `open` prop
watch(() => props.open, (newOpen) => {
  if (newOpen !== undefined) {
    isOpen.value = newOpen
  }
}, { immediate: true })

const handleOpenChange = (open: boolean) => {
  isOpen.value = open
  emit('update:open', open)
}

// Default initial/animate/exit, merged with any user variants
const contentInitial = computed(() => ({
  opacity: 0,
  scale: props.scale,
  ...props.variants?.initial,
}))

const contentAnimate = computed(() => ({
  opacity: 1,
  scale: 1,
  ...props.variants?.animate,
}))

const contentExit = computed(() => ({
  opacity: 0,
  scale: props.scale,
  ...props.variants?.exit,
}))

// Default transition (an ease-out tween that is clearly visible)
const defaultTransition: Transition = {
  type: 'tween',
  ease: [0.22, 1, 0.36, 1],
  duration: 0.4,
}

// Computed transition with fallback to defaults
const contentTransition = computed(() => {
  return {
    ...defaultTransition,
    ...props.transitionOptions,
  }
})

const contentProps = computed(() => {
  return {
    ...props.content,
  }
})
</script>
