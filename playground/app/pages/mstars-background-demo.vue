<template>
  <div class="space-y-12">
    <UPageHeader
      title="StarsBackground"
      description="A canvas starfield where stars fade in and out on independent twinkle clocks."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The root is an absolutely positioned <code class="font-mono">canvas</code>, so the stage
        provides <code class="font-mono">relative</code> and a height. On mount it fills the
        canvas and generates <code class="font-mono">floor(area × star-density)</code> stars;
        twinkle opacity oscillates as
        <code class="font-mono">0.5 + |sin(t / twinkleSpeed)| × 0.5</code>. Replay regenerates
        the whole field.
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
        <MStarsBackground
          :key="replayKey"
          data-testid="basic-stars"
        />
        <div class="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p class="text-xs font-medium uppercase tracking-widest text-white/70">
            StarsBackground
          </p>
          <h2 class="mt-3 text-3xl font-bold text-white">
            Every star keeps its own time
          </h2>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          star-density
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-density"
        >
          0.00015 (default)
        </dd>
        <dt class="text-muted">
          count formula
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-count"
        >
          floor(area × density)
        </dd>
        <dt class="text-muted">
          radius
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-radius"
        >
          0.5–0.55px
        </dd>
        <dt class="text-muted">
          initial opacity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-opacity"
        >
          random 0.5–1
        </dd>
        <dt class="text-muted">
          twinkle opacity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-twinkle"
        >
          0.5 + |sin(t / speed)| × 0.5
        </dd>
        <dt class="text-muted">
          fill
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-fill"
        >
          rgba(255, 255, 255, α)
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Density
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Density is stars per square pixel — the stage area is roughly 600 × 190, so the presets
        land near 6, 17 and 45 stars. All star geometry is generated once on mount (and on
        throttled resize), which is why each stage keys off Replay.
      </p>

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="preset in densityPresets"
          :key="preset.id"
          class="space-y-2"
        >
          <p class="text-xs font-medium text-muted">
            density {{ preset.density }}
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 to-black">
            <MStarsBackground
              :key="`${preset.id}-${replayKey}`"
              :star-density="preset.density"
              :data-testid="`density-${preset.id}`"
            />
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          sparse
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-sparse"
        >
          0.00005
        </dd>
        <dt class="text-muted">
          default
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-default"
        >
          0.00015
        </dd>
        <dt class="text-muted">
          dense
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-dense"
        >
          0.0004
        </dd>
        <dt class="text-muted">
          regenerate on
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-regenerate"
        >
          mount · resize (throttled 100ms)
        </dd>
        <dt class="text-muted">
          positions
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-positions"
        >
          random x / y per star
        </dd>
        <dt class="text-muted">
          prop changes
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-prop-changes"
        >
          need remount (Replay)
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Twinkle variants
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        With <code class="font-mono">all-stars-twinkle</code> (default) every star animates.
        Turning it off means only a <code class="font-mono">twinkle-probability</code> share
        twinkle — the rest stay at their initial opacity. Twinkle speed is sampled from
        <code class="font-mono">min…max</code>; the slow preset stretches each cycle to 2–6s.
        All three props are read at generation time, so Replay applies them.
      </p>

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="variant in twinkleVariants"
          :key="variant.id"
          class="space-y-2"
        >
          <p class="text-xs font-medium text-muted">
            {{ variant.label }}
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 to-black">
            <MStarsBackground
              :key="`${variant.id}-${replayKey}`"
              :all-stars-twinkle="variant.allStarsTwinkle"
              :twinkle-probability="variant.twinkleProbability"
              :min-twinkle-speed="variant.minTwinkleSpeed"
              :max-twinkle-speed="variant.maxTwinkleSpeed"
              :data-testid="`twinkle-${variant.id}`"
            />
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          default
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-twinkle-default"
        >
          all · 0.5–1s
        </dd>
        <dt class="text-muted">
          partial
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-twinkle-partial"
        >
          30% share · 0.5–1s
        </dd>
        <dt class="text-muted">
          slow
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-twinkle-slow"
        >
          all · 0.15–0.3s speed
        </dd>
        <dt class="text-muted">
          speed sampling
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-speed-sampling"
        >
          min + random × (max − min)
        </dd>
        <dt class="text-muted">
          non-twinkle stars
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-static"
        >
          fixed initial opacity
        </dd>
        <dt class="text-muted">
          render loop
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-loop"
        >
          requestAnimationFrame
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const densityPresets = [
  { id: 'sparse', density: 0.00005 },
  { id: 'default', density: 0.00015 },
  { id: 'dense', density: 0.0004 },
] as const

const twinkleVariants = [
  { id: 'all', label: 'all stars · default speeds', allStarsTwinkle: true, twinkleProbability: 0.7, minTwinkleSpeed: 0.5, maxTwinkleSpeed: 1 },
  { id: 'partial', label: '30% share · default speeds', allStarsTwinkle: false, twinkleProbability: 0.3, minTwinkleSpeed: 0.5, maxTwinkleSpeed: 1 },
  { id: 'slow', label: 'all stars · slow speeds', allStarsTwinkle: true, twinkleProbability: 0.7, minTwinkleSpeed: 0.15, maxTwinkleSpeed: 0.3 },
] as const

const replayKey = ref(0)

function replay() {
  replayKey.value++
}
</script>
