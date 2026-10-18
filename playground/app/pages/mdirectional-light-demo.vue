<template>
  <div class="space-y-12">
    <UPageHeader
      title="DirectionalLight"
      description="A single blurred SVG beam that fades and scales in from the top-left corner once on mount."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The beam is an <code class="font-mono">absolute</code> SVG sized
        <code class="font-mono">169%</code> tall and <code class="font-mono">138%</code> wide
        (<code class="font-mono">84%</code> on <code class="font-mono">lg</code>), starting at
        <code class="font-mono">opacity-0</code>. A one-shot CSS keyframe plays 0.75s after mount
        and ends <code class="font-mono">forwards</code> — remount to watch it again.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <div
        class="relative h-72 overflow-hidden rounded-2xl bg-gray-950"
        data-testid="stage"
      >
        <MDirectionalLight
          :key="replayKey"
          data-testid="basic"
        />
        <div class="relative z-10 flex h-full items-center justify-center">
          <div class="text-center">
            <p class="text-2xl font-bold text-white">
              Directional light
            </p>
            <p class="mt-2 text-sm text-gray-400">
              White fill at 21% opacity, blurred by 151 units in the SVG filter.
            </p>
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          fill
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-fill"
        >
          white (default)
        </dd>
        <dt class="text-muted">
          fill-opacity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-opacity"
        >
          0.21
        </dd>
        <dt class="text-muted">
          animation
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-animation"
        >
          2s ease, 0.75s delay, forwards
        </dd>
        <dt class="text-muted">
          start state
        </dt>
        <dd class="font-mono">
          opacity 0 · scale 0.5 · (-72%, -62%)
        </dd>
        <dt class="text-muted">
          end state
        </dt>
        <dd class="font-mono">
          opacity 1 · scale 1 · (-50%, -40%)
        </dd>
        <dt class="text-muted">
          pointer events
        </dt>
        <dd class="font-mono">
          none
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Fill colors
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">fill</code> is the only color knob — it is passed straight to the
        ellipse and always composited at a fixed <code class="font-mono">fill-opacity="0.21"</code>
        under a 151-unit Gaussian blur. <code class="font-mono">class</code> handles positioning if
        you need to nudge the beam.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            amber fill
          </p>
          <div class="relative h-52 overflow-hidden rounded-2xl bg-gray-950">
            <MDirectionalLight
              :key="`amber-${replayKey}`"
              fill="#f59e0b"
              data-testid="variant-amber"
            />
            <div class="relative z-10 flex h-full items-center justify-center">
              <p class="text-lg font-semibold text-white">
                Amber beam
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            violet fill
          </p>
          <div class="relative h-52 overflow-hidden rounded-2xl bg-gray-950">
            <MDirectionalLight
              :key="`violet-${replayKey}`"
              fill="#a78bfa"
              data-testid="variant-violet"
            />
            <div class="relative z-10 flex h-full items-center justify-center">
              <p class="text-lg font-semibold text-white">
                Violet beam
              </p>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Caveats
        </p>
      </template>

      <ul class="grid gap-2 text-sm text-muted sm:grid-cols-2">
        <li>
          The animation runs exactly once per mount (opacity 0 → 1, scale 0.5 → 1 over 2s after a
          0.75s delay). There is no replay API — remount the component, as the Replay button does.
        </li>
        <li>
          The SVG declares a hard-coded <code class="font-mono">id="filter"</code>. Multiple
          instances on one page produce duplicate IDs; browsers resolve every reference to the first
          match. The filters are identical so the visuals hold, but the markup is invalid HTML.
        </li>
        <li>
          The ellipse is drawn at <code class="font-mono">fill-opacity 0.21</code> with no prop to
          change it — lighter or stronger beams need a custom
          <code class="font-mono">fill</code> plus a wrapper with lower opacity.
        </li>
        <li>
          It is an overlay only: no slot, no interaction, and the stage should clip it
          (<code class="font-mono">relative overflow-hidden</code>) or it bleeds past the card.
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const replayKey = ref(0)

function replay() {
  replayKey.value++
}
</script>
