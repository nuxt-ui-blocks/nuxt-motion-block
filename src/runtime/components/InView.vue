<template>
  <Motion
    ref="containerRef"
    :as="as"
    :class="props.class"
    :initial="finalVariants.hidden"
    :animate="shouldAnimate ? finalVariants.visible : finalVariants.hidden"
    :transition="transition"
    @animation-start="onMotionStart"
    @animation-complete="onMotionComplete"
  >
    <slot />
  </Motion>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Motion } from 'motion-v'
import { useElementVisibility } from '@vueuse/core'
import type { VariantType, Transition } from 'motion-v'

// Types
interface Variants {
  hidden: VariantType
  visible: VariantType
}

interface ViewOptions {
  margin?: string
  threshold?: number | number[]
}

interface InViewProps {
  variants?: Variants
  transition?: Transition
  viewOptions?: ViewOptions
  /**
   * Element tag to render. Constrained to real HTML tags because motion-v types
   * `<Motion as>` generically: a widened `string` infers the tag as `string`, and
   * Vue's `keyof IntrinsicElementAttributes` collapses to `string | number`, which
   * sends the component's own prop types into an index-signature branch typed
   * `never` and rejects every other binding.
   */
  as?: keyof HTMLElementTagNameMap
  once?: boolean
  class?: string
  onAnimationStart?: () => void
  onAnimationComplete?: () => void
}

// Props with defaults
const props = withDefaults(defineProps<InViewProps>(), {
  variants: () => ({ hidden: { opacity: 0 }, visible: { opacity: 1 } }),
  transition: () => ({ duration: 0.6, ease: 'easeOut' }),
  viewOptions: () => ({ margin: '0px', threshold: 0.1 }),
  as: 'div',
  once: true,
  class: '',
})

// Emits
const emit = defineEmits<{
  animationStart: []
  animationComplete: []
}>()

// Refs and reactive state
const containerRef = ref<HTMLElement | null>(null)
const hasAnimated = ref(false)

// Setup viewport detection using VueUse
const isInView = useElementVisibility(containerRef, {
  rootMargin: props.viewOptions?.margin || '0px',
  threshold: props.viewOptions?.threshold || 0.1,
})

// Default variants with fallback
const defaultVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

// Computed variants combining defaults with props
const finalVariants = computed<Variants>(() => ({
  hidden: { ...defaultVariants.hidden, ...(props.variants?.hidden || {}) },
  visible: { ...defaultVariants.visible, ...(props.variants?.visible || {}) },
}))

// Animation state logic
const shouldAnimate = computed(() => {
  if (!props.once) {
    return isInView.value
  }
  // For 'once' mode, only animate if in view AND haven't animated yet
  if (isInView.value && !hasAnimated.value) {
    return true
  }
  // If already animated, stay in visible state
  if (hasAnimated.value) {
    return true
  }
  return false
})

// Watch for visibility changes and mark as animated
watch(isInView, (newValue) => {
  if (newValue && props.once && !hasAnimated.value) {
    hasAnimated.value = true
  }
})

// Animation event handlers
const onMotionStart = () => {
  emit('animationStart')
  props.onAnimationStart?.()
}

const onMotionComplete = () => {
  emit('animationComplete')
  props.onAnimationComplete?.()
}
</script>
