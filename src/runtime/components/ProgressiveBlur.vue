<template>
  <div
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class, props.className] })"
    :style="offsetStyle"
  >
    <!-- @vue-ignore -->
    <Motion
      v-for="(style, index) in layerStyles"
      :key="index"
      tag="div"
      :class="ui.layer({ class: uiProps.ui?.layer })"
      :style="style"
      :initial="initial"
      :animate="animate"
      :variants="variants"
      :transition="transition"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import progressiveBlur from '../theme/progressive-blur'

const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
} as const

type Direction = keyof typeof GRADIENT_ANGLES

interface Props {
  direction?: Direction
  blurLayers?: number
  className?: string
  blurIntensity?: number
  animate?: string | object
  variants?: object
  transition?: object
  initial?: string | object
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'bottom',
  blurLayers: 8,
  className: '',
  blurIntensity: 0.25,
  animate: undefined,
  variants: undefined,
  transition: undefined,
  initial: undefined,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'progressiveBlur',
  props,
  theme: progressiveBlur,
})

const layers = computed(() => Math.max(props.blurLayers, 2))
const segmentSize = computed(() => 1 / (props.blurLayers + 1))

const layerStyles = computed(() =>
  Array.from({ length: layers.value }).map((_, index) => {
    const angle = GRADIENT_ANGLES[props.direction]
    const gradientStops = [
      index * segmentSize.value,
      (index + 1) * segmentSize.value,
      (index + 2) * segmentSize.value,
      (index + 3) * segmentSize.value,
    ].map(
      (pos, posIndex) =>
        `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`,
    )
    const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(', ')})`
    const blurValue = index * props.blurIntensity
    return {
      maskImage: gradient,
      WebkitMaskImage: gradient,
      backdropFilter: `blur(${blurValue}px)`,
      WebkitBackdropFilter: `blur(${blurValue}px)`,
    }
  }),
)

const offsetStyle = computed(() => {
  const offset = `-${segmentSize.value * 100}%`
  switch (props.direction) {
    case 'bottom':
      return { bottom: offset }
    case 'top':
      return { top: offset }
    case 'left':
      return { left: offset }
    case 'right':
      return { right: offset }
    default:
      return {}
  }
})
</script>
