<template>
  <UPopover
    v-model:open="isOpen"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :mode="mode"
    :content="contentProps"
    :arrow="arrow"
    :portal="portal"
    :dismissible="dismissible"
    :default-open="defaultOpen"
    :modal="modal"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :ui="uiProps.ui"
    @update:open="handleOpenChange"
  >
    <template #default>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        :variants="triggerVariants"
        :transition="triggerTransition"
        :class="ui.trigger({ class: uiProps.ui?.trigger })"
      >
        <slot />
      </motion.div>
    </template>

    <template
      v-if="$slots.content"
      #content
    >
      <!-- Origin-aware animation for the content -->
      <div :class="ui.content({ class: [contentClasses, uiProps.ui?.content] })">
        <AnimatePresence>
          <motion.div
            v-if="isOpen"
            initial="initial"
            animate="animate"
            exit="exit"
            :variants="contentVariants"
            :transition="contentTransition"
            :class="ui.contentInner({ class: uiProps.ui?.contentInner })"
            :style="{
              transformOrigin: 'var(--reka-popover-content-transform-origin, center)',
            }"
          >
            <slot name="content" />
          </motion.div>
        </AnimatePresence>
      </div>
    </template>

    <template
      v-if="$slots.anchor"
      #anchor
    >
      <slot name="anchor" />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import type { Variant, Transition } from 'motion-v'
import type { PopoverProps } from '#ui/components/Popover.vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import morphingPopover from '../theme/morphing-popover'

interface Variants {
  initial?: Variant
  animate?: Variant
  exit?: Variant
}

interface Props {
  class?: string
  mode?: 'click' | 'hover'
  content?: PopoverProps['content']
  arrow?: boolean | object
  portal?: string | boolean | HTMLElement
  dismissible?: boolean
  defaultOpen?: boolean
  open?: boolean
  modal?: boolean
  openDelay?: number
  closeDelay?: number
  ui?: Record<string, any>
  // Morphing effect props
  scale?: number
  // Custom animation props (matching React API)
  variants?: Variants
  transition?: Transition
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  mode: 'click',
  dismissible: true,
  defaultOpen: false,
  modal: false,
  openDelay: 0,
  closeDelay: 0,
  arrow: false,
  portal: true,
  scale: 0.95,
  ui: undefined,
  variants: () => ({}),
  transition: () => ({}),
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'morphingPopover', props, theme: morphingPopover })

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

// Default variants matching  implementation
const defaultTriggerVariants = computed(() => {
  return {
    initial: { scale: props.scale },
    animate: { scale: isOpen.value ? 1 : props.scale },
    exit: { scale: props.scale },
  }
})

const defaultContentVariants = computed(() => {
  return {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  }
})

// Computed variants with fallback to defaults
const triggerVariants = computed(() => {
  return {
    initial: { ...(props.variants?.initial || {}), ...defaultTriggerVariants.value.initial },
    animate: { ...(props.variants?.animate || {}), ...defaultTriggerVariants.value.animate },
    exit: { ...(props.variants?.exit || {}), ...defaultTriggerVariants.value.exit },
  }
})

const contentVariants = computed(() => {
  return {
    initial: { ...(props.variants?.initial || {}), ...defaultContentVariants.value.initial },
    animate: { ...(props.variants?.animate || {}), ...defaultContentVariants.value.animate },
    exit: { ...(props.variants?.exit || {}), ...defaultContentVariants.value.exit },
  }
})

// Default transitions matching implementation
const defaultTriggerTransition = {
  type: 'spring' as const,
  bounce: 0.1,
  duration: 0.3,
}

const defaultContentTransition = {
  type: 'spring' as const,
  bounce: 0.1,
  duration: 0.4,
}

// Computed transitions with fallback to defaults
const triggerTransition = computed(() => {
  return {
    ...defaultTriggerTransition,
    ...props.transition,
  }
})

const contentTransition = computed(() => {
  return {
    ...defaultContentTransition,
    ...props.transition,
  }
})

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

const contentProps = computed(() => {
  return {
    side: 'bottom' as const,
    sideOffset: 8,
    collisionPadding: 8,
    ...props.content,
  }
})
</script>
