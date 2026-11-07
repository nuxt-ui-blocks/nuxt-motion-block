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
    class="overflow-hidden border-y border-black/30 bg-[#141412] py-3 text-[#f4f1ea] dark:border-white/10"
    :style="maskStyle"
    aria-hidden="true"
  >
    <MInfiniteSlider :duration="70">
      <div class="flex shrink-0 items-center">
        <template
          v-for="item in items"
          :key="item"
        >
          <span class="whitespace-nowrap px-7 font-mono text-[11px] uppercase tracking-[0.18em] text-[#a9a79e]">{{ item }}</span>
          <span class="h-3 w-[2px] shrink-0 bg-[#f06a3c]" />
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
