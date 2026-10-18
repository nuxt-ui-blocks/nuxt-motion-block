<template>
  <div
    ref="containerRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    @mouseenter="startGlitch"
    @mouseleave="stopGlitch"
  >
    <!-- Main text -->
    <!-- @vue-ignore -->
    <Motion
      :initial="{ opacity: 1 }"
      :animate="mainTextVariant"
      :transition="mainTransition"
      :class="ui.main({ class: uiProps.ui?.main })"
    >
      {{ text }}
    </Motion>

    <!-- Glitch layers -->
    <!-- @vue-ignore -->
    <Motion
      v-for="(layer, index) in glitchLayers"
      :key="`glitch-${index}`"
      :initial="{ opacity: 0 }"
      :animate="getLayerVariant(index)"
      :transition="getLayerTransition(index)"
      :class="ui.layer({ class: uiProps.ui?.layer })"
      :style="getLayerStyles(index)"
    >
      {{ text }}
    </Motion>

    <!-- Scan lines -->
    <div
      v-if="showScanLines && isGlitching"
      :class="ui.scanLines({ class: uiProps.ui?.scanLines })"
    >
      <Motion
        v-for="line in scanLines"
        :key="`scan-${line}`"
        :initial="{ opacity: 0, scaleY: 0 }"
        :animate="{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }"
        :transition="{
          duration: 0.1,
          delay: Math.random() * 0.5,
          repeat: Infinity,
          repeatDelay: Math.random() * 1,
        }"
        :class="ui.scanLine({ class: uiProps.ui?.scanLine })"
        :style="{ top: `${line}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { useResolvedColors } from '../composables/useThemeColor'
import textGlitch from '../theme/text-glitch'

type GlitchTrigger = 'hover' | 'auto' | 'inView' | 'manual'
type GlitchIntensity = 'low' | 'medium' | 'high' | 'extreme' | number

interface TextGlitchProps {
  text?: string
  trigger?: GlitchTrigger
  intensity?: GlitchIntensity
  duration?: number
  interval?: number
  speed?: number // Animation speed in milliseconds
  colors?: string[]
  showScanLines?: boolean
  class?: string
  autoStart?: boolean
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<TextGlitchProps>(), {
  text: '',
  trigger: 'hover',
  intensity: 'medium',
  duration: 2,
  interval: 3,
  speed: 500,
  colors: () => ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
  showScanLines: true,
  class: undefined,
  autoStart: false,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'textGlitch', props, theme: textGlitch })

const emit = defineEmits(['glitchStart', 'glitchEnd'])

const containerRef = ref<HTMLElement>()
const isVisible = useElementVisibility(containerRef)
const isGlitching = ref(false)
const glitchInterval = ref<ReturnType<typeof setInterval> | null>(null)

// Glitch configuration based on intensity
const intensityConfig = computed(() => {
  const configs = {
    low: {
      layers: 2,
      maxOffset: 2,
      flickerChance: 0.1,
      scanLineCount: 3,
    },
    medium: {
      layers: 3,
      maxOffset: 5,
      flickerChance: 0.2,
      scanLineCount: 5,
    },
    high: {
      layers: 4,
      maxOffset: 8,
      flickerChance: 0.3,
      scanLineCount: 8,
    },
    extreme: {
      layers: 6,
      maxOffset: 15,
      flickerChance: 0.5,
      scanLineCount: 12,
    },
  }

  // Handle numeric intensity (convert to string equivalent)
  if (typeof props.intensity === 'number') {
    const numericIntensity = Math.max(1, Math.min(10, props.intensity))
    if (numericIntensity <= 2) return configs.low
    if (numericIntensity <= 4) return configs.medium
    if (numericIntensity <= 7) return configs.high
    return configs.extreme
  }

  // Handle string intensity
  return configs[props.intensity] || configs.medium
})

const glitchLayers = computed(() => {
  return Array.from({ length: intensityConfig.value.layers }, (_, i) => i)
})

const scanLines = computed(() => {
  return Array.from({ length: intensityConfig.value.scanLineCount }, () =>
    Math.random() * 100,
  )
})

const resolvedColors = useResolvedColors(() => props.colors)

const getLayerStyles = (index: number) => {
  const colors = resolvedColors.value && resolvedColors.value.length > 0 ? resolvedColors.value : props.colors
  const color = colors[index % colors.length]
  return {
    color,
    zIndex: 5 - index,
    mixBlendMode: 'multiply',
  }
}

