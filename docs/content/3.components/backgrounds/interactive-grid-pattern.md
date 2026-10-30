---
title: Interactive Grid Pattern
description: A grid of cells that lights up under the pointer.
---

The Interactive Grid Pattern renders its lattice as real SVG cells rather than a pattern fill, so each cell can answer the pointer on its own. Hovering a cell fills it; leaving empties it again.

The `viewBox` is sized to the cell lattice and drawn with `slice`, so cells stay square at any container ratio instead of stretching to fit.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="interactive-grid-pattern-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MInteractiveGridPattern
      :width="48"
      :height="48"
      :squares-x="30"
      :squares-y="30"
    />
    <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
      <h3 class="text-2xl font-bold text-highlighted">
        Hover the grid
      </h3>
      <p class="max-w-xs text-sm text-muted">
        Every cell lights up under the pointer
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
    <component-example name="interactive-grid-pattern-custom" />
  :::
#code
  <PlaygroundCode name="InteractiveGridPattern" />
::

## Props

::component-props
  ::component-prop{name="width" type="number" default="40"}
  Cell width, in pixels.
  ::

  ::component-prop{name="height" type="number" default="40"}
  Cell height, in pixels.
  ::

  ::component-prop{name="squaresX" type="number" default="24"}
  Columns of cells. Overflow beyond the container is cropped.
  ::

  ::component-prop{name="squaresY" type="number" default="24"}
  Rows of cells. Overflow beyond the container is cropped.
  ::

  ::component-prop{name="color" type="string" default="'var(--ui-border)'"}
  Colour of the cell strokes.
  ::

  ::component-prop{name="hoverColor" type="string" default="'var(--ui-bg-elevated)'"}
  Fill of the cell under the pointer.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the `<svg>`. The element is absolutely positioned, so give the parent a height.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.interactiveGridPattern` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `interactive-grid-pattern absolute inset-0 h-full w-full`
  ::
  ::component-slot-row{name="square"}
  `transition-colors duration-100`
  ::
::
