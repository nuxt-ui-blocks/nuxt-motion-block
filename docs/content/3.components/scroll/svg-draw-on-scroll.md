---
title: Svg Draw On Scroll
description: An SVG path that draws itself as you scroll, with an optional marker riding the stroke.
---

An SVG path that draws itself in step with scroll. The stroke is revealed by
animating `stroke-dashoffset` on the progress value returned by `useScroll`, so
the artwork appears to be sketched in as the element moves through the viewport.
Give it a `path`, or a `paths` array to draw several in sequence.

There is also a `marker` slot: content that rides the tip of the line as it draws,
positioned from the path's own geometry rather than CSS `offset-path`, so it stays
locked to the stroke at any size or `viewBox`.

## Usage

Give the wrapper an explicit size, pass a `paths` array, and point `container` at a
scrollable ancestor so the draw is driven by that panel rather than the page.
`container` must be passed as a **getter** (`:container="() => panel"`) — see
[Notes](#notes) for why. The `marker` slot rides the tip of the stroke.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="svg-draw-on-scroll-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <p class="text-sm text-muted">
      Scroll the panel — the four paths are drawn in sequence as it moves.
    </p>

    <div
      ref="panel"
      class="relative h-64 overflow-y-auto overscroll-contain rounded-2xl border border-default bg-default"
    >
      <div class="h-48" />

      <MSvgDrawOnScroll
        :container="() => panel"
        :offset="['start 0.75', 'end 0.25']"
        :paths="paths"
        viewBox="0 0 100 100"
        :stroke-width="1.4"
        stroke="var(--ui-primary)"
        class="mx-auto h-40 w-40"
      >
        <template #marker>
          <span class="block size-3 rounded-full bg-primary ring-4 ring-primary/20" />
        </template>
      </MSvgDrawOnScroll>

      <div class="h-48" />
    </div>
  </div>
</template>

<script setup lang="ts">
const panel = ref<HTMLElement | null>(null)

const paths = [
  'M12 78 C 26 40, 40 62, 50 38 C 60 14, 74 44, 88 22',
  'M14 22 L 50 50 L 86 22',
  'M50 8 L 50 92',
  'M10 50 L 90 50',
]
</script>
```
::

## Examples

### A single path

For one shape, `path` takes a bare `d` string. A `viewBox` that matches the path's
coordinate space keeps it from being stretched by `preserveAspectRatio`.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="svg-draw-on-scroll-path" />
  :::
#code
```vue
<template>
  <div class="relative h-64 overflow-y-auto overscroll-contain rounded-2xl border border-default bg-default">
    <div class="h-40" />

    <MSvgDrawOnScroll
      path="M10 80 C 30 20, 70 20, 90 80 S 110 20, 130 80"
      view-box="0 0 140 100"
      :stroke-width="2"
      class="mx-auto h-36 w-56 text-primary"
    />

    <div class="h-40" />
  </div>
</template>
```
::

### Draw once

With `once`, the path latches fully drawn at its furthest point and is not erased
when you scroll back up — useful when the draw is a one-time entrance.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="svg-draw-on-scroll-once" />
  :::
#code
```vue
<template>
  <div class="relative h-64 overflow-y-auto rounded-2xl border border-default">
    <div class="h-40" />

    <MSvgDrawOnScroll
      once
      :paths="['M10 50 C 30 10, 70 90, 90 50']"
      view-box="0 0 100 100"
      stroke="var(--ui-primary)"
      class="mx-auto h-32 w-40"
    />

    <div class="h-40" />
  </div>
</template>
```
::

## Customize

Adjust the path, `viewBox`, `stroke`, `strokeWidth` and `once` live in the
playground below.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="svg-draw-on-scroll-custom" />
  :::
#code
  <PlaygroundCode name="SvgDrawOnScroll" />
::

## Props

::component-props
  ::component-prop{name="path" type="string"}
  A single path's `d`. Ignored when `paths` is also provided.
  ::
  ::component-prop{name="paths" type="string[]"}
  Multiple paths, drawn one after another across the scroll range. Each path gets
  an equal slice of progress, so four paths mean each one draws over a quarter of
  the range.
  ::
  ::component-prop{name="viewBox" type="string" default="'0 0 100 100'"}
  The SVG `viewBox`. Match it to your path coordinates; the SVG scales to the
  wrapper with `preserveAspectRatio="xMidYMid meet"`.
  ::
  ::component-prop{name="offset" type="ScrollOffset" default="['start 0.9', 'end 0.6']"}
  Motion `useScroll` offset tuple for the draw. The default finishes the draw while
  the artwork is still mid-viewport rather than on its way out.
  ::
  ::component-prop{name="container" type="MaybeComputedElementRef"}
  A scrollable ancestor that drives the draw instead of the window. Must be passed
  as a getter (`:container="() => panel"`). Without it, several instances on one
  page all read the same page-level progress and their ranges overlap, so only the
  last one appears to work. The container must be `position: relative`.
  ::
  ::component-prop{name="once" type="boolean" default="false"}
  Freeze fully drawn once complete instead of undrawing on scroll-up. Implemented
  by tracking the high-water mark of progress.
  ::
  ::component-prop{name="stroke" type="string" default="'currentColor'"}
  Stroke colour. Anything other than `currentColor` is resolved through the theme
  colour helper, so `var(--ui-primary)` and theme tokens work.
  ::
  ::component-prop{name="strokeWidth" type="number" default="2"}
  Stroke width in viewBox units.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the root wrapper after `relative`. Give it an explicit size — the
  inner SVG is `h-full w-full`, so the wrapper drives the drawing area.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="marker"}
  Content that rides the tip of the stroke as it draws. It is positioned from the
  path's geometry, so only the marker's own appearance is up to you. When no
  marker slot is provided, no marker element is rendered at all.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.svgDrawOnScroll` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative`
  ::
  ::component-slot-row{name="svg"}
  `h-full w-full`
  ::
  ::component-slot-row{name="marker"}
  `pointer-events-none absolute top-0 left-0`
  ::
  ::component-slot-row{name="markerInner"}
  `-translate-x-1/2 -translate-y-1/2`
  ::
::

## Accessibility

The `<svg>` is marked `aria-hidden="true"` and the marker wrapper is also
`aria-hidden`, so neither the artwork nor the marker is exposed to assistive
technology. This component is decorative by design — if the graphic carries
meaning, describe it in surrounding text.

There are no roles, live regions, focus handling or keyboard interaction. Under
`prefers-reduced-motion` the paths are drawn in full immediately (`pathLength` of
`1`) and the marker is pinned to the end of the path, so the artwork is presented
complete rather than animated.

## Performance

- One `useScroll` on the wrapper (or your container) and one `useSpring`
  (`damping: 28`, `mass: 0.4`, `stiffness: 240`) for the whole component.
- The spring value is read once into a plain ref through a single
  `useMotionValueEvent`, and each path's dash offset is then a pure function of
  that one number — rather than a `useTransform` per path, which would
  re-subscribe on every recomputation and leak.
- `pathLength="1"` on each path normalises the dash units, so a `strokeDashoffset`
  of `1` hides the stroke and `0` reveals it. The browser paints it as a normal
  dash animation without re-measuring path lengths.
- The marker reads geometry on change and on `ResizeObserver` updates, not per
  frame: `getTotalLength` and `getScreenCTM` are called only when the spring value
  or the wrapper size changes.

## Notes

### `container` must be a getter

Pass `:container="() => panel"`, never `:container="panel"`. A plain binding is
unwrapped by the template and captured as `null` during `setup`, after which
nothing re-reads it and `useScroll` quietly falls back to the window. The getter
is invoked inside Motion's own `flush: 'post'` effect, where your ref is a tracked
dependency, so it resolves to the mounted element and re-resolves if it changes.

### Why the marker is measured, not positioned with `offset-path`

`offset-path: path()` measures in the element's CSS pixel space, but the path's `d`
is written in viewBox units. Any `viewBox` that is not 1:1 with the rendered box —
the normal case, since the SVG scales with `preserveAspectRatio` — would leave the
marker floating away from the stroke. Instead the component resolves the tip
through `getPointAtLength` and `getScreenCTM`, the same transform the browser used
to paint the line, so the marker stays attached at any scale.

::tip
Several paths in one SVG only need one marker. The component joins them into a
single hidden measuring path, so the marker rides the combined geometry as the
`paths` draw in sequence.
::
