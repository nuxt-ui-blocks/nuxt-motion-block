<template>
  <motion.div
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 1.5 }"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <!-- Left Side Animation -->
    <motion.div
      :animate="{ x: [0, xOffset, 0] }"
      :transition="{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }"
      :class="ui.left({ class: uiProps.ui?.left })"
    >
      <div
        :style="{
          transform: `translateY(${translateY}px) rotate(-45deg)`,
          background: gradientFirst,
          width: `${width}px`,
          height: `${height}px`,
        }"
        :class="ui.leftFirst({ class: uiProps.ui?.leftFirst })"
      />

      <div
        :style="{
          transform: 'rotate(-45deg) translate(5%, -50%)',
          background: gradientSecond,
          width: `${smallWidth}px`,
          height: `${height}px`,
        }"
        :class="ui.leftSecond({ class: uiProps.ui?.leftSecond })"
      />

      <div
        :style="{
          transform: 'rotate(-45deg) translate(-180%, -70%)',
          background: gradientThird,
          width: `${smallWidth}px`,
          height: `${height}px`,
        }"
        :class="ui.leftThird({ class: uiProps.ui?.leftThird })"
      />
    </motion.div>

    <!-- Right Side Animation -->
    <motion.div
      :animate="{ x: [0, -xOffset, 0] }"
      :transition="{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }"
      :class="ui.right({ class: uiProps.ui?.right })"
    >
      <div
        :style="{
          transform: `translateY(${translateY}px) rotate(45deg)`,
          background: gradientFirst,
          width: `${width}px`,
          height: `${height}px`,
        }"
        :class="ui.rightFirst({ class: uiProps.ui?.rightFirst })"
      />

      <div
        :style="{
          transform: 'rotate(45deg) translate(-5%, -50%)',
          background: gradientSecond,
          width: `${smallWidth}px`,
          height: `${height}px`,
        }"
        :class="ui.rightSecond({ class: uiProps.ui?.rightSecond })"
      />

      <div
        :style="{
          transform: 'rotate(45deg) translate(180%, -70%)',
          background: gradientThird,
          width: `${smallWidth}px`,
          height: `${height}px`,
        }"
        :class="ui.rightThird({ class: uiProps.ui?.rightThird })"
      />
    </motion.div>
  </motion.div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import animatedSpotlight from '../theme/animated-spotlight'

interface SpotlightProps {
  gradientFirst?: string
  gradientSecond?: string
  gradientThird?: string
  translateY?: number
  width?: number
  height?: number
  smallWidth?: number
  duration?: number
  xOffset?: number
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<SpotlightProps>(), {
  gradientFirst: 'radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)',
  gradientSecond: 'radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)',
  gradientThird: 'radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)',
  translateY: -350,
  width: 560,
  height: 1380,
  smallWidth: 240,
  duration: 7,
  xOffset: 100,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'animatedSpotlight',
  props,
  theme: animatedSpotlight,
})
</script>
