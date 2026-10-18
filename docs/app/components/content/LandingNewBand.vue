<script setup lang="ts">
const chips = ['PerspectiveText3D', 'OrbitalImageWheel', 'AnimatedSpotlight', 'Vortex', 'Tilt', 'Particles']
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl border border-default/70 bg-elevated/20">
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    <div class="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2">
      <div>
        <span class="text-sm font-medium uppercase tracking-widest text-primary">3D</span>
        <h2 class="mt-3 text-3xl font-semibold tracking-tight text-highlighted text-pretty sm:text-4xl">
          Depth that stays smooth
        </h2>
        <p class="mt-4 text-lg text-muted text-pretty">
          Perspective, tilt, and spring physics that render on the GPU and hold their frame rate.
        </p>
        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="chip in chips"
            :key="chip"
            class="rounded-full border border-default/70 bg-elevated/40 px-3 py-1 font-mono text-xs text-muted"
          >{{ chip }}</span>
        </div>
        <UButton
          to="/components"
          class="mt-8"
          trailing-icon="i-lucide-arrow-right"
        >
          Browse all components
        </UButton>
      </div>

      <div class="relative flex min-h-[320px] flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl border border-default/70 bg-default/40 p-8">
        <MPerspectiveText3D
          driver="pointer"
          text="Depth, dimension, motion"
          :rotate-x="16"
          :rotate-y="18"
          class="px-6 py-4 text-center text-3xl font-semibold text-highlighted"
        />
        <p class="text-xs text-dimmed">
          Move your cursor
        </p>
      </div>
    </div>
  </div>
</template>
