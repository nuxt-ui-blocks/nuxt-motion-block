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
import { useResolvedColors } from '../composables/useThemeColor'
import glowingEffect from '../theme/glowing-effect'
import { THEME_TOKENS } from '../utils/theme-color'

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
  colors?: string[]
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
  colors: () => ['#dd7bbb', '#d79f1e', '#5a922c', '#4c7894'],
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'glowingEffect', props, theme: glowingEffect })

const containerRef = ref<HTMLDivElement | null>(null)
const lastPosition = ref({ x: 0, y: 0 })
const animationFrameRef = ref<number>(0)

const withAlpha = (color: string) => (/^#[0-9a-f]{6}$/i.test(color) ? `${color}00` : color)

const isThemeReference = (value: string) => {
  const token = value.trim()
  return token.startsWith('var(--ui-')
    || token.startsWith('--ui-')
    || (THEME_TOKENS as readonly string[]).includes(token)
}

const resolvedColors = useResolvedColors(() => props.colors)

// Theme references resolve to a concrete colour, while authored literals are kept
// verbatim so `withAlpha`'s hex handling (and the colours a user typed) survive.
const gradientColors = computed(() => {
  const resolved = resolvedColors.value ?? props.colors
  return props.colors.map((color, index) => (isThemeReference(color) ? resolved[index] ?? color : color))
})

const gradient = computed(() => {
  if (props.variant === 'white') {
    return `repeating-conic-gradient(
        from 236.84deg at 50% 50%,
        var(--black),
        var(--black) calc(25% / var(--repeating-conic-gradient-times))
      )`
  }
  const [c0, c1, c2, c3] = gradientColors.value
  return `radial-gradient(circle, ${c0} 10%, ${withAlpha(c0)} 20%),
      radial-gradient(circle at 40% 40%, ${c1} 5%, ${withAlpha(c1)} 15%),
      radial-gradient(circle at 60% 60%, ${c2} 10%, ${withAlpha(c2)} 20%),
      radial-gradient(circle at 40% 60%, ${c3} 10%, ${withAlpha(c3)} 20%),
      repeating-conic-gradient(
        from 236.84deg at 50% 50%,
        ${c0} 0%,
        ${c1} calc(25% / var(--repeating-conic-gradient-times)),
        ${c2} calc(50% / var(--repeating-conic-gradient-times)),
        ${c3} calc(75% / var(--repeating-conic-gradient-times)),
        ${c0} calc(100% / var(--repeating-conic-gradient-times))
      )`
})

const glowStyles = computed(() => ({
  '--blur': `${props.blur}px`,
  '--spread': props.spread,
  '--start': '0',
  '--active': '0',
  '--glowingeffect-border-width': `${props.borderWidth}px`,
  '--repeating-conic-gradient-times': '5',
  '--gradient': gradient.value,
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
