<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <svg
      v-if="path"
      aria-hidden="true"
      :class="ui.path({ class: uiProps.ui?.path })"
      fill="none"
    >
      <circle
        cx="50%"
        cy="50%"
        :r="radius"
        :class="ui.pathCircle({ class: uiProps.ui?.pathCircle })"
        stroke-width="1"
      />
    </svg>

    <!--
      One full-size layer per orbit item. Rotating the layer about its own centre
      and pushing the child out by `radius` puts it on the circle; the matching
      counter-rotation keeps the child upright, so an icon never ends up
      upside-down at the bottom of the orbit.
    -->
    <div
      :class="ui.orbit({ class: uiProps.ui?.orbit })"
      :style="orbitStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import orbitingCircles from '../theme/orbiting-circles'

export interface OrbitingCirclesProps {
  /** Extra classes for the orbit layer. */
  class?: string
  /** Seconds to wait before the orbit starts. */
  delay?: number
  /** Seconds for one full revolution at `speed` 1. */
  duration?: number
  /** Draw the faint circle the items travel along. */
  path?: boolean
  /** Radius of the orbit in pixels. */
  radius?: number
  /** Travel counter-clockwise. */
  reverse?: boolean
  /** Multiplier on `duration`. `2` orbits twice as fast. */
  speed?: number
  /** Where on the circle the item starts, in degrees. `0` is the top. */
  startAngle?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<OrbitingCirclesProps>(), {
  class: undefined,
  delay: 0,
  duration: 20,
  path: true,
  radius: 50,
  reverse: false,
  speed: 1,
  startAngle: 0,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'orbitingCircles',
  props,
  theme: orbitingCircles,
})

/** A zero or negative `speed` would divide by zero and stop the orbit dead. */
const orbitDuration = computed(() => props.duration / Math.max(props.speed, 0.01))

const orbitStyle = computed(() => ({
  '--radius': `${props.radius}px`,
  '--duration': `${orbitDuration.value}s`,
  '--delay': `${props.delay}s`,
  '--angle': `${props.startAngle}deg`,
  'animation-direction': props.reverse ? 'reverse' : 'normal',
}))
</script>

<style scoped>
.orbit {
  animation: m-orbit var(--duration) linear infinite;
  animation-delay: var(--delay);
  transform: translateZ(0);
  will-change: transform;
}

@keyframes m-orbit {
  from {
    transform: rotate(var(--angle)) translateY(calc(var(--radius) * -1)) rotate(calc(var(--angle) * -1));
  }

  to {
    transform: rotate(calc(var(--angle) + 360deg)) translateY(calc(var(--radius) * -1)) rotate(calc(var(--angle) * -1 - 360deg));
  }
}

@media (prefers-reduced-motion: reduce) {
  .orbit {
    animation: none;
    transform: rotate(var(--angle)) translateY(calc(var(--radius) * -1)) rotate(calc(var(--angle) * -1));
  }
}
</style>
