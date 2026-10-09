<template>
  <div class="space-y-12">
    <UPageHeader
      title="ShootingStars"
      description="A single star crosses the viewport from a random edge, then schedules the next."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The component renders one star at a time: it spawns on a random viewport edge, grows as
        it travels, and is culled once it passes the bounds. When it dies, a
        <code class="font-mono">setTimeout</code> schedules the next spawn after
        <code class="font-mono">min-delay…max-delay</code>. Replay remounts and restarts the
        chain with fresh randomness.
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

      <div class="relative h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <MShootingStars
          :key="replayKey"
          data-testid="basic-shooting"
        />
        <div class="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p class="text-xs font-medium uppercase tracking-widest text-white/70">
            ShootingStars
          </p>
          <h2 class="mt-3 text-3xl font-bold text-white">
            One star at a time
          </h2>
          <p class="mt-3 max-w-md text-sm text-white/70">
            Default cadence is 1.2–4.2s between spawns — wait a beat between streaks.
          </p>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          min / max delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-delays"
        >
          1200 / 4200ms
        </dd>
        <dt class="text-muted">
          min / max speed
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-speeds"
        >
          10 / 30 px per frame
        </dd>
        <dt class="text-muted">
          star · trail
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-colors"
        >
          #9E00FF · #2EB9DF
        </dd>
        <dt class="text-muted">
          width · height
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-size"
        >
          10 × 1px
        </dd>
        <dt class="text-muted">
          growth
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-growth"
        >
          scale 1 + distance / 100
        </dd>
        <dt class="text-muted">
          spawn origin
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-origin"
        >
          random viewport edge (4 sides)
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Colours and size
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">star-color</code> paints the head at the gradient's 100% stop and
        <code class="font-mono">trail-color</code> the tail at 0% (fully transparent). Colour and
        width are bound to the live rect, so the current star updates instantly; the stage below
        runs a fat amber comet.
      </p>

      <div class="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 to-black">
        <MShootingStars
          :key="`warm-${replayKey}`"
          star-color="#f59e0b"
          trail-color="#ef4444"
          :star-width="24"
          :star-height="2"
          :min-delay="800"
          :max-delay="2400"
          data-testid="warm-shooting"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          star-color
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-star-color"
        >
          #f59e0b (stop 100%)
        </dd>
        <dt class="text-muted">
          trail-color
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-trail-color"
        >
          #ef4444 (stop 0%, α 0)
        </dd>
        <dt class="text-muted">
          width · height
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-warm-size"
        >
          24 × 2px
        </dd>
        <dt class="text-muted">
          delay window
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-warm-delay"
        >
          800–2400ms
        </dd>
        <dt class="text-muted">
          reactivity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-warm-reactive"
        >
          colours/size live on current star
        </dd>
        <dt class="text-muted">
          rotation
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-rotation"
        >
          45° / 135° / 225° / 315°
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Timing
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The gap between stars is <code class="font-mono">min + random × (max − min)</code>,
        sampled when each spawn is scheduled — so a mid-flight prop change lands on the
        <em>next</em> star. The fast stage fires every 0.5–1.5s against the default 1.2–4.2s.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            fast · delay 500–1500ms
          </p>
          <div class="relative h-56 overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 to-black">
            <MShootingStars
              :key="`fast-${replayKey}`"
              :min-delay="500"
              :max-delay="1500"
              data-testid="fast-shooting"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            default · delay 1200–4200ms
          </p>
          <div class="relative h-56 overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 to-black">
            <MShootingStars
              :key="`slow-${replayKey}`"
              data-testid="default-shooting"
            />
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          delay formula
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-delay-formula"
        >
          min + random × (max − min)
        </dd>
        <dt class="text-muted">
          cull bounds
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cull"
        >
          window ± 20px
        </dd>
        <dt class="text-muted">
          spawn schedule
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-schedule"
        >
          read per star (semi-live)
        </dd>
        <dt class="text-muted">
          timeout on unmount
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-timeout"
        >
          not cleared (rAF is)
        </dd>
        <dt class="text-muted">
          coordinate space
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-coords"
        >
          window — stage clips via overflow
        </dd>
        <dt class="text-muted">
          stars in flight
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-concurrency"
        >
          1 at a time
        </dd>
      </dl>
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
