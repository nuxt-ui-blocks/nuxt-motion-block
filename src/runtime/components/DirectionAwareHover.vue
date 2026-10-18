<template>
  <div
    ref="cardRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Image container with scale to prevent blank spaces -->
    <motion.div
      :class="ui.imageWrapper({ class: uiProps.ui?.imageWrapper })"
      :animate="{
        scale: isHovered ? 1.1 : 1,
        transition: { duration: 0.3 },
      }"
    >
      <img
        alt="image"
        :class="ui.image({ class: [imageClass, uiProps.ui?.image] })"
        width="1000"
        height="1000"
        :src="imageUrl"
      >
      <div :class="ui.overlay({ class: uiProps.ui?.overlay })" />
    </motion.div>

    <!-- Animated content -->
    <AnimatePresence>
      <motion.div
        v-if="isHovered"
        :key="currentDirection"
        :class="ui.content({ class: uiProps.ui?.content })"
        :initial="getContentInitial()"
        :animate="getContentAnimate()"
        :exit="getContentExit()"
        :transition="{
          duration: 0.4,
          ease: 'easeOut',
        }"
      >
        <div :class="ui.text({ class: [childrenClass, uiProps.ui?.text] })">
          <slot name="content">
            <div :class="ui.details({ class: uiProps.ui?.details })">
              <h3 :class="ui.title({ class: uiProps.ui?.title })">
                Project Title
              </h3>
              <p :class="ui.description({ class: uiProps.ui?.description })">
                Description of the project
              </p>
              <UButton
                variant="solid"
                size="sm"
                :class="ui.button({ class: uiProps.ui?.button })"
              >
                View Project
              </UButton>
            </div>
          </slot>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'
import { ref } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import directionAwareHover from '../theme/direction-aware-hover'

interface Props {
  imageUrl: string
  childrenClass?: string
  imageClass?: string
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  childrenClass: '',
  imageClass: '',
  class: 'md:h-96 w-60 h-60 md:w-96',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'directionAwareHover',
  props,
  theme: directionAwareHover,
})

// Refs
const cardRef = ref<HTMLElement>()
const isHovered = ref(false)
const currentDirection = ref<'top' | 'bottom' | 'left' | 'right'>('left')

// Mouse handlers
const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseMove = (event: MouseEvent) => {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const width = rect.width
  const height = rect.height

  // Simple quadrant-based direction detection
  const centerX = width / 2
  const centerY = height / 2

  if (x < centerX && y < centerY) {
    currentDirection.value = 'top'
  }
  else if (x >= centerX && y < centerY) {
    currentDirection.value = 'top'
  }
  else if (x < centerX && y >= centerY) {
    currentDirection.value = 'bottom'
  }
  else {
    currentDirection.value = 'bottom'
  }

  // More precise left/right detection
  if (Math.abs(x - centerX) > Math.abs(y - centerY)) {
    currentDirection.value = x < centerX ? 'left' : 'right'
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
}

// Content animations
const getContentInitial = () => {
  switch (currentDirection.value) {
    case 'top': return { y: -20, opacity: 0 }
    case 'bottom': return { y: 20, opacity: 0 }
    case 'left': return { x: -20, opacity: 0 }
    case 'right': return { x: 20, opacity: 0 }
    default: return { y: -20, opacity: 0 }
  }
}

const getContentAnimate = () => {
  return { x: 0, y: 0, opacity: 1 }
}

const getContentExit = () => {
  switch (currentDirection.value) {
    case 'top': return { y: -20, opacity: 0 }
    case 'bottom': return { y: 20, opacity: 0 }
    case 'left': return { x: -20, opacity: 0 }
    case 'right': return { x: 20, opacity: 0 }
    default: return { y: -20, opacity: 0 }
  }
}
</script>
