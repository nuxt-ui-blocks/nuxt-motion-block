<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import CollisionMechanism from './CollisionMechanism.vue'

// Define BeamOptions interface
interface BeamOptions {
  initialX?: number
  translateX?: number
  initialY?: number
  translateY?: number
  rotate?: number
  className?: string
  duration?: number
  delay?: number
  repeatDelay?: number
  fromColor?: string
  viaColor?: string
  toColor?: string
}

// Define props
const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  beams: {
    type: Array as PropType<BeamOptions[]>,
    default: () => [
      {
        initialX: 10,
        translateX: 10,
        duration: 7,
        repeatDelay: 3,
        delay: 2,
      },
      {
        initialX: 600,
        translateX: 600,
        duration: 3,
        repeatDelay: 3,
        delay: 4,
      },
      {
        initialX: 100,
        translateX: 100,
        duration: 7,
        repeatDelay: 7,
        className: 'h-6',
      },
      {
        initialX: 400,
        translateX: 400,
        duration: 5,
        repeatDelay: 14,
        delay: 4,
      },
      {
        initialX: 800,
        translateX: 800,
        duration: 11,
        repeatDelay: 2,
        className: 'h-20',
      },
      {
        initialX: 1000,
        translateX: 1000,
        duration: 4,
        repeatDelay: 2,
        className: 'h-12',
      },
      {
        initialX: 1200,
        translateX: 1200,
        duration: 6,
        repeatDelay: 4,
        delay: 2,
        className: 'h-6',
      },
    ],
  },
})

// Refs for the parent container and the collision "ground"
const parentRef = ref<HTMLDivElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
</script>

<template>
  <div
    ref="parentRef"
    :class="[
      'h-96 md:h-[40rem] bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden',
      props.class,
    ]"
  >
    <template v-if="containerRef && parentRef">
      <CollisionMechanism
        v-for="beam in beams"
        :key="beam.initialX + 'beam-idx'"
        :beam-options="beam"
        :container-ref="containerRef"
        :parent-ref="parentRef"
      />
    </template>

    <slot />

    <div
      ref="containerRef"
      class="absolute bottom-0 bg-muted w-full inset-x-0 pointer-events-none"
      style="
        box-shadow: 0 0 24px rgba(34, 42, 53, 0.06),
          0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04),
          0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05),
          0 1px 0 rgba(255, 255, 255, 0.1) inset;
      "
    />
  </div>
</template>
