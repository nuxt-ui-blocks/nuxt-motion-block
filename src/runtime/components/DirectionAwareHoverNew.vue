<template>
  <motion.div
    ref="cardRef"
    class="bg-transparent rounded-lg overflow-hidden group/card relative cursor-pointer"
    :class="props.class"
    @mouseenter="handleMouseEnter"
  >
    <AnimatePresence mode="wait">
      <motion.div
        class="relative h-full w-full overflow-hidden"
        initial="initial"
        :while-hover="direction"
        exit="exit"
      >
        <!-- Image Container -->
        <motion.div
          :variants="imageVariants"
          class="h-full w-full relative z-10"
          :transition="{
            duration: 0.2,
            ease: 'easeOut',
          }"
        >
          <!-- Image with larger scale to prevent any blank edges -->
          <img
            alt="image"
            :class="['h-full w-full object-cover min-w-[110%] min-h-[110%] absolute inset-0', imageClass]"
            :style="{
              left: '-5%',
              top: '-5%',
              width: '110%',
              height: '110%',
            }"
            width="1000"
            height="1000"
            :src="imageUrl"
          >
        </motion.div>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-default/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-20" />

        <!-- Content -->
        <motion.div
          :variants="contentVariants"
          :transition="{
            duration: 0.5,
            ease: 'easeOut',
          }"
          :class="['text-inverted absolute bottom-4 left-4 z-30', childrenClass]"
        >
          <slot name="content">
            <div class="space-y-2">
              <h3 class="text-xl font-bold">
                Project Title
              </h3>
              <p class="text-inverted/80">
                Project description goes here
              </p>
            </div>
          </slot>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </motion.div>
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
const direction = ref<string>('left')

// Mouse handler
const handleMouseEnter = (event: MouseEvent) => {
  if (!cardRef.value) return

  const calculatedDirection = getDirection(event, cardRef.value)

  switch (calculatedDirection) {
    case 0:
      direction.value = 'top'
      break
    case 1:
      direction.value = 'right'
      break
    case 2:
      direction.value = 'bottom'
      break
    case 3:
      direction.value = 'left'
      break
    default:
      direction.value = 'left'
      break
  }
}

// Exact React math for direction
const getDirection = (ev: MouseEvent, obj: HTMLElement) => {
  // @ts-ignore
  const { width: w, height: h, left, top } = obj.$el.getBoundingClientRect()
  const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1)
  const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1)
  const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4
  return d
}

// Variants matching React exactly
const imageVariants = {
  initial: {
    x: 0,
    y: 0,
  },
  exit: {
    x: 0,
    y: 0,
  },
  top: {
    y: 20,
  },
  bottom: {
    y: -20,
  },
  left: {
    x: 20,
  },
  right: {
    x: -20,
  },
}

const contentVariants = {
  initial: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  exit: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  top: {
    y: -20,
    opacity: 1,
  },
  bottom: {
    y: 2,
    opacity: 1,
  },
  left: {
    x: -2,
    opacity: 1,
  },
  right: {
    x: 20,
    opacity: 1,
  },
}
</script>
