<template>
  <div class="space-y-12">
    <UPageHeader
      title="DottedGlowBackground"
      description="A canvas of staggered dots that breathe and glow in sync with the colour mode."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The root is <code class="font-mono">position: absolute; inset: 0</code> with a
        <code class="font-mono">canvas</code> stretched inside, so the stage supplies
        <code class="font-mono">relative</code> and height. The default palette is
        <code class="font-mono">rgba(0,0,0,0.7)</code> dots with a blue glow — this stage is
        forced white so the dots stay visible in both colour modes. Replay rebuilds the dot
        lattice, re-rolling every dot's phase and speed.
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

      <div class="relative h-96 overflow-hidden rounded-2xl border border-default bg-white">
        <MDottedGlowBackground
          :key="replayKey"
          data-testid="basic-dots"
        />
        <div class="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p class="text-xs font-medium uppercase tracking-widest text-muted">
            DottedGlowBackground
          </p>
          <h2 class="mt-3 text-3xl font-bold text-highlighted">
            Dots pulse, the brightest ones glow
          </h2>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          gap
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-gap"
        >
          12px (mount-time)
        </dd>
        <dt class="text-muted">
          radius
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-radius"
        >
          2px (live)
        </dd>
        <dt class="text-muted">
          opacity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-opacity"
        >
          0.6 (live)
        </dd>
        <dt class="text-muted">
          dot alpha
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-alpha"
        >
          0.25–0.8 × opacity
        </dd>
        <dt class="text-muted">
          glow threshold
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-glow"
        >
          alpha &gt; 0.6 → shadowBlur
        </dd>
        <dt class="text-muted">
          speed range
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-speed-range"
        >
          0.4–1.3 (mount-time)
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Theme-aware colours
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        In dark mode the component resolves
        <code class="font-mono">color-dark-var</code>, then <code class="font-mono">dark-color</code>,
        then falls back to <code class="font-mono">color</code>. Passing
        <code class="font-mono">dark-color</code> keeps the dots visible on the dark half of the
        stage; the swap is watched, so toggling the colour mode repaints without a remount.
      </p>

      <div class="relative h-80 overflow-hidden rounded-2xl border border-default bg-white dark:bg-slate-950">
        <MDottedGlowBackground
          :key="`theme-${replayKey}`"
          dark-color="rgba(255,255,255,0.75)"
          dark-glow-color="rgba(56,189,248,0.9)"
          data-testid="theme-dots"
        />
        <div class="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p class="text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-white/60">
            light → dark
          </p>
          <h2 class="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            Same lattice, resolved per mode
          </h2>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          light dot
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-light-dot"
        >
          rgba(0,0,0,0.7)
        </dd>
        <dt class="text-muted">
          dark dot
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-dark-dot"
        >
          rgba(255,255,255,0.75)
        </dd>
        <dt class="text-muted">
          light glow
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-light-glow"
        >
          rgba(0,170,255,0.85)
        </dd>
        <dt class="text-muted">
          dark glow
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-dark-glow"
        >
          rgba(56,189,248,0.9)
        </dd>
        <dt class="text-muted">
          resolution order
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-resolution"
        >
          var → darkColor → color
        </dd>
        <dt class="text-muted">
          swap on
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-swap"
        >
          colorMode watch (live)
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Live controls
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Every slider here is read inside the frame loop, so the canvas reacts immediately:
        <code class="font-mono">radius</code> and <code class="font-mono">opacity</code> shape
        the dots, <code class="font-mono">speed-scale</code> multiplies their breathing rate,
        and <code class="font-mono">background-opacity</code> paints a black radial vignette
        under the lattice. No Replay needed.
      </p>

      <UFormField
        class="mb-4"
        label="radius"
        data-testid="field-radius"
      >
        <USlider
          v-model="radius"
          :max="6"
          :min="1"
          :step="1"
          data-testid="slider-radius"
        />
      </UFormField>

      <UFormField
        class="mb-4"
        label="opacity"
        data-testid="field-opacity"
      >
        <USlider
          v-model="opacity"
          :max="1"
          :min="0.1"
          :step="0.05"
          data-testid="slider-opacity"
        />
      </UFormField>

      <UFormField
        class="mb-4"
        label="speed-scale"
        data-testid="field-speed-scale"
      >
        <USlider
          v-model="speedScale"
          :max="3"
          :min="0"
          :step="0.1"
          data-testid="slider-speed-scale"
        />
      </UFormField>

      <UFormField
        class="mb-6"
        label="background-opacity"
        data-testid="field-background-opacity"
      >
        <USlider
          v-model="backgroundOpacity"
          :max="1"
          :min="0"
          :step="0.05"
          data-testid="slider-background-opacity"
        />
      </UFormField>

      <div class="relative h-80 overflow-hidden rounded-2xl border border-default bg-white dark:bg-slate-950">
        <MDottedGlowBackground
          :radius="radius"
          :opacity="opacity"
          :speed-scale="speedScale"
          :background-opacity="backgroundOpacity"
          dark-color="rgba(255,255,255,0.75)"
          dark-glow-color="rgba(56,189,248,0.9)"
          data-testid="live-dots"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          radius
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-live-radius"
        >
          {{ radius }}px
        </dd>
        <dt class="text-muted">
          opacity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-live-opacity"
        >
          {{ opacity }}
        </dd>
        <dt class="text-muted">
          speed-scale
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-live-speed"
        >
          {{ speedScale }}
        </dd>
        <dt class="text-muted">
          background-opacity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-live-vignette"
        >
          {{ backgroundOpacity }}
        </dd>
        <dt class="text-muted">
          reactivity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-live-reactivity"
        >
          read per frame
        </dd>
        <dt class="text-muted">
          vignette
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-vignette"
        >
          radial, transparent → black
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Grid spacing
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">gap</code> is only read by
        <code class="font-mono">regenDots()</code> on mount and on window resize — moving the
        slider changes the prop but not the live lattice. Press Replay to remount and rebuild.
        Odd rows are offset by half a gap for the staggered pattern.
      </p>

      <UFormField
        class="mb-6"
        label="gap (px, applies on Replay)"
        data-testid="field-gap"
      >
        <USlider
          v-model="gap"
          :max="32"
          :min="8"
          :step="2"
          data-testid="slider-gap"
        />
      </UFormField>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-gap"
          @click="replay()"
        />
      </div>

      <div class="relative h-80 overflow-hidden rounded-2xl border border-default bg-white dark:bg-slate-950">
        <MDottedGlowBackground
          :key="`gap-${replayKey}`"
          :gap="gap"
          dark-color="rgba(255,255,255,0.75)"
          dark-glow-color="rgba(56,189,248,0.9)"
          data-testid="gap-dots"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          gap
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-gap-live"
        >
          {{ gap }}px
        </dd>
        <dt class="text-muted">
          cols · rows
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cols-rows"
        >
          ceil(size / gap) + 2
        </dd>
        <dt class="text-muted">
          row stagger
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stagger"
        >
          odd rows + gap × 0.5
        </dd>
        <dt class="text-muted">
          rebuild on
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-rebuild"
        >
          mount · window resize
        </dd>
        <dt class="text-muted">
          phase
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-phase"
        >
          random 0–2π per dot
        </dd>
        <dt class="text-muted">
          speed
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-speed"
        >
          random in [min, max]
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const replayKey = ref(0)
const radius = ref(2)
const opacity = ref(0.6)
const speedScale = ref(1)
const backgroundOpacity = ref(0)
const gap = ref(12)

function replay() {
  replayKey.value++
}
</script>
