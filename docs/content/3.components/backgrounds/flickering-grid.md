---
title: Flickering Grid
description: A canvas of squares that keeps re-rolling its own opacity.
---

The Flickering Grid paints a lattice of squares on a canvas and re-rolls a share of their opacities on every tick. Because it draws to a canvas rather than to thousands of DOM nodes, it stays cheap enough to sit behind a whole page.

It stops drawing while scrolled out of view, and paints a single still frame when the visitor has asked for reduced motion.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="flickering-grid-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MFlickeringGrid
      class="absolute inset-0"
      :square-size="4"
      :grid-gap="6"
      :flicker-chance="0.3"
      color="#6b7280"
    />
    <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
      <h3 class="text-2xl font-bold text-highlighted">
        Flickering Grid
      </h3>
      <p class="max-w-xs text-sm text-muted">
        A canvas of squares that keeps re-rolling its own opacity
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
    <component-example name="flickering-grid-custom" />
  :::
#code
  <PlaygroundCode name="FlickeringGrid" />
::

## Props

::component-props
  ::component-prop{name="color" type="string" default="'#6b7280'"}
  Colour of the squares. Accepts `#rgb`, `#rrggbb` or a bare `r, g, b` triple.
  ::

  ::component-prop{name="squareSize" type="number" default="4"}
  Side length of a square, in pixels.
  ::

  ::component-prop{name="gridGap" type="number" default="6"}
  Gap between squares, in pixels.
  ::

  ::component-prop{name="maxOpacity" type="number" default="0.3"}
  Ceiling for a square's opacity. A square is re-rolled somewhere between zero and this value.
  ::

  ::component-prop{name="flickerChance" type="number" default="0.3"}
  Chance per tick that any one square re-rolls its opacity. `1` re-rolls the whole grid every tick.
  ::

  ::component-prop{name="fps" type="number" default="15"}
  Cap on redraws per second. The flicker still reads well below `60`, and a lower cap costs less.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container. The container fills its parent, so give the parent a height.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.flickeringGrid` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative h-full w-full overflow-hidden`
  ::
  ::component-slot-row{name="canvas"}
  `pointer-events-none absolute inset-0 h-full w-full`
  ::
::
