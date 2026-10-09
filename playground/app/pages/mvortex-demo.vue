<template>
  <div class="space-y-12">
    <UPageHeader
      title="Vortex"
      description="A canvas particle vortex driven by 3D simplex noise, with slot content layered above the simulation."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The component owns a canvas at <code class="font-mono">absolute inset-0 z-0</code> and puts
        the slot at <code class="font-mono">relative z-10</code> above it. The root is
        <code class="font-mono">h-full w-full</code>, so the stage defines the size. Particles are
        seeded once on mount and the loop starts in <code class="font-mono">onMounted</code> — SSR
        never touches the canvas.
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
        <MVortex
          :key="replayKey"
          :particle-count="700"
          :base-hue="220"
          :base-speed="0.1"
          :range-speed="1.5"
          background-color="transparent"
          class="flex h-full items-center justify-center"
          data-testid="basic"
        >
          <div class="text-center">
            <p class="text-2xl font-bold text-white">
              Vortex
            </p>
            <p class="text-sm text-gray-400">
              700 particles, hue 220, transparent canvas
            </p>
          </div>
        </MVortex>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          particleCount
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-particles"
        >
          700
        </dd>
        <dt class="text-muted">
          baseHue / rangeHue
        </dt>
        <dd class="font-mono">
          220 / 100
        </dd>
        <dt class="text-muted">
          baseSpeed / rangeSpeed
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-speed"
        >
          0.1 / 1.5
        </dd>
        <dt class="text-muted">
          baseRadius / rangeRadius
        </dt>
        <dd class="font-mono">
          1 / 2
        </dd>
        <dt class="text-muted">
          rangeY
        </dt>
        <dd class="font-mono">
          100
        </dd>
        <dt class="text-muted">
          noise
        </dt>
        <dd class="font-mono">
          simplex-noise 4 (3D)
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Prop tour
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">baseHue</code> sets the starting hue with
        <code class="font-mono">rangeHue</code> (fixed at 100) spreading variation around it;
        <code class="font-mono">baseSpeed</code>/<code class="font-mono">rangeSpeed</code> and
        <code class="font-mono">baseRadius</code>/<code class="font-mono">rangeRadius</code> draw
        each particle's velocity and size; <code class="font-mono">backgroundColor</code> fills the
        canvas every frame.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            ember: warm, fast, large
          </p>
          <div class="relative h-56 overflow-hidden rounded-2xl bg-black">
            <MVortex
              :key="`ember-${replayKey}`"
              :particle-count="500"
              :base-hue="20"
              :base-speed="0.25"
              :range-speed="2.5"
              :base-radius="1.5"
              :range-radius="3"
              background-color="transparent"
              class="flex h-full items-center justify-center"
              data-testid="variant-ember"
            >
              <p class="text-lg font-semibold text-white">
                Ember
              </p>
            </MVortex>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            drift: cold, slow, fine, opaque canvas
          </p>
          <div class="relative h-56 overflow-hidden rounded-2xl bg-gray-950">
            <MVortex
              :key="`drift-${replayKey}`"
              :particle-count="900"
              :base-hue="210"
              :base-speed="0.02"
              :range-speed="0.6"
              :base-radius="0.5"
              :range-radius="1.2"
              :range-y="160"
              background-color="#020617"
              class="flex h-full items-center justify-center"
              data-testid="variant-drift"
            >
              <p class="text-lg font-semibold text-white">
                Drift
              </p>
            </MVortex>
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
          The component imports <code class="font-mono">simplex-noise</code> at module scope. It is
          declared in this repo's <code class="font-mono">package.json</code>; if you vendor the
          single file elsewhere you must install the package yourself or the import fails at build
          time.
        </li>
        <li>
          <code class="font-mono">particleCount</code> is folded into a
          <code class="font-mono">Float32Array</code> once during setup with no watcher — changing
          it after mount does not resize the buffer. Remount to alter the count.
        </li>
        <li>
          <code class="font-mono">backgroundColor</code> is read per frame, so it updates live; use
          <code class="font-mono">"transparent"</code> to composite the particles over your own
          background.
        </li>
        <li>
          Cost scales with <code class="font-mono">particleCount</code> (9 floats per particle, plus
          a noise lookup each tick). 700–1000 is comfortable; five-figure counts will drop frames.
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
