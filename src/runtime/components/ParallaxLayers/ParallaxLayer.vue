<template>
  <Motion
    class="absolute inset-0"
    :style="{
      filter: layer.blur ? `blur(${layer.blur}px)` : undefined,
      opacity: layer.opacity ?? 1,
      x: x,
      y: y,
    }"
  >
    <slot />
  </Motion>
</template>

<script setup lang="ts">
import type { MotionValue } from 'motion-v'
import { Motion, useTransform } from 'motion-v'
import type { ParallaxLayerConfig } from './types'

const props = withDefaults(
  defineProps<{
    /** Layout data for this layer. */
    layer: ParallaxLayerConfig
    /** Scroll progress, 0..1, already sprung by the parent. */
    progress: MotionValue<number>
    /** Sprung pointer offset in px, already depth-free. */
    pointerX: MotionValue<number>
    /** Sprung pointer offset in px, already depth-free. */
    pointerY: MotionValue<number>
    /** Half the travel distance for a depth of 1, in px. */
    range?: number
    /** 1 while the x axis is live, 0 once it is gated off. */
    xGate: MotionValue<number>
    /** 1 while the y axis is live, 0 once it is gated off. */
    yGate: MotionValue<number>
  }>(),
  {
    range: 80,
  },
)

// Scroll travel and pointer travel are computed separately so each can be
// zeroed independently: a vertical rig must still breathe with the pointer, and
// reduced motion must silence both without collapsing the layer to the centre.
const scrollX = useTransform(props.progress, [0, 1], [-props.range * props.layer.depth, props.range * props.layer.depth])
const scrollY = useTransform(props.progress, [0, 1], [-props.range * props.layer.depth, props.range * props.layer.depth])

const pointerOffsetX = useTransform(props.pointerX, value => value * props.layer.depth)
const pointerOffsetY = useTransform(props.pointerY, value => value * props.layer.depth)

const x = useTransform<number, number>(
  [scrollX, pointerOffsetX, props.xGate],
  ([scroll, pointer, gate]) => (scroll + pointer) * gate,
)

const y = useTransform<number, number>(
  [scrollY, pointerOffsetY, props.yGate],
  ([scroll, pointer, gate]) => (scroll + pointer) * gate,
)
</script>
