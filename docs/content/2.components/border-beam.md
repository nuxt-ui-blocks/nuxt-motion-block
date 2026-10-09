---
title: Border Beam
description: A comet of light that travels around a box's border as a stroked dash.
navigation:
  icon: i-lucide-scan-line
---

# Border Beam

A glow that runs around the edge of a box. Wrap any content in it and a comet of
light laps the border on its own.

The comet is not a sprite moving along a track — it is the border path itself,
stroked as a dash. Four dashes of the same gradient stack into a tapered tail and
accumulate into a bright head, and one wider, blurred dash behind them is the
halo. Only `stroke-dashoffset` moves, and because the dashes are stroked along
the same `d` as the border, the light bends through the corners by construction
and can never leave the outline.

The border itself is a separate hairline path, deliberately kept off the beam
gradient. That is what lets `colorFrom` and `colorTo` be as bright as a glow needs
without turning the resting border into a coloured stripe. The halo goes further
and mixes both stops 68% towards white before using them, because blurring a dark
stroke darkens its fringe — a glow is light by definition, and a dark blur reads
as a shadow.

The element is measured, not assumed. A `ResizeObserver` keeps the path in step
with the box, and the real perimeter from `getTotalLength()` is what normalises
`size` from pixels into the path's own units.

## Usage

Wrap content and set `radius` to match the corner radius you put on `class` — the
root gets its radius from the prop when it is a number, so the beam's path and
your CSS agree. `colorFrom` and `colorTo` are plain CSS colours.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="border-beam-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-5">
    <MBorderBeam
      class="rounded-2xl p-6"
      :beams="3"
      :duration="7"
      :size="90"
      color-from="#a5b4fc"
      color-to="#f0abfc"
    >
      <div class="flex flex-col gap-1">
        <p class="text-xs uppercase tracking-widest text-muted">
          Three beams, seven seconds
        </p>
        <p class="text-xl font-semibold">
          Phase-offset around the loop
        </p>
      </div>
    </MBorderBeam>

    <MBorderBeam
      class="rounded-2xl p-6"
      radius="squircle"
      :size="140"
      :duration="4"
      reverse
      pause-on-hover
      color-from="#fde68a"
      color-to="#fdba74"
    >
      <div class="flex flex-col gap-1">
        <p class="text-xs uppercase tracking-widest text-muted">
          Squircle corners, reversed, pauses on hover
        </p>
        <p class="text-xl font-semibold">
          Corners included
        </p>
      </div>
    </MBorderBeam>
  </div>
