<template>
  <UPopover
    v-model:open="isOpen"
    v-bind="$attrs"
    :mode="mode"
    :dismissible="dismissible"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    :arrow="arrow"
    :portal="portal"
    @update:open="handleOpenChange"
  >
    <template #default>
      <slot />
    </template>

    <template
      v-if="$slots.content"
      #content
    >
      <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
        <AnimatePresence>
          <motion.div
            v-if="isOpen"
            :initial="{ opacity: 0, scale: 0.95, y: 4 }"
            :animate="{ opacity: 1, scale: 1, y: 0 }"
            :exit="{ opacity: 0, scale: 0.95, y: 4 }"
            :transition="{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              bounce: 0.1,
            }"
            :class="ui.content({ class: uiProps.ui?.content })"
          >
            <slot name="content" />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence v-if="arrow">
          <motion.div
            v-if="isOpen"
            :initial="{ opacity: 0, scale: 0 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 0 }"
            :transition="{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              delay: 0.05,
            }"
            :class="ui.arrow({ class: uiProps.ui?.arrow })"
          />
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
import { ref, watch } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import richPopover from '../theme/rich-popover'

interface Props {
  mode?: 'click' | 'hover'
  dismissible?: boolean
  openDelay?: number
  closeDelay?: number
  arrow?: boolean
  portal?: string | boolean | HTMLElement
  open?: boolean
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'click',
  dismissible: true,
  openDelay: 0,
  closeDelay: 0,
  arrow: false,
  portal: true,
  open: undefined,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'richPopover',
  props,
  theme: richPopover,
})

const emit = defineEmits<{
  'update:open': [open: boolean]
}>()

const isOpen = ref(false)

watch(() => props.open, (val) => {
  if (val !== undefined) isOpen.value = val
}, { immediate: true })

function handleOpenChange(val: boolean) {
  isOpen.value = val
  emit('update:open', val)
}
</script>
