<script setup lang="ts">
const chips = ['MPerspectiveText3D', 'MTiltCard', 'MOrbitingCircles', 'MVortex', 'MParticles', 'MRetroGrid']
</script>

<template>
  <section class="relative isolate overflow-hidden bg-[#141412] text-[#f4f1ea]">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 bg-grid-ink opacity-70"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute right-[-10%] top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#e4572e] opacity-[0.09] blur-[150px]"
    />

    <div class="mb-shell relative">
      <div class="grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div class="relative z-10 lg:col-span-5">
          <div class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#a9a79e]">
            <span class="text-[#f06a3c]">05</span>
            <span
              aria-hidden="true"
              class="h-px w-8 bg-[#f06a3c]/60"
            />
            The dimension
          </div>

          <h2 class="display-tight mt-5 font-display text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[1.0] text-[#f4f1ea]">
            3D that doesn't<br>
            drop frames.
          </h2>
          <p class="mt-6 max-w-md text-lg leading-relaxed text-[#c9c7bd] text-pretty">
            Perspective, tilt and spring physics on the GPU. It reads as depth, not as a demo — which is the hard part.
          </p>

          <ul class="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a887f]">
            <li
              v-for="chip in chips"
              :key="chip"
            >
              {{ chip }}
            </li>
          </ul>

          <NuxtLink
            to="/components"
            class="mt-10 inline-flex items-center gap-2 border border-white/25 bg-transparent px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4f1ea] transition hover:border-[#f4f1ea] hover:bg-white/5"
          >
            Browse every component
            <UIcon
              name="i-lucide-arrow-right"
              class="size-3.5"
            />
          </NuxtLink>
        </div>

        <div class="relative lg:col-span-7">
          <div class="grid min-h-[220px] place-items-center border border-white/10 bg-[#1a1a18] px-6 py-12 sm:min-h-[260px] sm:py-16">
            <MPerspectiveText3D
              driver="pointer"
              text="Depth, dimension, motion."
              :rotate-x="12"
              :rotate-y="14"
              class="max-w-full font-display text-[clamp(1.9rem,4.6vw,3.2rem)] font-semibold leading-[1.05] text-[#f4f1ea]"
            />
          </div>
          <p class="mt-4 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a887f]">
            Move your cursor
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
