<template>
  <UButton
    v-bind="$attrs"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @click="handleCopy"
  >
    <template #leading>
      <AnimatePresence mode="wait">
        <motion.span
          v-if="!copied"
          key="copy-icon"
          :initial="{ opacity: 0, scale: 0.5, rotate: -90 }"
          :animate="{ opacity: 1, scale: 1, rotate: 0 }"
          :exit="{ opacity: 0, scale: 0.5, rotate: 90 }"
          :transition="{ duration: 0.2 }"
          :class="ui.copyIcon({ class: uiProps.ui?.copyIcon })"
        >
          <slot name="copy-icon">
            <svg
              :class="ui.copyIconSvg({ class: uiProps.ui?.copyIconSvg })"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </slot>
        </motion.span>
        <motion.span
          v-else
          key="check-icon"
          :initial="{ opacity: 0, scale: 0.5, rotate: -90 }"
          :animate="{ opacity: 1, scale: 1, rotate: 0 }"
          :exit="{ opacity: 0, scale: 0.5, rotate: 90 }"
          :transition="{ duration: 0.2 }"
          :class="ui.copiedIcon({ class: uiProps.ui?.copiedIcon })"
        >
          <slot name="copied-icon">
            <svg
              :class="ui.copiedIconSvg({ class: uiProps.ui?.copiedIconSvg })"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </slot>
        </motion.span>
      </AnimatePresence>
    </template>

    <template #default>
      <AnimatePresence mode="wait">
        <motion.span
          v-if="!copied"
          key="label"
          :initial="{ opacity: 0, y: 8 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -8 }"
          :transition="{ duration: 0.15 }"
        >
          <slot>{{ text }}</slot>
        </motion.span>
        <motion.span
          v-else
          key="copied-label"
          :initial="{ opacity: 0, y: 8 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -8 }"
          :transition="{ duration: 0.15 }"
          :class="ui.copiedLabel({ class: uiProps.ui?.copiedLabel })"
        >
          Copied!
        </motion.span>
      </AnimatePresence>
    </template>

    <template
      v-if="$slots.trailing"
      #trailing
    >
      <slot name="trailing" />
    </template>
  </UButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { useClipboard } from '@vueuse/core'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import buttonCopy from '../theme/button-copy'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: Record<string, any>
  text: string
  copiedDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  ui: undefined,
  copiedDuration: 2000,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'buttonCopy', props, theme: buttonCopy })

const { copy } = useClipboard()
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const handleCopy = async () => {
  await copy(props.text)
  copied.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    copied.value = false
  }, props.copiedDuration)
}
</script>
