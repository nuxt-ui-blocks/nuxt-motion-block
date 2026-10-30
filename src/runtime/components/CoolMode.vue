<template>
  <div
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @pointerdown="onPointerDown"
  >
    <slot />

    <Motion
      v-for="particle in particles"
      :key="particle.id"
      as="span"
      aria-hidden="true"
      :class="ui.particle({ class: uiProps.ui?.particle })"
      :style="{
        left: `${particle.x}px`,
        top: `${particle.y}px`,
        fontSize: `${particle.size}px`,
      }"
      :initial="{ opacity: 1, x: 0, y: 0, scale: 0.5, rotate: 0 }"
      :animate="{
        opacity: 0,
        x: particle.dx,
        y: particle.dy,
        scale: 1.1,
        rotate: particle.rotate,
      }"
      :transition="{ duration: particle.duration, ease: 'easeOut' }"
    >
      {{ particle.emoji }}
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import coolMode from '../theme/cool-mode'

export interface CoolModeProps {
  /** Extra classes for the wrapper. */
  class?: string
  /** Turn the burst off without removing the wrapper. */
  disabled?: boolean
  /** Emoji thrown on each press. */
  emoji?: string
  /** How many emoji one press throws. */
  particleCount?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<CoolModeProps>(), {
  class: undefined,
  disabled: false,
  emoji: '🎉',
  particleCount: 12,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'coolMode', props, theme: coolMode })

const shouldReduceMotion = useReducedMotion()

interface Particle {
  dx: number
  dy: number
  duration: number
  emoji: string
  id: number
  rotate: number
  size: number
  x: number
  y: number
}

const rootRef = ref<HTMLElement | null>(null)
const particles = ref<Particle[]>([])

const timers = new Set<ReturnType<typeof setTimeout>>()
let nextId = 0

const onPointerDown = (event: PointerEvent) => {
  const root = rootRef.value
  if (!root || props.disabled || shouldReduceMotion.value) {
    return
  }

  const rect = root.getBoundingClientRect()
  const originX = event.clientX - rect.left
  const originY = event.clientY - rect.top

  const burst: Particle[] = Array.from({ length: props.particleCount }, () => {
    const angle = Math.random() * Math.PI * 2
    const distance = 50 + Math.random() * 90

    return {
      id: nextId++,
      emoji: props.emoji,
      x: originX,
      y: originY,
      dx: Math.cos(angle) * distance,
      // Biased upward, so the burst arcs instead of sitting flat on the press.
      dy: Math.sin(angle) * distance - 40,
      rotate: (Math.random() - 0.5) * 180,
      size: 14 + Math.random() * 10,
      duration: 0.8 + Math.random() * 0.3,
    }
  })

  particles.value = [...particles.value, ...burst]

  const ids = new Set(burst.map(particle => particle.id))
  const timer = setTimeout(() => {
    particles.value = particles.value.filter(particle => !ids.has(particle.id))
    timers.delete(timer)
  }, 1200)

  timers.add(timer)
}

onBeforeUnmount(() => {
  for (const timer of timers) {
    clearTimeout(timer)
  }
  timers.clear()
})
</script>
