<template>
  <div class="space-y-12">
    <UPageHeader
      title="Meteors"
      description="White streaks fall diagonally across the stage on randomised loops."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The root is <code class="font-mono">relative h-full w-full overflow-hidden</code>, so the
        stage gives it a height. Each meteor is a 2 × 80px gradient streak rotated
        <code class="font-mono">215deg</code> that fades in, travels
        <code class="font-mono">-300px</code> and drops to <code class="font-mono">top: 100%</code>.
        The overlay text is <code class="font-mono">pointer-events-none</code>; Replay re-rolls
        every meteor's horizontal start, duration and delay.
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
        <MMeteors
          :key="replayKey"
          data-testid="basic-meteors"
        />
        <div class="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p class="text-xs font-medium uppercase tracking-widest text-white/70">
            Meteors
          </p>
          <h2 class="mt-3 text-3xl font-bold text-white">
            Ten streaks, each on its own clock
          </h2>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          count · speed
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-config"
        >
          10 · 1
        </dd>
        <dt class="text-muted">
          start x
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-x"
        >
          random 0–100%
        </dd>
        <dt class="text-muted">
          duration
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-duration"
        >
          2 / speed + random 0–2s
        </dd>
        <dt class="text-muted">
          delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-delay"
        >
          random 0–5s
        </dd>
        <dt class="text-muted">
          streak
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-streak"
        >
          2 × 80px @ 215°
        </dd>
        <dt class="text-muted">
          travel
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-travel"
        >
          translateX(-300px) · top → 100%
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Count
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">count</code> feeds a computed, so changing it rebuilds the meteor
        list immediately — every start position, duration and delay re-rolls at the same time.
        The three stages run 5, 15 and 30 streaks.
      </p>

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="preset in countPresets"
          :key="preset.id"
          class="space-y-2"
        >
          <p class="text-xs font-medium text-muted">
            count {{ preset.count }}
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 to-black">
            <MMeteors
              :key="`${preset.id}-${replayKey}`"
              :count="preset.count"
              :data-testid="`count-${preset.id}`"
            />
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          preset counts
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-counts"
        >
          5 · 15 · 30
        </dd>
        <dt class="text-muted">
          rebuild
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-rebuild"
        >
          computed (live re-roll)
        </dd>
        <dt class="text-muted">
          keys
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-keys"
        >
          id 0…count - 1
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Speed
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Duration is <code class="font-mono">2 / speed + random 0–2</code> seconds, so the slider
        scales both the pace and the spread. Like count, speed is computed — moving it re-rolls
        all randomness live. Delays stay in the fixed 0–5s window.
      </p>

      <UFormField
        class="mb-6"
        label="speed"
        data-testid="field-speed"
      >
        <USlider
          v-model="speed"
          :max="4"
          :min="0.25"
          :step="0.25"
          data-testid="slider-speed"
        />
      </UFormField>

      <div class="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 to-black">
        <MMeteors
          :count="15"
          :speed="speed"
          data-testid="speed-meteors"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          speed
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-speed"
        >
          {{ speed }}
        </dd>
        <dt class="text-muted">
          duration range
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-duration-range"
        >
          {{ (2 / speed).toFixed(2) }}–{{ (2 / speed + 2).toFixed(2) }}s
        </dd>
        <dt class="text-muted">
          delay range
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-delay-range"
        >
          0–5s
        </dd>
        <dt class="text-muted">
          easing
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-easing"
        >
          linear · infinite
        </dd>
        <dt class="text-muted">
          opacity curve
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-opacity-curve"
        >
          0 → 1 (10%) → 1 (70%) → 0
        </dd>
        <dt class="text-muted">
          change behaviour
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-change"
        >
          live re-roll, no Replay
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const countPresets = [
  { id: 'sparse', count: 5 },
  { id: 'default', count: 15 },
  { id: 'dense', count: 30 },
] as const

const replayKey = ref(0)
const speed = ref(1)

function replay() {
  replayKey.value++
}
</script>
