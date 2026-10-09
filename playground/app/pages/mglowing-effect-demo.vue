<template>
  <div class="space-y-12">
    <UPageHeader
      title="GlowingEffect"
      description="A proximity-driven conic border glow that activates around a card's edge as the cursor approaches."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The component is inert by default — <code class="font-mono">glow</code> is
        <code class="font-mono">false</code> and <code class="font-mono">disabled</code> is
        <code class="font-mono">true</code>, so nothing renders until both are overridden. The
        demo also tightens <code class="font-mono">inactiveZone</code> to
        <code class="font-mono">0.01</code> and sets <code class="font-mono">proximity</code> to
        64, the same overrides the docs examples use — with the stock
        <code class="font-mono">0.7</code> dead center and <code class="font-mono">proximity: 0</code>,
        most of the card never lights up. Move the cursor along the card edges.
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <UButton
          :label="`glow: ${glowOn}`"
          icon="i-lucide-sparkles"
          variant="outline"
          data-testid="toggle-glow"
          @click="glowOn = !glowOn"
        />
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="relative h-52 rounded-xl bg-gray-950 p-6">
          <MGlowingEffect
            :glow="glowOn"
            :disabled="!glowOn"
            :proximity="64"
            :inactive-zone="0.01"
            :spread="80"
            :border-width="3"
            class="rounded-xl"
            data-testid="basic"
          />
          <div class="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p class="text-lg font-bold text-white">
                Default glow
              </p>
              <p class="text-sm text-gray-400">
                Multi-color radial gradients behind a conic border mask
              </p>
            </div>
            <p class="text-xs text-gray-500">
              spread 80 · borderWidth 3 · movement 2s
            </p>
          </div>
        </div>

        <div class="relative h-52 rounded-xl bg-gray-950 p-6">
          <MGlowingEffect
            :glow="glowOn"
            :disabled="!glowOn"
            :proximity="64"
            :inactive-zone="0.01"
            :spread="80"
            :border-width="3"
            variant="white"
            class="rounded-xl"
            data-testid="variant-white"
          />
          <div class="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p class="text-lg font-bold text-white">
                White variant
              </p>
              <p class="text-sm text-gray-400">
                <code class="font-mono">variant="white"</code> swaps in a repeating black conic gradient
              </p>
            </div>
            <p class="text-xs text-gray-500">
              same proximity and spread as the left card
            </p>
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          glow / disabled
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-state"
        >
          {{ glowOn }} / {{ !glowOn }}
        </dd>
        <dt class="text-muted">
          proximity / inactiveZone
        </dt>
        <dd class="font-mono">
          64 / 0.01
        </dd>
        <dt class="text-muted">
          spread / borderWidth
        </dt>
        <dd class="font-mono">
          80° / 3px
        </dd>
        <dt class="text-muted">
          blur
        </dt>
        <dd class="font-mono">
          0px (var-driven)
        </dd>
        <dt class="text-muted">
          movementDuration
        </dt>
        <dd class="font-mono">
          2s
        </dd>
        <dt class="text-muted">
          defaults
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-defaults"
        >
          glow false, disabled true
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
        <code class="font-mono">blur</code> feeds a CSS variable (so any pixel value works here),
        <code class="font-mono">spread</code> widens the cone of the conic mask,
        <code class="font-mono">borderWidth</code> thickens the gradient border, and
        <code class="font-mono">movementDuration</code> slows the glow's travel along the edge.
      </p>

      <div class="grid gap-6 sm:grid-cols-3">
        <div class="relative h-48 rounded-xl bg-gray-950 p-6">
          <MGlowingEffect
            :glow="true"
            :disabled="false"
            :proximity="64"
            :inactive-zone="0.01"
            :blur="8"
            :spread="120"
            :border-width="3"
            class="rounded-xl"
            data-testid="variant-blur"
          />
          <div class="relative z-10 flex h-full flex-col justify-between">
            <p class="text-sm font-bold text-white">
              Wide blur
            </p>
            <p class="text-xs text-gray-500">
              blur 8 · spread 120
            </p>
          </div>
        </div>

        <div class="relative h-48 rounded-xl bg-gray-950 p-6">
          <MGlowingEffect
            :glow="true"
            :disabled="false"
            :proximity="64"
            :inactive-zone="0.01"
            :spread="40"
            :border-width="1"
            :movement-duration="1"
            class="rounded-xl"
            data-testid="variant-thin"
          />
          <div class="relative z-10 flex h-full flex-col justify-between">
            <p class="text-sm font-bold text-white">
              Thin and quick
            </p>
            <p class="text-xs text-gray-500">
              borderWidth 1 · spread 40 · movement 1s
            </p>
          </div>
        </div>

        <div class="relative h-48 rounded-xl bg-gray-950 p-6">
          <MGlowingEffect
            :glow="true"
            :disabled="false"
            :proximity="64"
            :inactive-zone="0.01"
            :spread="80"
            :border-width="3"
            variant="white"
            :blur="4"
            class="rounded-xl"
            data-testid="variant-white-blur"
          />
          <div class="relative z-10 flex h-full flex-col justify-between">
            <p class="text-sm font-bold text-white">
              White with blur
            </p>
            <p class="text-xs text-gray-500">
              variant white · blur 4
            </p>
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
          Invisible until both <code class="font-mono">:glow="true"</code> and
          <code class="font-mono">:disabled="false"</code> are passed — with the stock defaults
          both layers are hidden. This is the first thing to check when nothing appears.
        </li>
        <li>
          The component's outer element is a plain static div; its absolutely positioned layers
          anchor to <em>your</em> wrapper. The wrapper must be
          <code class="font-mono">relative</code> and should carry the
          <code class="font-mono">rounded</code> corners the layers inherit via
          <code class="font-mono">rounded-[inherit]</code>.
        </li>
        <li>
          Activation is pointer-driven: the conic mask's <code class="font-mono">--active</code>
          opacity ramps as the cursor nears the edge, so static screenshots and touch-only sessions
          show little or nothing.
        </li>
        <li>
          <code class="font-mono">inactiveZone</code> defaults to 0.7 (a large dead center) and
          <code class="font-mono">proximity</code> to 0; every instance here — like the docs —
          overrides them, so expect different behavior if you only set
          <code class="font-mono">:glow="true"</code>.
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const glowOn = ref(true)
</script>
