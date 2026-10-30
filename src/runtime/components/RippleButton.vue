<template>
  <button
    type="button"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @pointerdown="onPointerDown"
  >
    <AnimatePresence>
      <Motion
        v-for="ripple in ripples"
        :key="ripple.id"
        as="span"
        aria-hidden="true"
        :class="ui.ripple({ class: uiProps.ui?.ripple })"
        :style="{ left: `${ripple.x}px`, top: `${ripple.y}px` }"
        :initial="{ scale: 0, opacity: 0.6 }"
        :animate="{ scale: 6, opacity: 0 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration, ease: 'easeOut' }"
      />
    </AnimatePresence>
    <span :class="ui.label({ class: uiProps.ui?.label })">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AnimatePresence, Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import rippleButton from '../theme/ripple-button'

export interface RippleButtonProps {
  /** Extra classes for the button. */
  class?: string
  /** Seconds a ripple takes to spread out and fade. */
  duration?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<RippleButtonProps>(), {
  class: undefined,
  duration: 0.7,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'rippleButton', props, theme: rippleButton })

const shouldReduceMotion = useReducedMotion()

interface Ripple {
  id: number
  x: number
  y: number
}

const ripples = ref<Ripple[]>([])
let nextId = 0

/** The ripple grows from the point the pointer went down. */
const onPointerDown = (event: PointerEvent) => {
  if (shouldReduceMotion.value) {
    return
  }

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const ripple = {
    id: nextId += 1,
    x: event.clientX - rect.left - 16,
    y: event.clientY - rect.top - 16,
  }

  ripples.value.push(ripple)
  // The ripple is dropped once it has finished spreading.
  window.setTimeout(() => remove(ripple.id), props.duration * 1000)
}

const remove = (id: number) => {
  ripples.value = ripples.value.filter(ripple => ripple.id !== id)
}
</script>
