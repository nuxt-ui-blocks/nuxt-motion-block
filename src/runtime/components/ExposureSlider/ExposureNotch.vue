<template>
  <li
    class="relative shrink-0 grow-0"
    :style="{ height: 'fit-content' }"
  >
    <div :style="{ padding: '0 5px' }">
      <Motion
        class="rounded-sm"
        :style="{
          backgroundColor: bg,
          clipPath: clipPath,
          height: `${NOTCH_HEIGHT}px`,
          opacity: opacity,
          width: `${NOTCH_THICKNESS}px`,
          willChange: 'clip-path, opacity',
        }"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import type { MotionValue } from 'motion-v'
import { Motion, useTransform } from 'motion-v'
import { NOTCH_HEIGHT, NOTCH_THICKNESS, NOTCH_WIDTH } from './constants'

const props = defineProps<{
  /** Index of this notch in the full value range. */
  index: number
  /** Index the track is centred on, i.e. `defaultValue`. */
  centerIndex: number
  /** Live track offset in px, already sprung by the parent. */
  x: MotionValue<number>
}>()

/** Distance from centre, in notch units. Drives every visual property below. */
const distance = useTransform(props.x, (latest) => {
  const currentCenter = props.centerIndex + -latest / NOTCH_WIDTH
  return Math.abs(props.index - currentCenter)
})

// Notches fade and shorten as they drift away from centre, so the selected
// value reads as the tall bright mark and its neighbours as context.
const opacity = useTransform(distance, [0, 1, 3], [1, 0.6, 0.3])
const clipTop = useTransform(distance, [0, 1, 2], [0, 30, 50])
const clipPath = useTransform(clipTop, v => `inset(${v}% 0px 0px)`)

const isCenter = useTransform(distance, d => d < 0.5)
const bg = useTransform(isCenter, center => (center ? 'var(--es-accent)' : 'currentColor'))
</script>
