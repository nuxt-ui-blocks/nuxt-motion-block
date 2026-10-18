<template>
  <div class="space-y-12">
    <UPageHeader
      title="DivGrid"
      description="A controllable grid of translucent cells with click emission and a distance-based ripple keyed off clickedCell."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The grid is fully controlled: a click only emits
        <code class="font-mono">cellClick(row, col)</code>, and the ripple animation exists purely
        because the <code class="font-mono">clickedCell</code> prop is set — the component never
        mutates state itself. Feed the emitted cell back in and every cell replays its ripple with a
        delay proportional to its distance from the click. Click any cell.
      </p>

      <div
        class="rounded-2xl bg-(--ui-bg-muted) p-4"
        data-testid="stage"
      >
        <MDivGrid
          :rows="5"
          :cols="10"
          :cell-size="40"
          :clicked-cell="clickedCell"
          data-testid="grid"
          @cell-click="handleCellClick"
        />
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          last click
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-cell"
        >
          {{ lastClick }}
        </dd>
        <dt class="text-muted">
          rows × cols × cellSize
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-size"
        >
          5 × 10 × 40px (400 × 200px)
        </dd>
        <dt class="text-muted">
          interactive
        </dt>
        <dd class="font-mono">
          true
        </dd>
        <dt class="text-muted">
          fillColor
        </dt>
        <dd class="font-mono">
          rgba(14,165,233,0.3)
        </dd>
        <dt class="text-muted">
          borderColor
        </dt>
        <dd class="font-mono">
          #3f3f46
        </dd>
        <dt class="text-muted">
          ripple delay
        </dt>
        <dd class="font-mono">
          distance × 55ms
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
        Density comes from <code class="font-mono">rows</code> ×
        <code class="font-mono">cols</code> × <code class="font-mono">cellSize</code>, colors are
        plain strings, and <code class="font-mono">interactive: false</code> adds
        <code class="font-mono">pointer-events-none</code> to every cell so the grid becomes a pure
        backdrop.
      </p>

      <div class="grid gap-6 lg:grid-cols-2">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            dense, warm palette
          </p>
          <div class="overflow-x-auto rounded-2xl bg-gray-950 p-4">
            <MDivGrid
              :rows="8"
              :cols="18"
              :cell-size="22"
              border-color="rgba(251, 191, 36, 0.6)"
              fill-color="rgba(251, 191, 36, 0.18)"
              :interactive="false"
              data-testid="variant-dense"
            />
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            static — clicks are ignored
          </p>
          <div class="overflow-x-auto rounded-2xl bg-(--ui-bg-muted) p-4">
            <MDivGrid
              :rows="6"
              :cols="10"
              :cell-size="36"
              :interactive="false"
              data-testid="variant-static"
            />
          </div>
          <p class="text-xs text-muted">
            Both instances pass <code class="font-mono">:interactive="false"</code>; the dense one
            also shows custom colors.
          </p>
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
          The grid width and height are computed in pixels
          (<code class="font-mono">cols × cellSize</code>) and centered with
          <code class="font-mono">margin-inline: auto</code> — there is no fluid sizing, so wide
          grids overflow narrow screens (both stages above scroll horizontally as a result).
        </li>
        <li>
          Cells rest at <code class="font-mono">opacity-40</code> and rise to
          <code class="font-mono">opacity-80</code> on hover; the ripple class stays mounted as long
          as <code class="font-mono">clickedCell</code> is non-null, so this demo clears it first
          and re-sets it on <code class="font-mono">nextTick</code> to restart the animation on
          every click.
        </li>
        <li>
          <code class="font-mono">cellClick</code> is the only emit — no hover or focus events, and
          cells are plain divs with no keyboard semantics.
        </li>
        <li>
          Radius, gap and border width are not exposed; the 0.5px border and 40/80 opacity ramp are
          fixed in the component's cell classes.
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

interface ClickedCell {
  row: number
  col: number
}

const clickedCell = ref<ClickedCell | null>(null)
const lastClick = ref('none yet')

async function handleCellClick(row: number, col: number) {
  clickedCell.value = null
  await nextTick()
  clickedCell.value = { row, col }
  lastClick.value = `row ${row}, col ${col}`
}
</script>
