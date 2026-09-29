<template>
  <Motion
    :class="progressClasses"
    :style="progressStyle"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Motion, useScroll, useSpring, useMotionValueEvent } from 'motion-v'
import type { MaybeComputedElementRef } from '@vueuse/core'
import type { SpringOptions } from 'motion-v'

const props = withDefaults(defineProps<{
  class?: string
  springOptions?: SpringOptions
  /**
   * Scrollable ancestor to track instead of the window. Pass a getter —
   * `:container-ref="() => panelRef"` — not the element: a plain binding is
   * unwrapped by the template and captured as `null` during `setup`, after
   * which nothing re-reads it and `useScroll` falls back to the window.
   */
  containerRef?: MaybeComputedElementRef
}>(), {
  springOptions: undefined,
  containerRef: undefined,
})

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
}

// Use scroll tracking
const { scrollYProgress } = useScroll({
  // Straight through, never `props.containerRef?.value`: `useScroll` resolves the
  // getter via `unrefElement` inside its own `flush: 'post'` effect, so
  // unwrapping here would strip the reactive source.
  container: props.containerRef,
})

// Apply spring animation to the scroll progress
const scaleX = useSpring(scrollYProgress, {
  ...DEFAULT_SPRING_OPTIONS,
  ...(props.springOptions ?? {}),
})

const scaleXValue = ref(scaleX.get())

onMounted(() => {
  useMotionValueEvent(scaleX, 'change', (latest) => {
    scaleXValue.value = latest as number
  })
})

const progressClasses = computed(() => [
  'inset-x-0 top-0 h-1 origin-left',
  props.class,
])

const progressStyle = computed(() => ({
  scaleX: scaleXValue.value,
}))
</script>
