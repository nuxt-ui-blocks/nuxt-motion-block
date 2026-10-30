---
title: Warp Background
description: A perspective floor grid that scrolls toward the viewer under a glowing horizon.
---

Warp Background draws a horizon, a fan of lines that converge on a vanishing point, and a set of rungs that travel toward the viewer and bunch up as they approach it. The rungs are spaced with `depth^2.6` rather than evenly, which is what makes the floor read as receding instead of as a moving stripe pattern.

It is a canvas, not a CSS `rotateX` grid: the perspective, the radial horizon glow and the vertical light shafts are all painted each frame, so they stay sharp at any size and the shafts can flicker independently. The loop pauses when the frame scrolls out of view, and reduced motion paints a single still frame.

Whatever you put in the default slot is drawn above the floor, so the component is the stage as well as the scene.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="warp-background-example" />
  :::
#code
```vue
<template>
  <MWarpBackground
    color="#6366f1"
    :lines="24"
    :beams="5"
    class="h-72 w-full rounded-xl bg-neutral-950"
  >
    <div class="flex h-full flex-col items-center justify-center gap-2 text-center">
      <p class="text-xs uppercase tracking-[0.3em] text-white/50">
        Warp speed
      </p>
      <p class="text-3xl font-semibold text-white">
        Into the horizon
      </p>
    </div>
  </MWarpBackground>
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
    <component-example name="warp-background-custom" />
  :::
#code
  <PlaygroundCode name="WarpBackground" />
::

## Props

::component-props
  ::component-prop{name="color" type="string" default="'#6366f1'"}
  Colour of the horizon glow and the light shafts. Any hex or bare `r, g, b` triple works.
  ::

  ::component-prop{name="gridColor" type="string" default="'#ffffff'"}
  Colour of the floor lines. The rungs and the fan share it, so the two always match.
  ::

  ::component-prop{name="lines" type="number" default="22"}
  How many lines fan out from the vanishing point. More lines fill the floor more densely.
  ::

  ::component-prop{name="beams" type="number" default="4"}
  How many vertical shafts stand on the floor. Each one keeps a fixed place and flickers on its own phase.
  ::

  ::component-prop{name="speed" type="number" default="1"}
  Speed of the travel. Lower is slower; `0.3` is a slow drift.
  ::

  ::component-prop{name="horizon" type="number" default="0.55"}
  Where the floor meets the sky, from `0` (top) to `1` (bottom). Lower values give a taller floor.
  ::

  ::component-prop{name="glow" type="number" default="0.6"}
  Strength of the radial glow at the vanishing point, from `0` to `1`. Set it to `0` for a flat grid.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the frame. The canvas fills it, so the frame needs a height and a background — the grid is drawn on transparent.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Content drawn above the floor. It sits in a `relative z-10` layer, so a headline or a call to action lands on top of the grid instead of under it.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.warpBackground` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative size-full overflow-hidden`
  ::
  ::component-slot-row{name="canvas"}
  `absolute inset-0 size-full`
  ::
  ::component-slot-row{name="content"}
  `relative z-10 size-full`
  ::
::

## Accessibility

The canvas is `aria-hidden` and carries no information, so anything the floor is framing still has to be in the DOM on top of it. There is no pointer capture and no focusable element, which means the effect never takes a click or a tab stop away from the content.

The grid is drawn on a transparent canvas, so give the frame a solid background: white lines on a white page are invisible, and the glow needs something dark to sit against. With reduced motion the loop never starts and a single frame is painted, so the scene is still there but nothing travels.
