<template>
  <UCard
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :ui="uiProps.ui"
  >
    <!-- Card Header Slot -->
    <template #header>
      <slot name="header" />
    </template>
    <!-- Stars Animation Section -->
    <div
      :class="ui.stars({ class: uiProps.ui?.stars })"
      @mouseenter="mouseEnter = true"
      @mouseleave="mouseEnter = false"
    >
      <div :class="ui.grid({ class: uiProps.ui?.grid })">
        <div
          v-for="starIdx in 108"
          :key="starIdx"
          :class="ui.cell({ class: uiProps.ui?.cell })"
        >
          <motion.div
            :initial="{ scale: 1 }"
            :animate="{
              scale: mouseEnter || glowingStars.includes(starIdx-1) ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
              background: mouseEnter || glowingStars.includes(starIdx-1) ? '#fff' : '#666',
            }"
            :transition="{
              duration: 2,
              ease: 'easeInOut',
              delay: mouseEnter ? (starIdx-1) * 0.01 : ((starIdx-1) % 10) * 0.1,
            }"
            :class="ui.star({ class: uiProps.ui?.star })"
          />

          <motion.div
            v-if="mouseEnter || glowingStars.includes(starIdx-1)"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{
              duration: 2,
              ease: 'easeInOut',
              delay: mouseEnter ? (starIdx-1) * 0.01 : ((starIdx-1) % 10) * 0.1,
            }"
            :class="ui.glow({ class: [starBgClass, uiProps.ui?.glow] })"
          />
        </div>
      </div>
    </div>
    <!-- Default Slot for Content -->
    <div :class="ui.content({ class: uiProps.ui?.content })">
      <slot />
    </div>
    <!-- Card Footer Slot -->
    <template #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { onMounted, onUnmounted, ref } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import glowingStarsCard from '../theme/glowing-stars-card'

interface Props {
  starBgClass?: string
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  starBgClass: 'bg-primary-400 dark:bg-primary-500 shadow-primary-400/50 dark:shadow-primary-500/50',
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'glowingStarsCard', props, theme: glowingStarsCard })

const mouseEnter = ref(false)
const glowingStars = ref<number[]>([])

onMounted(() => {
  // Only run on client side
  if (typeof window !== 'undefined') {
    const interval = setInterval(() => {
      glowingStars.value = Array.from({ length: 5 }, () => Math.floor(Math.random() * 108))
    }, 3000)

    onUnmounted(() => {
      clearInterval(interval)
    })
  }
})
</script>
