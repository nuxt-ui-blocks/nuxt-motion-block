<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    role="img"
    :aria-label="ariaLabel"
  >
    <div
      aria-hidden="true"
      :class="ui.inner({ class: uiProps.ui?.inner })"
    >
      <span
        v-if="props.prefix"
        :class="ui.prefix({ class: uiProps.ui?.prefix })"
      >{{ props.prefix }}</span>
      <span :class="ui.currency({ class: uiProps.ui?.currency })">{{ props.currency }}</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          v-for="(digit, index) in digits"
          :key="`${index}-${digit}`"
          :initial="{ y: 20, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :exit="{ y: -20, opacity: 0, transition: { type: 'tween', duration: 0.07 } }"
          :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
          :class="ui.digit({ class: uiProps.ui?.digit })"
        >
          {{ digit }}
        </motion.span>
      </AnimatePresence>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import priceFlow from '../theme/price-flow'

defineOptions({ inheritAttrs: false })

interface Props {
  value: number
  currency?: string
  prefix?: string
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  currency: '$',
  prefix: undefined,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'priceFlow',
  props,
  theme: priceFlow,
})

const currentValue = ref(props.value)
let intervalId: number | null = null

// Each digit rolls in its own fixed-width slot, so the number keeps a stable
// width and only the positions that actually changed swap their glyph. The
// slot count is monotonic: it grows to the widest value seen and never shrinks,
// which stops the layout from reflowing when a price rolls back down.
let slots = String(Math.round(props.value)).length

const digits = computed(() => {
  const next = String(Math.round(currentValue.value))
  slots = Math.max(slots, next.length)

  return next.padStart(slots, '\u00A0').split('')
})

const ariaLabel = computed(() => {
  const amount = String(Math.round(currentValue.value))
  return props.prefix ? `${props.prefix}${props.currency}${amount}` : `${props.currency}${amount}`
})

function animateToValue(target: number) {
  if (intervalId) cancelAnimationFrame(intervalId)

  const start = currentValue.value
  const diff = target - start

  if (diff === 0) return

  const duration = 600
  const startTime = performance.now()

  // Step through a fixed number of intermediate values rather than one per
  // frame. Every re-keyed digit mounts an entering span and leaves an exiting
  // one behind, so a per-frame ticker stacks dozens of overlapping glyphs on
  // top of each other; a handful of steps keeps the roll readable.
  const steps = 8
  const stepMs = duration / steps

  intervalId = requestAnimationFrame(function tick(now) {
    // Quantise on linear time, not on eased progress. An ease bunches every
    // step into the tail of the animation, which spaces them closer together
    // than a digit takes to finish exiting, and the glyphs pile up again. The
    // per-digit spring is what supplies the easing visually.
    const step = Math.min(Math.floor((now - startTime) / stepMs), steps)

    if (step >= steps) {
      currentValue.value = target
      intervalId = null
      return
    }

    currentValue.value = Math.round(start + diff * (step / steps))
    intervalId = requestAnimationFrame(tick)
  })
}

watch(() => props.value, (newVal) => {
  animateToValue(newVal)
})

onMounted(() => {
  currentValue.value = props.value
})

onUnmounted(() => {
  if (intervalId) cancelAnimationFrame(intervalId)
})
</script>
