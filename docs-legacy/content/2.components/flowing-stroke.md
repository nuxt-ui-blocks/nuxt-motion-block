---
title: Flowing Stroke
description: A dashed stroke laid along a wave path that travels on hover.
navigation:
  icon: i-lucide-waves
---

# Flowing Stroke

An SVG ribbon drawn along a wave, with a dashed stripe layer riding on top of it.
The solid ribbon is the track; the dashed layer is the same path stroked thinner
and dash-patterned, so the stripes sit inside it like beads on a string. They
travel by animating `stroke-dashoffset` — nothing moves, only the dash pattern
slides under a stationary path, so the motion is exactly as curved as the path it
follows and can never drift off it.

The stripes only travel while the pointer is inside the element. On leave the
offset freezes where it is and the ribbon goes static. That is the trigger for
the whole effect, and it is why the component works as a hover accent rather than
as a background loop.

Two stroke widths, not one. `ribbon` sets the base stroke and `stripeInset`
shrinks the stripe layer inward from both sides, so the solid ribbon always shows
as an even border around the travelling dashes. Set `stripeInset` to `0` and the
stripes sit flush with the ribbon edge.

## Usage

Set `width` and `height` — they size both the root div and the SVG viewBox, so
the wave scales with the box rather than being clipped. Everything else is
tuning: the dash rhythm from `dash` and `gap`, the weight from `ribbon` and
`stripeInset`, and `speed` as a multiplier on the base rate.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="flowing-stroke-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-6">
    <div class="rounded-2xl bg-violet-50 p-4 dark:bg-violet-950/30">
      <MFlowingStroke
        :width="440"
        :height="140"
        :dash="30"
        :gap="18"
        :ribbon="16"
        :speed="1.4"
      />
      <p class="text-center text-xs text-muted">
        Hover the ribbon — the dashes travel along the path
      </p>
    </div>

    <div class="rounded-2xl border border-default p-4">
      <MFlowingStroke
        :width="440"
        :height="160"
        :dash="6"
        :gap="10"
        :ribbon="10"
        :speed="3"
      />
      <p class="text-center text-xs text-muted">
        A tight dash at three times the base speed
      </p>
    </div>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="width" type="number" default="1200"}
  Pixel width of the drawing surface. Also drives the wave's control points and
  the root div's inline width, so the path is authored in the same coordinate
  space it is rendered in.
  ::
  ::field{name="height" type="number" default="220"}
  Pixel height, used the same way as `width` — root size, viewBox and the wave's
  vertical offsets all derive from it.
  ::
  ::field{name="ribbon" type="number" default="18"}
  Stroke width of the solid background ribbon.
  ::
  ::field{name="stripeInset" type="number" default="4"}
  How much thinner the stripe layer is than the ribbon, applied to each side.
  The stripe stroke width is `ribbon - stripeInset * 2`.
  ::
  ::field{name="dash" type="number" default="34"}
  Length of each dash, in pixels along the path.
  ::
  ::field{name="gap" type="number" default="22"}
  Gap between dashes. `dash + gap` is the period the travel offset wraps on, so
  changing either changes the seamlessness of the loop.
  ::
  ::field{name="speed" type="number" default="1"}
  Multiplier on the base travel rate of 120px per second.
  ::
::

## Accessibility

The `<svg>` is `aria-hidden="true"` and carries no title, role or description —
it is decoration, and nothing about it reaches the accessibility tree. The
component does not contribute any semantics of its own, so the text around it is
entirely yours to provide.

There is no keyboard trigger and no touch handling. The stripes advance only on
`mouseenter` / `mouseleave`, so on a touch device the ribbon renders and stays
still, and for a keyboard user there is nothing to focus.

Under `prefers-reduced-motion: reduce` a scoped rule pins `stroke-dashoffset` to
`0` with `!important`, freezing the dashes in place regardless of the rAF loop.

## Performance

- One `requestAnimationFrame` loop per instance, started on mount and cancelled
  on unmount. It runs continuously but only writes to the ref while hovered.
- The offset is a plain ref bound to `stroke-dashoffset`, so the write is a
  style update on one SVG path — no Vue re-render, no reconciliation.
- Travel is time-based, not frame-based: it converts the frame delta into pixels
  per second, so the rate is identical on a 60Hz and a 144Hz display.
- The offset is taken modulo `dash + gap`, which keeps the value bounded however
  long the pointer stays over the component.
- Both paths share one computed `d` string — the wave is built once from `width`
  and `height`, not per layer per frame. The stripe path also carries
  `vector-effect="non-scaling-stroke"` so its width survives any SVG scaling.

::tip
The wave is a fixed four-segment cubic path generated from `width` and `height`,
not a configurable curve. The only shape control you have is the aspect ratio:
a wide, short box flattens the crests, a tall narrow box steepens them. If you
need a different curve, that path has to change in the source.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.flowingStroke` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative overflow-hidden` |
| `svg` | `w-full h-full block` |
