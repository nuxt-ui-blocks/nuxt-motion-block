<template>
  <div class="space-y-12">
    <UPageHeader
      title="DirectionAwareHover"
      description="A hover card whose caption slides in from the edge the pointer is closest to, re-aiming as you move across it."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Entry direction
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        On <code class="font-mono">mousemove</code> the cursor position is bucketed into
        quadrants for a first guess of top / bottom, then horizontal distance beats vertical
        distance and the winner becomes left / right. The caption is keyed on that direction,
        so crossing the center line mid-hover replays the slide from the new edge. Leaving the
        card exits the caption the way it entered.
      </p>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replayKey++"
        />
        <UButton
          label="Move across the center lines"
          icon="i-lucide-mouse-pointer-2"
          variant="ghost"
          data-testid="hint"
        />
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(entry, i) in scenes"
          :key="entry.title"
          class="flex flex-col items-center gap-3"
        >
          <MDirectionAwareHover
            :key="`${entry.title}-${replayKey}`"
            :image-url="entry.image"
            :data-testid="`hover-card-${i}`"
          >
            <template #content>
              <div
                class="space-y-2"
                :data-testid="`hover-content-${i}`"
              >
                <h3 class="text-xl font-bold">
                  {{ entry.title }}
                </h3>
                <p class="text-sm text-white/80">
                  {{ entry.subtitle }}
                </p>
                <span class="inline-block rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-black">
                  View project
                </span>
              </div>
            </template>
          </MDirectionAwareHover>

          <p
            class="font-mono text-xs text-muted"
            :data-testid="`scene-label-${i}`"
          >
            {{ entry.label }}
          </p>
        </div>
      </div>

      <dl class="mt-8 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          detection
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-detection"
        >
          quadrant, then |dx| vs |dy|
        </dd>
        <dt class="text-muted">
          states
        </dt>
        <dd class="font-mono">
          top / bottom / left / right
        </dd>
        <dt class="text-muted">
          caption re-key
        </dt>
        <dd class="font-mono">
          on every direction change
        </dd>
        <dt class="text-muted">
          enter / exit
        </dt>
        <dd class="font-mono">
          20px slide + fade · 0.4s easeOut
        </dd>
        <dt class="text-muted">
          image zoom
        </dt>
        <dd class="font-mono">
          scale 1 → 1.1 while hovered
        </dd>
        <dt class="text-muted">
          slot
        </dt>
        <dd class="font-mono">
          #content
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Sizing and class props
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The default <code class="font-mono">class</code> is
        <code class="font-mono">md:h-96 w-60 h-60 md:w-96</code> — passing your own replaces
        it entirely, so repeat the dimensions you want. <code class="font-mono">imageClass</code>
        and <code class="font-mono">childrenClass</code> append to the internal image and
        caption wrappers instead.
      </p>

      <div class="grid gap-6 sm:grid-cols-2">
        <div class="flex flex-col items-center gap-3">
          <MDirectionAwareHover
            :key="`small-${replayKey}`"
            :image-url="scenes[1].image"
            class="h-44 w-44 rounded-xl ring-1 ring-default"
            data-testid="hover-small"
          >
            <template #content>
              <p
                class="text-sm font-bold"
                data-testid="small-content"
              >
                176px card
              </p>
            </template>
          </MDirectionAwareHover>
          <p class="font-mono text-xs text-muted">
            class overrides the default sizing
          </p>
        </div>

        <div class="flex flex-col items-center gap-3">
          <MDirectionAwareHover
            :key="`styled-${replayKey}`"
            :image-url="scenes[2].image"
            class="h-56 w-full max-w-sm rounded-xl ring-1 ring-default"
            image-class="saturate-50 contrast-125"
            children-class="text-xs uppercase tracking-widest"
            data-testid="hover-styled"
          >
            <template #content>
              <p
                class="font-bold"
                data-testid="styled-content"
              >
                desaturated + tracked caption
              </p>
            </template>
          </MDirectionAwareHover>
          <p class="font-mono text-xs text-muted">
            imageClass / childrenClass append
          </p>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Props in the source
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt
          v-for="prop in propTour"
          :key="prop.name"
          class="text-muted"
        >
          {{ prop.name }}
        </dt>
        <dd
          v-for="prop in propTour"
          :key="`${prop.name}-value`"
          class="font-mono"
        >
          {{ prop.value }}
        </dd>
      </dl>

      <p class="mt-4 text-xs text-muted">
        The built-in fallback caption ships a UButton labeled "View Project" — any
        <code class="font-mono">#content</code> slot replaces it. The image tag hardcodes
        <code class="font-mono">alt="image"</code> and 1000×1000 width/height attributes.
        Doc note: the examples load an unsplash URL; these cards use inline SVG data URIs so
        the page renders without the network.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const replayKey = ref(0)

function scene(from: string, to: string, shapes: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="800" height="800" fill="url(#g)"/>${shapes}</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const scenes = [
  {
    title: 'Ridge at dusk',
    subtitle: 'Quadrant guess, then horizontal override.',
    label: 'enter from any edge',
    image: scene('#f97316', '#7c3aed', '<circle cx="620" cy="180" r="90" fill="rgba(255,255,255,0.85)"/><path d="M0 800 L260 420 L430 640 L560 480 L800 800 Z" fill="rgba(0,0,0,0.35)"/>'),
  },
  {
    title: 'Cold harbour',
    subtitle: 'Caption re-keys when you cross a center line.',
    label: 'moving while hovered replays',
    image: scene('#0ea5e9', '#0f172a', '<path d="M0 560 Q200 500 400 560 T800 560 L800 800 L0 800 Z" fill="rgba(255,255,255,0.18)"/><circle cx="180" cy="200" r="70" fill="rgba(255,255,255,0.7)"/>'),
  },
  {
    title: 'Pine slope',
    subtitle: 'Exits the way the caption entered.',
    label: 'leave to reverse the slide',
    image: scene('#22c55e', '#14532d', '<polygon points="240,760 340,380 440,760" fill="rgba(0,0,0,0.4)"/><polygon points="480,760 570,460 660,760" fill="rgba(0,0,0,0.3)"/><circle cx="620" cy="160" r="60" fill="rgba(255,255,255,0.8)"/>'),
  },
] as const

const propTour = [
  { name: 'imageUrl', value: 'string · required' },
  { name: 'class', value: 'sizing · \'md:h-96 w-60 h-60 md:w-96\'' },
  { name: 'imageClass', value: 'string · \'\' · appended' },
  { name: 'childrenClass', value: 'string · \'\' · appended' },
  { name: 'slot #content', value: 'caption overlay' },
  { name: 'events', value: 'mouseenter / move / leave' },
] as const
</script>
