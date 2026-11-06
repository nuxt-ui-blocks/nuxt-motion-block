<script setup lang="ts">
import Aurora from './previews/Aurora.vue'
import CardStack from './previews/CardStack.vue'
import Glass from './previews/Glass.vue'
import Glow from './previews/Glow.vue'
import Magnetic from './previews/Magnetic.vue'
import Scramble from './previews/Scramble.vue'
import Shimmer from './previews/Shimmer.vue'
import Spotlight from './previews/Spotlight.vue'
import Tooltip from './previews/Tooltip.vue'

const tiles = [
  { no: '01', title: 'Aurora background', name: 'MAurora', tag: 'Backgrounds', to: '/components/backgrounds/aurora-background', preview: Aurora },
  { no: '02', title: 'Spotlight', name: 'MSpotlight', tag: 'Effects', to: '/components/effects/spotlight', preview: Spotlight },
  { no: '03', title: 'Glow effect', name: 'MGlowEffect', tag: 'Effects', to: '/components/effects/glow-effect', preview: Glow },
  { no: '04', title: 'Stacked cards', name: 'MCardStack', tag: 'Cards', to: '/components/cards/card-stack', preview: CardStack },
  { no: '05', title: 'Glass card', name: 'MGlassCard', tag: 'Cards', to: '/components/cards/glass-card', preview: Glass },
  { no: '06', title: 'Text shimmer', name: 'MTextShimmer', tag: 'Text', to: '/components/text/text-shimmer', preview: Shimmer },
  { no: '07', title: 'Text scramble', name: 'MTextScramble', tag: 'Text', to: '/components/text/text-scramble', preview: Scramble },
  { no: '08', title: 'Animated tooltip', name: 'MAnimatedTooltip', tag: 'Interactive', to: '/components/interactive/animated-tooltip', preview: Tooltip },
  { no: '09', title: 'Magnetic', name: 'MMagnetic', tag: 'Movement', to: '/components/movement/magnetic', preview: Magnetic },
]
</script>

<template>
  <section
    id="bench"
    class="relative isolate overflow-hidden border-t border-line bg-elevated/40"
  >
    <div class="mb-shell py-20 sm:py-24 lg:py-28">
      <div class="flex flex-wrap items-end justify-between gap-8">
        <div class="max-w-2xl">
          <div class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dimmed">
            <span class="text-primary">03</span>
            <span
              aria-hidden="true"
              class="h-px w-8 bg-primary/50"
            />
            The bench
          </div>
          <h2 class="display-tight mt-5 font-display text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[1.0] text-highlighted">
            The kit, live.
          </h2>
          <p class="mt-5 max-w-md text-lg leading-relaxed text-muted text-pretty">
            Nine components running on this page right now. No recordings, no mocks — hover, click, scroll.
          </p>
        </div>

        <NuxtLink
          to="/components"
          class="group inline-flex items-center gap-2 border border-line-muted px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-dimmed transition hover:border-primary hover:text-highlighted"
        >
          All 292
          <UIcon
            name="i-lucide-arrow-right"
            class="size-3.5 transition group-hover:translate-x-0.5"
          />
        </NuxtLink>
      </div>

      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="tile in tiles"
          :key="tile.name"
          :to="tile.to"
          class="group relative flex flex-col overflow-hidden border border-black/20 bg-[#141412] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#e4572e]/60 dark:border-white/10"
        >
          <div class="dark relative h-[230px] overflow-hidden">
            <ClientOnly>
              <component :is="tile.preview" />
              <template #fallback>
                <div class="h-full w-full animate-pulse bg-white/5" />
              </template>
            </ClientOnly>
            <span class="pointer-events-none absolute left-4 top-4 font-mono text-[10px] tabular-nums uppercase tracking-[0.18em] text-white/45">
              {{ tile.no }}
            </span>
            <span class="pointer-events-none absolute right-4 top-4 rounded-sm border border-white/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
              {{ tile.tag }}
            </span>
          </div>

          <div class="flex items-center justify-between gap-4 border-t border-white/10 bg-[#1a1a18] px-5 py-4">
            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-[#f4f1ea]">
                {{ tile.title }}
              </p>
              <p class="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a887f]">
                {{ tile.name }}
              </p>
            </div>
            <UIcon
              name="i-lucide-arrow-up-right"
              class="size-4 shrink-0 text-[#f4f1ea]/40 transition group-hover:text-[#f06a3c]"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
