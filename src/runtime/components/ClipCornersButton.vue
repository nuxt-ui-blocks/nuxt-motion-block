<template>
  <div
    class="relative inline-block"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Top-left triangle -->
    <motion.div
      class="absolute pointer-events-none z-20"
      :style="{ top: `${inset}px`, left: `${inset}px`, width: `${s}px`, height: `${s}px` }"
      :initial="false"
      :animate="shouldReduceMotion || !isHoverDevice ? {} : { x: isHovered ? move : 0, y: isHovered ? move : 0 }"
      :transition="shouldReduceMotion ? { duration: 0 } : springTransition"
    >
      <svg
        :width="s"
        :height="s"
        viewBox="0 0 8 8"
      >
        <polygon
          points="0,0 8,0 0,8"
          :fill="triangleColor"
        />
      </svg>
    </motion.div>

    <!-- Top-right triangle -->
    <motion.div
      class="absolute pointer-events-none z-20"
      :style="{ top: `${inset}px`, right: `${inset}px`, width: `${s}px`, height: `${s}px` }"
      :initial="false"
      :animate="shouldReduceMotion || !isHoverDevice ? {} : { x: isHovered ? -move : 0, y: isHovered ? move : 0 }"
      :transition="shouldReduceMotion ? { duration: 0 } : springTransition"
    >
      <svg
        :width="s"
        :height="s"
        viewBox="0 0 8 8"
      >
        <polygon
          points="8,0 8,8 0,0"
          :fill="triangleColor"
        />
      </svg>
    </motion.div>

    <!-- Bottom-left triangle -->
    <motion.div
      class="absolute pointer-events-none z-20"
      :style="{ bottom: `${inset}px`, left: `${inset}px`, width: `${s}px`, height: `${s}px` }"
      :initial="false"
      :animate="shouldReduceMotion || !isHoverDevice ? {} : { x: isHovered ? move : 0, y: isHovered ? -move : 0 }"
      :transition="shouldReduceMotion ? { duration: 0 } : springTransition"
    >
      <svg
        :width="s"
        :height="s"
        viewBox="0 0 8 8"
      >
        <polygon
          points="0,8 8,8 0,0"
          :fill="triangleColor"
        />
      </svg>
    </motion.div>

    <!-- Bottom-right triangle -->
    <motion.div
      class="absolute pointer-events-none z-20"
      :style="{ bottom: `${inset}px`, right: `${inset}px`, width: `${s}px`, height: `${s}px` }"
      :initial="false"
      :animate="shouldReduceMotion || !isHoverDevice ? {} : { x: isHovered ? -move : 0, y: isHovered ? -move : 0 }"
      :transition="shouldReduceMotion ? { duration: 0 } : springTransition"
    >
      <svg
        :width="s"
        :height="s"
        viewBox="0 0 8 8"
      >
        <polygon
          points="8,8 0,8 8,0"
          :fill="triangleColor"
        />
      </svg>
    </motion.div>

    <!-- UButton as sibling, renders label from $attrs or slot content -->
    <UButton v-bind="$attrs">
      <slot />
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { motion } from 'motion-v'
import { useHoverCapable } from '../composables/useHoverCapable'

interface Props {
  triangleColor?: string
  triangleSize?: number
  triangleInset?: number
}

const props = withDefaults(defineProps<Props>(), {
  triangleColor: 'var(--ui-background)',
  triangleSize: 8,
  triangleInset: 4,
})

defineOptions({ inheritAttrs: false })

const s = computed(() => props.triangleSize)
const inset = computed(() => props.triangleInset)
const move = computed(() => Math.round(s.value * 0.5))

const isHovered = ref(false)
const isHoverDevice = useHoverCapable()
const shouldReduceMotion = ref(false)

const springTransition = {
  damping: 24,
  type: 'spring' as const,
  stiffness: 400,
}

onMounted(() => {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  shouldReduceMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', (e) => {
    shouldReduceMotion.value = e.matches
  })
})

function onMouseEnter() {
  if (isHoverDevice.value) {
    isHovered.value = true
  }
}

function onMouseLeave() {
  isHovered.value = false
}
</script>
