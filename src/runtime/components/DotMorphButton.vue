<template>
  <UButton
    v-bind="$attrs"
    :color="color"
    :variant="variant"
    :size="size"
    @mouseenter="onMouseEnter"
    @mouseleave="isHovered = false"
  >
    <template #leading>
      <span
        ref="wrapperEl"
        class="flex h-4 w-4 shrink-0 items-center justify-center"
      >
        <motion.span
          class="flex items-center justify-center"
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

const props = withDefaults(defineProps<{
  color?: string
  dotColor?: string
  label?: string
  size?: string
  variant?: string
}>(), {
  color: 'primary',
  dotColor: 'primary',
  label: 'Dot-Morph',
  size: 'md',
  variant: 'solid',
})

const isHovered = ref(false)
const isHoverDevice = ref(false)
const shouldReduceMotion = ref(false)
const wrapperEl = ref<HTMLElement | null>(null)
const maxPillH = ref(28)

let hoverQuery: MediaQueryList | undefined
let motionQuery: MediaQueryList | undefined
let resizeObserver: ResizeObserver | undefined

const onHoverChange = (e: MediaQueryListEvent) => {
  isHoverDevice.value = e.matches
}
const onMotionChange = (e: MediaQueryListEvent) => {
  shouldReduceMotion.value = e.matches
}

const dotBackground = computed(() => `var(--color-${props.dotColor}-500)`)

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
  hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  isHoverDevice.value = hoverQuery.matches
  hoverQuery.addEventListener('change', onHoverChange)

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
  hoverQuery?.removeEventListener('change', onHoverChange)
  motionQuery?.removeEventListener('change', onMotionChange)
  resizeObserver?.disconnect()
})
</script>
