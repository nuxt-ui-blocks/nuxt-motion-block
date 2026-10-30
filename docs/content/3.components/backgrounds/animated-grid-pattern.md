---
title: Animated Grid Pattern
description: A faint lattice with squares that light up at random.
---

The Animated Grid Pattern draws a dashed grid as a single SVG pattern, then scatters a handful of squares across the same lattice. Each square pulses on its own delay, so the surface never looks like it is running one loop.

Squares are placed on the grid's own coordinates, which means a pulse always lands inside a cell instead of straddling a stroke. The layout is rebuilt whenever the container resizes.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-grid-pattern-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MAnimatedGridPattern
      :num-squares="40"
      :duration="4"
      class="[mask-image:radial-gradient(320px_circle_at_center,white,transparent)]"
    />
    <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
      <h3 class="text-2xl font-bold text-highlighted">
        Animated Grid
      </h3>
      <p class="max-w-xs text-sm text-muted">
        Squares light up at random across a faint lattice
      </p>
    </div>
  </div>
</template>
```
::

## Examples

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="animated-grid-pattern-custom" />
  :::
#code
  <PlaygroundCode name="AnimatedGridPattern" />
::

## Props

::component-props
  ::component-prop{name="width" type="number" default="40"}
  Cell width, in pixels.
  ::

  ::component-prop{name="height" type="number" default="40"}
  Cell height, in pixels.
  ::

  ::component-prop{name="numSquares" type="number" default="50"}
  How many squares to scatter across the grid. Capped at the number of cells that fit.
  ::

  ::component-prop{name="duration" type="number" default="4"}
  Seconds for one pulse of a square.
  ::

  ::component-prop{name="maxOpacity" type="number" default="0.5"}
  Ceiling for a square's opacity.
  ::

  ::component-prop{name="color" type="string" default="'var(--ui-border)'"}
  Colour of the grid and the twinkling squares.
  ::

  ::component-prop{name="strokeDasharray" type="string" default="'0'"}
  Dash pattern for the grid strokes. `'0'` draws solid lines.
  ::

  ::component-prop{name="x" type="number" default="-1"}
  Horizontal offset of the pattern origin.
  ::

  ::component-prop{name="y" type="number" default="-1"}
  Vertical offset of the pattern origin.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the `<svg>`. The element is absolutely positioned, so give the parent a height.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedGridPattern` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `animated-grid-pattern pointer-events-none absolute inset-0 h-full w-full`
  ::
  ::component-slot-row{name="grid"}
  `fill-transparent`
  ::
  ::component-slot-row{name="squares"}
  `overflow-visible`
  ::
  ::component-slot-row{name="square"}
  `animated-grid-pattern-square`
  ::
::
