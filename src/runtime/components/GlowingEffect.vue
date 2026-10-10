<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <div
      :class="ui.border({
        variant: props.variant,
        glow: props.glow,
        disabled: props.disabled,
        class: uiProps.ui?.border,
      })"
    />
    <div
      ref="containerRef"
      :style="glowStyles"
      :class="ui.container({
        glow: props.glow,
        blur: props.blur > 0,
        disabled: props.disabled,
        class: uiProps.ui?.container,
      })"
    >
      <div :class="ui.glow({ class: uiProps.ui?.glow })" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { animate } from 'motion-v'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import glowingEffect from '../theme/glowing-effect'

interface GlowingEffectProps {
  blur?: number
  inactiveZone?: number
  proximity?: number
  spread?: number
  variant?: 'default' | 'white'
  glow?: boolean
  class?: string
  ui?: Record<string, any>
  disabled?: boolean
  movementDuration?: number
  borderWidth?: number
}

const props = withDefaults(defineProps<GlowingEffectProps>(), {
  blur: 0,
  inactiveZone: 0.7,
  proximity: 0,
  spread: 20,
  variant: 'default',
  glow: false,
  class: undefined,
  ui: undefined,
  disabled: true,
  movementDuration: 2,
  borderWidth: 1,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'glowingEffect', props, theme: glowingEffect })

const containerRef = ref<HTMLDivElement | null>(null)
const lastPosition = ref({ x: 0, y: 0 })
const animationFrameRef = ref<number>(0)

const glowStyles = computed(() => ({
  '--blur': `${props.blur}px`,
  '--spread': props.spread,
  '--start': '0',
  '--active': '0',
  '--glowingeffect-border-width': `${props.borderWidth}px`,
  '--repeating-conic-gradient-times': '5',
  '--gradient': props.variant === 'white'
    ? `repeating-conic-gradient(
        from 236.84deg at 50% 50%,
        var(--black),
        var(--black) calc(25% / var(--repeating-conic-gradient-times))
      )`
    : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
      radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
      radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
      radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
      repeating-conic-gradient(
        from 236.84deg at 50% 50%,
        #dd7bbb 0%,
        #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
        #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
        #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
        #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
      )`,
}))

const handleMove = (e?: MouseEvent | { x: number, y: number }) => {
  if (!containerRef.value) return

  if (animationFrameRef.value) {
    cancelAnimationFrame(animationFrameRef.value)
  }

  animationFrameRef.value = requestAnimationFrame(() => {
    const element = containerRef.value
    if (!element) return

    const { left, top, width, height } = element.getBoundingClientRect()
    const mouseX = e?.x ?? lastPosition.value.x
    const mouseY = e?.y ?? lastPosition.value.y

    if (e) {
      lastPosition.value = { x: mouseX, y: mouseY }
    }

    const center = [left + width * 0.5, top + height * 0.5]
    const distanceFromCenter = Math.hypot(
      mouseX - center[0],
      mouseY - center[1],
    )
    const inactiveRadius = 0.5 * Math.min(width, height) * props.inactiveZone

    if (distanceFromCenter < inactiveRadius) {
      element.style.setProperty('--active', '0')
      return
    }

    const isActive
      = mouseX > left - props.proximity
        && mouseX < left + width + props.proximity
        && mouseY > top - props.proximity
        && mouseY < top + height + props.proximity

    element.style.setProperty('--active', isActive ? '1' : '0')

    if (!isActive) return

    const currentAngle
      = Number.parseFloat(element.style.getPropertyValue('--start')) || 0
    const targetAngle
      = (180 * Math.atan2(mouseY - center[1], mouseX - center[0]))
        / Math.PI
        + 90

    const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180
    const newAngle = currentAngle + angleDiff

    animate(currentAngle, newAngle, {
      duration: props.movementDuration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        element.style.setProperty('--start', String(value))
      },
    })
  })
}

onMounted(() => {
  if (props.disabled) return

  const handleScroll = () => handleMove()
  const handlePointerMove = (e: PointerEvent) => handleMove(e)

  window.addEventListener('scroll', handleScroll, { passive: true })
  document.body.addEventListener('pointermove', handlePointerMove, {
    passive: true,
  })

  onUnmounted(() => {
    if (animationFrameRef.value) {
      cancelAnimationFrame(animationFrameRef.value)
    }
    window.removeEventListener('scroll', handleScroll)
    document.body.removeEventListener('pointermove', handlePointerMove)
  })
})
</script>
