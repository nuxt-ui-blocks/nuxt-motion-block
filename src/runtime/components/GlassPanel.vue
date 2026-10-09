<template>
  <div
    ref="cardRef"
    :class="cn('relative overflow-hidden', props.class)"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <UCard
      :ui="props.ui"
      class="relative z-10 backdrop-blur-md bg-default/10 dark:bg-default/30 border border-default/20 dark:border-default/10"
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

    <div
      v-if="props.backgroundImage"
      class="absolute inset-0 z-0 transition-transform duration-200 ease-out"
      :style="parallaxStyle"
    >
      <img
        :src="props.backgroundImage"
        class="w-full h-full object-cover scale-110"
        alt=""
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardProps } from '#ui/components/Card.vue'
import { ref, computed } from 'vue'
import { cn } from '../utils/merge'

defineOptions({ inheritAttrs: false })

interface Props {
  class?: string
  ui?: CardProps['ui']
  backgroundImage?: string
  parallax?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  backgroundImage: undefined,
  parallax: true,
})

const cardRef = ref<HTMLElement>()
const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)

const parallaxStyle = computed(() => {
  if (!props.parallax || !isHovering.value) {
    return { transform: 'translate(0, 0) scale(1.1)' }
  }
  const x = (mouseX.value - 0.5) * 20
  const y = (mouseY.value - 0.5) * 20
  return { transform: `translate(${x}px, ${y}px) scale(1.1)` }
})

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value || !props.parallax) return
  const rect = cardRef.value.getBoundingClientRect()
  isHovering.value = true
  mouseX.value = (e.clientX - rect.left) / rect.width
  mouseY.value = (e.clientY - rect.top) / rect.height
}

function handleMouseLeave() {
  isHovering.value = false
  mouseX.value = 0.5
  mouseY.value = 0.5
}
</script>
