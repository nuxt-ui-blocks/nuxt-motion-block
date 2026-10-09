<template>
  <div :class="['[perspective:3000px] w-fit h-fit', containerClass]">
    <motion.div
      ref="cardRef"
      drag
      :drag-constraints="constraints"
      :style="{
        rotateX,
        rotateY,
        opacity,
        willChange: 'transform',
      }"
      :animate="controls"
      :while-hover="{ scale: 1.02 }"
      class="w-full h-full"
      @drag:start="onDragStart"
      @drag:end="onDragEnd"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <!-- Nuxt UI Card -->
      <UCard
        :ui="{
          root: [
            'relative min-h-96 w-80 overflow-hidden rounded-md bg-default dark:bg-default p-6 shadow-2xl transform-3d',
            props.class,
          ],
          body: 'relative z-10',
          header: 'relative z-10',
          footer: 'relative z-10',
        }"
      >
        <!-- Main content slot -->
        <slot />

        <!-- Header slot -->
        <template #header>
          <slot name="header" />
        </template>

        <!-- Footer slot -->
        <template #footer>
          <slot name="footer" />
        </template>

        <!-- Glare effect -->
        <motion.div
          :style="{ opacity: glareOpacity }"
          class="pointer-events-none absolute inset-0 bg-white select-none z-20"
        />
      </UCard>
    </motion.div>
  </div>
</template>

<script setup lang="ts">
import { motion, useMotionValue, useSpring, useTransform, animate, useVelocity, useAnimationControls } from 'motion-v'
import type { CardProps } from '#ui/components/Card.vue'
import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  class?: string
  containerClass?: string
  ui?: CardProps['ui']
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  containerClass: '',
})

// Motion values
const mouseX = useMotionValue(0)
const mouseY = useMotionValue(0)
const cardRef = ref<HTMLElement>()
const controls = useAnimationControls()

// Constraints for drag
const constraints = ref({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

// Physics configuration
const velocityX = useVelocity(mouseX)
const velocityY = useVelocity(mouseY)

const springConfig = {
  stiffness: 100,
  damping: 20,
  mass: 0.5,
}

// Transform springs
const rotateX = useSpring(
  useTransform(mouseY, [-300, 300], [25, -25]),
  springConfig,
)

const rotateY = useSpring(
  useTransform(mouseX, [-300, 300], [-25, 25]),
  springConfig,
)

const opacity = useSpring(
  useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
  springConfig,
)

const glareOpacity = useSpring(
  useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
  springConfig,
)

// Initialize constraints
onMounted(() => {
  updateConstraints()
  window.addEventListener('resize', updateConstraints)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateConstraints)
})

const updateConstraints = () => {
  if (import.meta.client) {
    constraints.value = {
      top: -window.innerHeight / 2,
      left: -window.innerWidth / 2,
      right: window.innerWidth / 2,
      bottom: window.innerHeight / 2,
    }
  }
}

// Event handlers
const handleMouseMove = (event: MouseEvent) => {
  if (!cardRef.value) return

  const { clientX, clientY } = event
  // @ts-ignore
  const rect = cardRef.value.$el.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const deltaX = clientX - centerX
  const deltaY = clientY - centerY

  mouseX.set(deltaX)
  mouseY.set(deltaY)
}

const handleMouseLeave = () => {
  mouseX.set(0)
  mouseY.set(0)
}

const onDragStart = () => {
  if (import.meta.client) {
    document.body.style.cursor = 'grabbing'
  }
}

const onDragEnd = (event: any) => {
  if (import.meta.client) {
    document.body.style.cursor = 'default'
  }

  controls.start({
    rotateX: 0,
    rotateY: 0,
    transition: {
      type: 'spring',
      ...springConfig,
    },
  })

  const currentVelocityX = velocityX.get()
  const currentVelocityY = velocityY.get()

  const velocityMagnitude = Math.sqrt(
    currentVelocityX * currentVelocityX + currentVelocityY * currentVelocityY,
  )
  const bounce = Math.min(0.8, velocityMagnitude / 1000)

  // Animate the bounce effect
  animate(event.point.x, event.point.x + currentVelocityX * 0.3, {
    duration: 0.8,
    ease: [0.2, 0, 0, 1],
    bounce,
    type: 'spring',
    stiffness: 50,
    damping: 15,
    mass: 0.8,
  })

  animate(event.point.y, event.point.y + currentVelocityY * 0.3, {
    duration: 0.8,
    ease: [0.2, 0, 0, 1],
    bounce,
    type: 'spring',
    stiffness: 50,
    damping: 15,
    mass: 0.8,
  })
}
</script>