const mainTextVariant = computed(() => {
  if (!isGlitching.value) {
    return { opacity: 1, x: 0, y: 0 }
  }

  return {
    opacity: [1, 0.8, 1, 0.9, 1],
    x: [
      0,
      Math.random() * intensityConfig.value.maxOffset - intensityConfig.value.maxOffset / 2,
      0,
      Math.random() * intensityConfig.value.maxOffset - intensityConfig.value.maxOffset / 2,
      0,
    ],
    y: [
      0,
      Math.random() * 2 - 1,
      0,
      Math.random() * 2 - 1,
      0,
    ],
  }
})

const mainTransition = computed(() => {
  if (!isGlitching.value) {
    return { duration: 0.3 }
  }

  const speedMultiplier = 500 / (props.speed || 500) // Normalize speed
  return {
    duration: 0.1 * speedMultiplier,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'linear',
  }
})

const getLayerVariant = () => {
  if (!isGlitching.value) {
    return { opacity: 0, x: 0, y: 0 }
  }

  const maxOffset = intensityConfig.value.maxOffset
  const flickerChance = intensityConfig.value.flickerChance

  return {
    opacity: Math.random() < flickerChance ? [0, 0.7, 0] : [0.3, 0.6, 0.3],
    x: [
      Math.random() * maxOffset - maxOffset / 2,
      Math.random() * maxOffset - maxOffset / 2,
      Math.random() * maxOffset - maxOffset / 2,
    ],
    y: [
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
    ],
    scaleX: [0.98, 1.02, 0.99],
  }
}

const getLayerTransition = (index: number) => {
  const speedMultiplier = 500 / (props.speed || 500) // Normalize speed
  return {
    duration: (0.1 + (index * 0.05)) * speedMultiplier,
    repeat: Infinity,
    ease: 'linear',
    delay: index * 0.02,
  }
}

const startGlitch = () => {
  if (props.trigger === 'hover') {
    isGlitching.value = true
    emit('glitchStart')
  }
}

const stopGlitch = () => {
  if (props.trigger === 'hover') {
    isGlitching.value = false
    emit('glitchEnd')
  }
}

const triggerAutoGlitch = () => {
  isGlitching.value = true
  emit('glitchStart')

  setTimeout(() => {
    isGlitching.value = false
    emit('glitchEnd')
  }, props.duration * 1000)
}

// Auto glitch setup
watch([isVisible, () => props.trigger], ([visible, trigger]) => {
  // Only set up interval in the browser, not on the server
  if (import.meta.client) {
    if (trigger === 'auto' || (trigger === 'inView' && visible)) {
      if (glitchInterval.value) {
        clearInterval(glitchInterval.value)
      }

      glitchInterval.value = setInterval(() => {
        triggerAutoGlitch()
      }, props.interval * 1000)
    }
    else {
      if (glitchInterval.value) {
        clearInterval(glitchInterval.value)
        glitchInterval.value = null
      }
    }
  }
})

// Manual trigger watch
watch(() => props.trigger, (trigger) => {
  if (import.meta.client && trigger === 'manual' && props.autoStart) {
    triggerAutoGlitch()
  }
})

onMounted(() => {
  if (props.trigger === 'auto' || props.autoStart) {
    setTimeout(() => {
      triggerAutoGlitch()
    }, 500)
  }
})

onUnmounted(() => {
  if (glitchInterval.value) {
    clearInterval(glitchInterval.value)
  }
})

// Expose trigger method for manual control
defineExpose({
  trigger: triggerAutoGlitch,
  start: () => { isGlitching.value = true },
  stop: () => { isGlitching.value = false },
})
</script>

<style scoped>
.text-glitch-container {
  overflow: hidden;
}

.text-glitch-layer {
  animation: glitch-flicker 0.15s infinite linear alternate-reverse;
}

@keyframes glitch-flicker {
  0% {
    clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
  }
  5% {
    clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
  }
  10% {
    clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
  }
  15% {
    clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
  }
  20% {
    clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
  }
  25% {
    clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
  }
  30% {
    clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
  }
  35% {
    clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
  }
  40% {
    clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
  }
  45% {
    clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
  }
  50% {
    clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
  }
  55% {
    clip-path: polygon(0 2%, 100% 2%, 100% 40%, 0 40%);
  }
  60% {
    clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
  }
  65% {
    clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
  }
  70% {
    clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
  }
  75% {
    clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
  }
  80% {
    clip-path: polygon(0 40%, 100% 40%, 100% 44%, 0 44%);
  }
  85% {
    clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
  }
  90% {
    clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
  }
  95% {
    clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
  }
  100% {
    clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
  }
}
</style>
