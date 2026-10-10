<template>
  <component
    :is="component"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.className, uiProps.class] })"
    :aria-label="text"
    :style="style"
  >
    <AnimatePresence
      mode="popLayout"
      :initial="false"
    >
      <!-- @vue-ignore -->
      <Motion
        v-for="character in characters"
        :key="character.id"
        :layout-id="character.id"
        :class="ui.char({ class: uiProps.ui?.char })"
        aria-hidden="true"
        :initial="computedVariants.initial"
        :animate="computedVariants.animate"
        :exit="computedVariants.exit"
        :transition="computedTransition"
      >
        {{ character.label }}
      </Motion>
    </AnimatePresence>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Motion, AnimatePresence } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import textMorph from '../theme/text-morph'

interface Variant {
  [key: string]: any
}

interface Variants {
  initial?: Variant
  animate?: Variant
  exit?: Variant
}

interface TextMorphProps {
  text?: string
  as?: string
  className?: string
  style?: object
  variants?: Variants
  transition?: object
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<TextMorphProps>(), {
  text: '',
  as: 'p',
  className: '',
  style: () => ({}),
  variants: () => ({}),
  transition: () => ({}),
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'textMorph', props, theme: textMorph })

// Use a counter to ensure unique IDs across renders
const renderCount = ref(0)

// Generate unique characters with IDs
const characters = computed(() => {
  if (!props.text) return []

  const charCounts: Record<string, number> = {}

  return props.text.split('').map((char, index) => {
    const lowerChar = char.toLowerCase()
    charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1

    return {
      id: `char-${renderCount.value}-${index}-${lowerChar}${charCounts[lowerChar]}`,
      label: char === ' ' ? '\u00A0' : char,
    }
  })
})

// Default variants with more pronounced morphing effect
const defaultVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.8,
    rotateX: -45,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.2,
    rotateX: 45,
    filter: 'blur(4px)',
  },
}

// Default transition with spring physics
const defaultTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
  mass: 0.5,
}

// Compute variants with fallback to defaults
const computedVariants = computed(() => {
  return {
    initial: props.variants?.initial || defaultVariants.initial,
    animate: props.variants?.animate || defaultVariants.animate,
    exit: props.variants?.exit || defaultVariants.exit,
  }
})

// Compute transition with fallback to default
const computedTransition = computed(() => {
  return {
    ...defaultTransition,
    ...props.transition,
  }
})

// Determine the component to render
const component = computed(() => props.as)

// Force re-render when text changes
watch(() => props.text, () => {
  renderCount.value++
  // This ensures new animations are triggered
})
</script>
