<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useHoverCapable } from '../composables/useHoverCapable'

export interface TiltCardProps {
  /** Extra classes for the card surface. */
  class?: string
  /** Render the glare highlight that follows the pointer. */
  glare?: boolean
  /** Peak opacity of the glare, from 0 to 1. */
  glareOpacity?: number
  /** Maximum rotation in degrees at the card's edges. */
  maxTilt?: number
  /** Move descendants marked with `data-tilt-depth` as the pointer moves. */
  parallax?: boolean
  /** CSS perspective applied to the tilt, in pixels. */
  perspective?: number
  /** Scale applied while the pointer is over the card. */
  scale?: number
}

const props = withDefaults(defineProps<TiltCardProps>(), {
  class: undefined,
  glare: true,
  glareOpacity: 0.25,
  maxTilt: 12,
  parallax: false,
  perspective: 900,
  scale: 1.03,
})

/** Keyboard tilt is a fraction of the pointer tilt, fixed at the top-left. */
const FOCUS_TILT_RATIO = 0.35
/** Pixels a fully exposed depth layer travels at the card edge. */
const PARALLAX_STRENGTH = 24
const GLARE_CENTER = 50

const card = useTemplateRef<HTMLElement>('card')
const isHoverCapable = useHoverCapable()
const shouldReduceMotion = useReducedMotion()

const isInteractive = computed(
  () => isHoverCapable.value && shouldReduceMotion.value !== true,
)

function setTilt(
  x: number,
  y: number,
  scale: number,
  glareStrength: number,
  glareX = GLARE_CENTER,
  glareY = GLARE_CENTER,
) {
  const el = card.value

  if (!el) {
    return
  }

  el.style.setProperty('--tilt-rx', `${(-y * props.maxTilt).toFixed(2)}deg`)
  el.style.setProperty('--tilt-ry', `${(x * props.maxTilt).toFixed(2)}deg`)
  el.style.setProperty('--tilt-scale', String(scale))
  el.style.setProperty('--glare-x', `${glareX.toFixed(2)}%`)
  el.style.setProperty('--glare-y', `${glareY.toFixed(2)}%`)
  el.style.setProperty('--glare-opacity', String(glareStrength))
}

function setParallax(el: HTMLElement, x: number, y: number) {
  for (const child of el.querySelectorAll<HTMLElement>('[data-tilt-depth]')) {
    const raw = Number.parseFloat(child.dataset.tiltDepth ?? '0')
    const depth = Number.isFinite(raw) ? Math.min(1, Math.max(0, raw)) : 0

    child.style.transform = `translate3d(${(x * depth * PARALLAX_STRENGTH).toFixed(2)}px, ${(y * depth * PARALLAX_STRENGTH).toFixed(2)}px, 0)`
  }
}

function resetParallax(el: HTMLElement) {
  for (const child of el.querySelectorAll<HTMLElement>('[data-tilt-depth]')) {
    child.style.transform = 'translate3d(0, 0, 0)'
  }
}

function onPointerMove(event: PointerEvent) {
  const el = card.value

  if (!isInteractive.value || !el) {
    return
  }

  const rect = el.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const y = ((event.clientY - rect.top) / rect.height) * 2 - 1
  const range = GLARE_CENTER

  setTilt(
    x,
    y,
    props.scale,
    props.glareOpacity,
    GLARE_CENTER + x * range,
    GLARE_CENTER + y * range,
  )

  if (props.parallax) {
    setParallax(el, x, y)
  }
}

function onPointerLeave() {
  const el = card.value

  if (!isInteractive.value || !el) {
    return
  }

  setTilt(0, 0, 1, 0)

  if (props.parallax) {
    resetParallax(el)
  }
}

function onFocus() {
  if (!isInteractive.value) {
    return
  }

  setTilt(-FOCUS_TILT_RATIO, -FOCUS_TILT_RATIO, props.scale, 0)
}

function onBlur() {
  if (!isInteractive.value) {
    return
  }

  setTilt(0, 0, 1, 0)
}
</script>

<template>
  <div
    ref="card"
    :class="['tilt-card relative', props.class]"
    :style="{
      '--glare-opacity': 0,
      '--glare-x': '50%',
      '--glare-y': '50%',
      '--tilt-perspective': `${props.perspective}px`,
      '--tilt-rx': '0deg',
      '--tilt-ry': '0deg',
      '--tilt-scale': 1,
    }"
    @focusin="onFocus"
    @focusout="onBlur"
    @pointerleave="onPointerLeave"
    @pointermove="onPointerMove"
  >
    <slot />

    <div
      v-if="props.glare"
      aria-hidden="true"
      class="tilt-card-glare pointer-events-none absolute inset-0 rounded-[inherit]"
    />
  </div>
</template>

<style scoped>
.tilt-card {
  transform: perspective(var(--tilt-perspective)) rotateX(var(--tilt-rx))
    rotateY(var(--tilt-ry)) scale(var(--tilt-scale));
  transform-style: preserve-3d;
  transition: transform 200ms ease-out;
}

.tilt-card-glare {
  background-image: radial-gradient(
    circle at var(--glare-x) var(--glare-y),
    rgba(255, 255, 255, var(--glare-opacity)),
    transparent 60%
  );
}

@media (prefers-reduced-motion: reduce) {
  .tilt-card {
    transition: none;
  }
}
</style>
