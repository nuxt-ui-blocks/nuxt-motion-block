<template>
  <div
    ref="zoneEl"
    class="inline-block"
    role="presentation"
    :style="zoneStyle"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <motion.div
      v-if="asChild"
      class="inline-block"
      :animate="magnetTarget"
      :transition="magnetTransition"
    >
      <Primitive
        as-child
        :disabled="props.disabled"
        :class="buttonClass"
        v-bind="$attrs"
      >
        <slot />
      </Primitive>
    </motion.div>

    <motion.button
      v-else
      :ref="setButtonEl"
      :type="nativeType"
      :disabled="props.disabled"
      :class="buttonClass"
      :animate="magnetTarget"
      :transition="magnetTransition"
      v-bind="$attrs"
    >
      <slot />
    </motion.button>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { Primitive } from 'reka-ui'

defineOptions({ inheritAttrs: false })

export type MagneticButtonSize = 'default' | 'icon' | 'lg' | 'sm'

export type MagneticButtonVariant
  = 'default' | 'destructive' | 'ghost' | 'link' | 'outline' | 'secondary'

export interface MagneticButtonSpringConfig {
  duration?: number
  bounce?: number
}

export interface MagneticButtonProps {
  /** Portion of the in-range pointer offset the button travels, 0-1. */
  strength?: number
  /** Pull radius in px measured from the button centre. */
  radius?: number
  springConfig?: MagneticButtonSpringConfig
  disabled?: boolean
  /** Render the slot's single root instead of a `<button>`. */
  asChild?: boolean
  variant?: MagneticButtonVariant
  size?: MagneticButtonSize
  class?: string
  /** Alias of `class`, kept for parity with the React reference. */
  className?: string
}

const props = withDefaults(defineProps<MagneticButtonProps>(), {
  strength: 0.3,
  radius: 150,
  springConfig: () => ({ bounce: 0.1, duration: 0.4 }),
  disabled: false,
  asChild: false,
  variant: 'default',
  size: 'default',
  class: undefined,
  className: undefined,
})

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'

// The React reference builds these with `cva` on top of shadcn tokens. The port
// keeps the same base / size / variant matrices but rewrites the colour stops
// onto the Nuxt UI v4 palette this module ships with.
const BASE_CLASS = [
  'inline-flex cursor-pointer items-center justify-center gap-2',
  'whitespace-nowrap rounded-md font-medium text-sm transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
  'disabled:pointer-events-none disabled:opacity-50',
].join(' ')

const SIZE_CLASS: Record<MagneticButtonSize, string> = {
  default: 'h-10 px-4 py-2',
  icon: 'h-10 w-10',
  lg: 'h-11 rounded-md px-8',
  sm: 'h-9 rounded-md px-3',
}

const VARIANT_CLASS: Record<MagneticButtonVariant, string> = {
  default: 'bg-primary text-inverted hover:bg-primary/75',
  destructive: 'bg-error text-inverted hover:bg-error/75',
  ghost: 'text-highlighted hover:bg-primary/10 hover:text-primary',
  link: 'text-highlighted underline-offset-4 hover:underline',
  outline: 'bg-default text-highlighted ring ring-inset ring-default hover:bg-elevated',
  secondary: 'bg-elevated text-highlighted hover:bg-elevated/80',
}

const zoneEl = ref<HTMLElement>()

// `asChild` renders whatever single element the caller puts in the slot (an
// anchor, a Nuxt link, a router button). That element is not a motion component
// and reka-ui's `Primitive` accepts no `animate` prop, so the translation is
// carried by a `motion.div` wrapper between the zone and the child. The default
// branch keeps the transform on the real `<button>`, matching the React
// reference.
//
// The `mousemove` / `mouseleave` listeners must stay on the plain zone element:
// motion-v does not forward `on*` props onto its rendered DOM nodes.

const buttonClass = computed(() =>
  [
    BASE_CLASS,
    SIZE_CLASS[props.size],
    VARIANT_CLASS[props.variant],
    props.class,
    props.className,
  ]
    .filter(Boolean)
    .join(' '),
)

// `type` is emitted before `v-bind="$attrs"`, so a caller-supplied
// `type="submit"` still wins exactly like the reference's `{...props}` spread.
const nativeType = 'button'

const zoneStyle = computed(() => ({
  margin: `-${props.radius / 2}px`,
  padding: `${props.radius / 2}px`,
}))

const shouldReduceMotion = useReducedMotion()
const isHoverDevice = ref(false)
const offsetX = ref(0)
const offsetY = ref(0)

const isEffectDisabled = computed(
  () => props.disabled || shouldReduceMotion.value || !isHoverDevice.value,
)

// MotionValues are snapshotted once when motion-v mounts, so the magnet is driven
// by plain reactive numbers fed to motion-v's own `animate` prop instead.
const magnetTarget = computed(() => ({ x: offsetX.value, y: offsetY.value }))

const magnetTransition = computed(() =>
  shouldReduceMotion.value
    ? { duration: 0 }
    : {
        bounce: props.springConfig.bounce ?? 0.1,
        duration: props.springConfig.duration ?? 0.4,
        type: 'spring' as const,
      },
)

let buttonEl: HTMLElement | undefined
let hoverMedia: MediaQueryList | undefined

function setButtonEl(el: unknown) {
  const candidate
    = (el as { $el?: HTMLElement } | null)?.$el ?? (el as HTMLElement | null)
  buttonEl = candidate instanceof HTMLElement ? candidate : undefined
}

function resolveButton(): HTMLElement | undefined {
  if (buttonEl) {
    return buttonEl
  }

  const candidate = zoneEl.value?.firstElementChild
  return candidate instanceof HTMLElement ? candidate : undefined
}

function reset() {
  offsetX.value = 0
  offsetY.value = 0
}

// The `disabled` / reduced-motion / hover-device guards live inside an
// always-bound handler rather than on the binding, so the listener stays a
// stable reference and the zone never needs to re-bind.
function handleMouseMove(event: MouseEvent) {
  if (isEffectDisabled.value) {
    return
  }

  const target = resolveButton()
  if (!target) {
    return
  }

  const rect = target.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const distanceX = event.clientX - centerX
  const distanceY = event.clientY - centerY
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

  if (distance < props.radius) {
    const factor = 1 - distance / props.radius
    offsetX.value = distanceX * props.strength * factor
    offsetY.value = distanceY * props.strength * factor
  }
  else {
    reset()
  }
}

function handleMouseLeave() {
  reset()
}

function handleHoverChange(event: MediaQueryListEvent) {
  isHoverDevice.value = event.matches

  if (!event.matches) {
    reset()
  }
}

onMounted(() => {
  if (typeof window.matchMedia !== 'function') {
    return
  }

  hoverMedia = window.matchMedia(HOVER_QUERY)
  isHoverDevice.value = hoverMedia.matches
  hoverMedia.addEventListener('change', handleHoverChange)
})

onBeforeUnmount(() => {
  hoverMedia?.removeEventListener('change', handleHoverChange)
})
</script>
