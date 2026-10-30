---
title: Retro Grid
description: A tilted grid plane that scrolls towards the horizon.
---

The Retro Grid lays a grid on a plane rotated in 3D space and scrolls it towards the viewer. The perspective does the work: the cells near the horizon crowd together while the ones up close spread out.

It is a decorative background, so it ignores pointer events and expects a parent with a height.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="retro-grid-example" />
  :::
#code
```vue
<template>
  <div class="relative h-72 w-full overflow-hidden rounded-xl border border-default bg-default">
    <MRetroGrid />
    <div class="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center">
      <h3 class="text-3xl font-bold text-highlighted">
        Retro Grid
      </h3>
      <p class="max-w-xs text-sm text-muted">
        A tilted plane that scrolls towards the horizon
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
    <component-example name="retro-grid-custom" />
  :::
#code
  <PlaygroundCode name="RetroGrid" />
::

## Props

::component-props
  ::component-prop{name="angle" type="number" default="65"}
  Tilt of the plane, in degrees. Lower values lay the grid flatter against the screen.
  ::

  ::component-prop{name="cellSize" type="number" default="60"}
  Distance between grid lines, in pixels.
  ::

  ::component-prop{name="speed" type="number" default="3"}
  Seconds for the grid to travel one cell towards the viewer. Lower is faster.
  ::

  ::component-prop{name="color" type="string" default="'var(--ui-border)'"}
  Colour of the grid lines. Any CSS colour works.
  ::

  ::component-prop{name="opacity" type="number" default="0.6"}
  Opacity of the grid lines.
  ::

  ::component-prop{name="fade" type="boolean" default="true"}
  Fade the grid out towards the horizon. Turn it off for a hard edge.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container. The container fills its parent, so give the parent a height.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.retroGrid` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `retro-grid pointer-events-none absolute inset-0 h-full w-full overflow-hidden`
  ::
  ::component-slot-row{name="tilt"}
  `retro-grid-tilt absolute inset-0`
  ::
  ::component-slot-row{name="plane"}
  `retro-grid-plane absolute`
  ::
  ::component-slot-row{name="fade"}
  `pointer-events-none absolute inset-0`
  ::
::
