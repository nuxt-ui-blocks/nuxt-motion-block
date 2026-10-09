<script setup lang="ts">
import { computed, ref } from 'vue'
import type { MaybeComputedElementRef } from '@vueuse/core'
import type { ScrollOffset } from 'motion-v'
import { Motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion-v'
import type { PerspectiveTextDriver, PerspectiveTextSplit } from './constants'
import {
  PERSPECTIVE_TEXT_3D_DEFAULT_DEPTH,
  PERSPECTIVE_TEXT_3D_DEFAULT_PERSPECTIVE,
  PERSPECTIVE_TEXT_3D_DEFAULT_ROTATE_X,
  PERSPECTIVE_TEXT_3D_DEFAULT_ROTATE_Y,
  PERSPECTIVE_TEXT_3D_FLAT_ROTATION,
  PERSPECTIVE_TEXT_3D_POINTER_RANGE_MULTIPLIER,
  PERSPECTIVE_TEXT_3D_SPRING_TRANSITION,
} from './constants'

export interface PerspectiveText3DProps {
  class?: string
  /**
   * Scroll container to measure against. Defaults to the window. Pass a getter
   * - `:container="() => panelRef"` - not the element: a plain binding is
   * unwrapped by the template and captured as `null` during `setup`, after
   * which nothing re-reads it and `useScroll` falls back to the window.
   *
   * The container must be positioned (`position: relative` is enough). Motion
   * locates this component by walking `offsetParent` up to the container, and a
   * static container is passed over by that walk, so the offsets get measured in
   * page space and never change while the container scrolls. The plane then
   * holds one angle for the whole scroll instead of turning.
   */
  container?: MaybeComputedElementRef
  /** Z offset between neighbouring segments, in pixels. */
  depth?: number
  /** What drives the plane's rotation. */
  driver?: PerspectiveTextDriver
  /**
   * Motion scroll offset tuple for the `scroll` driver, forwarded to
   * `useScroll`. The default opens the window while the headline is still
   * travelling into the scroller and closes it around the middle. Motion's own
   * default (`["start start", "end end"]`) needs the headline's edges to align
   * with the scroller's, which a headline shorter than its scroller never
   * reaches, so progress stays pinned at one end and the plane never turns.
   *
   * The window covers the headline's own travel through the scroller. Scroll
   * past that and progress correctly sits at `1`: any further travel is filler
   * space below the headline with nothing left to track.
   */
  offset?: ScrollOffset
  /** CSS perspective on the wrapper, in pixels. */
  perspective?: number
  /** Resting tilt on the X axis, in degrees. */
  rotateX?: number
  /** Resting tilt on the Y axis, in degrees. */
  rotateY?: number
  /** Whether to break the copy into words or into lines. */
  split?: PerspectiveTextSplit
  text: string
}

const props = withDefaults(defineProps<PerspectiveText3DProps>(), {
  depth: PERSPECTIVE_TEXT_3D_DEFAULT_DEPTH,
  driver: 'static',
  // A headline is almost always shorter than the scroller it travels through,
  // so Motion's edge-alignment default never completes its range. This window
  // opens as the line enters the lower part of the scroller and closes around
  // the time it reaches the middle, which both guarantees a full sweep and
  // leaves the line readable before and after it.
  offset: () => ['start 0.9', 'end 0.45'],
  perspective: PERSPECTIVE_TEXT_3D_DEFAULT_PERSPECTIVE,
  rotateX: PERSPECTIVE_TEXT_3D_DEFAULT_ROTATE_X,
  rotateY: PERSPECTIVE_TEXT_3D_DEFAULT_ROTATE_Y,
  split: 'words',
})

const shouldReduceMotion = useReducedMotion()

// The reference renders a bare paragraph when the visitor asks for reduced
// motion. A second element shape is not an option here - the server cannot know
// the preference, so it would always send the wrong one and the client would
// swap the DOM out from under a live tree. Instead the same tree is flattened:
// both rotations go to zero and the depth stack is dropped.
const isFlat = computed(() => shouldReduceMotion.value === true)

const wrapperRef = ref<HTMLElement | null>(null)

// Registered on every mount, whatever the driver, because hooks cannot be
// conditional without the hook order changing between renders. For the `static`
// and `pointer` drivers the result is simply never read.
const { scrollYProgress } = useScroll({
  container: props.container,
  offset: props.offset,
  target: wrapperRef,
})

const scrollRotateX = useSpring(
  useTransform(scrollYProgress, [0, 1], [props.rotateX, -props.rotateX]),
  PERSPECTIVE_TEXT_3D_SPRING_TRANSITION,
)
const scrollRotateY = useSpring(
  useTransform(scrollYProgress, [0, 1], [-props.rotateY, props.rotateY]),
  PERSPECTIVE_TEXT_3D_SPRING_TRANSITION,
)

/**
 * Break the copy into independently transformed segments. `words` collapses all
 * whitespace, so a wrapped `text` still lays out on one line; `lines` respects
 * `\n` and falls back to the whole string when there is no newline at all.
 */
function splitContent(content: string, split: PerspectiveTextSplit): string[] {
  if (split === 'lines') {
    const lines = content.split('\n').filter(Boolean)

    return lines.length > 0 ? lines : [content]
  }

  return content.split(/\s+/).filter(Boolean)
}

const segments = computed(() => splitContent(props.text, props.split))

/** The middle of an odd-length stack sits on the plane; an even one splits it. */
const midIndex = computed(() => (segments.value.length - 1) / 2)

// The scroll rotation travels as two individual springs on the plane's `style`.
// A composed `useMotionTemplate` string is resolved to plain text once when the
// visual element is created and then frozen at whatever it measured before the
// first scroll frame, and handing the springs to `animate` instead leaves the
// plane with no transform at all on this version of motion-v. `Motion`
// subscribes to each motion value placed directly in `style`, which is the
// idiom `KineticTypeScroll` relies on for the same scroll-driven numbers.
const pointerTilt = ref({ x: 0, y: 0 })

function onPointerMove(event: PointerEvent) {
  if (props.driver !== 'pointer' || isFlat.value || !wrapperRef.value) {
    return
  }

  const rect = wrapperRef.value.getBoundingClientRect()

  if (rect.width === 0 || rect.height === 0) {
    return
  }

  const relativeX = (event.clientX - rect.left) / rect.width - 0.5
  const relativeY = (event.clientY - rect.top) / rect.height - 0.5

  pointerTilt.value = {
    x: -relativeY * props.rotateX * PERSPECTIVE_TEXT_3D_POINTER_RANGE_MULTIPLIER,
    y: relativeX * props.rotateY * PERSPECTIVE_TEXT_3D_POINTER_RANGE_MULTIPLIER,
  }
}

function onPointerLeave() {
  if (props.driver !== 'pointer') {
    return
  }

  pointerTilt.value = { x: 0, y: 0 }
}

const planeAnimate = computed(() => {
  if (isFlat.value) {
    return {
      rotateX: PERSPECTIVE_TEXT_3D_FLAT_ROTATION,
      rotateY: PERSPECTIVE_TEXT_3D_FLAT_ROTATION,
    }
  }

  if (props.driver === 'pointer') {
    return { rotateX: pointerTilt.value.x, rotateY: pointerTilt.value.y }
  }

  if (props.driver === 'static') {
    return { rotateX: props.rotateX, rotateY: props.rotateY }
  }

  // The scroll driver has nothing to say on mount; the transform carries it.
  return undefined
})

const planeInitial = computed(() => {
  if (props.driver === 'scroll') {
    return undefined
  }

  return {
    rotateX: PERSPECTIVE_TEXT_3D_FLAT_ROTATION,
    rotateY: PERSPECTIVE_TEXT_3D_FLAT_ROTATION,
  }
})

const planeStyle = computed(() => {
  if (props.driver === 'scroll' && !isFlat.value) {
    return {
      transformStyle: 'preserve-3d',
      rotateX: scrollRotateX,
      rotateY: scrollRotateY,
    }
  }

  return { transformStyle: 'preserve-3d' }
})

const planeTransition = computed(() => {
  if (isFlat.value) {
    return { duration: 0 }
  }

  return PERSPECTIVE_TEXT_3D_SPRING_TRANSITION
})

function segmentStyle(index: number) {
  const style: Record<string, string> = {
    display: props.split === 'lines' ? 'block' : 'inline-block',
  }

  // Without a tilt there is nothing for a depth offset to be measured against,
  // so a flattened tree leaves the segments in one plane.
  if (!isFlat.value) {
    style.transform = `translateZ(${(index - midIndex.value) * props.depth}px)`
  }

  return style
}
</script>

<template>
  <div
    ref="wrapperRef"
    :class="props.class"
    :style="{ display: 'inline-block', perspective: `${props.perspective}px` }"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <!--
      Every segment below is aria-hidden, so the readable copy lives here. An
      aria-label on this wrapper would be dropped instead: a plain div with no
      role carries no accessible name.
    -->
    <span class="sr-only">{{ props.text }}</span>
    <Motion
      :animate="planeAnimate"
      :initial="planeInitial"
      :style="planeStyle"
      :transition="planeTransition"
    >
      <div
        v-for="(segment, index) in segments"
        :key="index"
        aria-hidden="true"
        :style="segmentStyle(index)"
      >
        {{ segment }}<template v-if="props.split === 'words' && index < segments.length - 1">
          {{ ' ' }}
        </template>
      </div>
    </Motion>
  </div>
</template>
