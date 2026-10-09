<template>
  <div
    ref="root"
    class="relative overflow-hidden min-h-64"
    :class="props.class"
  >
    <ParallaxLayer
      v-for="(layer, index) in layers"
      :key="layer.id"
      :layer="layer"
      :progress="progress"
      :pointer-x="pointerX"
      :pointer-y="pointerY"
      :range="range"
      :x-gate="xGate"
      :y-gate="yGate"
    >
      <slot
        name="layer"
        :layer="layer"
        :index="index"
      />
    </ParallaxLayer>
  </div>
</template>

<script setup lang="ts">
import type { ScrollOffset } from 'motion-v'
import { useMotionValue, useReducedMotion, useScroll, useSpring } from 'motion-v'
import type { MaybeRef } from 'vue'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { SPRING_POINTER, SPRING_SCROLL } from '../../utils/motion-tokens'
import { useHoverCapable } from '../../composables/useHoverCapable'
import ParallaxLayer from './ParallaxLayer.vue'
import type { ParallaxDirection, ParallaxLayerConfig } from './types'

/** The furthest a layer of depth 1 travels, in px. */
const DEFAULT_RANGE_PX = 80

/** Ceiling on the pointer contribution, in px, before depth is applied. */
const POINTER_PARALLAX_MAX_PX = 20

/** Pointer position is measured as a -0.5..0.5 ratio around the centre. */
const CENTER_RATIO = 0.5

/**
 * Concentrated on the stretch where the scene is actually on screen: over the
 * full enter-to-exit range most of the layer separation is spent off-view.
 */
const DEFAULT_OFFSET = ['start 0.95', 'end 0.6'] as unknown as ScrollOffset

const props = withDefaults(
  defineProps<{
    /** Layers, back to front. Higher `depth` travels further. */
    layers: ParallaxLayerConfig[]
    /** Axis along which layers separate. Defaults to `'vertical'`. */
    direction?: ParallaxDirection
    /** Half the travel distance for a depth of 1, in px. */
    range?: number
    /** Additive pointer tracking. Ignored on touch and under reduced motion. */
    pointerParallax?: boolean
    /** Drive scroll off this element instead of the window. */
    container?: MaybeRef<HTMLElement | null | undefined>
    /**
     * Classes for the bounding box. Every layer is `absolute inset-0`, so the
     * root has no in-flow children to give it height — `min-h-64` is a floor
     * that stops the scene collapsing to nothing, and any `h-*` or `min-h-*`
     * you pass here overrides it.
     */
    class?: string
  }>(),
  {
    direction: 'vertical',
    range: DEFAULT_RANGE_PX,
    pointerParallax: false,
  },
)

// Refs
const root = ref<HTMLElement | null>(null)

// Motion values
const pointerXRaw = useMotionValue(0)
const pointerYRaw = useMotionValue(0)

// Spring values
const pointerX = useSpring(pointerXRaw, SPRING_POINTER)
const pointerY = useSpring(pointerYRaw, SPRING_POINTER)

const reducedMotion = useReducedMotion()

const { scrollYProgress } = useScroll({
  container: props.container,
  offset: DEFAULT_OFFSET,
  target: root,
})
const progress = useSpring(scrollYProgress, SPRING_SCROLL)

// Which axes are live is expressed as motion values rather than read inside the
// layers' transforms. A transform only re-runs when one of its *inputs* changes,
// so gating on a plain prop read would leave the axis stale — switching
// `direction` would do nothing until the next scroll or pointer move. Feeding
// the gate in as a motion value makes the switch take effect immediately, and
// puts reduced motion on the same footing: it silences travel without undoing
// layout, opacity or the per-layer blur.
const xGate = useMotionValue(1)
const yGate = useMotionValue(1)

watch([() => props.direction, reducedMotion], ([direction, reduced]) => {
  xGate.set(reduced === true || direction === 'vertical' ? 0 : 1)
  yGate.set(reduced === true || direction === 'horizontal' ? 0 : 1)
}, { immediate: true })

// Pointer parallax is only wired up on devices that actually have a hovering
// cursor, so a touch drag does not leave a layer stranded mid-transition.
const hoverCapable = useHoverCapable()

function onPointerMove(event: PointerEvent) {
  const node = root.value
  if (!node) return

  const rect = node.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return

  pointerXRaw.set(((event.clientX - rect.left) / rect.width - CENTER_RATIO) * POINTER_PARALLAX_MAX_PX)
  pointerYRaw.set(((event.clientY - rect.top) / rect.height - CENTER_RATIO) * POINTER_PARALLAX_MAX_PX)
}

function onPointerLeave() {
  pointerXRaw.set(0)
  pointerYRaw.set(0)
}

function attachPointer(node: HTMLElement) {
  node.addEventListener('pointermove', onPointerMove)
  node.addEventListener('pointerleave', onPointerLeave)
}

function detachPointer(node: HTMLElement) {
  node.removeEventListener('pointermove', onPointerMove)
  node.removeEventListener('pointerleave', onPointerLeave)
}

const pointerActive = computed(
  () => props.pointerParallax && hoverCapable.value && reducedMotion.value === false,
)

// Tracked explicitly rather than read from the watch's previous tuple, which is
// `undefined` on the immediate first run and would hide a live listener.
let listening: HTMLElement | undefined

watch(
  () => [pointerActive.value, root.value] as const,
  ([active, node]) => {
    if (listening) {
      detachPointer(listening)
      listening = undefined
    }
    if (active && node) {
      attachPointer(node)
      listening = node
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (listening) {
    detachPointer(listening)
    listening = undefined
  }
})
</script>
