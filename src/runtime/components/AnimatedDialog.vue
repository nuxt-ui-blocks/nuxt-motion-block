<template>
  <UModal
    v-model:open="isOpen"
    :title="title"
    :description="description"
    :content="contentProps"
    :overlay="overlay"
    :scrollable="scrollable"
    :transition="transition"
    :fullscreen="fullscreen"
    :portal="portal"
    :close="close"
    :close-icon="closeIcon"
    :dismissible="dismissible"
    :ui="ui"
    :modal="modal"
    @update:open="handleOpenChange"
  >
    <template #default>
      <slot />
    </template>

    <!--  eslint-disable-next-line vue/no-template-shadow -->
    <template #content="{ close }">
      <div :class="contentClasses">
        <AnimatePresence>
          <motion.div
            v-if="isOpen"
            initial="initial"
            animate="animate"
            exit="exit"
            :variants="contentVariants"
            :transition="contentTransition"
            class="will-change-transform"
          >
            <!-- Custom header slot -->
            <slot
              v-if="$slots.header"
              name="header"
              :close="close"
            />

            <!-- Body -->
            <div :class="bodyClasses">
              <slot name="body" />
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              :class="footerClasses"
            >
              <slot
                name="footer"
                :close="close"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
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
  transition?: boolean
  fullscreen?: boolean
  portal?: string | boolean | HTMLElement
  close?: boolean | Partial<ButtonProps>
  closeIcon?: string
  dismissible?: boolean
  ui?: object
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
  transition: true,
  fullscreen: false,
  portal: true,
  close: true,
  dismissible: true,
  defaultOpen: false,
  modal: true,
  scale: 0.95,
  variants: () => ({}),
  transitionOptions: () => ({}),
})

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

// Default variants for animation
const defaultContentVariants = computed(() => {
  return {
    initial: { opacity: 0, scale: props.scale },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: props.scale },
  }
})

// Computed variants with fallback to defaults
const contentVariants = computed(() => {
  return {
    initial: { ...(props.variants?.initial || {}), ...defaultContentVariants.value.initial },
    animate: { ...(props.variants?.animate || {}), ...defaultContentVariants.value.animate },
    exit: { ...(props.variants?.exit || {}), ...defaultContentVariants.value.exit },
  }
})

// Default transition
const defaultTransition = {
  type: 'spring' as const,
  bounce: 0.1,
  duration: 0.4,
}

// Computed transition with fallback to defaults
const contentTransition = computed(() => {
  return {
    ...defaultTransition,
    ...props.transitionOptions,
  }
})

// Computed classes
const contentClasses = computed(() => {
  return [
    'relative overflow-hidden',
    'backdrop-blur-sm',
    'outline-none focus:outline-none',
    'border-default',
    'bg-default',
    'text-default',
  ].join(' ')
})

const bodyClasses = computed(() => {
  return [
    'flex-1 p-4 sm:p-6',
  ].join(' ')
})

const footerClasses = computed(() => {
  return [
    'flex items-center gap-1.5 p-4 sm:px-6',
    'border-t border-default',
  ].join(' ')
})

const contentProps = computed(() => {
  return {
    ...props.content,
  }
})
</script>
