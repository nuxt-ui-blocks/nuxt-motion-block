<template>
  <div
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    :style="active ? { cursor: 'none' } : undefined"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <img
      :src="src"
      :alt="alt"
      :class="ui.image({ class: uiProps.ui?.image })"
    >
    <div
      aria-hidden="true"
      :class="ui.lens({ class: uiProps.ui?.lens })"
      :style="lensStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import lens from '../theme/lens'

export interface LensProps {
  /** Alternative text for the image. */
  alt?: string
  /** Extra classes for the frame. */
  class?: string
  /** Diameter of the lens, in pixels. */
  size?: number
  /** Image to magnify. The same file is used for the base image and the lens. */
  src: string
  ui?: Record<string, any>
  /** How much the lens enlarges the image. */
  zoom?: number
}

const props = withDefaults(defineProps<LensProps>(), {
  alt: '',
  class: undefined,
  size: 160,
  ui: undefined,
  zoom: 2,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'lens', props, theme: lens })

const rootRef = ref<HTMLElement | null>(null)
const active = ref(false)
const pointer = ref({ x: 0, y: 0, width: 0, height: 0 })

const onPointerMove = (event: PointerEvent) => {
  const root = rootRef.value
  if (!root) {
    return
  }

  const rect = root.getBoundingClientRect()
  pointer.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    width: rect.width,
    height: rect.height,
  }
  active.value = true
}

const onPointerLeave = () => {
  active.value = false
}

/**
 * The lens is a window onto a scaled copy of the same image. The background is
 * offset so the point under the pointer sits dead centre of the circle.
 */
const lensStyle = computed(() => {
  const half = props.size / 2
  const { x, y, width, height } = pointer.value

  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
    left: `${x - half}px`,
    top: `${y - half}px`,
    backgroundImage: `url("${props.src}")`,
    backgroundSize: `${width * props.zoom}px ${height * props.zoom}px`,
    backgroundPosition: `${half - x * props.zoom}px ${half - y * props.zoom}px`,
    opacity: active.value ? '1' : '0',
  }
})
</script>
