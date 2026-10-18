<template>
  <UModal
    v-model:open="isOpen"
    :title="title"
    :description="description"
    :content="content"
    :overlay="overlay"
    :scrollable="scrollable"
    :transition="false"
    :fullscreen="fullscreen"
    :portal="portal"
    :close="false"
    :close-icon="closeIcon"
    :dismissible="dismissible"
    :unmount-on-hide="unmountOnHide"
    :class="props.class"
    :ui="ui"
    :modal="modal"
    @update:open="handleOpenChange"
    @enter="$emit('enter')"
    @after:enter="$emit('after:enter')"
    @leave="$emit('leave')"
    @after:leave="$emit('after:leave')"
    @close:prevent="$emit('close:prevent')"
  >
    <template #default>
      <slot />
    </template>

    <template #content="{ close }">
      <AnimatePresence>
        <motion.div
          v-if="isOpen"
          :layout-id="layoutId ? `dialog-${uniqueId}` : undefined"
          :class="contentClasses"
          :initial="contentInitial"
          :animate="contentAnimate"
          :exit="contentExit"
          :transition="contentTransition"
        >
          <slot
            name="content"
            :close="close"
          />
        </motion.div>
      </AnimatePresence>
    </template>

    <template
      v-if="$slots.header"
      #header="{ close: headerClose }"
    >
      <slot
        name="header"
        :close="headerClose"
      />
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
      v-if="$slots.actions"
      #actions
    >
      <slot name="actions" />
    </template>

    <template
      v-if="$slots.body"
      #body="{ close: bodyClose }"
    >
      <slot
        name="body"
        :close="bodyClose"
      />
    </template>

    <template
      v-if="$slots.footer"
      #footer="{ close: footerClose }"
    >
      <slot
        name="footer"
        :close="footerClose"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, computed, watch, useId } from 'vue'
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
  content?: object
  overlay?: boolean
  scrollable?: boolean
  fullscreen?: boolean
  portal?: string | boolean
  dismissible?: boolean
  closeIcon?: string
  unmountOnHide?: boolean
  modal?: boolean
  class?: string
  ui?: Record<string, any>
  scale?: number
  variants?: Variants
  transition?: Transition
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
  layoutId: true,
  overlay: true,
  scrollable: false,
  fullscreen: false,
  portal: true,
  dismissible: true,
  modal: true,
  scale: 0.95,
  variants: () => ({}),
  transition: () => ({
    type: 'tween',
    ease: [0.22, 1, 0.36, 1],
    duration: 0.4,
  }),
  ui: () => ({}),
})

const emit = defineEmits<{
  'update:open': [open: boolean]
  'enter': []
  'after:enter': []
  'leave': []
  'after:leave': []
  'close:prevent': []
}>()

const isOpen = ref(props.defaultOpen)
const uniqueId = useId()

watch(() => props.open, (newOpen) => {
  if (newOpen !== undefined) {
    isOpen.value = newOpen
  }
}, { immediate: true })

const setIsOpen = (value: boolean) => {
  isOpen.value = value
  emit('update:open', value)
}

const handleOpenChange = (open: boolean) => {
  setIsOpen(open)
}

provideMorphingDialog({
  isOpen,
  setIsOpen,
  uniqueId,
})

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

const contentInitial = computed(() => ({
  ...defaultContentVariants.value.initial,
  ...props.variants?.initial,
}))

const contentAnimate = computed(() => ({
  ...defaultContentVariants.value.animate,
  ...props.variants?.animate,
}))

const contentExit = computed(() => ({
  ...defaultContentVariants.value.exit,
  ...props.variants?.exit,
}))

const contentTransition = computed(() => ({
  ...props.transition,
}))

const contentClasses = computed(() => [
  'relative overflow-hidden',
  'outline-none focus:outline-none',
  'border-default',
  'bg-default',
  'text-default',
].join(' '))
</script>
