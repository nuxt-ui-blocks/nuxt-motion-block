<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useEventListener, useWindowSize } from '@vueuse/core'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { SPRING_DEFAULT } from '../utils/motion-tokens'

export interface Breakpoint {
  /** Viewport width, in pixels, at which this breakpoint becomes active. */
  min: number
  /** Name shown in the badge, e.g. `md`. */
  name: string
}

export type BreakpointIndicatorPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

export interface BreakpointIndicatorProps {
  /** Breakpoints to compare against the viewport. Sorted by `min` internally. */
  breakpoints?: Breakpoint[]
  /** Extra classes for the badge. */
  class?: string
  /** Render the badge at all. Set to `false` to keep it out of a build. */
  enabled?: boolean
  /** Pin the badge to the viewport. Set to `false` to place it inline. */
  fixed?: boolean
  /** Single character pressed with `Ctrl` or `Cmd` to toggle the badge. */
  hotkey?: string
  /** Corner the badge sits in when `fixed` is on. */
  position?: BreakpointIndicatorPosition
  /** Show the bar that fills as the viewport approaches the next breakpoint. */
  showRuler?: boolean
  /** Show the live `width × height` readout. */
  showSize?: boolean
  /** Controlled visibility. Leave it out to let the component keep its own. */
  visible?: boolean
}

const props = withDefaults(defineProps<BreakpointIndicatorProps>(), {
  breakpoints: () => [
    { min: 640, name: 'sm' },
    { min: 768, name: 'md' },
    { min: 1024, name: 'lg' },
    { min: 1280, name: 'xl' },
    { min: 1536, name: '2xl' },
  ],
  enabled: true,
  fixed: true,
  hotkey: 'b',
  position: 'bottom-left',
  showRuler: false,
  showSize: true,
  visible: undefined,
})

const emit = defineEmits<{
  'update:visible': [visible: boolean]
}>()

const STORAGE_KEY = 'nuxt-motion-block:breakpoint-indicator:visible'
const BASE_BREAKPOINT_NAME = 'base'
const PERCENT_MIN = 0
const PERCENT_MAX = 100

const POSITION_CLASSES: Record<BreakpointIndicatorPosition, string> = {
  'bottom-left': 'bottom-3 left-3',
  'bottom-right': 'bottom-3 right-3',
  'top-left': 'top-3 left-3',
  'top-right': 'top-3 right-3',
}

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const { width, height } = useWindowSize()

/**
 * `visible` is checked against `undefined`, so the prop needs an explicit
 * `default: undefined`. Without it Vue's Boolean casting turns an absent prop
 * into `false`, and the component would believe it was controlled.
 */
const isControlled = computed(() => props.visible !== undefined)
const internalVisible = ref(true)
const mounted = ref(false)

const isVisible = computed(() =>
  isControlled.value ? Boolean(props.visible) : internalVisible.value,
)

function setVisible(next: boolean) {
  if (!isControlled.value) {
    internalVisible.value = next
  }

  emit('update:visible', next)
}

onMounted(() => {
  mounted.value = true

  if (isControlled.value) {
    return
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      internalVisible.value = stored === 'true'
    }
  }
  catch {
    // Storage can be blocked in private mode; the in-memory default still works.
  }
})

watch(internalVisible, (value) => {
  if (isControlled.value || !mounted.value) {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, String(value))
  }
  catch {
    // Same as above: persistence is a nicety, not a requirement.
  }
})

useEventListener('keydown', (event: KeyboardEvent) => {
  if (!props.enabled) {
    return
  }

  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === props.hotkey.toLowerCase()) {
    event.preventDefault()
    setVisible(!isVisible.value)
  }
})

const sortedBreakpoints = computed(() => [...props.breakpoints].sort((a, b) => a.min - b.min))

const activeBreakpoint = computed<Breakpoint>(() => {
  let active: Breakpoint = { min: 0, name: BASE_BREAKPOINT_NAME }

  for (const breakpoint of sortedBreakpoints.value) {
    if (width.value >= breakpoint.min) {
      active = breakpoint
    }
  }

  return active
})

const nextBreakpoint = computed<Breakpoint | null>(() =>
  sortedBreakpoints.value.find(breakpoint => breakpoint.min > width.value) ?? null,
)

/**
 * The ruler is a fraction of the gap between the two breakpoints that bracket
 * the current width. At the widest breakpoint there is nothing left to reach,
 * so it sits full rather than dividing by zero.
 */
const rulerPercent = computed(() => {
  const next = nextBreakpoint.value

  if (!next) {
    return PERCENT_MAX
  }

  const span = next.min - activeBreakpoint.value.min
  const travelled = width.value - activeBreakpoint.value.min
  const percent = span > 0 ? (travelled / span) * PERCENT_MAX : PERCENT_MAX

  return Math.min(PERCENT_MAX, Math.max(PERCENT_MIN, percent))
})

const remainingPixels = computed(() =>
  nextBreakpoint.value ? Math.max(0, nextBreakpoint.value.min - width.value) : 0,
)

const statusLabel = computed(() =>
  `Current breakpoint ${activeBreakpoint.value.name}, viewport ${width.value} by ${height.value} pixels`,
)

const positionClass = computed(() => POSITION_CLASSES[props.position])

const labelInitial = { opacity: 0, y: 8 }
const labelAnimate = { opacity: 1, y: 0 }
const labelExit = computed(() => ({
  opacity: 0,
  transition: { duration: 0 },
  y: isReduced.value ? 0 : -8,
}))
const labelTransition = computed(() => (isReduced.value ? { duration: 0 } : SPRING_DEFAULT))
</script>

<template>
  <div
    v-if="mounted && props.enabled && isVisible"
    :aria-label="statusLabel"
    :class="[
      props.class,
      positionClass,
      props.fixed ? 'fixed' : 'absolute',
      'z-50 flex items-center gap-2 rounded-full border border-default bg-default/95 px-3 py-1.5 font-mono text-xs text-highlighted shadow-lg backdrop-blur',
    ]"
    :title="`Toggle with Ctrl/Cmd + ${props.hotkey.toUpperCase()}`"
    aria-live="polite"
    role="status"
  >
    <div class="relative h-4 overflow-hidden">
      <AnimatePresence
        :initial="false"
        mode="popLayout"
      >
        <motion.span
          :key="activeBreakpoint.name"
          :animate="labelAnimate"
          :exit="labelExit"
          :initial="labelInitial"
          :transition="labelTransition"
          class="inline-block font-semibold tracking-wide uppercase"
        >
          {{ activeBreakpoint.name }}
        </motion.span>
      </AnimatePresence>
    </div>

    <span
      v-if="props.showSize"
      class="text-muted"
    >
      {{ width }}×{{ height }}
    </span>

    <div
      v-if="props.showRuler"
      aria-hidden="true"
      class="flex items-center gap-1.5"
    >
      <div class="h-1 w-16 overflow-hidden rounded-full bg-elevated">
        <div
          class="h-full bg-primary"
          :style="{ width: `${rulerPercent}%` }"
        />
      </div>
      <span
        v-if="nextBreakpoint"
        class="text-dimmed"
      >{{ remainingPixels }}px</span>
    </div>
  </div>
</template>
