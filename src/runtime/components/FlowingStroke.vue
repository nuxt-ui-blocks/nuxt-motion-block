<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import flowingStroke from '../theme/flowing-stroke'

const props = defineProps({
  width: { type: Number, default: 1200 },
  height: { type: Number, default: 220 },
  ribbon: { type: Number, default: 18 }, // base ribbon stroke width
  stripeInset: { type: Number, default: 4 }, // how much thinner the stripe layer is
  dash: { type: Number, default: 34 }, // dash length
  gap: { type: Number, default: 22 }, // gap length
  speed: { type: Number, default: 1 }, // multiplier for stripe travel speed
  class: { type: String, default: undefined },
  ui: { type: Object, default: undefined },
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'flowingStroke',
  props,
  theme: flowingStroke,
})

// hovered state
const hovered = ref(false)
// current offset (px) of the stripes animation
const stripeOffset = ref(0)
let rafId = null
let lastTime = 0

const totalDash = computed(() => props.dash + props.gap)

// simple wave path across canvas — tweak control points if you want different curve
const wavePath = computed(() => {
  const w = props.width
  const h = props.height
  return `
    M -40 ${h * 0.68}
    C ${w * 0.08} ${h * 0.15}, ${w * 0.18} ${h * 1.05}, ${w * 0.28} ${h * 0.68}
    S ${w * 0.48} ${h * 0.25}, ${w * 0.58} ${h * 0.68}
    S ${w * 0.78} ${h * 0.96}, ${w * 0.88} ${h * 0.6}
    S ${w * 1.08} ${h * 0.45}, ${w + 40} ${h * 0.68}
  `
})

function startLoop() {
  lastTime = performance.now()
  function loop(now) {
    const dt = now - lastTime
    lastTime = now

    if (hovered.value) {
      // pixels per second base; tweak baseSpeed (120) to taste
      const baseSpeed = 120
      const pxThisFrame = (baseSpeed * props.speed * dt) / 1000
      stripeOffset.value = (stripeOffset.value + pxThisFrame) % totalDash.value
    }
    rafId = requestAnimationFrame(loop)
  }
  rafId = requestAnimationFrame(loop)
}

onMounted(() => startLoop())
onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="{ width: `${props.width}px`, height: `${props.height}px` }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <svg
      :width="props.width"
      :height="props.height"
      :viewBox="`0 0 ${props.width} ${props.height}`"
      :class="ui.svg({ class: uiProps.ui?.svg })"
      aria-hidden="true"
    >
      <!-- solid ribbon (background) -->
      <path
        :d="wavePath"
        fill="none"
        stroke="#d7c8ea"
        :stroke-width="props.ribbon"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- stripe layer (same path) -->
      <path
        :d="wavePath"
        fill="none"
        stroke="#bba7d8"
        :stroke-width="props.ribbon - props.stripeInset * 2"
        stroke-linecap="butt"
        stroke-linejoin="round"
        :stroke-dasharray="`${props.dash} ${props.gap}`"
        :stroke-dashoffset="`${-stripeOffset}px`"
        style="transition: stroke 200ms linear;"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  </div>
</template>

<style scoped>
/* small accessibility/UX: if user prefers reduced motion we avoid updates */
@media (prefers-reduced-motion: reduce) {
  path[stroke-dasharray] {
    stroke-dashoffset: 0 !important;
  }
}
</style>
