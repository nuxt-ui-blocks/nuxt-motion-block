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
import { onMounted, onUnmounted, ref } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { backgroundGradientAnimation } from '../theme'

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

onMounted(() => {
  // Set CSS custom properties
  document.body.style.setProperty(
    '--gradient-background-start',
    props.gradientBackgroundStart,
  )
  document.body.style.setProperty(
    '--gradient-background-end',
    props.gradientBackgroundEnd,
  )
  document.body.style.setProperty('--first-color', props.firstColor)
  document.body.style.setProperty('--second-color', props.secondColor)
  document.body.style.setProperty('--third-color', props.thirdColor)
  document.body.style.setProperty('--fourth-color', props.fourthColor)
  document.body.style.setProperty('--fifth-color', props.fifthColor)
  document.body.style.setProperty('--pointer-color', props.pointerColor)
  document.body.style.setProperty('--size', props.size)
  document.body.style.setProperty('--blending-value', props.blendingValue)

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
