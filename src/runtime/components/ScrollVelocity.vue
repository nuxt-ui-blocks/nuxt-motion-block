<template>
  <section>
    <VelocityText
      v-for="(text, index) in texts"
      :key="index"
      :base-velocity="index % 2 !== 0 ? -velocity : velocity"
      :scroll-container-ref="scrollContainerRef"
      :class-name="props.class"
      :damping="damping"
      :stiffness="stiffness"
      :num-copies="numCopies"
      :velocity-mapping="velocityMapping"
      :parallax-class-name="parallaxClass"
      :scroller-class-name="scrollerClass"
      :parallax-style="parallaxStyle"
      :scroller-style="scrollerStyle"
    >
      {{ text }}&nbsp;
    </VelocityText>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, h } from 'vue'
import { useRafFn } from '@vueuse/core'
import { cn } from '../utils/merge'

interface VelocityMapping {
  input: [number, number]
  output: [number, number]
}

interface ScrollVelocityProps {
  scrollContainerRef?: any
  texts?: string[]
  velocity?: number
  class?: string
  damping?: number
  stiffness?: number
  numCopies?: number
  velocityMapping?: VelocityMapping
  parallaxClass?: string
  scrollerClass?: string
  parallaxStyle?: any
  scrollerStyle?: any
}

const props = withDefaults(defineProps<ScrollVelocityProps>(), {
  texts: () => [],
  velocity: 100,
  class: '',
  damping: 50,
  stiffness: 400,
  numCopies: 6,
  velocityMapping: () => ({ input: [0, 1000], output: [0, 5] }),
  parallaxClass: '',
  scrollerClass: '',
  parallaxStyle: () => ({}),
  scrollerStyle: () => ({}),
})

// Element width hook equivalent
const useElementWidth = (elementRef: any) => {
  const width = ref(0)

  const updateWidth = () => {
    if (elementRef.value) {
      width.value = elementRef.value.offsetWidth
    }
  }

  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  return width
}

// VelocityText component
const VelocityText = {
  props: {
    baseVelocity: { type: Number, default: 100 },
    scrollContainerRef: { type: Object, default: null },
    class: { type: String, default: '' },
    damping: { type: Number, default: 50 },
    stiffness: { type: Number, default: 400 },
    numCopies: { type: Number, default: 6 },
    velocityMapping: { type: Object, default: () => ({ input: [0, 1000], output: [0, 5] }) },
    parallaxClass: { type: String, default: '' },
    scrollerClass: { type: String, default: '' },
    parallaxStyle: { type: Object, default: () => ({}) },
    scrollerStyle: { type: Object, default: () => ({}) },
  },
  setup(props: any, { slots }: any) {
    const baseX = ref(0)
    const copyRef = ref<HTMLElement | null>(null)
    const directionFactor = ref(1)

    // Get element width
    const copyWidth = useElementWidth(copyRef)

    // Scroll tracking
    const scrollY = ref(0)
    const previousScrollY = ref(0)
    const scrollVelocity = ref(0)
    const smoothVelocity = ref(0)

    const updateScroll = () => {
      const currentScrollY = window.scrollY
      scrollVelocity.value = (currentScrollY - previousScrollY.value) * 60 // Convert to per-second
      previousScrollY.value = currentScrollY
      scrollY.value = currentScrollY
    }

    // Spring simulation for smooth velocity
    const updateSmoothVelocity = () => {
      const delta = scrollVelocity.value - smoothVelocity.value
      const acceleration = delta * (props.stiffness / 1000)
      smoothVelocity.value += acceleration
      smoothVelocity.value *= (1 - props.damping / 1000)
    }

    // Velocity factor transformation
    const velocityFactor = computed(() => {
      const [inputMin, inputMax] = props.velocityMapping.input
      const [outputMin, outputMax] = props.velocityMapping.output

      const normalized = (smoothVelocity.value - inputMin) / (inputMax - inputMin)
      return outputMin + normalized * (outputMax - outputMin)
    })

    // Wrap function (same as React version)
    const wrap = (min: number, max: number, v: number): number => {
      const range = max - min
      const mod = (((v - min) % range) + range) % range
      return mod + min
    }

    // X position transformation
    const x = computed(() => {
      if (copyWidth.value === 0) return '0px'
      return `${wrap(-copyWidth.value, 0, baseX.value)}px`
    })

    // Animation frame
    const { pause, resume } = useRafFn(({ delta }) => {
      updateScroll()
      updateSmoothVelocity()

      let moveBy = directionFactor.value * props.baseVelocity * (delta / 1000)

      if (velocityFactor.value < 0) {
        directionFactor.value = -1
      }
      else if (velocityFactor.value > 0) {
        directionFactor.value = 1
      }

      moveBy += directionFactor.value * moveBy * velocityFactor.value
      baseX.value += moveBy
    })

    onMounted(() => {
      resume()
    })

    onUnmounted(() => {
      pause()
    })

    return () => {
      const spans = []
      for (let i = 0; i < props.numCopies; i++) {
        spans.push(
          h('span', {
            class: cn('flex-shrink-0', props.class),
            ref: i === 0 ? copyRef : undefined,
          }, slots.default?.()),
        )
      }

      return h('div', {
        class: cn('relative overflow-hidden', props.parallaxClass),
        style: props.parallaxStyle,
      }, [
        h('div', {
          class: cn('flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]', props.scrollerClass),
          style: {
            transform: `translateX(${x.value})`,
            ...props.scrollerStyle,
          },
        }, spans),
      ])
    }
  },
}
</script>
