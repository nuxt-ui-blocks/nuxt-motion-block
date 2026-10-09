<template>
  <div :class="containerClasses">
    <div
      class="flex items-end justify-center pointer-events-auto transition-all duration-300 ease-out"
      :style="{ height: currentHeight + 'px' }"
    >
      <div
        ref="dockRef"
        :class="dockClasses"
        :style="{
          height: props.panelHeight + 'px',
          transform: `translateY(${heightOffset}px)`,
        }"
        class="flex items-center justify-center gap-3 px-4 py-2
               backdrop-blur-xl
               border border-default
               rounded-2xl
               shadow-2xl shadow-black/20
               transition-transform duration-300 ease-out"
        role="toolbar"
        :aria-label="ariaLabel"
        :aria-orientation="orientation"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        @keydown="handleKeyDown"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMotionValue, type SpringOptions } from 'motion-v'
import { computed, ref, watch } from 'vue'
import { provideDockContext } from './useDock'
import { useThrottle } from '../../composables/usePerformance'
import { useKeyboardNavigation } from '../../composables/useAccessibility'

type DockVariant = 'bottom' | 'top' | 'left' | 'right' | 'floating' | 'compact'
type DockSize = 'sm' | 'md' | 'lg'

interface DockProps {
  class?: string
  distance?: number
  panelHeight?: number
  magnification?: number
  spring?: SpringOptions
  variant?: DockVariant
  size?: DockSize
  ariaLabel?: string
  showLabels?: boolean
  background?: 'glass' | 'solid' | 'none'
  animation?: 'spring' | 'ease' | 'none'
}

const DOCK_HEIGHT = 128
const DEFAULT_MAGNIFICATION = 80
const DEFAULT_DISTANCE = 150
const DEFAULT_PANEL_HEIGHT = 64

const props = withDefaults(defineProps<DockProps>(), {
  distance: DEFAULT_DISTANCE,
  panelHeight: DEFAULT_PANEL_HEIGHT,
  magnification: DEFAULT_MAGNIFICATION,
  spring: () => ({ mass: 0.1, stiffness: 150, damping: 12 }),
  variant: 'bottom',
  size: 'md',
  ariaLabel: 'Application dock',
  showLabels: true,
  background: 'glass',
  animation: 'spring',
})

const dockRef = ref<HTMLDivElement>()
const mouseX = useMotionValue(Infinity)
const isHovered = ref(false)
const currentHeight = ref(props.panelHeight)
const heightOffset = ref(0)
const focusedItemIndex = ref(-1)

// Get utility functions
const throttle = useThrottle
const { createArrowNavigation } = useKeyboardNavigation()

// Size configurations
const sizeConfig = computed(() => {
  const configs = {
    sm: { gap: 2, padding: 3, magnification: 60 },
    md: { gap: 3, padding: 4, magnification: 80 },
    lg: { gap: 4, padding: 5, magnification: 100 },
  }
  return configs[props.size]
})

// Orientation based on variant
const orientation = computed(() => {
  return ['left', 'right'].includes(props.variant) ? 'vertical' : 'horizontal'
})

// Container classes based on variant
const containerClasses = computed(() => {
  const baseClasses = 'z-[1000] pointer-events-none'

  const variantClasses = {
    bottom: 'fixed bottom-5 left-1/2 -translate-x-1/2',
    top: 'fixed top-5 left-1/2 -translate-x-1/2',
    left: 'fixed left-5 top-1/2 -translate-y-1/2',
    right: 'fixed right-5 top-1/2 -translate-y-1/2',
    floating: 'fixed bottom-20 left-1/2 -translate-x-1/2',
    compact: 'fixed bottom-3 left-1/2 -translate-x-1/2',
  }

  return [baseClasses, variantClasses[props.variant]].join(' ')
})

// Background classes
const backgroundClasses = computed(() => {
  const backgrounds = {
    glass: 'bg-default/80',
    solid: 'bg-default',
    none: 'bg-transparent',
  }
  return backgrounds[props.background]
})