</template>
```
::

## Reading the geometry

A few numbers in the source are worth knowing, because they explain what you see
when you push the props around.

`size` is an arc length in pixels, but a small box has a small perimeter, so the
comet's share of the border is clamped between 2% and 45%. Below that it vanishes
into a dot; above it it wraps most of the way round and stops reading as a comet.

`beams` phase-offsets along the loop — each beam starts at `index / count` of a
lap, so `beams: 3` gives three comets evenly spaced with none of them overlapping.
Every beam costs four core dashes plus one halo, so the dash count grows linearly.

The core is four layers and not six on purpose: each dash is semi-opaque and
composites over the last, so every extra one costs a paint and buys less taper than
the one before. The alpha steps land at 0.14 / 0.48 / 0.82 / 0.98 towards the
head, which is where the falloff stops reading as visible steps.

## Props

::field-group
  ::field{name="active" type="boolean" default="true"}
  Keep the beams travelling. Setting it to `false` cancels the loop and removes
  the comet entirely — you are left with a plain hairline border at full opacity.
  ::
  ::field{name="beams" type="number" default="1"}
  How many comets ride the border, evenly phase-offset around the loop. Rounded
  and floored at one. Each one adds four core dashes and one halo path.
  ::
  ::field{name="size" type="number" default="72"}
  Arc length of each comet in pixels, measured along the border. Normalised
  against the real perimeter and then clamped between 2% and 45% of the loop.
  ::
  ::field{name="duration" type="number" default="6"}
  Seconds for one full lap. Floored at `0.1`, below which a lap would finish
  inside a single frame.
  ::
  ::field{name="delay" type="number" default="0"}
  Seconds to wait before the first lap. Progress below zero simply is not drawn,
  so the beam sits still at its initial offset during the delay.
  ::
  ::field{name="colorFrom" type="string" default="'var(--color-brand)'"}
  Trailing colour of the beam gradient. The halo uses the same value mixed 68%
  towards white.
  ::
  ::field{name="colorTo" type="string" default="'var(--color-brand-light)'"}
  Leading colour of the beam gradient, at the head of the comet.
  ::
  ::field{name="borderWidth" type="number" default="1"}
  Thickness of the resting hairline border, in pixels. It also sets the path's
  inset — the outline is drawn half a width in, so the beam sits on the inner
  edge of the box rather than straddling it.
  ::
  ::field{name="radius" type="number | 'squircle'" default="16"}
  Corner geometry of both the border and the travel path. A number sets the root's
  CSS `border-radius` too; `'squircle'` builds the path from cubic curves and
  leaves the root radius alone. A numeric radius is clamped to half the shorter
  side, so it never self-intersects on a small box.
  ::
  ::field{name="reverse" type="boolean" default="false"}
  Travel counter-clockwise. The dash offset is mirrored so the tail still trails
  behind the head in the new direction rather than leading it.
  ::
  ::field{name="pauseOnHover" type="boolean" default="false"}
  Freeze the beams while a fine pointer hovers the element. Gated on
  `(hover: hover) and (pointer: fine)`, so touch devices never pause.
  ::
  ::field{name="class" type="string"}
  Merged onto the root alongside `relative isolate`. The root carries no radius of
  its own unless `radius` is a number.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The content. It sits under the SVG, which is absolutely positioned, pointer
  transparent and stacked above with `z-10`. Keep interactive elements inside
  clear of the very edge or they will compete with the beam for the pointer.
  ::
::

## Accessibility

The SVG is `aria-hidden="true"` and `pointer-events-none`, so the effect adds
nothing to the accessibility tree and never intercepts a click. Your slot content
is the only thing exposed.

There is no keyboard behaviour and no way to pause from the keyboard.
`pauseOnHover` is a pointer affordance only.

Under `prefers-reduced-motion` the comet does not run at all: `isTravelling` goes
false, the loop is stopped and the comet group is removed from the DOM. What is
left is the static border — and note it brightens from 70% opacity to full, since
the dimmer opacity only exists to sit behind a moving beam.

The gradient ids are namespaced with Vue's `useId` rather than a random string,
because they are in the rendered markup and a per-render value would differ
between server and client. Two instances on one page therefore get distinct
gradients without a hydration mismatch.

## Performance

- The loop writes `stroke-dashoffset` directly onto collected path nodes. No Vue
  re-render per frame; the dash nodes are found once per loop start by their
  `data-beam-index`, not through function refs — a function ref is re-created
  every render and a rAF tick landing between its `null` and element calls reads
  a cleared slot and silently stops the animation.
- An `IntersectionObserver` keeps a scrolled-away element's loop running but skips
  every style write, so an off-screen beam costs no paint and no layout.
- A `ResizeObserver` re-measures the box and rebuilds the path, so the comet stays
  correct through layout changes without a window resize listener.
- The loop restarts only on scalar props — `active`, `beams`, `size`, `reverse`,
  `duration`, `delay`. Watching the dash-plan arrays instead would restart on
  every scheduler flush, resetting elapsed time and pinning the comet at its
  initial offset.
- Only `stroke-dashoffset` and a one-shot group opacity are animated; nothing
  triggers layout, and the halo and core each render inside a single blur filter.

::tip
The halo composites additively only in dark mode (`dark:mix-blend-plus-lighter`).
On a light surface an additive glow has no darkness to add light to and washes out
to nothing, so there it composites normally and simply tints — which is the
correct look for a glow on white, but it means `colorFrom` and `colorTo` read
differently across themes.
::