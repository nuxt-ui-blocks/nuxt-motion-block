<template>
  <div
    ref="containerRef"
    :class="ui.root({ class: [uiProps.ui?.root, props.containerClass] })"
    @mousemove="handleMouseMove"
  >
    <svg class="hidden">
      <defs>
        <filter id="blurMe">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="10"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            result="goo"
          />
          <feBlend
            in="SourceGraphic"
            in2="goo"
          />
        </filter>
      </defs>
    </svg>

    <div :class="ui.content({ class: [uiProps.ui?.content, uiProps.class] })">
      <slot />
    </div>

    <div
      :class="ui.gradients({ safari: isSafari, class: uiProps.ui?.gradients })"
    >
      <div
        :class="ui.first({ class: uiProps.ui?.first })"
      />
      <div
        :class="ui.second({ class: uiProps.ui?.second })"
      />
      <div
        :class="ui.third({ class: uiProps.ui?.third })"
      />
      <div
        :class="ui.fourth({ class: uiProps.ui?.fourth })"
      />
      <div
        :class="ui.fifth({ class: uiProps.ui?.fifth })"
      />

      <div
        v-if="interactive"
        ref="interactiveRef"
        :class="ui.pointer({ class: uiProps.ui?.pointer })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { backgroundGradientAnimation } from '../theme'
import { colorToRgb, resolveColor } from '../utils/theme-color'

interface Props {
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  class?: string
  interactive?: boolean
  containerClass?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  gradientBackgroundStart: 'rgb(108, 0, 162)',
  gradientBackgroundEnd: 'rgb(0, 17, 82)',
  firstColor: '18, 113, 255',
  secondColor: '221, 74, 255',
  thirdColor: '100, 220, 255',
  fourthColor: '200, 50, 50',
  fifthColor: '180, 180, 50',
  pointerColor: '140, 100, 255',
  size: '80%',
  blendingValue: 'hard-light',
  interactive: true,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'backgroundGradientAnimation', props, theme: backgroundGradientAnimation })

const interactiveRef = ref<HTMLDivElement>()
const containerRef = ref<HTMLDivElement>()

const curX = ref(0)
const curY = ref(0)
const tgX = ref(0)
const tgY = ref(0)
const isSafari = ref(false)

const colorMode = useColorMode()

// Every colour prop accepts a theme token (`'primary'`, `'var(--ui-primary)'`)
// or a literal colour. The five blob colours and the pointer colour may also be
// given as `'R, G, B'` triplets; both forms end up as a triplet the theme's
// rgba() gradients can consume.
const resolveCss = (value: string) =>
  resolveColor(value, { target: containerRef.value ?? undefined }) ?? value

const resolveTriplet = (value: string) => {
  const trimmed = value.trim()
  if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(trimmed)) return trimmed
  const rgb = colorToRgb(resolveCss(trimmed))
  return rgb ? `${rgb[0]}, ${rgb[1]}, ${rgb[2]}` : trimmed
}

const applyColors = () => {
  const root = document.body.style
  root.setProperty('--gradient-background-start', resolveCss(props.gradientBackgroundStart))
  root.setProperty('--gradient-background-end', resolveCss(props.gradientBackgroundEnd))
  root.setProperty('--first-color', resolveTriplet(props.firstColor))
  root.setProperty('--second-color', resolveTriplet(props.secondColor))
  root.setProperty('--third-color', resolveTriplet(props.thirdColor))
  root.setProperty('--fourth-color', resolveTriplet(props.fourthColor))
  root.setProperty('--fifth-color', resolveTriplet(props.fifthColor))
  root.setProperty('--pointer-color', resolveTriplet(props.pointerColor))
  root.setProperty('--size', props.size)
  root.setProperty('--blending-value', props.blendingValue)
}

watch(
  () => [
    props.gradientBackgroundStart,
    props.gradientBackgroundEnd,
    props.firstColor,
    props.secondColor,
    props.thirdColor,
    props.fourthColor,
    props.fifthColor,
    props.pointerColor,
    colorMode.value,
  ],
  applyColors,
)

onMounted(() => {
  // Set CSS custom properties
  applyColors()

  // Detect Safari
  isSafari.value = /^(?:(?!chrome|android).)*safari/i.test(navigator.userAgent)

  // Start animation loop
  let animationFrameId: number
  const move = () => {
    if (interactiveRef.value) {
      curX.value = curX.value + (tgX.value - curX.value) / 20
      curY.value = curY.value + (tgY.value - curY.value) / 20

      interactiveRef.value.style.transform = `translate(${Math.round(curX.value)}px, ${Math.round(curY.value)}px)`
    }
    animationFrameId = requestAnimationFrame(move)
  }

  move()

  // Cleanup
  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  })
})

const handleMouseMove = (event: MouseEvent) => {
  if (interactiveRef.value && containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    tgX.value = event.clientX - rect.left
    tgY.value = event.clientY - rect.top
  }
}
</script>

<style>
@keyframes moveHorizontal {
  0% {
    transform: translateX(-50%) translateY(-10%);
  }
  50% {
    transform: translateX(50%) translateY(10%);
  }
  100% {
    transform: translateX(-50%) translateY(-10%);
  }
}

@keyframes moveInCircle {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes moveVertical {
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(-50%);
  }
}

.animate-first {
  animation: moveVertical 30s ease infinite;
}

.animate-second {
  animation: moveInCircle 20s ease infinite;
}

.animate-third {
  animation: moveInCircle 40s linear infinite;
}

.animate-fourth {
  animation: moveHorizontal 40s ease infinite;
}

.animate-fifth {
  animation: moveInCircle 20s ease infinite;
}
</style>
