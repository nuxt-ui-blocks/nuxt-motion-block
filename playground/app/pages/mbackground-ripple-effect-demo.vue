<template>
  <div class="space-y-12">
    <UPageHeader
      title="BackgroundRippleEffect"
      description="A grid of cells ripples out from wherever you click. Translated from reactbits' background-ripple-effect."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Click a cell
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The root is <code class="font-mono">absolute inset-0</code>, so the stage needs
        <code class="font-mono">relative</code> and an explicit height. Cells are interactive;
        each click stores the cell, bumps an internal key and remounts the inner grid, which
        applies a distance-based <code class="font-mono">--delay</code> and
        <code class="font-mono">--duration</code> to every cell. The headline is
        <code class="font-mono">pointer-events-none</code> so clicks fall through to the grid.
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
        <MBackgroundRippleEffect
          :key="replayKey"
          data-testid="basic-ripple"
        />
        <div class="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p class="text-xs font-medium uppercase tracking-widest text-muted">
            BackgroundRippleEffect
          </p>
          <h2 class="mt-3 text-3xl font-bold text-highlighted">
            Click anywhere on the grid
          </h2>
          <p class="mt-3 max-w-md text-sm text-muted">
            Defaults: 8 rows × 27 cols at 56px — the 1512px grid is wider than this card, so
            the right side is clipped by the stage.
          </p>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          rows · cols · cell size
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-config"
        >
          8 × 27 · 56px
        </dd>
        <dt class="text-muted">
          grid size (default)
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-grid-size"
        >
          1512 × 448px
        </dd>
        <dt class="text-muted">
          cells
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cells"
        >
          216
        </dd>
        <dt class="text-muted">
          ripple delay
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-delay"
        >
          distance × 55ms
        </dd>
        <dt class="text-muted">
          ripple duration
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-duration"
        >
          200ms + distance × 80ms
        </dd>
        <dt class="text-muted">
          cell idle / hover opacity
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-opacity"
        >
          40% → 80%
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Grid density
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The three presets keep each grid at or under the card width, so nothing is clipped:
        <code class="font-mono">cols × cellSize</code> is the grid width, and every stage clips
        anything taller than its wrapper. All cells stay clickable — there is no overlay here.
      </p>

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="preset in densityPresets"
          :key="preset.id"
          class="space-y-2"
        >
          <p class="text-xs font-medium text-muted">
            {{ preset.label }}
          </p>
          <div class="relative h-48 overflow-hidden rounded-xl border border-default bg-(--ui-bg-muted)">
            <MBackgroundRippleEffect
              :key="`${preset.id}-${replayKey}`"
              :rows="preset.rows"
              :cols="preset.cols"
              :cell-size="preset.cellSize"
              :data-testid="`density-${preset.id}`"
            />
          </div>
        </div>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt
          v-for="preset in densityPresets"
          :key="`dt-${preset.id}`"
          class="text-muted"
        >
          {{ preset.label }}
        </dt>
        <dd
          v-for="preset in densityPresets"
          :key="`dd-${preset.id}`"
          class="font-mono"
        >
          {{ preset.rows * preset.cols }} cells · {{ preset.cols * preset.cellSize }}px wide
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Live dimensions
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">rows</code>, <code class="font-mono">cols</code> and
        <code class="font-mono">cell-size</code> are plain reactive props — the grid rebuilds
        without a remount. The readouts track the derived geometry:
        <code class="font-mono">cols × cellSize</code> wide,
        <code class="font-mono">rows × cellSize</code> tall, and the wrapper clips whatever
        overflows the stage.
      </p>

      <UFormField
        class="mb-4"
        label="rows"
        data-testid="field-rows"
      >
        <USlider
          v-model="rows"
          :max="14"
          :min="2"
          :step="1"
          data-testid="slider-rows"
        />
      </UFormField>

      <UFormField
        class="mb-4"
        label="cols"
        data-testid="field-cols"
      >
        <USlider
          v-model="cols"
          :max="30"
          :min="6"
          :step="1"
          data-testid="slider-cols"
        />
      </UFormField>

      <UFormField
        class="mb-6"
        label="cell-size (px)"
        data-testid="field-cell-size"
      >
        <USlider
          v-model="cellSize"
          :max="64"
          :min="16"
          :step="4"
          data-testid="slider-cell-size"
        />
      </UFormField>

      <div class="relative h-96 overflow-hidden rounded-2xl border border-default bg-(--ui-bg-muted)">
        <MBackgroundRippleEffect
          :rows="rows"
          :cols="cols"
          :cell-size="cellSize"
          data-testid="live-ripple"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          rows
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-rows"
        >
          {{ rows }}
        </dd>
        <dt class="text-muted">
          cols
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cols"
        >
          {{ cols }}
        </dd>
        <dt class="text-muted">
          cell-size
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cell-size"
        >
          {{ cellSize }}px
        </dd>
        <dt class="text-muted">
          grid width
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-width"
        >
          {{ cols * cellSize }}px
        </dd>
        <dt class="text-muted">
          grid height
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-height"
        >
          {{ rows * cellSize }}px
        </dd>
        <dt class="text-muted">
          cells
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-live-cells"
        >
          {{ rows * cols }}
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const densityPresets = [
  { id: 'sparse', label: 'sparse · 6 × 12 × 40px', rows: 6, cols: 12, cellSize: 40 },
  { id: 'compact', label: 'compact · 8 × 20 × 32px', rows: 8, cols: 20, cellSize: 32 },
  { id: 'dense', label: 'dense · 14 × 30 × 18px', rows: 14, cols: 30, cellSize: 18 },
] as const

const replayKey = ref(0)
const rows = ref(8)
const cols = ref(14)
const cellSize = ref(48)

function replay() {
  replayKey.value++
}
</script>
