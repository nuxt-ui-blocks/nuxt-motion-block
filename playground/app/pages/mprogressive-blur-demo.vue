<template>
  <div class="space-y-12">
    <UPageHeader
      title="ProgressiveBlur"
      description="Stacked backdrop-blur layers whose masks step a gradient one segment at a time — a sharp edge dissolving into blur."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Directions
        </p>
        <p class="text-muted">
          <code class="font-mono">direction</code> picks the gradient angle (0 / 90 / 180 / 270)
          and the side the root is shifted outward by one segment. The blur builds up toward the
          named edge; the caption sits on the sharp one. The parent must be
          <code class="font-mono">relative overflow-hidden</code>, otherwise the shifted root
          spills one segment past it.
        </p>
      </template>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="tile in tiles"
          :key="`tile-${tile.direction}-${replayKey}`"
          class="space-y-2"
        >
          <div
            class="relative h-44 overflow-hidden rounded-2xl bg-gradient-to-br"
            :class="tile.gradient"
            :data-testid="`tile-${tile.direction}`"
          >
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-1 p-4 text-center">
              <p class="text-lg font-bold text-white">
                {{ tile.headline }}
              </p>
              <p class="text-xs text-white/80">
                behind the mask, {{ tile.blurAt }} blur builds
              </p>
            </div>
            <MProgressiveBlur
              :direction="tile.direction"
              class="absolute inset-0"
            />
            <p
              class="absolute rounded-full bg-black/40 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
              :class="tile.captionClass"
            >
              sharp {{ tile.sharpEdge }}
            </p>
          </div>
          <p class="font-mono text-[11px] text-muted">
            direction="{{ tile.direction }}" → {{ tile.angle }}deg, offset {{ tile.offset }}
          </p>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Prop tour
        </p>
        <p class="text-muted">
          <code class="font-mono">blurLayers</code> is the stack size, and
          <code class="font-mono">blurIntensity</code> is the px multiplier between neighbouring
          layers — layer <i>i</i> renders <code class="font-mono">blur(i × intensity)</code>. The
          overlay itself carries no animation props by default: the layers are static, the
          gradient mask is what makes them read as progressive.
        </p>
      </template>

      <div class="mb-8 relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400">
        <div class="absolute inset-0 flex items-start justify-center p-6">
          <div class="rounded-2xl bg-white/90 p-4 text-left shadow-lg dark:bg-black/80">
            <p class="text-sm font-bold text-highlighted">
              Content under a progressive veil
            </p>
            <p class="mt-1 text-xs text-muted">
              Slide the layers and watch the gradient band widths and blur ceiling move with them.
            </p>
          </div>
        </div>
        <MProgressiveBlur
          :key="`tour-${replayKey}`"
          :direction="tourDirection"
          :blur-layers="layers"
          :blur-intensity="blurIntensity"
          class="absolute inset-0"
          data-testid="tour"
        />
      </div>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="option in directions"
          :key="option"
          :color="tourDirection === option ? 'primary' : 'neutral'"
          :label="option"
          :variant="tourDirection === option ? 'solid' : 'outline'"
          size="sm"
          data-testid="direction"
          @click="tourDirection = option"
        />
      </div>

      <dl class="mb-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          layers rendered
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-layers"
        >
          {{ max(layers, 2) }}
        </dd>
        <dt class="text-muted">
          segment size
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-segment"
        >
          1 / ({{ layers }} + 1) = {{ (100 / (layers + 1)).toFixed(1) }}%
        </dd>
        <dt class="text-muted">
          blur ceiling
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-ceiling"
        >
          {{ ((Math.max(layers, 2) - 1) * blurIntensity).toFixed(2) }}px
        </dd>
        <dt class="text-muted">
          gradient angle
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-angle"
        >
          {{ angles[tourDirection] }}deg
        </dd>
        <dt class="text-muted">
          root offset
        </dt>
        <dd class="font-mono">
          {{ tourDirection }}: −{{ (100 / (layers + 1)).toFixed(1) }}%
        </dd>
        <dt class="text-muted">
          bands per layer
        </dt>
        <dd class="font-mono">
          4 stops, opaque middle
        </dd>
      </dl>

      <div class="grid gap-6 md:grid-cols-2">
        <UFormField
          label="blurLayers"
          :max="16"
          :min="2"
          :step="1"
        >
          <USlider
            v-model="layers"
            :max="16"
            :min="2"
            :step="1"
          />
        </UFormField>

        <UFormField
          label="blurIntensity (px per layer)"
          :max="2"
          :min="0.05"
          :step="0.05"
        >
          <USlider
            v-model="blurIntensity"
            :max="2"
            :min="0.05"
            :step="0.05"
          />
        </UFormField>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Anatomy and caveats
        </p>
        <p class="text-muted">
          Everything is derived in the component's computed styles — no observers, no timers.
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          layer count
        </dt>
        <dd class="font-mono">
          max(blurLayers, 2)
        </dd>
        <dt class="text-muted">
          segment size
        </dt>
        <dd class="font-mono">
          1 / (blurLayers + 1)
        </dd>
        <dt class="text-muted">
          mask per layer
        </dt>
        <dd class="font-mono">
          linear-gradient(angle, 4 stops)
        </dd>
        <dt class="text-muted">
          opaque band
        </dt>
        <dd class="font-mono">
          stops 2–3 → i+1 … i+2 segments
        </dd>
        <dt class="text-muted">
          blur per layer
        </dt>
        <dd class="font-mono">
          index × blurIntensity
        </dd>
        <dt class="text-muted">
          root shift
        </dt>
        <dd class="font-mono">
          −segmentSize% on the named side
        </dd>
        <dt class="text-muted">
          animation props
        </dt>
        <dd class="font-mono">
          initial / animate / variants / transition, all optional
        </dd>
        <dt class="text-muted">
          parent requirement
        </dt>
        <dd class="font-mono">
          relative + overflow-hidden
        </dd>
        <dt class="text-muted">
          class prop
        </dt>
        <dd class="font-mono">
          className + fallthrough class merge on root
        </dd>
        <dt class="text-muted">
          doc caveat
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-caveat"
        >
          :intensity is not a prop (unwired)
        </dd>
        <dt class="text-muted">
          real intensity prop
        </dt>
        <dd class="font-mono">
          blurIntensity, in px
        </dd>
        <dt class="text-muted">
          edge case
        </dt>
        <dd class="font-mono">
          segment uses blurLayers, stack uses max(…, 2)
        </dd>
      </dl>

      <p class="mt-6 rounded-2xl bg-(--ui-bg-muted) p-4 text-xs text-muted">
        The documentation example passes <code class="font-mono">:intensity="20"</code>, which is
        not a declared prop — it falls through to the root element as an HTML attribute and never
        reaches the layer math. The prop that actually moves the blur ceiling is
        <code class="font-mono">blurIntensity</code> (default <code class="font-mono">0.25</code>,
        multiplied by the layer index), so the shipped example renders at the component defaults
        while appearing to tune it.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Direction = 'top' | 'right' | 'bottom' | 'left'

