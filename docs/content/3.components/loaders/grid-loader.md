---
title: Grid Loader
description: A 3×3 pixel grid that pulses through one of sixty-odd built-in patterns, or cycles a custom sequence.
---

A 3×3 grid of glowing squares that cycles a pattern. The pattern is either one
of the sixty-odd presets (`wave-lr`, `spiral-cw`, `heartbeat`, `border`,
`ripple-out`, …) or a 3×3 matrix of `0 | 1` you write yourself — every preset is
just a matrix, so anything the presets don't cover is expressible.

Three modes decide how a pattern plays:

- `pulse` (default) — every active cell breathes together on an infinite loop.
- `stagger` — active cells light up one after another, left to right, then hold.
- `sequence` — steps through `sequence`, one entry per cycle, on a `setInterval`.

Every active cell also carries a three-layer `box-shadow` glow scaled to the cell
size, which is what gives it the lit-pixel look rather than a flat block.

::note
`className` is declared in the source but never read — the component styles its
root from the fallthrough `class` attribute instead. Pass `class`, not
`className`. There is no `class` prop.
::

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="grid-loader-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6">
    <div class="flex h-28 items-center justify-center">
      <MGridLoader
        :pattern="pattern"
        :mode="mode"
        :sequence="['solo-center', 'x-shape', 'diamond', 'border']"
        color="primary"
        size="lg"
        :rounded="rounded"
        :static="frozen"
      />
    </div>

    <div class="grid w-full max-w-sm grid-cols-2 gap-3">
      <USelect
        v-model="pattern"
        :items="patterns"
      />
      <USelect
        v-model="mode"
        :items="['pulse', 'stagger', 'sequence']"
      />
    </div>

    <div class="flex items-center gap-4">
      <UCheckbox
        v-model="rounded"
        label="Round cells"
      />
      <UButton
        :label="frozen ? 'Resume' : 'Freeze'"
        icon="i-lucide-pause"
        size="xs"
        variant="outline"
        @click="frozen = !frozen"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const pattern = ref('wave-lr')
const mode = ref<'pulse' | 'stagger' | 'sequence'>('pulse')
const rounded = ref(false)
const frozen = ref(false)

const patterns = ['wave-lr', 'spiral-cw', 'heartbeat', 'checkerboard', 'border', 'ripple-out']
</script>
```
::

Size is set in pixels and drives the whole grid: the root is `size × size`, and
each cell is `(size - gap * 2) / 3`. A custom matrix is a plain nested array:

```vue
<MGridLoader :pattern="[[1, 0, 1], [0, 1, 0], [1, 0, 1]]" />
```

The root is an `<output>` with `role="status"`, so put it where a status message
belongs rather than inside a button.


## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="grid-loader-custom" />
  :::
#code
  <PlaygroundCode name="GridLoader" />
::

## Props

::component-props
  ::component-prop{name="pattern" type="PresetPattern | [0 | 1, 0 | 1, 0 | 1][]" default="'plus-hollow'"}
  Which cells are lit. A string is looked up in the preset table; an unrecognised
  string falls back to `plus-hollow` rather than rendering an empty grid. An
  array is used as-is. Ignored when `mode="sequence"` and `sequence` is non-empty.
  ::
  ::component-prop{name="mode" type="'pulse' | 'sequence' | 'stagger'" default="'pulse'"}
  How the pattern plays. `stagger` changes both the keyframes (`[0.4, 1, 0.4]`
  becomes `[0, 1, 1, 0]` on scale) and the loop `times`; `sequence` ignores
  `pattern` and steps `sequence`.
  ::
  ::component-prop{name="sequence" type="Array<PresetPattern | GridMatrix>" default="[]"}
  Patterns to cycle through, one per `speed` interval. Only read when
  `mode="sequence"`, and an empty array leaves the loader on `pattern`.
  ::
  ::component-prop{name="speed" type="'slow' | 'normal' | 'fast'" default="'normal'"}
  Cycle duration: 1500ms, 800ms and 400ms respectively. Also the delay step in
  `stagger` mode and the `setInterval` period in `sequence` mode.
  ::
  ::component-prop{name="size" type="'sm' | 'md' | 'lg' | 'xl' | number" default="'md'"}
  Total width and height in pixels. The presets are 24, 32, 48 and 64; a number
  is used verbatim. An unrecognised string falls back to 32.
  ::
  ::component-prop{name="color" type="'white' | 'red' | 'blue' | 'green' | 'amber' | string" default="'white'"}
  Cell colour. Named values resolve through a lookup to CSS custom properties
  (`primary`, `secondary`, `success`, `warning`, `error`, `info`, `neutral` and
  their `blue`/`green`/`red`/`amber` aliases); anything else is passed to CSS as
  a literal. Used for the fill *and* all three glow layers.
  ::
  ::component-prop{name="gap" type="number" default="0"}
  Grid gap in pixels, subtracted from the total size before cells are computed.
  Large values shrink the cells rather than overflowing the grid.
  ::
  ::component-prop{name="blur" type="number" default="0"}
  CSS `blur()` filter in pixels applied to the whole grid. Useful for an
  out-of-focus background element.
  ::
  ::component-prop{name="rounded" type="boolean" default="false"}
  Switches the cell `border-radius` to `50%`, turning the squares into dots.
  ::
  ::component-prop{name="static" type="boolean" default="false"}
  Freezes the loader: active cells render as plain `div`s and the transition
  duration drops to `0`. Note that inactive cells always render as plain spacers,
  so a frozen loader is the fully lit static frame of its pattern.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.gridLoader` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inline-grid grid-cols-3`
  ::
::

## Accessibility

The root is an `<output aria-label="Loading" role="status">`, which is the right
semantic for a loader: it is announced politely rather than interrupting, and
the cells are decorative `div`s with no text of their own. The label is hardcoded
to "Loading" — there is no prop to change it, so if you need a more specific
message, put visible text next to the loader instead of relying on the
announcement.

There is no keyboard interaction, which is correct for a non-interactive
indicator.

Reduced motion is honoured: `onMounted` reads
`(prefers-reduced-motion: reduce)` and, when it matches, `static` behaviour is
implied — no `Motion` components are created and the `setInterval` is never
started. The check runs once on mount and is not watched, so a user changing the
setting while the page is open will not see the loader update.

## Performance

- Nine cells are rendered per frame regardless of pattern, with keys
  `tl…br` — the elements are reused across patterns rather than recreated, so
  switching patterns animates the existing cells rather than remounting.
- Cell animation is `opacity` and `scale` only, both compositor properties. The
  glow is a static `box-shadow` on the cell style, not animated.
- `stagger` mode's delays are a computed over the nine cells, recalculated when
  the pattern or cycle duration changes.
- `sequence` mode runs one `setInterval` started in `onMounted` and cleared in
  `onBeforeUnmount`. Because it is only started on mount, changing `mode` or
  `sequence` after mount does not start or stop it — the interval keeps its
  original period and pattern list.
- The `PATTERNS`, `COLORS` and `SIZES` lookup tables are exposed on the component
  instance if you need to reference the preset names from your own code.

::tip
The table has a few entries that look like they should differ but are identical —
`frame`, `frame-sync` and `border` share one matrix, and so do `corners`,
`corners-sync` and `corners-only`. The sync variants exist for readability, not
behaviour, so don't expect a visual difference when swapping between them.
::