const maxHeight = computed(() => {
  return Math.max(DOCK_HEIGHT, props.magnification + props.magnification / 2 + 4)
})

// Watch for hover state changes and animate height
watch(isHovered, (hovered) => {
  if (hovered) {
    currentHeight.value = maxHeight.value
    heightOffset.value = -(maxHeight.value - props.panelHeight) / 2
  }
  else {
    currentHeight.value = props.panelHeight
    heightOffset.value = 0
  }
}, { immediate: true })

const dockClasses = computed(() => {
  const baseClasses = [
    'flex items-center justify-center gap-3 px-4 py-2',
    'backdrop-blur-xl',
    'border border-default',
    'rounded-2xl',
    'shadow-2xl shadow-black/20',
    'transition-transform duration-300 ease-out',
  ]

  // Add background classes
  baseClasses.push(backgroundClasses.value)

  // Add orientation classes
  if (orientation.value === 'vertical') {
    baseClasses[0] = 'flex flex-col items-center justify-center gap-3 px-2 py-4'
  }

  // Add size-specific classes
  const sizeClasses = {
    sm: `gap-${sizeConfig.value.gap} px-${sizeConfig.value.padding} py-${sizeConfig.value.padding}`,
    md: `gap-${sizeConfig.value.gap} px-${sizeConfig.value.padding} py-${sizeConfig.value.padding}`,
    lg: `gap-${sizeConfig.value.gap} px-${sizeConfig.value.padding} py-${sizeConfig.value.padding}`,
  }

  return [baseClasses.join(' '), props.class, sizeClasses[props.size]].filter(Boolean).join(' ')
})

// Provide dock context
provideDockContext({
  mouseX,
  spring: props.spring,
  distance: props.distance,
  magnification: props.magnification,
})

// Enhanced mouse handling with performance optimization
const handleMouseMove = throttle((event: MouseEvent) => {
  if (!dockRef.value) return

  const dockRect = dockRef.value.getBoundingClientRect()

  let relativePosition: number
  if (orientation.value === 'vertical') {
    relativePosition = event.clientY - dockRect.top
  }
  else {
    relativePosition = event.clientX - dockRect.left
  }

  isHovered.value = true
  mouseX.set(relativePosition)
}, 16) // 60fps throttling

const handleMouseLeave = () => {
  isHovered.value = false
  mouseX.set(Infinity)
  focusedItemIndex.value = -1
}

// Enhanced keyboard navigation with accessibility utilities
const handleKeyDown = createArrowNavigation({
  onRight: () => {
    const items = dockRef.value?.children
    if (!items) return

    if (orientation.value === 'horizontal') {
      focusedItemIndex.value = Math.min(focusedItemIndex.value + 1, items.length - 1)
      focusItem()
    }
  },
  onLeft: () => {
    const items = dockRef.value?.children
    if (!items) return

    if (orientation.value === 'horizontal') {
      focusedItemIndex.value = Math.max(focusedItemIndex.value - 1, 0)
      focusItem()
    }
  },
  onDown: () => {
    const items = dockRef.value?.children
    if (!items) return

    if (orientation.value === 'vertical') {
      focusedItemIndex.value = Math.min(focusedItemIndex.value + 1, items.length - 1)
      focusItem()
    }
  },
  onUp: () => {
    const items = dockRef.value?.children
    if (!items) return

    if (orientation.value === 'vertical') {
      focusedItemIndex.value = Math.max(focusedItemIndex.value - 1, 0)
      focusItem()
    }
  },
  onHome: () => {
    focusedItemIndex.value = 0
    focusItem()
  },
  onEnd: () => {
    const items = dockRef.value?.children
    if (items) {
      focusedItemIndex.value = items.length - 1
      focusItem()
    }
  },
  onEscape: () => {
    focusedItemIndex.value = -1
    dockRef.value?.blur()
  },
})

const focusItem = () => {
  const items = dockRef.value?.children
  if (!items || focusedItemIndex.value < 0) return

  const item = items[focusedItemIndex.value] as HTMLElement
  item?.focus()
}
</script>
