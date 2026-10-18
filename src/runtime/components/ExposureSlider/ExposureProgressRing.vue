<template>
  <div
    class="relative flex size-[75px] items-center justify-center"
  >
    <svg
      class="absolute inset-0 size-full"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <!-- Rest state of the ring, so an unselected slider still reads as a dial. -->
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="currentColor"
        fill-opacity="0.067"
        stroke="currentColor"
        stroke-opacity="0.3"
        stroke-width="3"
      />
      <!--
        Two mirrored arcs share one circle. The positive one grows clockwise from
        the top; the negative one is flipped with `scaleX(-1)` so it grows the
        other way. Only the arc on the side of zero that has travel is ever
        non-zero, so the ring reads as a needle leaving a centre-zero rest
        position rather than filling up.
      -->
      <circle
        cx="50"
        cy="50"
        r="48"
        pathLength="1"
        fill="none"
        stroke="var(--es-accent)"
        :stroke-dasharray="positiveDash"
        stroke-dashoffset="0"
        stroke-width="3"
        :style="arcStyle"
      />
      <circle
        cx="50"
        cy="50"
        r="48"
        pathLength="1"
        fill="none"
        stroke="var(--es-accent)"
        :stroke-dasharray="negativeDash"
        stroke-dashoffset="0"
        stroke-width="3"
        :style="mirroredArcStyle"
      />
    </svg>
    <span
      class="absolute text-lg font-semibold tabular-nums"
      :style="{ color: color }"
    >{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** Current value, already rounded to a whole step. */
  value: number
  /** `value` mapped to -1..1 across the full range. */
  normalized: number
}>()

const positiveDash = computed(() => (props.normalized > 0 ? `${props.normalized} ${1 - props.normalized}` : '0 1'))
const negativeDash = computed(() => (props.normalized < 0 ? `${-props.normalized} ${1 + props.normalized}` : '0 1'))

const color = computed(() => (Math.abs(props.normalized) > 0.01 ? 'var(--es-accent)' : 'currentColor'))

const arcStyle = { transform: 'rotate(-90deg)', transformBox: 'fill-box', transformOrigin: '50% 50%' } as const
const mirroredArcStyle = { transform: 'scaleX(-1) rotate(-90deg)', transformBox: 'fill-box', transformOrigin: '50% 50%' } as const
</script>
