<template>
  <div class="space-y-12">
    <UPageHeader
      title="TracingBeam"
      description="A gradient beam wired to scroll — the SVG path stretches to the content height and a dot is clamped to scroll progress."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Scroll timeline
        </p>
        <p class="text-muted">
          The beam lives in an absolutely positioned layer over a normal document flow. Its height
          is measured from the content at mount, the path climbs from the first dot toward the
          last, and the travelling dot is clamped to scroll progress. Scroll this page — the beam
          is live against the window.
        </p>
      </template>

      <div class="mb-6 flex flex-wrap items-center gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
        <UButton
          v-for="preset in colorPresets"
          :key="preset.name"
          :color="activePreset === preset.name ? 'primary' : 'neutral'"
          :label="preset.name"
          :variant="activePreset === preset.name ? 'solid' : 'outline'"
          size="sm"
          data-testid="color-preset"
          @click="applyPreset(preset.name)"
        />
      </div>

      <div class="rounded-2xl border border-default px-4 py-8">
        <MTracingBeam
          :key="`basic-${replayKey}`"
          :beam-color="activeColors"
          class="pl-16 md:pl-24"
          data-testid="basic"
        >
          <div
            v-for="entry in timeline"
            :key="entry.title"
            class="mb-4 rounded-2xl border border-default bg-(--ui-bg-muted) p-4"
            :class="entry.height"
          >
            <p class="text-xs font-semibold tracking-wide text-primary uppercase">
              {{ entry.tag }}
            </p>
            <p class="mt-1 font-semibold text-highlighted">
              {{ entry.title }}
            </p>
            <p class="mt-2 text-sm text-muted">
              {{ entry.body }}
            </p>
          </div>
        </MTracingBeam>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          svg height attr
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-svg-height"
        >
          {{ readouts.svgHeight }}
        </dd>
        <dt class="text-muted">
          content height
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-content-height"
        >
          {{ readouts.contentHeight }}
        </dd>
        <dt class="text-muted">
          blocks
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-blocks"
        >
          {{ readouts.blocks }}
        </dd>
        <dt class="text-muted">
          scroll progress
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-progress"
        >
          {{ readouts.progress }}
        </dd>
        <dt class="text-muted">
          beam colors
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-colors"
        >
          {{ activeColors.join(' ') }}
        </dd>
        <dt class="text-muted">
          svg width
        </dt>
        <dd class="font-mono">
          20px (hardcoded)
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Beam colors
        </p>
        <p class="text-muted">
          <code class="font-mono">beamColor</code> takes exactly three stops — they populate the
          <code class="font-mono">linearGradient</code> from top to bottom. One beam instance per
          page: the SVG gradient is registered under a fixed
          <code class="font-mono">url(#gradient)</code> id, so a second instance would resolve to
          the first one's stops.
        </p>
      </template>

      <div class="space-y-4">
        <div
          v-for="preset in colorPresets"
          :key="`swatch-${preset.name}`"
          class="space-y-1"
        >
          <p class="text-xs font-medium text-muted">
            {{ preset.name }}
          </p>
          <div
            class="h-6 w-full rounded-full"
            :style="{
              backgroundImage: `linear-gradient(to bottom, ${preset.colors[0]}, ${preset.colors[1]}, ${preset.colors[2]})`,
            }"
          />
          <p class="font-mono text-[11px] text-dimmed">
            {{ preset.colors.join(' → ') }}
          </p>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          stop count
        </dt>
        <dd class="font-mono">
          3 (fixed array)
        </dd>
        <dt class="text-muted">
          gradient url
        </dt>
        <dd class="font-mono">
          #gradient
        </dd>
        <dt class="text-muted">
          gradient axis
        </dt>
        <dd class="font-mono">
          y1 → y2, vertical
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Anatomy
        </p>
        <p class="text-muted">
          Positions come from the component's own Tailwind classes — the beam layer is offset
          outside the container on md and up, so the wrapper needs room to its left.
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          container
        </dt>
        <dd class="font-mono">
          relative mx-auto max-w-4xl
        </dd>
        <dt class="text-muted">
          beam layer
        </dt>
        <dd class="font-mono">
          absolute top-3 -left-4 md:-left-20
        </dd>
        <dt class="text-muted">
          start dot
        </dt>
        <dd class="font-mono">
          top-3 -left-4 md:-left-20, 16px ring
        </dd>
        <dt class="text-muted">
          path
        </dt>
        <dd class="font-mono">
          M 0 0 → L 0 −svgHeight
        </dd>
        <dt class="text-muted">
          travelling dot
        </dt>
        <dd class="font-mono">
          −scrollProgress × (height − 30)
        </dd>
        <dt class="text-muted">
          progress source
        </dt>
        <dd class="font-mono">
          scroll on window
        </dd>
        <dt class="text-muted">
          beam width
        </dt>
        <dd class="font-mono">
          20px, stroke 2px
        </dd>
        <dt class="text-muted">
          dot swap
        </dt>
        <dd class="font-mono">
          white core once tracking
        </dd>
        <dt class="text-muted">
          left margin needed
        </dt>
        <dd class="font-mono">
          md: -left-20 → pl-24 wrapper
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const colorPresets = [
  { name: 'default', colors: ['#18CCFC', '#6344F5', '#AE48FF'] },
  { name: 'doc rgb', colors: ['#FF0000', '#00FF00', '#0000FF'] },
  { name: 'sunset', colors: ['#F59E0B', '#EF4444', '#EC4899'] },
] as const

