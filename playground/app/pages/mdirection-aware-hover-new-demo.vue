<template>
  <div class="space-y-12">
    <UPageHeader
      title="DirectionAwareHoverNew"
      description="The rebuilt hover card: direction is locked once on entry with atan2 math, then image and caption trade places."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Entry direction
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Only <code class="font-mono">mouseenter</code> matters here — the pointer angle from
        the card's center is rounded with <code class="font-mono">atan2</code> into one of four
        buckets and stays there for the whole hover. The image shifts opposite the caption so
        the card appears to open from that edge, and <code class="font-mono">AnimatePresence
          mode="wait"</code> sequences the swap.
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
          label="Enter from each edge"
          icon="i-lucide-mouse-pointer-2"
          variant="ghost"
          data-testid="hint"
        />
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(item, i) in scenes"
          :key="item.title"
          class="flex flex-col items-center gap-3"
        >
          <MDirectionAwareHoverNew
            :key="`${item.title}-${replayKey}`"
            :image-url="item.image"
            :data-testid="`hover-new-card-${i}`"
          >
            <template #content>
              <div
                class="space-y-1"
                :data-testid="`hover-new-content-${i}`"
              >
                <h3 class="text-xl font-bold">
                  {{ item.title }}
                </h3>
                <p class="text-sm text-white/80">
                  {{ item.subtitle }}
                </p>
              </div>
            </template>
          </MDirectionAwareHoverNew>

          <p
            class="font-mono text-xs text-muted"
            :data-testid="`new-scene-label-${i}`"
          >
            {{ item.label }}
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
          atan2 · 4 buckets · entry only
        </dd>
        <dt class="text-muted">
          direction states
        </dt>
        <dd class="font-mono">
          top / right / bottom / left
        </dd>
        <dt class="text-muted">
          image shift
        </dt>
        <dd class="font-mono">
          ±20px opposite the caption
        </dd>
        <dt class="text-muted">
          image sizing
        </dt>
        <dd class="font-mono">
          110% bleed at -5% offset
        </dd>
        <dt class="text-muted">
          presence
        </dt>
        <dd class="font-mono">
          AnimatePresence mode="wait"
        </dd>
        <dt class="text-muted">
          caption anchor
        </dt>
        <dd class="font-mono">
          absolute bottom-left
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Side by side with the original
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Same four props, same default sizing, different machinery. The original reacts to
        every <code class="font-mono">mousemove</code> and re-keys the caption when you cross
        a center line; this one reads the angle once, holds it, and eases the image underneath
        while the caption fades up in place.
      </p>

      <div class="grid gap-6 sm:grid-cols-2">
        <div class="flex flex-col items-center gap-3">
          <MDirectionAwareHover
            :key="`compare-old-${replayKey}`"
            :image-url="scenes[0].image"
            class="h-56 w-full max-w-md rounded-xl ring-1 ring-default"
            data-testid="compare-old"
          >
            <template #content>
              <div
                class="space-y-1"
                data-testid="compare-old-content"
              >
                <p class="text-lg font-bold">
                  DirectionAwareHover
                </p>
                <p class="text-xs text-white/80">
                  re-aims while you move
                </p>
              </div>
            </template>
          </MDirectionAwareHover>
          <p class="font-mono text-xs text-muted">
            mousemove-driven
          </p>
        </div>

        <div class="flex flex-col items-center gap-3">
          <MDirectionAwareHoverNew
            :key="`compare-new-${replayKey}`"
            :image-url="scenes[1].image"
            class="h-56 w-full max-w-md rounded-xl ring-1 ring-default"
            data-testid="compare-new"
          >
            <template #content>
              <div
                class="space-y-1"
                data-testid="compare-new-content"
              >
                <p class="text-lg font-bold">
                  DirectionAwareHoverNew
                </p>
                <p class="text-xs text-white/80">
                  angle locked at entry
                </p>
              </div>
            </template>
          </MDirectionAwareHoverNew>
          <p class="font-mono text-xs text-muted">
            mouseenter-driven
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
        Caveats carried over from the original: <code class="font-mono">class</code> replaces
        the default sizing outright, the image tag hardcodes <code class="font-mono">alt="image"</code>,
        and the direction math calls <code class="font-mono">.$el.getBoundingClientRect()</code>
        with a <code class="font-mono">@ts-ignore</code> because the template ref points at the
        motion component rather than a DOM node. Like its sibling, this page uses inline SVG
        data URIs instead of the network image in the docs.
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
    title: 'Amber dunes',
    subtitle: 'Enter low-left or high-right.',
    label: 'direction fixed on entry',
    image: scene('#f59e0b', '#7c2d12', '<path d="M0 620 Q300 520 800 640 L800 800 L0 800 Z" fill="rgba(0,0,0,0.35)"/><circle cx="600" cy="180" r="80" fill="rgba(255,255,255,0.8)"/>'),
  },
  {
    title: 'Night pass',
    subtitle: 'Re-enter from another edge.',
    label: 'leave and come back to re-aim',
    image: scene('#6366f1', '#020617', '<circle cx="200" cy="180" r="55" fill="rgba(255,255,255,0.75)"/><path d="M0 800 L320 380 L520 660 L800 420 L800 800 Z" fill="rgba(0,0,0,0.45)"/>'),
  },
  {
    title: 'Salt flat',
    subtitle: 'Image slides opposite the caption.',
    label: '±20px counter-shift',
    image: scene('#ec4899', '#4c1d95', '<rect x="0" y="500" width="800" height="300" fill="rgba(255,255,255,0.15)"/><circle cx="400" cy="300" r="120" fill="rgba(255,255,255,0.35)"/>'),
  },
] as const

const propTour = [
  { name: 'imageUrl', value: 'string · required' },
  { name: 'class', value: 'sizing · \'md:h-96 w-60 h-60 md:w-96\'' },
  { name: 'imageClass', value: 'string · \'\' · appended' },
  { name: 'childrenClass', value: 'string · \'\' · appended' },
  { name: 'slot #content', value: 'caption overlay' },
  { name: 'events', value: 'mouseenter only' },
] as const
</script>
