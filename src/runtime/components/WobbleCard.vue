<template>
  <motion.div
    ref="cardRef"
    class="relative"
    :style="wobbleStyle"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <UCard
      :class="props.class"
      :ui="props.ui"
      class="h-full"
    >
      <template
        v-if="$slots.header"
        #header
      >
        <slot name="header" />
      </template>
      <slot />
      <template
        v-if="$slots.footer"
        #footer
      >
        <slot name="footer" />
      </template>
    </UCard>
  </motion.div>
</template>

<script setup lang="ts">
// @ts-ignore
import type { UCardProps } from '#ui/types'
import { ref, computed } from 'vue'
import { motion } from 'motion-v'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: UCardProps['ui']
  intensity?: number
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  intensity: 10,
  speed: 300,
})

const cardRef = ref<HTMLElement>()
const rotateX = ref(0)
const rotateY = ref(0)
const isHovering = ref(false)

const wobbleStyle = computed(() => ({
  transform: isHovering.value
    ? `perspective(800px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale3d(1.03,1.03,1.03)`
    : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
  transition: isHovering.value
    ? 'none'
    : `transform ${props.speed}ms cubic-bezier(0.03,0.98,0.52,0.99)`,
}))

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value) return
  isHovering.value = true
  const rect = cardRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  rotateY.value = ((e.clientX - centerX) / (rect.width / 2)) * props.intensity
  rotateX.value = (-(e.clientY - centerY) / (rect.height / 2)) * props.intensity
}

function handleMouseLeave() {
  isHovering.value = false
  rotateX.value = 0
  rotateY.value = 0
}
</script>
