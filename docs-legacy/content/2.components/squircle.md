---
title: Squircle
description: Superellipse corners, generated as a clip path and tracked on resize.
navigation:
  icon: i-lucide-square
---

# Squircle

Corners drawn as a superellipse rather than a circular arc — the continuous,
flat-then-turning curve that Apple uses for large corner radii and that CSS
still has no native way to express. On a `border-radius` of 24px the difference
is a subtle softening; at 96px the difference is the whole look.

The curve is generated as an SVG path and applied through `clip-path`, which
means the component measures its own box and keeps the path in sync with it. A
superellipse in CSS terms would be one fixed shape that silently ignored
`smoothing`, so the same props would render two different corners depending on
which path you happened to take.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="squircle-basic" />
  :::
#code
```vue
<template>
  <MSquircle
    class="grid aspect-4/3 w-64 place-items-center bg-linear-to-br from-primary to-tertiary text-2xl font-bold text-white"
  >
    Squircle
  </MSquircle>
</template>
```
::

## Smoothing

`smoothing` maps to a superellipse exponent: `2 + smoothing × 4`, clamped to
`[0, 4]`.

- `0` gives exponent `2`, which is a circle. The corner is then identical to
  `border-radius` and the component adds nothing.
- `0.6` is the default — exponent `4.4`, Apple's shape.
- `1` gives exponent `6`, which is nearly a rectangle with very generously
  rounded corners. It flattens into the edges early and the eye reads it as a
  rounded square rather than a squircle.

Because the curve is sampled rather than solved analytically, the number of
points per corner grows with the radius: half a sample per pixel, bounded
between 12 and 48. Twelve points is smooth on a 24px corner and visibly
faceted on a 96px one, so the count has to follow the size.

## Props

::field-group
  ::field{name="radius" type="number" default="24"}
  Corner radius in px, matching `border-radius`. Clamped to
  `min(width, height) / 2` against the measured box, so a large radius on a
  small element produces a stadium rather than an inverted path.
  ::

  ::field{name="smoothing" type="number" default="0.6"}
  `0` is a circular corner, `1` flattens nearly to the edge. Values outside
  `[0, 1]` are clamped.
  ::

  ::field{name="as" type="string" default="'div'"}
  The element rendered. Any tag or component name — `section`, `article`,
  `aside`. Defaults to `div`.
  ::

  ::field{name="border" type="boolean" default="false"}
  Adds a hairline border using the `border-default` token. Because the element
  is clipped, a `border-radius` alone would leave the border following a
  circular arc while the clip follows the superellipse; turning this on shows
  why the clip is doing the work.
  ::

  ::field{name="class" type="string"}
  Classes for the root element, which is also the element that gets measured.
  Size and spacing classes here are what the path is generated against.
  ::
::

Content goes in the default slot; the component takes no children prop.

## Measurement and resize

The path is generated from the element's measured box, so `clip-path: path()`
has no responsive form — it is a fixed set of coordinates, not a percentage.
The component measures on mount and then observes its own element with a
`ResizeObserver`, rewriting the path whenever the box changes.

That has one visible consequence: there is no clip path in the server-rendered
HTML. The server has no layout, so width and height are `0` and no path is
emitted; the path appears one tick after hydration. Both renders are otherwise
identical, so nothing mismatches — but do not expect a squircle in a snapshot
test or an SSR screenshot.

Motion is not involved, so `prefers-reduced-motion` has nothing to change here.
The clip path is byte-identical either way.

## Accessibility

The component is a plain wrapper — it renders whatever tag you ask for, forwards
its slot, and adds no roles, labels or focus management. Anything semantic
belongs to the `as` prop and the markup you put in the slot.

Note that `clip-path` clips painting, not hit-testing. A click on a point inside
the generated corner still lands on the element, because the square box is what
receives events. For a decorative squircle that is correct; for a link shaped
like a squircle, the corners will be clickable-but-invisible.

## Examples

### Smoothing

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="squircle-smoothing" />
  :::
#code
```vue
<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <MSquircle
      class="grid size-28 place-items-center bg-(--ui-bg-muted) text-sm font-semibold"
      :radius="40"
      :smoothing="0"
    >
      <span>smoothing 0</span>
    </MSquircle>
    <MSquircle
      class="grid size-28 place-items-center bg-(--ui-bg-muted) text-sm font-semibold"
      :radius="40"
      :smoothing="0.6"
    >
      <span>default</span>
    </MSquircle>
    <MSquircle
      class="grid size-28 place-items-center bg-(--ui-bg-muted) text-sm font-semibold"
      :radius="40"
      :smoothing="1"
    >
      <span>smoothing 1</span>
    </MSquircle>
  </div>
</template>
```
::

### Element and border

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="squircle-bordered" />
  :::
#code
```vue
<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <MSquircle
      class="grid size-32 place-items-center border border-default bg-(--ui-bg-muted) text-sm font-semibold"
      :radius="48"
      :smoothing="0.6"
      as="section"
    >
      <span>as="section"</span>
    </MSquircle>
    <MSquircle
      class="grid size-32 place-items-center bg-(--ui-bg-muted) text-sm font-semibold"
      :radius="8"
      :smoothing="0.35"
      as="article"
    >
      <span>as="article"</span>
    </MSquircle>
  </div>
</template>
```
::

## Notes

- The `squirclePath` helper is exported alongside the component, so a path can
  be generated without rendering anything: it takes `(width, height, radius,
  smoothing)` and returns the path string.
- `border-radius` is still set on the element, matching `radius`. That is what
  makes a `border` look correct before hydration, and it is what a browser
  without `clip-path` support would fall back to. The clip overrides it.
- Sample counts are bounded at 48 per corner. Past a large radius the curve is
  very slightly faceted on a display with high pixel density — the cost of a
  bounded path size rather than a growing one.
- `radius` is clamped against the measured box, so changing a responsive `w-*`
  class can silently reduce the effective radius. The generated path reflects
  the clamped value; nothing warns you.
- The generated path is the only code path on purpose. CSS
  `corner-shape: squircle` is a single fixed shape that ignores `smoothing`
  entirely, so switching to it would make the same props render two different
  corners depending on browser support.