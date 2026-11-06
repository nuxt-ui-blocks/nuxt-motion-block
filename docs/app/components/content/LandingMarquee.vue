<script setup lang="ts">
const items = [
  'Spotlight',
  'Background Beams',
  'Magnetic',
  'Glow Effect',
  'Text Scramble',
  'Stacked Cards',
  'Infinite Slider',
  'Meteors',
  'Shooting Stars',
  'Animated Number',
  'Animated Tooltip',
  'Word Rotate',
  'Text Shimmer',
  'Aurora Background',
  'Glass Card',
  'Text Morph',
  'Orbital Wheel',
  'Perspective Text',
  'Animated Spotlight',
  'Flip Card',
]

const maskStyle = {
  maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
}
</script>

<template>
  <div
    class="relative border-y border-default py-4"
    :style="maskStyle"
  >
    <MInfiniteSlider :duration="70">
      <div class="flex shrink-0 items-center">
        <template
          v-for="item in items"
          :key="item"
        >
          <span class="whitespace-nowrap px-6 font-mono text-[11px] uppercase tracking-[0.18em] text-dimmed">{{ item }}</span>
          <span class="size-1 shrink-0 rounded-full bg-primary/40" />
        </template>
      </div>
    </MInfiniteSlider>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  :deep(.infinite-slider-content) {
    animation: none !important;
  }
}
</style>
