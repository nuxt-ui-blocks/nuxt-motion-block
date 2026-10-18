<template>
  <motion.div
    ref="cardRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @mouseenter="handleMouseEnter"
  >
    <AnimatePresence mode="wait">
      <motion.div
        :class="ui.inner({ class: uiProps.ui?.inner })"
        initial="initial"
        :while-hover="direction"
        exit="exit"
      >
        <!-- Image Container -->
        <motion.div
          :variants="imageVariants"
          :class="ui.imageWrapper({ class: uiProps.ui?.imageWrapper })"
          :transition="{
            duration: 0.2,
            ease: 'easeOut',
          }"
        >
          <!-- Image with larger scale to prevent any blank edges -->
          <img
            alt="image"
            :class="ui.image({ class: [uiProps.ui?.image, props.imageClass] })"
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
        <div :class="ui.overlay({ class: uiProps.ui?.overlay })" />

        <!-- Content -->
        <motion.div
          :variants="contentVariants"
          :transition="{
            duration: 0.5,
            ease: 'easeOut',
          }"
          :class="ui.content({ class: [uiProps.ui?.content, props.childrenClass] })"
        >
          <slot name="content">
            <div :class="ui.contentBody({ class: uiProps.ui?.contentBody })">
              <h3 :class="ui.title({ class: uiProps.ui?.title })">
                Project Title
              </h3>
              <p :class="ui.description({ class: uiProps.ui?.description })">
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
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import directionAwareHoverNew from '../theme/direction-aware-hover-new'

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

const { props: uiProps, ui } = useMotionBlockUI({ name: 'directionAwareHoverNew', props, theme: directionAwareHoverNew })

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