type PresetName = (typeof colorPresets)[number]['name']

const timeline = [
  {
    tag: 'step 01',
    title: 'The path is as tall as the content',
    body: 'The content element is measured at mount and the SVG height is copied from it, so the beam always spans exactly the blocks it sits beside — never the viewport.',
    height: 'min-h-40',
  },
  {
    tag: 'step 02',
    title: 'Scroll progress drives the dot',
    body: 'Progress is clamped to 0–1 across the whole track and multiplied by (height − 30) to keep the dot inside the path rather than past its end.',
    height: 'min-h-32',
  },
  {
    tag: 'step 03',
    title: 'Color stops swap at the midpoint',
    body: 'The gradient carries three stops. Before halfway the beam reads the first stop, after halfway it reads the third — that is why the travelling dot appears to change temperature as it climbs.',
    height: 'min-h-56',
  },
  {
    tag: 'step 04',
    title: 'One gradient id per document',
    body: 'The SVG registers its linearGradient under a fixed id. Two beams on one page would share that id and the second would paint with the first one\'s colors.',
    height: 'min-h-32',
  },
  {
    tag: 'step 05',
    title: 'Content stays ordinary flow',
    body: 'Blocks below are normal children with margin. The beam is a sibling layer, so layout, spacing and responsive behavior are entirely yours — the beam only reads the resulting height.',
    height: 'min-h-44',
  },
] as const

const activePreset = ref<PresetName>('default')
const activeColors = ref<string[]>([...colorPresets[0].colors])
const replayKey = ref(0)

function applyPreset(name: PresetName) {
  activePreset.value = name
  const found = colorPresets.find(preset => preset.name === name)
  if (found) {
    activeColors.value = [...found.colors]
  }
}

function replay() {
  replayKey.value++
}

const readouts = ref({
  blocks: 'pending',
  contentHeight: 'pending',
  progress: 'pending',
  svgHeight: 'pending',
})

let frame = 0

/**
 * Samples the beam's own SVG height against the measured content height, plus
 * the window scroll progress the component is tracking.
 */
function sample() {
  const root = document.querySelector('[data-testid="basic"]') as HTMLElement | null
  if (!root) {
    return
  }

  const svg = root.querySelector('svg')
  const content = root.children[1] as HTMLElement | undefined
  const rect = root.getBoundingClientRect()
  const raw = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
  const progress = Math.min(1, Math.max(0, raw))

  readouts.value = {
    blocks: content ? String(content.children.length) : '0',
    contentHeight: content ? `${Math.round(content.offsetHeight)}px` : '—',
    progress: `${Math.round(progress * 100)}%`,
    svgHeight: svg?.getAttribute('height') ?? '—',
  }
}

onMounted(() => {
  const tick = () => {
    sample()
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (frame) {
    cancelAnimationFrame(frame)
  }
})
</script>
