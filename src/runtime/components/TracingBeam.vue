<template>
  <motion.div
    ref="containerRef"
    :class="['relative mx-auto h-full w-full max-w-4xl', props.class]"
  >
    <div class="absolute top-3 -left-4 md:-left-20">
      <motion.div
        :transition="{
          duration: 0.2,
          delay: 0.5,
        }"
        :animate="{
          boxShadow: scrollProgress > 0 ? 'none' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }"
        class="border-default ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm"
      >
        <motion.div
          :transition="{
            duration: 0.2,
            delay: 0.5,
          }"
          :animate="{
            backgroundColor: scrollProgress > 0 ? 'rgb(255, 255, 255)' : 'rgb(16, 185, 129)',
            borderColor: scrollProgress > 0 ? 'rgb(255, 255, 255)' : 'rgb(5, 150, 105)',
          }"
          class="h-2 w-2 rounded-full border border-default bg-default"
        />
      </motion.div>
      <svg
        :viewBox="`0 0 20 ${svgHeight}`"
        width="20"
        :height="svgHeight"
        class="ml-4 block"
        aria-hidden="true"
      >
        <motion.path
          :d="`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`"
          fill="none"
          stroke="rgb(144, 145, 160)"
          stroke-opacity="0.16"
          :transition="{
            duration: 10,
          }"
        />
        <motion.path
          :d="`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`"
          fill="none"
          stroke="url(#gradient)"
          stroke-width="1.25"
          class="motion-reduce:hidden"
          :transition="{
            duration: 10,
          }"
        />
        <defs>
          <motion.linearGradient
            id="gradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            x2="0"
            :y1="y1"
            :y2="y2"
          >
            <stop
              :stop-color="props.beamColor[0]"
              stop-opacity="0"
            />
            <stop :stop-color="props.beamColor[0]" />
            <stop
              offset="0.325"
              :stop-color="props.beamColor[1]"
            />
            <stop
              offset="1"
              :stop-color="props.beamColor[2]"
              stop-opacity="0"
            />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
    <div ref="contentRef">
      <slot />
    </div>
  </motion.div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { onMounted, onUnmounted, ref } from 'vue'

interface TracingBeamProps {
  class?: string
  beamColor?: string[]
}

const props = withDefaults(defineProps<TracingBeamProps>(), {
  beamColor: () => ['#18CCFC', '#6344F5', '#AE48FF'],
})

const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const svgHeight = ref(0)
const scrollProgress = ref(0)

// Spring values for smooth animation
const y1 = ref(50)
const y2 = ref(50)

const updateScrollProgress = () => {
  if (!containerRef.value) return
  // @ts-ignore
  const rect = containerRef.value.$el.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const elementTop = rect.top
  const elementHeight = rect.height

  // Calculate how far the element is through the viewport
  const progress = Math.max(0, Math.min(1,
    (windowHeight - elementTop) / (windowHeight + elementHeight),
  ))

  scrollProgress.value = progress

  // Update spring values based on scroll progress
  y1.value = 50 + (svgHeight.value - 50) * Math.min(progress / 0.8, 1)
  y2.value = 50 + (svgHeight.value - 250) * progress
}

const updateSvgHeight = () => {
  if (contentRef.value) {
    svgHeight.value = contentRef.value.offsetHeight
  }
}

onMounted(() => {
  updateSvgHeight()
  window.addEventListener('scroll', updateScrollProgress)
  window.addEventListener('resize', updateSvgHeight)

  // Initial calculation
  updateScrollProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
  window.removeEventListener('resize', updateSvgHeight)
})
</script>
