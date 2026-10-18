<template>
  <svg
    ref="svgRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <rect
      v-if="star"
      :key="star.id"
      :x="star.x"
      :y="star.y"
      :width="starWidth * star.scale"
      :height="starHeight"
      fill="url(#gradient)"
      :transform="`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`"
    />
    <defs>
      <linearGradient
        id="gradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop
          offset="0%"
          :style="`stop-color: ${resolvedTrailColor}; stop-opacity: 0`"
        />
        <stop
          offset="100%"
          :style="`stop-color: ${resolvedStarColor}; stop-opacity: 1`"
        />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { useResolvedColor } from '../composables/useThemeColor'
import shootingStars from '../theme/shooting-stars'

interface ShootingStar {
  id: number
  x: number
  y: number
  angle: number
  scale: number
  speed: number
  distance: number
}

interface Props {
  minSpeed?: number
  maxSpeed?: number
  minDelay?: number
  maxDelay?: number
  starColor?: string
  trailColor?: string
  starWidth?: number
  starHeight?: number
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  minSpeed: 10,
  maxSpeed: 30,
  minDelay: 1200,
  maxDelay: 4200,
  starColor: '#9E00FF',
  trailColor: '#2EB9DF',
  starWidth: 10,
  starHeight: 1,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'shootingStars',
  props,
  theme: shootingStars,
})

const resolvedStarColor = useResolvedColor(() => props.starColor)
const resolvedTrailColor = useResolvedColor(() => props.trailColor)

const star = ref<ShootingStar | null>(null)
const svgRef = ref<SVGSVGElement | null>(null)
const animationFrameId = ref<number | null>(null)

const getRandomStartPoint = () => {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0, angle: 45 }
  }

  const side = Math.floor(Math.random() * 4)
  const offset = Math.random() * window.innerWidth

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 }
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 }
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 }
    case 3:
      return { x: 0, y: offset, angle: 315 }
    default:
      return { x: 0, y: 0, angle: 45 }
  }
}

const createStar = () => {
  if (typeof window === 'undefined') return

  const { x, y, angle } = getRandomStartPoint()
  const newStar: ShootingStar = {
    id: Date.now(),
    x,
    y,
    angle,
    scale: 1,
    speed: Math.random() * (props.maxSpeed - props.minSpeed) + props.minSpeed,
    distance: 0,
  }
  star.value = newStar

  const randomDelay = Math.random() * (props.maxDelay - props.minDelay) + props.minDelay
  setTimeout(createStar, randomDelay)
}

const moveStar = () => {
  if (!star.value) return

  const newX = star.value.x + star.value.speed * Math.cos((star.value.angle * Math.PI) / 180)
  const newY = star.value.y + star.value.speed * Math.sin((star.value.angle * Math.PI) / 180)
  const newDistance = star.value.distance + star.value.speed
  const newScale = 1 + newDistance / 100

  if (
    newX < -20
    || newX > window.innerWidth + 20
    || newY < -20
    || newY > window.innerHeight + 20
  ) {
    star.value = null
    return
  }

  star.value = {
    ...star.value,
    x: newX,
    y: newY,
    distance: newDistance,
    scale: newScale,
  }

  animationFrameId.value = requestAnimationFrame(moveStar)
}

// Watch for star changes and start animation
watch(star, (newStar) => {
  if (newStar && animationFrameId.value === null) {
    animationFrameId.value = requestAnimationFrame(moveStar)
  }
  else if (!newStar && animationFrameId.value !== null) {
    cancelAnimationFrame(animationFrameId.value)
    animationFrameId.value = null
  }
}, { immediate: true })

onMounted(() => {
  createStar()
})

onUnmounted(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
})
</script>
