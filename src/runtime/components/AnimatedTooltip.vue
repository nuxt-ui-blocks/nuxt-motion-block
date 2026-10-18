<template>
  <UTooltip
    v-bind="$attrs"
    :text="text"
    :kbds="kbds"
    :content="content"
    :arrow="arrow"
    :portal="portal"
    :open="open"
    :default-open="defaultOpen"
    :delay-duration="delayDuration"
    :disabled="disabled"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :ui="uiProps.ui"
    @update:open="$emit('update:open', $event)"
  >
    <slot />

    <template #content="contentScope">
      <motion.div
        :initial="hiddenState"
        :animate="visibleState"
        :exit="exitedState"
        :transition="springTransition"
        :class="ui.content({ class: uiProps.ui?.content })"
      >
        <slot name="content">
          <span
            v-if="text"
            data-slot="text"
            :class="contentScope?.ui?.text({ class: uiProps.ui?.text })"
          >{{ text }}</span>
          <span
            v-if="kbds?.length"
            data-slot="kbds"
            :class="contentScope?.ui?.kbds({ class: uiProps.ui?.kbds })"
          >
            <UKbd
              v-for="(kbd, index) in kbds"
              :key="index"
              :size="uiProps.ui?.kbdsSize || contentScope?.ui?.kbdsSize()"
              v-bind="typeof kbd === 'string' ? { value: kbd } : kbd"
            />
          </span>
        </slot>
      </motion.div>
    </template>
  </UTooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { KbdProps } from '@nuxt/ui/components/Kbd.vue'
import { motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedTooltip from '../theme/animated-tooltip'

defineOptions({ inheritAttrs: false })

interface TooltipContentProps {
  side?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
  collisionPadding?: number
  [key: string]: any
}

type TooltipKbds = KbdProps['value'][] | KbdProps[]

interface Props {
  text?: string
  kbds?: TooltipKbds
  content?: TooltipContentProps
  arrow?: boolean | object
  portal?: string | boolean | HTMLElement
  open?: boolean
  defaultOpen?: boolean
  delayDuration?: number
  disabled?: boolean
  class?: string
  ui?: Record<string, any>
  springStiffness?: number
  springDamping?: number
}

const props = withDefaults(defineProps<Props>(), {
  content: () => ({ side: 'bottom', sideOffset: 8, collisionPadding: 8 }),
  arrow: false,
  portal: true,
  delayDuration: 700,
  disabled: false,
  class: undefined,
  ui: undefined,
  springStiffness: 500,
  springDamping: 20,
  open: undefined,
  defaultOpen: undefined,
})

defineEmits<{
  'update:open': [value: boolean]
}>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'animatedTooltip', props, theme: animatedTooltip })

const SIDE_OFFSET = 4

const reduce = useReducedMotion()

const hiddenState = computed(() => {
  if (reduce.value)
    return { opacity: 0 }

  const side = props.content?.side ?? 'bottom'

  return {
    opacity: 0,
    scale: 0.95,
    x: side === 'left' ? SIDE_OFFSET : side === 'right' ? -SIDE_OFFSET : 0,
    y: side === 'top' ? SIDE_OFFSET : side === 'bottom' ? -SIDE_OFFSET : 0,
  }
})

const visibleState = computed(() =>
  reduce.value ? { opacity: 1 } : { opacity: 1, scale: 1, x: 0, y: 0 },
)

const exitedState = computed(() =>
  reduce.value
    ? { opacity: 0, transition: { duration: 0 } }
    : { ...hiddenState.value, transition: { duration: 0.15 } },
)

const springTransition = computed(() =>
  reduce.value
    ? { duration: 0 }
    : {
        type: 'spring' as const,
        stiffness: props.springStiffness,
        damping: props.springDamping,
      },
)
</script>
