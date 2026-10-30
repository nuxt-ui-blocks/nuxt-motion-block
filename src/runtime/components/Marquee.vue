<template>
  <div
    :class="ui.root({ class: [vertical ? 'flex-col' : 'flex-row', uiProps.ui?.root, uiProps.class] })"
    :style="{ gap: `${gap}px` }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div
      v-for="copy in repeat"
      :key="copy"
      :aria-hidden="copy > 1 ? 'true' : undefined"
      :class="vertical
        ? ui.trackVertical({ class: uiProps.ui?.track })
        : ui.track({ class: uiProps.ui?.track })"
      :style="trackStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import marquee from '../theme/marquee'

export interface MarqueeProps {
  /** Extra classes for the viewport. */
  class?: string
  /** Seconds for one full pass of the content. */
  duration?: number
  /** Space between items, in pixels. */
  gap?: number
  /** Stop the scroll while the pointer is over the viewport. */
  pauseOnHover?: boolean
  /** How many copies of the content to render. Two is the minimum for a seamless loop. */
  repeat?: number
  /** Scroll from right to left instead of left to right. */
  reverse?: boolean
  ui?: Record<string, any>
  /** Stack the items and scroll bottom to top. */
  vertical?: boolean
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  class: undefined,
  duration: 40,
  gap: 16,
  pauseOnHover: false,
  repeat: 4,
  reverse: false,
  ui: undefined,
  vertical: false,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'marquee', props, theme: marquee })

const shouldReduceMotion = useReducedMotion()
const hovered = ref(false)

const trackStyle = computed(() => ({
  'animationDuration': `${props.duration}s`,
  'animationDirection': props.reverse ? 'reverse' : 'normal',
  'animationPlayState': shouldReduceMotion.value || (props.pauseOnHover && hovered.value) ? 'paused' : 'running',
  'gap': `${props.gap}px`,
  // The keyframes need the same gap the tracks are separated by, or the seam jumps.
  '--mb-marquee-gap': `${props.gap}px`,
}))

const onEnter = () => {
  hovered.value = true
}

const onLeave = () => {
  hovered.value = false
}
</script>

<style scoped>
.mb-marquee-x {
  animation-name: mb-marquee-x;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

.mb-marquee-y {
  animation-name: mb-marquee-y;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

@keyframes mb-marquee-x {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-100% - var(--mb-marquee-gap, 0px)));
  }
}

@keyframes mb-marquee-y {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(calc(-100% - var(--mb-marquee-gap, 0px)));
  }
}
</style>
