---
title: Flowing Stroke
description: A dashed stroke laid along a configurable path that travels on hover or on a loop.
---

A ribbon drawn along a path, with a dashed stripe layer riding on top of it. The
solid ribbon is the track; the dashed layer is the same path stroked thinner and
dash-patterned, so the stripes sit inside it like beads on a string. They travel by
animating `stroke-dashoffset` — nothing moves, only the dash pattern slides under a
stationary path, so the motion is exactly as curved as the path it follows and can
never drift off it.

Two colours, not one. `color` paints the travelling dashes; `trackColor` paints the
tube they ride in. Leave `trackColor` unset and it defaults to a soft 30% tint of
`color`, so one prop dresses both layers — set it to any CSS colour to pull them
apart.

The path is not fixed either. `shape` picks one of five generators — `wave`, `arc`,
`diagonal`, `zigzag` and `ring` — each built from `width`, `height` and `amplitude`,
so it scales with the box rather than being clipped.

By default the stripes only travel while the pointer is inside the element; on leave
the offset freezes where it is and the ribbon goes static. Set `trigger="loop"` to
run them continuously from mount instead, and `direction="reverse"` to send them the
other way.

Two stroke widths, not one. `ribbon` sets the base stroke and `stripeInset` shrinks
the stripe layer inward from both sides, so the solid ribbon always shows as an even
border around the travelling dashes. Set `stripeInset` to `0` and the stripes sit
flush with the ribbon edge.

## Usage

Set `width` and `height` — they size both the root div and the SVG viewBox, so the
path scales with the box rather than being clipped. Then pick a `shape`, set `color`
for the dashes and `trackColor` for the tube if you want it apart from the soft
default, and tune the rhythm with `dash` and `gap`, the weight with `ribbon` and
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
    <div class="rounded-2xl border border-default p-4">
      <div class="flex justify-center">
        <MFlowingStroke
          :width="440"
          :height="140"
          color="primary"
          :dash="30"
          :gap="18"
          :ribbon="16"
          :speed="1.4"
        />
      </div>
      <p class="mt-2 text-center text-xs text-muted">
        One <code class="font-mono">color</code> — the tube behind the dashes is a soft 30% tint of it
      </p>
    </div>

    <div class="rounded-2xl border border-default p-4">
      <div class="flex justify-center">
        <MFlowingStroke
          :width="440"
          :height="140"
          color="#f0abfc"
          track-color="#3b0764"
          :dash="26"
          :gap="20"
          :ribbon="18"
          :speed="1.8"
        />
      </div>
      <p class="mt-2 text-center text-xs text-muted">
        <code class="font-mono">color</code> and <code class="font-mono">track-color</code> set independently
      </p>
    </div>

    <div class="rounded-2xl border border-default p-4">
      <div class="flex justify-center">
        <MFlowingStroke
          :width="440"
          :height="140"
          color="success"
          :dash="6"
          :gap="10"
          :ribbon="10"
          :speed="3"
        />
      </div>
      <p class="mt-2 text-center text-xs text-muted">
        A tight dash at three times the base speed
      </p>
    </div>
  </div>
