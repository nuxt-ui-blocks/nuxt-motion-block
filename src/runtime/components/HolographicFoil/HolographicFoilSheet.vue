<template>
  <Motion
    aria-hidden="true"
    class="pointer-events-none absolute"
    :style="style"
  />
</template>

<script setup lang="ts">
import type { MotionValue } from 'motion-v'
import { Motion } from 'motion-v'
import { computed } from 'vue'
import type { FoilMaterial } from './constants'
import { FOIL_DRIFT, FOIL_MASK } from './constants'

const props = defineProps<{
  /** Material record for the current pattern. */
  material: FoilMaterial
  /** Horizontal foil travel, as a percent string. */
  x: MotionValue<string>
  /** Vertical foil travel, as a percent string. */
  y: MotionValue<string>
  /** The `hue-rotate saturate contrast` filter, already sprung and live. */
  filter: MotionValue<string>
  /** False when nothing is driving the card, which drops the filter entirely. */
  live: boolean
  /** Sheet opacity, derived from `intensity`. */
  opacity: number
}>()

// The sheet is inset well past the card so that the band never exposes an edge
// while it travels; the diagonal mask then crops it back to a sweep.
const INSET = `-${FOIL_DRIFT * 2}%`

const style = computed(() => ({
  backgroundImage: props.material.background,
  // Dropping the filter rather than neutralising it keeps the layer a plain
  // gradient when idle, which is what a static screenshot should show.
  filter: props.live ? props.filter : undefined,
  inset: INSET,
  maskImage: FOIL_MASK,
  WebkitMaskImage: FOIL_MASK,
  mixBlendMode: props.material.blend,
  opacity: props.opacity,
  willChange: 'transform',
  x: props.live ? props.x : 0,
  y: props.live ? props.y : 0,
}))
</script>
