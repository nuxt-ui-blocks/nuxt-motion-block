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
      <div class="relative overflow-hidden">
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
            class="will-change-transform"
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
            class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-default border-t border-l border-default will-change-transform"
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

interface Props {
  mode?: 'click' | 'hover'
  dismissible?: boolean
  openDelay?: number
  closeDelay?: number
  arrow?: boolean
  portal?: string | boolean | HTMLElement
  open?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'click',
  dismissible: true,
  openDelay: 0,
  closeDelay: 0,
  arrow: false,
  portal: true,
  open: undefined,
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