</template>
```
::


## Examples

### Shapes

`shape` selects the path generator. `amplitude` scales its vertical extent: `0`
flattens the path to a straight line, `1` is the designed curve, and higher numbers
exaggerate it. These run with `trigger="loop"` so they travel without a pointer.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="flowing-stroke-shapes" />
  :::
#code
```vue
<template>
  <div class="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
    <div
      v-for="item in shapes"
      :key="item.label"
      class="rounded-2xl border border-default p-4"
    >
      <div class="flex justify-center">
        <MFlowingStroke
          :width="300"
          :height="120"
          color="primary"
          :shape="item.shape"
          :amplitude="item.amplitude"
          trigger="loop"
          :speed="1.6"
        />
      </div>
      <p class="mt-2 text-center text-xs font-medium text-muted">
        {{ item.label }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const shapes = [
  { shape: 'wave', amplitude: 1, label: 'wave — the default rolling curve' },
  { shape: 'arc', amplitude: 1, label: 'arc — one arch, up and back down' },
  { shape: 'diagonal', amplitude: 1, label: 'diagonal — a gentle rise' },
  { shape: 'zigzag', amplitude: 1, label: 'zigzag — sharp, straight segments' },
  { shape: 'ring', amplitude: 1, label: 'ring — a closed loop the dashes orbit' },
  { shape: 'wave', amplitude: 0.4, label: 'wave with amplitude 0.4 — a flatter curve' },
] as const
</script>
```
::

### Motion

`direction` flips the travel along the path. `trigger` chooses what sets the dashes
moving: the default `"hover"` starts them on pointer entry, `"loop"` runs them
continuously. `glow` adds a soft drop-shadow in the flow colour behind the dashes.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="flowing-stroke-motion" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-xl flex-col gap-4">
    <div class="rounded-2xl border border-default p-4">
      <p class="mb-1 text-xs font-medium text-muted">
        direction="forward" — trigger="loop"
      </p>
      <div class="flex justify-center">
        <MFlowingStroke
          :width="420"
          :height="120"
          color="primary"
          direction="forward"
          trigger="loop"
          :ribbon="12"
          :speed="2"
        />
      </div>
    </div>

    <div class="rounded-2xl border border-default p-4">
      <p class="mb-1 text-xs font-medium text-muted">
        direction="reverse" — the dashes travel the other way
      </p>
      <div class="flex justify-center">
        <MFlowingStroke
          :width="420"
          :height="120"
          color="secondary"
          direction="reverse"
          trigger="loop"
          :ribbon="12"
          :speed="2"
        />
      </div>
    </div>

    <div class="rounded-2xl border border-default p-4">
      <p class="mb-1 text-xs font-medium text-muted">
        glow — hover to start, a soft drop-shadow in the flow colour
      </p>
      <div class="flex justify-center">
        <MFlowingStroke
          :width="420"
          :height="120"
          color="primary"
          glow
          :ribbon="16"
          :dash="24"
          :gap="16"
          :speed="2.4"
        />
      </div>
    </div>
  </div>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="flowing-stroke-custom" />
  :::
#code
  <PlaygroundCode name="FlowingStroke" />
::

## Props

::component-props
  ::component-prop{name="width" type="number" default="1200"}
  Pixel width of the drawing surface. It drives the root div's inline width, the
  SVG viewBox and the generated path, so the path is authored in the same
  coordinate space it is rendered in.
  ::
  ::component-prop{name="height" type="number" default="220"}
  Pixel height, used the same way as `width` — root size, viewBox and the path's
  vertical offsets all derive from it.
  ::
  ::component-prop{name="color" type="string" default="'primary'"}
  Colour of the travelling dashes. A theme token (`'primary'`, `'error'`, …) or any
  CSS colour.
  ::
  ::component-prop{name="trackColor" type="string"}
  Colour of the solid tube the dashes ride in. Left unset it defaults to a 30% tint
  of `color`, so a single `color` prop styles both layers.
  ::
  ::component-prop{name="shape" type="'wave' | 'arc' | 'diagonal' | 'zigzag' | 'ring'" default="'wave'"}
  Named path the dashes travel along. Each generator derives its geometry from
  `width`, `height` and `amplitude`.
  ::
  ::component-prop{name="amplitude" type="number" default="1"}
  Vertical scale of the path: `0` flattens it to a straight line, `1` is the
  designed curve, and values above `1` exaggerate it.
  ::
  ::component-prop{name="ribbon" type="number" default="18"}
  Stroke width of the solid background tube.
  ::
  ::component-prop{name="stripeInset" type="number" default="4"}
  How much thinner the dash layer is than the tube, applied to each side. The dash
  stroke width is `ribbon - stripeInset * 2`, floored at `1`.
  ::
  ::component-prop{name="dash" type="number" default="34"}
  Length of each dash, in pixels along the path.
  ::
  ::component-prop{name="gap" type="number" default="22"}
  Gap between dashes. `dash + gap` is the period the travel offset wraps on, so
  changing either changes the seamlessness of the loop.
  ::
  ::component-prop{name="speed" type="number" default="1"}
  Multiplier on the base travel rate of 120px per second.
  ::
  ::component-prop{name="direction" type="'forward' | 'reverse'" default="'forward'"}
  Which way the dashes travel along the path.
  ::
  ::component-prop{name="trigger" type="'hover' | 'loop'" default="'hover'"}
  What sets the dashes moving. `'hover'` starts them on pointer entry and freezes
  them on leave; `'loop'` runs them continuously from mount.
  ::
  ::component-prop{name="glow" type="boolean" default="false"}
  Emit a soft drop-shadow in the flow colour behind the dashes.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.flowingStroke` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative overflow-hidden`
  ::
  ::component-slot-row{name="svg"}
  `w-full h-full block`
  ::
::
## Accessibility

The `<svg>` is `aria-hidden="true"` and carries no title, role or description —
it is decoration, and nothing about it reaches the accessibility tree. The
component does not contribute any semantics of its own, so the text around it is
entirely yours to provide.

With the default `trigger="hover"` there is no keyboard trigger and no touch
handling: the stripes advance only on `mouseenter` / `mouseleave`, so on a touch
device the ribbon renders and stays still, and for a keyboard user there is nothing
to focus. `trigger="loop"` removes that gate and animates unconditionally.

Under `prefers-reduced-motion: reduce` a scoped rule pins `stroke-dashoffset` to
`0` with `!important`, freezing the dashes in place regardless of the rAF loop —
so `loop` stays still for anyone who has asked for no motion.

## Performance

- One `requestAnimationFrame` loop per instance, started on mount and cancelled on
  unmount. Under `trigger="hover"` it runs continuously but only writes to the ref
  while hovered; under `loop` it writes every frame.
- The offset is a plain ref bound to `stroke-dashoffset`, so the write is a style
  update on one SVG path — no Vue re-render, no reconciliation.
- Travel is time-based, not frame-based: it converts the frame delta into pixels per
  second, so the rate is identical on a 60Hz and a 144Hz display.
- The offset is taken modulo `dash + gap` and normalised into `[0, period)`, so it
  stays bounded in either direction however long the loop runs.
- Both paths share one computed `d` string — the shape is built once from `width`,
  `height`, `amplitude` and `shape`, not per layer per frame. The dash path also
  carries `vector-effect="non-scaling-stroke"` so its width survives any SVG scaling.

::tip
The default tube is `color-mix(in oklab, <color> 30%, transparent)`, so a single
`color` gives a matched but recessed track. Setting `trackColor` to a theme token
resolves to that token's solid colour — if it matches `color` exactly the dashes
disappear against the tube, so pick a contrast or lean on the default tint. The
`amplitude` prop only scales the curve vertically; `0` turns every shape into a
straight line.
::

