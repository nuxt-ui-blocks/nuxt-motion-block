<template>
  <UButton
    v-bind="$attrs"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :color="color"
    :variant="variant"
    :size="size"
    :ui="uiProps.ui"
    @mouseenter="onMouseEnter"
    @mouseleave="isHovered = false"
  >
    <template #leading>
      <span
        ref="wrapperEl"
        :class="ui.leading({ class: uiProps.ui?.leading })"
      >
        <motion.span
          :class="ui.dot({ class: uiProps.ui?.dot })"
          :style="{ background: dotBackground, display: 'inline-block' }"
          :initial="false"
          :animate="dotAnimation"
          :transition="dotTransition"
        />
      </span>
    </template>
    <slot>{{ label }}</slot>
    <template #trailing>
      <slot name="trailing" />
    </template>
  </UButton>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { motion } from 'motion-v'
import type { ButtonProps } from '#ui/components/Button.vue'
import { useHoverCapable } from '../composables/useHoverCapable'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { useResolvedColor } from '../composables/useThemeColor'
import dotMorphButton from '../theme/dot-morph-button'

const props = withDefaults(defineProps<{
  class?: string
  color?: ButtonProps['color']
  dotColor?: string
  label?: string
  size?: ButtonProps['size']
  ui?: Record<string, any>
  variant?: ButtonProps['variant']
}>(), {
  class: undefined,
  color: 'primary',
  dotColor: 'primary',
  label: 'Dot-Morph',
  size: 'md',
  ui: undefined,
  variant: 'solid',
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'dotMorphButton', props, theme: dotMorphButton })

const isHovered = ref(false)
const isHoverDevice = useHoverCapable()
const shouldReduceMotion = ref(false)
const wrapperEl = ref<HTMLElement | null>(null)
const maxPillH = ref(28)

let motionQuery: MediaQueryList | undefined
let resizeObserver: ResizeObserver | undefined

const onMotionChange = (e: MediaQueryListEvent) => {
  shouldReduceMotion.value = e.matches
}

const resolvedDotColor = useResolvedColor(() => `var(--color-${props.dotColor}-500)`)
const dotBackground = computed(() => resolvedDotColor.value)

const dotTransition = computed(() => ({
  type: 'spring',
  stiffness: 600,
  damping: 22,
  duration: 0.25,
  ...(shouldReduceMotion.value ? { duration: 0 } : {}),
}))

const dotAnimation = computed(() => {
  const base = { borderRadius: '999px', height: '16px', width: '16px' }
  if (shouldReduceMotion.value || !isHoverDevice.value) {
    return base
  }
  return isHovered.value
    ? { ...base, height: `${maxPillH.value}px`, width: '12px' }
    : base
})

function measureButton() {
  const btn = wrapperEl.value?.parentElement
  if (!btn) return
  maxPillH.value = Math.min(28, Math.round(btn.getBoundingClientRect().height) - 2)
}

function onMouseEnter() {
  if (isHoverDevice.value) {
    isHovered.value = true
  }
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  shouldReduceMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', onMotionChange)

  measureButton()
  if (wrapperEl.value?.parentElement) {
    resizeObserver = new ResizeObserver(measureButton)
    resizeObserver.observe(wrapperEl.value.parentElement)
  }
})

onUnmounted(() => {
  motionQuery?.removeEventListener('change', onMotionChange)
  resizeObserver?.disconnect()
})
</script>
