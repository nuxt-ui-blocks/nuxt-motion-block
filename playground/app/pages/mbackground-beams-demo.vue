<template>
  <div class="space-y-12">
    <UPageHeader
      title="BackgroundBeams"
      description="Masked light beams sweep across the stage. Translated from reactbits' background-beams."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The root is <code class="font-mono">absolute inset-0</code>, so it needs a
        <code class="font-mono">relative</code> wrapper with an explicit height, and it renders
        <strong>no slot</strong> — any headline sits next to it as a sibling with
        <code class="font-mono">relative z-10</code> to clear the
        <code class="font-mono">z-0</code> SVG. The beams carry their own radial mask, so the
        wrapper gets the gradient.
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
        <MBackgroundBeams
          :key="replayKey"
          data-testid="basic-beams"
        />
        <div class="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p class="text-xs font-medium uppercase tracking-widest text-slate-400">
            BackgroundBeams
          </p>
          <h2 class="mt-3 text-3xl font-bold text-white">
            Beams sweep behind the copy
          </h2>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          root positioning
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-root"
        >
          absolute inset-0 h-full w-full
        </dd>
        <dt class="text-muted">
          svg z-index
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-svg-z"
        >
          z-0
        </dd>
        <dt class="text-muted">
          slot
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-slot"
        >
          none
        </dd>
        <dt class="text-muted">
          mask
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-mask"
        >
          radial, 40px tile
        </dd>
        <dt class="text-muted">
          beam stagger
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-delay"
        >
          random 0–10s delay
        </dd>
        <dt class="text-muted">
          beam loop
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-loop"
        >
          random 10–20s
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Density &amp; opacity
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">num-paths</code> slices the fixed path list (50 total) from the
        start, and <code class="font-mono">stroke-opacity</code> is bound on every animated path —
        both are reactive, so the slider repaints the beams below immediately without a remount.
      </p>

      <UFormField
        class="mb-6"
        label="stroke-opacity"
        data-testid="field-opacity"
      >
        <USlider
          v-model="strokeOpacity"
          :max="1"
          :min="0"
          :step="0.05"
          data-testid="slider-opacity"
        />
      </UFormField>

      <div class="grid gap-6 md:grid-cols-3">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            num-paths: 8
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 to-black">
            <MBackgroundBeams
              :key="`sparse-${replayKey}`"
              :num-paths="8"
              :stroke-opacity="strokeOpacity"
              data-testid="beams-sparse"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            num-paths: 25
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 to-black">
            <MBackgroundBeams
              :key="`mid-${replayKey}`"
              :num-paths="25"
              :stroke-opacity="strokeOpacity"
              data-testid="beams-mid"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            num-paths: 50 (default)
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 to-black">
            <MBackgroundBeams
              :key="`dense-${replayKey}`"
              :num-paths="50"
              :stroke-opacity="strokeOpacity"
              data-testid="beams-dense"
            />
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          stroke-opacity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stroke"
        >
          {{ strokeOpacity }}
        </dd>
        <dt class="text-muted">
          paths available
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-paths"
        >
          50
        </dd>
        <dt class="text-muted">
          live on slider
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-live"
        >
          yes (no remount)
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Gradient colours
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Only <code class="font-mono">gradient-colors[2]</code> and
        <code class="font-mono">[3]</code> reach the SVG — stops 0 and 1 hard-code
        <code class="font-mono">#18CCFC</code>. The <code class="font-mono">duration</code> prop
        is declared but never read; each beam's real loop is
        <code class="font-mono">Math.random() * 10 + 10</code> seconds, which is why Replay
        re-rolls the choreography.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            default corners: #6344F5 / #AE48FF
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 to-black">
            <MBackgroundBeams
              :key="`default-corners-${replayKey}`"
              data-testid="beams-default-corners"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            custom corners: #FFD93D / #FF8E53
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 to-black">
            <MBackgroundBeams
              :key="`warm-corners-${replayKey}`"
              :gradient-colors="['#18CCFC', '#18CCFC', '#FFD93D', '#FF8E53']"
              data-testid="beams-warm-corners"
            />
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          stop 0 / stop 1
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stops-01"
        >
          #18CCFC (hard-coded)
        </dd>
        <dt class="text-muted">
          stop 2 (32.5%)
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stop-2"
        >
          gradient-colors[2]
        </dd>
        <dt class="text-muted">
          stop 3 (100%)
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stop-3"
        >
          gradient-colors[3]
        </dd>
        <dt class="text-muted">
          duration prop
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-duration-prop"
        >
          declared, unused
        </dd>
        <dt class="text-muted">
          actual loop time
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-actual-loop"
        >
          10–20s random per beam
        </dd>
        <dt class="text-muted">
          static beam
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-static"
        >
          opacity 0.05, width 0.5
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const replayKey = ref(0)
const strokeOpacity = ref(0.4)

function replay() {
  replayKey.value++
}
</script>
