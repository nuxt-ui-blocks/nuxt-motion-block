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
      class="inline-block"
      :animate="magnetTarget"
      :transition="magnetTransition"
    >
      <UButton
        v-if="!asChild"
        :ref="setButtonEl"
        :type="nativeType"
        :disabled="props.disabled"
        :variant="uiVariant"
        :color="uiColor"
        :size="uiSize"
        :square="props.size === 'icon'"
        :class="pclass"
        v-bind="$attrs"
      >
        <slot />
      </UButton>

      <component
        :is="renderChild()"
        v-else
      />
    </motion.div>
  </div>
</template>

<script setup lang="ts">
import { cloneVNode, computed, ref, useAttrs, useSlots, watch } from 'vue'
import { motion, useReducedMotion } from 'motion-v'
import { useHoverCapable } from '../composables/useHoverCapable'
import type { ButtonProps } from '#ui/components/Button.vue'
import { cn } from '../utils/merge'

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

// The React reference builds its buttons with `cva`. The default branch of the
// port delegates the whole button to `UButton` (Nuxt UI owns the base / size /
// colour variants), so the variant matrix only maps the reference's vocabulary
// onto Nuxt UI's `variant` + `color` pair.
const UI_VARIANT: Record<MagneticButtonVariant, {
  variant: NonNullable<ButtonProps['variant']>
  color: NonNullable<ButtonProps['color']>
}> = {
  default: { variant: 'solid', color: 'primary' },
  destructive: { variant: 'solid', color: 'error' },
  ghost: { variant: 'ghost', color: 'primary' },
  link: { variant: 'link', color: 'primary' },
  outline: { variant: 'outline', color: 'neutral' },
  secondary: { variant: 'soft', color: 'neutral' },
}

const UI_SIZE: Record<MagneticButtonSize, NonNullable<ButtonProps['size']>> = {
  default: 'md',
  icon: 'md',
  lg: 'lg',
  sm: 'sm',
}

const uiVariant = computed(() => UI_VARIANT[props.variant].variant)
const uiColor = computed(() => UI_VARIANT[props.variant].color)
const uiSize = computed(() => UI_SIZE[props.size])

const pclass = computed(() => cn(props.class, props.className))

// `asChild` renders whatever single element the caller puts in the slot (an
// anchor, a Nuxt link, a router button). That element is not a motion component
// and Nuxt UI exposes no asChild merge on `UButton`, so the translation is
// carried by a `motion.div` wrapper between the zone and the child, and the
// child is cloned with `UButton`'s own slot classes for the mapped variant —
// keeping the two branches styled identically. The default branch keeps the
// transform on the real `UButton`, matching the React reference.
//
// The `mousemove` / `mouseleave` listeners must stay on the plain zone element:
// motion-v does not forward `on*` props onto its rendered DOM nodes.
const AS_CHILD_BASE = [
  'inline-flex items-center',
  'whitespace-nowrap rounded-md font-medium transition-colors',
  'focus-visible:outline-3',
  'disabled:pointer-events-none disabled:opacity-75',
].join(' ')

const AS_CHILD_SIZE: Record<MagneticButtonSize, string> = {
  default: 'px-2.5 py-1.5 text-sm gap-1.5',
  icon: 'p-1.5',
  lg: 'px-3 py-2 text-sm gap-2',
  sm: 'px-2.5 py-1.5 text-xs gap-1.5',
}

const AS_CHILD_VARIANT: Record<MagneticButtonVariant, string> = {
  default: 'text-inverted bg-primary hover:bg-primary/75 active:bg-primary/75',
  destructive: 'text-inverted bg-error hover:bg-error/75 active:bg-error/75',
  ghost: 'text-primary hover:bg-primary/10 active:bg-primary/10',
  link: 'text-primary hover:text-primary/75 active:text-primary/75',
  outline: 'ring ring-inset ring-accented text-default bg-default hover:bg-elevated active:bg-elevated',
  secondary: 'text-default bg-elevated hover:bg-accented/75 active:bg-accented/75',
}

const asChildClass = computed(() =>
  cn(
    AS_CHILD_BASE,
    AS_CHILD_SIZE[props.size],
    AS_CHILD_VARIANT[props.variant],
    props.class,
    props.className,
  ),
)

// `type` is emitted before `v-bind="$attrs"`, so a caller-supplied
// `type="submit"` still wins exactly like the reference's `{...props}` spread.
const nativeType = 'button'

const zoneStyle = computed(() => ({
  margin: `-${props.radius / 2}px`,
  padding: `${props.radius / 2}px`,
}))

const shouldReduceMotion = useReducedMotion()
const isHoverDevice = useHoverCapable()
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

const zoneEl = ref<HTMLElement>()
const slots = useSlots()
const attrs = useAttrs()

function renderChild() {
  const nodes = slots.default?.()
  const child = nodes?.find(
    node => typeof node.type === 'string' || typeof node.type === 'object',
  )
  if (!child) {
    return undefined
  }

  // `cloneVNode` merges props via `mergeProps`, which concatenates any fresh
  // `class` with the child's own — producing `no-underline no-underline …`.
  // Cloning the attrs/state first and overriding `class` afterwards gives one
  // merged class string, with conflicts still resolved later-wins by `cn`.
  const cloned = cloneVNode(child, {
    ...attrs,
    disabled: props.disabled || undefined,
  })
  cloned.props = {
    ...cloned.props,
    class: cn(child.props?.class, asChildClass.value),
  }
  return cloned
}

let buttonEl: HTMLElement | undefined

function setButtonEl(el: unknown) {
  const candidate
    = (el as { $el?: HTMLElement } | null)?.$el ?? (el as HTMLElement | null)
  buttonEl = candidate instanceof HTMLElement ? candidate : undefined
}

function resolveButton(): HTMLElement | undefined {
  if (buttonEl) {
    return buttonEl
  }

  const wrapper = zoneEl.value?.firstElementChild
  if (!(wrapper instanceof HTMLElement)) {
    return undefined
  }

  const candidate = wrapper.firstElementChild ?? wrapper
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

// Reset any lingering offset when the device loses a hovering cursor mid-session.
watch(isHoverDevice, (hovering) => {
  if (!hovering) {
    reset()
  }
})
</script>
