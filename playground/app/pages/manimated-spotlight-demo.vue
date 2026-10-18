<template>
  <div class="space-y-12">
    <UPageHeader
      title="AnimatedSpotlight"
      description="Two mirrored beams of soft gradient light sweeping behind content. A purely decorative, non-interactive overlay."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The root renders <code class="font-mono">absolute inset-0</code> with
        <code class="font-mono">pointer-events-none</code>, so it never intercepts clicks. The stage
        must be <code class="font-mono">relative</code> and
        <code class="font-mono">overflow-hidden</code> — both beams are sized in screen units and
        paint outside the box otherwise. Content sits above it with
        <code class="font-mono">relative z-10</code>.
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
        <MAnimatedSpotlight
          :key="replayKey"
          data-testid="basic"
        />
        <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <p class="text-2xl font-bold text-white">
            Behind the content
          </p>
          <p class="text-sm text-gray-400">
            Each beam reverses after {{ duration }}s, sliding {{ xOffset }}px horizontally while
            fading up from opacity 0 over 1.5s.
          </p>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          duration
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-duration"
        >
          {{ duration }}s
        </dd>
        <dt class="text-muted">
          xOffset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-xoffset"
        >
          {{ xOffset }}px
        </dd>
        <dt class="text-muted">
          translateY
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-translatey"
        >
          {{ translateY }}px
        </dd>
        <dt class="text-muted">
          beam size (w × h)
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-beam"
        >
          {{ width }} × {{ height }}px
        </dd>
        <dt class="text-muted">
          small beam width
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-smallwidth"
        >
          {{ smallWidth }}px
        </dd>
        <dt class="text-muted">
          pointer events
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-pointer"
        >
          none
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Gradients and sweep geometry
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Three radial gradients build each beam: <code class="font-mono">gradientFirst</code> is the
        wide core, <code class="font-mono">gradientSecond</code> and
        <code class="font-mono">gradientThird</code> are the narrow companions offset along the
        rotated axis. <code class="font-mono">translateY</code>,
        <code class="font-mono">width</code> and <code class="font-mono">smallWidth</code> place the
        beam; <code class="font-mono">xOffset</code> and <code class="font-mono">duration</code>
        drive the loop.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            warm palette, short sweep
          </p>
          <div class="relative h-56 overflow-hidden rounded-2xl bg-gray-950">
            <MAnimatedSpotlight
              :gradient-first="warmFirst"
              :gradient-second="warmSecond"
              :gradient-third="warmThird"
              :duration="4"
              :x-offset="40"
              data-testid="variant-warm"
            />
            <div class="relative z-10 flex h-full items-center justify-center">
              <p class="text-lg font-semibold text-white">
                Amber sweep
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            wide beams, slow sweep
          </p>
          <div class="relative h-56 overflow-hidden rounded-2xl bg-gray-950">
            <MAnimatedSpotlight
              :width="900"
              :small-width="360"
              :translate-y="-420"
              :duration="12"
              :x-offset="160"
              data-testid="variant-wide"
            />
            <div class="relative z-10 flex h-full items-center justify-center">
              <p class="text-lg font-semibold text-white">
                Slow wide wash
              </p>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Structure
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          root position
        </dt>
        <dd class="font-mono">
          absolute inset-0
        </dd>
        <dt class="text-muted">
          beam canvas
        </dt>
        <dd class="font-mono">
          w-screen h-screen per side
        </dd>
        <dt class="text-muted">
          entrance
        </dt>
        <dd class="font-mono">
          opacity 0 → 1 in 1.5s
        </dd>
        <dt class="text-muted">
          loop
        </dt>
        <dd class="font-mono">
          repeat Infinity, reverse
        </dd>
        <dt class="text-muted">
          easing
        </dt>
        <dd class="font-mono">
          easeInOut
        </dd>
        <dt class="text-muted">
          child elements
        </dt>
        <dd class="font-mono">
          three gradients, rotated ±45°
        </dd>
      </dl>

      <p class="mt-6 text-sm text-muted">
        No slot, no emits, no interaction: every prop is a gradient or a geometry number. Remounting
        (the Replay button) restarts both the fade-in and the sweep cycle from zero.
      </p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const duration = 7
const xOffset = 100
const translateY = -350
const width = 560
const height = 1380
const smallWidth = 240

const warmFirst
  = 'radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(36, 100%, 85%, .12) 0, hsla(30, 100%, 55%, .04) 50%, hsla(25, 100%, 45%, 0) 80%)'
const warmSecond
  = 'radial-gradient(50% 50% at 50% 50%, hsla(36, 100%, 85%, .08) 0, hsla(30, 100%, 55%, .03) 80%, transparent 100%)'
const warmThird
  = 'radial-gradient(50% 50% at 50% 50%, hsla(20, 100%, 80%, .06) 0, hsla(20, 100%, 45%, .02) 80%, transparent 100%)'

const replayKey = ref(0)

function replay() {
  replayKey.value++
}
</script>
