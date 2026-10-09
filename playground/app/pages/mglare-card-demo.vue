<template>
  <div class="space-y-12">
    <UPageHeader
      title="Glare Card"
      description="A card that tilts in perspective and sweeps a soft radial glare across its own surface."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Nothing happens until a pointer enters: <code class="font-mono">pointermove</code> writes
        six custom properties (<code class="font-mono">--m-x</code>, <code class="font-mono">--r-x</code>,
        <code class="font-mono">--bg-x</code> …) straight onto the wrapper, and the card's own
        <code class="font-mono">transform</code> and gradients read them. Leave the card and it
        unwinds back to <code class="font-mono">0deg</code> with the glare faded out. With no slot
        content you get the built-in default.
      </p>

      <div class="grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
        <MGlareCard
          data-testid="card-basic"
          class="w-full max-w-sm"
        />
      </div>

      <dl class="mt-8 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          perspective
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-perspective"
        >
          600px
        </dd>
        <dt class="text-muted">
          rotate factor
        </dt>
        <dd class="font-mono">
          0.4
        </dd>
        <dt class="text-muted">
          idle opacity
        </dt>
        <dd class="font-mono">
          0 → 0.6 on enter
        </dd>
        <dt class="text-muted">
          layers
        </dt>
        <dd class="font-mono">
          foil + glare + content
        </dd>
        <dt class="text-muted">
          blend modes
        </dt>
        <dd class="font-mono">
          color-dodge · soft-light
        </dd>
        <dt class="text-muted">
          reset on leave
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reset"
        >
          r-x / r-y → 0deg
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Slots
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        Header and footer wrap their slot content in a <code class="font-mono">z-10</code> layer so
        it stays above the foil and glare. <code class="font-mono">class</code> lands on the inner
        <code class="font-mono">UCard</code>, which is where a gradient or a dark surface belongs —
        the tilt lives on the wrapper outside it.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <MGlareCard
          data-testid="card-slots"
          class="w-full bg-slate-950"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold">Slotted header</span>
              <UIcon
                name="i-lucide-sparkles"
                class="size-4 text-sky-400"
              />
            </div>
          </template>

          <div class="space-y-3 py-4 text-center">
            <p class="text-sm text-slate-300">
              Default slot content sits between the header and footer, above the glare layer.
            </p>
            <UButton
              label="Works while tilting"
              variant="outline"
              size="sm"
              data-testid="card-action"
            />
          </div>

          <template #footer>
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>footer slot</span>
              <UBadge
                variant="subtle"
                data-testid="card-badge"
              >
                z-10
              </UBadge>
            </div>
          </template>
        </MGlareCard>

        <div class="flex items-center rounded-2xl border border-dashed border-default p-6">
          <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <dt class="text-muted">
              slots
            </dt>
            <dd class="font-mono">
              header · default · footer
            </dd>
            <dt class="text-muted">
              class
            </dt>
            <dd class="font-mono">
              inner UCard
            </dd>
            <dt class="text-muted">
              ui
            </dt>
            <dd class="font-mono">
              root / header / body / footer
            </dd>
            <dt class="text-muted">
              default slot
            </dt>
            <dd class="font-mono">
              sparkle + title + hint
            </dd>
            <dt class="text-muted">
              events
            </dt>
            <dd class="font-mono">
              pointermove / enter / leave
            </dd>
            <dt class="text-muted">
              pointer only
            </dt>
            <dd
              class="font-mono"
              data-testid="readout-pointer"
            >
              no touch handler
            </dd>
          </dl>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Glare colors
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The glare is one radial gradient with three stops —
        <code class="font-mono">glareColor</code> at 10%, <code class="font-mono">glareColorInner</code>
        at 20% and <code class="font-mono">glareColorOuter</code> fading to transparent at 90%.
        They are inline styles, so any CSS color works. The foil layer underneath also takes
        <code class="font-mono">rainbowColors</code> as raw <code class="font-mono">rgb()/rgba()</code> stops.
      </p>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-10">
        <MGlareCard
          :key="preset.label"
          data-testid="card-color"
          class="w-full max-w-sm bg-slate-950"
          :glare-color="preset.core"
          :glare-color-inner="preset.inner"
          :glare-color-outer="preset.outer"
        >
          <template #header>
            <span class="text-sm font-semibold">{{ preset.label }}</span>
          </template>

          <div class="space-y-2 py-6 text-center">
            <p class="font-mono text-xs text-slate-300">
              {{ preset.core }}
            </p>
            <p class="text-xs text-slate-400">
              Move the pointer to sample this stop set.
            </p>
          </div>
        </MGlareCard>
      </div>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="option in presets"
          :key="option.label"
          :label="option.label"
          :variant="preset.label === option.label ? 'solid' : 'outline'"
          size="sm"
          :data-testid="`preset-${option.label}`"
          @click="preset = option"
        />
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          active
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-preset"
        >
          {{ preset.label }}
        </dd>
        <dt class="text-muted">
          stops
        </dt>
        <dd class="font-mono">
          10% · 20% · 90%
        </dd>
        <dt class="text-muted">
          rainbow stops
        </dt>
        <dd class="font-mono">
          7 rgb entries
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface GlarePreset {
  label: string
  core: string
  inner: string
  outer: string
}

const presets: GlarePreset[] = [
  { label: 'white', core: 'rgba(255,255,255,0.8)', inner: 'rgba(255,255,255,0.65)', outer: 'rgba(255,255,255,0)' },
  { label: 'sky', core: 'rgba(125,211,252,0.9)', inner: 'rgba(56,189,248,0.6)', outer: 'rgba(14,165,233,0)' },
  { label: 'amber', core: 'rgba(253,230,138,0.9)', inner: 'rgba(251,191,36,0.6)', outer: 'rgba(245,158,11,0)' },
  { label: 'violet', core: 'rgba(221,214,254,0.9)', inner: 'rgba(167,139,250,0.6)', outer: 'rgba(139,92,246,0)' },
]

const preset = ref<GlarePreset>(presets[0])
</script>
