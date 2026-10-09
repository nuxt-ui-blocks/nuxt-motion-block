<template>
  <div
    ref="cardRef"
    class="bg-transparent rounded-lg overflow-hidden group/card relative cursor-pointer"
    :class="props.class"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Image container with scale to prevent blank spaces -->
    <motion.div
      class="absolute inset-0 rounded-lg overflow-hidden"
      :animate="{
        scale: isHovered ? 1.1 : 1,
        transition: { duration: 0.3 },
      }"
    >
      <img
        alt="image"
        :class="['w-full h-full object-cover', imageClass]"
        width="1000"
        height="1000"
        :src="imageUrl"
      >
      <div class="absolute inset-0 bg-default/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
    </motion.div>

    <!-- Animated content -->
    <AnimatePresence>
      <motion.div
        v-if="isHovered"
        :key="currentDirection"
        class="absolute inset-0 z-10 p-4 flex items-end"
        :initial="getContentInitial()"
        :animate="getContentAnimate()"
        :exit="getContentExit()"
        :transition="{
          duration: 0.4,
          ease: 'easeOut',
        }"
      >
        <div :class="[childrenClass, 'text-inverted w-full']">
          <slot name="content">
            <div class="space-y-2">
              <h3 class="text-xl font-bold">
                Project Title
              </h3>
              <p class="text-inverted/80">
                Description of the project
              </p>
              <UButton
                variant="solid"
                size="sm"
                class="bg-default text-default hover:bg-default/90"
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

interface Props {
  imageUrl: string
  childrenClass?: string
  imageClass?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  childrenClass: '',
  imageClass: '',
  class: 'md:h-96 w-60 h-60 md:w-96',
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
