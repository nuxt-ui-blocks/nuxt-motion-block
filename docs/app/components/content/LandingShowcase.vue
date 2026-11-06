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
  { title: 'Aurora Background', tag: 'Backgrounds', to: '/components/backgrounds/aurora-background', blurb: 'A gradient that drifts behind your content.', preview: Aurora },
  { title: 'Spotlight', tag: 'Effects', to: '/components/effects/spotlight', blurb: 'A light that follows the cursor.', preview: Spotlight },
  { title: 'Glow Effect', tag: 'Effects', to: '/components/effects/glow-effect', blurb: 'An animated glow rim for any surface.', preview: Glow },
  { title: 'Stacked Cards', tag: 'Cards', to: '/components/cards/card-stack', blurb: 'Cards that fan, swap, and settle.', preview: CardStack },
  { title: 'Glass Card', tag: 'Cards', to: '/components/cards/glass-card', blurb: 'Frosted surfaces with real depth.', preview: Glass },
  { title: 'Text Shimmer', tag: 'Text', to: '/components/text/text-shimmer', blurb: 'A light sweep across a headline.', preview: Shimmer },
  { title: 'Text Scramble', tag: 'Text', to: '/components/text/text-scramble', blurb: 'Characters resolve into words.', preview: Scramble },
  { title: 'Animated Tooltip', tag: 'Interactive', to: '/components/interactive/animated-tooltip', blurb: 'Springy tooltips for any trigger.', preview: Tooltip },
  { title: 'Magnetic', tag: 'Movement', to: '/components/movement/magnetic', blurb: 'Elements that lean toward the pointer.', preview: Magnetic },
]
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <NuxtLink
      v-for="tile in tiles"
      :key="tile.title"
      :to="tile.to"
      class="group relative flex flex-col overflow-hidden rounded-2xl border border-default bg-elevated/20 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40"
    >
      <div class="dark relative h-[220px] overflow-hidden bg-neutral-950">
        <ClientOnly>
          <component :is="tile.preview" />
          <template #fallback>
            <div class="h-full w-full animate-pulse bg-white/5" />
          </template>
        </ClientOnly>

        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 rounded-none ring-1 ring-inset ring-white/10"
        />
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,transparent_40%,rgba(0,0,0,0.55)_100%)]"
        />
      </div>

      <div class="flex items-start justify-between gap-3 border-t border-default px-4 py-3">
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <span class="rounded-full border border-default px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-dimmed">{{ tile.tag }}</span>
            <span class="truncate text-sm font-medium text-highlighted">{{ tile.title }}</span>
          </div>
          <p class="mt-1 truncate text-xs text-muted">{{ tile.blurb }}</p>
        </div>
        <UIcon
          name="i-lucide-arrow-up-right"
          class="mt-1 size-4 shrink-0 text-dimmed transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </div>
    </NuxtLink>
  </div>
</template>
