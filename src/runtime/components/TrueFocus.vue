<template>
  <div
    ref="containerRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <span
      v-for="(word, index) in words"
      :key="index"
      :ref="(el) => { wordRefs[index] = el as HTMLElement | null }"
      :class="ui.word({ class: uiProps.ui?.word })"
      :style="{
        filter: manualMode
          ? (index === currentIndex ? 'blur(0px)' : `blur(${blurAmount}px)`)
          : (index === currentIndex ? 'blur(0px)' : `blur(${blurAmount}px)`),
        transition: `filter ${animationDuration}s ease`,
      }"
      @mouseenter="handleMouseEnter(index)"
      @mouseleave="handleMouseLeave"
    >
      {{ word }}
    </span>

    <motion.div
      :class="ui.focus({ class: uiProps.ui?.focus })"
      :animate="{
        x: focusRect.x,
        y: focusRect.y,
        width: focusRect.width,
        height: focusRect.height,
        opacity: currentIndex >= 0 ? 1 : 0,
      }"
      :transition="{
        duration: animationDuration,
      }"
      :style="{
        '--border-color': resolvedBorderColor,
        '--glow-color': resolvedGlowColor,
      }"
    >
      <span
        :class="ui.corner({ class: uiProps.ui?.corner, position: 'topLeft' })"
        :style="{
          borderColor: 'var(--border-color)',
          filter: 'drop-shadow(0 0 4px var(--border-color))',
        }"
      />
      <span
        :class="ui.corner({ class: uiProps.ui?.corner, position: 'topRight' })"
        :style="{
          borderColor: 'var(--border-color)',
          filter: 'drop-shadow(0 0 4px var(--border-color))',
        }"
      />
      <span
        :class="ui.corner({ class: uiProps.ui?.corner, position: 'bottomLeft' })"
        :style="{
          borderColor: 'var(--border-color)',
          filter: 'drop-shadow(0 0 4px var(--border-color))',
        }"
      />
      <span
        :class="ui.corner({ class: uiProps.ui?.corner, position: 'bottomRight' })"
        :style="{
          borderColor: 'var(--border-color)',
          filter: 'drop-shadow(0 0 4px var(--border-color))',
        }"
      />
    </motion.div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { motion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { useResolvedColor } from '../composables/useThemeColor'
import trueFocus from '../theme/true-focus'

const props = defineProps({
  sentence: {
    type: String,
    default: 'True Focus',
  },
  manualMode: {
    type: Boolean,
    default: false,
  },
  blurAmount: {
    type: Number,
    default: 5,
  },
  borderColor: {
    type: String,
    default: 'green',
  },
  glowColor: {
    type: String,
    default: 'rgba(0, 255, 0, 0.6)',
  },
  animationDuration: {
    type: Number,
    default: 0.5,
  },
  pauseBetweenAnimations: {
    type: Number,
    default: 1,
  },
  class: {
    type: String,
    default: undefined,
  },
  ui: {
    type: Object,
    default: undefined,
  },
})

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'trueFocus',
  props,
  theme: trueFocus,
})

const resolvedBorderColor = useResolvedColor(() => props.borderColor)
const resolvedGlowColor = useResolvedColor(() => props.glowColor)

const words = computed(() => props.sentence.split(' '))
const currentIndex = ref<number>(0)
const lastActiveIndex = ref<number | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const wordRefs = ref<(HTMLElement | null)[]>([])
const focusRect = ref({ x: 0, y: 0, width: 0, height: 0 })

let interval: ReturnType<typeof setInterval> | null = null

const updateFocusRect = async () => {
  if (currentIndex.value === null || currentIndex.value === -1) return
  if (!wordRefs.value[currentIndex.value] || !containerRef.value) return

  await nextTick()

  const container = containerRef.value
  const activeElement = wordRefs.value[currentIndex.value]

  if (!container || !activeElement) return

  const parentRect = container.getBoundingClientRect()
  const activeRect = activeElement.getBoundingClientRect()

  focusRect.value = {
    x: activeRect.left - parentRect.left,
    y: activeRect.top - parentRect.top,
    width: activeRect.width,
    height: activeRect.height,
  }
}

const handleMouseEnter = (index: number) => {
  if (props.manualMode) {
    lastActiveIndex.value = index
    currentIndex.value = index
  }
}

const handleMouseLeave = () => {
  if (props.manualMode) {
    currentIndex.value = lastActiveIndex.value ?? 0
  }
}

watch(() => props.manualMode, (newVal) => {
  if (newVal) {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }
  else {
    startAutoAnimation()
  }
})

watch(currentIndex, updateFocusRect)

const startAutoAnimation = () => {
  // Only run on client side
  if (typeof window === 'undefined' || props.manualMode) return

  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % words.value.length
  }, (props.animationDuration + props.pauseBetweenAnimations) * 1000)
}

onMounted(() => {
  // Only initialize on client side
  if (typeof window !== 'undefined' && !props.manualMode) {
    startAutoAnimation()
  }
  updateFocusRect()
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>
