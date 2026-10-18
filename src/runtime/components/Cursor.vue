<template>
  <Motion
    ref="cursorRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="cursorStyle"
  >
    <AnimatePresence>
      <Motion
        v-if="isVisible"
        initial="initial"
        animate="animate"
        exit="exit"
        :variants="variants"
        :transition="transition"
      >
        <slot />
      </Motion>
    </AnimatePresence>
  </Motion>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick, type ComponentPublicInstance } from 'vue'
import { useMotionValue, useSpring, AnimatePresence, Motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import cursor from '../theme/cursor'

// Types
interface SpringOptions {
  stiffness?: number
  damping?: number
  mass?: number
  duration?: number
}

interface Transition {
  duration?: number
  ease?: string
  [key: string]: any
}

interface Variant {
  [key: string]: any
}

interface CursorProps {
  class?: string
  ui?: Record<string, any>
  springConfig?: SpringOptions
  attachToParent?: boolean
  transition?: Transition
  variants?: {
    initial: Variant
    animate: Variant
    exit: Variant
  }
  onPositionChange?: (x: number, y: number) => void
}

const props = withDefaults(defineProps<CursorProps>(), {
  class: undefined,
  ui: undefined,
  attachToParent: false,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'cursor',
  props,
  theme: cursor,
})

// Refs
const cursorRef = ref<ComponentPublicInstance | HTMLElement | null>(null)
const isVisible = ref(!props.attachToParent)
const parentElement = ref<HTMLElement | null>(null)
const isInsideParent = ref(false)

// Motion values
const cursorX = useMotionValue(0)
const cursorY = useMotionValue(0)

// Spring values
const cursorXSpring = useSpring(cursorX, props.springConfig || { duration: 0 })
const cursorYSpring = useSpring(cursorY, props.springConfig || { duration: 0 })

// Computed style
const cursorStyle = {
  x: cursorXSpring,
  y: cursorYSpring,
  translateX: '-50%',
  translateY: '-50%',
}

// Get the actual DOM element from the Motion component
const getDomElement = () => {
  if (!cursorRef.value) return null

  // Try to get the DOM element from the Motion component
  // This might vary depending on the motion-v version
  if ('$el' in cursorRef.value) {
    return cursorRef.value.$el as HTMLElement
  }

  // Fallback: try to get the first child element
  if ('firstElementChild' in cursorRef.value) {
    return cursorRef.value.firstElementChild as HTMLElement
  }

  return null
}

// Check if cursor is inside parent container
const checkIfInsideParent = (x: number, y: number): boolean => {
  if (!parentElement.value || !props.attachToParent) return false

  const rect = parentElement.value.getBoundingClientRect()
  return (
    x >= rect.left
    && x <= rect.right
    && y >= rect.top
    && y <= rect.bottom
  )
}

// Initialize cursor position
onMounted(() => {
  if (typeof window !== 'undefined') {
    cursorX.set(window.innerWidth / 2)
    cursorY.set(window.innerHeight / 2)
  }

  // Set cursor style based on attachToParent
  if (!props.attachToParent) {
    document.body.style.cursor = 'none'
    isVisible.value = true
  }
  else {
    document.body.style.cursor = 'auto'
    isVisible.value = false

    // Wait for DOM to be fully rendered before getting parent
    nextTick(() => {
      const element = getDomElement()
      if (element && element.parentElement) {
        parentElement.value = element.parentElement
        parentElement.value.style.cursor = 'auto'
      }
    })
  }
})

// Mouse movement handler
const updatePosition = (e: MouseEvent) => {
  cursorX.set(e.clientX)
  cursorY.set(e.clientY)
  props.onPositionChange?.(e.clientX, e.clientY)

  // Check if cursor is inside parent when attachToParent is true
  if (props.attachToParent && parentElement.value) {
    const inside = checkIfInsideParent(e.clientX, e.clientY)

    // Only update visibility if it changed
    if (inside !== isInsideParent.value) {
      isInsideParent.value = inside
      isVisible.value = inside
    }
  }
}

// Add event listeners
onMounted(() => {
  document.addEventListener('mousemove', updatePosition)
})

// Remove event listeners
onUnmounted(() => {
  document.removeEventListener('mousemove', updatePosition)
  document.body.style.cursor = 'auto'

  // Reset parent cursor style
  if (parentElement.value) {
    parentElement.value.style.cursor = 'auto'
  }
})

// Watch for changes in attachToParent
watch(() => props.attachToParent, (newValue) => {
  if (!newValue) {
    document.body.style.cursor = 'none'
    isVisible.value = true
    isInsideParent.value = false
  }
  else {
    document.body.style.cursor = 'auto'
    isVisible.value = false
    isInsideParent.value = false

    // Get parent element when attachToParent becomes true
    nextTick(() => {
      const element = getDomElement()
      if (element && element.parentElement) {
        parentElement.value = element.parentElement
        parentElement.value.style.cursor = 'auto'
      }
    })
  }
})
</script>
