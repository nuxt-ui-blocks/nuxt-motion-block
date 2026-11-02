---
title: Hexagon Pattern
description: A honeycomb lattice drawn as a single repeating SVG tile.
---

Hexagon Pattern tiles a honeycomb from one `<pattern>` definition. The tile holds two hexagons and their seam copies, so the browser repeats a handful of polygons instead of painting a grid of elements. Radius, spacing and orientation are independent.

Spacing is measured between the visible edges rather than on the raw axes, so `gap` reads as the same distance on every side of a hexagon. Dashed outlines are drawn from deduplicated edges: drawing each hexagon separately would restart the dash at every shared edge and break the rhythm.

A second `<hexagons>` array fills individual cells on top of the pattern, which is how you pick out a few cells without leaving the tile.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="hexagon-pattern-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MHexagonPattern
      :radius="26"
      :gap="4"
      :hexagons="[[1, 1], [4, 4], [2, 2], [3, 4], [5, 4], [8, 2]]"
      class="[mask-image:radial-gradient(320px_circle_at_center,white,transparent)]"
    />
    <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
      <h3 class="text-2xl font-bold text-highlighted">
        Hexagon Pattern
      </h3>
      <p class="max-w-xs text-sm text-muted">
        A honeycomb tile, with a handful of cells filled in
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
    <component-example name="hexagon-pattern-custom" />
  :::
#code
  <PlaygroundCode name="HexagonPattern" />
::

## Props

::component-props
  ::component-prop{name="radius" type="number" default="40"}
  Radius of one hexagon, measured from its centre to a vertex, in pixels.
  ::

  ::component-prop{name="gap" type="number" default="0"}
  Visible spacing between neighbouring hexagons, in pixels. The tile grows to make room while the hexagons keep their radius.
  ::

  ::component-prop{name="direction" type="'horizontal' | 'vertical'" default="'horizontal'"}
  `horizontal` draws flat-top hexagons in a horizontal honeycomb; `vertical` draws pointy-top hexagons in a vertical one.
  ::

  ::component-prop{name="strokeDasharray" type="string" default="'0'"}
  Dash pattern for the outlines. `0`, `none` or an empty string keeps them solid.
  ::

  ::component-prop{name="hexagons" type="[number, number][]" default="[]"}
  `[col, row]` cells to fill on top of the repeating pattern.
  ::

  ::component-prop{name="color" type="string" default="'var(--ui-border)'"}
  Colour of the outlines and the filled cells.
  ::

  ::component-prop{name="x" type="number" default="-1"}
  Horizontal offset of the pattern origin.
  ::

  ::component-prop{name="y" type="number" default="-1"}
  Vertical offset of the pattern origin.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the `<svg>`. The element is positioned to fill its parent, so give the parent a height.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.hexagonPattern` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `pointer-events-none absolute inset-0 size-full fill-current stroke-current`
  ::
  ::component-slot-row{name="highlight"}
  `overflow-visible`
  ::
::

## Accessibility

The `<svg>` is `aria-hidden` and `pointer-events-none`: the pattern is decoration, so it is skipped by screen readers and never intercepts a click. Put any real content in a sibling on top of it.
