<script setup lang="ts">
const chips = ['MTilt', 'MTiltCard', 'MPerspectiveText3D', 'MOrbitingCircles', 'MVortex', 'MParticles']
</script>

<template>
  <section class="relative overflow-hidden border-y border-default">
    <div class="mx-auto w-full max-w-(--ui-container) px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-8 py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-4 lg:py-20">
        <div class="relative z-10">
          <LandingEyebrow
            index="05"
            label="Depth"
          />
          <h2 class="mt-5 max-w-sm font-serif text-4xl leading-[1.05] text-highlighted text-pretty sm:text-5xl">
            3D that doesn't drop frames
          </h2>
          <p class="mt-4 max-w-md text-lg text-muted text-pretty">
            Perspective, tilt and spring physics on the GPU. It reads as depth, not as a demo — which is the hard part.
          </p>

          <div class="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] text-dimmed">
            <span
              v-for="chip in chips"
              :key="chip"
            >{{ chip }}</span>
          </div>

          <UButton
            to="/components"
            color="neutral"
            variant="outline"
            class="mt-8"
            trailing-icon="i-lucide-arrow-right"
          >
            Browse every component
          </UButton>
        </div>

        <div class="relative min-h-[280px] lg:min-h-[340px]">
          <div
            aria-hidden="true"
            class="absolute inset-0"
            style="background-image: radial-gradient(closest-side at 55% 50%, rgba(16, 185, 129, 0.18), transparent)"
          />
          <div class="relative grid h-full min-h-[280px] place-items-center lg:min-h-[340px]">
            <MPerspectiveText3D
              driver="pointer"
              text="Depth, dimension, motion"
              :rotate-x="16"
              :rotate-y="18"
              class="px-6 py-4 text-center font-serif text-4xl leading-tight text-highlighted sm:text-5xl lg:text-6xl"
            />
          </div>
          <p class="absolute bottom-0 right-0 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-dimmed sm:block">
            Move your cursor
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
