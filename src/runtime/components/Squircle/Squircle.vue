<template>
  <component
    :is="props.as"
    ref="elementRef"
    :class="[props.border ? 'border border-default' : undefined, props.class]"
    :style="rootStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { DEFAULT_SQUIRCLE_RADIUS, DEFAULT_SQUIRCLE_SMOOTHING } from './constants'
import { squirclePath } from './squirclePath'

/**
 * A box whose corners follow a superellipse curve instead of a circular arc.
 *
 * The shape comes from `clip-path: path(...)` over a measured box, so the root
 * has to be laid out before the path can exist. That measurement starts at zero
 * and is filled in from `onMounted`, which means the server and the first client
 * render agree on an unclipped box and the curve arrives one tick later — a
 * visible pop on load rather than a hydration mismatch.
 *
 * The `defineProps` interface is inline on purpose. The dev server resolves a
 * component's props through the browser-side `compileScript` path, which cannot
 * follow a filesystem import — an imported prop type silently breaks the
 * browser build.
 */
export interface SquircleProps {
  /** Element or component to render as. */
  as?: string
  /** Draw a hairline border. */
  border?: boolean
  /** Extra classes merged onto the root element. */
  class?: string
  /** Corner radius in pixels. */
  radius?: number
  /** Superellipse amount, 0 (circular) to 1 (flat into the edges). */
  smoothing?: number
}

const props = withDefaults(defineProps<SquircleProps>(), {
  as: 'div',
  border: false,
  radius: DEFAULT_SQUIRCLE_RADIUS,
  smoothing: DEFAULT_SQUIRCLE_SMOOTHING,
})

const elementRef = ref<HTMLElement | null>(null)
const width = ref(0)
const height = ref(0)

function measure() {
  const element = elementRef.value
  if (!element) {
    return
  }

  const rect = element.getBoundingClientRect()
  width.value = rect.width
  height.value = rect.height
}

let observer: ResizeObserver | null = null

/**
 * Measured on mount and then tracked, rather than measured once. A squircle
 * whose path was computed against a stale size clips its own content the moment
 * the box changes — and these boxes are usually sized by their content.
 */
onMounted(() => {
  measure()

  if (typeof ResizeObserver === 'undefined' || !elementRef.value) {
    return
  }

  observer = new ResizeObserver(measure)
  observer.observe(elementRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})

/**
 * Generated unconditionally, never delegated to CSS `corner-shape: squircle`.
 * That property is a single fixed shape that silently ignores `smoothing`, so
 * falling back to it where supported would render the same props as two
 * different corners depending on the browser.
 */
const clipPath = computed(() => {
  if (width.value === 0 || height.value === 0) {
    return undefined
  }

  const path = squirclePath(width.value, height.value, props.radius, props.smoothing)
  return path ? `path('${path}')` : undefined
})

/**
 * `border-radius` stays on as well as the clip path. The clip only constrains
 * the outline; the radius is what keeps any child background or overflow
 * consistent with the same curve.
 */
const rootStyle = computed(() => ({
  borderRadius: `${props.radius}px`,
  clipPath: clipPath.value,
}))
</script>
