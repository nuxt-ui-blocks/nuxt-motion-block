<template>
  <div class="space-y-12">
    <UPageHeader
      title="AuroraBackground"
      description="Blurred colour bands drift behind centered content. Translated from reactbits' aurora-background."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The inner container is hard-coded to <code class="font-mono">h-[100vh]</code> and clips
        with <code class="font-mono">overflow-hidden</code>, so the wrapper decides how much of it
        shows. This stage clips it at <code class="font-mono">70vh</code>; because the slot content
        is <code class="font-mono">h-full</code> and vertically centered, the text lands at 50vh —
        inside the visible slice. A short wrapper with centered content would push text below the
        clip, which is why the cards further down top-align instead.
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

      <div class="relative h-[70vh] overflow-hidden rounded-2xl border border-default bg-default">
        <MAuroraBackground
          :key="replayKey"
          data-testid="basic"
        >
          <div class="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
            <p class="text-xs font-medium uppercase tracking-widest text-muted">
              AuroraBackground
            </p>
            <h2 class="mt-3 text-4xl font-bold text-highlighted">
              Light bends around the words
            </h2>
            <p class="mt-4 max-w-md text-sm text-muted">
              Six bands loop on a 60s CSS keyframe — no JavaScript timer runs for the motion.
            </p>
          </div>
        </MAuroraBackground>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          wrapper height
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-wrapper"
        >
          70vh (clip)
        </dd>
        <dt class="text-muted">
          inner container
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-inner"
        >
          h-[100vh] overflow-hidden
        </dd>
        <dt class="text-muted">
          motion
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-motion"
        >
          CSS aurora 60s linear infinite
        </dd>
        <dt class="text-muted">
          bands
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-bands"
        >
          6 · blur 10px · opacity 50%
        </dd>
        <dt class="text-muted">
          light-mode filter
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-invert"
        >
          invert (dark:invert-0)
        </dd>
        <dt class="text-muted">
          JS timers
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-timers"
        >
          none
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Radial vignette
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">show-radial-gradient</code> defaults to
        <code class="font-mono">true</code> and paints a radial vignette over the bands that
        fades them toward the edges. This short stage top-aligns its content — the inner container
        is still 100vh tall, so a vertically centered child would sit at 50vh, below the 96 height
        of this wrapper.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          :label="`show-radial-gradient: ${showRadial}`"
          icon="i-lucide-circle-dot"
          variant="outline"
          data-testid="toggle-radial"
          @click="toggleRadial()"
        />
      </div>

      <div class="relative h-96 overflow-hidden rounded-2xl border border-default bg-default">
        <MAuroraBackground
          :show-radial-gradient="showRadial"
          data-testid="radial-stage"
        >
          <div class="relative z-10 flex h-full w-full flex-col items-center px-6 pt-14 text-center">
            <p class="text-2xl font-bold text-highlighted">
              Top-aligned content
            </p>
            <p class="mt-3 max-w-sm text-sm text-muted">
              Content sits at the top of the clip because the wrapper is shorter than the 100vh
              inner container.
            </p>
          </div>
        </MAuroraBackground>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          show-radial-gradient
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-radial"
        >
          {{ showRadial }}
        </dd>
        <dt class="text-muted">
          wrapper height
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-short-wrapper"
        >
          24rem (96)
        </dd>
        <dt class="text-muted">
          content alignment
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-align"
        >
          top (pt-14)
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Container styling
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The <code class="font-mono">class</code> prop lands on the
        <strong>inner</strong> 100vh container, not on the wrapper element — attributes such as
        <code class="font-mono">data-testid</code> fall through to it as well. The radial vignette
        is off here so the flat band colours show against the custom background.
      </p>

      <div class="relative h-96 overflow-hidden rounded-2xl border border-default">
        <MAuroraBackground
          :key="`styled-${replayKey}`"
          class="bg-slate-900"
          :show-radial-gradient="false"
          data-testid="styled-stage"
        >
          <div class="relative z-10 flex h-full w-full flex-col items-center px-6 pt-14 text-center">
            <p class="text-2xl font-bold text-white">
              class lands on the inner container
            </p>
            <p class="mt-3 max-w-sm text-sm text-slate-300">
              The wrapper stays transparent — the slate background comes from the inner div.
            </p>
          </div>
        </MAuroraBackground>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          class target
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-class-target"
        >
          inner div (h-[100vh])
        </dd>
        <dt class="text-muted">
          fallthrough target
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-fallthrough"
        >
          inner div
        </dd>
        <dt class="text-muted">
          radial vignette
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-radial-off"
        >
          off
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const replayKey = ref(0)
const showRadial = ref(true)

function replay() {
  replayKey.value++
}

function toggleRadial() {
  showRadial.value = !showRadial.value
}
</script>
