<template>
  <div class="space-y-12">
    <UPageHeader
      title="BackgroundLines"
      description="Twenty-one paths draw and fade in looping cycles. Translated from reactbits' background-lines."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The root only sets <code class="font-mono">relative</code> — it has no height of its own,
        and the SVG is <code class="font-mono">absolute inset-0</code>. Passing
        <code class="font-mono">class="h-full"</code> is what gives the lines a box to fill; the
        slot content mirrors it with <code class="font-mono">h-full</code> so the text centres
        inside the wrapper rather than collapsing to the top.
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

      <div class="relative h-96 overflow-hidden rounded-2xl border border-default bg-(--ui-bg-muted)">
        <MBackgroundLines
          :key="replayKey"
          class="h-full"
          data-testid="basic-lines"
        >
          <div class="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <p class="text-xs font-medium uppercase tracking-widest text-muted">
              BackgroundLines
            </p>
            <h2 class="mt-3 text-3xl font-bold text-highlighted">
              Lines redraw on a randomised cycle
            </h2>
          </div>
        </MBackgroundLines>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          root
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-root"
        >
          relative (height via class)
        </dd>
        <dt class="text-muted">
          paths
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-paths"
        >
          21 · stroke-width 2.3
        </dd>
        <dt class="text-muted">
          svg fade-in
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-fade"
        >
          opacity 0 → 1 over 1s
        </dd>
        <dt class="text-muted">
          dash travel
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-dash"
        >
          offset 800 → 0
        </dd>
        <dt class="text-muted">
          dash array
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-array"
        >
          50 800 → 20 800
        </dd>
        <dt class="text-muted">
          opacity keyframes
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-opacity"
        >
          0 → 1 → 1 → 0
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Colours
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Each path takes <code class="font-mono">colors[idx % colors.length]</code>, so a palette
        shorter than 21 entries simply wraps. The default list carries 21 hand-picked hexes;
        the stages below swap in a single tone, a warm set and a cool set.
      </p>

      <div class="grid gap-6 md:grid-cols-3">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            single tone · ['#46A5CA']
          </p>
          <div class="relative h-40 overflow-hidden rounded-xl border border-default bg-(--ui-bg-muted)">
            <MBackgroundLines
              :key="`mono-${replayKey}`"
              class="h-full"
              :colors="['#46A5CA']"
              data-testid="lines-mono"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            warm · amber / red / orange
          </p>
          <div class="relative h-40 overflow-hidden rounded-xl border border-default bg-(--ui-bg-muted)">
            <MBackgroundLines
              :key="`warm-${replayKey}`"
              class="h-full"
              :colors="['#f59e0b', '#ef4444', '#f97316']"
              data-testid="lines-warm"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            cool · sky / indigo / cyan
          </p>
          <div class="relative h-40 overflow-hidden rounded-xl border border-default bg-(--ui-bg-muted)">
            <MBackgroundLines
              :key="`cool-${replayKey}`"
              class="h-full"
              :colors="['#38bdf8', '#818cf8', '#22d3ee']"
              data-testid="lines-cool"
            />
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          default palette size
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-palette"
        >
          21 entries
        </dd>
        <dt class="text-muted">
          colour assignment
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-assign"
        >
          colors[idx % colors.length]
        </dd>
        <dt class="text-muted">
          wrapping
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-wrap"
        >
          short palettes cycle
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Cycle duration
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">svg-options.duration</code> sets the per-path loop time (default
        <code class="font-mono">10s</code>). The delay before each cycle starts is
        <code class="font-mono">floor(random * 10)</code> seconds and the pause between repeats is
        <code class="font-mono">floor(random * 10 + 2)</code> — both re-roll whenever the paths
        re-render, which is what Replay forces.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            default · duration 10s
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl border border-default bg-(--ui-bg-muted)">
            <MBackgroundLines
              :key="`slow-${replayKey}`"
              class="h-full"
              data-testid="lines-slow"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            fast · duration 3s
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl border border-default bg-(--ui-bg-muted)">
            <MBackgroundLines
              :key="`fast-${replayKey}`"
              class="h-full"
              :svg-options="{ duration: 3 }"
              data-testid="lines-fast"
            />
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          svgOptions.duration
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-duration"
        >
          10 (default) / 3
        </dd>
        <dt class="text-muted">
          cycle delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-delay"
        >
          random 0–9s
        </dd>
        <dt class="text-muted">
          repeat delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-repeat"
        >
          random 2–11s
        </dd>
        <dt class="text-muted">
          repeat
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-repeat-mode"
        >
          Infinity (loop)
        </dd>
        <dt class="text-muted">
          easing
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-easing"
        >
          linear
        </dd>
        <dt class="text-muted">
          re-roll on
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reroll"
        >
          remount (Replay)
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
