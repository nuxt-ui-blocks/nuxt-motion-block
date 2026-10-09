<template>
  <div class="space-y-12">
    <UPageHeader
      title="LampContainer"
      description="A full-height stage with two conic-gradient lamp shades, a glowing bar and a thin light line above centered slot content."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The root hard-codes <code class="font-mono">min-h-screen</code> and paints with
        <code class="font-mono">bg-default</code>, so the lamp sits on the theme background rather
        than on the card behind it. Slot content lands near the top — the wrapper carries
        <code class="font-mono">-translate-y-80</code> (320px up from center). The entrance animates
        <code class="font-mono">while-in-view</code> with a 0.3s delay.
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

      <div data-testid="basic">
        <MLampContainer :key="replayKey">
          <div class="text-center">
            <p class="text-3xl font-bold text-highlighted">
              Ship your idea
            </p>
            <p class="mt-2 text-sm text-muted">
              Default lamp: primary-500 shades, primary-400 glow and line.
            </p>
          </div>
        </MLampContainer>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          fromColor / toColor
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-shades"
        >
          primary-500
        </dd>
        <dt class="text-muted">
          centerColor
        </dt>
        <dd class="font-mono">
          primary-500
        </dd>
        <dt class="text-muted">
          glowColor / lineColor
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-glow"
        >
          primary-400
        </dd>
        <dt class="text-muted">
          root height
        </dt>
        <dd class="font-mono">
          min-h-screen (hardcoded)
        </dd>
        <dt class="text-muted">
          entrance
        </dt>
        <dd class="font-mono">
          while-in-view, 0.3s delay, 0.8s
        </dd>
        <dt class="text-muted">
          slot offset
        </dt>
        <dd class="font-mono">
          -translate-y-80
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Colors
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Five color props, all accepting a hex/rgb/hsl value, a
        <code class="font-mono">var(...)</code> reference or a Tailwind color token like
        <code class="font-mono">amber-500</code> (which the component converts to
        <code class="font-mono">var(--color-amber-500)</code>). Here everything is pushed to amber.
      </p>

      <div data-testid="variant-amber">
        <MLampContainer
          :key="`amber-${replayKey}`"
          from-color="hsl(38, 92%, 55%)"
          to-color="hsl(38, 92%, 55%)"
          center-color="hsl(32, 95%, 58%)"
          glow-color="hsl(45, 96%, 65%)"
          line-color="hsl(48, 96%, 76%)"
        >
          <div class="text-center">
            <p class="text-3xl font-bold text-highlighted">
              Amber lamp
            </p>
            <p class="mt-2 text-sm text-muted">
              All five color props overridden with hsl() values.
            </p>
          </div>
        </MLampContainer>
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
          <code class="font-mono">min-h-screen</code> and
          <code class="font-mono">bg-default</code> live in the root class string. The
          <code class="font-mono">class</code> prop appends after them, so overriding height means
          relying on stylesheet order between two conflicting utilities — assume every instance is
          a full viewport tall.
        </li>
        <li>
          <code class="font-mono">bg-default</code> is opaque: the lamp hides anything behind it,
          including the card padding. This demo renders it full-bleed inside the card on purpose.
        </li>
        <li>
          The entrance uses <code class="font-mono">while-in-view</code>, so it replays whenever the
          section scrolls back into view after leaving it — remounting (Replay) restarts it too.
        </li>
        <li>
          The slot wrapper is translated 320px toward the top; content near the bottom of the
          viewport will not line up with the lamp line unless you compensate with your own spacing.
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