const directions: Direction[] = ['top', 'right', 'bottom', 'left']

const angles: Record<Direction, number> = {
  bottom: 180,
  left: 270,
  right: 90,
  top: 0,
}

const tiles = [
  {
    direction: 'bottom' as const,
    angle: 180,
    blurAt: 'bottom',
    captionClass: 'top-3 left-3',
    gradient: 'from-sky-500 to-indigo-700',
    headline: 'direction: bottom',
    sharpEdge: 'top',
    offset: 'bottom: −segment%',
  },
  {
    direction: 'top' as const,
    angle: 0,
    blurAt: 'top',
    captionClass: 'bottom-3 left-3',
    gradient: 'from-emerald-500 to-teal-700',
    headline: 'direction: top',
    sharpEdge: 'bottom',
    offset: 'top: −segment%',
  },
  {
    direction: 'left' as const,
    angle: 270,
    blurAt: 'left',
    captionClass: 'top-3 right-3',
    gradient: 'from-amber-400 to-rose-500',
    headline: 'direction: left',
    sharpEdge: 'right',
    offset: 'left: −segment%',
  },
  {
    direction: 'right' as const,
    angle: 90,
    blurAt: 'right',
    captionClass: 'top-3 left-3',
    gradient: 'from-fuchsia-500 to-purple-700',
    headline: 'direction: right',
    sharpEdge: 'left',
    offset: 'right: −segment%',
  },
] as const

const tourDirection = ref<Direction>('bottom')
const layers = ref(8)
const blurIntensity = ref(0.5)
const replayKey = ref(0)

function max(a: number, b: number) {
  return Math.max(a, b)
}

function replay() {
  replayKey.value++
}
</script>
