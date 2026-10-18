<template>
  <div class="space-y-12">
    <UPageHeader
      title="BoxesCore"
      description="A skewed grid of bordered cells that light up with a random pastel on hover. Decorative background layer."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The grid is an <code class="font-mono">absolute</code> layer offset
        <code class="font-mono">-top-1/4 left-1/4</code>, so the stage needs
        <code class="font-mono">relative</code> plus <code class="font-mono">overflow-hidden</code>
        to clip it. Each cell is a fixed 32 × 64px; hover fills it instantly from the
        <code class="font-mono">colors</code> palette. Move your cursor across the cells.
      </p>

      <div
        class="relative h-52 overflow-hidden rounded-2xl bg-(--ui-bg-muted)"
        data-testid="stage"
      >
        <MBoxesCore
          :rows="6"
          :cols="9"
          data-testid="basic"
        />
        <div class="relative z-10 flex h-full items-center justify-center">
          <p class="text-lg font-semibold text-highlighted">
            Hover a cell
          </p>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          rows × cols
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cells"
        >
          6 × 9 = 54 cells
        </dd>
        <dt class="text-muted">
          cell size
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cellsize"
        >
          32 × 64px
        </dd>
        <dt class="text-muted">
          skew
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-skew"
        >
          true
        </dd>
        <dt class="text-muted">
          plus signs
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-plus"
        >
          true (every 2nd row/col)
        </dd>
        <dt class="text-muted">
          border
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-border"
        >
          border-muted
        </dd>
        <dt class="text-muted">
          palette entries
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-palette"
        >
          9 pastels
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
        <code class="font-mono">colors</code> is the hover palette, <code class="font-mono">skew</code>
        tilts the whole layer, <code class="font-mono">showPlusSigns</code> draws the crosshair
        marks on alternating intersections, and <code class="font-mono">borderColor</code> is a
        Tailwind border class reused for both the cell borders and the plus-sign stroke.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            no skew, two-tone palette
          </p>
          <div class="relative h-48 overflow-hidden rounded-2xl bg-gray-950">
            <MBoxesCore
              :rows="5"
              :cols="8"
              :skew="false"
              :colors="['#fde047', '#f9a8d4']"
              border-color="border-white/15"
              data-testid="variant-flat"
            />
            <div class="relative z-10 flex h-full items-center justify-center">
              <p class="text-sm font-semibold text-white">
                Flat grid
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            denser, no plus signs, primary border
          </p>
          <div class="relative h-48 overflow-hidden rounded-2xl bg-(--ui-bg-muted)">
            <MBoxesCore
              :rows="7"
              :cols="12"
              :show-plus-signs="false"
              border-color="border-primary-400"
              data-testid="variant-dense"
            />
            <div class="relative z-10 flex h-full items-center justify-center">
              <p class="text-sm font-semibold text-highlighted">
                Dense borders
              </p>
            </div>
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
          The default is <code class="font-mono">rows: 150</code> ×
          <code class="font-mono">cols: 100</code> — 15,000 cells, each carrying a hover animation.
          Every instance here is deliberately shrunk; do not ship the defaults behind content.
        </li>
        <li>
          Cell dimensions are hardcoded (<code class="font-mono">h-8 w-16</code>); there is no
          <code class="font-mono">cellSize</code> prop, so only
          <code class="font-mono">rows</code>/<code class="font-mono">cols</code> control the
          footprint.
        </li>
        <li>
          The root is positioned with a fixed offset rather than filling its parent, so a
          <code class="font-mono">relative overflow-hidden</code> wrapper is mandatory or the grid
          escapes the card.
        </li>
        <li>
          Hover coloring needs a pointing device — cells do nothing on touch, and the effect is
          purely cosmetic (no click handler, no emit).
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Prop tour is static; hover behaviour lives inside the component.
</script>
