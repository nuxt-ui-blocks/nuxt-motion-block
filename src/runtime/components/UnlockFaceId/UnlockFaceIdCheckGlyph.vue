<template>
  <motion.g
    :animate="{ opacity: 1, scale: 1 }"
    :initial="props.canAnimate ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }"
    :style="GLYPH_TRANSFORM_ORIGIN"
    :transition="props.canAnimate ? CHECK_SPRING : INSTANT"
    data-unlock-check-glyph
  >
    <motion.path
      :animate="{ pathLength: 1 }"
      :d="CHECK_PATH"
      :initial="props.canAnimate ? { pathLength: 0 } : { pathLength: 1 }"
      :stroke="SUCCESS_STROKE"
      :transition="props.canAnimate ? CHECK_SPRING : INSTANT"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="CHECK_STROKE_WIDTH"
    />
  </motion.g>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { CHECK_PATH, CHECK_SPRING, CHECK_STROKE_WIDTH, INSTANT } from './constants'

interface Props {
  canAnimate: boolean
}

const props = defineProps<Props>()

const SUCCESS_STROKE = 'var(--ui-success, #22c55e)'

const GLYPH_TRANSFORM_ORIGIN = { transformBox: 'view-box', transformOrigin: '50px 50px' }
</script>
