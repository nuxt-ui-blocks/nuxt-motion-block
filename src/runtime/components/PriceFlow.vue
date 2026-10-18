<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    role="img"
    :aria-label="ariaLabel"
    v-bind="$attrs"
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
          :initial="{ y: 16, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :exit="{ y: -16, opacity: 0 }"
          :transition="{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.32, 1], delay: index * 0.04 }"
          :class="ui.digit({ class: uiProps.ui?.digit })"
        >
          {{ digit }}
        </motion.span>
      </AnimatePresence>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

// Each digit rolls in its own fixed-width slot, so the number keeps a stable
// width and only the positions that actually changed swap their glyph. The
// slot count is monotonic: it grows to the widest value seen and never shrinks,
// which stops the layout from reflowing when a price rolls back down.
let slots = String(Math.round(props.value)).length

const digits = computed(() => {
  const next = String(Math.round(props.value))
  slots = Math.max(slots, next.length)

  return next.padStart(slots, '\u00A0').split('')
})

const ariaLabel = computed(() => {
  const amount = String(Math.round(props.value))
  return props.prefix ? `${props.prefix}${props.currency}${amount}` : `${props.currency}${amount}`
})
</script>
