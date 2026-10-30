<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <!--
      The gradient is painted over the full box, then masked down to the padding
      ring by excluding the content box. That keeps the shine on the border no
      matter how the consumer changes the radius, and needs no extra element.
    -->
    <div
      aria-hidden="true"
      :class="ui.shine({ class: uiProps.ui?.shine })"
      :style="shineStyle"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import shineBorder from '../theme/shine-border'

export interface ShineBorderProps {
  /** Extra classes for the wrapper. */
  class?: string
  /** Colour of the travelling highlight. Any CSS colour works. */
  color?: string
  /** Seconds for one full loop of the highlight. */
  duration?: number
  /** Thickness of the lit ring, in pixels. */
  borderWidth?: number
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<ShineBorderProps>(), {
  class: undefined,
  color: 'var(--ui-primary)',
  duration: 14,
  borderWidth: 1,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'shineBorder', props, theme: shineBorder })

const RING = 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)'

const shineStyle = computed(() => ({
  '--shine-color': props.color,
  '--shine-duration': `${Math.max(props.duration, 0.1)}s`,
  'background-image': `radial-gradient(transparent, transparent, ${props.color}, transparent, transparent)`,
  'background-size': '300% 300%',
  'padding': `${props.borderWidth}px`,
  'mask': RING,
  '-webkit-mask': RING,
  'mask-composite': 'exclude',
  '-webkit-mask-composite': 'xor',
}))
</script>

<style scoped>
.shine {
  animation: m-shine var(--shine-duration) linear infinite;
}

@keyframes m-shine {
  0% {
    background-position: 0% 0%;
  }

  50% {
    background-position: 100% 100%;
  }

  100% {
    background-position: 0% 0%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shine {
    animation: none;
    background-position: 50% 50%;
  }
}
</style>
