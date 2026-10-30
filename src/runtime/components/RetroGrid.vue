<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="rootStyle"
  >
    <div :class="ui.tilt({ class: uiProps.ui?.tilt })">
      <div
        :class="ui.plane({ class: uiProps.ui?.plane })"
        :style="gridStyle"
      />
    </div>

    <!--
      The plane is a 300vh slab, so without a fade its far edge is a hard line
      across the viewport. Fading towards the horizon is what sells the illusion
      of the grid running off to infinity.
    -->
    <div
      v-if="fade"
      aria-hidden="true"
      :class="ui.fade({ class: uiProps.ui?.fade })"
      :style="fadeStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import retroGrid from '../theme/retro-grid'

export interface RetroGridProps {
  /** Tilt of the plane, in degrees. Lower values lay the grid flatter. */
  angle?: number
  /** Extra classes for the container. */
  class?: string
  /** Distance between grid lines, in pixels. */
  cellSize?: number
  /** Colour of the grid lines. Any CSS colour works. */
  color?: string
  /** Fade the grid out towards the horizon. */
  fade?: boolean
  /** Opacity of the grid lines. */
  opacity?: number
  /** Seconds for the grid to travel one cell towards the viewer. */
  speed?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<RetroGridProps>(), {
  angle: 65,
  class: undefined,
  cellSize: 60,
  color: 'var(--ui-border)',
  fade: true,
  opacity: 0.6,
  speed: 3,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'retroGrid', props, theme: retroGrid })

const rootStyle = computed(() => ({
  '--grid-angle': `${props.angle}deg`,
  '--cell-size': `${props.cellSize}px`,
  '--grid-color': props.color,
  '--grid-opacity': `${props.opacity}`,
  '--grid-speed': `${Math.max(props.speed, 0.1)}s`,
}))

const gridStyle = computed(() => ({
  'background-image': 'linear-gradient(to right, var(--grid-color) 1px, transparent 0), linear-gradient(to bottom, var(--grid-color) 1px, transparent 0)',
  'background-size': 'var(--cell-size) var(--cell-size)',
  'background-repeat': 'repeat',
  'opacity': 'var(--grid-opacity)',
  'height': '300vh',
  'width': '600vw',
  'margin-left': '-200%',
  'transform-origin': '100% 0 0',
  'inset': '0 0 auto 0',
}))

const fadeStyle = computed(() => ({
  background: 'linear-gradient(to bottom, var(--ui-bg) 0%, transparent 40%)',
}))
</script>

<style scoped>
.retro-grid {
  perspective: 200px;
}

.retro-grid-tilt {
  transform: rotateX(var(--grid-angle));
}

.retro-grid-plane {
  animation: m-retro-grid var(--grid-speed) linear infinite;
}

@keyframes m-retro-grid {
  0% {
    transform: translateY(-50%);
  }

  100% {
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .retro-grid-plane {
    animation: none;
  }
}
</style>
